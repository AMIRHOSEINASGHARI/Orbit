"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "@/components/icons";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { TaskListItem, TaskGroupOption, TaskStatus, TaskPriority } from "@/features/tasks/types/task.types";
import { TaskStatusSelect } from "./TaskStatusSelect";
import { TaskPrioritySelect } from "./TaskPrioritySelect";
import { TaskRowActions } from "./TaskRowActions";
import { TaskTablePagination } from "./TaskTablePagination";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export type TaskTableViewProps = {
  tasks: TaskListItem[];
  totalTasks: number;
  pageSize: number;
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
  selectedTaskIds: Set<string>;
  onSelectedTaskIdsChange: (taskIds: Set<string>) => void;
};

export function TaskTableView({ tasks, totalTasks, pageSize, groups, page, onPageChange, onView, onEdit, onStatusChange, statusMutationPending, pendingStatusTaskId, onPriorityChange, priorityMutationPending, pendingPriorityTaskId, onTrash, trashMutationPending, pendingTrashTaskId, selectedTaskIds, onSelectedTaskIdsChange }: TaskTableViewProps) {
  const pageTasks = tasks;
  const selectedOnPage = pageTasks.filter((task) =>
    selectedTaskIds.has(task.id),
  ).length;
  const allSelected =
    pageTasks.length > 0 && selectedOnPage === pageTasks.length;

  function toggleTask(taskId: string, selected: boolean) {
    const next = new Set(selectedTaskIds);
    if (selected) next.add(taskId);
    else next.delete(taskId);
    onSelectedTaskIdsChange(next);
  }

  function togglePage(selected: boolean) {
    const next = new Set(selectedTaskIds);
    pageTasks.forEach(({ id }) => selected ? next.add(id) : next.delete(id));
    onSelectedTaskIdsChange(next);
  }

  return (
    <Table aria-label="Task table">
      <TableHeader>
        <TableRow className="h-11 hover:bg-transparent">
          <TableHead className="w-10 px-3">
            <Checkbox
              aria-label="Select all tasks on this page"
              checked={allSelected}
              indeterminate={selectedOnPage > 0 && !allSelected}
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
              data-state={selectedTaskIds.has(task.id) ? "selected" : undefined}
            >
              <TableCell className="px-3">
                <Checkbox
                  aria-label={`Select ${task.title}`}
                  checked={selectedTaskIds.has(task.id)}
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
                {task.checklist.length > 0 && <p className="mt-0.5 text-ui-caption text-muted-foreground">{task.checklist.filter((item) => item.isCompleted).length}/{task.checklist.length} checklist</p>}
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
              <TableCell className="text-muted-foreground">{task.assigneeCount ? `${task.assigneeCount} assigned` : "—"}</TableCell>
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
        selectedCount={selectedTaskIds.size}
        page={page}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </Table>
  );
}
