import Link from "next/link";
import { ChevronLeftIcon } from "@/components/icons";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { groupColorClass } from "@/features/groups/constants/group-colors";
import type { TaskListPage } from "@/features/tasks/types/task.types";
import type { GroupListItem } from "@/features/groups/types/group.types";
import type { ActionResult } from "@/types";

export function GroupDetailsPage({ result, tasksResult }: { result: ActionResult<GroupListItem>; tasksResult: ActionResult<TaskListPage> }) {
  if (!result.success) return <main className="p-6"><EmptyState title="Group unavailable" description={result.error} action={<Button render={<Link href="/groups" />}><ChevronLeftIcon />Back to groups</Button>} /></main>;
  const group = result.data;
  return (
    <main className="space-y-6 p-5 sm:p-7">
      <PageHeader title={group.name} description={group.description || "Group details and related tasks."} breadcrumbs="WORKSPACE / GROUPS / DETAILS" actions={<Button variant="outline" render={<Link href="/groups" />}><ChevronLeftIcon />All groups</Button>} />
      <Card className="space-y-4 p-5">
        <div className="flex items-center gap-3"><span aria-hidden="true" className={`size-3 rounded-full ${groupColorClass(group.color)}`} /><h2 className="text-lg font-semibold">Group overview</h2></div>
        <div className="grid gap-4 sm:grid-cols-4">
          <p><span className="block text-sm text-muted-foreground">Total tasks</span><strong>{group.taskCount}</strong></p>
          <p><span className="block text-sm text-muted-foreground">To do</span><strong>{group.todoCount}</strong></p>
          <p><span className="block text-sm text-muted-foreground">In progress</span><strong>{group.inProgressCount}</strong></p>
          <p><span className="block text-sm text-muted-foreground">Done</span><strong>{group.doneCount} · {group.completionPercent}%</strong></p>
        </div>
      </Card>
      <section aria-labelledby="group-tasks-title" className="space-y-3">
        <h2 id="group-tasks-title" className="text-lg font-semibold">Tasks</h2>
        {!tasksResult.success ? <p role="alert" className="text-sm text-destructive">{tasksResult.error}</p>
          : tasksResult.data.tasks.length === 0 ? <Card className="p-5 text-sm text-muted-foreground">No tasks in this group yet.</Card>
            : <div className="overflow-x-auto rounded-lg border"><table className="w-full min-w-[520px] text-left text-sm"><thead className="bg-muted/50 text-muted-foreground"><tr><th className="p-3 font-medium">Task</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Priority</th><th className="p-3 font-medium">Due date</th></tr></thead><tbody>{tasksResult.data.tasks.map((task) => <tr key={task.id} className="border-t"><td className="p-3 font-medium">{task.title}</td><td className="p-3">{task.status}</td><td className="p-3">{task.priority}</td><td className="p-3">{task.dueDate ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(task.dueDate)) : "—"}</td></tr>)}</tbody></table></div>}
      </section>
    </main>
  );
}
