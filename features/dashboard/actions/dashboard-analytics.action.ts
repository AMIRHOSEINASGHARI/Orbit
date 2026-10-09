"use server";

import mongoose from "mongoose";
import type { ActionResult } from "@/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectToDatabase } from "@/lib/db/mongoose";
import { handleActionError } from "@/utils/actionError";

type Summary = {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
  overdue: number;
  completedThisWeek: number;
};
type GroupWorkload = {
  name: string;
  todo: number;
  inProgress: number;
  done: number;
  total: number;
};
type HabitCounts = {
  onTimeEligible: number;
  onTime: number;
  highEligible: number;
  highDone: number;
  checklistTotal: number;
  checklistDone: number;
  plannedTotal: number;
  plannedDone: number;
};

export type DashboardAnalytics = Summary & {
  trend: { date: string; count: number }[];
  groups: GroupWorkload[];
  priorities: { priority: string; count: number }[];
  deadlines: {
    overdue: number;
    today: number;
    next7Days: number;
    later: number;
  };
  habits: {
    onTime: number;
    highPriority: number;
    checklist: number;
    activeDays: number;
    planned: number;
  };
};

export async function getDashboardAnalytics(): Promise<
  ActionResult<DashboardAnalytics>
> {
  const user = await getCurrentUser();
  if (!user)
    return { success: false, error: "Sign in to view dashboard analytics." };

  try {
    await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database connection is unavailable.");

    const userId = new mongoose.Types.ObjectId(user.id);
    const now = new Date();
    const today = new Date(now);
    today.setUTCHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    const weekStart = new Date(today);
    weekStart.setUTCDate(weekStart.getUTCDate() - 6);
    const weekEnd = new Date(tomorrow);
    weekEnd.setUTCDate(weekEnd.getUTCDate() + 6);

    const countStatus = (status: string) => ({
      $sum: { $cond: [{ $eq: ["$status", status] }, 1, 0] },
    });
    const rate = (value: number, total: number) =>
      total ? Math.round((value / total) * 100) : 0;
    const checklistItems = { $ifNull: ["$checklist", []] };

    const [result] = await db
      .collection("tasks")
      .aggregate<{
        summary: Summary[];
        trend: { _id: string; count: number }[];
        groups: GroupWorkload[];
        priorities: { _id: string; count: number }[];
        deadlines: { _id: string; count: number }[];
        habits: HabitCounts[];
        activeDays: { _id: string }[];
      }>([
        { $match: { userId, deletedAt: null, archivedAt: null } },
        {
          $facet: {
            summary: [
              {
                $group: {
                  _id: null,
                  total: { $sum: 1 },
                  todo: countStatus("todo"),
                  inProgress: countStatus("in-progress"),
                  done: countStatus("done"),
                  overdue: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            { $ne: ["$status", "done"] },
                            { $ne: ["$dueDate", null] },
                            { $lt: ["$dueDate", today] },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                  completedThisWeek: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            { $eq: ["$status", "done"] },
                            { $gte: ["$completedAt", weekStart] },
                            { $lt: ["$completedAt", tomorrow] },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                },
              },
              { $project: { _id: 0 } },
            ],
            trend: [
              {
                $match: {
                  status: "done",
                  completedAt: { $gte: weekStart, $lt: tomorrow },
                },
              },
              {
                $group: {
                  _id: {
                    $dateToString: {
                      date: "$completedAt",
                      format: "%Y-%m-%d",
                      timezone: "UTC",
                    },
                  },
                  count: { $sum: 1 },
                },
              },
            ],
            groups: [
              { $match: { groupId: { $ne: null } } },
              {
                $lookup: {
                  from: "taskgroups",
                  let: { groupId: "$groupId" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $and: [
                            { $eq: ["$_id", "$$groupId"] },
                            { $eq: ["$userId", userId] },
                            { $eq: ["$deletedAt", null] },
                          ],
                        },
                      },
                    },
                    { $project: { name: 1 } },
                  ],
                  as: "group",
                },
              },
              { $unwind: "$group" },
              {
                $group: {
                  _id: { id: "$groupId", name: "$group.name" },
                  total: { $sum: 1 },
                  todo: countStatus("todo"),
                  inProgress: countStatus("in-progress"),
                  done: countStatus("done"),
                },
              },
              {
                $project: {
                  _id: 0,
                  name: "$_id.name",
                  total: 1,
                  todo: 1,
                  inProgress: 1,
                  done: 1,
                },
              },
              { $sort: { total: -1 } },
              { $limit: 6 },
            ],
            priorities: [
              { $match: { status: { $ne: "done" } } },
              { $group: { _id: "$priority", count: { $sum: 1 } } },
            ],
            deadlines: [
              { $match: { status: { $ne: "done" } } },
              {
                $project: {
                  bucket: {
                    $switch: {
                      branches: [
                        {
                          case: {
                            $and: [
                              { $ne: ["$dueDate", null] },
                              { $lt: ["$dueDate", today] },
                            ],
                          },
                          then: "overdue",
                        },
                        {
                          case: {
                            $and: [
                              { $gte: ["$dueDate", today] },
                              { $lt: ["$dueDate", tomorrow] },
                            ],
                          },
                          then: "today",
                        },
                        {
                          case: {
                            $and: [
                              { $gte: ["$dueDate", tomorrow] },
                              { $lt: ["$dueDate", weekEnd] },
                            ],
                          },
                          then: "next7Days",
                        },
                      ],
                      default: "later",
                    },
                  },
                },
              },
              { $group: { _id: "$bucket", count: { $sum: 1 } } },
            ],
            habits: [
              {
                $group: {
                  _id: null,
                  onTimeEligible: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            { $eq: ["$status", "done"] },
                            { $gte: ["$completedAt", weekStart] },
                            { $lt: ["$completedAt", tomorrow] },
                            { $ne: ["$dueDate", null] },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                  onTime: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            { $eq: ["$status", "done"] },
                            { $gte: ["$completedAt", weekStart] },
                            { $lt: ["$completedAt", tomorrow] },
                            { $ne: ["$dueDate", null] },
                            { $lte: ["$completedAt", "$dueDate"] },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                  highEligible: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            { $eq: ["$priority", "high"] },
                            { $gte: ["$updatedAt", weekStart] },
                            { $lt: ["$updatedAt", tomorrow] },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                  highDone: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            { $eq: ["$priority", "high"] },
                            { $eq: ["$status", "done"] },
                            { $gte: ["$updatedAt", weekStart] },
                            { $lt: ["$updatedAt", tomorrow] },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                  checklistTotal: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            { $gte: ["$updatedAt", weekStart] },
                            { $lt: ["$updatedAt", tomorrow] },
                          ],
                        },
                        { $size: checklistItems },
                        0,
                      ],
                    },
                  },
                  checklistDone: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            { $gte: ["$updatedAt", weekStart] },
                            { $lt: ["$updatedAt", tomorrow] },
                          ],
                        },
                        {
                          $size: {
                            $filter: {
                              input: checklistItems,
                              as: "item",
                              cond: { $eq: ["$$item.isCompleted", true] },
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                  plannedTotal: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            { $gte: ["$dueDate", weekStart] },
                            { $lt: ["$dueDate", tomorrow] },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                  plannedDone: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            { $gte: ["$dueDate", weekStart] },
                            { $lt: ["$dueDate", tomorrow] },
                            { $eq: ["$status", "done"] },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                },
              },
              { $project: { _id: 0 } },
            ],
            activeDays: [
              { $match: { updatedAt: { $gte: weekStart, $lt: tomorrow } } },
              {
                $group: {
                  _id: {
                    $dateToString: {
                      date: "$updatedAt",
                      format: "%Y-%m-%d",
                      timezone: "UTC",
                    },
                  },
                },
              },
            ],
          },
        },
      ])
      .toArray();

    const summary = result?.summary[0] ?? {
      total: 0,
      todo: 0,
      inProgress: 0,
      done: 0,
      overdue: 0,
      completedThisWeek: 0,
    };
    const habits = result?.habits[0];
    const trendByDate = new Map(
      result?.trend.map(({ _id, count }) => [_id, count]),
    );
    const trend = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(weekStart);
      date.setUTCDate(date.getUTCDate() + index);
      const key = date.toISOString().slice(0, 10);
      return { date: key, count: trendByDate.get(key) ?? 0 };
    });
    const deadlineCounts = Object.fromEntries(
      (result?.deadlines ?? []).map(({ _id, count }) => [_id, count]),
    );

    return {
      success: true,
      data: {
        ...summary,
        trend,
        groups: result?.groups ?? [],
        priorities: (result?.priorities ?? []).map(({ _id, count }) => ({
          priority: _id,
          count,
        })),
        deadlines: {
          overdue: deadlineCounts.overdue ?? 0,
          today: deadlineCounts.today ?? 0,
          next7Days: deadlineCounts.next7Days ?? 0,
          later: deadlineCounts.later ?? 0,
        },
        habits: {
          onTime: rate(habits?.onTime ?? 0, habits?.onTimeEligible ?? 0),
          highPriority: rate(habits?.highDone ?? 0, habits?.highEligible ?? 0),
          checklist: rate(
            habits?.checklistDone ?? 0,
            habits?.checklistTotal ?? 0,
          ),
          activeDays: rate(result?.activeDays.length ?? 0, 7),
          planned: rate(habits?.plannedDone ?? 0, habits?.plannedTotal ?? 0),
        },
      },
    };
  } catch (error) {
    return handleActionError(error);
  }
}
