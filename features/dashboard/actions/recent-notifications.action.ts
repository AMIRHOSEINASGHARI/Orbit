"use server";

import mongoose from "mongoose";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { handleActionError } from "@/utils/actionError";

export type RecentNotification = {
  id: string;
  title: string;
  message: string;
  type: string;
  createdAt: string | null;
  isRead: boolean;
};

export async function getRecentNotifications(): Promise<
  ActionResult<RecentNotification[]>
> {
  const user = await getCurrentUser();
  if (!user)
    return { success: false, error: "Sign in to view recent activity." };

  try {
    await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database connection is unavailable.");
    const notifications = await db
      .collection("notifications")
      .find<{
        _id: mongoose.Types.ObjectId;
        title: string;
        message: string;
        type: string;
        createdAt?: Date;
        isRead: boolean;
      }>(
        { userId: new mongoose.Types.ObjectId(user.id) },
        {
          projection: {
            title: 1,
            message: 1,
            type: 1,
            createdAt: 1,
            isRead: 1,
          },
        },
      )
      .sort({ createdAt: -1 })
      .limit(4)
      .toArray();

    return {
      success: true,
      data: notifications.map(
        ({ _id, title, message, type, createdAt, isRead }) => ({
          id: _id.toString(),
          title,
          message,
          type,
          createdAt: createdAt?.toISOString() ?? null,
          isRead,
        }),
      ),
    };
  } catch (error) {
    return handleActionError(error);
  }
}
