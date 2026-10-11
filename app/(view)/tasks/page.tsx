import { getTasks } from "@/features/tasks/actions/get-tasks.action";
import { getTaskGroupOptions } from "@/features/tasks/actions/create-task.action";
import { TasksPage } from "@/features/tasks/components/TasksPage";
import { getCurrentUser } from "@/lib/auth/current-user";

export default async function TasksRoute({ searchParams }: {
  searchParams: Promise<{ search?: string | string[] }>;
}) {
  const params = await searchParams;
  const initialSearch = typeof params.search === "string" ? params.search : "";
  const [result, groupResult, user] = await Promise.all([
    getTasks(initialSearch ? { search: initialSearch } : {}),
    getTaskGroupOptions(),
    getCurrentUser(),
  ]);
  return <TasksPage result={result} userId={user?.id ?? "unauthenticated"} groups={groupResult.success ? groupResult.data : []} initialSearch={initialSearch} />;
}
