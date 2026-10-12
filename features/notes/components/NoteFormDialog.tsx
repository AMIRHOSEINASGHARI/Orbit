"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CloudUploadIcon, TagsIcon, XIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NoteEditor } from "@/features/notes/components/NoteEditor";
import type { NoteInput } from "@/features/notes/schemas/note.schema";
import type { Note, NoteContent } from "@/features/notes/types/note.types";
import type { ActionResult } from "@/types";

const emptyContent = { type: "doc", content: [{ type: "paragraph" }] };
const noteTitleSchema = z.object({ title: z.string().trim().min(1, "Enter a title.").max(200, "Use 200 characters or fewer.") });
type NoteTitleValues = z.infer<typeof noteTitleSchema>;

export function NoteFormDialog({ open, onOpenChange, note, title, description, submitLabel, onSubmit, onSaved }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  note?: Note | null;
  title: string;
  description: string;
  submitLabel: string;
  onSubmit: (input: NoteInput) => Promise<ActionResult<{ message: string }>>;
  onSaved?: () => void;
}) {
  const [actionError, setActionError] = useState("");
  const [content, setContent] = useState<NoteContent>(note?.content ?? emptyContent);
  const form = useForm<NoteTitleValues>({
    resolver: zodResolver(noteTitleSchema),
    defaultValues: { title: note?.title ?? "" },
  });

  useEffect(() => {
    if (open) {
      form.reset({ title: note?.title ?? "" });
      setContent(note?.content ?? emptyContent);
    }
  }, [form.reset, note?.id, open]);

  async function submit(values: NoteTitleValues) {
    setActionError("");
    try {
      const result = await onSubmit({ ...values, content });
      if (!result.success) {
        setActionError(result.error);
        for (const [field, messages] of Object.entries(result.fieldErrors ?? {})) {
          if (field === "title" && messages?.[0]) form.setError("title", { message: messages[0] });
        }
        return;
      }

      toast.success(result.data.message);
      onSaved?.();
      onOpenChange(false);
    } catch {
      setActionError("The note could not be saved. Please try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => { setActionError(""); onOpenChange(nextOpen); }}>
      <DialogContent showCloseButton={false} className="flex max-h-[calc(100dvh-2rem)] max-w-[calc(100%-1rem)] flex-col gap-0 overflow-hidden rounded-task-dialog p-0 shadow-task-dialog sm:max-w-[760px]">
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-border px-5 pb-5 pt-6 sm:pl-7 sm:pr-6">
          <div className="space-y-1.5">
            <DialogTitle className="text-2xl font-bold leading-tight">{title}</DialogTitle>
            <DialogDescription className="text-ui-body">{description}</DialogDescription>
          </div>
          <Button type="button" variant="outline" size="icon" aria-label="Close dialog" onClick={() => onOpenChange(false)} className="shrink-0 bg-table-header">
            <XIcon className="size-[17px]" />
          </Button>
        </header>

        <Form onSubmit={form.handleSubmit(submit)} className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
            <FieldGroup>
              <Field data-invalid={Boolean(form.formState.errors.title)} className="gap-2">
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="note-title" className="text-ui-label font-semibold">Title <span className="text-danger-foreground">*</span></FieldLabel>
                  <span className="text-ui-caption text-subtle-foreground">{form.watch("title").length} / 200</span>
                </div>
                <Input {...form.register("title")} id="note-title" maxLength={200} placeholder="Give your note a title" aria-invalid={Boolean(form.formState.errors.title)} className="h-[42px] rounded-lg px-3 text-ui-body" />
                <FieldError errors={form.formState.errors.title ? [{ message: form.formState.errors.title.message ?? "Enter a title." }] : []} />
              </Field>

              <Field className="gap-2">
                <FieldLabel htmlFor="note-content" className="text-ui-label font-semibold">Content <span className="text-ui-caption font-normal text-subtle-foreground">Required</span></FieldLabel>
                <NoteEditor
                  key={`${open}-${note?.id ?? "new"}`}
                  id="note-content"
                  content={content}
                  onChange={setContent}
                />
              </Field>

              <Field className="gap-2">
                <FieldLabel className="text-ui-label font-semibold">Tags <span className="text-ui-caption font-normal text-subtle-foreground">Optional</span></FieldLabel>
                <div className="flex min-h-10 items-center gap-2 rounded-lg border border-border bg-table-header px-3 text-ui-small text-muted-foreground"><TagsIcon aria-hidden="true" className="size-4" />Tag selection will be available here</div>
              </Field>

              <Field className="gap-2">
                <FieldLabel className="text-ui-label font-semibold">Attachments <span className="text-ui-caption font-normal text-subtle-foreground">Optional</span></FieldLabel>
                <div className="flex min-h-16 items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-table-header px-3 text-ui-small text-muted-foreground"><CloudUploadIcon aria-hidden="true" className="size-4" />No attachments</div>
              </Field>
            </FieldGroup>
            {actionError && <p role="alert" className="text-ui-small text-danger-foreground">{actionError}</p>}
          </div>
          <footer className="flex shrink-0 flex-col-reverse gap-2 border-t border-border px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Saving…" : submitLabel}</Button>
          </footer>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
