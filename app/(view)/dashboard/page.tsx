import { DashboardPage } from "@/features/dashboard/components/DashboardPage";
import { getTaskStatistics } from "@/features/dashboard/actions/task-statistics.action";
import { getRecentTasks } from "@/features/dashboard/actions/recent-tasks.action";
import { getUpcomingTasks } from "@/features/dashboard/actions/upcoming-tasks.action";

export default async function DashboardRoute() {
  const [statistics, recentTasks, upcomingTasks] = await Promise.all([getTaskStatistics(), getRecentTasks(), getUpcomingTasks()]);
  return (
    <DashboardPage
      statistics={statistics.success ? statistics.data : null}
      recentTasks={recentTasks.success ? recentTasks.data : null}
      upcomingTasks={upcomingTasks.success ? upcomingTasks.data : null}
      taskError={statistics.success ? undefined : statistics.error}
      recentTaskError={recentTasks.success ? undefined : recentTasks.error}
      upcomingTaskError={upcomingTasks.success ? undefined : upcomingTasks.error}
    />
  );
}
