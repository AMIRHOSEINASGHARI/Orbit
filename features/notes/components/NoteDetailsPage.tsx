"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ChevronLeftIcon, PencilIcon, TrashIcon } from "@/components/icons";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { ErrorState } from "@/components/shared/ErrorState";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trashNote } from "@/features/notes/actions/trash-note.action";
import { NoteContentView } from "@/features/notes/components/NoteContentView";
import { NoteEditDialog } from "@/features/notes/components/NoteEditDialog";
import type { Note } from "@/features/notes/types/note.types";
import type { ActionResult } from "@/types";

export function NoteDetailsPage({ result }: { result: ActionResult<Note> }) {
  const [editOpen, setEditOpen] = useState(false);
  const [trashOpen, setTrashOpen] = useState(false);
  const router = useRouter();
  if (!result.success) return <main className="space-y-6 p-5 sm:p-7"><ErrorState title="Note could not be loaded" description={result.error} /></main>;
  const note = result.data;

  return (
    <main className="space-y-5 p-5 sm:p-7">
      <Link href="/notes" className="inline-flex items-center gap-1 text-sm text-primary hover:underline"><ChevronLeftIcon aria-hidden="true" className="size-4" />All notes</Link>
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-1"><h1 className="text-3xl font-bold leading-tight">{note.title}</h1><p className="text-xs text-muted-foreground">Updated {format(new Date(note.updatedAt), "MMM d, yyyy · h:mm a")}</p></div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="Edit note" title="Edit note" onClick={() => setEditOpen(true)}><PencilIcon /></Button>
          <Button variant="ghost" size="icon-sm" aria-label="Move note to Trash" title="Move to Trash" onClick={() => setTrashOpen(true)}><TrashIcon /></Button>
        </div>
      </header>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_250px]">
        <article className="min-h-[440px] rounded-xl border border-border bg-card p-5 sm:p-6">
          <NoteContentView content={note.content} />
        </article>
        <aside className="space-y-4">
          <section className="space-y-3 rounded-xl border border-border bg-card p-4">
            <h2 className="font-semibold">Note details</h2>
            <div className="space-y-1 text-sm"><p className="text-xs text-muted-foreground">Created</p><p>{format(new Date(note.createdAt), "MMM d, yyyy")}</p></div>
            <div className="space-y-1 text-sm"><p className="text-xs text-muted-foreground">Last edited</p><p>{format(new Date(note.updatedAt), "MMM d, yyyy")}</p></div>
            <div className="space-y-1 text-sm"><p className="text-xs text-muted-foreground">Tags</p><p>{note.tagIds.length ? `${note.tagIds.length} tags` : "No tags"}</p></div>
          </section>
          <section className="space-y-2 rounded-xl border border-border bg-card p-4">
            <h2 className="font-semibold">Attachments</h2>
            <p className="text-sm text-muted-foreground">{note.attachmentIds.length ? `${note.attachmentIds.length} attachments` : "No attachments"}</p>
          </section>
        </aside>
      </div>
      <NoteEditDialog open={editOpen} onOpenChange={setEditOpen} note={note} onSaved={() => router.refresh()} />
      <ConfirmationDialog open={trashOpen} onOpenChange={setTrashOpen} title={`Move “${note.title}” to Trash?`} description="You can restore this note from Trash later." confirmLabel="Move to Trash" onConfirm={async () => {
        const result = await trashNote(note.id);
        if (!result.success) throw new Error(result.error);
        toast.success(result.data.message);
        router.push("/notes");
      }} />
    </main>
  );
}
