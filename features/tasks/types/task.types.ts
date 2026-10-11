import type { Types } from "mongoose";

export const TASK_STATUSES = ["todo", "in-progress", "done"] as const;
export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];
export type TaskChecklistItem = {
  text: string;
  isCompleted: boolean;
  position: number;
  completedAt: Date | null;
};
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
  completedAt: Date | null;
  checklist: TaskChecklistItem[];
  assigneeCount: number;
  tagCount: number;
  attachmentCount: number;
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

export type TaskRecord = Omit<Task, "id" | "userId" | "groupId" | "completedAt" | "checklist" | "assigneeCount" | "tagCount" | "attachmentCount"> & {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  groupId: Types.ObjectId | null;
  workspaceId?: Types.ObjectId | null;
  assigneeIds?: Types.ObjectId[];
  tagIds?: Types.ObjectId[];
  completedAt?: Date | null;
  checklist?: TaskChecklistItem[];
  recurrence?: {
    frequency: "daily" | "weekly" | "monthly" | "weekdays" | "custom" | null;
    interval: number;
    daysOfWeek: number[];
    endAt: Date | null;
    isPaused: boolean;
  };
  reminders?: {
    remindAt: Date;
    snoozedUntil: Date | null;
    deliveredAt: Date | null;
    dismissedAt: Date | null;
  }[];
  dependencyIds?: Types.ObjectId[];
  attachmentIds?: Types.ObjectId[];
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
