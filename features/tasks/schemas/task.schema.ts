import { z } from "zod";
import { TASK_PRIORITIES, TASK_STATUSES } from "@/features/tasks/types/task.types";

const objectIdSchema = z.string().regex(/^[\da-f]{24}$/i, "Enter a valid ID.");
const checklistInputSchema = z.object({
  text: z.string().trim().min(1).max(500),
  isCompleted: z.boolean(),
});

export const taskSchema = z.object({
  userId: objectIdSchema,
  groupId: objectIdSchema.nullable().default(null),
  workspaceId: objectIdSchema.nullable().default(null),
  assigneeIds: z.array(objectIdSchema).default([]),
  tagIds: z.array(objectIdSchema).default([]),
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(5_000).default(""),
  status: z.enum(TASK_STATUSES).default("todo"),
  priority: z.enum(TASK_PRIORITIES).default("medium"),
  dueDate: z.coerce.date().nullable().default(null),
  completedAt: z.coerce.date().nullable().default(null),
  checklist: z.array(z.object({
    text: z.string().min(1).max(500),
    isCompleted: z.boolean().default(false),
    position: z.number().int().min(0),
    completedAt: z.coerce.date().nullable().default(null),
  })).default([]),
  recurrence: z.object({
    frequency: z.enum(["daily", "weekly", "monthly", "weekdays", "custom"]).nullable().default(null),
    interval: z.number().int().min(1).default(1),
    daysOfWeek: z.array(z.number().int().min(0).max(6)).default([]),
    endAt: z.coerce.date().nullable().default(null),
    isPaused: z.boolean().default(false),
  }).default({ frequency: null, interval: 1, daysOfWeek: [], endAt: null, isPaused: false }),
  reminders: z.array(z.object({
    remindAt: z.coerce.date(),
    snoozedUntil: z.coerce.date().nullable().default(null),
    deliveredAt: z.coerce.date().nullable().default(null),
    dismissedAt: z.coerce.date().nullable().default(null),
  })).default([]),
  dependencyIds: z.array(objectIdSchema).default([]),
  attachmentIds: z.array(objectIdSchema).default([]),
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
  checklist: z.array(checklistInputSchema).max(100).default([]),
});

export type TaskInput = z.infer<typeof createTaskSchema>;

export function parseTaskFormData(formData: FormData) {
  let checklist: unknown;
  try {
    checklist = JSON.parse(String(formData.get("checklist") ?? "[]"));
  } catch {
    checklist = null;
  }
  return createTaskSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    groupId: formData.get("groupId"),
    dueDate: formData.get("dueDate"),
    checklist,
  });
}
