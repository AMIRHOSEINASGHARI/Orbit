"use server";

import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { createNoteSchema } from "@/features/notes/schemas/note.schema";
import { createNoteForUser } from "@/features/notes/services/note.service";
import { handleActionError } from "@/utils/actionError";

export async function createNote(input: unknown): Promise<ActionResult<{ id: string; message: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to create a note." };

  const parsed = createNoteSchema.safeParse(input);
  if (!parsed.success) return handleActionError(parsed.error);

  try {
    await connectToDatabase();
    const id = await createNoteForUser(user.id, parsed.data);
    revalidatePath("/notes");
    revalidatePath("/dashboard");
    return { success: true, data: { id, message: "Note created." } };
  } catch (error) {
    return handleActionError(error);
  }
}
