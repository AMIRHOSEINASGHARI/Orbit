"use client";

import { useState } from "react";
import { ListChecksIcon, PlusIcon, XIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type ChecklistInput = { text: string; isCompleted: boolean };

export function TaskChecklistEditor({ items, onChange }: {
  items: ChecklistInput[];
  onChange: (items: ChecklistInput[]) => void;
}) {
  const [draft, setDraft] = useState("");
  const completed = items.filter((item) => item.isCompleted).length;

  function addItem() {
    const text = draft.trim();
    if (!text || items.length >= 100) return;
    onChange([...items, { text, isCompleted: false }]);
    setDraft("");
  }

  return (
    <div className="flex min-h-[128px] flex-col rounded-[10px] border border-border bg-table-header p-3">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 text-ui-label font-semibold"><ListChecksIcon aria-hidden="true" className="size-4 text-primary" />Checklist</span>
        <span className="text-ui-caption text-muted-foreground">{completed}/{items.length} complete</span>
      </div>
      <div className="max-h-36 space-y-2 overflow-y-auto">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 rounded-md bg-background px-2 py-1.5">
            <Checkbox aria-label={`Complete ${item.text}`} checked={item.isCompleted} onCheckedChange={(checked) => onChange(items.map((value, itemIndex) => itemIndex === index ? { ...value, isCompleted: checked === true } : value))} />
            <input value={item.text} onChange={(event) => onChange(items.map((value, itemIndex) => itemIndex === index ? { ...value, text: event.target.value } : value))} onKeyDown={(event) => { if (event.key === "Enter") event.preventDefault(); }} maxLength={500} aria-label={`Checklist item ${index + 1}`} className={`min-w-0 flex-1 bg-transparent text-ui-small outline-none focus-visible:ring-2 focus-visible:ring-ring ${item.isCompleted ? "text-muted-foreground line-through" : "text-foreground"}`} />
            <Button type="button" variant="outline" size="icon-sm" aria-label={`Remove ${item.text}`} onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))} className="shrink-0"><XIcon aria-hidden="true" className="size-3" /></Button>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2 pt-2">
        <input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addItem(); } }} maxLength={500} disabled={items.length >= 100} aria-label="New checklist item" placeholder="Add a checklist item..." className="h-8 min-w-0 flex-1 bg-transparent text-ui-small outline-none placeholder:text-muted-foreground" />
        <Button type="button" variant="outline" size="icon-sm" aria-label="Add checklist item" disabled={!draft.trim() || items.length >= 100} onClick={addItem}><PlusIcon aria-hidden="true" className="size-4" /></Button>
      </div>
    </div>
  );
}
