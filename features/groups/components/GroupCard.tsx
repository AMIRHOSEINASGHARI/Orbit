"use client";

import Link from "next/link";
import { EllipsisIcon, PencilIcon, Trash2Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { groupColorClass } from "@/features/groups/constants/group-colors";
import type { GroupListItem } from "@/features/groups/types/group.types";

export function GroupCard({ group, onEdit, onTrash }: {
  group: GroupListItem;
  onEdit?: (group: GroupListItem) => void;
  onTrash?: (group: GroupListItem) => void;
}) {
  const updated = group.updatedAt ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(group.updatedAt)) : "Recently";
  return (
    <Card className="flex min-h-[260px] flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span aria-hidden="true" className={`size-3 shrink-0 rounded-full ${groupColorClass(group.color)}`} />
          <h2 className="truncate text-lg font-semibold">{group.name}</h2>
        </div>
        {(onEdit || onTrash) && <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={`Actions for ${group.name}`} />}><EllipsisIcon /></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onEdit && <DropdownMenuItem onClick={() => onEdit(group)}><PencilIcon />Edit group</DropdownMenuItem>}
            {onTrash && <DropdownMenuItem variant="destructive" onClick={() => onTrash(group)}><Trash2Icon />Move to Trash</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>}
      </div>
      <p className="line-clamp-2 min-h-10 text-sm text-muted-foreground">{group.description || "No description"}</p>
      <div className="space-y-2">
        <div className="flex justify-between text-sm"><span>Total tasks</span><strong>{group.taskCount}</strong></div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span>To do {group.todoCount}</span><span>In progress {group.inProgressCount}</span><span>Done {group.doneCount}</span>
        </div>
        <div className="flex items-center gap-2"><Progress value={group.completionPercent} aria-label={`${group.completionPercent}% complete`} className="flex-1 gap-0" /><span className="text-xs tabular-nums text-muted-foreground">{group.completionPercent}%</span></div>
      </div>
      <div className="mt-auto flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
        <span>Updated {updated}</span><Link className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring" href={`/groups/${group.id}`}>Open group</Link>
      </div>
    </Card>
  );
}
