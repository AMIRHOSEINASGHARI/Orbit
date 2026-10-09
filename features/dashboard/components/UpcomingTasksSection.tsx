import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { RecentTask } from "@/features/dashboard/types/dashboard.types";

export function UpcomingTasksSection({ tasks, error }: { tasks: RecentTask[] | null; error?: string }) {
  return (
    <Card>
      <header className="space-y-1">
        <h2 className="text-ui-section font-semibold text-foreground">Upcoming</h2>
        <p className="text-ui-label text-muted-foreground">Tasks due today and later</p>
      </header>
      {error ? <ErrorState title="Upcoming tasks are unavailable" description={error} /> : tasks?.length ? (
        <ul className="divide-y divide-border">
          {tasks.map((task) => (
            <li key={task.id} className="flex min-h-14 items-center gap-2 py-3">
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-warning-foreground" />
              <span className="min-w-0 flex-1 truncate text-ui-small text-foreground">{task.title}</span>
              <Badge variant="secondary" className="shrink-0">{task.dueDate ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(task.dueDate)) : "No date"}</Badge>
            </li>
          ))}
        </ul>
      ) : <EmptyState title="Nothing coming up" description="Tasks with upcoming due dates will appear here." />}
    </Card>
  );
}
