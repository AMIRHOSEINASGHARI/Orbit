import { CalendarDaysIcon, LayersIcon } from "@/components/icons";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageHeader } from "@/components/shared/PageHeader";
import { DashboardAnalyticsSection } from "@/features/dashboard/components/DashboardAnalyticsSection";
import { DashboardExportButton } from "@/features/dashboard/components/DashboardExportButton";
import { DashboardMetricCard } from "@/features/dashboard/components/DashboardMetricCard";
import { NeedsAttentionSection } from "@/features/dashboard/components/NeedsAttentionSection";
import { RecentTasksSection } from "@/features/dashboard/components/RecentTasksSection";
import { WorkspaceUpdatesSection } from "@/features/dashboard/components/WorkspaceUpdatesSection";
import type { DashboardAnalytics } from "@/features/dashboard/actions/dashboard-analytics.action";
import type { RecentNote } from "@/features/dashboard/actions/recent-notes.action";
import type { RecentNotification } from "@/features/dashboard/actions/recent-notifications.action";
import type { NoteStatistics, OverdueTasks, RecentTask } from "@/features/dashboard/types/dashboard.types";

export function DashboardPage({ analytics, noteStatistics, recentTasks, upcomingTasks, overdueTasks, recentNotes, recentNotifications, analyticsError, noteError, recentTaskError, upcomingTaskError, overdueTaskError, recentNotesError, recentNotificationsError }: {
  analytics: DashboardAnalytics | null;
  noteStatistics: NoteStatistics | null;
  recentTasks: RecentTask[] | null;
  upcomingTasks: RecentTask[] | null;
  overdueTasks: OverdueTasks | null;
  recentNotes: RecentNote[] | null;
  recentNotifications: RecentNotification[] | null;
  analyticsError?: string;
  noteError?: string;
  recentTaskError?: string;
  upcomingTaskError?: string;
  overdueTaskError?: string;
  recentNotesError?: string;
  recentNotificationsError?: string;
}) {
  const scope = <span aria-label="Personal dashboard" className="inline-flex h-9 items-center gap-2 rounded-md border border-primary/20 bg-primary-tint px-3 text-ui-small font-medium text-primary">Personal</span>;
  const period = analytics?.trend.length ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).formatRange(new Date(`${analytics.trend[0].date}T00:00:00Z`), new Date(`${analytics.trend.at(-1)!.date}T00:00:00Z`)) : "Last 7 days";
  return <main className="space-y-6 p-5 sm:p-7">
    <PageHeader title="Dashboard" description="A clear view of your work, progress, and priorities." breadcrumbs="WORKSPACE / DASHBOARD" actions={scope} />
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-ui-label text-muted-foreground">Current workload</p>
      <div className="flex flex-wrap items-center gap-2"><span className="inline-flex h-[38px] items-center gap-2 rounded-md border border-input bg-card px-3 text-ui-small text-foreground"><CalendarDaysIcon aria-hidden="true" className="size-4 text-muted-foreground" />{period}</span>{analytics && <DashboardExportButton data={analytics} />}</div>
    </div>
    {analyticsError ? <ErrorState title="Dashboard analytics are unavailable" description={analyticsError} /> : analytics ? <DashboardAnalyticsSection data={analytics} /> : <section aria-label="Task statistics" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"><DashboardMetricCard title="Task statistics" value={null} description="Loading dashboard data" icon={<LayersIcon className="size-4" />} /></section>}
    <section aria-label="Tasks and priorities" className="grid gap-5 xl:grid-cols-[2fr_1fr]">
      <RecentTasksSection tasks={recentTasks} error={recentTaskError} />
      <NeedsAttentionSection overdue={overdueTasks} upcoming={upcomingTasks} overdueError={overdueTaskError} upcomingError={upcomingTaskError} />
    </section>
    <WorkspaceUpdatesSection notes={recentNotes} notifications={recentNotifications} noteCount={noteStatistics?.total ?? null} noteError={recentNotesError ?? noteError} notificationError={recentNotificationsError} />
  </main>;
}
