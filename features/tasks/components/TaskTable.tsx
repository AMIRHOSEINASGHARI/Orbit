"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "@/components/icons";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { TaskListItem, TaskGroupOption, TaskStatus, TaskPriority } from "@/features/tasks/types/task.types";
import { TaskStatusSelect } from "./TaskStatusSelect";
import { TaskPrioritySelect } from "./TaskPrioritySelect";
import { TaskRowActions } from "./TaskRowActions";
import { TaskTablePagination } from "./TaskTablePagination";

const PAGE_SIZE = 100;
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function TaskTable({
  tasks,
  totalTasks,
  groups,
  page,
  onPageChange,
  onView,
  onEdit,
  onStatusChange,
  statusMutationPending,
  pendingStatusTaskId,
  onPriorityChange,
  priorityMutationPending,
  pendingPriorityTaskId,
  onTrash,
  trashMutationPending,
  pendingTrashTaskId,
}: {
  tasks: TaskListItem[];
  totalTasks: number;
  groups: TaskGroupOption[];
  page: number;
  onPageChange: (page: number) => void;
  onView: (taskId: string) => void;
  onEdit: (task: TaskListItem) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  statusMutationPending: boolean;
  pendingStatusTaskId?: string;
  onPriorityChange: (taskId: string, priority: TaskPriority) => void;
  priorityMutationPending: boolean;
  pendingPriorityTaskId?: string;
  onTrash: (task: TaskListItem) => void;
  trashMutationPending: boolean;
  pendingTrashTaskId?: string;
}) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const pageTasks = tasks;
  const selectedOnPage = pageTasks.filter((task) =>
    selectedIds.has(task.id),
  ).length;
  const allSelected =
    pageTasks.length > 0 && selectedOnPage === pageTasks.length;

  function toggleTask(taskId: string, selected: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (selected) next.add(taskId);
      else next.delete(taskId);
      return next;
    });
  }

  function togglePage(selected: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current);
      pageTasks.forEach(({ id }) =>
        selected ? next.add(id) : next.delete(id),
      );
      return next;
    });
  }

  return (
    <Table aria-label="Tasks">
      <TableHeader>
        <TableRow className="h-11 hover:bg-transparent">
          <TableHead className="w-10 px-3">
            <Checkbox
              aria-label="Select all tasks on this page"
              checked={allSelected}
              onCheckedChange={(checked) => togglePage(checked === true)}
            />
          </TableHead>
          <TableHead className="min-w-52 px-3">Task</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Group</TableHead>
          <TableHead>Due date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Assignees</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pageTasks.map((task) => {
          const group = task.groupId
            ? groups.find(({ id }) => id === task.groupId)
            : null;
          return (
            <TableRow
              key={task.id}
              data-state={selectedIds.has(task.id) ? "selected" : undefined}
            >
              <TableCell className="px-3">
                <Checkbox
                  aria-label={`Select ${task.title}`}
                  checked={selectedIds.has(task.id)}
                  onCheckedChange={(checked) =>
                    toggleTask(task.id, checked === true)
                  }
                />
              </TableCell>
              <TableCell
                className="max-w-64 px-3 cursor-pointer group"
                onClick={() => onView(task.id)}
              >
                <p className="truncate font-semibold text-foreground group-hover:underline">
                  {task.title}
                </p>
                {task.description && (
                  <p className="mt-0.5 truncate text-ui-caption text-muted-foreground">
                    {task.description}
                  </p>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {dateFormatter.format(task.createdAt)}
              </TableCell>
              <TableCell>
                <TaskPrioritySelect
                  task={task}
                  onPriorityChange={onPriorityChange}
                  priorityMutationPending={priorityMutationPending}
                  pendingPriorityTaskId={pendingPriorityTaskId}
                />
              </TableCell>
              <TableCell>
                {group ? (
                  <span className="inline-flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full"
                      style={{
                        backgroundColor:
                          group.color ?? "var(--muted-foreground)",
                      }}
                    />
                    {group.name}
                  </span>
                ) : task.groupId ? (
                  "—"
                ) : (
                  "Personal"
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {task.dueDate ? (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarIcon aria-hidden="true" className="size-3.5" />
                    {dateFormatter.format(task.dueDate)}
                  </span>
                ) : (
                  "—"
                )}
              </TableCell>
              <TableCell>
                <TaskStatusSelect
                  task={task}
                  onStatusChange={onStatusChange}
                  statusMutationPending={statusMutationPending}
                  pendingStatusTaskId={pendingStatusTaskId}
                />
              </TableCell>
              <TableCell className="text-muted-foreground">—</TableCell>
              <TableCell>
                <TaskRowActions
                  task={task}
                  onView={onView}
                  onEdit={onEdit}
                  onTrash={onTrash}
                  trashMutationPending={trashMutationPending}
                  pendingTrashTaskId={pendingTrashTaskId}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TaskTablePagination
        totalTasks={totalTasks}
        selectedCount={selectedIds.size}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={onPageChange}
      />
    </Table>
  );
}
