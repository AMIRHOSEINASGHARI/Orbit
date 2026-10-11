"use client";

import { EllipsisIcon, PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { TaskGroupOption, TaskListItem, TaskStatus } from "@/features/tasks/types/task.types";
import { TaskBoardCard } from "./TaskBoardCard";

const columnStyle: Record<TaskStatus, { label: string; dot: string }> = {
  todo: { label: "Todo", dot: "bg-muted-foreground" },
  "in-progress": { label: "In Progress", dot: "bg-info-foreground" },
  done: { label: "Done", dot: "bg-success-foreground" },
};

export function TaskBoardColumn({ status, tasks, groups, onAddTask, onView, onEdit, onTrash }: {
  status: TaskStatus;
  tasks: TaskListItem[];
  groups: TaskGroupOption[];
  onAddTask: (status: TaskStatus) => void;
  onView: (taskId: string) => void;
  onEdit: (task: TaskListItem) => void;
  onTrash: (task: TaskListItem) => void;
}) {
  const style = columnStyle[status];

  return (
    <section aria-label={`${style.label}, ${tasks.length} tasks`} className="flex min-h-[340px] min-w-0 flex-col overflow-hidden rounded-[12px] border border-border bg-table-header/70">
      <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border px-3">
        <h2 className="flex min-w-0 items-center gap-2 text-[13px] font-semibold text-foreground">
          <span aria-hidden="true" className={`size-2 rounded-full ${style.dot}`} />
          <span className="truncate">{style.label}</span>
          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{tasks.length}</span>
        </h2>
        <div className="flex shrink-0 items-center gap-1">
          <Button type="button" variant="ghost" size="sm" className="h-7 gap-1 px-2 text-[11px] text-primary" onClick={() => onAddTask(status)}>
            <PlusIcon aria-hidden="true" className="size-3.5" /> Add task
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button type="button" variant="ghost" size="icon-sm" aria-label={`More ${style.label} column actions`} className="size-7 text-muted-foreground" />}>
              <EllipsisIcon aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onAddTask(status)}><PlusIcon />Add task</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="min-h-0 flex-1 space-y-[10px] overflow-y-auto p-3">
        {tasks.length ? tasks.map((task) => (
          <TaskBoardCard
            key={task.id}
            task={task}
            group={groups.find(({ id }) => id === task.groupId)}
            onView={onView}
            onEdit={onEdit}
            onTrash={onTrash}
          />
        )) : (
          <p className="rounded-lg border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">No tasks in this column.</p>
        )}
      </div>
    </section>
  );
}
