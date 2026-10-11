"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { EllipsisIcon, Trash2Icon } from "@/components/icons";
import { EmptyState } from "@/components/shared/EmptyState";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { GroupEditDialog } from "@/features/groups/components/GroupEditDialog";
import { trashGroup } from "@/features/groups/actions/trash-group.action";
import { getGroupById } from "@/features/groups/actions/get-group-by-id.action";
import { GroupTasksSection } from "@/features/groups/components/GroupTasksSection";
import { groupColorClass } from "@/features/groups/constants/group-colors";
import type { GroupListItem } from "@/features/groups/types/group.types";
import type { TaskGroupOption, TaskListPage } from "@/features/tasks/types/task.types";
import type { ActionResult } from "@/types";

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

export function GroupDetailsPage({ result, tasksResult, userId, groups }: {
  result: ActionResult<GroupListItem>;
  tasksResult: ActionResult<TaskListPage>;
  userId: string;
  groups: TaskGroupOption[];
}) {
  const [editing, setEditing] = useState(false);
  const [trashing, setTrashing] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const initialGroupId = result.success ? result.data.id : "unavailable";
  const groupQuery = useQuery({
    queryKey: ["group", initialGroupId],
    queryFn: () => getGroupById({ groupId: initialGroupId }),
    initialData: result,
    enabled: result.success,
  });
  const trashMutation = useMutation({
    mutationFn: async (groupId: string) => {
      const response = await trashGroup({ groupId });
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      void queryClient.invalidateQueries({ queryKey: ["groups"] });
      void queryClient.invalidateQueries({ queryKey: ["tasks"] });
      router.push("/groups");
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Unable to move group to Trash."),
  });
  if (!result.success) return <main className="p-6"><EmptyState title="Group unavailable" description={result.error} action={<Button render={<Link href="/groups" />}>Back to groups</Button>} /></main>;
  const group = groupQuery.data?.success ? groupQuery.data.data : result.data;
  const created = group.createdAt ? dateFormatter.format(new Date(group.createdAt)) : "—";
  const updated = group.updatedAt ? dateFormatter.format(new Date(group.updatedAt)) : "—";
  const completedTasks = group.doneCount;

  return (
    <main className="space-y-3 p-5 sm:p-5">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[10px] font-medium text-primary">
        <Link href="/groups" className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-ring">Groups</Link>
        <span aria-hidden="true" className="text-muted-foreground">/</span>
        <span aria-current="page" className="truncate">{group.name}</span>
      </nav>

      <Card className="gap-3 rounded-xl p-4">
        <header className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span aria-hidden="true" className={`size-2.5 shrink-0 rounded-full ${groupColorClass(group.color)}`} />
            <h1 className="truncate text-xl font-bold">{group.name}</h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditing(true)}>Edit group</Button>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={`More ${group.name} group actions`} />}><EllipsisIcon aria-hidden="true" /></DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem variant="destructive" onClick={() => setTrashing(true)}><Trash2Icon aria-hidden="true" />Move to Trash</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {group.description && <p className="text-[11px] text-muted-foreground">{group.description}</p>}
        <p className="text-[9px] text-muted-foreground">Created {created} <span className="px-1">·</span> Last updated {updated}</p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px]">
          <strong className="font-semibold">{group.taskCount} active tasks</strong>
          <span className="text-status-todo-foreground">To do {group.todoCount}</span>
          <span className="text-info-foreground">In Progress {group.inProgressCount}</span>
          <span className="text-success-foreground">Done {group.doneCount}</span>
        </div>

        <div className="space-y-1.5">
          <p className="text-[9px] text-muted-foreground">{completedTasks} of {group.taskCount} completed <span className="px-1">·</span> {group.completionPercent}%</p>
          <Progress value={group.completionPercent} aria-label={`${group.completionPercent}% complete`} className="gap-0" />
        </div>
      </Card>

      <GroupTasksSection groupId={group.id} groupName={group.name} userId={userId} groups={groups} initialResult={tasksResult} taskCount={group.taskCount} />
      <GroupEditDialog group={group} open={editing} onOpenChange={setEditing} />
      <ConfirmationDialog open={trashing} onOpenChange={setTrashing} title={`Move “${group.name}” to Trash?`} description="Its active tasks will move to Trash with it. You can restore them together later." confirmLabel="Move to Trash" onConfirm={() => trashMutation.mutateAsync(group.id).then(() => undefined)} />
    </main>
  );
}
