"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { NOTE_EDITOR_EXTENSIONS } from "@/features/notes/editor/note-editor-extensions";
import type { NoteContent } from "@/features/notes/types/note.types";
import { NoteEditorToolbar } from "@/features/notes/components/NoteEditorToolbar";

type NoteEditorProps = {
  content?: NoteContent;
  id?: string;
  onChange?: (content: NoteContent, plainText: string) => void;
};

export function NoteEditor({ content, id, onChange }: NoteEditorProps) {
  const editor = useEditor({
    extensions: NOTE_EDITOR_EXTENSIONS,
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        ...(id ? { id } : {}),
        "aria-label": "Note content",
        "aria-multiline": "true",
        class: "min-h-48 focus:outline-none",
      },
    },
    onUpdate: ({ editor: updatedEditor }) => {
      onChange?.(updatedEditor.getJSON() as NoteContent, updatedEditor.getText());
    },
  });

  return (
    <div className="note-editor-content min-h-60 rounded-lg border border-input bg-background p-3 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30">
      {editor && <NoteEditorToolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
