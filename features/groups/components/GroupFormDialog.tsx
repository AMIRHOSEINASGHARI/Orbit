"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckIcon, Loader2Icon, XIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  GROUP_COLORS,
  groupColorClass,
} from "@/features/groups/constants/group-colors";
import {
  createGroupSchema,
  type CreateGroupInput,
} from "@/features/groups/schemas/group.schema";
type GroupFormGroup = Pick<import("@/features/groups/types/group.types").TaskGroup, "id" | "name" | "description" | "color">;

type GroupFormValues = z.input<typeof createGroupSchema>;

export function GroupFormDialog({
  open,
  onOpenChange,
  group = null,
  isPending = false,
  error,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group?: GroupFormGroup | null;
  isPending?: boolean;
  error?: string;
  onSubmit: (values: CreateGroupInput) => void;
}) {
  const form = useForm<GroupFormValues, unknown, CreateGroupInput>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: { name: "", description: "", color: null },
  });

  useEffect(() => {
    if (!open) return;
    form.reset(
      group
        ? {
            name: group.name,
            description: group.description,
            color: group.color,
          }
        : { name: "", description: "", color: null },
    );
  }, [form, group?.color, group?.description, group?.id, group?.name, open]);

  const nameError = form.formState.errors.name?.message;
  const descriptionError = form.formState.errors.description?.message;
  const selectedColor = form.watch("color") ?? "neutral";
  const editing = Boolean(group);

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => !isPending && onOpenChange(nextOpen)}
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-150 gap-0 overflow-y-auto rounded-task-dialog p-0 shadow-task-dialog"
      >
        <header className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div className="space-y-1.5">
            <DialogTitle className="text-xl font-bold">
              {editing ? "Edit group" : "Create group"}
            </DialogTitle>
            <DialogDescription>
              {editing
                ? "Update how this group appears in your workspace."
                : "Give related work a place to come together."}
            </DialogDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Close dialog"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
          >
            <XIcon className="size-4" />
          </Button>
        </header>

        <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-6">
          <div className="space-y-1">
            <h3 className="text-ui-body font-semibold">Group details</h3>
            <p className="text-ui-small text-muted-foreground">
              Keep related tasks organized in your current workspace.
            </p>
          </div>

          <FieldGroup className="gap-4">
            <Field data-invalid={Boolean(nameError)} className="gap-2">
              <div className="flex items-center justify-between gap-3">
                <FieldLabel
                  htmlFor="group-name"
                  className="text-ui-label font-semibold"
                >
                  Name <span className="text-danger-foreground">*</span>
                </FieldLabel>
                <span className="text-ui-caption text-subtle-foreground">
                  {form.watch("name")?.length ?? 0} / 100
                </span>
              </div>
              <Input
                {...form.register("name")}
                id="group-name"
                maxLength={100}
                placeholder="Enter a group name"
                aria-invalid={Boolean(nameError)}
                aria-describedby={
                  nameError ? "group-name-error" : "group-name-help"
                }
              />
              <p
                id="group-name-help"
                className="text-ui-caption text-muted-foreground"
              >
                Required · 1–100 characters. Leading and trailing spaces are
                trimmed.
              </p>
              <FieldError
                id="group-name-error"
                errors={nameError ? [{ message: nameError }] : []}
                className="text-ui-small"
              />
            </Field>

            <Field data-invalid={Boolean(descriptionError)} className="gap-2">
              <div className="flex items-center justify-between gap-3">
                <FieldLabel
                  htmlFor="group-description"
                  className="text-ui-label font-semibold"
                >
                  Description{" "}
                  <span className="text-ui-caption font-normal text-subtle-foreground">
                    Optional
                  </span>
                </FieldLabel>
                <span className="text-ui-caption text-subtle-foreground">
                  {form.watch("description")?.length ?? 0} / 1,000
                </span>
              </div>
              <Textarea
                {...form.register("description")}
                id="group-description"
                maxLength={1000}
                placeholder="Add a description..."
                aria-invalid={Boolean(descriptionError)}
                aria-describedby={
                  descriptionError
                    ? "group-description-error"
                    : "group-description-help"
                }
                className="h-[86px] min-h-[86px] resize-none rounded-lg p-3 text-ui-small"
              />
              <p
                id="group-description-help"
                className="text-ui-caption text-muted-foreground"
              >
                Plain text · Up to 1,000 characters.
              </p>
              <FieldError
                id="group-description-error"
                errors={descriptionError ? [{ message: descriptionError }] : []}
                className="text-ui-small"
              />
            </Field>

            <Field className="gap-2">
              <FieldLabel className="text-ui-label font-semibold">
                Color{" "}
                <span className="text-ui-caption font-normal text-subtle-foreground">
                  Optional
                </span>
              </FieldLabel>
              <p className="text-ui-caption text-muted-foreground">
                An identity marker only; it does not change task status.
              </p>
              <div
                role="group"
                aria-label="Group color"
                className="flex flex-wrap gap-2"
              >
                {GROUP_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    aria-label={`Set group color to ${color.label}`}
                    aria-pressed={selectedColor === color.value}
                    disabled={isPending}
                    onClick={() =>
                      form.setValue("color", color.value, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                    className={`flex size-[34px] items-center justify-center rounded-full border border-border transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50 ${groupColorClass(color.value)} ${selectedColor === color.value ? "ring-2 ring-foreground ring-offset-2 ring-offset-background" : ""}`}
                  >
                    {selectedColor === color.value && (
                      <CheckIcon
                        aria-hidden="true"
                        className="size-4 text-white"
                      />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-ui-caption text-muted-foreground">
                Selected:{" "}
                {GROUP_COLORS.find((color) => color.value === selectedColor)
                  ?.label ?? "Custom"}
                {selectedColor === "neutral" ? " (default)" : ""}
              </p>
            </Field>
          </FieldGroup>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-danger-foreground/20 bg-danger px-3 py-2 text-ui-small text-danger-foreground"
            >
              {error}
            </p>
          )}

          <footer className="flex flex-col-reverse justify-end gap-2 border-t border-border pt-4 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2Icon
                  aria-hidden="true"
                  className="size-4 animate-spin"
                />
              ) : null}
              {isPending
                ? editing
                  ? "Saving…"
                  : "Creating…"
                : editing
                  ? "Save changes"
                  : "Create group"}
            </Button>
          </footer>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
