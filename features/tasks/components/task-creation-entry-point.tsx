"use client";

import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { TaskCreationDialog } from "@/features/tasks/components/task-creation-dialog";

export function TaskCreationEntryPoint() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header onAddTask={() => setOpen(true)} />
      <TaskCreationDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
