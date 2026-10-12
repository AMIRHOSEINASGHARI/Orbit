import { z } from "zod";
import type { NoteContent, NoteJsonValue } from "@/features/notes/types/note.types";

const objectIdSchema = z.string().regex(/^[\da-f]{24}$/i, "Enter a valid ID.");

const noteJsonValueSchema: z.ZodType<NoteJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(noteJsonValueSchema),
    z.record(z.string(), noteJsonValueSchema),
  ]),
);

export const noteContentSchema: z.ZodType<NoteContent> = z.lazy(() =>
  z.object({
    type: z.string().min(1),
    attrs: z.record(z.string(), noteJsonValueSchema).optional(),
    content: z.array(noteContentSchema).optional(),
    marks: z.array(z.object({
      type: z.string().min(1),
      attrs: z.record(z.string(), noteJsonValueSchema).optional(),
    }).strict()).optional(),
    text: z.string().optional(),
  }).strict(),
);

export const noteSchema = z.object({
  userId: objectIdSchema,
  workspaceId: objectIdSchema.nullable().default(null),
  tagIds: z.array(objectIdSchema).default([]),
  attachmentIds: z.array(objectIdSchema).default([]),
  title: z.string().trim().min(1).max(200),
  content: noteContentSchema,
  plainText: z.string().default(""),
  archivedAt: z.coerce.date().nullable().default(null),
  deletedAt: z.coerce.date().nullable().default(null),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const createNoteSchema = noteSchema.pick({ title: true, content: true });
export type NoteInput = z.infer<typeof createNoteSchema>;
