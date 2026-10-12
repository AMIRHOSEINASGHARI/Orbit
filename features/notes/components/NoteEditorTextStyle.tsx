"use client";

import type { Editor } from "@tiptap/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type NoteEditorTextStyleProps = { editor: Editor };

export function NoteEditorTextStyle({ editor }: NoteEditorTextStyleProps) {
  const value = editor.isActive("heading", { level: 1 })
    ? "heading-1"
    : editor.isActive("heading", { level: 2 })
      ? "heading-2"
      : editor.isActive("heading", { level: 3 })
        ? "heading-3"
        : "paragraph";

  return (
    <Select
      value={value}
      onValueChange={(nextValue) => {
        if (nextValue === "paragraph") editor.chain().focus().setParagraph().run();
        if (nextValue === "heading-1") editor.chain().focus().toggleHeading({ level: 1 }).run();
        if (nextValue === "heading-2") editor.chain().focus().toggleHeading({ level: 2 }).run();
        if (nextValue === "heading-3") editor.chain().focus().toggleHeading({ level: 3 }).run();
      }}
    >
      <SelectTrigger aria-label="Text style" className="h-7 w-28 text-xs" size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="paragraph">Paragraph</SelectItem>
        <SelectItem value="heading-1">Heading 1</SelectItem>
        <SelectItem value="heading-2">Heading 2</SelectItem>
        <SelectItem value="heading-3">Heading 3</SelectItem>
      </SelectContent>
    </Select>
  );
}
