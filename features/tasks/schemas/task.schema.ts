import { z } from "zod";
import { TASK_PRIORITIES, TASK_STATUSES } from "@/features/tasks/types/task.types";

const objectIdSchema = z.string().regex(/^[\da-f]{24}$/i, "Enter a valid ID.");

export const taskSchema = z.object({
  userId: objectIdSchema,
  groupId: objectIdSchema.nullable().default(null),
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(5_000).default(""),
  status: z.enum(TASK_STATUSES).default("todo"),
  priority: z.enum(TASK_PRIORITIES).default("medium"),
  dueDate: z.coerce.date().nullable().default(null),
  trashedByGroupId: objectIdSchema.nullable().default(null),
  deletedAt: z.coerce.date().nullable().default(null),
  archivedAt: z.coerce.date().nullable().default(null),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const createTaskSchema = taskSchema.pick({
  groupId: true,
  title: true,
  description: true,
  status: true,
  priority: true,
}).extend({
  groupId: z.union([objectIdSchema, z.literal(""), z.literal("personal")]).default("personal").transform((value) => value === "personal" || value === "" ? null : value),
  dueDate: z.union([z.iso.date(), z.literal("")]).default("").transform((value) => value ? new Date(`${value}T00:00:00.000Z`) : null),
});

export type TaskInput = z.infer<typeof createTaskSchema>;
