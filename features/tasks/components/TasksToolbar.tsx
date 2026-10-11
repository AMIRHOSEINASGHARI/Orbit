"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import {
  ArrowUpDownIcon,
  CalendarIcon,
  EyeIcon,
  SlidersHorizontalIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  type TaskGroupOption,
  type TaskListFilters,
  type TaskPriority,
  type TaskSortOption,
  type TaskStatus,
} from "@/features/tasks/types/task.types";
import { TaskSearchInput } from "@/features/tasks/components/TaskSearchInput";

const statusLabels: Record<TaskStatus, string> = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
};
const priorityLabels: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export function TasksToolbar({
  filters,
  groups,
  searchQuery,
  onSearchChange,
  onChange,
}: {
  filters: TaskListFilters;
  groups: TaskGroupOption[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onChange: (filters: TaskListFilters) => void;
}) {
  const [dueDateOpen, setDueDateOpen] = useState(false);
  const update = <K extends keyof TaskListFilters>(
    key: K,
    value: TaskListFilters[K] | undefined,
  ) => onChange({ ...filters, [key]: value });
  const dueDate = filters.dueDate ? parseISO(filters.dueDate) : undefined;

  return (
    <div
      role="group"
      aria-label="Task search and filters"
      className="flex flex-wrap items-center gap-2"
    >
      <TaskSearchInput value={searchQuery} onChange={onSearchChange} />

      <Select
        value={filters.status}
        onValueChange={(value) =>
          update("status", value ? (value as TaskStatus) : undefined)
        }
      >
        <SelectTrigger
          aria-label="Filter by status"
          className="h-[38px] w-[102px] text-xs"
        >
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {TASK_STATUSES.map((status) => (
            <SelectItem key={status} value={status}>
              {statusLabels[status]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.priority}
        onValueChange={(value) =>
          update("priority", value ? (value as TaskPriority) : undefined)
        }
      >
        <SelectTrigger
          aria-label="Filter by priority"
          className="h-[38px] w-[105px] text-xs"
        >
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          {TASK_PRIORITIES.map((priority) => (
            <SelectItem key={priority} value={priority}>
              {priorityLabels[priority]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.groupId}
        onValueChange={(value) => update("groupId", value ?? undefined)}
      >
        <SelectTrigger
          aria-label="Filter by group"
          className="h-[38px] w-[100px] text-xs"
        >
          <SelectValue placeholder="Group" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="personal">Personal</SelectItem>
          {groups.map((group) => (
            <SelectItem key={group.id} value={group.id}>
              {group.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover open={dueDateOpen} onOpenChange={setDueDateOpen}>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="outline"
              aria-label="Filter by due date"
              className="h-[38px] w-[120px] justify-start gap-2 px-3 text-xs font-medium"
            />
          }
        >
          <CalendarIcon
            aria-hidden="true"
            className="size-[15px] shrink-0 text-muted-foreground"
          />
          {dueDate ? (
            format(dueDate, "MMM d, yyyy")
          ) : (
            <span className="text-muted-foreground">Due date</span>
          )}
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-auto border-0 bg-transparent p-0 shadow-none ring-0"
        >
          <Calendar
            mode="single"
            selected={dueDate}
            onSelect={(date) => {
              update("dueDate", date ? format(date, "yyyy-MM-dd") : undefined);
              if (date) setDueDateOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>

      <Select
        value={filters.sort}
        onValueChange={(value) =>
          update("sort", value ? (value as TaskSortOption) : undefined)
        }
      >
        <SelectTrigger
          aria-label="Sort tasks"
          className="h-[38px] w-[136px] text-xs"
        >
          <ArrowUpDownIcon className="size-[15px] text-muted-foreground" />
          <SelectValue placeholder="Last update" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="updated-desc">Last updated</SelectItem>
          <SelectItem value="updated-asc">Least recently updated</SelectItem>
          <SelectItem value="created-desc">Recently created</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
