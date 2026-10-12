"use client";

import Link from "next/link";
import { format } from "date-fns";
import { PencilIcon, TrashIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import type { Note } from "@/features/notes/types/note.types";

export function NoteCard({ note, onEdit, onTrash }: {
  note: Note;
  onEdit?: (note: Note) => void;
  onTrash?: (note: Note) => void;
}) {
  return (
    <article className="flex min-h-56 flex-col gap-2 rounded-[10px] border border-border bg-card p-4 shadow-sm">
      <div className="flex h-7 shrink-0 items-start justify-end gap-1">
        {onEdit && <Button type="button" variant="ghost" size="icon-xs" aria-label={`Edit ${note.title}`} title="Edit note" onClick={() => onEdit(note)}><PencilIcon /></Button>}
        {onTrash && <Button type="button" variant="ghost" size="icon-xs" aria-label={`Move ${note.title} to trash`} title="Move to trash" onClick={() => onTrash(note)}><TrashIcon /></Button>}
      </div>
      <Link href={`/notes/${note.id}`} className="line-clamp-1 text-base font-semibold text-foreground hover:text-primary focus-visible:outline-ring">
        {note.title}
      </Link>
      <p className="line-clamp-3 min-h-12 whitespace-pre-wrap text-[13px] leading-5 text-muted-foreground">{note.plainText}</p>
      <p className="mt-auto text-[11px] text-subtle-foreground">Edited {format(new Date(note.updatedAt), "MMM d, yyyy")}</p>
    </article>
  );
}
