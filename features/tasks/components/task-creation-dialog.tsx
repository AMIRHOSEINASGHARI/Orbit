"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInCalendarDays, format, parseISO, startOfToday } from "date-fns";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CalendarDaysIcon, Loader2Icon, PlusIcon, XIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ActionResult } from "@/types";
import { createTaskAction, getTaskGroupOptions } from "@/features/tasks/actions/create-task.action";
import { createTaskSchema, type TaskInput } from "@/features/tasks/schemas/task.schema";
import { TASK_PRIORITIES, TASK_STATUSES } from "@/features/tasks/types/task.types";
import type { TaskGroupOption } from "@/features/tasks/types/task.types";
import { z } from "zod";

const statusLabels = { todo: "Todo", "in-progress": "In progress", done: "Done" } as const;
const priorityLabels = { low: "Low", medium: "Medium", high: "High" } as const;
const statusVariants = { todo: "todo", "in-progress": "info", done: "success" } as const;
const priorityVariants = { low: "success", medium: "warning", high: "danger" } as const;
type TaskFormValues = z.input<typeof createTaskSchema>;

function fieldError(state: ActionResult<unknown> | undefined, field: string) {
  return state && !state.success ? state.fieldErrors?.[field]?.[0] : undefined;
}

export function TaskCreationDialog({ open, onOpenChange }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTaskAction,
    onSuccess: async (result) => {
      if (!result.success) return;
      toast.success(result.data.message);
      form.reset();
      onOpenChange(false);
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => toast.error("Unable to create the task. Please try again."),
  });
  const state = mutation.data;
  const [groups, setGroups] = useState<TaskGroupOption[]>([]);
  const [groupsPending, setGroupsPending] = useState(false);
  const [groupsError, setGroupsError] = useState<string>();
  const form = useForm<TaskFormValues, unknown, TaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: { title: "", description: "", status: "todo", priority: "medium", groupId: "personal", dueDate: "" },
  });
  const dueDate = form.watch("dueDate");
  const status = form.watch("status") ?? "todo";
  const priority = form.watch("priority") ?? "medium";
  const daysUntilDue = dueDate ? differenceInCalendarDays(parseISO(dueDate), startOfToday()) : null;

  useEffect(() => {
    if (!open) return;
    let active = true;
    setGroupsPending(true);
    setGroupsError(undefined);
    getTaskGroupOptions().then((result) => {
      if (!active) return;
      if (result.success) {
        setGroups(result.data);
        if (result.data.length && form.getValues("groupId") === "personal") {
          form.setValue("groupId", result.data[0].id);
        }
      } else {
        setGroupsError(result.error);
      }
    }).catch(() => {
      if (active) setGroupsError("Groups are unavailable. You can still create a personal task.");
    }).finally(() => {
      if (active) setGroupsPending(false);
    });
    return () => { active = false; };
  }, [form, open]);

  function submit(values: TaskInput) {
    const data = new FormData();
    data.set("title", values.title);
    data.set("description", values.description);
    data.set("status", values.status);
    data.set("priority", values.priority);
    data.set("groupId", values.groupId ?? "");
    data.set("dueDate", values.dueDate ? format(values.dueDate, "yyyy-MM-dd") : "");
    mutation.mutate(data);
  }

  const titleError = form.formState.errors.title?.message ?? fieldError(state, "title");
  const descriptionError = form.formState.errors.description?.message ?? fieldError(state, "description");
  const statusError = form.formState.errors.status?.message ?? fieldError(state, "status");
  const priorityError = form.formState.errors.priority?.message ?? fieldError(state, "priority");
  const groupError = form.formState.errors.groupId?.message ?? fieldError(state, "groupId");
  const dueDateError = form.formState.errors.dueDate?.message ?? fieldError(state, "dueDate");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="flex max-h-[calc(100dvh-2rem)] max-w-[calc(100%-1rem)] flex-col gap-0 overflow-hidden rounded-task-dialog p-0 shadow-task-dialog sm:max-w-[760px]">
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-border px-5 pb-5 pt-6 sm:pl-7 sm:pr-6">
          <div className="space-y-1.5">
            <DialogTitle className="text-2xl font-bold leading-tight">Create new task</DialogTitle>
            <DialogDescription className="text-ui-body">Add the details your team needs to understand, own, and complete this work.</DialogDescription>
          </div>
          <Button type="button" variant="outline" size="icon" aria-label="Close dialog" onClick={() => onOpenChange(false)} className="size-9 shrink-0 bg-table-header">
            <XIcon className="size-[17px]" />
          </Button>
        </header>

        <Form onSubmit={form.handleSubmit(submit)} onKeyDown={(event) => {
          if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
            event.preventDefault();
            void form.handleSubmit(submit)();
          }
        }} className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          <FieldGroup className="gap-5">
            <Field data-invalid={Boolean(titleError)} className="gap-2">
              <div className="flex items-center justify-between gap-3">
                <FieldLabel htmlFor="task-title" className="gap-1.5 text-ui-label font-semibold">Task title <span className="text-danger-foreground">*</span></FieldLabel>
                <span className="text-ui-caption text-subtle-foreground">{200 - (form.watch("title")?.length ?? 0)} characters remaining</span>
              </div>
              <Input {...form.register("title")} id="task-title" maxLength={200} placeholder="Give your task a clear title" aria-invalid={Boolean(titleError)} aria-describedby={titleError ? "task-title-error" : undefined} className="h-[42px] rounded-lg px-3 text-ui-body" />
              <FieldError id="task-title-error" errors={titleError ? [{ message: titleError }] : []} className="text-ui-small text-danger-foreground" />
            </Field>

            <Field data-invalid={Boolean(descriptionError)} className="gap-2">
              <div className="flex items-center justify-between gap-3">
                <FieldLabel htmlFor="task-description" className="gap-1.5 text-ui-label font-semibold">Description <span className="text-ui-caption font-normal text-subtle-foreground">Optional</span></FieldLabel>
                <span className="text-ui-caption text-subtle-foreground">{form.watch("description")?.length ?? 0} / 5,000</span>
              </div>
              <Textarea {...form.register("description")} id="task-description" maxLength={5000} placeholder="Add context or notes for this task" aria-invalid={Boolean(descriptionError)} aria-describedby={descriptionError ? "task-description-error" : undefined} className="h-[94px] min-h-[94px] resize-none rounded-lg p-3 text-[13px]" />
              <FieldError id="task-description-error" errors={descriptionError ? [{ message: descriptionError }] : []} className="text-ui-small text-danger-foreground" />
            </Field>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field data-invalid={Boolean(statusError)} className="gap-2">
                <FieldLabel htmlFor="task-status" className="text-ui-label font-semibold">Status <span className="text-danger-foreground">*</span></FieldLabel>
                <Select value={status} onValueChange={(value) => form.setValue("status", value as TaskFormValues["status"], { shouldDirty: true, shouldValidate: true })}>
                  <SelectTrigger id="task-status" aria-invalid={Boolean(statusError)} aria-describedby={statusError ? "task-status-error" : undefined} className="h-[42px] w-full rounded-lg px-3">
                    <SelectValue><Badge variant={statusVariants[status]}><span aria-hidden="true" className="size-1.5 rounded-full bg-current" />{statusLabels[status]}</Badge></SelectValue>
                  </SelectTrigger>
                  <SelectContent>{TASK_STATUSES.map((value) => <SelectItem key={value} value={value}>{statusLabels[value]}</SelectItem>)}</SelectContent>
                </Select>
                <FieldError id="task-status-error" errors={statusError ? [{ message: statusError }] : []} />
              </Field>

              <Field data-invalid={Boolean(priorityError)} className="gap-2">
                <FieldLabel htmlFor="task-priority" className="text-ui-label font-semibold">Priority <span className="text-danger-foreground">*</span></FieldLabel>
                <Select value={priority} onValueChange={(value) => form.setValue("priority", value as TaskFormValues["priority"], { shouldDirty: true, shouldValidate: true })}>
                  <SelectTrigger id="task-priority" aria-invalid={Boolean(priorityError)} aria-describedby={priorityError ? "task-priority-error" : undefined} className="h-[42px] w-full rounded-lg px-3">
                    <SelectValue><Badge variant={priorityVariants[priority]}><span aria-hidden="true" className="size-1.5 rounded-full bg-current" />{priorityLabels[priority]}</Badge></SelectValue>
                  </SelectTrigger>
                  <SelectContent>{TASK_PRIORITIES.map((value) => <SelectItem key={value} value={value}>{priorityLabels[value]}</SelectItem>)}</SelectContent>
                </Select>
                <FieldError id="task-priority-error" errors={priorityError ? [{ message: priorityError }] : []} />
              </Field>

              <Field data-invalid={Boolean(groupError)} className="gap-2">
                <FieldLabel htmlFor="task-group" className="text-ui-label font-semibold">Group</FieldLabel>
                <Select value={form.watch("groupId") ?? "personal"} onValueChange={(value) => form.setValue("groupId", value ?? "personal", { shouldDirty: true, shouldValidate: true })}>
                  <SelectTrigger id="task-group" aria-invalid={Boolean(groupError)} aria-describedby={groupError ? "task-group-error" : undefined} className="h-[42px] w-full rounded-lg px-3" disabled={groupsPending}>
                    <SelectValue>{groups.find((group) => group.id === form.getValues("groupId"))?.name ?? "Personal"}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal</SelectItem>
                    {groups.map((group) => <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                {groupsError && <p role="status" className="text-ui-caption text-muted-foreground">{groupsError}</p>}
                <FieldError id="task-group-error" errors={groupError ? [{ message: groupError }] : []} />
              </Field>
            </div>

            <Field data-invalid={Boolean(dueDateError)} className="gap-2">
              <FieldLabel htmlFor="task-due-date" className="gap-1.5 text-ui-label font-semibold">Due date <span className="text-ui-caption font-normal text-subtle-foreground">Optional</span></FieldLabel>
              <Popover>
                <PopoverTrigger render={<Button id="task-due-date" type="button" variant="outline" aria-invalid={Boolean(dueDateError)} aria-describedby={dueDateError ? "task-due-date-error" : undefined} className="h-[42px] w-full justify-start rounded-lg px-3 text-left font-medium" />}>
                  <CalendarDaysIcon className="size-4 text-muted-foreground" />
                  {dueDate ? format(parseISO(dueDate), "MMM d, yyyy") : <span className="text-muted-foreground">Choose a date</span>}
                  {daysUntilDue !== null && <Badge variant="default" className="ml-auto border-0 bg-primary-tint text-primary">{daysUntilDue === 0 ? "TODAY" : daysUntilDue > 0 ? `IN ${daysUntilDue} DAY${daysUntilDue === 1 ? "" : "S"}` : `${Math.abs(daysUntilDue)} DAY${daysUntilDue === -1 ? "" : "S"} OVERDUE`}</Badge>}
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar mode="single" selected={dueDate ? parseISO(dueDate) : undefined} onSelect={(date) => form.setValue("dueDate", date ? format(date, "yyyy-MM-dd") : "", { shouldDirty: true, shouldValidate: true })} />
                </PopoverContent>
              </Popover>
              <FieldError id="task-due-date-error" errors={dueDateError ? [{ message: dueDateError }] : []} />
            </Field>
          </FieldGroup>

          {state && !state.success && <p role="alert" className="mt-5 rounded-lg border border-danger-foreground/20 bg-danger px-3 py-2 text-ui-small font-medium text-danger-foreground">{state.error}</p>}
          </div>

          <footer className="flex shrink-0 flex-col-reverse gap-3 border-t border-border bg-table-header px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <span className="hidden text-ui-caption text-subtle-foreground sm:inline">⌘ Enter to create</span>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="h-[42px] rounded-lg px-4">Cancel</Button>
              <Button type="submit" disabled={mutation.isPending || groupsPending} className="h-[42px] rounded-lg px-4">
                {mutation.isPending ? <Loader2Icon aria-hidden="true" className="size-4 animate-spin" /> : <PlusIcon aria-hidden="true" className="size-4" />}
                {mutation.isPending ? "Creating task…" : "Create task"}
              </Button>
            </div>
          </footer>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
