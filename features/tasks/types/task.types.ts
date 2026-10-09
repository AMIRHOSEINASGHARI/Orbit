import type { Types } from "mongoose";

export const TASK_STATUSES = ["todo", "in-progress", "done"] as const;
export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export type Task = {
  id: string;
  userId: string;
  groupId: string | null;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
  deletedAt: Date | null;
  archivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TaskRecord = Omit<Task, "id" | "userId" | "groupId"> & {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  groupId: Types.ObjectId | null;
};

export type TaskListFilters = {
  status?: TaskStatus;
  priority?: TaskPriority;
  includeDeleted?: boolean;
  includeArchived?: boolean;
};
