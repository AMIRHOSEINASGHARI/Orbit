import "server-only";
import mongoose from "mongoose";
import { TaskGroupModel } from "@/features/groups/models/task-group.model";
import { TaskModel } from "@/features/tasks/models/task.model";
import type { CreateGroupInput } from "@/features/groups/schemas/group.schema";
import type { GroupListFilters, GroupListItem } from "@/features/groups/types/group.types";

type GroupAggregateResult = Omit<GroupListItem, "id" | "workspaceId" | "taskCount" | "todoCount" | "inProgressCount" | "doneCount" | "completionPercent"> & {
  _id: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId | null;
  taskCounts: Pick<GroupListItem, "taskCount" | "todoCount" | "inProgressCount" | "doneCount">;
};

export async function createGroupForUser(userId: string, input: CreateGroupInput): Promise<string> {
  const group = await TaskGroupModel.create({
    userId: new mongoose.Types.ObjectId(userId),
    workspaceId: null,
    ...input,
  });
  return group._id.toString();
}

export async function updateGroupForUser(userId: string, groupId: string, input: CreateGroupInput): Promise<boolean> {
  if (!mongoose.isValidObjectId(groupId)) return false;
  const result = await TaskGroupModel.updateOne(
    { _id: new mongoose.Types.ObjectId(groupId), userId: new mongoose.Types.ObjectId(userId), workspaceId: null, deletedAt: null },
    { $set: input },
    { runValidators: true },
  ).exec();
  return result.matchedCount > 0;
}

export async function trashGroupForUser(userId: string, groupId: string): Promise<boolean> {
  if (!mongoose.isValidObjectId(groupId)) return false;
  const ownerId = new mongoose.Types.ObjectId(userId);
  const id = new mongoose.Types.ObjectId(groupId);
  const now = new Date();
  return mongoose.connection.transaction(async (session) => {
    const group = await TaskGroupModel.findOneAndUpdate(
      { _id: id, userId: ownerId, workspaceId: null, deletedAt: null },
      { deletedAt: now },
      { session, new: true },
    ).select({ _id: 1 }).lean().exec();
    if (!group) return false;
    await TaskModel.updateMany(
      { groupId: id, userId: ownerId, workspaceId: null, deletedAt: null },
      { $set: { deletedAt: now, trashedByGroupId: id } },
      { session, runValidators: true },
    ).exec();
    return true;
  });
}

export async function restoreGroupForUser(userId: string, groupId: string): Promise<boolean> {
  if (!mongoose.isValidObjectId(groupId)) return false;
  const ownerId = new mongoose.Types.ObjectId(userId);
  const id = new mongoose.Types.ObjectId(groupId);
  return mongoose.connection.transaction(async (session) => {
    const group = await TaskGroupModel.findOneAndUpdate(
      { _id: id, userId: ownerId, workspaceId: null, deletedAt: { $ne: null } },
      { deletedAt: null },
      { session, new: true },
    ).select({ _id: 1 }).lean().exec();
    if (!group) return false;
    await TaskModel.updateMany(
      { groupId: id, userId: ownerId, workspaceId: null, deletedAt: { $ne: null }, trashedByGroupId: id },
      { $set: { deletedAt: null, trashedByGroupId: null } },
      { session, runValidators: true },
    ).exec();
    return true;
  });
}

export async function permanentlyDeleteGroupForUser(userId: string, groupId: string): Promise<boolean> {
  if (!mongoose.isValidObjectId(groupId)) return false;
  const ownerId = new mongoose.Types.ObjectId(userId);
  const id = new mongoose.Types.ObjectId(groupId);
  return mongoose.connection.transaction(async (session) => {
    const group = await TaskGroupModel.findOneAndDelete(
      { _id: id, userId: ownerId, workspaceId: null, deletedAt: { $ne: null } },
      { session },
    ).select({ _id: 1 }).lean().exec();
    if (!group) return false;
    await TaskModel.deleteMany({ groupId: id, userId: ownerId, workspaceId: null }, { session }).exec();
    return true;
  });
}

async function listGroupsForUser(userId: string, deleted: boolean, filters: GroupListFilters = {}): Promise<GroupListItem[]> {
  const ownerId = new mongoose.Types.ObjectId(userId);
  const escapedSearch = filters.search?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const groups = await TaskGroupModel.aggregate<GroupAggregateResult>([
    { $match: { userId: ownerId, workspaceId: null, deletedAt: deleted ? { $ne: null } : null } },
    ...(escapedSearch ? [{ $match: { $or: [{ name: { $regex: escapedSearch, $options: "i" } }, { description: { $regex: escapedSearch, $options: "i" } }] } }] : []),
    {
      $lookup: {
        from: TaskModel.collection.name,
        let: { groupId: "$_id", groupOwnerId: "$userId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$groupId", "$$groupId"] },
                  { $eq: ["$userId", "$$groupOwnerId"] },
                  { $eq: ["$workspaceId", null] },
                  { $eq: [{ $ifNull: ["$deletedAt", null] }, null] },
                  { $eq: [{ $ifNull: ["$archivedAt", null] }, null] },
                ],
              },
            },
          },
          {
            $group: {
              _id: null,
              taskCount: { $sum: 1 },
              todoCount: { $sum: { $cond: [{ $eq: ["$status", "todo"] }, 1, 0] } },
              inProgressCount: { $sum: { $cond: [{ $eq: ["$status", "in-progress"] }, 1, 0] } },
              doneCount: { $sum: { $cond: [{ $eq: ["$status", "done"] }, 1, 0] } },
            },
          },
        ],
        as: "taskCounts",
      },
    },
    {
      $project: {
        _id: 1,
        workspaceId: 1,
        name: 1,
        description: 1,
        color: 1,
        deletedAt: 1,
        createdAt: 1,
        updatedAt: 1,
        taskCounts: {
          $ifNull: [
            { $arrayElemAt: ["$taskCounts", 0] },
            { taskCount: 0, todoCount: 0, inProgressCount: 0, doneCount: 0 },
          ],
        },
      },
    },
    { $sort: { updatedAt: -1, _id: 1 } },
  ]).exec();

  return groups.map(({ _id, taskCounts, ...group }) => ({
    ...group,
    id: _id.toString(),
    workspaceId: group.workspaceId?.toString() ?? null,
    ...taskCounts,
    completionPercent: taskCounts.taskCount ? Math.round((taskCounts.doneCount / taskCounts.taskCount) * 100) : 0,
  }));
}

export async function getGroupsForUser(userId: string, filters: GroupListFilters = {}): Promise<GroupListItem[]> {
  return listGroupsForUser(userId, false, filters);
}

export async function getTrashedGroupsForUser(userId: string): Promise<GroupListItem[]> {
  return listGroupsForUser(userId, true);
}

export async function getGroupByIdForUser(userId: string, groupId: string): Promise<GroupListItem | null> {
  if (!mongoose.isValidObjectId(groupId)) return null;
  const groups = await getGroupsForUser(userId);
  return groups.find((group) => group.id === groupId) ?? null;
}
