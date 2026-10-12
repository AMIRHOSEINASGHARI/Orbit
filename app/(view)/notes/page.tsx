import { getNotes } from "@/features/notes/actions/get-notes.action";
import { NotesPage } from "@/features/notes/components/NotesPage";
import { getCurrentUser } from "@/lib/auth/current-user";

export default async function NotesRoute({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const initialSearch = typeof params.search === "string" ? params.search.slice(0, 200) : "";
  const [initialResult, user] = await Promise.all([getNotes({ search: initialSearch }), getCurrentUser()]);
  return <NotesPage initialResult={initialResult} userId={user?.id ?? "unauthenticated"} initialSearch={initialSearch} />;
}
