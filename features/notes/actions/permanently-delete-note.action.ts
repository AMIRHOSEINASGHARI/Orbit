"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { permanentlyDeleteNoteForUser } from "@/features/notes/services/note.service";
import { handleActionError } from "@/utils/actionError";

const noteIdSchema = z.string().regex(/^[\da-f]{24}$/i, "Invalid note ID.");

export async function permanentlyDeleteNote(noteId: unknown): Promise<ActionResult<{ message: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to permanently delete this note." };
  const parsedId = noteIdSchema.safeParse(noteId);
  if (!parsedId.success) return handleActionError(parsedId.error);

  try {
    await connectToDatabase();
    const deleted = await permanentlyDeleteNoteForUser(user.id, parsedId.data);
    if (!deleted) return { success: false, error: "Trashed note not found." };
    revalidatePath("/notes");
    revalidatePath("/trash");
    revalidatePath("/dashboard");
    return { success: true, data: { message: "Note permanently deleted." } };
  } catch (error) {
    return handleActionError(error);
  }
}
