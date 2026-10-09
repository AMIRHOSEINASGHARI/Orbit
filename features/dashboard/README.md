# Dashboard logic

The dashboard is a server-rendered summary of the signed-in user's tasks, notes,
and notifications. Its route is `app/(view)/dashboard/page.tsx`; the page layout
is in `features/dashboard/components/DashboardPage.tsx`.

## Request and data flow

1. The view layout checks the session and redirects unauthenticated visitors to
   login before the dashboard route renders.
2. The dashboard route requests seven independent data sets in parallel:
   analytics, note statistics, recent tasks, upcoming tasks, overdue tasks,
   recent notes, and recent notifications.
3. Each server action obtains the current user from the session, connects to
   MongoDB, limits its query to that user's ID, and returns an `ActionResult`.
   Database or action errors are converted through `handleActionError`.
4. The route passes successful results and their errors separately to
   `DashboardPage`. A failure in one data set does not prevent the other
   sections from rendering.

## Sections

- **Analytics** — `getDashboardAnalytics` uses one MongoDB aggregation with
  facets to calculate task totals by status, overdue and completed-this-week
  counts, a seven-day completion trend, workload for up to six groups, open
  task priorities, deadline buckets, and weekly work-pattern percentages.
  Deleted and archived tasks are excluded. The analytics section shows a
  loading placeholder when no result is available, or an error state when the
  request failed. CSV export is available when analytics loaded successfully.
- **Recent tasks** — `getRecentTasks` returns the five most recently updated
  active tasks, along with group names for groups owned by the user.
- **Needs attention** — `getOverdueTasks` returns the overdue count and up to
  three earliest overdue active tasks. `getUpcomingTasks` returns up to three
  active, incomplete tasks due today or later, ordered by due date.
- **Workspace updates** — `getRecentNotes` returns up to two recently updated,
  active notes with a 180-character preview. `getNoteStatistics` supplies the
  total count of active notes. `getRecentNotifications` returns the four most
  recent notifications. Note and activity errors are rendered independently.

The page components in `features/dashboard/components` handle presentation,
empty states, and per-section error messages. Database access and aggregation
logic stays in `features/dashboard/actions`.

## Date handling

Analytics builds its seven-day window and date buckets in UTC. The upcoming and
overdue actions define the start of today using the server's local timezone.
Date boundaries can therefore differ near midnight depending on the server
timezone. Date strings passed to components are ISO strings; displayed dates use
UTC formatting.
