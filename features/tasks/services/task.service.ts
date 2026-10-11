import "server-only";
import mongoose from "mongoose";
import { TaskModel } from "@/features/tasks/models/task.model";
import type { TaskInput } from "@/features/tasks/schemas/task.schema";
import type { TaskGroupOption, TaskListFilters, TaskListItem, TaskPriority, TaskRecord, TaskStatus } from "@/features/tasks/types/task.types";

const personalScope = { workspaceId: null } as const;

export function toTaskListItem(task: TaskRecord): TaskListItem {
  const { _id, groupId, title, description, status, priority, dueDate, deletedAt, archivedAt, createdAt, updatedAt } = task;
  return {
    id: _id.toString(),
    groupId: groupId?.toString() ?? null,
    title, description, status, priority, dueDate, deletedAt, archivedAt, createdAt, updatedAt,
    completedAt: task.completedAt ?? null,
    checklist: (task.checklist ?? []).map((item, index) => ({ ...item, position: item.position ?? index, completedAt: item.completedAt ?? null })),
    assigneeCount: task.assigneeIds?.length ?? 0,
    tagCount: task.tagIds?.length ?? 0,
    attachmentCount: task.attachmentIds?.length ?? 0,
  };
}

function completionValue(status: TaskStatus, now: Date) {
  return status === "done" ? { $ifNull: ["$completedAt", now] } : null;
}

function requireObjectId(value: string, field: string): mongoose.Types.ObjectId {
  if (!mongoose.isValidObjectId(value)) throw new Error(`Invalid ${field}.`);
  return new mongoose.Types.ObjectId(value);
}

export async function listTasks(
  userId: string,
  filters: TaskListFilters = {},
): Promise<{ tasks: TaskRecord[]; total: number; page: number; pageSize: number }> {
  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 100;
  const query: mongoose.QueryFilter<TaskRecord> = {
    userId: requireObjectId(userId, "user ID"),
    ...personalScope,
  };
  if (!filters.includeDeleted) query.deletedAt = null;
  if (!filters.includeArchived) query.archivedAt = null;
  if (filters.status) query.status = filters.status;
  if (filters.priority) query.priority = filters.priority;
  if (filters.groupId) query.groupId = filters.groupId === "personal" ? null : requireObjectId(filters.groupId, "group ID");
  if (filters.search) {
    const escaped = filters.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    query.$or = [
      { title: { $regex: escaped, $options: "i" } },
      { description: { $regex: escaped, $options: "i" } },
    ];
  }
  if (filters.dueDate) {
    const start = new Date(`${filters.dueDate}T00:00:00.000Z`);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);
    query.dueDate = { $gte: start, $lt: end };
  }

  const totalQuery = TaskModel.countDocuments(query).exec();
  const pagination = [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }];
  let tasksQuery: Promise<TaskRecord[]>;

  if (filters.sort === "due-date-asc") {
    tasksQuery = TaskModel.aggregate<TaskRecord>([
      { $match: query },
      {
        $addFields: {
          _hasNoDueDate: {
            $cond: [{ $eq: [{ $ifNull: ["$dueDate", null] }, null] }, 1, 0],
          },
        },
      },
      { $sort: { _hasNoDueDate: 1, dueDate: 1, updatedAt: -1 } },
      { $unset: "_hasNoDueDate" },
      ...pagination,
    ]).exec();
  } else if (filters.sort === "priority-desc") {
    tasksQuery = TaskModel.aggregate<TaskRecord>([
      { $match: query },
      {
        $addFields: {
          _priorityOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$priority", "high"] }, then: 0 },
                { case: { $eq: ["$priority", "medium"] }, then: 1 },
                { case: { $eq: ["$priority", "low"] }, then: 2 },
              ],
              default: 3,
            },
          },
        },
      },
      { $sort: { _priorityOrder: 1, updatedAt: -1 } },
      { $unset: "_priorityOrder" },
      ...pagination,
    ]).exec();
  } else {
    const sort: Record<string, mongoose.SortOrder> = filters.sort === "updated-asc"
      ? { updatedAt: 1 }
      : filters.sort === "created-desc" ? { createdAt: -1 }
        : { updatedAt: -1 };
    tasksQuery = TaskModel.find(query).sort(sort).skip((page - 1) * pageSize).limit(pageSize).lean<TaskRecord[]>().exec();
  }

  const [tasks, total] = await Promise.all([tasksQuery, totalQuery]);
  return { tasks, total, page, pageSize };
}

export async function getTaskById(
  userId: string,
  taskId: string,
): Promise<TaskRecord | null> {
  return TaskModel.findOne({
    _id: requireObjectId(taskId, "task ID"),
    userId: requireObjectId(userId, "user ID"),
    ...personalScope,
    deletedAt: null,
  }).lean<TaskRecord>().exec();
}

export async function listTaskGroups(userId: string): Promise<TaskGroupOption[]> {
  const db = mongoose.connection.db;
  if (!db) throw new Error("Database connection is unavailable.");

  const groups = await db.collection("taskgroups").find<{
    _id: mongoose.Types.ObjectId;
    name: string;
    color?: string | null;
  }>({ userId: requireObjectId(userId, "user ID"), ...personalScope, deletedAt: null }, {
    projection: { name: 1, color: 1 },
  }).sort({ name: 1 }).toArray();

  return groups.map(({ _id, name, color }) => ({ id: _id.toString(), name, color: color ?? null }));
}

export async function createTaskForUser(userId: string, input: TaskInput): Promise<string | null> {
  const ownerId = requireObjectId(userId, "user ID");
  const groupId = input.groupId ? requireObjectId(input.groupId, "group ID") : null;
  if (groupId) {
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database connection is unavailable.");
    const group = await db.collection("taskgroups").findOne({
      _id: groupId,
      userId: ownerId,
      ...personalScope,
      deletedAt: null,
    }, { projection: { _id: 1 } });
    if (!group) return null;
  }

  const task = await TaskModel.create({
    ...input,
    checklist: input.checklist.map((item, position) => ({ ...item, position, completedAt: item.isCompleted ? new Date() : null })),
    userId: ownerId,
    groupId,
    workspaceId: null,
    completedAt: input.status === "done" ? new Date() : null,
  });
  return task._id.toString();
}

export async function updateTaskForUser(
  userId: string,
  taskId: string,
  input: TaskInput,
): Promise<"updated" | "not-found" | "invalid-group"> {
  const ownerId = requireObjectId(userId, "user ID");
  const id = requireObjectId(taskId, "task ID");
  const groupId = input.groupId ? requireObjectId(input.groupId, "group ID") : null;

  if (groupId) {
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database connection is unavailable.");
    const group = await db.collection("taskgroups").findOne({
      _id: groupId,
      userId: ownerId,
      ...personalScope,
      deletedAt: null,
    }, { projection: { _id: 1 } });
    if (!group) return "invalid-group";
  }

  const scope = { _id: id, userId: ownerId, ...personalScope, deletedAt: null };
  const previous = await TaskModel.findOne(scope).select({ checklist: 1 }).lean<TaskRecord>().exec();
  if (!previous) return "not-found";
  const now = new Date();
  const checklist = input.checklist.map((item, position) => {
    // shortcut: Duplicate checklist text has no stable identity; add item IDs when reordering is supported.
    const prior = previous.checklist?.[position]?.text === item.text
      ? previous.checklist[position]
      : previous.checklist?.find((candidate) => candidate.text === item.text);
    return {
      ...item,
      position,
      completedAt: item.isCompleted ? prior?.isCompleted ? prior.completedAt ?? now : now : null,
    };
  });

  const task = await TaskModel.findOneAndUpdate(
    scope,
    [{ $set: {
      title: { $literal: input.title },
      description: { $literal: input.description },
      status: input.status,
      priority: input.priority,
      dueDate: input.dueDate,
      groupId,
      checklist: { $literal: checklist },
      completedAt: completionValue(input.status, new Date()),
    } }],
    { new: true, updatePipeline: true },
  ).select({ _id: 1 }).lean().exec();
  return task ? "updated" : "not-found";
}

export async function changeTaskChecklistItemForUser(
  userId: string,
  taskId: string,
  index: number,
  expectedText: string,
  isCompleted: boolean,
): Promise<TaskRecord | null> {
  // shortcut: Checklist items have no IDs; index and text guard edits until stable IDs are added.
  const itemPath = `checklist.${index}`;
  return TaskModel.findOneAndUpdate(
    {
      _id: requireObjectId(taskId, "task ID"),
      userId: requireObjectId(userId, "user ID"),
      ...personalScope,
      deletedAt: null,
      [`${itemPath}.text`]: expectedText,
      [`${itemPath}.isCompleted`]: isCompleted ? { $ne: true } : true,
    },
    { $set: {
      [`${itemPath}.isCompleted`]: isCompleted,
      [`${itemPath}.completedAt`]: isCompleted ? new Date() : null,
    } },
    { returnDocument: "after", runValidators: true },
  ).lean<TaskRecord>().exec();
}

export async function changeTaskStatusForUser(
  userId: string,
  taskId: string,
  status: TaskStatus,
): Promise<boolean> {
  const task = await TaskModel.findOneAndUpdate(
    {
      _id: requireObjectId(taskId, "task ID"),
      userId: requireObjectId(userId, "user ID"),
      ...personalScope,
      deletedAt: null,
    },
    [{ $set: { status, completedAt: completionValue(status, new Date()) } }],
    { timestamps: false, updatePipeline: true },
  ).select({ _id: 1 }).lean().exec();
  return Boolean(task);
}

export async function changeTasksStatusForUser(
  userId: string,
  taskIds: string[],
  status: TaskStatus,
): Promise<number> {
  const result = await TaskModel.updateMany(
    {
      _id: { $in: taskIds.map((taskId) => requireObjectId(taskId, "task ID")) },
      userId: requireObjectId(userId, "user ID"),
      ...personalScope,
      deletedAt: null,
    },
    [{ $set: { status, completedAt: completionValue(status, new Date()) } }],
    { timestamps: false, updatePipeline: true },
  ).exec();
  return result.modifiedCount;
}

export async function changeTaskPriorityForUser(
  userId: string,
  taskId: string,
  priority: TaskPriority,
): Promise<boolean> {
  const task = await TaskModel.findOneAndUpdate(
    {
      _id: requireObjectId(taskId, "task ID"),
      userId: requireObjectId(userId, "user ID"),
      ...personalScope,
      deletedAt: null,
    },
    { priority },
    { runValidators: true, timestamps: false },
  ).select({ _id: 1 }).lean().exec();
  return Boolean(task);
}

export async function changeTasksPriorityForUser(
  userId: string,
  taskIds: string[],
  priority: TaskPriority,
): Promise<number> {
  const result = await TaskModel.updateMany(
    {
      _id: { $in: taskIds.map((taskId) => requireObjectId(taskId, "task ID")) },
      userId: requireObjectId(userId, "user ID"),
      ...personalScope,
      deletedAt: null,
    },
    { priority },
    { runValidators: true, timestamps: false },
  ).exec();
  return result.modifiedCount;
}

export async function moveTasksToGroupForUser(
  userId: string,
  taskIds: string[],
  groupId: string,
): Promise<number | null> {
  const ownerId = requireObjectId(userId, "user ID");
  const targetGroupId = requireObjectId(groupId, "group ID");
  const db = mongoose.connection.db;
  if (!db) throw new Error("Database connection is unavailable.");
  const group = await db.collection("taskgroups").findOne({
    _id: targetGroupId,
    userId: ownerId,
    ...personalScope,
    deletedAt: null,
  }, { projection: { _id: 1 } });
  if (!group) return null;

  const result = await TaskModel.updateMany(
    {
      _id: { $in: taskIds.map((taskId) => requireObjectId(taskId, "task ID")) },
      userId: ownerId,
      ...personalScope,
      deletedAt: null,
    },
    { groupId: targetGroupId },
    { runValidators: true },
  ).exec();
  return result.modifiedCount;
}

export async function removeTasksFromGroupForUser(userId: string, taskIds: string[]): Promise<number> {
  const result = await TaskModel.updateMany(
    {
      _id: { $in: taskIds.map((taskId) => requireObjectId(taskId, "task ID")) },
      userId: requireObjectId(userId, "user ID"),
      ...personalScope,
      deletedAt: null,
      groupId: { $ne: null },
    },
    { groupId: null },
    { runValidators: true },
  ).exec();
  return result.modifiedCount;
}

export async function trashTaskForUser(userId: string, taskId: string): Promise<boolean> {
  const task = await TaskModel.findOneAndUpdate(
    {
      _id: requireObjectId(taskId, "task ID"),
      userId: requireObjectId(userId, "user ID"),
      ...personalScope,
      deletedAt: null,
    },
    { deletedAt: new Date(), trashedByGroupId: null },
    { runValidators: true },
  ).select({ _id: 1 }).lean().exec();
  return Boolean(task);
}

export async function trashTasksForUser(userId: string, taskIds: string[]): Promise<number> {
  const result = await TaskModel.updateMany(
    {
      _id: { $in: taskIds.map((taskId) => requireObjectId(taskId, "task ID")) },
      userId: requireObjectId(userId, "user ID"),
      ...personalScope,
      deletedAt: null,
    },
    { deletedAt: new Date(), trashedByGroupId: null },
    { runValidators: true },
  ).exec();
  return result.modifiedCount;
}

export async function restoreTaskForUser(userId: string, taskId: string): Promise<boolean> {
  const task = await TaskModel.findOneAndUpdate(
    {
      _id: requireObjectId(taskId, "task ID"),
      userId: requireObjectId(userId, "user ID"),
      ...personalScope,
      deletedAt: { $ne: null },
    },
    { deletedAt: null, trashedByGroupId: null },
    { runValidators: true },
  ).select({ _id: 1 }).lean().exec();
  return Boolean(task);
}

export async function permanentlyDeleteTaskForUser(userId: string, taskId: string): Promise<boolean> {
  const result = await TaskModel.deleteOne({
    _id: requireObjectId(taskId, "task ID"),
    userId: requireObjectId(userId, "user ID"),
    ...personalScope,
    deletedAt: { $ne: null },
  }).exec();
  return result.deletedCount > 0;
}

export async function permanentlyDeleteTasksForUser(userId: string, taskIds: string[]): Promise<number> {
  const result = await TaskModel.deleteMany({
    _id: { $in: taskIds.map((taskId) => requireObjectId(taskId, "task ID")) },
    userId: requireObjectId(userId, "user ID"),
    ...personalScope,
    deletedAt: { $ne: null },
  }).exec();
  return result.deletedCount;
}
