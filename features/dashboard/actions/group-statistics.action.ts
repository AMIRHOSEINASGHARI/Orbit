"use server";

import mongoose from "mongoose";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { handleActionError } from "@/utils/actionError";
import type { GroupStatistics } from "@/features/dashboard/types/dashboard.types";

export async function getGroupStatistics(): Promise<ActionResult<GroupStatistics>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to view group statistics." };

  try {
    await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database connection is unavailable.");
    const total = await db.collection("taskgroups").countDocuments({
      userId: new mongoose.Types.ObjectId(user.id),
      deletedAt: null,
    });
    return { success: true, data: { total } };
  } catch (error) {
    return handleActionError(error);
  }
}
