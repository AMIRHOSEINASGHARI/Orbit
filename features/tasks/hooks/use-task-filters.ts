"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { usePathname, useSearchParams } from "next/navigation";
import { TASK_PRIORITIES, TASK_STATUSES, type TaskListFilters } from "@/features/tasks/types/task.types";

export function useTaskFilters(initialFilters: TaskListFilters) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [filters, setFilters] = useState<TaskListFilters>(() => initialFilters);
  const [searchQuery, setSearchQuery] = useState(initialFilters.search ?? "");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (searchQuery !== debouncedSearchQuery) return;
    setFilters((current) => {
      const search = debouncedSearchQuery || undefined;
      return current.search === search ? current : { ...current, search };
    });
    const params = new URLSearchParams(window.location.search);
    const urlFilters: [keyof Pick<TaskListFilters, "search" | "status" | "priority" | "groupId" | "dueDate">, string | undefined][] = [
      ["search", debouncedSearchQuery || undefined],
      ["status", filters.status],
      ["priority", filters.priority],
      ["groupId", filters.groupId],
      ["dueDate", filters.dueDate],
    ];
    for (const [key, value] of urlFilters) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const query = params.toString();
    if (query !== window.location.search.slice(1)) {
      window.history.pushState(null, "", `${pathname}${query ? `?${query}` : ""}`);
    }
  }, [debouncedSearchQuery, filters.status, filters.priority, filters.groupId, filters.dueDate, pathname, searchQuery]);

  useEffect(() => {
    const search = searchParams.get("search") ?? "";
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const groupId = searchParams.get("groupId");
    const dueDate = searchParams.get("dueDate");
    const parsedDueDate = dueDate ? new Date(`${dueDate}T00:00:00.000Z`) : null;
    const validDueDate = dueDate && /^\d{4}-\d{2}-\d{2}$/.test(dueDate) && parsedDueDate &&
      !Number.isNaN(parsedDueDate.getTime()) && parsedDueDate.toISOString().slice(0, 10) === dueDate
      ? dueDate
      : undefined;
    setSearchQuery(search);
    setFilters((current) => {
      const nextFilters: TaskListFilters = {
        ...current,
        search: search || undefined,
        status: TASK_STATUSES.find((item) => item === status),
        priority: TASK_PRIORITIES.find((item) => item === priority),
        groupId: groupId === "personal" || (groupId && /^[\da-f]{24}$/i.test(groupId)) ? groupId : undefined,
        dueDate: validDueDate,
      };
      return Object.keys({ ...current, ...nextFilters }).every((key) =>
        current[key as keyof TaskListFilters] === nextFilters[key as keyof TaskListFilters],
      ) ? current : nextFilters;
    });
  }, [searchParams]);

  function onSearchChange(query: string) {
    setSearchQuery(query);
    setPage(0);
  }

  function onFiltersChange(nextFilters: TaskListFilters) {
    setFilters(nextFilters);
    if (!nextFilters.search) setSearchQuery("");
    setPage(0);
  }

  return { filters, searchQuery, page, setPage, onSearchChange, onFiltersChange };
}
