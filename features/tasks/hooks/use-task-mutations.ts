"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { changeTaskStatusAction } from "@/features/tasks/actions/change-task-status.action";
import { changeTaskPriorityAction } from "@/features/tasks/actions/change-task-priority.action";
import { trashTask } from "@/features/tasks/actions/trash-task.action";
import { bulkTrashTasks } from "@/features/tasks/actions/bulk-trash-tasks.action";
import { bulkChangeTaskStatus } from "@/features/tasks/actions/bulk-change-task-status.action";
import { bulkChangeTaskPriority } from "@/features/tasks/actions/bulk-change-task-priority.action";
import { bulkMoveTasksToGroup } from "@/features/tasks/actions/bulk-move-tasks-to-group.action";
import { bulkRemoveTasksFromGroup } from "@/features/tasks/actions/bulk-remove-tasks-from-group.action";
import { taskKeys } from "@/features/tasks/queries/task-keys";
import type { ActionResult } from "@/types";
import type { TaskListItem, TaskListPage, TaskListFilters, TaskStatus, TaskPriority } from "@/features/tasks/types/task.types";

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
      queryClient.setQueryData<ActionResult<TaskListPage>>(
        taskKeys.list(userId, filters),
        (current) => current?.success
          ? {
              ...current,
              data: { ...current.data, tasks: current.data.tasks.flatMap((task) => {
                if (task.id !== taskId) return [task];
                if (filters.status && filters.status !== status) return [];
                return [{ ...task, status }];
              }) },
            }
          : current,
      );
      void queryClient.invalidateQueries({ queryKey: taskKeys.detail(userId, taskId) });
      void queryClient.invalidateQueries({ queryKey: taskKeys.lists(userId) });
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
      queryClient.setQueryData<ActionResult<TaskListPage>>(
        taskKeys.list(userId, filters),
        (current) => current?.success
          ? {
              ...current,
              data: { ...current.data, tasks: current.data.tasks.flatMap((task) => {
                if (task.id !== taskId) return [task];
                if (filters.priority && filters.priority !== priority) return [];
                return [{ ...task, priority }];
              }) },
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
  const bulkTrashMutation = useMutation({
    mutationFn: (taskIds: string[]) => bulkTrashTasks(taskIds),
    onSuccess: async (result) => {
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success(result.data.message);
      await queryClient.invalidateQueries({ queryKey: taskKeys.lists(userId) });
    },
    onError: () => toast.error("Unable to move selected tasks to trash. Please try again."),
  });
  const bulkStatusMutation = useMutation({
    mutationFn: (input: { taskIds: string[]; status: TaskStatus }) => bulkChangeTaskStatus(input),
    onSuccess: async (result) => {
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success(result.data.message);
      await queryClient.invalidateQueries({ queryKey: taskKeys.lists(userId) });
    },
    onError: () => toast.error("Unable to update selected task statuses. Please try again."),
  });
  const bulkPriorityMutation = useMutation({
    mutationFn: (input: { taskIds: string[]; priority: TaskPriority }) => bulkChangeTaskPriority(input),
    onSuccess: async (result) => {
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success(result.data.message);
      await queryClient.invalidateQueries({ queryKey: taskKeys.lists(userId) });
    },
    onError: () => toast.error("Unable to update selected task priorities. Please try again."),
  });
  const bulkGroupMutation = useMutation({
    mutationFn: (input: { taskIds: string[]; groupId: string }) => bulkMoveTasksToGroup(input),
    onSuccess: async (result) => {
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success(result.data.message);
      await queryClient.invalidateQueries({ queryKey: taskKeys.lists(userId) });
    },
    onError: () => toast.error("Unable to move selected tasks to the group. Please try again."),
  });
  const bulkRemoveGroupMutation = useMutation({
    mutationFn: (taskIds: string[]) => bulkRemoveTasksFromGroup(taskIds),
    onSuccess: async (result) => {
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success(result.data.message);
      await queryClient.invalidateQueries({ queryKey: taskKeys.lists(userId) });
    },
    onError: () => toast.error("Unable to move selected tasks to Personal. Please try again."),
  });

  return { statusMutation, priorityMutation, trashMutation, bulkTrashMutation, bulkStatusMutation, bulkPriorityMutation, bulkGroupMutation, bulkRemoveGroupMutation };
}
