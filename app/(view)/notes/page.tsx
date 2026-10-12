import { getNotes } from "@/features/notes/actions/get-notes.action";
import { NotesPage } from "@/features/notes/components/NotesPage";
import { getCurrentUser } from "@/lib/auth/current-user";
import { NOTE_SORT_OPTIONS } from "@/features/notes/types/note.types";

export default async function NotesRoute({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const initialSearch = typeof params.search === "string" ? params.search.slice(0, 200) : "";
  const initialSort = NOTE_SORT_OPTIONS.find((option) => option === params.sort) ?? "updated-desc";
  const [initialResult, user] = await Promise.all([getNotes({ search: initialSearch, sort: initialSort }), getCurrentUser()]);
  return <NotesPage initialResult={initialResult} userId={user?.id ?? "unauthenticated"} initialSearch={initialSearch} initialSort={initialSort} />;
}
