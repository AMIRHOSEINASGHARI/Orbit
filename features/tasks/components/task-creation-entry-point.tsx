"use client";

import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { TaskCreationDialog } from "@/features/tasks/components/task-creation-dialog";

export function TaskCreationEntryPoint({ profile }: {
  profile: { displayName: string; username: string; avatarUrl: string | null };
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header profile={profile} onAddTask={() => setOpen(true)} />
      <TaskCreationDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
