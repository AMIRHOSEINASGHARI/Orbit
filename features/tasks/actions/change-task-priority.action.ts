"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { changeTaskPriorityForUser } from "@/features/tasks/services/task.service";
import { TASK_PRIORITIES } from "@/features/tasks/types/task.types";
import { handleActionError } from "@/utils/actionError";

const changeTaskPrioritySchema = z.object({
  taskId: z.string().regex(/^[\da-f]{24}$/i, "Invalid task ID."),
  priority: z.enum(TASK_PRIORITIES),
});

export async function changeTaskPriorityAction(input: unknown): Promise<ActionResult<{ message: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to update task priority." };

  const parsed = changeTaskPrioritySchema.safeParse(input);
  if (!parsed.success) return handleActionError(parsed.error);

  try {
    await connectToDatabase();
    const updated = await changeTaskPriorityForUser(user.id, parsed.data.taskId, parsed.data.priority);
    if (!updated) return { success: false, error: "Task not found." };

    revalidatePath("/dashboard");
    revalidatePath("/tasks");
    const label = parsed.data.priority[0].toUpperCase() + parsed.data.priority.slice(1);
    return { success: true, data: { message: `Task priority changed to ${label}.` } };
  } catch (error) {
    return handleActionError(error);
  }
}
