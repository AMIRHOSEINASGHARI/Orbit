import "server-only";

import mongoose from "mongoose";
import { NoteModel } from "@/features/notes/models/note.model";
import type { NoteInput } from "@/features/notes/schemas/note.schema";
import type { Note, NoteContent, NoteRecord } from "@/features/notes/types/note.types";

function toPlainText(node: NoteContent): string {
  if (node.type === "text") return node.text ?? "";
  if (node.type === "hardBreak") return "\n";

  const text = (node.content ?? []).map(toPlainText).join("");
  return ["paragraph", "heading", "blockquote", "codeBlock", "listItem"].includes(node.type)
    ? `${text}\n`
    : text;
}

function toNote(note: NoteRecord): Note {
  return {
    id: note._id.toString(),
    userId: note.userId.toString(),
    workspaceId: note.workspaceId?.toString() ?? null,
    tagIds: note.tagIds.map(String),
    attachmentIds: note.attachmentIds.map(String),
    title: note.title,
    content: note.content,
    plainText: note.plainText,
    archivedAt: note.archivedAt,
    deletedAt: note.deletedAt,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
  };
}

export async function createNoteForUser(userId: string, input: NoteInput): Promise<string> {
  const ownerId = new mongoose.Types.ObjectId(userId);
  const note = await NoteModel.create({
    ...input,
    plainText: toPlainText(input.content).trim(),
    userId: ownerId,
    workspaceId: null,
    tagIds: [],
    attachmentIds: [],
    archivedAt: null,
    deletedAt: null,
  });
  return note._id.toString();
}

export async function listNotesForUser(userId: string): Promise<Note[]> {
  const notes = await NoteModel.find({
    userId: new mongoose.Types.ObjectId(userId),
    workspaceId: null,
    deletedAt: null,
    archivedAt: null,
  }).sort({ updatedAt: -1 }).lean<NoteRecord[]>().exec();

  return notes.map(toNote);
}

export async function getNoteByIdForUser(userId: string, noteId: string): Promise<Note | null> {
  const note = await NoteModel.findOne({
    _id: new mongoose.Types.ObjectId(noteId),
    userId: new mongoose.Types.ObjectId(userId),
    workspaceId: null,
    deletedAt: null,
    archivedAt: null,
  }).lean<NoteRecord>().exec();

  return note ? toNote(note) : null;
}
