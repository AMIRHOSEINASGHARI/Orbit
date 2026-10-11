import Link from "next/link";
import { ChevronLeftIcon } from "@/components/icons";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { groupColorClass } from "@/features/groups/constants/group-colors";
import type { GroupListItem } from "@/features/groups/types/group.types";
import type { ActionResult } from "@/types";

export function GroupDetailsPage({ result }: { result: ActionResult<GroupListItem> }) {
  if (!result.success) return <main className="p-6"><EmptyState title="Group unavailable" description={result.error} action={<Button render={<Link href="/groups" />}><ChevronLeftIcon />Back to groups</Button>} /></main>;
  const group = result.data;
  return (
    <main className="space-y-6 p-5 sm:p-7">
      <PageHeader title={group.name} description={group.description || "Group details and related tasks."} breadcrumbs="WORKSPACE / GROUPS / DETAILS" actions={<Button variant="outline" render={<Link href="/groups" />}><ChevronLeftIcon />All groups</Button>} />
      <Card className="space-y-4 p-5">
        <div className="flex items-center gap-3"><span aria-hidden="true" className={`size-3 rounded-full ${groupColorClass(group.color)}`} /><h2 className="text-lg font-semibold">Group overview</h2></div>
        <div className="grid gap-4 sm:grid-cols-4">
          <p><span className="block text-sm text-muted-foreground">Total tasks</span><strong>{group.taskCount}</strong></p>
          <p><span className="block text-sm text-muted-foreground">To do</span><strong>{group.todoCount}</strong></p>
          <p><span className="block text-sm text-muted-foreground">In progress</span><strong>{group.inProgressCount}</strong></p>
          <p><span className="block text-sm text-muted-foreground">Done</span><strong>{group.doneCount} · {group.completionPercent}%</strong></p>
        </div>
      </Card>
    </main>
  );
}
