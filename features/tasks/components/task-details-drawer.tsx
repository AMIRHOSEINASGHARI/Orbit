"use client";

import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "@/features/tasks/actions/get-task-by-id.action";
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
import { XIcon } from "@/components/icons";
import type { TaskGroupOption } from "@/features/tasks/types/task.types";

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });
const statusLabels = { todo: "To do", "in-progress": "In progress", done: "Done" } as const;
const statusVariants = { todo: "todo", "in-progress": "info", done: "success" } as const;
const priorityLabels = { low: "Low", medium: "Medium", high: "High" } as const;
const priorityVariants = { low: "info", medium: "warning", high: "danger" } as const;

export function TaskDetailsDrawer({
  userId,
  taskId,
  groups,
  open,
  onOpenChange,
}: {
  userId: string;
  taskId: string | null;
  groups: TaskGroupOption[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const taskQuery = useQuery({
    queryKey: taskKeys.detail(userId, taskId ?? ""),
    queryFn: () => getTaskById(taskId),
    enabled: open && taskId !== null,
  });
  const taskResult = taskQuery.data;
  const title = taskResult?.success ? taskResult.data.title : "Task details";
  const taskGroup = taskResult?.success && taskResult.data.groupId
    ? groups.find(({ id }) => id === taskResult.data.groupId)
    : null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent className="h-dvh w-full max-w-[560px] rounded-none border-l shadow-[-12px_0_32px_rgba(17,19,28,0.18)]">
        <DrawerHeader className="flex-row items-start justify-between gap-4 border-b px-6 py-5 text-left">
          <div className="min-w-0">
            <DrawerTitle className="truncate text-xl font-bold">{title}</DrawerTitle>
            <DrawerDescription className="sr-only">Task details and status</DrawerDescription>
          </div>
          <DrawerClose render={<Button type="button" variant="outline" size="icon-sm" aria-label="Close task details" />}>
            <XIcon />
          </DrawerClose>
        </DrawerHeader>

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          {taskQuery.isPending ? (
            <div role="status" aria-label="Loading task details" className="space-y-4">
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          ) : taskQuery.isError || !taskResult?.success ? (
            <ErrorState
              title="Task details are unavailable"
              description={taskQuery.error instanceof Error ? "Please try again." : taskResult?.success === false ? taskResult.error : "Please try again."}
              action={<Button type="button" variant="outline" onClick={() => void taskQuery.refetch()}>Try again</Button>}
            />
          ) : (
            <div className="space-y-5">
              <section aria-label="Task information" className="rounded-[10px] border border-border bg-muted/30 p-4">
                <h2 className="text-ui-caption font-bold uppercase tracking-wide text-muted-foreground">Task information</h2>
                <p className="mt-3 whitespace-pre-wrap text-ui-small leading-6 text-foreground">
                  {taskResult.data.description || "No description provided."}
                </p>
                <dl className="mt-4 grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-ui-caption font-medium text-muted-foreground">Status</dt>
                    <dd className="mt-1"><Badge variant={statusVariants[taskResult.data.status]}><span aria-hidden="true" className="size-1.5 rounded-full bg-current" />{statusLabels[taskResult.data.status]}</Badge></dd>
                  </div>
                  <div>
                    <dt className="text-ui-caption font-medium text-muted-foreground">Priority</dt>
                    <dd className="mt-1"><Badge variant={priorityVariants[taskResult.data.priority]}><span aria-hidden="true" className="size-1.5 rounded-full bg-current" />{priorityLabels[taskResult.data.priority]}</Badge></dd>
                  </div>
                  <div>
                    <dt className="text-ui-caption font-medium text-muted-foreground">Due date</dt>
                    <dd className="mt-1 text-ui-small text-foreground">
                      {taskResult.data.dueDate ? dateFormatter.format(taskResult.data.dueDate) : "No due date"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ui-caption font-medium text-muted-foreground">Group</dt>
                    <dd className="mt-1 text-ui-small text-foreground">
                      {taskResult.data.groupId ? taskGroup?.name ?? "Group unavailable" : "Personal"}
                    </dd>
                  </div>
                </dl>
              </section>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
