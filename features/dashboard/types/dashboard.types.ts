export type RecentTask = {
  id: string;
  title: string;
  groupId: string | null;
  groupName?: string | null;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
  dueDate: string | null;
};

export type OverdueTasks = {
  items: RecentTask[];
  total: number;
};

export type NoteStatistics = { total: number };
