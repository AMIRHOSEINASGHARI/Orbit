"use client";

import { useEditorState, type Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";

type NoteEditorBlockControlsProps = { editor: Editor };

export function NoteEditorBlockControls({ editor }: NoteEditorBlockControlsProps) {
  const active = useEditorState({ editor, selector: ({ editor: current }) => ({
    quote: current.isActive("blockquote"),
    code: current.isActive("codeBlock"),
  }) });

  return (
    <Button
      aria-label="Blockquote"
      aria-pressed={active.quote}
      className="size-7 px-0 text-sm"
      onClick={() => editor.chain().focus().toggleBlockquote().run()}
      size="icon-xs"
      title="Blockquote"
      type="button"
      variant={active.quote ? "secondary" : "ghost"}
    >
      “ ”
    </Button>
  );
}
