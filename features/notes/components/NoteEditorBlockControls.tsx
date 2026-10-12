"use client";

import { useEditorState, type Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { MinusIcon } from "@/components/icons";

type NoteEditorBlockControlsProps = { editor: Editor };

export function NoteEditorBlockControls({ editor }: NoteEditorBlockControlsProps) {
  const active = useEditorState({ editor, selector: ({ editor: current }) => ({
    quote: current.isActive("blockquote"),
    code: current.isActive("codeBlock"),
  }) });

  return (
    <>
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
      <Button
        aria-label="Code block"
        aria-pressed={active.code}
        className="size-7 px-0 font-mono text-xs"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        size="icon-xs"
        title="Code block"
        type="button"
        variant={active.code ? "secondary" : "ghost"}
      >
        &lt;&gt;
      </Button>
      <Button
        aria-label="Insert horizontal rule"
        className="size-7 px-0"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        size="icon-xs"
        title="Insert horizontal rule"
        type="button"
        variant="ghost"
      >
        <MinusIcon />
      </Button>
    </>
  );
}
