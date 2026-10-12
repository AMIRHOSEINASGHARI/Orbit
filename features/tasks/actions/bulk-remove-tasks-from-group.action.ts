"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { removeTasksFromGroupForUser } from "@/features/tasks/services/task.service";
import { handleActionError } from "@/utils/actionError";

const bulkRemoveTasksFromGroupSchema = z
  .array(z.string().regex(/^[\da-f]{24}$/i, "Invalid task ID."))
  .min(1, "Select at least one task.")
  .max(500, "Select no more than 500 tasks at a time.")
  .refine(
    (ids) => new Set(ids).size === ids.length,
    "Task IDs must be unique.",
  );

export async function bulkRemoveTasksFromGroup(
  taskIds: unknown,
): Promise<ActionResult<{ message: string }>> {
  const user = await getCurrentUser();
  if (!user)
    return { success: false, error: "Sign in to remove tasks from a group." };

  const parsed = bulkRemoveTasksFromGroupSchema.safeParse(taskIds);
  if (!parsed.success) return handleActionError(parsed.error);

  try {
    await connectToDatabase();
    const removedCount = await removeTasksFromGroupForUser(
      user.id,
      parsed.data,
    );
    if (!removedCount)
      return { success: false, error: "No selected grouped tasks were found." };

    revalidatePath("/dashboard");
    revalidatePath("/tasks");
    revalidatePath("/groups");
    return {
      success: true,
      data: {
        message: `${removedCount} ${removedCount === 1 ? "task" : "tasks"} moved to Personal.`,
      },
    };
  } catch (error) {
    return handleActionError(error);
  }
}
