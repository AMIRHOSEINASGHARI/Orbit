"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import type { ActionResult } from "@/types";
import type { TaskListItem, TaskListFilters, TaskGroupOption } from "@/features/tasks/types/task.types";
import { TasksViewSwitcher } from "@/features/tasks/components/TasksViewSwitcher";
import { TasksToolbar } from "@/features/tasks/components/TasksToolbar";
import { getTasks } from "@/features/tasks/actions/get-tasks.action";
import { taskKeys } from "@/features/tasks/queries/task-keys";
import { TaskDetailsDrawer } from "@/features/tasks/components/task-details-drawer";

const PAGE_SIZE = 10;
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const statusLabels = { todo: "To do", "in-progress": "In progress", done: "Done" } as const;
const statusVariants = { todo: "todo", "in-progress": "info", done: "success" } as const;
const priorityVariants = { low: "info", medium: "warning", high: "danger" } as const;

function TaskTable({
  tasks,
  groups,
  page,
  onPageChange,
  onView,
}: {
  tasks: TaskListItem[];
  groups: TaskGroupOption[];
  page: number;
  onPageChange: (page: number) => void;
  onView: (taskId: string) => void;
}) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const pageCount = Math.max(1, Math.ceil(tasks.length / PAGE_SIZE));
  const pageTasks = tasks.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const selectedOnPage = pageTasks.filter((task) => selectedIds.has(task.id)).length;
  const allSelected = pageTasks.length > 0 && selectedOnPage === pageTasks.length;

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
      pageTasks.forEach(({ id }) => selected ? next.add(id) : next.delete(id));
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
          const group = task.groupId ? groups.find(({ id }) => id === task.groupId) : null;
          return (
            <TableRow key={task.id} data-state={selectedIds.has(task.id) ? "selected" : undefined}>
              <TableCell className="px-3">
                <Checkbox
                  aria-label={`Select ${task.title}`}
                  checked={selectedIds.has(task.id)}
                  onCheckedChange={(checked) => toggleTask(task.id, checked === true)}
                />
              </TableCell>
              <TableCell className="max-w-64 px-3">
                <p className="truncate font-semibold text-foreground">{task.title}</p>
                {task.description && <p className="mt-0.5 truncate text-ui-caption text-muted-foreground">{task.description}</p>}
              </TableCell>
              <TableCell className="text-muted-foreground">{dateFormatter.format(task.createdAt)}</TableCell>
              <TableCell><Badge variant={priorityVariants[task.priority]}>{task.priority}</Badge></TableCell>
              <TableCell>
                {group ? (
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: group.color ?? "var(--muted-foreground)" }} />
                    {group.name}
                  </span>
                ) : task.groupId ? "—" : "Personal"}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {task.dueDate ? <span className="inline-flex items-center gap-1.5"><CalendarIcon aria-hidden="true" className="size-3.5" />{dateFormatter.format(task.dueDate)}</span> : "—"}
              </TableCell>
              <TableCell><Badge variant={statusVariants[task.status]}>{statusLabels[task.status]}</Badge></TableCell>
              <TableCell className="text-muted-foreground">—</TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Button type="button" variant="ghost" size="icon-xs" aria-label={`View ${task.title}`} title="View task details" onClick={() => onView(task.id)}>
                    <EyeIcon />
                  </Button>
                  <Button type="button" variant="ghost" size="icon-xs" disabled aria-label={`Edit ${task.title}`} title="Task editing is being implemented">
                    <PencilIcon />
                  </Button>
                  <Button type="button" variant="ghost" size="icon-xs" disabled aria-label={`Delete ${task.title}`} title="Task deletion is being implemented">
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
                Showing {tasks.length ? page * PAGE_SIZE + 1 : 0}–{Math.min((page + 1) * PAGE_SIZE, tasks.length)} of {tasks.length} tasks
                {selectedIds.size > 0 && ` · ${selectedIds.size} selected`}
              </span>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="icon-sm" aria-label="Previous page" disabled={page === 0} onClick={() => onPageChange(page - 1)}><ChevronLeftIcon /></Button>
                <span aria-live="polite" className="min-w-16 text-center text-ui-caption text-muted-foreground">Page {page + 1} of {pageCount}</span>
                <Button type="button" variant="outline" size="icon-sm" aria-label="Next page" disabled={page + 1 >= pageCount} onClick={() => onPageChange(page + 1)}><ChevronRightIcon /></Button>
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
        description={tasksQuery.error instanceof Error ? tasksQuery.error.message : taskResult.success ? "Please try again." : taskResult.error}
        action={<Button variant="outline" onClick={() => void tasksQuery.refetch()}>Try again</Button>}
      />
    ) : taskResult.data.length ? (
      <Card role="region" aria-label="Task list" className="gap-0 p-0">
        <TaskTable key={JSON.stringify(filters)} tasks={taskResult.data} groups={groups} page={page} onPageChange={setPage} onView={setOpenTaskId} />
      </Card>
    ) : (
      <EmptyState
        title={hasFilters ? "No matching tasks" : "No tasks yet"}
        description={hasFilters ? "Try changing or clearing your filters." : "Create a task and it will appear here."}
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
      <TasksToolbar filters={filters} groups={groups} onChange={(nextFilters) => { setFilters(nextFilters); setPage(0); }} />
      {content}
      <TaskDetailsDrawer userId={userId} taskId={openTaskId} groups={groups} open={openTaskId !== null} onOpenChange={(open) => { if (!open) setOpenTaskId(null); }} />
    </main>
  );
}
