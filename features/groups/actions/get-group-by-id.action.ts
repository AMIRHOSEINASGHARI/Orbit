"use server";

import { z } from "zod";
import type { ActionResult } from "@/types";
import { getGroupByIdForUser } from "@/features/groups/services/group.service";
import type { GroupListItem } from "@/features/groups/types/group.types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { handleActionError } from "@/utils/actionError";

const querySchema = z.object({ groupId: z.string().regex(/^[\da-f]{24}$/i) }).strict();

export async function getGroupById(input: unknown): Promise<ActionResult<GroupListItem>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to view this group." };
  const parsed = querySchema.safeParse(input);
  if (!parsed.success) return handleActionError(parsed.error);
  try {
    await connectToDatabase();
    const group = await getGroupByIdForUser(user.id, parsed.data.groupId);
    return group ? { success: true, data: group } : { success: false, error: "Group not found." };
  } catch (error) {
    return handleActionError(error);
  }
}
