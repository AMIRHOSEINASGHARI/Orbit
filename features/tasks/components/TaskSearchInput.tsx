"use client";

import { SearchIcon, XIcon } from "@/components/icons";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

export function TaskSearchInput({ value, onChange, placeholder = "Search tasks…" }: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <InputGroup className="h-[38px] w-full rounded-lg bg-card px-3 sm:w-56">
      <InputGroupAddon className="shrink-0 p-0 text-muted-foreground"><SearchIcon aria-hidden="true" className="size-[15px]" /></InputGroupAddon>
      <InputGroupInput aria-label={placeholder} placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} className="text-xs" />
      {value && <InputGroupAddon align="inline-end" className="p-0"><InputGroupButton aria-label="Clear search query" title="Clear search query" onClick={() => onChange("")} className="text-muted-foreground"><XIcon aria-hidden="true" /></InputGroupButton></InputGroupAddon>}
    </InputGroup>
  );
}
