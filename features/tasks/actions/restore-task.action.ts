"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { restoreTaskForUser } from "@/features/tasks/services/task.service";
import { handleActionError } from "@/utils/actionError";

const taskIdSchema = z.string().regex(/^[\da-f]{24}$/i, "Invalid task ID.");

export async function restoreTask(taskId: unknown): Promise<ActionResult<{ message: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to restore a task." };

  const parsedTaskId = taskIdSchema.safeParse(taskId);
  if (!parsedTaskId.success) return handleActionError(parsedTaskId.error);

  try {
    await connectToDatabase();
    const restored = await restoreTaskForUser(user.id, parsedTaskId.data);
    if (!restored) return { success: false, error: "Trashed task not found." };

    revalidatePath("/dashboard");
    revalidatePath("/tasks");
    revalidatePath("/trash");
    return { success: true, data: { message: "Task restored." } };
  } catch (error) {
    return handleActionError(error);
  }
}
