"use server";

import { z } from "zod";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { getNoteByIdForUser } from "@/features/notes/services/note.service";
import type { Note } from "@/features/notes/types/note.types";
import { handleActionError } from "@/utils/actionError";

const noteIdSchema = z.string().regex(/^[\da-f]{24}$/i, "Invalid note ID.");

export async function getNoteById(noteId: unknown): Promise<ActionResult<Note>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to view this note." };

  const parsedId = noteIdSchema.safeParse(noteId);
  if (!parsedId.success) return handleActionError(parsedId.error);

  try {
    await connectToDatabase();
    const note = await getNoteByIdForUser(user.id, parsedId.data);
    return note ? { success: true, data: note } : { success: false, error: "Note not found." };
  } catch (error) {
    return handleActionError(error);
  }
}
