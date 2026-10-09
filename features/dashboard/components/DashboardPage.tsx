import { PageHeader } from "@/components/shared/PageHeader";
import { CircleDotIcon, LayersIcon } from "@/components/icons";
import { TaskMetricCard } from "@/features/dashboard/components/TaskMetricCard";

export function DashboardPage({ totalTasks = null, todoTasks = null }: { totalTasks?: number | null; todoTasks?: number | null }) {
  return (
    <main className="space-y-6 p-7">
      <PageHeader
        title="Dashboard"
        description="A clear view of your work, progress, and priorities."
        breadcrumbs="WORKSPACE / DASHBOARD"
      />
      <section aria-label="Task statistics" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <TaskMetricCard title="Total tasks" value={totalTasks} description="Current workload" icon={<LayersIcon className="size-4" />} />
        <TaskMetricCard title="Todo tasks" value={todoTasks} description="Waiting to get started" icon={<CircleDotIcon className="size-4" />} />
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
