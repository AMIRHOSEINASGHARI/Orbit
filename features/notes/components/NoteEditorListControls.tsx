"use client";

import { useEditorState, type Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";

type NoteEditorListControlsProps = { editor: Editor };

export function NoteEditorListControls({ editor }: NoteEditorListControlsProps) {
  const active = useEditorState({ editor, selector: ({ editor: current }) => ({
    bullet: current.isActive("bulletList"),
    ordered: current.isActive("orderedList"),
  }) });

  return (
    <>
      <Button
        aria-label="Bulleted list"
        aria-pressed={active.bullet}
        className="size-7 px-0 text-sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        size="icon-xs"
        title="Bulleted list"
        type="button"
        variant={active.bullet ? "secondary" : "ghost"}
      >
        •≡
      </Button>
      <Button
        aria-label="Numbered list"
        aria-pressed={active.ordered}
        className="size-7 px-0 text-xs"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        size="icon-xs"
        title="Numbered list"
        type="button"
        variant={active.ordered ? "secondary" : "ghost"}
      >
        1.
      </Button>
    </>
  );
}
