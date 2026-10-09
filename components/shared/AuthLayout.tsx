import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckIcon,
  CompletedWorkIcon,
  TargetIcon,
} from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type PreviewTask = {
  title: string;
  detail: string;
  status: string;
  tone: "info" | "todo" | "success";
  assignee: "Maya" | "JL" | "AK";
  active?: boolean;
  completed?: boolean;
};

const previewTasks: PreviewTask[] = [
  { title: "Finalize Q4 product launch brief", detail: "Product · Due today", status: "In progress", tone: "info", assignee: "Maya", active: true },
  { title: "Review onboarding usability findings", detail: "Research · Due today", status: "Todo", tone: "todo", assignee: "JL" },
  { title: "Prepare weekly growth dashboard", detail: "Growth · Completed", status: "Done", tone: "success", assignee: "Maya", completed: true },
  { title: "Confirm launch owners", detail: "Product · Completed", status: "Done", tone: "success", assignee: "AK", completed: true },
] as const;

function Brand() {
  return (
    <Link href="/" aria-label="Orbit home" className="flex w-fit items-center gap-2.5">
      <span className="flex size-[34px] items-center justify-center rounded-card bg-primary text-primary-foreground">
        <CompletedWorkIcon className="size-[19px]" />
      </span>
      <span className="flex flex-col gap-px">
        <span className="text-ui-title font-bold leading-tight text-foreground">Orbit</span>
        <span className="text-ui-caption font-medium leading-tight text-muted-foreground">WORKSPACE</span>
      </span>
    </Link>
  );
}

function Assignee({ name }: { name: PreviewTask["assignee"] }) {
  if (name === "Maya") {
    return (
      <Avatar className="size-[26px]">
        <AvatarImage src="/figma/maya-chen.png" alt="" />
        <AvatarFallback aria-hidden="true">MC</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <span className={`flex size-[26px] items-center justify-center rounded-full text-[9px] font-semibold ${name === "JL" ? "bg-info text-info-foreground" : "bg-success text-success-foreground"}`}>
      {name}
    </span>
  );
}

function WorkspacePreview() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <div className="flex h-[60px] items-center justify-between border-b border-border px-6">
        <div className="flex items-center gap-2">
          <span className="flex size-[26px] items-center justify-center rounded-md bg-primary-tint text-ui-label font-semibold text-primary">N</span>
          <span className="text-ui-label font-semibold text-foreground">Northstar Studio</span>
        </div>
        <span className="text-ui-caption text-muted-foreground">WORKSPACE PREVIEW</span>
      </div>
      <div className="space-y-5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-ui-title font-bold text-foreground">Today&apos;s priorities</h2>
            <p className="mt-1 text-ui-label text-muted-foreground">Thursday, October 8</p>
          </div>
          <div className="flex -space-x-1.5" aria-label="Team members Maya, JL, and AK">
            <Assignee name="Maya" />
            <Assignee name="JL" />
            <Assignee name="AK" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-ui-label">
            <span className="text-muted-foreground">Daily progress</span>
            <span className="font-semibold text-foreground">2 of 4 complete</span>
          </div>
          <div role="progressbar" aria-label="Daily progress" aria-valuemin={0} aria-valuemax={4} aria-valuenow={2} className="h-1.5 overflow-hidden rounded-full bg-primary-tint">
            <div className="h-full w-1/2 rounded-full bg-primary" />
          </div>
        </div>
        <ul className="space-y-2">
          {previewTasks.map((task) => (
            <li key={task.title} className={`flex min-h-[73px] items-center gap-3 rounded-lg border border-border px-4 ${task.active ? "bg-accent" : "bg-card"}`}>
              <span aria-hidden="true" className={`flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border ${task.completed ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}>
                {task.completed && <CheckIcon className="size-3" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block truncate text-ui-label font-semibold ${task.completed ? "text-muted-foreground" : "text-foreground"}`}>{task.title}</span>
                <span className="mt-1 block text-ui-caption text-muted-foreground">{task.detail}</span>
              </span>
              <span className={`hidden shrink-0 items-center gap-1 rounded-full px-2 py-1 text-ui-caption font-semibold sm:inline-flex ${task.tone === "info" ? "bg-info text-info-foreground" : task.tone === "success" ? "bg-success text-success-foreground" : "bg-status-todo text-status-todo-foreground"}`}>
                <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />{task.status}
              </span>
              <Assignee name={task.assignee} />
            </li>
          ))}
        </ul>
        <div className="flex min-h-[60px] items-center gap-3 rounded-lg bg-primary-tint px-4">
          <span className="flex size-[34px] shrink-0 items-center justify-center rounded-lg bg-card text-primary"><TargetIcon className="size-[17px]" /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-ui-caption font-semibold text-primary">UP NEXT · 25 MIN FOCUS</span>
            <span className="block truncate text-ui-label font-medium text-foreground">Review the launch brief with Maya</span>
          </span>
          <ArrowRightIcon className="size-4 shrink-0 text-primary" />
        </div>
      </div>
    </div>
  );
}

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-card xl:grid xl:grid-cols-[680px_minmax(0,1fr)]">
      <section className="flex min-h-dvh flex-col px-6 pt-8 pb-6 sm:px-14 sm:pt-10 sm:pb-8">
        <Brand />
        <main className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[400px]">{children}</div>
        </main>
        <footer className="flex items-center justify-between text-ui-caption text-muted-foreground">
          <span>© 2026 Orbit</span>
          <nav aria-label="Authentication help" className="flex gap-5">
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/help" className="hover:text-foreground">Help</Link>
          </nav>
        </footer>
      </section>
      <aside aria-label="Orbit workspace preview" className="hidden min-h-dvh flex-col justify-center gap-8 border-l border-border bg-background p-16 xl:flex">
        <div className="space-y-3">
          <p className="text-ui-label font-semibold text-primary">A CLEARER WAY TO WORK</p>
          <h1 className="text-[32px] font-bold leading-tight text-foreground">Pick up where you left off.</h1>
          <p className="max-w-[500px] text-ui-body leading-relaxed text-muted-foreground">Keep priorities clear, bring your team together, and move work forward — one task at a time.</p>
        </div>
        <WorkspacePreview />
        <p className="text-center text-ui-small text-muted-foreground">Your tasks, your team, and your next step. All in one place.</p>
      </aside>
    </div>
  );
}
