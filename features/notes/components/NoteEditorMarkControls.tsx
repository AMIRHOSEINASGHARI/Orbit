"use client";

import type { Editor } from "@tiptap/react";
import { NoteEditorMarkButton } from "@/features/notes/components/NoteEditorMarkButton";

type NoteEditorMarkControlsProps = { editor: Editor };

export function NoteEditorMarkControls({ editor }: NoteEditorMarkControlsProps) {
  return (
    <>
      <NoteEditorMarkButton editor={editor} label="Bold" mark="bold" onToggle={() => editor.chain().focus().toggleBold().run()}>
        <strong>B</strong>
      </NoteEditorMarkButton>
      <NoteEditorMarkButton editor={editor} label="Italic" mark="italic" onToggle={() => editor.chain().focus().toggleItalic().run()}>
        <em>I</em>
      </NoteEditorMarkButton>
      <NoteEditorMarkButton editor={editor} label="Underline" mark="underline" onToggle={() => editor.chain().focus().toggleUnderline().run()}>
        <span className="underline">U</span>
      </NoteEditorMarkButton>
      <NoteEditorMarkButton editor={editor} label="Strikethrough" mark="strike" onToggle={() => editor.chain().focus().toggleStrike().run()}>
        <s>S</s>
      </NoteEditorMarkButton>
    </>
  );
}
