"use client";

import { useEditorState, type Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";

type NoteEditorListControlsProps = { editor: Editor };

export function NoteEditorListControls({ editor }: NoteEditorListControlsProps) {
  const active = useEditorState({ editor, selector: ({ editor: current }) => current.isActive("bulletList") });

  return (
    <Button
      aria-label="Bulleted list"
      aria-pressed={active}
      className="size-7 px-0 text-sm"
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      size="icon-xs"
      title="Bulleted list"
      type="button"
      variant={active ? "secondary" : "ghost"}
    >
      •≡
    </Button>
  );
}
