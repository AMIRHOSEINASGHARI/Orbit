"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { changeTaskStatusAction } from "@/features/tasks/actions/change-task-status.action";
import { changeTaskPriorityAction } from "@/features/tasks/actions/change-task-priority.action";
import { trashTask } from "@/features/tasks/actions/trash-task.action";
import { taskKeys } from "@/features/tasks/queries/task-keys";
import type { ActionResult } from "@/types";
import type { TaskListItem, TaskListFilters, TaskStatus, TaskPriority } from "@/features/tasks/types/task.types";

export function useTaskMutations(userId: string, filters: TaskListFilters) {
  const queryClient = useQueryClient();
  const statusMutation = useMutation({
    mutationFn: (input: { taskId: string; status: TaskStatus }) =>
      changeTaskStatusAction(input),
    onSuccess: (result, { taskId, status }) => {
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success(result.data.message);
      queryClient.setQueryData<ActionResult<TaskListItem[]>>(
        taskKeys.list(userId, filters),
        (current) => current?.success
          ? {
              ...current,
              data: current.data.flatMap((task) => {
                if (task.id !== taskId) return [task];
                if (filters.status && filters.status !== status) return [];
                return [{ ...task, status }];
              }),
            }
          : current,
      );
      queryClient.setQueryData<ActionResult<TaskListItem>>(
        taskKeys.detail(userId, taskId),
        (current) => current?.success
          ? { ...current, data: { ...current.data, status } }
          : current,
      );
    },
    onError: () =>
      toast.error("Unable to update task status. Please try again."),
  });
  const priorityMutation = useMutation({
    mutationFn: (input: { taskId: string; priority: TaskPriority }) =>
      changeTaskPriorityAction(input),
    onSuccess: (result, { taskId, priority }) => {
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success(result.data.message);
      queryClient.setQueryData<ActionResult<TaskListItem[]>>(
        taskKeys.list(userId, filters),
        (current) => current?.success
          ? {
              ...current,
              data: current.data.flatMap((task) => {
                if (task.id !== taskId) return [task];
                if (filters.priority && filters.priority !== priority) return [];
                return [{ ...task, priority }];
              }),
            }
          : current,
      );
      queryClient.setQueryData<ActionResult<TaskListItem>>(
        taskKeys.detail(userId, taskId),
        (current) => current?.success
          ? { ...current, data: { ...current.data, priority } }
          : current,
      );
    },
    onError: () =>
      toast.error("Unable to update task priority. Please try again."),
  });
  const trashMutation = useMutation({
    mutationFn: (taskId: string) => trashTask(taskId),
    onSuccess: async (result) => {
      if (!result.success) return;
      toast.success(result.data.message);
      await queryClient.invalidateQueries({ queryKey: taskKeys.lists(userId) });
    },
  });

  return { statusMutation, priorityMutation, trashMutation };
}
