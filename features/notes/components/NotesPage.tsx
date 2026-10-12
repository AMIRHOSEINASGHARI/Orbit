"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PlusIcon, SearchIcon } from "@/components/icons";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingState } from "@/components/shared/LoadingState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getNotes } from "@/features/notes/actions/get-notes.action";
import { trashNote } from "@/features/notes/actions/trash-note.action";
import { NoteCard } from "@/features/notes/components/NoteCard";
import { NoteCreateDialog } from "@/features/notes/components/NoteCreateDialog";
import { NoteEditDialog } from "@/features/notes/components/NoteEditDialog";
import type { Note } from "@/features/notes/types/note.types";
import type { ActionResult } from "@/types";

export function NotesPage({ initialResult, userId, initialSearch = "" }: { initialResult: ActionResult<Note[]>; userId: string; initialSearch?: string }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [search, setSearch] = useState(initialSearch);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [trashTarget, setTrashTarget] = useState<Note | null>(null);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["notes", userId, search],
    queryFn: () => getNotes({ search }),
    initialData: search === initialSearch ? initialResult : undefined,
  });
  const notes = query.data.success ? query.data.data : [];

  function updateSearch(value: string) {
    setSearch(value);
    const params = new URLSearchParams(window.location.search);
    if (value) params.set("search", value);
    else params.delete("search");
    const queryString = params.toString();
    window.history.replaceState(null, "", queryString ? `/notes?${queryString}` : "/notes");
  }

  return (
    <main className="space-y-6 p-5 sm:p-7">
      <PageHeader
        title="Notes"
        description="Capture and organize your ideas."
        breadcrumbs="WORKSPACE / NOTES"
        actions={<Button onClick={() => setCreateOpen(true)}><PlusIcon aria-hidden="true" />Create note</Button>}
      />
      <label className="relative block w-full max-w-md">
        <SearchIcon aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input type="search" value={search} maxLength={200} onChange={(event) => updateSearch(event.target.value)} placeholder="Search notes" aria-label="Search notes" className="h-[38px] rounded-lg pl-9" />
      </label>
      {query.isPending ? <LoadingState label="Loading notes" /> : query.isError || !query.data.success ? (
        <ErrorState title="Notes could not be loaded" description={query.isError ? "Please try again." : query.data.error} action={<Button variant="outline" onClick={() => void query.refetch()}>Try again</Button>} />
      ) : notes.length === 0 && search ? (
        <EmptyState title="No matching notes" description={`No notes match “${search}”. Try a different search.`} />
      ) : notes.length === 0 ? (
        <EmptyState title="No notes yet" description="Create a note to capture an idea, update, or reminder." action={<Button onClick={() => setCreateOpen(true)}><PlusIcon aria-hidden="true" />Create note</Button>} />
      ) : (
        <section aria-label="Notes" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => <NoteCard key={note.id} note={note} onEdit={setEditingNote} onTrash={setTrashTarget} />)}
        </section>
      )}
      <NoteCreateDialog open={createOpen} onOpenChange={setCreateOpen} onCreated={() => void queryClient.invalidateQueries({ queryKey: ["notes", userId] })} />
      <NoteEditDialog open={Boolean(editingNote)} onOpenChange={(open) => { if (!open) setEditingNote(null); }} note={editingNote} onSaved={() => void queryClient.invalidateQueries({ queryKey: ["notes", userId] })} />
      <ConfirmationDialog
        open={Boolean(trashTarget)}
        onOpenChange={(open) => { if (!open) setTrashTarget(null); }}
        title={`Move “${trashTarget?.title ?? "note"}” to Trash?`}
        description="You can restore this note from Trash later."
        confirmLabel="Move to Trash"
        onConfirm={async () => {
          if (!trashTarget) return;
          const result = await trashNote(trashTarget.id);
          if (!result.success) throw new Error(result.error);
          toast.success(result.data.message);
          await queryClient.invalidateQueries({ queryKey: ["notes", userId] });
          setTrashTarget(null);
        }}
      />
    </main>
  );
}
