import { getGroups } from "@/features/groups/actions/get-groups.action";
import { GroupsPage } from "@/features/groups/components/GroupsPage";
import { getCurrentUser } from "@/lib/auth/current-user";

export default async function GroupsRoute() {
  const [result, user] = await Promise.all([getGroups(), getCurrentUser()]);
  return <GroupsPage initialResult={result} userId={user?.id ?? "unauthenticated"} />;
}
