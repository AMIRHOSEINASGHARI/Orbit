# Dashboard server actions

This guide explains the seven read actions called by
[`app/(view)/dashboard/page.tsx`](../../../app/(view)/dashboard/page.tsx). The
route starts them with `Promise.all`, so they run concurrently. Each action
returns an `ActionResult`: either `{ success: true, data }` or
`{ success: false, error }`. The route unwraps each result separately and passes
both its data and its error to `DashboardPage`; one failed action therefore
does not blank the other dashboard sections.

All actions are server-only entry points. Each gets the current user from the
session with `getCurrentUser`, connects to MongoDB, scopes database queries to
that user's ObjectId, and returns plain values suitable for rendering. The
action's data queries are inside a `try/catch` and errors go through
`handleActionError`. That helper preserves Next.js control-flow errors and
converts other failures to a generic user-facing message. Session lookup occurs
before that `try/catch`, so an unexpected error while resolving the session can
propagate to the route. Actions do not mutate data.

## `getDashboardAnalytics`

File: `dashboard-analytics.action.ts`  
Collection: `tasks`, with a lookup into `taskgroups`  
Result type: `DashboardAnalytics`

This is the main statistics query. It runs a single aggregation pipeline on
`tasks`, first matching the signed-in user's tasks where `deletedAt` and
`archivedAt` are `null`, then using `$facet` to calculate several independent
views over that same set.

### Date window

The action constructs dates in UTC:

- `today` is the current UTC date at 00:00.
- `tomorrow` is the next UTC date at 00:00 and serves as the exclusive end of
  ranges that include today.
- `weekStart` is six UTC dates before today. The seven-day activity window is
  `[weekStart, tomorrow)`, meaning today plus the previous six calendar dates.
- `weekEnd` is six UTC dates after `tomorrow`. The deadline bucket
  `[tomorrow, weekEnd)` is labeled “next 7 days” in the UI, but currently covers
  only the six calendar dates after today (today + 1 through today + 6).

All date range ends are exclusive. A due date earlier than `today` is overdue;
a due date between `today` and `tomorrow` is due today.

### Facets and calculations

- **Summary** counts all matched tasks and counts `todo`, `in-progress`, and
  `done` statuses. `overdue` counts incomplete tasks with a non-null due date
  earlier than today. `completedThisWeek` counts `done` tasks whose
  `completedAt` is in `[weekStart, tomorrow)`.
- **Trend** finds `done` tasks completed in that same seven-day window, groups
  them by UTC completion date, and counts each date. After aggregation, the
  action constructs all seven dates and fills days without completions with
  zero.
- **Groups** considers tasks with a group ID. It looks up only a group with the
  same ID and owner and with `deletedAt: null`; tasks whose group no longer
  qualifies are omitted. It counts statuses and totals per group, sorts by
  total descending, and returns at most six groups.
- **Priorities** counts `todo` and `in-progress` tasks by priority. Completed
  tasks are excluded.
- **Deadlines** buckets incomplete tasks as overdue, today, next seven days, or
  later. “Later” is also the fallback bucket, so it includes tasks with no due
  date. Completed tasks do not contribute to any deadline bucket.
- **Habits** returns five whole-number percentages. A zero denominator yields
  zero rather than `NaN`:
  - `onTime`: tasks completed in the seven-day window with a due date and
    `completedAt <= dueDate`, divided by all tasks completed in the window that
    have a due date.
  - `highPriority`: high-priority tasks updated during the window and now done,
    divided by all high-priority tasks updated during the window. This uses
    `updatedAt`, not `completedAt`.
  - `checklist`: completed checklist items divided by checklist items on tasks
    updated during the window. Missing checklists count as empty lists.
  - `activeDays`: distinct UTC dates with at least one matched task updated,
    divided by seven.
  - `planned`: tasks due in `[weekStart, tomorrow)` and done, divided by all
    tasks due in that range.

The result supplies zeroed summary values, empty lists, a seven-point trend, and
zero percentages when the aggregation has no matching documents. The client
uses this one result for metric cards, charts, and CSV export.

## `getRecentTasks`

File: `recent-tasks.action.ts`  
Collections: `tasks`, `taskgroups`  
Result type: `RecentTask[]`

Finds active, non-archived tasks belonging to the current user. It selects only
the title, group, priority, status, and due date, sorts by `updatedAt`
descending, and returns at most five. It then fetches names for distinct group
IDs, restricted to groups owned by the same user and not soft-deleted. The
returned records contain string IDs and ISO due-date strings. A personal task
has a null group ID and name; a task whose group cannot be found keeps its group
ID but has a null group name.

## `getUpcomingTasks`

File: `upcoming-tasks.action.ts`  
Collection: `tasks`  
Result type: `RecentTask[]`

Finds the current user's tasks that are not deleted or archived, are not done,
and have a due date greater than or equal to the start of today. It sorts by due
date ascending and returns at most three. There is no upper date limit: a task
due months later can appear if fewer than three earlier eligible tasks exist.
The action derives the start of today using the server's local timezone, unlike
the UTC analytics window.

## `getOverdueTasks`

File: `overdue-tasks.action.ts`  
Collection: `tasks`  
Result type: `OverdueTasks` (`{ total, items }`)

Builds one filter for the current user's tasks that are not deleted, archived,
or done, and have a non-null due date earlier than the start of today. In
parallel, it counts every matching task and fetches the three earliest due
tasks. The `total` is the full count; `items` is only the display sample. Like
the upcoming action, “today” uses the server's local timezone.

## `getRecentNotes`

File: `recent-notes.action.ts`  
Collection: `notes`  
Result type: `RecentNote[]`

Finds notes owned by the current user that are not deleted or archived. It
projects the title, plain text, and update timestamp, sorts newest first, and
returns at most two. The preview is the first 180 characters of `plainText`,
or an empty string when the field is missing. IDs and available timestamps are
converted to strings; missing timestamps are returned as `null`.

## `getNoteStatistics`

File: `note-statistics.action.ts`  
Collection: `notes`  
Result type: `NoteStatistics` (`{ total }`)

Counts notes owned by the current user where `deletedAt` and `archivedAt` are
`null`. It uses the same definition of an active note as `getRecentNotes`, but
returns only the count.

## `getRecentNotifications`

File: `recent-notifications.action.ts`  
Collection: `notifications`  
Result type: `RecentNotification[]`

Finds notifications whose `userId` matches the current user, projects the title,
message, type, creation time, and read state, sorts by `createdAt` descending,
and returns at most four. It does not filter by read state or deletion/archive
fields. IDs and available timestamps are converted to strings; a missing
timestamp becomes `null`.

## Shared behavior and maintenance notes

- Authentication is checked separately by every action, even though the view
  layout also protects the route. Actions should remain safe if called outside
  this page in the future.
- User IDs are converted to MongoDB ObjectIds before querying. Keep owner checks
  in place for every new query and any collection lookup.
- The task and note actions treat `deletedAt: null` and `archivedAt: null` as
  active records. Notifications currently have no such filters; preserve that
  distinction unless notification lifecycle rules change.
- Upcoming/overdue dates use the server's local timezone while analytics uses
  UTC. If consistent day boundaries are needed, update these calculations
  together and consider the user's stored timezone.
- The analytics “next 7 days” deadline range currently spans six dates after
  today. Confirm the intended boundary before changing it, since the result also
  feeds the deadline chart and exported report.
- If a new dashboard value is added, update its action result type, its
  `DashboardPage` prop/wiring, and its consuming section. Keep independent data
  sources independent so a single action error remains isolated.
