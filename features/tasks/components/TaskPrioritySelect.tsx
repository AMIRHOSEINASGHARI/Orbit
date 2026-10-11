"use client";

import { Badge } from "@/components/ui/badge";
import { Loader2Icon } from "@/components/icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { TaskListItem, TaskPriority } from "@/features/tasks/types/task.types";

const priorityLabels = { low: "Low", medium: "Medium", high: "High" } as const;
const priorityVariants = {
  low: "success",
  medium: "warning",
  high: "danger",
} as const;

export function TaskPrioritySelect({ task, onPriorityChange, priorityMutationPending, pendingPriorityTaskId }: {
  task: TaskListItem;
  onPriorityChange: (taskId: string, priority: TaskPriority) => void;
  priorityMutationPending: boolean;
  pendingPriorityTaskId?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <Select
        value={task.priority}
        onValueChange={(value) => {
          if (value) onPriorityChange(task.id, value as TaskPriority);
        }}
        disabled={priorityMutationPending}
      >
        <SelectTrigger
          aria-label={`Change priority for ${task.title}`}
          aria-busy={pendingPriorityTaskId === task.id}
          className="h-auto gap-[5px] rounded-full border-0 bg-transparent p-0 shadow-none hover:bg-transparent focus-visible:ring-0 disabled:opacity-60 [&>svg]:size-3 [&>svg]:text-muted-foreground"
        >
          <SelectValue>
            <Badge
              variant={priorityVariants[task.priority]}
              className="gap-1.5 px-[9px] py-[5px]"
            >
              <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
              {priorityLabels[task.priority]}
            </Badge>
          </SelectValue>
        </SelectTrigger>
        <SelectContent align="start">
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
      {pendingPriorityTaskId === task.id && priorityMutationPending && (
        <Loader2Icon aria-label="Saving priority" className="size-3.5 animate-spin text-muted-foreground" />
      )}
    </span>
  );
}
