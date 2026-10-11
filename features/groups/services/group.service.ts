import "server-only";
import mongoose from "mongoose";
import { TaskGroupModel } from "@/features/groups/models/task-group.model";
import { TaskModel } from "@/features/tasks/models/task.model";
import type { CreateGroupInput } from "@/features/groups/schemas/group.schema";
import type { GroupListItem } from "@/features/groups/types/group.types";

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

export async function getGroupsForUser(userId: string): Promise<GroupListItem[]> {
  const ownerId = new mongoose.Types.ObjectId(userId);
  const groups = await TaskGroupModel.aggregate<GroupAggregateResult>([
    { $match: { userId: ownerId, workspaceId: null, deletedAt: null } },
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

export async function getGroupByIdForUser(userId: string, groupId: string): Promise<GroupListItem | null> {
  if (!mongoose.isValidObjectId(groupId)) return null;
  const groups = await getGroupsForUser(userId);
  return groups.find((group) => group.id === groupId) ?? null;
}
