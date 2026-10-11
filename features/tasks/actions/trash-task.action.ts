"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { trashTaskForUser } from "@/features/tasks/services/task.service";
import { handleActionError } from "@/utils/actionError";

const taskIdSchema = z.string().regex(/^[\da-f]{24}$/i, "Invalid task ID.");

export async function trashTask(taskId: unknown): Promise<ActionResult<{ message: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to move a task to trash." };

  const parsedTaskId = taskIdSchema.safeParse(taskId);
  if (!parsedTaskId.success) return handleActionError(parsedTaskId.error);

  try {
    await connectToDatabase();
    const trashed = await trashTaskForUser(user.id, parsedTaskId.data);
    if (!trashed) return { success: false, error: "Task not found." };

    revalidatePath("/dashboard");
    revalidatePath("/tasks");
    revalidatePath("/trash");
    return { success: true, data: { message: "Task moved to trash." } };
  } catch (error) {
    return handleActionError(error);
  }
}
