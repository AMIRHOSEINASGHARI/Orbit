"use server";

import { z } from "zod";
import type { ActionResult } from "@/types";
import { getTrashedGroupsForUser } from "@/features/groups/services/group.service";
import type { GroupListItem } from "@/features/groups/types/group.types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { handleActionError } from "@/utils/actionError";

export async function getTrashedGroups(input: unknown = {}): Promise<ActionResult<GroupListItem[]>> {
  if (!z.object({}).strict().safeParse(input).success) return { success: false, error: "Invalid query." };
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to view Trash." };
  try {
    await connectToDatabase();
    return { success: true, data: await getTrashedGroupsForUser(user.id) };
  } catch (error) {
    return handleActionError(error);
  }
}
