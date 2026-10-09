import { DashboardPage } from "@/features/dashboard/components/DashboardPage";
import { getTaskStatistics } from "@/features/dashboard/actions/task-statistics.action";
import { getRecentTasks } from "@/features/dashboard/actions/recent-tasks.action";
import { getUpcomingTasks } from "@/features/dashboard/actions/upcoming-tasks.action";
import { getOverdueTasks } from "@/features/dashboard/actions/overdue-tasks.action";
import { getGroupStatistics } from "@/features/dashboard/actions/group-statistics.action";
import { getNoteStatistics } from "@/features/dashboard/actions/note-statistics.action";

export default async function DashboardRoute() {
  const [statistics, groupStatistics, noteStatistics, recentTasks, upcomingTasks, overdueTasks] = await Promise.all([getTaskStatistics(), getGroupStatistics(), getNoteStatistics(), getRecentTasks(), getUpcomingTasks(), getOverdueTasks()]);
  return (
    <DashboardPage
      statistics={statistics.success ? statistics.data : null}
      groupStatistics={groupStatistics.success ? groupStatistics.data : null}
      noteStatistics={noteStatistics.success ? noteStatistics.data : null}
      recentTasks={recentTasks.success ? recentTasks.data : null}
      upcomingTasks={upcomingTasks.success ? upcomingTasks.data : null}
      overdueTasks={overdueTasks.success ? overdueTasks.data : null}
      taskError={statistics.success ? undefined : statistics.error}
      groupError={groupStatistics.success ? undefined : groupStatistics.error}
      noteError={noteStatistics.success ? undefined : noteStatistics.error}
      recentTaskError={recentTasks.success ? undefined : recentTasks.error}
      upcomingTaskError={upcomingTasks.success ? undefined : upcomingTasks.error}
      overdueTaskError={overdueTasks.success ? undefined : overdueTasks.error}
    />
  );
}
