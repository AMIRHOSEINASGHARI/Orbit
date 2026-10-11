import { getGroupById } from "@/features/groups/actions/get-group-by-id.action";
import { GroupDetailsPage } from "@/features/groups/components/GroupDetailsPage";
import { getTasks } from "@/features/tasks/actions/get-tasks.action";
import { getTaskGroupOptions } from "@/features/tasks/actions/create-task.action";
import { getCurrentUser } from "@/lib/auth/current-user";

export default async function GroupDetailsRoute({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;
  const [result, tasksResult, groupOptions, user] = await Promise.all([
    getGroupById({ groupId }),
    getTasks({ groupId }),
    getTaskGroupOptions(),
    getCurrentUser(),
  ]);
  return <GroupDetailsPage result={result} tasksResult={tasksResult} groups={groupOptions.success ? groupOptions.data : []} userId={user?.id ?? "unauthenticated"} />;
}
