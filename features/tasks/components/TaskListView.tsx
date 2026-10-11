"use client";

import { Card } from "@/components/ui/card";
import { TaskTableView, type TaskTableViewProps } from "./TaskTableView";

export function TaskListView({ hidden = false, ...props }: TaskTableViewProps & { hidden?: boolean }) {
  return (
    <Card hidden={hidden} role="region" aria-label="Task table view" className="gap-0 p-0">
      <TaskTableView {...props} />
    </Card>
  );
}
