"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult } from "@/types";
import { updateGroupForUser } from "@/features/groups/services/group.service";
import { createGroupSchema } from "@/features/groups/schemas/group.schema";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { handleActionError } from "@/utils/actionError";

const inputSchema = z.object({ groupId: z.string().regex(/^[\da-f]{24}$/i), ...createGroupSchema.shape }).strict();

export async function updateGroup(input: unknown): Promise<ActionResult<{ message: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to update a group." };
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return handleActionError(parsed.error);
  const { groupId, ...values } = parsed.data;
  try {
    await connectToDatabase();
    if (!await updateGroupForUser(user.id, groupId, values)) return { success: false, error: "Group not found." };
    revalidatePath("/groups");
    revalidatePath(`/groups/${groupId}`);
    revalidatePath("/tasks");
    return { success: true, data: { message: "Group updated." } };
  } catch (error) {
    return handleActionError(error);
  }
}
