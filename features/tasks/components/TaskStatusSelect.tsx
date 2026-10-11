"use client";

import { Badge } from "@/components/ui/badge";
import { Loader2Icon } from "@/components/icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { TaskListItem, TaskStatus } from "@/features/tasks/types/task.types";

const statusLabels = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
} as const;
const statusVariants = {
  todo: "todo",
  "in-progress": "info",
  done: "success",
} as const;

export function TaskStatusSelect({ task, onStatusChange, statusMutationPending, pendingStatusTaskId }: {
  task: TaskListItem;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  statusMutationPending: boolean;
  pendingStatusTaskId?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <Select
        value={task.status}
        onValueChange={(value) => {
          if (value) onStatusChange(task.id, value as TaskStatus);
        }}
        disabled={statusMutationPending}
      >
        <SelectTrigger
          aria-label={`Change status for ${task.title}`}
          aria-busy={pendingStatusTaskId === task.id}
          className="h-auto gap-[5px] rounded-full border-0 bg-transparent p-0 shadow-none hover:bg-transparent focus-visible:ring-0 disabled:opacity-60 [&>svg]:size-3 [&>svg]:text-muted-foreground"
        >
          <SelectValue>
            <Badge
              variant={statusVariants[task.status]}
              className="gap-1.5 px-[9px] py-[5px]"
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-current"
              />
              {statusLabels[task.status]}
            </Badge>
          </SelectValue>
        </SelectTrigger>
        <SelectContent align="start">
          <SelectItem value="todo">To do</SelectItem>
          <SelectItem value="in-progress">In progress</SelectItem>
          <SelectItem value="done">Done</SelectItem>
        </SelectContent>
      </Select>
      {pendingStatusTaskId === task.id && statusMutationPending && (
        <Loader2Icon
          aria-label="Saving status"
          className="size-3.5 animate-spin text-muted-foreground"
        />
      )}
    </span>
  );
}
