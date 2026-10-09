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

  return TaskModel.find(query).sort({ updatedAt: -1 }).lean<TaskRecord[]>().exec();
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
