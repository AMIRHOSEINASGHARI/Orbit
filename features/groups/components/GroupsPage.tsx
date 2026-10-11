"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "@/components/icons";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { getGroups } from "@/features/groups/actions/get-groups.action";
import { GroupCreationDialog } from "@/features/groups/components/GroupCreationDialog";
import { GroupCard } from "@/features/groups/components/GroupCard";
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
          {groups.map((group) => <GroupCard key={group.id} group={group} />)}
        </section>
      )}

      <GroupCreationDialog open={createOpen} onOpenChange={setCreateOpen} />
    </main>
  );
}
