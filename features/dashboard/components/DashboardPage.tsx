import { PageHeader } from "@/components/shared/PageHeader";

export function DashboardPage() {
  return (
    <main className="space-y-6 p-7">
      <PageHeader
        title="Dashboard"
        description="A clear view of your work, progress, and priorities."
        breadcrumbs="WORKSPACE / DASHBOARD"
      />
      <section aria-label="Task statistics" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4" />
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
