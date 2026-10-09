import { DashboardPage } from "@/features/dashboard/components/DashboardPage";
import { getTaskStatistics } from "@/features/dashboard/actions/task-statistics.action";

export default async function DashboardRoute() {
  const result = await getTaskStatistics();
  return <DashboardPage statistics={result.success ? result.data : null} error={result.success ? undefined : result.error} />;
}
