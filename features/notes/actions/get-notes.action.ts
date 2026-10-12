"use server";

import { z } from "zod";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { listNotesForUser } from "@/features/notes/services/note.service";
import type { Note } from "@/features/notes/types/note.types";
import { NOTE_SORT_OPTIONS } from "@/features/notes/types/note.types";
import { handleActionError } from "@/utils/actionError";

const noteFiltersSchema = z.object({
  search: z.string().trim().max(200).default(""),
  sort: z.enum(NOTE_SORT_OPTIONS).default("updated-desc"),
}).strict();

export async function getNotes(input: unknown = {}): Promise<ActionResult<Note[]>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to view notes." };

  const parsed = noteFiltersSchema.safeParse(input);
  if (!parsed.success) return handleActionError(parsed.error);

  try {
    await connectToDatabase();
    return { success: true, data: await listNotesForUser(user.id, parsed.data.search, parsed.data.sort) };
  } catch (error) {
    return handleActionError(error);
  }
}
