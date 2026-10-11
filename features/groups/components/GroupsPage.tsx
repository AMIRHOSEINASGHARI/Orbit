"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "@/components/icons";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getGroups } from "@/features/groups/actions/get-groups.action";
import { GroupCreationDialog } from "@/features/groups/components/GroupCreationDialog";
import { groupColorClass } from "@/features/groups/constants/group-colors";
import type { GroupListItem } from "@/features/groups/types/group.types";
import type { ActionResult } from "@/types";

export function GroupsPage({ initialResult, userId }: {
  initialResult: ActionResult<GroupListItem[]>;
  userId: string;
}) {
  const [createOpen, setCreateOpen] = useState(false);
  const query = useQuery({
    queryKey: ["groups", userId],
    queryFn: () => getGroups(),
    initialData: initialResult,
  });
  const groups = query.data.success ? query.data.data : [];
  const errorDescription = query.isError
    ? "Groups could not be loaded. Please try again."
    : query.data.success ? undefined : query.data.error;

  return (
    <main className="space-y-6 p-5 sm:p-7">
      <PageHeader
        title="Groups"
        description="Organize related tasks in one place."
        breadcrumbs="WORKSPACE / GROUPS"
        actions={<Button onClick={() => setCreateOpen(true)}><PlusIcon aria-hidden="true" />Create group</Button>}
      />

      {query.isError || !query.data.success ? (
        <ErrorState description={errorDescription} action={<Button variant="outline" onClick={() => void query.refetch()}>Try again</Button>} />
      ) : groups.length === 0 ? (
        <EmptyState
          title="No groups yet"
          description="Create a group to organize related tasks together."
          action={<Button onClick={() => setCreateOpen(true)}><PlusIcon aria-hidden="true" />Create group</Button>}
        />
      ) : (
        <section aria-label="Groups" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {groups.map((group) => (
            <Card key={group.id} className="min-h-[89px] p-5">
              <Link href={`/groups/${group.id}`} className="flex min-w-0 items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                <span aria-hidden="true" className={`size-2.5 shrink-0 rounded-full ${groupColorClass(group.color)}`} />
                <span className="truncate font-semibold">{group.name}</span>
              </Link>
            </Card>
          ))}
        </section>
      )}

      <GroupCreationDialog open={createOpen} onOpenChange={setCreateOpen} />
    </main>
  );
}
