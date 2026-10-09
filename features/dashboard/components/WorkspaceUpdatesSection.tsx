import Link from "next/link";
import { ArrowRightIcon, ArrowRightLeftIcon, BellIcon, CheckIcon, NotebookTabsIcon } from "@/components/icons";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Card } from "@/components/ui/card";
import type { RecentNote } from "@/features/dashboard/actions/recent-notes.action";
import type { RecentNotification } from "@/features/dashboard/actions/recent-notifications.action";

function relativeTime(value: string | null) {
  if (!value) return "";
  const elapsed = Math.max(0, Date.now() - new Date(value).getTime());
  const minutes = Math.max(1, Math.floor(elapsed / 60_000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function WorkspaceUpdatesSection({ notes, notifications, noteCount, noteError, notificationError }: {
  notes: RecentNote[] | null;
  notifications: RecentNotification[] | null;
  noteCount: number | null;
  noteError?: string;
  notificationError?: string;
}) {
  return (
    <section aria-label="Workspace updates" className="grid gap-5 xl:grid-cols-2">
      <Card className="min-h-[264px] p-5">
        <header className="flex items-start justify-between gap-3">
          <div><h2 className="text-ui-section font-semibold text-foreground">Recent notes</h2><p className="mt-1 text-ui-label text-muted-foreground">{noteCount ?? "—"} notes</p></div>
          <Link href="/notes" className="inline-flex shrink-0 items-center gap-1 text-ui-small font-semibold text-primary hover:underline">View all notes <ArrowRightIcon aria-hidden="true" className="size-3.5" /></Link>
        </header>
        {noteError ? <ErrorState title="Recent notes are unavailable" description={noteError} /> : notes?.length ? (
          <ul className="mt-2 divide-y divide-border">
            {notes.map((note) => <li key={note.id} className="flex gap-3 py-3">
              <span className="grid size-[34px] shrink-0 place-items-center rounded-lg bg-primary-tint text-primary"><NotebookTabsIcon aria-hidden="true" className="size-4" /></span>
              <div className="min-w-0"><p className="truncate text-ui-small font-semibold text-foreground">{note.title}</p><p className="mt-1 truncate text-ui-label text-muted-foreground">{note.preview || "No preview available"}</p>{note.updatedAt && <p className="mt-1 text-ui-caption text-subtle-foreground">Updated {relativeTime(note.updatedAt)}</p>}</div>
            </li>)}
          </ul>
        ) : <EmptyState title="No notes yet" description="Recently updated notes will appear here." />}
      </Card>
      <Card className="min-h-[264px] p-5">
        <header className="flex items-center justify-between gap-3">
          <h2 className="text-ui-section font-semibold text-foreground">Recent activity</h2>
          <Link href="/notifications" className="inline-flex shrink-0 items-center gap-1 text-ui-small font-semibold text-primary hover:underline">View activity <ArrowRightIcon aria-hidden="true" className="size-3.5" /></Link>
        </header>
        {notificationError ? <ErrorState title="Recent activity is unavailable" description={notificationError} /> : notifications?.length ? (
          <ul className="mt-2 divide-y divide-border">
            {notifications.map((notification) => {
              const ActivityIcon = notification.type.startsWith("note.") ? NotebookTabsIcon : notification.type === "task.status-changed" ? CheckIcon : notification.type.startsWith("task.") ? ArrowRightLeftIcon : BellIcon;
              return <li key={notification.id} className="flex min-h-[47px] items-center gap-2.5 py-2">
              <span className={`grid size-7 shrink-0 place-items-center rounded-full ${notification.isRead ? "bg-muted text-muted-foreground" : "bg-info text-info-foreground"}`}><ActivityIcon aria-hidden="true" className="size-3.5" /></span>
              <p className="min-w-0 flex-1 truncate text-ui-small text-foreground">{notification.title}</p>{notification.createdAt && <time dateTime={notification.createdAt} className="shrink-0 text-ui-caption text-muted-foreground">{relativeTime(notification.createdAt)}</time>}
            </li>;
            })}
          </ul>
        ) : <EmptyState title="No recent activity" description="Notifications will appear here when something changes." />}
      </Card>
    </section>
  );
}
