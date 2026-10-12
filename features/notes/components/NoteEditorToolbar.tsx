"use client";

import { useEditorState, type Editor } from "@tiptap/react";

type NoteEditorToolbarProps = {
  editor: Editor;
};

export function NoteEditorToolbar({ editor }: NoteEditorToolbarProps) {
  const wordCount = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) =>
      currentEditor.getText().trim().split(/\s+/).filter(Boolean).length,
  });

  return (
    <div className="flex min-h-8 items-center justify-between gap-3 overflow-x-auto border-b border-border pb-2">
      <div aria-label="Text formatting" className="flex min-w-max items-center gap-1" role="toolbar" />
      <span aria-live="polite" className="shrink-0 text-xs text-muted-foreground">
        {wordCount} {wordCount === 1 ? "word" : "words"}
      </span>
    </div>
  );
}
