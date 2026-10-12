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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getNotes } from "@/features/notes/actions/get-notes.action";
import { trashNote } from "@/features/notes/actions/trash-note.action";
import { NoteCard } from "@/features/notes/components/NoteCard";
import { NoteCreateDialog } from "@/features/notes/components/NoteCreateDialog";
import { NoteEditDialog } from "@/features/notes/components/NoteEditDialog";
import type { Note } from "@/features/notes/types/note.types";
import type { NoteSortOption } from "@/features/notes/types/note.types";
import type { ActionResult } from "@/types";

export function NotesPage({ initialResult, userId, initialSearch = "", initialSort = "updated-desc" }: { initialResult: ActionResult<Note[]>; userId: string; initialSearch?: string; initialSort?: NoteSortOption }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState<NoteSortOption>(initialSort);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [trashTarget, setTrashTarget] = useState<Note | null>(null);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["notes", userId, search, sort],
    queryFn: () => getNotes({ search, sort }),
    initialData: search === initialSearch && sort === initialSort ? initialResult : undefined,
  });
  const notes = query.data.success ? query.data.data : [];

  function updateUrl(nextSearch: string, nextSort: NoteSortOption) {
    const params = new URLSearchParams(window.location.search);
    if (nextSearch) params.set("search", nextSearch);
    else params.delete("search");
    if (nextSort !== "updated-desc") params.set("sort", nextSort);
    else params.delete("sort");
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block w-full max-w-md">
          <SearchIcon aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" value={search} maxLength={200} onChange={(event) => { setSearch(event.target.value); updateUrl(event.target.value, sort); }} placeholder="Search notes" aria-label="Search notes" className="h-[38px] rounded-lg pl-9" />
        </label>
        <Select value={sort} onValueChange={(value) => { if (!value) return; setSort(value as NoteSortOption); updateUrl(search, value as NoteSortOption); }}>
          <SelectTrigger aria-label="Sort notes" className="h-[38px] w-full sm:w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="updated-desc">Last updated</SelectItem>
            <SelectItem value="updated-asc">Least recently updated</SelectItem>
            <SelectItem value="created-desc">Recently created</SelectItem>
            <SelectItem value="title-asc">Title A–Z</SelectItem>
            <SelectItem value="title-desc">Title Z–A</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
