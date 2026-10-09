import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { RecentTask } from "@/features/dashboard/types/dashboard.types";

const statusLabel: Record<RecentTask["status"], string> = {
  todo: "Todo",
  "in-progress": "In progress",
  done: "Done",
};

const priorityStyles: Record<RecentTask["priority"], string> = {
  low: "bg-success text-success-foreground",
  medium: "bg-warning text-warning-foreground",
  high: "bg-danger text-danger-foreground",
};
const statusStyles: Record<RecentTask["status"], string> = {
  todo: "bg-muted text-muted-foreground",
  "in-progress": "bg-info text-info-foreground",
  done: "bg-success text-success-foreground",
};

export function RecentTasksSection({ tasks, error }: { tasks: RecentTask[] | null; error?: string }) {
  return (
    <Card className="gap-0 p-0">
      <header className="flex h-16 items-center justify-between px-5">
        <h2 className="text-ui-section font-semibold text-foreground">Recent tasks</h2>
        <Link href="/tasks" className="inline-flex items-center gap-1 text-ui-small font-semibold text-primary hover:underline">
          View all tasks <ArrowRightIcon aria-hidden="true" className="size-3.5" />
        </Link>
      </header>
      {error ? <div className="px-5 pb-5"><ErrorState title="Recent tasks are unavailable" description={error} /></div> : tasks?.length ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead className="bg-table-header text-ui-caption font-semibold uppercase text-muted-foreground">
              <tr>{["Task", "Group", "Priority", "Due", "Status"].map((label) => <th key={label} scope="col" className="border-y border-border px-4 py-3">{label}</th>)}</tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b border-border last:border-0">
                  <th scope="row" className="max-w-80 px-4 py-[21px] text-ui-small font-semibold text-foreground">{task.title}</th>
                  <td className="px-4 py-[21px] text-ui-label text-muted-foreground">{task.groupName ?? (task.groupId ? "Group" : "Personal")}</td>
                  <td className="px-4 py-[21px]"><Badge className={priorityStyles[task.priority]}><span aria-hidden="true" className="mr-1 inline-block size-1.5 rounded-full bg-current" />{task.priority}</Badge></td>
                  <td className="px-4 py-[21px] text-ui-label text-muted-foreground">{task.dueDate ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(task.dueDate)) : "—"}</td>
                  <td className="px-4 py-[21px]"><Badge className={statusStyles[task.status]}><span aria-hidden="true" className="mr-1 inline-block size-1.5 rounded-full bg-current" />{statusLabel[task.status]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-5 pb-5"><EmptyState title="No tasks yet" description="Create a task and it will appear here." /></div>
      )}
      <footer className="flex h-11 items-center justify-between px-5 text-ui-label text-muted-foreground">
        <span>{tasks?.length ?? 0} recent tasks</span><span>Current workload</span>
      </footer>
    </Card>
  );
}
