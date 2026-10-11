"use client";

import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import type { TaskListItem } from "@/features/tasks/types/task.types";
import type { ActionResult } from "@/types";

export function TaskTrashDialog({ taskToTrash, onClose, onConfirm }: {
  taskToTrash: TaskListItem | null;
  onClose: () => void;
  onConfirm: (taskId: string) => Promise<ActionResult<{ message: string }>>;
}) {
  return (
    <ConfirmationDialog
      open={taskToTrash !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="Move task to trash?"
      description={taskToTrash ? `“${taskToTrash.title}” will be moved to Trash. You can restore it later.` : "This task will be moved to Trash. You can restore it later."}
      confirmLabel="Move to Trash"
      onConfirm={async () => {
        if (!taskToTrash) return;
        const result = await onConfirm(taskToTrash.id);
        if (!result.success) throw new Error(result.error);
        onClose();
      }}
    />
  );
}
