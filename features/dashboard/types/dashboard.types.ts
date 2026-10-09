import type { TaskPriority, TaskStatus } from "@/features/tasks/types/task.types";

export type RecentTask = {
  id: string;
  title: string;
  groupId: string | null;
  groupName?: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | null;
};

export type OverdueTasks = {
  items: RecentTask[];
  total: number;
};

export type NoteStatistics = { total: number };
