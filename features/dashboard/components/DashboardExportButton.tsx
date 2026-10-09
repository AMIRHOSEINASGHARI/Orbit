"use client";

import { DownloadIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import type { DashboardAnalytics } from "@/features/dashboard/actions/dashboard-analytics.action";

export function DashboardExportButton({ data }: { data: DashboardAnalytics }) {
  function downloadReport() {
    const rows: (string | number)[][] = [
      ["Dashboard report", "Value"],
      ["Total tasks", data.total], ["Todo", data.todo], ["In progress", data.inProgress], ["Done", data.done], ["Overdue", data.overdue], ["Completed in the last 7 days", data.completedThisWeek],
      [], ["Completion trend", "Tasks completed"], ...data.trend.map((item) => [item.date, item.count]),
      [], ["Workload by group", "Todo", "In progress", "Done", "Total"], ...data.groups.map((group) => [group.name, group.todo, group.inProgress, group.done, group.total]),
      [], ["Open tasks by priority", "Count"], ...data.priorities.map((item) => [item.priority, item.count]),
      [], ["Deadline health", "Count"], ["Overdue", data.deadlines.overdue], ["Due today", data.deadlines.today], ["Due in the next 7 days", data.deadlines.next7Days], ["Later or no due date", data.deadlines.later],
    ];
    const csv = rows.map((row) => row.map((value) => {
      const safe = String(value).replace(/^(\s*[=+\-@])/, "'$1");
      return `"${safe.replaceAll('"', '""')}"`;
    }).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "orbit-dashboard-report.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <Button size="lg" variant="outline" className="h-[38px] px-3" onClick={downloadReport}><DownloadIcon aria-hidden="true" className="size-4" />Export report</Button>;
}
