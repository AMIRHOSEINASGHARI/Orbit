import "server-only";
import mongoose from "mongoose";
import { TaskModel } from "@/features/tasks/models/task.model";
import type { TaskListFilters, TaskRecord } from "@/features/tasks/types/task.types";

function requireObjectId(value: string, field: string): mongoose.Types.ObjectId {
  if (!mongoose.isValidObjectId(value)) throw new Error(`Invalid ${field}.`);
  return new mongoose.Types.ObjectId(value);
}

export async function listTasks(
  userId: string,
  filters: TaskListFilters = {},
): Promise<TaskRecord[]> {
  const query: mongoose.FilterQuery<TaskRecord> = {
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
