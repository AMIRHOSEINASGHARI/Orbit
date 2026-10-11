"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { permanentlyDeleteTasksForUser } from "@/features/tasks/services/task.service";
import { handleActionError } from "@/utils/actionError";

const bulkPermanentlyDeleteTasksSchema = z.array(z.string().regex(/^[\da-f]{24}$/i, "Invalid task ID."))
  .min(1, "Select at least one task.")
  .max(500, "Select no more than 500 tasks at a time.")
  .refine((ids) => new Set(ids).size === ids.length, "Task IDs must be unique.");

export async function bulkPermanentlyDeleteTasks(taskIds: unknown): Promise<ActionResult<{ message: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to permanently delete tasks." };

  const parsed = bulkPermanentlyDeleteTasksSchema.safeParse(taskIds);
  if (!parsed.success) return handleActionError(parsed.error);

  try {
    await connectToDatabase();
    const deletedCount = await permanentlyDeleteTasksForUser(user.id, parsed.data);
    if (!deletedCount) return { success: false, error: "No selected trashed tasks were found." };

    revalidatePath("/dashboard");
    revalidatePath("/tasks");
    revalidatePath("/trash");
    const message = deletedCount === 1 ? "1 task permanently deleted." : `${deletedCount} tasks permanently deleted.`;
    return { success: true, data: { message } };
  } catch (error) {
    return handleActionError(error);
  }
}
