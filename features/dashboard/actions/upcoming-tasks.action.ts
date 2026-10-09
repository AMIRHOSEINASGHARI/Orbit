"use server";

import mongoose from "mongoose";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { handleActionError } from "@/utils/actionError";
import type { RecentTask } from "@/features/dashboard/types/dashboard.types";

type TaskDocument = Omit<RecentTask, "id" | "dueDate" | "groupId"> & {
  _id: mongoose.Types.ObjectId;
  groupId: mongoose.Types.ObjectId | null;
  dueDate: Date;
};

export async function getUpcomingTasks(): Promise<ActionResult<RecentTask[]>> {
  const user = await getCurrentUser();
  if (!user)
    return { success: false, error: "Sign in to view upcoming tasks." };

  try {
    await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database connection is unavailable.");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tasks = await db
      .collection("tasks")
      .find<TaskDocument>(
        {
          userId: new mongoose.Types.ObjectId(user.id),
          deletedAt: null,
          archivedAt: null,
          status: { $ne: "done" },
          dueDate: { $gte: today },
        },
        {
          projection: {
            title: 1,
            groupId: 1,
            priority: 1,
            status: 1,
            dueDate: 1,
          },
        },
      )
      .sort({ dueDate: 1 })
      .limit(3)
      .toArray();

    return {
      success: true,
      data: tasks.map(({ _id, dueDate, groupId, ...task }) => ({
        ...task,
        id: _id.toString(),
        groupId: groupId?.toString() ?? null,
        dueDate: dueDate.toISOString(),
      })),
    };
  } catch (error) {
    return handleActionError(error);
  }
}
