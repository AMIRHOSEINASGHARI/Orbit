"use server";

import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { listNotesForUser } from "@/features/notes/services/note.service";
import type { Note } from "@/features/notes/types/note.types";
import { handleActionError } from "@/utils/actionError";

export async function getNotes(): Promise<ActionResult<Note[]>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to view notes." };

  try {
    await connectToDatabase();
    return { success: true, data: await listNotesForUser(user.id) };
  } catch (error) {
    return handleActionError(error);
  }
}
