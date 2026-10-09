import { DashboardPage } from "@/features/dashboard/components/DashboardPage";
import { getDashboardAnalytics } from "@/features/dashboard/actions/dashboard-analytics.action";
import { getRecentTasks } from "@/features/dashboard/actions/recent-tasks.action";
import { getUpcomingTasks } from "@/features/dashboard/actions/upcoming-tasks.action";
import { getOverdueTasks } from "@/features/dashboard/actions/overdue-tasks.action";
import { getNoteStatistics } from "@/features/dashboard/actions/note-statistics.action";
import { getRecentNotes } from "@/features/dashboard/actions/recent-notes.action";
import { getRecentNotifications } from "@/features/dashboard/actions/recent-notifications.action";

export default async function DashboardRoute() {
  const [analytics, noteStatistics, recentTasks, upcomingTasks, overdueTasks, recentNotes, recentNotifications] = await Promise.all([getDashboardAnalytics(), getNoteStatistics(), getRecentTasks(), getUpcomingTasks(), getOverdueTasks(), getRecentNotes(), getRecentNotifications()]);
  return (
    <DashboardPage
      analytics={analytics.success ? analytics.data : null}
      noteStatistics={noteStatistics.success ? noteStatistics.data : null}
      recentTasks={recentTasks.success ? recentTasks.data : null}
      upcomingTasks={upcomingTasks.success ? upcomingTasks.data : null}
      overdueTasks={overdueTasks.success ? overdueTasks.data : null}
      recentNotes={recentNotes.success ? recentNotes.data : null}
      recentNotifications={recentNotifications.success ? recentNotifications.data : null}
      analyticsError={analytics.success ? undefined : analytics.error}
      noteError={noteStatistics.success ? undefined : noteStatistics.error}
      recentTaskError={recentTasks.success ? undefined : recentTasks.error}
      upcomingTaskError={upcomingTasks.success ? undefined : upcomingTasks.error}
      overdueTaskError={overdueTasks.success ? undefined : overdueTasks.error}
      recentNotesError={recentNotes.success ? undefined : recentNotes.error}
      recentNotificationsError={recentNotifications.success ? undefined : recentNotifications.error}
    />
  );
}
