"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { trashNoteForUser } from "@/features/notes/services/note.service";
import { handleActionError } from "@/utils/actionError";

const noteIdSchema = z.string().regex(/^[\da-f]{24}$/i, "Invalid note ID.");

export async function trashNote(noteId: unknown): Promise<ActionResult<{ message: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to move this note to Trash." };
  const parsedId = noteIdSchema.safeParse(noteId);
  if (!parsedId.success) return handleActionError(parsedId.error);

  try {
    await connectToDatabase();
    const moved = await trashNoteForUser(user.id, parsedId.data);
    if (!moved) return { success: false, error: "Note not found." };
    revalidatePath("/notes");
    revalidatePath(`/notes/${parsedId.data}`);
    revalidatePath("/trash");
    revalidatePath("/dashboard");
    return { success: true, data: { message: "Note moved to Trash." } };
  } catch (error) {
    return handleActionError(error);
  }
}
