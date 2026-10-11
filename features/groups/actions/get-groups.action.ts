"use server";

import { z } from "zod";
import type { ActionResult } from "@/types";
import { getGroupsForUser } from "@/features/groups/services/group.service";
import type { GroupListItem } from "@/features/groups/types/group.types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { handleActionError } from "@/utils/actionError";

const groupQuerySchema = z.object({ search: z.string().trim().max(200).optional() }).strict();

export async function getGroups(input: unknown = {}): Promise<ActionResult<GroupListItem[]>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to view groups." };

  const parsed = groupQuerySchema.safeParse(input);
  if (!parsed.success) return handleActionError(parsed.error);

  try {
    await connectToDatabase();
    return { success: true, data: await getGroupsForUser(user.id, parsed.data) };
  } catch (error) {
    return handleActionError(error);
  }
}
