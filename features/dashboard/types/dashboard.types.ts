export type TaskStatistics = {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
  overdue: number;
};

export type RecentTask = {
  id: string;
  title: string;
  groupId: string | null;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
  dueDate: string | null;
};
