"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { changeTasksPriorityForUser } from "@/features/tasks/services/task.service";
import { TASK_PRIORITIES } from "@/features/tasks/types/task.types";
import { handleActionError } from "@/utils/actionError";

const bulkChangeTaskPrioritySchema = z.object({
  taskIds: z.array(z.string().regex(/^[\da-f]{24}$/i, "Invalid task ID."))
    .min(1, "Select at least one task.")
    .max(500, "Select no more than 500 tasks at a time.")
    .refine((ids) => new Set(ids).size === ids.length, "Task IDs must be unique."),
  priority: z.enum(TASK_PRIORITIES),
});

export async function bulkChangeTaskPriority(input: unknown): Promise<ActionResult<{ message: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to update task priority." };

  const parsed = bulkChangeTaskPrioritySchema.safeParse(input);
  if (!parsed.success) return handleActionError(parsed.error);

  try {
    await connectToDatabase();
    const updatedCount = await changeTasksPriorityForUser(user.id, parsed.data.taskIds, parsed.data.priority);
    if (!updatedCount) return { success: false, error: "No selected active tasks were found." };

    revalidatePath("/dashboard");
    revalidatePath("/tasks");
    const label = parsed.data.priority[0].toUpperCase() + parsed.data.priority.slice(1);
    return { success: true, data: { message: `${updatedCount} ${updatedCount === 1 ? "task" : "tasks"} priority changed to ${label}.` } };
  } catch (error) {
    return handleActionError(error);
  }
}
