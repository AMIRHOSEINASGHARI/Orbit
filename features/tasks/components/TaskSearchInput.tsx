"use client";

import { SearchIcon } from "@/components/icons";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export function TaskSearchInput({ value, onChange }: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <InputGroup className="h-[38px] w-full rounded-lg bg-card px-3 sm:w-56">
      <InputGroupAddon className="shrink-0 p-0 text-muted-foreground"><SearchIcon aria-hidden="true" className="size-[15px]" /></InputGroupAddon>
      <InputGroupInput aria-label="Search tasks" placeholder="Search tasks…" value={value} onChange={(event) => onChange(event.target.value)} className="text-xs" />
    </InputGroup>
  );
}
