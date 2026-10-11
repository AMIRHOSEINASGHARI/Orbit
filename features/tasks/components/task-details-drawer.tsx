"use client";

import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "@/features/tasks/actions/get-task-by-id.action";
import { taskKeys } from "@/features/tasks/queries/task-keys";
import { Button } from "@/components/ui/button";
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

export function TaskDetailsDrawer({
  userId,
  taskId,
  open,
  onOpenChange,
}: {
  userId: string;
  taskId: string | null;
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
            <div className="rounded-[10px] border border-border bg-muted/30 p-4 text-ui-small text-muted-foreground">
              Task information will appear here.
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
