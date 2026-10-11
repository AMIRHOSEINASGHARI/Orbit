"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult } from "@/types";
import { trashGroupForUser } from "@/features/groups/services/group.service";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { handleActionError } from "@/utils/actionError";

const inputSchema = z.object({ groupId: z.string().regex(/^[\da-f]{24}$/i) }).strict();

export async function trashGroup(input: unknown): Promise<ActionResult<{ message: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to move this group to Trash." };
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return handleActionError(parsed.error);
  try {
    await connectToDatabase();
    if (!await trashGroupForUser(user.id, parsed.data.groupId)) return { success: false, error: "Group not found." };
    revalidatePath("/groups");
    revalidatePath(`/groups/${parsed.data.groupId}`);
    revalidatePath("/tasks");
    revalidatePath("/trash");
    return { success: true, data: { message: "Group moved to Trash." } };
  } catch (error) {
    return handleActionError(error);
  }
}
