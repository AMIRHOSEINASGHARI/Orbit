"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { parseTaskFormData } from "@/features/tasks/schemas/task.schema";
import { updateTaskForUser } from "@/features/tasks/services/task.service";
import { handleActionError } from "@/utils/actionError";

const taskIdSchema = z.string().regex(/^[\da-f]{24}$/i, "Invalid task ID.");

export async function updateTaskAction(formData: FormData): Promise<ActionResult<{ message: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to update a task." };

  const taskId = taskIdSchema.safeParse(formData.get("taskId"));
  if (!taskId.success) return handleActionError(taskId.error);

  const input = parseTaskFormData(formData);
  if (!input.success) return handleActionError(input.error);

  try {
    await connectToDatabase();
    const result = await updateTaskForUser(user.id, taskId.data, input.data);
    if (result === "not-found") return { success: false, error: "Task not found." };
    if (result === "invalid-group") {
      return {
        success: false,
        error: "That group is no longer available.",
        fieldErrors: { groupId: ["Choose an active group."] },
      };
    }

    revalidatePath("/dashboard");
    revalidatePath("/tasks");
    return { success: true, data: { message: "Task updated successfully." } };
  } catch (error) {
    return handleActionError(error);
  }
}
