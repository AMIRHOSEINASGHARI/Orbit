"use client";

import { useState } from "react";
import type { TaskGroupOption, TaskListItem, TaskStatus } from "@/features/tasks/types/task.types";
import type { ActionResult } from "@/types";
import { TaskBoardView } from "./TaskBoardView";
import { TaskBoardColumn } from "./TaskBoardColumn";

const statuses: TaskStatus[] = ["todo", "in-progress", "done"];

export function TaskBoard({ tasks, groups, onAddTask, onView, onEdit, onTrash, onStatusChange }: {
  tasks: TaskListItem[];
  groups: TaskGroupOption[];
  onAddTask: (status: TaskStatus) => void;
  onView: (taskId: string) => void;
  onEdit: (task: TaskListItem) => void;
  onTrash: (task: TaskListItem) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => Promise<ActionResult<{ message: string }>>;
}) {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [keyboardTaskId, setKeyboardTaskId] = useState<string | null>(null);
  const [keyboardTargetStatus, setKeyboardTargetStatus] = useState<TaskStatus | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const todoTasks = tasks.filter(({ status }) => status === "todo");
  const inProgressTasks = tasks.filter(({ status }) => status === "in-progress");
  const doneTasks = tasks.filter(({ status }) => status === "done");
  const columnProps = {
    groups,
    onAddTask,
    onView,
    onEdit,
    onTrash,
    draggedTaskId,
    keyboardTaskId,
    keyboardTargetStatus,
    onPointerDragStart: setDraggedTaskId,
    onPointerDragEnd: () => setDraggedTaskId(null),
    onKeyboardAction: handleKeyboardAction,
    onDropTask: moveTask,
  };

  async function moveTask(taskId: string, status: TaskStatus) {
    const task = tasks.find(({ id }) => id === taskId);
    if (!task || task.status === status) return;
    setDraggedTaskId(null);
    setKeyboardTaskId(null);
    setKeyboardTargetStatus(null);
    const destination = status === "todo" ? "Todo" : status === "done" ? "Done" : "In Progress";
    setAnnouncement(`Saving ${task.title} in ${destination}.`);
    try {
      const result = await onStatusChange(taskId, status);
      setAnnouncement(result.success
        ? `${task.title} moved to ${destination}.`
        : `Could not move ${task.title}. ${result.error}`);
    } catch {
      setAnnouncement(`Could not move ${task.title}. Please try again.`);
    }
  }

  function handleKeyboardAction(taskId: string, action: "pickup" | "drop" | "cancel" | "left" | "right") {
    const task = tasks.find(({ id }) => id === taskId);
    if (!task) return;
    if (action === "pickup") {
      setKeyboardTaskId(taskId);
      setKeyboardTargetStatus(task.status);
      setAnnouncement(`Picked up ${task.title}. Use left and right arrow keys to choose a status, Space or Enter to drop, or Escape to cancel.`);
    } else if (action === "cancel") {
      setKeyboardTaskId(null);
      setKeyboardTargetStatus(null);
      setAnnouncement(`Canceled moving ${task.title}.`);
    } else if (action === "drop" && keyboardTargetStatus) {
      void moveTask(taskId, keyboardTargetStatus);
    } else if ((action === "left" || action === "right") && keyboardTargetStatus) {
      const index = statuses.indexOf(keyboardTargetStatus);
      const nextStatus = statuses[index + (action === "left" ? -1 : 1)];
      if (nextStatus) setKeyboardTargetStatus(nextStatus);
      setAnnouncement(nextStatus
        ? `${task.title} selected for ${nextStatus === "todo" ? "Todo" : nextStatus === "done" ? "Done" : "In Progress"}.`
        : `No more columns in that direction.`);
    }
  }

  return (
    <>
      <TaskBoardView>
        <TaskBoardColumn status="todo" tasks={todoTasks} {...columnProps} />
        <TaskBoardColumn status="in-progress" tasks={inProgressTasks} {...columnProps} />
        <TaskBoardColumn status="done" tasks={doneTasks} {...columnProps} />
      </TaskBoardView>
      <span aria-live="polite" className="sr-only">{announcement}</span>
    </>
  );
}
