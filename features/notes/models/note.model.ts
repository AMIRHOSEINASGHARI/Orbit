import "server-only";
import { model, models, Schema, type Model } from "mongoose";
import type { NoteRecord } from "@/features/notes/types/note.types";

const noteModelSchema = new Schema<NoteRecord>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      default: null,
      index: true,
    },
    tagIds: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    attachmentIds: [{ type: Schema.Types.ObjectId, ref: "Attachment" }],
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200,
    },
    content: { type: Schema.Types.Mixed, required: true },
    plainText: { type: String, default: "" },
    archivedAt: { type: Date, default: null, index: true },
    deletedAt: { type: Date, default: null, index: true },
  },
  { timestamps: true, collection: "notes" },
);

noteModelSchema.index({ userId: 1, deletedAt: 1 });
noteModelSchema.index({ userId: 1, createdAt: -1, deletedAt: 1 });

export const NoteModel =
  (models.Note as Model<NoteRecord> | undefined) ??
  model<NoteRecord>("Note", noteModelSchema);
