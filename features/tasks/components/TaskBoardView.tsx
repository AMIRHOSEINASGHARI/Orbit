"use client";

import type { ReactNode } from "react";

export function TaskBoardView({ children }: { children: ReactNode }) {
  return (
    <div
      role="region"
      aria-label="Task board"
      className="overflow-x-auto pb-2"
    >
      <div className="grid min-w-[980px] grid-cols-3 gap-[14px] lg:min-w-0">
        {children}
      </div>
    </div>
  );
}
