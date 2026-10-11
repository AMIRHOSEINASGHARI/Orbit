"use server";

import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/types";
import { createGroupForUser } from "@/features/groups/services/group.service";
import { createGroupSchema } from "@/features/groups/schemas/group.schema";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { handleActionError } from "@/utils/actionError";

export async function createGroup(input: unknown): Promise<ActionResult<{ id: string; message: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to create a group." };

  const parsed = createGroupSchema.safeParse(input);
  if (!parsed.success) return handleActionError(parsed.error);

  try {
    await connectToDatabase();
    const id = await createGroupForUser(user.id, parsed.data);
    revalidatePath("/groups");
    revalidatePath("/tasks");
    revalidatePath("/dashboard");
    return { success: true, data: { id, message: "Group created." } };
  } catch (error) {
    return handleActionError(error);
  }
}
