"use client";

import { useState } from "react";
import { CreateButton } from "@/components/shared/CreateButton";
import { PageHeader } from "@/components/shared/PageHeader";
import { useTaskFilters } from "@/features/tasks/hooks/use-task-filters";
import type { ActionResult } from "@/types";
import type {
  TaskListPage,
  TaskListFilters,
  TaskGroupOption,
} from "@/features/tasks/types/task.types";
import { TasksViewSwitcher, type TaskViewMode } from "./TasksViewSwitcher";
import { TasksToolbar } from "./TasksToolbar";
import { TasksList } from "./TasksList";

export function TasksPage({
  result,
  userId,
  groups,
  initialFilters,
}: {
  result: ActionResult<TaskListPage>;
  userId: string;
  groups: TaskGroupOption[];
  initialFilters: TaskListFilters;
}) {
  const [view, setView] = useState<TaskViewMode>("table");
  const [createOpen, setCreateOpen] = useState(false);
  const {
    filters,
    searchQuery,
    page,
    setPage,
    onSearchChange,
    onFiltersChange,
  } = useTaskFilters(initialFilters);

  return (
    <main className="space-y-6 p-5 sm:p-7">
      <PageHeader
        title="Tasks"
        description="Plan, prioritize, and move work forward with your team."
        breadcrumbs="WORKSPACE / TASKS"
        actions={
          <div className="flex flex-col items-end gap-2">
            <CreateButton item="Task" onClick={() => setCreateOpen(true)} />
            <TasksViewSwitcher view={view} onChange={setView} />
          </div>
        }
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
        view={view}
        userId={userId}
        groups={groups}
        initialFilters={initialFilters}
        filters={filters}
        page={page}
        onPageChange={setPage}
        createOpen={createOpen}
        onCreateOpenChange={setCreateOpen}
      />
    </main>
  );
}
