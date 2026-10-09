import { PageHeader } from "@/components/shared/PageHeader";
import { ErrorState } from "@/components/shared/ErrorState";
import { CircleCheckIcon, CircleDotIcon, LayersIcon, TimerIcon } from "@/components/icons";
import { TaskMetricCard } from "@/features/dashboard/components/TaskMetricCard";
import type { TaskStatistics } from "@/features/dashboard/types/dashboard.types";

export function DashboardPage({ statistics, error }: { statistics: TaskStatistics | null; error?: string }) {
  return (
    <main className="space-y-6 p-7">
      <PageHeader
        title="Dashboard"
        description="A clear view of your work, progress, and priorities."
        breadcrumbs="WORKSPACE / DASHBOARD"
      />
      {error && <ErrorState title="Task statistics are unavailable" description={error} />}
      <section aria-label="Task statistics" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <TaskMetricCard title="Total tasks" value={statistics?.total ?? null} description="Current workload" icon={<LayersIcon className="size-4" />} />
        <TaskMetricCard title="Todo tasks" value={statistics?.todo ?? null} description="Waiting to get started" icon={<CircleDotIcon className="size-4" />} />
        <TaskMetricCard title="In Progress tasks" value={statistics?.inProgress ?? null} description="Currently in progress" icon={<TimerIcon className="size-4" />} />
        <TaskMetricCard title="Done tasks" value={statistics?.done ?? null} description="Completed tasks" icon={<CircleCheckIcon className="size-4" />} />
      </section>
      <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
        <section aria-label="Task overview" />
        <section aria-label="Task priorities" />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <section aria-label="Recent tasks" />
        <section aria-label="Workspace updates" />
      </div>
    </main>
  );
}
