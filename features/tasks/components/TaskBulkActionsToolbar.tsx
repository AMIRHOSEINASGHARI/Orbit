"use client";

import { Button } from "@/components/ui/button";
import {
  CircleDotIcon,
  FlagIcon,
  FolderInputIcon,
  FolderMinusIcon,
  Trash2Icon,
  XIcon,
} from "@/components/icons";

export function TaskBulkActionsToolbar({
  selectedCount,
  onClearSelection,
  onMoveToTrash,
  onMoveToGroup,
  onRemoveFromGroup,
  onChangeStatus,
  onChangePriority,
  pending = false,
  trashPending = false,
}: {
  selectedCount: number;
  onClearSelection: () => void;
  onMoveToTrash?: () => void;
  onMoveToGroup?: () => void;
  onRemoveFromGroup?: () => void;
  onChangeStatus?: () => void;
  onChangePriority?: () => void;
  pending?: boolean;
  trashPending?: boolean;
}) {
  return (
    <div
      aria-label="Bulk task actions"
      className="mb-3 flex flex-wrap items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-2"
    >
      <span className="inline-flex items-center gap-2 px-1 text-xs font-semibold text-foreground">
        <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
          {selectedCount}
        </span>
        {selectedCount === 1 ? "task selected" : "tasks selected"}
      </span>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-7 bg-card text-[11px]"
        disabled={pending || trashPending || !onMoveToTrash}
        onClick={onMoveToTrash}
      >
        <Trash2Icon className="text-destructive" />
        {trashPending ? "Moving…" : "Move to Trash"}
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-7 bg-card text-[11px]"
        disabled={pending || !onMoveToGroup}
        onClick={onMoveToGroup}
      >
        <FolderInputIcon />
        Move to Group
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-7 bg-card text-[11px]"
        disabled={pending || !onRemoveFromGroup}
        onClick={onRemoveFromGroup}
      >
        <FolderMinusIcon />
        Remove from Group
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-7 bg-card text-[11px]"
        disabled={pending || !onChangeStatus}
        onClick={onChangeStatus}
      >
        <CircleDotIcon />
        Change Status
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-7 bg-card text-[11px]"
        disabled={pending || !onChangePriority}
        onClick={onChangePriority}
      >
        <FlagIcon />
        Change Priority
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="ml-auto h-7 text-[11px]"
        disabled={pending}
        onClick={onClearSelection}
      >
        <XIcon />
        Clear selection
      </Button>
    </div>
  );
}
