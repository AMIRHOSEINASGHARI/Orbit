import { getNotes } from "@/features/notes/actions/get-notes.action";
import { NotesPage } from "@/features/notes/components/NotesPage";
import { getCurrentUser } from "@/lib/auth/current-user";

export default async function NotesRoute() {
  const [initialResult, user] = await Promise.all([getNotes(), getCurrentUser()]);
  return <NotesPage initialResult={initialResult} userId={user?.id ?? "unauthenticated"} />;
}
