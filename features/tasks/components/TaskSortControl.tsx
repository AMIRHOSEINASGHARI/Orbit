"use client";

import { ArrowUpDownIcon } from "@/components/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TaskSortOption } from "@/features/tasks/types/task.types";

export function TaskSortControl({ value, onChange }: {
  value?: TaskSortOption;
  onChange: (value?: TaskSortOption) => void;
}) {
  return (
    <Select value={value} onValueChange={(nextValue) => onChange(nextValue as TaskSortOption | undefined)}>
      <SelectTrigger aria-label="Sort tasks" className="h-[38px] w-[152px] text-xs">
        <ArrowUpDownIcon aria-hidden="true" className="size-[15px] text-muted-foreground" />
        <SelectValue placeholder="Last updated" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="updated-desc">Last updated</SelectItem>
        <SelectItem value="updated-asc">Least recently updated</SelectItem>
        <SelectItem value="created-desc">Recently created</SelectItem>
        <SelectItem value="due-date-asc">Due date (soonest)</SelectItem>
      </SelectContent>
    </Select>
  );
}
