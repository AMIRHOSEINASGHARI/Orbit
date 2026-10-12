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
        className="text-sm aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        size="icon-xs"
        title="Blockquote"
        type="button"
        variant="outline"
      >
        “ ”
      </Button>
      <Button
        aria-label="Code block"
        aria-pressed={active.code}
        className="font-mono text-xs aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        size="icon-xs"
        title="Code block"
        type="button"
        variant="outline"
      >
        &lt;&gt;
      </Button>
      <Button
        aria-label="Insert horizontal rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        size="icon-xs"
        title="Insert horizontal rule"
        type="button"
        variant="outline"
      >
        <MinusIcon />
      </Button>
    </>
  );
}
