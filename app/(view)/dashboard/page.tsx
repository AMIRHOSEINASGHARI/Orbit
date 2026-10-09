import { DashboardPage } from "@/features/dashboard/components/DashboardPage";
import { getTaskStatistics } from "@/features/dashboard/actions/task-statistics.action";
import { getRecentTasks } from "@/features/dashboard/actions/recent-tasks.action";
import { getUpcomingTasks } from "@/features/dashboard/actions/upcoming-tasks.action";
import { getOverdueTasks } from "@/features/dashboard/actions/overdue-tasks.action";

export default async function DashboardRoute() {
  const [statistics, recentTasks, upcomingTasks, overdueTasks] = await Promise.all([getTaskStatistics(), getRecentTasks(), getUpcomingTasks(), getOverdueTasks()]);
  return (
    <DashboardPage
      statistics={statistics.success ? statistics.data : null}
      recentTasks={recentTasks.success ? recentTasks.data : null}
      upcomingTasks={upcomingTasks.success ? upcomingTasks.data : null}
      overdueTasks={overdueTasks.success ? overdueTasks.data : null}
      taskError={statistics.success ? undefined : statistics.error}
      recentTaskError={recentTasks.success ? undefined : recentTasks.error}
      upcomingTaskError={upcomingTasks.success ? undefined : upcomingTasks.error}
      overdueTaskError={overdueTasks.success ? undefined : overdueTasks.error}
    />
  );
}
