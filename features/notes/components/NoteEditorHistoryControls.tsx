"use client";

import { useEditorState, type Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";

type NoteEditorHistoryControlsProps = { editor: Editor };

export function NoteEditorHistoryControls({ editor }: NoteEditorHistoryControlsProps) {
  const available = useEditorState({ editor, selector: ({ editor: current }) => ({
    undo: current.can().undo(),
    redo: current.can().redo(),
  }) });

  return (
    <>
      <Button
        aria-label="Undo"
        className="size-7 px-0 text-base"
        disabled={!available.undo}
        onClick={() => editor.chain().focus().undo().run()}
        size="icon-xs"
        title="Undo"
        type="button"
        variant="ghost"
      >
        ↶
      </Button>
      <Button
        aria-label="Redo"
        className="size-7 px-0 text-base"
        disabled={!available.redo}
        onClick={() => editor.chain().focus().redo().run()}
        size="icon-xs"
        title="Redo"
        type="button"
        variant="ghost"
      >
        ↷
      </Button>
    </>
  );
}
