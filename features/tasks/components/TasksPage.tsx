"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ActionResult } from "@/types";
import type { TaskListItem } from "@/features/tasks/types/task.types";
import { TasksViewSwitcher } from "@/features/tasks/components/TasksViewSwitcher";
import { TasksToolbar } from "@/features/tasks/components/TasksToolbar";
import { getTasks } from "@/features/tasks/actions/get-tasks.action";
import { taskKeys } from "@/features/tasks/queries/task-keys";
import type {
  TaskGroupOption,
  TaskListFilters,
} from "@/features/tasks/types/task.types";

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

const statusVariants = {
  todo: "todo",
  "in-progress": "info",
  done: "success",
} as const;

const priorityVariants = {
  low: "info",
  medium: "warning",
  high: "danger",
} as const;

function TaskTable({ tasks }: { tasks: TaskListItem[] }) {
  return (
    <Table aria-label="Tasks">
      <TableHeader>
        <TableRow className="h-11 hover:bg-transparent">
          <TableHead className="w-[40%] px-4">Task</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Due date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id} className="h-14">
            <TableCell className="max-w-0 px-4">
              <p className="truncate font-semibold text-foreground">
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
              <Badge variant={priorityVariants[task.priority]}>
                {task.priority}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {task.dueDate ? dateFormatter.format(task.dueDate) : "—"}
            </TableCell>
            <TableCell>
              <Badge variant={statusVariants[task.status]}>
                {statusLabels[task.status]}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
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
        <TaskTable tasks={taskResult.data} />
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

      <TasksToolbar filters={filters} groups={groups} onChange={setFilters} />

      {content}
    </main>
  );
}
