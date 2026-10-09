import type { TaskListFilters } from "@/features/tasks/types/task.types";

export const taskKeys = {
  all: (userId: string) => ["tasks", userId] as const,
  lists: (userId: string) => [...taskKeys.all(userId), "list"] as const,
  list: (userId: string, filters: TaskListFilters = {}) =>
    [...taskKeys.lists(userId), filters] as const,
  details: (userId: string) => [...taskKeys.all(userId), "detail"] as const,
  detail: (userId: string, taskId: string) =>
    [...taskKeys.details(userId), taskId] as const,
};
