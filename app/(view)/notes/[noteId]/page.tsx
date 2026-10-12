import { getNoteById } from "@/features/notes/actions/get-note-by-id.action";
import { NoteDetailsPage } from "@/features/notes/components/NoteDetailsPage";

export default async function NoteDetailsRoute({ params }: { params: Promise<{ noteId: string }> }) {
  const { noteId } = await params;
  const result = await getNoteById(noteId);
  return <NoteDetailsPage result={result} />;
}
