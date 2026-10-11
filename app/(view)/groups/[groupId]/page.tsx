import { getGroupById } from "@/features/groups/actions/get-group-by-id.action";
import { GroupDetailsPage } from "@/features/groups/components/GroupDetailsPage";
import { getTasks } from "@/features/tasks/actions/get-tasks.action";

export default async function GroupDetailsRoute({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;
  const [result, tasksResult] = await Promise.all([getGroupById({ groupId }), getTasks({ groupId })]);
  return <GroupDetailsPage result={result} tasksResult={tasksResult} />;
}
