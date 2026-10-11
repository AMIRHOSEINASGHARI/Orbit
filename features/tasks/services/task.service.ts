import "server-only";
import mongoose from "mongoose";
import { TaskModel } from "@/features/tasks/models/task.model";
import type { TaskInput } from "@/features/tasks/schemas/task.schema";
import type { TaskGroupOption, TaskListFilters, TaskRecord } from "@/features/tasks/types/task.types";

function requireObjectId(value: string, field: string): mongoose.Types.ObjectId {
  if (!mongoose.isValidObjectId(value)) throw new Error(`Invalid ${field}.`);
  return new mongoose.Types.ObjectId(value);
}

export async function listTasks(
  userId: string,
  filters: TaskListFilters = {},
): Promise<TaskRecord[]> {
  const query: mongoose.QueryFilter<TaskRecord> = {
    userId: requireObjectId(userId, "user ID"),
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

  const sort: Record<string, mongoose.SortOrder> = filters.sort === "updated-asc"
    ? { updatedAt: 1 }
    : filters.sort === "created-desc" ? { createdAt: -1 } : { updatedAt: -1 };
  return TaskModel.find(query).sort(sort).lean<TaskRecord[]>().exec();
}

export async function getTaskById(
  userId: string,
  taskId: string,
): Promise<TaskRecord | null> {
  return TaskModel.findOne({
    _id: requireObjectId(taskId, "task ID"),
    userId: requireObjectId(userId, "user ID"),
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
  }>({ userId: requireObjectId(userId, "user ID"), deletedAt: null }, {
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
      deletedAt: null,
    }, { projection: { _id: 1 } });
    if (!group) return null;
  }

  const task = await TaskModel.create({ ...input, userId: ownerId, groupId });
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
      deletedAt: null,
    }, { projection: { _id: 1 } });
    if (!group) return "invalid-group";
  }

  const task = await TaskModel.findOneAndUpdate(
    { _id: id, userId: ownerId, deletedAt: null },
    { ...input, groupId },
    { new: true, runValidators: true },
  ).select({ _id: 1 }).lean().exec();
  return task ? "updated" : "not-found";
}
