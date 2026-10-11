import { getGroups } from "@/features/groups/actions/get-groups.action";
import { GroupsPage } from "@/features/groups/components/GroupsPage";
import { getCurrentUser } from "@/lib/auth/current-user";
import { GROUP_SORT_OPTIONS } from "@/features/groups/types/group.types";

export default async function GroupsRoute({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search.slice(0, 200) : "";
  const sort = GROUP_SORT_OPTIONS.find((option) => option === params.sort) ?? "updated-desc";
  const [result, user] = await Promise.all([getGroups({ search, sort }), getCurrentUser()]);
  return <GroupsPage initialResult={result} userId={user?.id ?? "unauthenticated"} initialSearch={search} initialSort={sort} />;
}
