"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { moveTasksToGroupForUser } from "@/features/tasks/services/task.service";
import { handleActionError } from "@/utils/actionError";

const bulkMoveTasksToGroupSchema = z.object({
  taskIds: z
    .array(z.string().regex(/^[\da-f]{24}$/i, "Invalid task ID."))
    .min(1, "Select at least one task.")
    .max(500, "Select no more than 500 tasks at a time.")
    .refine(
      (ids) => new Set(ids).size === ids.length,
      "Task IDs must be unique.",
    ),
  groupId: z.string().regex(/^[\da-f]{24}$/i, "Choose a valid group."),
});

export async function bulkMoveTasksToGroup(
  input: unknown,
): Promise<ActionResult<{ message: string }>> {
  const user = await getCurrentUser();
  if (!user)
    return { success: false, error: "Sign in to move tasks to a group." };

  const parsed = bulkMoveTasksToGroupSchema.safeParse(input);
  if (!parsed.success) return handleActionError(parsed.error);

  try {
    await connectToDatabase();
    const movedCount = await moveTasksToGroupForUser(
      user.id,
      parsed.data.taskIds,
      parsed.data.groupId,
    );
    if (movedCount === null)
      return { success: false, error: "Choose an active group you own." };
    if (!movedCount)
      return { success: false, error: "No selected active tasks were found." };

    revalidatePath("/dashboard");
    revalidatePath("/tasks");
    revalidatePath("/groups");
    return {
      success: true,
      data: {
        message: `${movedCount} ${movedCount === 1 ? "task" : "tasks"} moved to group.`,
      },
    };
  } catch (error) {
    return handleActionError(error);
  }
}
