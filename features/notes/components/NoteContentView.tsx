import type { ReactNode } from "react";
import type { NoteContent } from "@/features/notes/types/note.types";

function safeHref(value: unknown): string | null {
  if (typeof value !== "string") return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const url = new URL(value);
    return ["http:", "https:", "mailto:"].includes(url.protocol) ? value : null;
  } catch {
    return null;
  }
}

function textWithMarks(node: NoteContent): ReactNode {
  let content: ReactNode = node.text ?? "";
  for (const mark of [...(node.marks ?? [])].reverse()) {
    if (mark.type === "bold") content = <strong>{content}</strong>;
    if (mark.type === "italic") content = <em>{content}</em>;
    if (mark.type === "underline") content = <u>{content}</u>;
    if (mark.type === "strike") content = <s>{content}</s>;
    if (mark.type === "code") content = <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em]">{content}</code>;
    if (mark.type === "link") {
      const href = safeHref(mark.attrs?.href);
      content = href ? <a className="text-primary underline underline-offset-2" href={href} rel="noreferrer" target="_blank">{content}</a> : content;
    }
  }
  return content;
}

function NoteNode({ node }: { node: NoteContent }): ReactNode {
  if (node.type === "text") return textWithMarks(node);
  const children = (node.content ?? []).map((child, index) => <NoteNode key={`${child.type}-${index}`} node={child} />);

  if (node.type === "doc") return <>{children}</>;
  if (node.type === "paragraph") return <p className="mb-3 last:mb-0">{children}</p>;
  if (node.type === "heading") {
    const level = node.attrs?.level;
    const styles: Record<number, string> = { 1: "text-2xl font-bold", 2: "text-xl font-semibold", 3: "text-lg font-semibold" };
    const Tag = level === 1 ? "h1" : level === 2 ? "h2" : level === 3 ? "h3" : "h4";
    return <Tag className={`mb-3 ${typeof level === "number" ? styles[level] ?? styles[3] : styles[3]}`}>{children}</Tag>;
  }
  if (node.type === "bulletList") return <ul className="mb-3 list-disc space-y-1 pl-6">{children}</ul>;
  if (node.type === "orderedList") return <ol className="mb-3 list-decimal space-y-1 pl-6">{children}</ol>;
  if (node.type === "listItem") return <li>{children}</li>;
  if (node.type === "blockquote") return <blockquote className="my-3 border-l-2 border-primary pl-4 text-muted-foreground">{children}</blockquote>;
  if (node.type === "codeBlock") return <pre className="my-3 overflow-x-auto rounded-lg bg-muted p-3 font-mono text-sm"><code>{children}</code></pre>;
  if (node.type === "hardBreak") return <br />;
  if (node.type === "horizontalRule") return <hr className="my-4 border-border" />;
  return <>{children}</>;
}

export function NoteContentView({ content }: { content: NoteContent }) {
  return <div className="note-editor-content text-sm leading-6 text-foreground"><NoteNode node={content} /></div>;
}
