import { z } from "zod";

const objectIdSchema = z.string().regex(/^[\da-f]{24}$/i, "Enter a valid ID.");

export const taskGroupSchema = z.object({
  userId: objectIdSchema,
  workspaceId: objectIdSchema.nullable().default(null),
  name: z.string().trim().min(1).max(100),
  description: z.string().trim().max(1_000).default(""),
  color: z.string().trim().max(32).nullable().default(null),
  deletedAt: z.coerce.date().nullable().default(null),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const createGroupSchema = taskGroupSchema.pick({ name: true, description: true, color: true });

export type CreateGroupInput = z.infer<typeof createGroupSchema>;
