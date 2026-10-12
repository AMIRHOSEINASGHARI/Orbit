"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "@/components/icons";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingState } from "@/components/shared/LoadingState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { getNotes } from "@/features/notes/actions/get-notes.action";
import { NoteCreateDialog } from "@/features/notes/components/NoteCreateDialog";
import type { Note } from "@/features/notes/types/note.types";
import type { ActionResult } from "@/types";

export function NotesPage({ initialResult, userId }: { initialResult: ActionResult<Note[]>; userId: string }) {
  const [createOpen, setCreateOpen] = useState(false);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["notes", userId],
    queryFn: getNotes,
    initialData: initialResult,
  });
  const notes = query.data.success ? query.data.data : [];

  return (
    <main className="space-y-6 p-5 sm:p-7">
      <PageHeader
        title="Notes"
        description="Capture and organize your ideas."
        breadcrumbs="WORKSPACE / NOTES"
        actions={<Button onClick={() => setCreateOpen(true)}><PlusIcon aria-hidden="true" />Create note</Button>}
      />
      {query.isPending ? <LoadingState label="Loading notes" /> : query.isError || !query.data.success ? (
        <ErrorState title="Notes could not be loaded" description={query.isError ? "Please try again." : query.data.error} action={<Button variant="outline" onClick={() => void query.refetch()}>Try again</Button>} />
      ) : notes.length === 0 ? (
        <EmptyState title="No notes yet" description="Create a note to capture an idea, update, or reminder." action={<Button onClick={() => setCreateOpen(true)}><PlusIcon aria-hidden="true" />Create note</Button>} />
      ) : (
        <section aria-label="Notes" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => <article key={note.id} className="min-w-0 rounded-xl border border-border bg-card p-5"><h2 className="truncate font-semibold">{note.title}</h2><p className="mt-2 line-clamp-4 whitespace-pre-wrap text-sm text-muted-foreground">{note.plainText}</p></article>)}
        </section>
      )}
      <NoteCreateDialog open={createOpen} onOpenChange={setCreateOpen} onCreated={() => void queryClient.invalidateQueries({ queryKey: ["notes", userId] })} />
    </main>
  );
}
