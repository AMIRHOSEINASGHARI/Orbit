"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/icons";
import { TasksList } from "@/features/tasks/components/TasksList";
import { TasksToolbar } from "@/features/tasks/components/TasksToolbar";
import { TasksViewSwitcher, type TaskViewMode } from "@/features/tasks/components/TasksViewSwitcher";
import { TaskCreationDialog } from "@/features/tasks/components/task-creation-dialog";
import type { TaskGroupOption, TaskListFilters, TaskListPage } from "@/features/tasks/types/task.types";
import type { ActionResult } from "@/types";

export function GroupTasksSection({ groupId, groupName, userId, groups, initialResult, taskCount }: {
  groupId: string;
  groupName: string;
  userId: string;
  groups: TaskGroupOption[];
  initialResult: ActionResult<TaskListPage>;
  taskCount: number;
}) {
  const initialFilters: TaskListFilters = { groupId };
  const [filters, setFilters] = useState<TaskListFilters>(initialFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [view, setView] = useState<TaskViewMode>("table");
  const [createOpen, setCreateOpen] = useState(false);

  function onSearchChange(search: string) {
    setSearchQuery(search);
    setPage(0);
    setFilters((current) => ({ ...current, groupId, search: search || undefined }));
  }

  function onFiltersChange(next: TaskListFilters) {
    setFilters({ ...next, groupId, search: searchQuery || undefined });
    setPage(0);
  }

  return (
    <section aria-labelledby="group-tasks-title" className="space-y-3">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="group-tasks-title" className="text-sm font-bold">Tasks · {taskCount} tasks</h2>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <TasksViewSwitcher view={view} onChange={setView} />
          <Button variant="outline" render={<Link href="/tasks?groupId=personal" />}>Add existing tasks</Button>
          <Button onClick={() => setCreateOpen(true)}><PlusIcon aria-hidden="true" />Add task</Button>
        </div>
      </header>
      <TasksToolbar
        filters={filters}
        groups={groups}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onChange={onFiltersChange}
        hideGroupFilter
        searchPlaceholder="Search tasks in this group…"
        clearLabel="Clear filters"
      />
      <TasksList
        result={initialResult}
        userId={userId}
        groups={groups}
        initialFilters={initialFilters}
        filters={filters}
        page={page}
        onPageChange={setPage}
        view={view}
        hideGroupColumn
        defaultGroupId={groupId}
      />
      <TaskCreationDialog open={createOpen} onOpenChange={setCreateOpen} defaultGroupId={groupId} />
      <span className="sr-only">Tasks in {groupName}</span>
    </section>
  );
}
