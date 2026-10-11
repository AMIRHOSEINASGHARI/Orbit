"use client";

import { Button } from "@/components/ui/button";
import { EyeIcon, PencilIcon, Trash2Icon, Loader2Icon } from "@/components/icons";
import type { TaskListItem } from "@/features/tasks/types/task.types";

export function TaskRowActions({ task, onView, onEdit, onTrash, trashMutationPending, pendingTrashTaskId }: {
  task: TaskListItem;
  onView: (taskId: string) => void;
  onEdit: (task: TaskListItem) => void;
  onTrash: (task: TaskListItem) => void;
  trashMutationPending: boolean;
  pendingTrashTaskId?: string;
}) {
  return (
    <div className="flex justify-end">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`View ${task.title}`}
        title="View task details"
        onClick={() => onView(task.id)}
        className="rounded-lg text-muted-foreground"
      >
        <EyeIcon />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Edit ${task.title}`}
        title="Edit task"
        className="rounded-lg text-muted-foreground"
        onClick={() => onEdit(task)}
      >
        <PencilIcon />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Move ${task.title} to trash`}
        title="Move to trash"
        disabled={trashMutationPending}
        onClick={() => onTrash(task)}
        className="rounded-lg text-destructive disabled:opacity-100"
      >
        {pendingTrashTaskId === task.id && trashMutationPending
          ? <Loader2Icon className="animate-spin" />
          : <Trash2Icon />}
      </Button>
    </div>
  );
}
