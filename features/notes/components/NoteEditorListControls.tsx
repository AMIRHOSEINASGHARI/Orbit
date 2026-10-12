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
        className="text-sm aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        size="icon-xs"
        title="Bulleted list"
        type="button"
        variant="outline"
      >
        •≡
      </Button>
      <Button
        aria-label="Numbered list"
        aria-pressed={active.ordered}
        className="text-xs aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        size="icon-xs"
        title="Numbered list"
        type="button"
        variant="outline"
      >
        1.
      </Button>
    </>
  );
}
