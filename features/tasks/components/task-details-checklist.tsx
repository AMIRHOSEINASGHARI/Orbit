"use client";

import { ListChecksIcon } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import type { TaskChecklistItem } from "@/features/tasks/types/task.types";

export function TaskDetailsChecklist({ items, pending, onToggle }: {
  items: TaskChecklistItem[];
  pending: boolean;
  onToggle: (index: number, item: TaskChecklistItem, isCompleted: boolean) => void;
}) {
  const completed = items.filter((item) => item.isCompleted).length;

  return (
    <section aria-labelledby="task-checklist" className="space-y-3 border-t border-border pt-4">
      <div className="flex items-center justify-between gap-2">
        <h2 id="task-checklist" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase text-subtle-foreground"><ListChecksIcon aria-hidden="true" className="size-4" />Checklist</h2>
        <span className="text-ui-caption text-muted-foreground">{completed}/{items.length} complete</span>
      </div>
      {items.length > 0 && <Progress value={completed / items.length * 100} aria-label="Checklist progress" />}
      {items.length ? <div className="space-y-2">{items.map((item, index) => (
        <div key={index} className="flex items-center gap-2 rounded-lg border border-border bg-table-header px-3 py-2">
          <Checkbox
            checked={item.isCompleted}
            disabled={pending}
            aria-label={`Mark ${item.text} ${item.isCompleted ? "incomplete" : "complete"}`}
            onCheckedChange={(checked) => { if (typeof checked === "boolean") onToggle(index, item, checked); }}
          />
          <span className={`text-ui-small ${item.isCompleted ? "text-muted-foreground line-through" : "text-foreground"}`}>{item.text}</span>
        </div>
      ))}</div> : <p className="text-ui-small text-muted-foreground">No checklist items yet.</p>}
      {pending && <p role="status" className="text-ui-caption text-muted-foreground">Saving checklist…</p>}
    </section>
  );
}
