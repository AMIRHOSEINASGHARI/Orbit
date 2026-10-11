"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  Loader2Icon,
  PencilIcon,
  Trash2Icon,
} from "@/components/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeTaskStatusAction } from "@/features/tasks/actions/change-task-status.action";
import { changeTaskPriorityAction } from "@/features/tasks/actions/change-task-priority.action";
import type { ActionResult } from "@/types";
import type {
  TaskListItem,
  TaskListFilters,
  TaskGroupOption,
  TaskPriority,
  TaskStatus,
} from "@/features/tasks/types/task.types";
import { TasksViewSwitcher } from "@/features/tasks/components/TasksViewSwitcher";
import { TasksToolbar } from "@/features/tasks/components/TasksToolbar";
import { getTasks } from "@/features/tasks/actions/get-tasks.action";
import { taskKeys } from "@/features/tasks/queries/task-keys";
import { TaskDetailsDrawer } from "@/features/tasks/components/task-details-drawer";
import { TaskCreationDialog } from "@/features/tasks/components/task-creation-dialog";

const PAGE_SIZE = 10;
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const statusLabels = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
} as const;
const priorityLabels = { low: "Low", medium: "Medium", high: "High" } as const;
const statusVariants = {
  todo: "todo",
  "in-progress": "info",
  done: "success",
} as const;
const priorityVariants = {
  low: "success",
  medium: "warning",
  high: "danger",
} as const;

function TaskTable({
  tasks,
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
}: {
  tasks: TaskListItem[];
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
}) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const pageCount = Math.max(1, Math.ceil(tasks.length / PAGE_SIZE));
  const pageTasks = tasks.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
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
              </TableCell>
              <TableCell className="text-muted-foreground">—</TableCell>
              <TableCell>
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
                    disabled
                    aria-label={`Delete ${task.title}`}
                    title="Task deletion is being implemented"
                    className="rounded-lg text-destructive disabled:opacity-100"
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow className="h-12 hover:bg-transparent">
          <TableCell colSpan={9} className="px-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-ui-caption text-muted-foreground">
                Showing {tasks.length ? page * PAGE_SIZE + 1 : 0}–
                {Math.min((page + 1) * PAGE_SIZE, tasks.length)} of{" "}
                {tasks.length} tasks
                {selectedIds.size > 0 && ` · ${selectedIds.size} selected`}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  aria-label="Previous page"
                  disabled={page === 0}
                  onClick={() => onPageChange(page - 1)}
                >
                  <ChevronLeftIcon />
                </Button>
                <span
                  aria-live="polite"
                  className="min-w-16 text-center text-ui-caption text-muted-foreground"
                >
                  Page {page + 1} of {pageCount}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  aria-label="Next page"
                  disabled={page + 1 >= pageCount}
                  onClick={() => onPageChange(page + 1)}
                >
                  <ChevronRightIcon />
                </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export function TasksPage({
  result,
  userId,
  groups,
}: {
  result: ActionResult<TaskListItem[]>;
  userId: string;
  groups: TaskGroupOption[];
}) {
  const [filters, setFilters] = useState<TaskListFilters>({});
  const [page, setPage] = useState(0);
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<TaskListItem | null>(null);
  const queryClient = useQueryClient();
  const statusMutation = useMutation({
    mutationFn: (input: { taskId: string; status: TaskStatus }) =>
      changeTaskStatusAction(input),
    onSuccess: (result, { taskId, status }) => {
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success(result.data.message);
      queryClient.setQueryData<ActionResult<TaskListItem[]>>(
        taskKeys.list(userId, filters),
        (current) => current?.success
          ? {
              ...current,
              data: current.data.flatMap((task) => {
                if (task.id !== taskId) return [task];
                if (filters.status && filters.status !== status) return [];
                return [{ ...task, status }];
              }),
            }
          : current,
      );
      queryClient.setQueryData<ActionResult<TaskListItem>>(
        taskKeys.detail(userId, taskId),
        (current) => current?.success
          ? { ...current, data: { ...current.data, status } }
          : current,
      );
    },
    onError: () =>
      toast.error("Unable to update task status. Please try again."),
  });
  const priorityMutation = useMutation({
    mutationFn: (input: { taskId: string; priority: TaskPriority }) =>
      changeTaskPriorityAction(input),
    onSuccess: (result, { taskId, priority }) => {
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success(result.data.message);
      queryClient.setQueryData<ActionResult<TaskListItem[]>>(
        taskKeys.list(userId, filters),
        (current) => current?.success
          ? {
              ...current,
              data: current.data.flatMap((task) => {
                if (task.id !== taskId) return [task];
                if (filters.priority && filters.priority !== priority) return [];
                return [{ ...task, priority }];
              }),
            }
          : current,
      );
      queryClient.setQueryData<ActionResult<TaskListItem>>(
        taskKeys.detail(userId, taskId),
        (current) => current?.success
          ? { ...current, data: { ...current.data, priority } }
          : current,
      );
    },
    onError: () =>
      toast.error("Unable to update task priority. Please try again."),
  });
  const tasksQuery = useQuery({
    queryKey: taskKeys.list(userId, filters),
    queryFn: () => getTasks(filters),
    initialData: result,
    placeholderData: (previousData) => previousData ?? result,
  });
  const taskResult = tasksQuery.data;
  const hasFilters = Object.values(filters).some(Boolean);

  const content =
    tasksQuery.isError || !taskResult.success ? (
      <ErrorState
        title="Tasks are unavailable"
        description={
          tasksQuery.error instanceof Error
            ? tasksQuery.error.message
            : taskResult.success
              ? "Please try again."
              : taskResult.error
        }
        action={
          <Button variant="outline" onClick={() => void tasksQuery.refetch()}>
            Try again
          </Button>
        }
      />
    ) : taskResult.data.length ? (
      <Card role="region" aria-label="Task list" className="gap-0 p-0">
        <TaskTable
          key={JSON.stringify(filters)}
          tasks={taskResult.data}
          groups={groups}
          page={page}
          onPageChange={setPage}
          onView={setOpenTaskId}
          onEdit={setEditingTask}
          onStatusChange={(taskId, status) =>
            statusMutation.mutate({ taskId, status })
          }
          statusMutationPending={statusMutation.isPending}
          pendingStatusTaskId={statusMutation.variables?.taskId}
          onPriorityChange={(taskId, priority) =>
            priorityMutation.mutate({ taskId, priority })
          }
          priorityMutationPending={priorityMutation.isPending}
          pendingPriorityTaskId={priorityMutation.variables?.taskId}
        />
      </Card>
    ) : (
      <EmptyState
        title={hasFilters ? "No matching tasks" : "No tasks yet"}
        description={
          hasFilters
            ? "Try changing or clearing your filters."
            : "Create a task and it will appear here."
        }
      />
    );

  return (
    <main className="space-y-6 p-5 sm:p-7">
      <PageHeader
        title="Tasks"
        description="Plan, prioritize, and move work forward with your team."
        breadcrumbs="WORKSPACE / TASKS"
        actions={<TasksViewSwitcher />}
      />
      <TasksToolbar
        filters={filters}
        groups={groups}
        onChange={(nextFilters) => {
          setFilters(nextFilters);
          setPage(0);
        }}
      />
      {content}
      <TaskCreationDialog
        open={editingTask !== null}
        onOpenChange={(open) => {
          if (!open) setEditingTask(null);
        }}
        task={editingTask}
      />
      <TaskDetailsDrawer
        userId={userId}
        taskId={openTaskId}
        groups={groups}
        open={openTaskId !== null}
        onOpenChange={(open) => {
          if (!open) setOpenTaskId(null);
        }}
      />
    </main>
  );
}
