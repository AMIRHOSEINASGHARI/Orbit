"use server";

import { z } from "zod";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { listTasks } from "@/features/tasks/services/task.service";
import { TASK_PRIORITIES, TASK_SORT_OPTIONS, TASK_STATUSES } from "@/features/tasks/types/task.types";
import type { TaskListItem } from "@/features/tasks/types/task.types";
import { handleActionError } from "@/utils/actionError";

const taskFiltersSchema = z.object({
  search: z.string().trim().max(200).optional(),
  status: z.enum(TASK_STATUSES).optional(),
  priority: z.enum(TASK_PRIORITIES).optional(),
  groupId: z.union([z.string().regex(/^[\da-f]{24}$/i), z.literal("personal")]).optional(),
  dueDate: z.iso.date().optional(),
  sort: z.enum(TASK_SORT_OPTIONS).optional(),
  includeDeleted: z.boolean().optional(),
  includeArchived: z.boolean().optional(),
}).strict();

export async function getTasks(filters: unknown = {}): Promise<ActionResult<TaskListItem[]>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to view tasks." };

  const parsed = taskFiltersSchema.safeParse(filters);
  if (!parsed.success) return handleActionError(parsed.error);

  try {
    await connectToDatabase();
    const tasks = await listTasks(user.id, parsed.data);
    return {
      success: true,
      data: tasks.map(({ _id, userId: _ownerId, groupId, ...task }) => ({
        ...task,
        id: _id.toString(),
        groupId: groupId?.toString() ?? null,
      })),
    };
  } catch (error) {
    return handleActionError(error);
  }
}
