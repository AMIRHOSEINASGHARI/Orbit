"use client";

import { useEditorState, type Editor } from "@tiptap/react";
import { Link2Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";

type NoteEditorLinkControlProps = { editor: Editor };

export function NoteEditorLinkControl({ editor }: NoteEditorLinkControlProps) {
  const active = useEditorState({ editor, selector: ({ editor: current }) => current.isActive("link") });

  function editLink() {
    const currentHref = editor.getAttributes("link").href as string | undefined;
    const href = window.prompt("Enter link URL", currentHref ?? "https://");
    if (href === null) return;

    const chain = editor.chain().focus().extendMarkRange("link");
    if (!href.trim()) chain.unsetLink().run();
    else chain.setLink({ href: href.trim() }).run();
  }

  return (
    <Button
      aria-label={active ? "Edit link" : "Add link"}
      aria-pressed={active}
      className="aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
      onClick={editLink}
      size="icon-xs"
      title={active ? "Edit link" : "Add link"}
      type="button"
      variant="outline"
    >
      <Link2Icon />
    </Button>
  );
}
