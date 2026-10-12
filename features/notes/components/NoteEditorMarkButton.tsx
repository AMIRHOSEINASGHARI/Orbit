"use client";

import type { ReactNode } from "react";
import { useEditorState, type Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";

type NoteEditorMarkButtonProps = {
  editor: Editor;
  label: string;
  mark: string;
  onToggle: () => void;
  children: ReactNode;
};

export function NoteEditorMarkButton({ editor, label, mark, onToggle, children }: NoteEditorMarkButtonProps) {
  const active = useEditorState({ editor, selector: ({ editor: current }) => current.isActive(mark) });

  return (
    <Button
      aria-label={label}
      aria-pressed={active}
      className="size-7 px-0 text-xs"
      onClick={onToggle}
      size="icon-xs"
      title={label}
      type="button"
      variant={active ? "secondary" : "ghost"}
    >
      {children}
    </Button>
  );
}
