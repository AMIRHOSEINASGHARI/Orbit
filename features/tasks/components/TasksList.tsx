"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Button } from "@/components/ui/button";
import { getTasks } from "@/features/tasks/actions/get-tasks.action";
import { taskKeys } from "@/features/tasks/queries/task-keys";
import { useTaskMutations } from "@/features/tasks/hooks/use-task-mutations";
import { TASK_PAGE_SIZE, type TaskListItem, type TaskListPage, type TaskListFilters, type TaskGroupOption } from "@/features/tasks/types/task.types";
import type { ActionResult } from "@/types";
import { TaskListView } from "./TaskListView";
import { TaskDetailsDrawer } from "./task-details-drawer";
import { TaskCreationDialog } from "./task-creation-dialog";
import { TaskTrashDialog } from "./TaskTrashDialog";

export function TasksList({ result, userId, groups, initialFilters, filters, page, onPageChange }: {
  result: ActionResult<TaskListPage>;
  userId: string;
  groups: TaskGroupOption[];
  initialFilters: TaskListFilters;
  filters: TaskListFilters;
  page: number;
  onPageChange: (page: number) => void;
}) {
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<TaskListItem | null>(null);
  const [taskToTrash, setTaskToTrash] = useState<TaskListItem | null>(null);
  const queryFilters = { ...filters, page: page + 1, pageSize: filters.pageSize ?? TASK_PAGE_SIZE };
  const { statusMutation, priorityMutation, trashMutation } = useTaskMutations(userId, queryFilters);
  const tasksQuery = useQuery({
    queryKey: taskKeys.list(userId, queryFilters),
    queryFn: () => getTasks(queryFilters),
    initialData: Object.keys({ ...filters, ...initialFilters })
      .filter((key) => key !== "page" && key !== "pageSize")
      .every((key) => filters[key as keyof TaskListFilters] === initialFilters[key as keyof TaskListFilters]) &&
      queryFilters.page === (initialFilters.page ?? 1) &&
      queryFilters.pageSize === (initialFilters.pageSize ?? TASK_PAGE_SIZE)
      ? result
      : undefined,
    placeholderData: (previousData) => previousData ?? result,
  });
  const taskResult = tasksQuery.data;
  const hasFilters = Object.entries(filters).some(([key, value]) =>
    key !== "page" && key !== "pageSize" && Boolean(value),
  );

  const content =
    tasksQuery.isError || !taskResult || !taskResult.success ? (
      <ErrorState
        title="Tasks are unavailable"
        description={
          tasksQuery.error instanceof Error
            ? tasksQuery.error.message
            : !taskResult || taskResult.success
              ? "Please try again."
              : taskResult.error
        }
        action={
          <Button variant="outline" onClick={() => void tasksQuery.refetch()}>
            Try again
          </Button>
        }
      />
    ) : taskResult.data.tasks.length ? (
      <TaskListView
          key={JSON.stringify(filters)}
          tasks={taskResult.data.tasks}
          totalTasks={taskResult.data.total}
          pageSize={taskResult.data.pageSize}
          groups={groups}
          page={page}
          onPageChange={onPageChange}
          onView={setOpenTaskId}
          onEdit={setEditingTask}
          onStatusChange={(taskId, status) =>
            statusMutation.mutate({ taskId, status })
          }
          statusMutationPending={statusMutation.isPending}
          pendingStatusTaskId={statusMutation.variables?.taskId}
          onPriorityChange={(taskId, priority) =>
            priorityMutation.mutate({ taskId, priority })
          }
          priorityMutationPending={priorityMutation.isPending}
          pendingPriorityTaskId={priorityMutation.variables?.taskId}
          onTrash={setTaskToTrash}
          trashMutationPending={trashMutation.isPending}
          pendingTrashTaskId={trashMutation.variables}
        />
    ) : (
      <EmptyState
        title={hasFilters ? "No matching tasks" : "No tasks yet"}
        description={
          hasFilters
            ? "Try changing or clearing your filters."
            : "Create a task and it will appear here."
        }
      />
    );

  return (
    <>
      {content}
      <TaskCreationDialog
        open={editingTask !== null}
        onOpenChange={(open) => {
          if (!open) setEditingTask(null);
        }}
        task={editingTask}
      />
      <TaskDetailsDrawer
        userId={userId}
        taskId={openTaskId}
        groups={groups}
        open={openTaskId !== null}
        onOpenChange={(open) => {
          if (!open) setOpenTaskId(null);
        }}
      />
      <TaskTrashDialog
        taskToTrash={taskToTrash}
        onClose={() => setTaskToTrash(null)}
        onConfirm={trashMutation.mutateAsync}
      />
    </>
  );
}
