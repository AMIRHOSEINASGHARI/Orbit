"use client";

import type { TaskGroupOption, TaskListItem, TaskStatus } from "@/features/tasks/types/task.types";
import { TaskBoardView } from "./TaskBoardView";
import { TaskBoardColumn } from "./TaskBoardColumn";

export function TaskBoard({ tasks, groups, onAddTask, onView, onEdit, onTrash }: {
  tasks: TaskListItem[];
  groups: TaskGroupOption[];
  onAddTask: (status: TaskStatus) => void;
  onView: (taskId: string) => void;
  onEdit: (task: TaskListItem) => void;
  onTrash: (task: TaskListItem) => void;
}) {
  const todoTasks = tasks.filter(({ status }) => status === "todo");
  const inProgressTasks = tasks.filter(({ status }) => status === "in-progress");
  const doneTasks = tasks.filter(({ status }) => status === "done");

  return (
    <TaskBoardView>
      <TaskBoardColumn status="todo" tasks={todoTasks} groups={groups} onAddTask={onAddTask} onView={onView} onEdit={onEdit} onTrash={onTrash} />
      <TaskBoardColumn status="in-progress" tasks={inProgressTasks} groups={groups} onAddTask={onAddTask} onView={onView} onEdit={onEdit} onTrash={onTrash} />
      <TaskBoardColumn status="done" tasks={doneTasks} groups={groups} onAddTask={onAddTask} onView={onView} onEdit={onEdit} onTrash={onTrash} />
    </TaskBoardView>
  );
}
