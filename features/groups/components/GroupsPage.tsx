"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PlusIcon, SearchIcon } from "@/components/icons";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingState } from "@/components/shared/LoadingState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getGroups } from "@/features/groups/actions/get-groups.action";
import { GroupCreationDialog } from "@/features/groups/components/GroupCreationDialog";
import { GroupCard } from "@/features/groups/components/GroupCard";
import { GroupEditDialog } from "@/features/groups/components/GroupEditDialog";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { trashGroup } from "@/features/groups/actions/trash-group.action";
import type { GroupListItem } from "@/features/groups/types/group.types";
import { GROUP_SORT_OPTIONS, type GroupSortOption } from "@/features/groups/types/group.types";
import type { ActionResult } from "@/types";

export function GroupsPage({ initialResult, userId, initialSearch = "", initialSort = "updated-desc" }: {
  initialResult: ActionResult<GroupListItem[]>;
  userId: string;
  initialSearch?: string;
  initialSort?: GroupSortOption;
}) {
  const [createOpen, setCreateOpen] = useState(false);
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState<GroupSortOption>(initialSort);
  const [editing, setEditing] = useState<GroupListItem | null>(null);
  const [trashTarget, setTrashTarget] = useState<GroupListItem | null>(null);
  const queryClient = useQueryClient();
  const trashMutation = useMutation({
    mutationFn: async (groupId: string) => {
      const result = await trashGroup({ groupId });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (result) => {
      toast.success(result.message);
      void queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
  function updateUrl(nextSearch: string, nextSort: GroupSortOption) {
    const params = new URLSearchParams(window.location.search);
    if (nextSearch) params.set("search", nextSearch); else params.delete("search");
    if (nextSort !== "updated-desc") params.set("sort", nextSort); else params.delete("sort");
    const queryString = params.toString();
    window.history.replaceState(null, "", queryString ? `/groups?${queryString}` : "/groups");
  }
  const query = useQuery({
    queryKey: ["groups", userId, search, sort],
    queryFn: () => getGroups({ search, sort }),
    initialData: search === initialSearch && sort === initialSort ? initialResult : undefined,
  });
  const groups = query.data?.success ? query.data.data : [];
  const errorDescription = query.isError
    ? "Groups could not be loaded. Please try again."
    : query.data && !query.data.success ? query.data.error : undefined;

  return (
    <main className="space-y-6 p-5 sm:p-7">
      <PageHeader
        title="Groups"
        description="Organize related tasks in one place."
        breadcrumbs="WORKSPACE / GROUPS"
        actions={<div className="flex gap-2"><Button variant="outline" render={<Link href="/groups/trash" />}>Group Trash</Button><Button onClick={() => setCreateOpen(true)}><PlusIcon aria-hidden="true" />Create group</Button></div>}
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="relative block w-full max-w-md">
          <SearchIcon aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" value={search} onChange={(event) => { setSearch(event.target.value); updateUrl(event.target.value, sort); }} placeholder="Search groups" aria-label="Search groups" className="pl-9" />
        </label>
        <label className="grid gap-1 text-xs font-medium text-muted-foreground">Sort by
          <select value={sort} onChange={(event) => { const nextSort = event.target.value as GroupSortOption; setSort(nextSort); updateUrl(search, nextSort); }} aria-label="Sort groups" className="h-9 min-w-44 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring">
            {GROUP_SORT_OPTIONS.map((option) => <option key={option} value={option}>{option === "updated-desc" ? "Last updated" : option === "updated-asc" ? "Least recently updated" : option === "created-desc" ? "Recently created" : option === "name-asc" ? "Name A–Z" : "Most tasks"}</option>)}
          </select>
        </label>
      </div>

      {query.isPending ? <LoadingState label="Loading groups…" /> : query.isError || !query.data?.success ? (
        <ErrorState description={errorDescription} action={<Button variant="outline" onClick={() => void query.refetch()}>Try again</Button>} />
      ) : groups.length === 0 && search ? (
        <EmptyState title="No matching groups" description={`No groups match “${search}”. Try a different search.`} />
      ) : groups.length === 0 ? (
        <EmptyState
          title="No groups yet"
          description="Create a group to organize related tasks together."
          action={<Button onClick={() => setCreateOpen(true)}><PlusIcon aria-hidden="true" />Create group</Button>}
        />
      ) : (
        <section aria-label="Groups" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {groups.map((group) => <GroupCard key={group.id} group={group} onEdit={setEditing} onTrash={setTrashTarget} />)}
        </section>
      )}

      <GroupCreationDialog open={createOpen} onOpenChange={setCreateOpen} />
      <GroupEditDialog group={editing} open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)} />
      <ConfirmationDialog open={Boolean(trashTarget)} onOpenChange={(open) => !open && setTrashTarget(null)} title={`Move “${trashTarget?.name ?? "group"}” to Trash?`} description="Its active tasks will move to Trash with it. You can restore them together later." confirmLabel="Move to Trash" onConfirm={async () => { if (!trashTarget) return; await trashMutation.mutateAsync(trashTarget.id); setTrashTarget(null); }} />
    </main>
  );
}
