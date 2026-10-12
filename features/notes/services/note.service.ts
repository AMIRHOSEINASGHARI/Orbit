import "server-only";

import mongoose from "mongoose";
import { NoteModel } from "@/features/notes/models/note.model";
import type { NoteInput, UpdateNoteInput } from "@/features/notes/schemas/note.schema";
import { NOTE_PAGE_SIZE, type Note, type NoteContent, type NoteListPage, type NoteRecord, type NoteSortOption } from "@/features/notes/types/note.types";

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

export async function listNotesForUser(userId: string, search = "", sort: NoteSortOption = "updated-desc", page = 1, pageSize = NOTE_PAGE_SIZE): Promise<NoteListPage> {
  const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const sortOptions = {
    "updated-desc": { updatedAt: -1 },
    "updated-asc": { updatedAt: 1 },
    "created-desc": { createdAt: -1 },
    "title-asc": { title: 1 },
    "title-desc": { title: -1 },
  } as const satisfies Record<NoteSortOption, Record<string, mongoose.SortOrder>>;
  const query = {
    userId: new mongoose.Types.ObjectId(userId),
    workspaceId: null,
    deletedAt: null,
    archivedAt: null,
    ...(escapedSearch ? { $or: [
      { title: { $regex: escapedSearch, $options: "i" } },
      { plainText: { $regex: escapedSearch, $options: "i" } },
    ] } : {}),
  };
  const [notes, total] = await Promise.all([
    NoteModel.find(query).sort(sortOptions[sort]).skip((page - 1) * pageSize).limit(pageSize).lean<NoteRecord[]>().exec(),
    NoteModel.countDocuments(query).exec(),
  ]);

  return { notes: notes.map(toNote), total, page, pageSize };
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

export async function updateNoteForUser(userId: string, input: UpdateNoteInput): Promise<boolean> {
  const { noteId, ...noteInput } = input;
  const updated = await NoteModel.findOneAndUpdate({
    _id: new mongoose.Types.ObjectId(noteId),
    userId: new mongoose.Types.ObjectId(userId),
    workspaceId: null,
    deletedAt: null,
    archivedAt: null,
  }, {
    ...noteInput,
    plainText: toPlainText(noteInput.content).trim(),
  }, { new: true, runValidators: true }).select({ _id: 1 }).lean().exec();
  return Boolean(updated);
}

export async function trashNoteForUser(userId: string, noteId: string): Promise<boolean> {
  const note = await NoteModel.findOneAndUpdate({
    _id: new mongoose.Types.ObjectId(noteId),
    userId: new mongoose.Types.ObjectId(userId),
    workspaceId: null,
    deletedAt: null,
  }, { deletedAt: new Date() }, { new: true, runValidators: true }).select({ _id: 1 }).lean().exec();
  return Boolean(note);
}

export async function restoreNoteForUser(userId: string, noteId: string): Promise<boolean> {
  const note = await NoteModel.findOneAndUpdate({
    _id: new mongoose.Types.ObjectId(noteId),
    userId: new mongoose.Types.ObjectId(userId),
    workspaceId: null,
    deletedAt: { $ne: null },
  }, { deletedAt: null }, { new: true, runValidators: true }).select({ _id: 1 }).lean().exec();
  return Boolean(note);
}

export async function permanentlyDeleteNoteForUser(userId: string, noteId: string): Promise<boolean> {
  const result = await NoteModel.deleteOne({
    _id: new mongoose.Types.ObjectId(noteId),
    userId: new mongoose.Types.ObjectId(userId),
    workspaceId: null,
    deletedAt: { $ne: null },
  }).exec();
  return result.deletedCount > 0;
}
