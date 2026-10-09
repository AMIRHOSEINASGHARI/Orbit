import Link from "next/link";
import { ClockAlertIcon } from "@/components/icons";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type {
  OverdueTasks,
  RecentTask,
} from "@/features/dashboard/types/dashboard.types";

function shortDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export function NeedsAttentionSection({
  overdue,
  upcoming,
  overdueError,
  upcomingError,
}: {
  overdue: OverdueTasks | null;
  upcoming: RecentTask[] | null;
  overdueError?: string;
  upcomingError?: string;
}) {
  const task = overdue?.items[0];
  return (
    <Card className="min-h-[446px] p-5">
      <header className="flex items-center justify-between gap-2">
        <h2 className="text-ui-section font-semibold text-foreground">
          Needs attention
        </h2>
        <Badge variant="danger">{overdue?.total ?? 0} overdue</Badge>
      </header>
      <div className="mt-4">
        {overdueError ? (
          <ErrorState
            title="Overdue tasks are unavailable"
            description={overdueError}
          />
        ) : task ? (
          <div className="rounded-lg bg-danger p-3.5">
            <div className="flex items-start gap-2">
              <ClockAlertIcon
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-danger-foreground"
              />
              <div className="min-w-0">
                <p className="text-ui-small font-semibold text-foreground">
                  {task.title}
                </p>
                <p className="mt-2 text-ui-label text-danger-foreground">
                  Overdue since {task.dueDate ? shortDate(task.dueDate) : "—"} ·{" "}
                  {task.priority} priority
                </p>
              </div>
            </div>
            <Link
              href={`/tasks/${task.id}`}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "mt-3 bg-card",
              })}
            >
              Open task
            </Link>
          </div>
        ) : (
          <EmptyState
            title="You're all caught up"
            description="Overdue tasks will appear here when they need your attention."
          />
        )}
      </div>
      <h3 className="mt-4 text-ui-caption font-semibold uppercase text-muted-foreground">
        Upcoming
      </h3>
      {upcomingError ? (
        <ErrorState
          title="Upcoming tasks are unavailable"
          description={upcomingError}
        />
      ) : upcoming?.length ? (
        <ul className="mt-1 divide-y divide-border">
          {upcoming.map((item) => (
            <li
              key={item.id}
              className="flex min-h-[62px] items-center gap-2 py-2"
            >
              <span
                aria-hidden="true"
                className={`size-1.5 shrink-0 rounded-full ${item.dueDate && item.dueDate.slice(0, 10) === new Date().toISOString().slice(0, 10) ? "bg-warning-foreground" : "bg-muted-foreground"}`}
              />
              <span className="min-w-0 flex-1 truncate text-ui-label text-foreground">
                {item.title}
              </span>
              {item.dueDate && (
                <Badge variant="secondary" className="shrink-0">
                  {shortDate(item.dueDate)}
                </Badge>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-4 text-ui-label text-muted-foreground">
          Nothing coming up.
        </p>
      )}
    </Card>
  );
}
