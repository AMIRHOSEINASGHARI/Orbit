"use client";

import { Card } from "@/components/ui/card";
import { TaskTable, type TaskTableProps } from "./TaskTable";

export function TaskListView(props: TaskTableProps) {
  return (
    <Card role="region" aria-label="Task list" className="gap-0 p-0">
      <TaskTable {...props} />
    </Card>
  );
}
