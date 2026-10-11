"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { restoreGroup } from "@/features/groups/actions/restore-group.action";
import { permanentlyDeleteGroup } from "@/features/groups/actions/permanently-delete-group.action";
import { Trash2Icon } from "@/components/icons";
import type { GroupListItem } from "@/features/groups/types/group.types";
import type { ActionResult } from "@/types";

export function TrashedGroupsPage({ result }: { result: ActionResult<GroupListItem[]> }) {
  const [error, setError] = useState<string>();
  const [deleteTarget, setDeleteTarget] = useState<GroupListItem | null>(null);
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (groupId: string) => {
      const response = await restoreGroup({ groupId });
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    onSuccess: (data) => { toast.success(data.message); void client.invalidateQueries({ queryKey: ["groups"] }); window.location.reload(); },
    onError: (cause) => setError(cause instanceof Error ? cause.message : "Unable to restore group."),
  });
  const deleteMutation = useMutation({
    mutationFn: async (groupId: string) => {
      const response = await permanentlyDeleteGroup({ groupId });
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    onSuccess: (data) => { toast.success(data.message); window.location.reload(); },
    onError: (cause) => setError(cause instanceof Error ? cause.message : "Unable to delete group."),
  });
  return <main className="space-y-6 p-5 sm:p-7">
    <PageHeader title="Group Trash" description="Restore groups and the tasks moved with them." breadcrumbs="WORKSPACE / GROUPS / TRASH" actions={<Button variant="outline" render={<Link href="/groups" />}>Back to groups</Button>} />
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    {!result.success ? <p role="alert" className="text-sm text-destructive">{result.error}</p> : result.data.length === 0 ? <EmptyState title="No groups in Trash" description="Groups you move to Trash will appear here." /> : <section className="space-y-3" aria-label="Trashed groups">{result.data.map((group) => <Card key={group.id} className="flex items-center justify-between gap-4 p-4"><div className="min-w-0"><p className="font-semibold">{group.name}</p><p className="text-sm text-muted-foreground">{group.taskCount} tasks</p></div><div className="flex gap-2"><Button variant="outline" disabled={mutation.isPending || deleteMutation.isPending} onClick={() => mutation.mutate(group.id)}>Restore</Button><Button variant="destructive" size="icon" aria-label={`Permanently delete ${group.name}`} disabled={mutation.isPending || deleteMutation.isPending} onClick={() => setDeleteTarget(group)}><Trash2Icon /></Button></div></Card>)}</section>}
    <ConfirmationDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)} title={`Permanently delete “${deleteTarget?.name ?? "group"}”?`} description="This permanently deletes the group and all of its tasks. This action cannot be undone." confirmLabel="Delete permanently" onConfirm={async () => { if (!deleteTarget) return; await deleteMutation.mutateAsync(deleteTarget.id); setDeleteTarget(null); }} />
  </main>;
}
