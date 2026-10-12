"use server";

import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { updateNoteSchema } from "@/features/notes/schemas/note.schema";
import { updateNoteForUser } from "@/features/notes/services/note.service";
import { handleActionError } from "@/utils/actionError";

export async function updateNote(input: unknown): Promise<ActionResult<{ message: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to update this note." };

  const parsed = updateNoteSchema.safeParse(input);
  if (!parsed.success) return handleActionError(parsed.error);

  try {
    await connectToDatabase();
    const updated = await updateNoteForUser(user.id, parsed.data);
    if (!updated) return { success: false, error: "Note not found." };

    revalidatePath("/notes");
    revalidatePath(`/notes/${parsed.data.noteId}`);
    revalidatePath("/dashboard");
    return { success: true, data: { message: "Note updated." } };
  } catch (error) {
    return handleActionError(error);
  }
}
