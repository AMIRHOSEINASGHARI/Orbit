import type { Types } from "mongoose";

export type NoteJsonValue =
  | string
  | number
  | boolean
  | null
  | NoteJsonValue[]
  | { [key: string]: NoteJsonValue };

export type NoteContent = {
  type: string;
  attrs?: Record<string, NoteJsonValue>;
  content?: NoteContent[];
  marks?: { type: string; attrs?: Record<string, NoteJsonValue> }[];
  text?: string;
};

export type Note = {
  id: string;
  userId: string;
  workspaceId: string | null;
  tagIds: string[];
  attachmentIds: string[];
  title: string;
  content: NoteContent;
  plainText: string;
  archivedAt: Date | null;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type NoteRecord = Omit<Note, "id" | "userId" | "workspaceId" | "tagIds" | "attachmentIds"> & {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  workspaceId: Types.ObjectId | null;
  tagIds: Types.ObjectId[];
  attachmentIds: Types.ObjectId[];
};
