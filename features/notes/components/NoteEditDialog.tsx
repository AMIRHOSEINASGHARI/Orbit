"use client";

import { updateNote } from "@/features/notes/actions/update-note.action";
import { NoteFormDialog } from "@/features/notes/components/NoteFormDialog";
import type { Note } from "@/features/notes/types/note.types";

export function NoteEditDialog({ open, onOpenChange, note, onSaved }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  note: Note | null;
  onSaved?: () => void;
}) {
  return (
    <NoteFormDialog
      open={open}
      onOpenChange={onOpenChange}
      note={note}
      title="Edit note"
      description="Update this note and save your changes."
      submitLabel="Save changes"
      onSubmit={(input) => note ? updateNote({ ...input, noteId: note.id }) : Promise.resolve({ success: false, error: "Note not found." })}
      onSaved={onSaved}
    />
  );
}
