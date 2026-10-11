"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { trashTasksForUser } from "@/features/tasks/services/task.service";
import { handleActionError } from "@/utils/actionError";

const bulkTaskIdsSchema = z.array(z.string().regex(/^[\da-f]{24}$/i, "Invalid task ID."))
  .min(1, "Select at least one task.")
  .max(500, "Select no more than 500 tasks at a time.")
  .refine((ids) => new Set(ids).size === ids.length, "Task IDs must be unique.");

export async function bulkTrashTasks(taskIds: unknown): Promise<ActionResult<{ message: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to move tasks to trash." };

  const parsedTaskIds = bulkTaskIdsSchema.safeParse(taskIds);
  if (!parsedTaskIds.success) return handleActionError(parsedTaskIds.error);

  try {
    await connectToDatabase();
    const movedCount = await trashTasksForUser(user.id, parsedTaskIds.data);
    if (!movedCount) return { success: false, error: "No selected active tasks were found." };

    revalidatePath("/dashboard");
    revalidatePath("/tasks");
    revalidatePath("/trash");
    const message = movedCount === 1 ? "1 task moved to trash." : `${movedCount} tasks moved to trash.`;
    return { success: true, data: { message } };
  } catch (error) {
    return handleActionError(error);
  }
}
