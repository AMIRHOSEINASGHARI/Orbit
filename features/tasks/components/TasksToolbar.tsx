"use client";

import { ArrowUpDownIcon, CalendarIcon, EyeIcon, SearchIcon, SlidersHorizontalIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TASK_PRIORITIES, TASK_STATUSES, type TaskDueDateFilter, type TaskGroupOption, type TaskListFilters, type TaskPriority, type TaskSortOption, type TaskStatus } from "@/features/tasks/types/task.types";

const statusLabels: Record<TaskStatus, string> = { todo: "To do", "in-progress": "In progress", done: "Done" };
const priorityLabels: Record<TaskPriority, string> = { low: "Low", medium: "Medium", high: "High" };

export function TasksToolbar({ filters, groups, onChange }: {
  filters: TaskListFilters;
  groups: TaskGroupOption[];
  onChange: (filters: TaskListFilters) => void;
}) {
  const update = <K extends keyof TaskListFilters>(key: K, value: TaskListFilters[K] | undefined) =>
    onChange({ ...filters, [key]: value });

  return (
    <div role="group" aria-label="Task search and filters" className="flex flex-wrap items-center gap-2">
      <InputGroup className="h-[38px] w-full rounded-lg bg-card px-3 sm:w-56">
        <InputGroupAddon className="shrink-0 p-0 text-muted-foreground"><SearchIcon className="size-[15px]" /></InputGroupAddon>
        <InputGroupInput aria-label="Search tasks" placeholder="Search tasks…" value={filters.search ?? ""} onChange={(event) => update("search", event.target.value || undefined)} className="text-xs" />
      </InputGroup>

      <Select value={filters.status} onValueChange={(value) => update("status", value ? value as TaskStatus : undefined)}>
        <SelectTrigger aria-label="Filter by status" className="h-[38px] w-[102px] text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>{TASK_STATUSES.map((status) => <SelectItem key={status} value={status}>{statusLabels[status]}</SelectItem>)}</SelectContent>
      </Select>

      <Select value={filters.priority} onValueChange={(value) => update("priority", value ? value as TaskPriority : undefined)}>
        <SelectTrigger aria-label="Filter by priority" className="h-[38px] w-[105px] text-xs"><SelectValue placeholder="Priority" /></SelectTrigger>
        <SelectContent>{TASK_PRIORITIES.map((priority) => <SelectItem key={priority} value={priority}>{priorityLabels[priority]}</SelectItem>)}</SelectContent>
      </Select>

      <Select value={filters.groupId} onValueChange={(value) => update("groupId", value ?? undefined)}>
        <SelectTrigger aria-label="Filter by group" className="h-[38px] w-[100px] text-xs"><SelectValue placeholder="Group" /></SelectTrigger>
        <SelectContent><SelectItem value="personal">Personal</SelectItem>{groups.map((group) => <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>)}</SelectContent>
      </Select>

      <Select value={filters.dueDate} onValueChange={(value) => update("dueDate", value ? value as TaskDueDateFilter : undefined)}>
        <SelectTrigger aria-label="Filter by due date" className="h-[38px] w-[120px] text-xs"><CalendarIcon className="size-[15px] text-muted-foreground" /><SelectValue placeholder="Due date" /></SelectTrigger>
        <SelectContent><SelectItem value="overdue">Overdue</SelectItem><SelectItem value="today">Today</SelectItem><SelectItem value="upcoming">Next 7 days</SelectItem><SelectItem value="no-date">No due date</SelectItem></SelectContent>
      </Select>

      <Select value={filters.sort} onValueChange={(value) => update("sort", value ? value as TaskSortOption : undefined)}>
        <SelectTrigger aria-label="Sort tasks" className="h-[38px] w-[136px] text-xs"><ArrowUpDownIcon className="size-[15px] text-muted-foreground" /><SelectValue placeholder="Last update" /></SelectTrigger>
        <SelectContent><SelectItem value="updated-desc">Last updated</SelectItem><SelectItem value="updated-asc">Least recently updated</SelectItem><SelectItem value="created-desc">Recently created</SelectItem></SelectContent>
      </Select>

      <Button type="button" variant="ghost" size="icon" aria-label="Clear task filters" title="Clear task filters" onClick={() => onChange({})}>
        <SlidersHorizontalIcon className="size-4" />
      </Button>

      <div className="sm:ml-auto">
        <Select value={filters.status} onValueChange={(value) => update("status", value ? value as TaskStatus : undefined)}>
          <SelectTrigger aria-label="Task view preset" className="h-[38px] w-[136px] text-xs"><EyeIcon className="size-3.5 text-muted-foreground" /><SelectValue placeholder="Task view" /></SelectTrigger>
          <SelectContent>{TASK_STATUSES.map((status) => <SelectItem key={status} value={status}>{statusLabels[status]}</SelectItem>)}</SelectContent>
        </Select>
      </div>
    </div>
  );
}
