"use client";

import { createNote } from "@/features/notes/actions/create-note.action";
import { NoteFormDialog } from "@/features/notes/components/NoteFormDialog";

export function NoteCreateDialog({ open, onOpenChange, onCreated }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: () => void;
}) {
  return (
    <NoteFormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create note"
      description="Capture an idea, update, or reminder."
      submitLabel="Create note"
      onSubmit={createNote}
      onSaved={onCreated}
    />
  );
}
