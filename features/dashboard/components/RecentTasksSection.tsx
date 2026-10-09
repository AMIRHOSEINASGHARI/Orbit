import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { RecentTask } from "@/features/dashboard/types/dashboard.types";

const statusLabel: Record<RecentTask["status"], string> = {
  todo: "Todo",
  "in-progress": "In progress",
  done: "Done",
};

const priorityVariants: Record<
  RecentTask["priority"],
  "success" | "warning" | "danger"
> = {
  low: "success",
  medium: "warning",
  high: "danger",
};
const statusVariants: Record<
  RecentTask["status"],
  "todo" | "info" | "success"
> = {
  todo: "todo",
  "in-progress": "info",
  done: "success",
};

export function RecentTasksSection({
  tasks,
  error,
}: {
  tasks: RecentTask[] | null;
  error?: string;
}) {
  return (
    <Card className="gap-0 p-0">
      <header className="flex h-16 items-center justify-between px-5">
        <h2 className="text-ui-section font-semibold text-foreground">
          Recent tasks
        </h2>
        <Link
          href="/tasks"
          className="inline-flex items-center gap-1 text-ui-small font-semibold text-primary hover:underline"
        >
          View all tasks{" "}
          <ArrowRightIcon aria-hidden="true" className="size-3.5" />
        </Link>
      </header>
      {error ? (
        <div className="px-5 pb-5">
          <ErrorState
            title="Recent tasks are unavailable"
            description={error}
          />
        </div>
      ) : tasks?.length ? (
        <Table className="min-w-[680px] border-none text-left">
          <TableHeader className="text-ui-caption font-semibold uppercase text-muted-foreground">
            <TableRow className="h-auto border-0 hover:bg-transparent">
              {["Task", "Group", "Priority", "Due", "Status"].map((label) => (
                <TableHead
                  key={label}
                  scope="col"
                  className="h-auto border-y border-border px-4 py-3"
                >
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow
                key={task.id}
                className="h-auto border-b border-border last:border-0 hover:bg-transparent"
              >
                <TableHead
                  scope="row"
                  className="h-auto max-w-80 px-4 py-[21px] text-left normal-case text-ui-small font-semibold text-foreground"
                >
                  {task.title}
                </TableHead>
                <TableCell className="px-4 py-[21px] text-ui-label text-muted-foreground">
                  {task.groupName ?? (task.groupId ? "Group" : "Personal")}
                </TableCell>
                <TableCell className="px-4 py-[21px]">
                  <Badge
                    className="capitalize"
                    variant={priorityVariants[task.priority]}
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block size-1.5 rounded-full bg-current"
                    />
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-[21px] text-ui-label text-muted-foreground">
                  {task.dueDate
                    ? new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        timeZone: "UTC",
                      }).format(new Date(task.dueDate))
                    : "—"}
                </TableCell>
                <TableCell className="px-4 py-[21px]">
                  <Badge variant={statusVariants[task.status]}>
                    <span
                      aria-hidden="true"
                      className="inline-block size-1.5 rounded-full bg-current"
                    />
                    {statusLabel[task.status]}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="px-5 pb-5">
          <EmptyState
            title="No tasks yet"
            description="Create a task and it will appear here."
          />
        </div>
      )}
      <footer className="flex h-11 items-center justify-between px-5 text-ui-label text-muted-foreground">
        <span>{tasks?.length ?? 0} recent tasks</span>
        <span>Current workload</span>
      </footer>
    </Card>
  );
}
