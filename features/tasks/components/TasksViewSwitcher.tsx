"use client";

import { Columns3Icon, ListIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "cn";

export type TaskViewMode = "table" | "board";

const optionClassName = (selected: boolean) => cn(
  "h-[30px] gap-[7px] rounded-[6px] px-[11px]",
  selected
    ? "bg-card text-foreground shadow-sm hover:bg-card"
    : "text-muted-foreground",
);

export function TasksViewSwitcher({ view, onChange }: {
  view: TaskViewMode;
  onChange: (view: TaskViewMode) => void;
}) {
  return (
    <ButtonGroup
      aria-label="Task views"
      className="h-[38px] items-center gap-[3px] rounded-[10px] border border-border bg-table-header p-[3px]"
    >
      <Button
        type="button"
        variant="ghost"
        size="sm"
        aria-pressed={view === "table"}
        onClick={() => onChange("table")}
        className={optionClassName(view === "table")}
      >
        <ListIcon aria-hidden="true" className="size-3.5" />
        Table View
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        aria-pressed={view === "board"}
        onClick={() => onChange("board")}
        className={optionClassName(view === "board")}
      >
        <Columns3Icon aria-hidden="true" className="size-3.5" />
        Drag &amp; Drop View
      </Button>
    </ButtonGroup>
  );
}
