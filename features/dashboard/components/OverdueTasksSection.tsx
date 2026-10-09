import Link from "next/link";
import { ClockAlertIcon } from "@/components/icons";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { OverdueTasks } from "@/features/dashboard/types/dashboard.types";

export function OverdueTasksSection({ overdue, error }: { overdue: OverdueTasks | null; error?: string }) {
  return (
    <Card>
      <header className="flex items-center justify-between gap-2">
        <h2 className="text-ui-section font-semibold text-foreground">Needs attention</h2>
        <Badge className="bg-danger text-danger-foreground">{overdue?.total ?? 0} overdue</Badge>
      </header>
      {error ? <ErrorState title="Overdue tasks are unavailable" description={error} /> : overdue?.items.length ? (
        <ul className="space-y-3">
          {overdue.items.map((task) => (
            <li key={task.id} className="rounded-lg bg-danger p-3.5">
              <div className="flex items-start gap-2">
                <ClockAlertIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-danger-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="text-ui-small font-semibold text-foreground">{task.title}</p>
                  <p className="mt-2 text-ui-label text-danger-foreground">Overdue since {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(task.dueDate!))} · {task.priority} priority</p>
                </div>
              </div>
              <Link href={`/tasks/${task.id}`} className={buttonVariants({ variant: "outline", size: "sm", className: "mt-3 bg-card" })}>Open task</Link>
            </li>
          ))}
        </ul>
      ) : <EmptyState title="You're all caught up" description="Overdue tasks will appear here when they need your attention." />}
    </Card>
  );
}
