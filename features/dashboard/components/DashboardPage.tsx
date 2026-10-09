import { PageHeader } from "@/components/shared/PageHeader";
import { ErrorState } from "@/components/shared/ErrorState";
import { CircleCheckIcon, CircleDotIcon, LayersIcon, TimerIcon } from "@/components/icons";
import { TaskMetricCard } from "@/features/dashboard/components/TaskMetricCard";
import { RecentTasksSection } from "@/features/dashboard/components/RecentTasksSection";
import { UpcomingTasksSection } from "@/features/dashboard/components/UpcomingTasksSection";
import { OverdueTasksSection } from "@/features/dashboard/components/OverdueTasksSection";
import type { OverdueTasks, RecentTask, TaskStatistics } from "@/features/dashboard/types/dashboard.types";

export function DashboardPage({ statistics, recentTasks, upcomingTasks, overdueTasks, taskError, recentTaskError, upcomingTaskError, overdueTaskError }: {
  statistics: TaskStatistics | null;
  recentTasks: RecentTask[] | null;
  upcomingTasks: RecentTask[] | null;
  overdueTasks: OverdueTasks | null;
  taskError?: string;
  recentTaskError?: string;
  upcomingTaskError?: string;
  overdueTaskError?: string;
}) {
  return (
    <main className="space-y-6 p-7">
      <PageHeader
        title="Dashboard"
        description="A clear view of your work, progress, and priorities."
        breadcrumbs="WORKSPACE / DASHBOARD"
      />
      {taskError && <ErrorState title="Task statistics are unavailable" description={taskError} />}
      <section aria-label="Task statistics" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <TaskMetricCard title="Total tasks" value={statistics?.total ?? null} description="Current workload" icon={<LayersIcon className="size-4" />} />
        <TaskMetricCard title="Todo tasks" value={statistics?.todo ?? null} description="Waiting to get started" icon={<CircleDotIcon className="size-4" />} />
        <TaskMetricCard title="In Progress tasks" value={statistics?.inProgress ?? null} description="Currently in progress" icon={<TimerIcon className="size-4" />} />
        <TaskMetricCard title="Done tasks" value={statistics?.done ?? null} description="Completed tasks" icon={<CircleCheckIcon className="size-4" />} />
      </section>
      <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
        <RecentTasksSection tasks={recentTasks} error={recentTaskError} />
        <div className="space-y-5">
          <OverdueTasksSection overdue={overdueTasks} error={overdueTaskError} />
          <UpcomingTasksSection tasks={upcomingTasks} error={upcomingTaskError} />
        </div>
      </div>
    </main>
  );
}
