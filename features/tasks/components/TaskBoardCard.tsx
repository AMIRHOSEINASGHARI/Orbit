"use client";

import { format } from "date-fns";
import type { DragEvent, KeyboardEvent } from "react";
import { CalendarIcon, EllipsisIcon, EyeIcon, GripVerticalIcon, PencilIcon, Trash2Icon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { TaskGroupOption, TaskListItem, TaskPriority, TaskStatus } from "@/features/tasks/types/task.types";

const priorityStyle: Record<TaskPriority, { variant: "danger" | "warning" | "success"; label: string }> = {
  high: { variant: "danger", label: "High" },
  medium: { variant: "warning", label: "Medium" },
  low: { variant: "success", label: "Low" },
};
const statusStyle: Record<TaskStatus, { variant: "todo" | "info" | "success"; label: string }> = {
  todo: { variant: "todo", label: "Todo" },
  "in-progress": { variant: "info", label: "In Progress" },
  done: { variant: "success", label: "Done" },
};

export function TaskBoardCard({ task, group, dragging, keyboardDragging, onView, onEdit, onTrash, onPointerDragStart, onPointerDragEnd, onKeyboardAction }: {
  task: TaskListItem;
  group?: TaskGroupOption;
  dragging: boolean;
  keyboardDragging: boolean;
  onView: (taskId: string) => void;
  onEdit: (task: TaskListItem) => void;
  onTrash: (task: TaskListItem) => void;
  onPointerDragStart: (taskId: string) => void;
  onPointerDragEnd: () => void;
  onKeyboardAction: (taskId: string, action: "pickup" | "drop" | "cancel" | "left" | "right") => void;
}) {
  const priority = priorityStyle[task.priority];
  const status = statusStyle[task.status];

  return (
    <article
      id={`task-board-card-${task.id}`}
      draggable
      tabIndex={0}
      aria-label={`${task.title}, ${status.label}, ${priority.label} priority`}
      aria-roledescription="draggable task"
      onDragStart={(event: DragEvent<HTMLElement>) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", task.id);
        onPointerDragStart(task.id);
      }}
      onDragEnd={onPointerDragEnd}
      onKeyDown={(event: KeyboardEvent<HTMLElement>) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault();
          onKeyboardAction(task.id, keyboardDragging ? "drop" : "pickup");
        } else if (keyboardDragging && event.key === "ArrowLeft") {
          event.preventDefault();
          onKeyboardAction(task.id, "left");
        } else if (keyboardDragging && event.key === "ArrowRight") {
          event.preventDefault();
          onKeyboardAction(task.id, "right");
        } else if (keyboardDragging && event.key === "Escape") {
          event.preventDefault();
          onKeyboardAction(task.id, "cancel");
        }
      }}
      className={`flex min-h-[145px] flex-col gap-[11px] rounded-[10px] border border-border bg-card p-[14px] shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring ${dragging ? "opacity-50" : ""} ${keyboardDragging ? "ring-2 ring-primary" : ""}`}
    >
      <header className="flex w-full items-center gap-2">
        <GripVerticalIcon aria-hidden="true" className="size-[15px] shrink-0 text-subtle-foreground" />
        <span className="min-w-0 flex-1 truncate text-[10px] font-semibold text-subtle-foreground">{task.id.slice(-6).toUpperCase()}</span>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button type="button" variant="ghost" size="icon-sm" aria-label={`Actions for ${task.title}`} className="size-[30px] shrink-0 text-muted-foreground" />}>
            <EllipsisIcon aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => onView(task.id)}><EyeIcon />View details</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(task)}><PencilIcon />Edit task</DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={() => onTrash(task)}><Trash2Icon />Move to trash</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <button type="button" onClick={() => onView(task.id)} className="line-clamp-2 w-full text-left text-[14px] font-semibold leading-[1.35] text-foreground hover:underline">
        {task.title}
      </button>
      <div className="flex flex-wrap items-center gap-[7px]">
        <Badge variant={priority.variant} className="gap-1.5 px-[9px] py-[5px]">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
          {priority.label}
        </Badge>
        <Badge variant={status.variant} className="gap-1.5 px-[9px] py-[5px]">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
          {status.label}
        </Badge>
      </div>
      <footer className="mt-auto flex min-w-0 items-center gap-2 text-[10px] text-muted-foreground">
        {group && (
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full" style={{ backgroundColor: group.color ?? "var(--muted-foreground)" }} />
            <span className="truncate">{group.name}</span>
          </span>
        )}
        {task.dueDate && (
          <span className="inline-flex shrink-0 items-center gap-1">
            <CalendarIcon aria-hidden="true" className="size-3" />
            {format(task.dueDate, "MMM d")}
          </span>
        )}
      </footer>
    </article>
  );
}
