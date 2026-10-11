"use client";

import type { ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getTaskById } from "@/features/tasks/actions/get-task-by-id.action";
import { changeTaskChecklistItemAction } from "@/features/tasks/actions/change-task-checklist-item.action";
import { taskKeys } from "@/features/tasks/queries/task-keys";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ErrorState } from "@/components/shared/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  CalendarClockIcon,
  CalendarPlusIcon,
  CircleDotIcon,
  FlagIcon,
  FolderIcon,
  PencilIcon,
  Trash2Icon,
  UsersIcon,
  XIcon,
} from "@/components/icons";
import type { TaskGroupOption, TaskListItem } from "@/features/tasks/types/task.types";
import { TaskDetailsChecklist } from "./task-details-checklist";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});
const statusLabels = { todo: "To do", "in-progress": "In Progress", done: "Done" } as const;
const statusVariants = { todo: "todo", "in-progress": "info", done: "success" } as const;
const priorityLabels = { low: "Low", medium: "Medium", high: "High" } as const;
const priorityVariants = { low: "info", medium: "warning", high: "danger" } as const;

function MetadataItem({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 items-center gap-[10px]">
      <span
        aria-hidden="true"
        className="flex size-[30px] shrink-0 items-center justify-center rounded-lg text-subtle-foreground [&_svg]:size-3.5"
      >
        {icon}
      </span>
      <div className="flex min-w-0 flex-col gap-[3px]">
        <span className="text-[10px] font-medium uppercase text-subtle-foreground">
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}

export function TaskDetailsDrawer({
  userId,
  taskId,
  groups,
  open,
  onOpenChange,
  onEdit,
  onTrash,
  onComplete,
}: {
  userId: string;
  taskId: string | null;
  groups: TaskGroupOption[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (task: TaskListItem) => void;
  onTrash: (task: TaskListItem) => void;
  onComplete: (taskId: string) => void;
}) {
  const queryClient = useQueryClient();
  const taskQuery = useQuery({
    queryKey: taskKeys.detail(userId, taskId ?? ""),
    queryFn: () => getTaskById(taskId),
    enabled: open && taskId !== null,
  });
  const checklistMutation = useMutation({
    mutationFn: (input: { taskId: string; index: number; text: string; isCompleted: boolean }) => changeTaskChecklistItemAction(input),
    onSuccess: (result, input) => {
      if (!result.success) {
        toast.error(result.error);
        void queryClient.invalidateQueries({ queryKey: taskKeys.detail(userId, input.taskId) });
        return;
      }
      queryClient.setQueryData(taskKeys.detail(userId, input.taskId), result);
      void queryClient.invalidateQueries({ queryKey: taskKeys.lists(userId) });
    },
    onError: (_error, input) => {
      toast.error("Unable to update the checklist. Please try again.");
      void queryClient.invalidateQueries({ queryKey: taskKeys.detail(userId, input.taskId) });
    },
  });
  const taskResult = taskQuery.data;
  const title = taskResult?.success ? taskResult.data.title : "Task details";
  const taskGroup =
    taskResult?.success && taskResult.data.groupId
      ? groups.find(({ id }) => id === taskResult.data.groupId)
      : null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent className="h-dvh w-full max-w-[560px] rounded-none border-l shadow-[-12px_0_32px_rgba(17,19,28,0.18)]">
        <DrawerHeader className="h-[116px] shrink-0 gap-3 border-b px-6 pt-[18px] pb-4 text-left">
          <div className="flex w-full items-center justify-between">
            <div className="flex min-w-0 items-center gap-[7px] text-[11px]">
              <span className="font-semibold text-primary">TASK {taskId?.slice(-6).toUpperCase()}</span>
              <span
                aria-hidden="true"
                className="size-[3px] rounded-full bg-border"
              />
              <span className="truncate text-subtle-foreground">
                {taskGroup?.name ?? "Personal"}
              </span>
            </div>
            <DrawerClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Close task details"
                  className="[&_svg]:size-[15px]"
                />
              }
            >
              <XIcon />
            </DrawerClose>
          </div>
          <DrawerTitle className="w-full truncate text-[24px] leading-[1.2] font-bold">
            {title}
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            Task details and status
          </DrawerDescription>
        </DrawerHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-[18px]">
          {taskQuery.isPending ? (
            <div
              role="status"
              aria-label="Loading task details"
              className="space-y-4"
            >
              <Skeleton className="h-[220px] w-full rounded-[10px]" />
              <Skeleton className="h-16 w-full rounded-xl" />
            </div>
          ) : taskQuery.isError || !taskResult?.success ? (
            <ErrorState
              title="Task details are unavailable"
              description={
                taskQuery.error instanceof Error
                  ? "Please try again."
                  : taskResult?.success === false
                    ? taskResult.error
                    : "Please try again."
              }
              action={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => void taskQuery.refetch()}
                >
                  Try again
                </Button>
              }
            />
          ) : (
            <div className="space-y-4">
              <section
                aria-label="Task metadata"
                className="grid grid-cols-2 gap-x-[18px] gap-y-3 rounded-[10px] border border-border bg-table-header p-[14px]"
              >
                <MetadataItem icon={<CircleDotIcon />} label="Status">
                  <Badge
                    variant={statusVariants[taskResult.data.status]}
                    className="h-6 gap-[5px] px-[9px] text-[11px]"
                  >
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-current"
                    />
                    {statusLabels[taskResult.data.status]}
                  </Badge>
                </MetadataItem>
                <MetadataItem icon={<FlagIcon />} label="Priority">
                  <Badge
                    variant={priorityVariants[taskResult.data.priority]}
                    className="h-6 gap-[5px] px-[9px] text-[11px]"
                  >
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-current"
                    />
                    {priorityLabels[taskResult.data.priority]}
                  </Badge>
                </MetadataItem>
                <MetadataItem icon={<FolderIcon />} label="Group">
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-foreground">
                    <span
                      aria-hidden="true"
                      className="size-[7px] rounded-full"
                      style={{
                        backgroundColor:
                          taskGroup?.color ?? "var(--muted-foreground)",
                      }}
                    />
                    {taskResult.data.groupId
                      ? (taskGroup?.name ?? "Group unavailable")
                      : "Personal"}
                  </span>
                </MetadataItem>
                <MetadataItem icon={<UsersIcon />} label="Assignees">
                  <span className="text-[12px] font-semibold text-subtle-foreground">
                    {taskResult.data.assigneeCount ? `${taskResult.data.assigneeCount} assigned` : "Unassigned"}
                  </span>
                </MetadataItem>
                <MetadataItem icon={<CalendarPlusIcon />} label="Created">
                  <span className="text-[12px] font-semibold text-foreground">
                    {dateFormatter.format(taskResult.data.createdAt)}
                  </span>
                </MetadataItem>
                <MetadataItem icon={<CalendarClockIcon />} label="Due date">
                  <span
                    className={`text-[12px] font-semibold ${taskResult.data.dueDate ? "text-destructive" : "text-subtle-foreground"}`}
                  >
                    {taskResult.data.dueDate
                      ? dateFormatter.format(taskResult.data.dueDate)
                      : "No due date"}
                  </span>
                </MetadataItem>
                {taskResult.data.completedAt && <MetadataItem icon={<CalendarClockIcon />} label="Completed">
                  <span className="text-[12px] font-semibold text-foreground">{dateFormatter.format(taskResult.data.completedAt)}</span>
                </MetadataItem>}
              </section>
              <section
                aria-labelledby="task-description"
                className="space-y-[7px]"
              >
                <h2
                  id="task-description"
                  className="text-[11px] font-semibold uppercase text-subtle-foreground"
                >
                  Description
                </h2>
                <p className="whitespace-pre-wrap text-[12px] leading-[1.45] text-muted-foreground">
                  {taskResult.data.description || "No description provided."}
                </p>
              </section>
              <TaskDetailsChecklist
                items={taskResult.data.checklist}
                pending={checklistMutation.isPending}
                onToggle={(index, item, isCompleted) => checklistMutation.mutate({ taskId: taskResult.data.id, index, text: item.text, isCompleted })}
              />
              <section aria-labelledby="task-attachments" className="space-y-2 border-t border-border pt-4">
                <h2 id="task-attachments" className="text-[11px] font-semibold uppercase text-subtle-foreground">Attachments</h2>
                <p className="text-ui-small text-muted-foreground">{taskResult.data.attachmentCount ? `${taskResult.data.attachmentCount} attached files. File access is coming later.` : "No attachments yet. Uploads are coming later."}</p>
              </section>
            </div>
          )}
        </div>
        {taskResult?.success && <footer className="flex shrink-0 items-center justify-between gap-2 border-t border-border bg-table-header px-6 py-4">
          <Button type="button" variant="ghost" onClick={() => { onOpenChange(false); onTrash(taskResult.data); }} className="text-destructive"><Trash2Icon aria-hidden="true" className="size-4" />Delete</Button>
          <div className="flex gap-2">
            <Button type="button" variant="outline" disabled={checklistMutation.isPending} onClick={() => { onOpenChange(false); onEdit(taskResult.data); }}><PencilIcon aria-hidden="true" className="size-4" />Edit task</Button>
            {taskResult.data.status !== "done" && <Button type="button" onClick={() => onComplete(taskResult.data.id)}>Mark complete</Button>}
          </div>
        </footer>}
      </DrawerContent>
    </Drawer>
  );
}
