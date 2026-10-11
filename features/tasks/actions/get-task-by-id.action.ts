"use server";

import { z } from "zod";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { getTaskById as findTaskById } from "@/features/tasks/services/task.service";
import type { TaskListItem } from "@/features/tasks/types/task.types";
import { handleActionError } from "@/utils/actionError";

const taskIdSchema = z.string().regex(/^[\da-f]{24}$/i, "Invalid task ID.");

export async function getTaskById(taskId: unknown): Promise<ActionResult<TaskListItem>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to view this task." };

  const parsedTaskId = taskIdSchema.safeParse(taskId);
  if (!parsedTaskId.success) return handleActionError(parsedTaskId.error);

  try {
    await connectToDatabase();
    const task = await findTaskById(user.id, parsedTaskId.data);
    if (!task) return { success: false, error: "Task not found." };

    const { _id, userId: _ownerId, groupId, ...fields } = task;
    return {
      success: true,
      data: { ...fields, id: _id.toString(), groupId: groupId?.toString() ?? null },
    };
  } catch (error) {
    return handleActionError(error);
  }
}
