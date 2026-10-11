"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { useTaskFilters } from "@/features/tasks/hooks/use-task-filters";
import type { ActionResult } from "@/types";
import type { TaskListItem, TaskListFilters, TaskGroupOption } from "@/features/tasks/types/task.types";
import { TasksViewSwitcher } from "./TasksViewSwitcher";
import { TasksToolbar } from "./TasksToolbar";
import { TasksList } from "./TasksList";

export function TasksPage({ result, userId, groups, initialFilters }: {
  result: ActionResult<TaskListItem[]>;
  userId: string;
  groups: TaskGroupOption[];
  initialFilters: TaskListFilters;
}) {
  const { filters, searchQuery, page, setPage, onSearchChange, onFiltersChange } = useTaskFilters(initialFilters);

  return (
    <main className="space-y-6 p-5 sm:p-7">
      <PageHeader
        title="Tasks"
        description="Plan, prioritize, and move work forward with your team."
        breadcrumbs="WORKSPACE / TASKS"
        actions={<TasksViewSwitcher />}
      />
      <TasksToolbar
        filters={filters}
        groups={groups}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onChange={onFiltersChange}
      />
      <TasksList
        result={result}
        userId={userId}
        groups={groups}
        initialFilters={initialFilters}
        filters={filters}
        page={page}
        onPageChange={setPage}
      />
    </main>
  );
}
