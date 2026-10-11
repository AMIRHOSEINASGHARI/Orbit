"use client";

import { Card } from "@/components/ui/card";
import { TaskTableView, type TaskTableViewProps } from "./TaskTableView";

export function TaskListView(props: TaskTableViewProps) {
  return (
    <Card role="region" aria-label="Task list" className="gap-0 p-0">
      <TaskTableView {...props} />
    </Card>
  );
}
