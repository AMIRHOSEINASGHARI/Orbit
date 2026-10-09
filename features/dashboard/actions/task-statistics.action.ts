"use server";

import mongoose from "mongoose";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { handleActionError } from "@/utils/actionError";
import type { TaskStatistics } from "@/features/dashboard/types/dashboard.types";

const emptyStatistics: TaskStatistics = { total: 0, todo: 0, inProgress: 0, done: 0, overdue: 0 };

export async function getTaskStatistics(): Promise<ActionResult<TaskStatistics>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to view task statistics." };

  try {
    await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database connection is unavailable.");

    const [statistics] = await db.collection("tasks").aggregate<TaskStatistics & { _id: null }>([
      { $match: { userId: new mongoose.Types.ObjectId(user.id), deletedAt: null, archivedAt: null } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          todo: { $sum: { $cond: [{ $eq: ["$status", "todo"] }, 1, 0] } },
          inProgress: { $sum: { $cond: [{ $eq: ["$status", "in-progress"] }, 1, 0] } },
          done: { $sum: { $cond: [{ $eq: ["$status", "done"] }, 1, 0] } },
          overdue: {
            $sum: {
              $cond: [
                { $and: [{ $ne: ["$status", "done"] }, { $lt: ["$dueDate", new Date()] }, { $ne: ["$dueDate", null] }] },
                1,
                0,
              ],
            },
          },
        },
      },
      { $project: { _id: 0, total: 1, todo: 1, inProgress: 1, done: 1, overdue: 1 } },
    ]).toArray();

    return { success: true, data: statistics ?? emptyStatistics };
  } catch (error) {
    return handleActionError(error);
  }
}
