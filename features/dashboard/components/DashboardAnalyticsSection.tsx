"use client";

import { Card } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
  CircleCheckIcon,
  ClockAlertIcon,
  LayersIcon,
  TimerIcon,
  TriangleAlertIcon,
} from "@/components/icons";
import type { DashboardAnalytics } from "@/features/dashboard/actions/dashboard-analytics.action";
import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  done: { label: "Done", color: "var(--success-foreground)" },
  inProgress: { label: "In progress", color: "var(--info-foreground)" },
  todo: { label: "Todo", color: "var(--muted-foreground)" },
};
const priorityColors: Record<string, string> = {
  high: "var(--danger-foreground)",
  medium: "var(--warning-foreground)",
  low: "var(--success-foreground)",
};

function Panel({
  title,
  subtitle,
  className,
  children,
  action,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <Card className={`min-w-0 gap-0 p-5 ${className ?? ""}`}>
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-ui-section font-semibold text-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-ui-label text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </header>
      {children}
    </Card>
  );
}

function ProgressRing({
  label,
  value,
  detail,
}: {
  label: string;
  value: number;
  detail: string;
}) {
  const radius = 27;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="relative grid size-[72px] place-items-center"
        aria-label={`${label}: ${value}%`}
      >
        <svg
          viewBox="0 0 64 64"
          className="size-full -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="var(--muted)"
            strokeWidth="4"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - value / 100)}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-base font-bold text-foreground">
          {value}%
        </span>
      </div>
      <p className="text-center text-ui-label font-semibold text-foreground">
        {label}
      </p>
      <p className="text-ui-caption text-muted-foreground">{detail}</p>
    </div>
  );
}

function SummaryMetric({
  title,
  value,
  hint,
  icon,
  side,
}: {
  title: string;
  value: number;
  hint: string;
  icon: ReactNode;
  side?: ReactNode;
}) {
  return (
    <Card className="h-[114px] justify-between p-5 sm:h-[154px]">
      <div className="flex items-center justify-between text-ui-small font-semibold text-muted-foreground">
        <h2>{title}</h2>
        {icon}
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[32px] leading-none font-bold text-foreground">
          {value}
        </p>
        {side}
      </div>
      <p className="text-ui-label text-muted-foreground">{hint}</p>
    </Card>
  );
}

export function DashboardAnalyticsSection({
  data,
}: {
  data: DashboardAnalytics;
}) {
  const total = data.total || 1;
  const dates = data.trend.map((point) => ({
    ...point,
    day: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${point.date}T00:00:00Z`)),
  }));
  const statuses = [
    { name: "Todo", value: data.todo, fill: "var(--muted-foreground)" },
    {
      name: "In progress",
      value: data.inProgress,
      fill: "var(--info-foreground)",
    },
    { name: "Done", value: data.done, fill: "var(--success-foreground)" },
  ];
  const deadlines = [
    {
      name: "Overdue",
      value: data.deadlines.overdue,
      color: "var(--danger-foreground)",
    },
    {
      name: "Due today",
      value: data.deadlines.today,
      color: "var(--warning-foreground)",
    },
    {
      name: "Due in the next 7 days",
      value: data.deadlines.next7Days,
      color: "var(--info-foreground)",
    },
    {
      name: "Later or no due date",
      value: data.deadlines.later,
      color: "var(--muted-foreground)",
    },
  ];
  const groups = data.groups;
  const topGroups = groups.slice(0, 3);

  return (
    <>
      <section
        aria-label="Summary metrics"
        className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        <SummaryMetric
          title="Total tasks"
          value={data.total}
          hint="Current workload"
          icon={<LayersIcon className="size-4 text-muted-foreground" />}
          side={
            <div className="w-[94px]">
              <div className="flex h-1.5 overflow-hidden rounded-full">
                <span
                  className="bg-muted-foreground"
                  style={{ width: `${(data.todo / total) * 100}%` }}
                />
                <span
                  className="bg-info-foreground"
                  style={{ width: `${(data.inProgress / total) * 100}%` }}
                />
                <span
                  className="bg-success-foreground"
                  style={{ width: `${(data.done / total) * 100}%` }}
                />
              </div>
              <p className="mt-1 text-right text-ui-caption text-muted-foreground">
                {data.todo} / {data.inProgress} / {data.done}
              </p>
            </div>
          }
        />
        <SummaryMetric
          title="Completed this week"
          value={data.completedThisWeek}
          hint="Tasks completed in the last 7 days"
          icon={<CircleCheckIcon className="size-4 text-success-foreground" />}
          side={
            <span className="text-ui-caption text-success-foreground">
              7 days
            </span>
          }
        />
        <SummaryMetric
          title="In progress"
          value={data.inProgress}
          hint={`${Math.round((data.inProgress / total) * 100)}% of current tasks`}
          icon={<TimerIcon className="size-4 text-info-foreground" />}
          side={
            <div className="h-1.5 w-[70px] overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-info-foreground"
                style={{ width: `${(data.inProgress / total) * 100}%` }}
              />
            </div>
          }
        />
        <SummaryMetric
          title="Overdue"
          value={data.overdue}
          hint="Needs your attention"
          icon={<TriangleAlertIcon className="size-4 text-danger-foreground" />}
          side={
            <span className="grid size-8 place-items-center rounded-lg bg-danger text-danger-foreground">
              <ClockAlertIcon className="size-4" />
            </span>
          }
        />
      </section>

      <section
        aria-label="Completion insights"
        className="grid gap-5 xl:grid-cols-[2fr_1fr]"
      >
        <Panel
          title="Completion trend"
          subtitle={`${data.completedThisWeek} completed this week`}
          className="min-h-[380px]"
          action={
            <span className="text-ui-label text-muted-foreground">
              Last 7 days
            </span>
          }
        >
          <ChartContainer
            config={chartConfig}
            className="h-[270px] w-full aspect-auto"
            aria-label="Tasks completed each day over the last seven days"
          >
            <LineChart
              accessibilityLayer
              data={dates}
              margin={{ top: 8, right: 10, left: -22, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                name="Tasks completed"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{ r: 2, fill: "var(--primary)" }}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ChartContainer>
          <div className="mt-2 flex items-center gap-2 text-ui-caption text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Tasks completed{" "}
            <span className="ml-auto">Daily counts · Last 7 days</span>
          </div>
        </Panel>
        <Panel
          title="Progress at a glance"
          subtitle="Current workload"
          className="min-h-[380px]"
        >
          <div className="grid grid-cols-2 gap-y-6 pt-2">
            <ProgressRing
              label="Overall completion"
              value={Math.round((data.done / total) * 100)}
              detail={`${data.done} / ${data.total} tasks`}
            />
            {topGroups.map((group) => (
              <ProgressRing
                key={group.name}
                label={group.name}
                value={Math.round((group.done / (group.total || 1)) * 100)}
                detail={`${group.done} / ${group.total} tasks`}
              />
            ))}
            {topGroups.length === 0 && (
              <p className="col-span-2 py-8 text-center text-ui-small text-muted-foreground">
                Group progress appears when tasks are assigned to groups.
              </p>
            )}
          </div>
        </Panel>
      </section>

      <section
        aria-label="Group and weekly insights"
        className="grid gap-5 xl:grid-cols-[1.42fr_1fr]"
      >
        <Panel
          title="Workload by group"
          subtitle="Current workload"
          className="min-h-[488px]"
          action={
            <a
              href="/groups"
              className="text-ui-small font-semibold text-primary hover:underline"
            >
              View groups →
            </a>
          }
        >
          {groups.length ? (
            <ChartContainer
              config={chartConfig}
              className="h-[350px] w-full aspect-auto"
              aria-label="Task status counts by group"
            >
              <BarChart
                accessibilityLayer
                data={groups}
                layout="vertical"
                margin={{ left: 4, right: 8, top: 8, bottom: 0 }}
              >
                <CartesianGrid horizontal={false} stroke="var(--border)" />
                <XAxis
                  type="number"
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={80}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: "var(--foreground)" }}
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="todo"
                  name="Todo"
                  stackId="a"
                  fill="var(--muted-foreground)"
                />
                <Bar
                  dataKey="inProgress"
                  name="In progress"
                  stackId="a"
                  fill="var(--info-foreground)"
                />
                <Bar
                  dataKey="done"
                  name="Done"
                  stackId="a"
                  fill="var(--success-foreground)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="grid h-[350px] place-items-center text-ui-small text-muted-foreground">
              No grouped tasks yet.
            </div>
          )}
          <p className="mt-2 text-ui-caption text-muted-foreground">
            {data.total} tasks across {groups.length} groups{" "}
            <span className="float-right">
              {data.todo} Todo · {data.inProgress} In progress · {data.done}{" "}
              Done
            </span>
          </p>
        </Panel>
        <Panel
          title="Weekly work pattern"
          subtitle="Last 7 days · Based on task activity"
          className="min-h-[488px]"
        >
          <ChartContainer
            config={chartConfig}
            className="h-[290px] w-full aspect-auto"
            aria-label="Work pattern completion measurements"
          >
            <RadarChart
              accessibilityLayer
              data={[
                { habit: "On-time completion", value: data.habits.onTime },
                {
                  habit: "High-priority completion",
                  value: data.habits.highPriority,
                },
                { habit: "Checklist completion", value: data.habits.checklist },
                { habit: "Active days", value: data.habits.activeDays },
                { habit: "Planned work", value: data.habits.planned },
              ]}
              outerRadius="65%"
            >
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis
                dataKey="habit"
                tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
              />
              <Radar
                dataKey="value"
                name="Completion"
                stroke="var(--primary)"
                fill="var(--primary)"
                fillOpacity={0.15}
              />
            </RadarChart>
          </ChartContainer>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-ui-caption text-muted-foreground sm:grid-cols-3">
            {[
              ["On-time completion", data.habits.onTime],
              ["High-priority completion", data.habits.highPriority],
              ["Checklist completion", data.habits.checklist],
              ["Active-day consistency", data.habits.activeDays],
              ["Planned-work completion", data.habits.planned],
            ].map(([label, value]) => (
              <p key={String(label)} className="truncate">
                {label}{" "}
                <span className="float-right text-primary">{value}%</span>
              </p>
            ))}
          </div>
          <p className="mt-3 rounded-lg border border-border bg-muted/40 p-2.5 text-ui-caption text-muted-foreground">
            Each axis measures a different work habit; these values are not
            combined into a single score.
          </p>
        </Panel>
      </section>

      <section
        aria-label="Current workload distributions"
        className="grid gap-5 lg:grid-cols-3"
      >
        <Panel
          title="Task status"
          subtitle="Current workload"
          className="min-h-[310px]"
        >
          <div className="flex min-h-[185px] items-center gap-4">
            <div
              className="relative size-[142px] shrink-0"
              aria-label={`${data.total} tasks: ${data.todo} Todo, ${data.inProgress} in progress, ${data.done} done`}
            >
              <ChartContainer
                config={chartConfig}
                className="size-full aspect-auto"
              >
                <PieChart accessibilityLayer>
                  <Pie
                    data={statuses}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={48}
                    outerRadius={67}
                    strokeWidth={0}
                  >
                    {statuses.map((status) => (
                      <Cell key={status.name} fill={status.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ChartContainer>
              <span className="pointer-events-none absolute inset-0 grid place-content-center text-center text-[20px] font-bold text-foreground">
                {data.total}
                <small className="block text-ui-caption font-normal text-muted-foreground">
                  tasks
                </small>
              </span>
            </div>
            <ul className="min-w-0 flex-1 space-y-3">
              {statuses.map((status) => (
                <li key={status.name} className="text-ui-caption">
                  <span
                    className="inline-block size-1.5 rounded-full"
                    style={{ backgroundColor: status.fill }}
                  />{" "}
                  <span className="ml-1 text-muted-foreground">
                    {status.name}
                  </span>
                  <p className="mt-0.5 font-semibold text-foreground">
                    {status.value} tasks{" "}
                    <span className="float-right font-normal text-muted-foreground">
                      {Math.round((status.value / total) * 100)}%
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-ui-caption text-muted-foreground">
            {data.done} of {data.total} tasks completed
          </p>
        </Panel>
        <Panel
          title="Open tasks by priority"
          subtitle={`Current workload · ${data.todo + data.inProgress} incomplete tasks`}
          className="min-h-[310px]"
        >
          <ChartContainer
            config={chartConfig}
            className="h-[210px] w-full aspect-auto"
            aria-label="Open tasks grouped by priority"
          >
            <BarChart
              accessibilityLayer
              data={["high", "medium", "low"].map((priority) => ({
                priority,
                count:
                  data.priorities.find((item) => item.priority === priority)
                    ?.count ?? 0,
              }))}
              margin={{ top: 12, right: 5, left: -22, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="priority"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                tickFormatter={(value) =>
                  value[0].toUpperCase() + value.slice(1)
                }
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
              />
              <Tooltip />
              <Bar dataKey="count" name="Tasks" radius={[4, 4, 0, 0]}>
                {["high", "medium", "low"].map((priority) => (
                  <Cell key={priority} fill={priorityColors[priority]} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </Panel>
        <Panel
          title="Deadline health"
          subtitle={`Current workload · ${data.todo + data.inProgress} incomplete tasks`}
          className="min-h-[310px]"
          action={
            <a
              href="/calendar"
              className="text-ui-small font-semibold text-primary hover:underline"
            >
              View calendar →
            </a>
          }
        >
          <div
            className="mt-2 flex h-3 overflow-hidden rounded-full bg-muted"
            aria-label="Deadline distribution"
          >
            {deadlines.map((item) => (
              <span
                key={item.name}
                style={{
                  backgroundColor: item.color,
                  flexGrow: item.value,
                  flexBasis: 0,
                }}
              />
            ))}
          </div>
          <ul className="mt-4 space-y-3">
            {deadlines.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-2 text-ui-label"
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="min-w-0 flex-1 text-muted-foreground">
                  {item.name}
                </span>
                <span className="font-semibold text-foreground">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </section>
    </>
  );
}
