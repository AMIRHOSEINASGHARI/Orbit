"use server";

import mongoose from "mongoose";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { handleActionError } from "@/utils/actionError";

export type RecentNote = {
  id: string;
  title: string;
  preview: string;
  updatedAt: string | null;
};

export async function getRecentNotes(): Promise<ActionResult<RecentNote[]>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to view recent notes." };

  try {
    await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database connection is unavailable.");
    const notes = await db
      .collection("notes")
      .find<{
        _id: mongoose.Types.ObjectId;
        title: string;
        plainText?: string;
        updatedAt?: Date;
      }>(
        {
          userId: new mongoose.Types.ObjectId(user.id),
          deletedAt: null,
          archivedAt: null,
        },
        { projection: { title: 1, plainText: 1, updatedAt: 1 } },
      )
      .sort({ updatedAt: -1 })
      .limit(2)
      .toArray();

    return {
      success: true,
      data: notes.map(({ _id, title, plainText, updatedAt }) => ({
        id: _id.toString(),
        title,
        preview: (plainText ?? "").slice(0, 180),
        updatedAt: updatedAt?.toISOString() ?? null,
      })),
    };
  } catch (error) {
    return handleActionError(error);
  }
}
