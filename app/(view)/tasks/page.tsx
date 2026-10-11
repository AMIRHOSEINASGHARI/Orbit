import { z } from "zod";
import { getTasks } from "@/features/tasks/actions/get-tasks.action";
import { getTaskGroupOptions } from "@/features/tasks/actions/create-task.action";
import { TasksPage } from "@/features/tasks/components/TasksPage";
import { TASK_PRIORITIES, TASK_SORT_OPTIONS, TASK_STATUSES, type TaskListFilters } from "@/features/tasks/types/task.types";
import { getCurrentUser } from "@/lib/auth/current-user";

export default async function TasksRoute({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const value = (key: string) => typeof params[key] === "string" ? params[key] as string : undefined;
  const initialFilters: TaskListFilters = {};
  const search = value("search");
  const status = value("status");
  const priority = value("priority");
  const groupId = value("groupId");
  const dueDate = value("dueDate");
  const sort = value("sort");
  if (search) initialFilters.search = search;
  if (TASK_STATUSES.some((item) => item === status)) initialFilters.status = status as TaskListFilters["status"];
  if (TASK_PRIORITIES.some((item) => item === priority)) initialFilters.priority = priority as TaskListFilters["priority"];
  if (groupId === "personal" || (groupId && /^[\da-f]{24}$/i.test(groupId))) initialFilters.groupId = groupId;
  if (dueDate && z.iso.date().safeParse(dueDate).success) initialFilters.dueDate = dueDate;
  if (TASK_SORT_OPTIONS.some((item) => item === sort)) initialFilters.sort = sort as TaskListFilters["sort"];
  const [result, groupResult, user] = await Promise.all([
    getTasks(initialFilters),
    getTaskGroupOptions(),
    getCurrentUser(),
  ]);
  return <TasksPage result={result} userId={user?.id ?? "unauthenticated"} groups={groupResult.success ? groupResult.data : []} initialFilters={initialFilters} />;
}
