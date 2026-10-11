"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { changeTaskStatusForUser } from "@/features/tasks/services/task.service";
import { TASK_STATUSES } from "@/features/tasks/types/task.types";
import { handleActionError } from "@/utils/actionError";

const changeTaskStatusSchema = z.object({
  taskId: z.string().regex(/^[\da-f]{24}$/i, "Invalid task ID."),
  status: z.enum(TASK_STATUSES),
});

export async function changeTaskStatusAction(input: unknown): Promise<ActionResult<{ message: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to update task status." };

  const parsed = changeTaskStatusSchema.safeParse(input);
  if (!parsed.success) return handleActionError(parsed.error);

  try {
    await connectToDatabase();
    const updated = await changeTaskStatusForUser(user.id, parsed.data.taskId, parsed.data.status);
    if (!updated) return { success: false, error: "Task not found." };

    revalidatePath("/dashboard");
    revalidatePath("/tasks");
    return { success: true, data: { message: `Task moved to ${parsed.data.status === "todo" ? "To do" : parsed.data.status === "done" ? "Done" : "In progress"}.` } };
  } catch (error) {
    return handleActionError(error);
  }
}
