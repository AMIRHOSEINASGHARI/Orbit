import type { Types } from "mongoose";

export type TaskGroup = {
  id: string;
  userId: string;
  workspaceId: string | null;
  name: string;
  description: string;
  color: string | null;
  deletedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TaskGroupRecord = Omit<TaskGroup, "id" | "userId" | "workspaceId"> & {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  workspaceId: Types.ObjectId | null;
};

export type GroupListItem = Omit<TaskGroup, "userId"> & {
  taskCount: number;
  todoCount: number;
  inProgressCount: number;
  doneCount: number;
  completionPercent: number;
};

export const GROUP_SORT_OPTIONS = ["updated-desc", "updated-asc", "created-desc", "name-asc", "task-count-desc"] as const;
export type GroupSortOption = (typeof GROUP_SORT_OPTIONS)[number];
export type GroupListFilters = { search?: string; sort?: GroupSortOption };
