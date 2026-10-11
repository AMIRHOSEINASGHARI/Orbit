import { getTrashedGroups } from "@/features/groups/actions/get-trashed-groups.action";
import { TrashedGroupsPage } from "@/features/groups/components/TrashedGroupsPage";

export default async function GroupsTrashRoute() {
  const result = await getTrashedGroups();
  return <TrashedGroupsPage result={result} />;
}
