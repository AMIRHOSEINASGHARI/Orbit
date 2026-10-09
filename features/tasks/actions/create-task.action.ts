"use server";

import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { createTaskSchema } from "@/features/tasks/schemas/task.schema";
import { createTaskForUser, listTaskGroups } from "@/features/tasks/services/task.service";
import type { TaskActionState } from "@/features/tasks/types/task-action.types";
import type { TaskGroupOption } from "@/features/tasks/types/task.types";
import { handleActionError } from "@/utils/actionError";

export async function createTaskAction(
  _previousState: TaskActionState,
  formData: FormData,
): Promise<TaskActionState> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to create a task." };

  const input = createTaskSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    groupId: formData.get("groupId"),
    dueDate: formData.get("dueDate"),
  });
  if (!input.success) return handleActionError(input.error);

  try {
    await connectToDatabase();
    const id = await createTaskForUser(user.id, input.data);
    if (!id) {
      return {
        success: false,
        error: "That group is no longer available.",
        fieldErrors: { groupId: ["Choose an active group."] },
      };
    }

    revalidatePath("/dashboard");
    revalidatePath("/tasks");
    return { success: true, data: { id, message: "Task created successfully." } };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function getTaskGroupOptions(): Promise<ActionResult<TaskGroupOption[]>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to view groups." };

  try {
    await connectToDatabase();
    return { success: true, data: await listTaskGroups(user.id) };
  } catch (error) {
    return handleActionError(error);
  }
}
