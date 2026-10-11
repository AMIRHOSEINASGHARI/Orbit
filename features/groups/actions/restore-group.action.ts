"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult } from "@/types";
import { restoreGroupForUser } from "@/features/groups/services/group.service";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { handleActionError } from "@/utils/actionError";

const inputSchema = z.object({ groupId: z.string().regex(/^[\da-f]{24}$/i) }).strict();

export async function restoreGroup(input: unknown): Promise<ActionResult<{ message: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to restore this group." };
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return handleActionError(parsed.error);
  try {
    await connectToDatabase();
    if (!await restoreGroupForUser(user.id, parsed.data.groupId)) return { success: false, error: "Group not found in Trash." };
    revalidatePath("/groups");
    revalidatePath("/groups/trash");
    revalidatePath("/tasks");
    revalidatePath("/trash");
    return { success: true, data: { message: "Group restored." } };
  } catch (error) {
    return handleActionError(error);
  }
}
