import type { Types } from "mongoose";

export const TASK_STATUSES = ["todo", "in-progress", "done"] as const;
export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];
export const TASK_SORT_OPTIONS = [
  "updated-desc",
  "updated-asc",
  "created-desc",
  "due-date-asc",
  "priority-desc",
] as const;
export const TASK_PAGE_SIZE = 30;
export type TaskSortOption = (typeof TASK_SORT_OPTIONS)[number];

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

export type TaskListItem = Omit<Task, "userId">;
export type TaskListPage = {
  tasks: TaskListItem[];
  total: number;
  page: number;
  pageSize: number;
};

export type TaskRecord = Omit<Task, "id" | "userId" | "groupId"> & {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  groupId: Types.ObjectId | null;
  trashedByGroupId?: Types.ObjectId | null;
};

export type TaskListFilters = {
  search?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  groupId?: string | "personal";
  dueDate?: string;
  sort?: TaskSortOption;
  page?: number;
  pageSize?: number;
  includeDeleted?: boolean;
  includeArchived?: boolean;
};

export type TaskGroupOption = {
  id: string;
  name: string;
  color: string | null;
};
