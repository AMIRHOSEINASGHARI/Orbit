import Link from "next/link";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
          <TableRow key={task.id} className="h-16">
            <TableCell className="max-w-0 px-4">
              <p className="truncate font-semibold text-foreground">{task.title}</p>
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
              <Badge variant={priorityVariants[task.priority]}>{task.priority}</Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {task.dueDate ? dateFormatter.format(task.dueDate) : "—"}
            </TableCell>
            <TableCell>
              <Badge variant={statusVariants[task.status]}>{statusLabels[task.status]}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function TasksPage({ result }: { result: ActionResult<TaskListItem[]> }) {
  const content = !result.success ? (
    <ErrorState
      title="Tasks are unavailable"
      description={result.error}
      action={
        <Button variant="outline" render={<Link href="/tasks" />}>
          Try again
        </Button>
      }
    />
  ) : result.data.length ? (
    <section aria-label="Task list" className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <TaskTable tasks={result.data} />
    </section>
  ) : (
    <EmptyState
      title="No tasks yet"
      description="Create a task and it will appear here."
    />
  );

  return (
    <main className="space-y-6 p-5 sm:p-7">
      <PageHeader
        title="Tasks"
        description="Plan, prioritize, and move work forward with your team."
        breadcrumbs="WORKSPACE / TASKS"
      />

      {content}
    </main>
  );
}
