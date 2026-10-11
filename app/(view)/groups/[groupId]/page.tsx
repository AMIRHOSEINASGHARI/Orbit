import { getGroupById } from "@/features/groups/actions/get-group-by-id.action";
import { GroupDetailsPage } from "@/features/groups/components/GroupDetailsPage";

export default async function GroupDetailsRoute({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;
  const result = await getGroupById({ groupId });
  return <GroupDetailsPage result={result} />;
}
