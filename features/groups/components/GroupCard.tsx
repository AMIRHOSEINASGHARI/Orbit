"use client";

import Link from "next/link";
import { EllipsisIcon, PencilIcon, Trash2Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { groupColorClass } from "@/features/groups/constants/group-colors";
import type { GroupListItem } from "@/features/groups/types/group.types";

export function GroupCard({
  group,
  onEdit,
  onTrash,
}: {
  group: GroupListItem;
  onEdit?: (group: GroupListItem) => void;
  onTrash?: (group: GroupListItem) => void;
}) {
  const updated = group.updatedAt
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(group.updatedAt))
    : "Recently";
  return (
    <Card className="flex h-[260px] w-full flex-col gap-4 overflow-hidden rounded-[14px] p-5">
      <div className="flex h-[34px] w-full shrink-0 items-center gap-2.5">
        <span
          aria-hidden="true"
          className={`size-3 shrink-0 rounded-full ${groupColorClass(group.color)}`}
        />
        <h2 className="min-w-0 flex-1 truncate text-lg font-semibold">
          {group.name}
        </h2>
        {(onEdit || onTrash) && (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Actions for ${group.name}`}
                />
              }
            >
              <EllipsisIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem render={<Link href={`/groups/${group.id}`} />}>
                Open group
              </DropdownMenuItem>
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(group)}>
                  <PencilIcon />
                  Edit group
                </DropdownMenuItem>
              )}
              {onTrash && (
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => onTrash(group)}
                >
                  <Trash2Icon />
                  Move to Trash
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <p className="w-full shrink-0 truncate text-[13px] leading-[1.45] text-muted-foreground">
        {group.description || "No description"}
      </p>
      <p className="w-full shrink-0 text-sm font-semibold leading-[1.45]">
        {group.taskCount} active tasks
      </p>
      <div className="flex w-full shrink-0 gap-2.5 overflow-hidden whitespace-nowrap text-ui-label font-semibold leading-none">
        <span className="text-muted-foreground">Todo {group.todoCount}</span>
        <span className="text-info-foreground">
          In Progress {group.inProgressCount}
        </span>
        <span className="text-success-foreground">Done {group.doneCount}</span>
      </div>
      <p className="w-full shrink-0 text-ui-label leading-[1.45] text-muted-foreground">
        {group.doneCount} of {group.taskCount} completed ·{" "}
        {group.completionPercent}%
      </p>
      <Progress
        value={group.completionPercent}
        aria-label={`${group.completionPercent}% complete`}
        className="w-full shrink-0 gap-0 [&_[data-slot=progress-track]]:h-[6px] [&_[data-slot=progress-track]]:bg-muted [&_[data-slot=progress-indicator]]:bg-primary"
      />
      <div className="mt-auto flex w-full shrink-0 items-center justify-between whitespace-nowrap">
        <span className="text-ui-label leading-[1.45] text-muted-foreground">
          Updated {updated}
        </span>
        <Link
          className="text-xs font-semibold text-primary focus-visible:outline-2 focus-visible:outline-ring"
          href={`/groups/${group.id}`}
        >
          Open group →
        </Link>
      </div>
    </Card>
  );
}
