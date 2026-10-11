"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { changeTaskChecklistItemForUser, toTaskListItem } from "@/features/tasks/services/task.service";
import type { TaskListItem } from "@/features/tasks/types/task.types";
import { handleActionError } from "@/utils/actionError";

const checklistChangeSchema = z.object({
  taskId: z.string().regex(/^[\da-f]{24}$/i, "Invalid task ID."),
  index: z.number().int().min(0).max(99),
  text: z.string().min(1).max(500),
  isCompleted: z.boolean(),
});

export async function changeTaskChecklistItemAction(input: unknown): Promise<ActionResult<TaskListItem>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to update the checklist." };

  const parsed = checklistChangeSchema.safeParse(input);
  if (!parsed.success) return handleActionError(parsed.error);

  try {
    await connectToDatabase();
    const task = await changeTaskChecklistItemForUser(
      user.id,
      parsed.data.taskId,
      parsed.data.index,
      parsed.data.text,
      parsed.data.isCompleted,
    );
    if (!task) return { success: false, error: "The checklist changed. Please try again." };

    revalidatePath("/dashboard");
    revalidatePath("/tasks");
    return { success: true, data: toTaskListItem(task) };
  } catch (error) {
    return handleActionError(error);
  }
}
