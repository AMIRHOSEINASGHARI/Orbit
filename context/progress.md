# done — Completed Work Log

Append-only. One entry per finished task, newest at the top. Format:

## YYYY-MM-DD — T# Task number
- What shipped (1-3 bullets)
- Deviations from the spec, if any, and where the docs were updated

## 2026-10-11 — T-127 Add filtering by due date
- Verified the calendar selector supplies an ISO date and the server query matches tasks whose due date falls within that UTC day.
- Deviations: The date control and server filtering were already implemented.

## 2026-10-11 — T-126 Add filtering by group
- Verified the group selector supports Personal and available groups; server filtering scopes the selected group to its matching task records.
- Deviations: The group control and server filtering were already implemented.

## 2026-10-11 — T-125 Add filtering by priority
- Verified the accessible priority selector updates the query filters and the server validates and applies the selected priority.
- Deviations: The priority control and server filtering were already implemented.

## 2026-10-11 — T-124 Add filtering by status
- Verified the accessible status selector is connected to the status query filter, which is validated server-side and applied to the task query.
- Deviations: The status control and server filtering were already implemented.

## 2026-10-11 — T-118 Follow-up: Add a clear search button
- Added an accessible clear button to the search input; clearing uses the existing query flow to refresh results and remove the URL parameter.
- Deviations: None recorded.

## 2026-10-11 — T-122 Follow-up: Fetch results for changed search queries
- Restricted server-provided initial task data to the filter set it represents, allowing new search/filter query keys to fetch their own results.
- Deviations: None recorded.

## 2026-10-11 — T-122 Synchronize Task search with URL search parameters
- Restored search from the URL on initial load and browser navigation, and wrote debounced searches to browser history while preserving other parameters.
- Deviations: None recorded.

## 2026-10-11 — T-121 Add server-side Task search
- Confirmed `getTasks` validates and trims search input, and `listTasks` applies escaped, case-insensitive matching to title and description.
- Deviations: Server-side search already existed, so no runtime code change was needed.

## 2026-10-11 — T-120 Add `use-debounce` to Task search
- Added `use-debounce` and delayed search filter updates by 300 ms while keeping the input responsive and other filters immediate.
- Deviations: None recorded.

## 2026-10-11 — T-119 Add search query state
- Added explicit query state in TasksPage and connected it to the task search input and current result filters.
- Deviations: None recorded.

## 2026-10-11 — T-118 Create the Task search input
- Extracted the existing accessible search control into a reusable task search input without changing its appearance or filtering behavior.
- Deviations: None recorded.

## 2026-10-11 — T-112 Create the `trashTask` Server Action
- Added validated, authenticated soft deletion scoped to the current owner and active task, with safe results and route revalidation. Verified with TypeScript.
- Deviations: None recorded.


## 2026-10-11 — T-113 Add Move to Trash action to Task Card
- Enabled the task table row’s Move to Trash control with accessible labeling, pending indication, error feedback, and refresh after success. Verified with TypeScript.
- Deviations: None recorded.


## 2026-10-11 — T-114 Add task trash confirmation dialog
- Added an accessible confirmation naming the selected task, explaining it can be restored, and keeping the dialog open with retry feedback when the mutation fails. Verified with TypeScript.
- Deviations: None recorded.


## 2026-10-11 — T-115 Exclude trashed tasks from normal Task queries
- Confirmed normal task lists/details and dashboard queries exclude trashed records by default, while the authorized task list retains explicit `includeDeleted` support for recovery. Audited all task model query call sites.
- Deviations: None recorded.


## 2026-10-11 — T-116 Create the `restoreTask` Server Action
- Added validated, authenticated restoration scoped to the current owner’s trashed task, with safe results and route revalidation. Verified with TypeScript.
- Deviations: None recorded.


## 2026-10-11 — T-117 Create the `permanentlyDeleteTask` Server Action
- Added validated, authenticated permanent deletion scoped to the current owner’s trashed task only, with safe results and route revalidation. Verified with TypeScript.
- Deviations: None recorded.


## 2026-10-11 — T-118 Inline task priority editing
- Added Figma-aligned Low, Medium, and High selection in the task table, with owner-scoped persistence, pending/success/error feedback, stable row order, and synchronized task caches. Verified with TypeScript.
- Deviations: None recorded.


## 2026-10-11 — T-107 Create the `changeTaskStatus` Server Action
- Added strict task ID/status validation and authenticated, owner-scoped status updates for non-deleted tasks, with safe results and route revalidation.
- Deviations: None recorded.


## 2026-10-11 — T-108 Add Todo status action
- Added the To do choice to the task row’s inline status selector.
- Deviations: None recorded.


## 2026-10-11 — T-109 Add In Progress status action
- Added the In progress choice to the task row’s inline status selector.
- Deviations: None recorded.


## 2026-10-11 — T-110 Add Done status action
- Added the Done choice to the task row’s inline status selector.
- Deviations: None recorded.


## 2026-10-11 — T-111 Update task status without opening the task edit dialog
- Connected the Figma-style status pill and chevron directly to the status action, with pending indication, success/error toasts, and task query refresh.
- Deviations: None recorded.


## 2026-10-11 — T-106 Add task update error feedback
- Displays server validation and global errors in the dialog and reports request failures with an error toast.
- Deviations: None recorded.


## 2026-10-11 — T-105 Add task update success feedback
- Shows the server success message and closes/resets the dialog after saving.
- Deviations: None recorded.

## 2026-10-11 — T-104 Connect the shared task dialog to the update action
- Submits edits through the authenticated update action, disables submission while pending, and refreshes task queries after a successful update.
- Deviations: None recorded.

## 2026-10-11 — T-103 Load selected task data into the shared dialog
- Prefilled the dialog with the selected task’s title, description, status, priority, group, and due date.
- Deviations: None recorded.

## 2026-10-11 — T-102 Open the shared task dialog in edit mode
- Connected the task table Edit action to the existing task dialog and removed the planned standalone `/edit` page from the architecture and task plan.
- Deviations: None recorded.

## 2026-10-11 — T-101 Create the `updateTask` Server Action
- Added authenticated, validated updates with owner and group checks, a shared action result, and route revalidation. Verified with TypeScript.
- Deviations: None recorded.


## 2026-10-11 — T-100 Display task group information
- Added the selected task’s group marker and name using the authenticated group options, with a neutral Personal state and an unavailable-group fallback. Verified with TypeScript.
- Deviations: None recorded.


## 2026-10-11 — T-99 Display task due date
- Refined the drawer due-date value to match the Figma calendar-clock treatment, format dates consistently, and clearly label tasks without a due date. The shared loading skeleton also covers this field. Verified with TypeScript.
- Deviations: None recorded.


## 2026-10-11 — T-98 Display task priority
- Added the persisted priority to drawer metadata using the shared priority badge variants and title-cased labels. Verified with TypeScript.
- Deviations: None recorded.


## 2026-10-11 — T-97 Display task status
- Added the persisted task status to drawer metadata with the shared status badge treatment, a visual indicator, and readable labels for assistive technology. Verified with TypeScript.
- Deviations: None recorded.


## 2026-10-11 — T-96 Display basic task information
- Added the selected task description, due date, and group to the drawer using the authorized task response and current user’s group options, with readable fallbacks for missing values. Verified with TypeScript.
- Deviations: None recorded.


## 2026-10-11 — T-95 Create the Task Details drawer
- Added the responsive shared Drawer to the task table’s View action. It fetches the selected task through T-94’s authorized action with a query keyed by user and task, and provides loading, retryable error, not-found, and accessible close states. Verified with TypeScript.
- Deviations: None recorded.


## 2026-10-11 — T-94 Create the `getTaskById` Server Action
- Added an authenticated task read action that validates the task ID, loads only a non-deleted task owned by the current user, returns a typed task result, and uses safe errors for invalid, missing, and failed reads. Verified with TypeScript.
- Deviations: None recorded.


## 2026-10-11 — T-93 Display tasks in the Figma table view
- Expanded the shared, owner-authorized task list with the designed task, created, priority, group, due date, status, assignees, and action columns; added accessible page selection, selected-row styling, and client-side pagination. Optional group and due-date values have safe fallbacks, and the shared table keeps horizontal scrolling on narrow screens. View opens the details drawer; edit opens the shared task dialog; delete remains disabled until its flow is implemented.
- Deviations: None recorded.


## 2026-10-09 — T-92 Build the Tasks search and filter toolbar
- Added the Figma toolbar with live search, combined status/priority/group/due-date filters, last-updated sorting, status presets, and a clear control. Extended the authenticated task query with strict validation and owner-scoped filtering. Verified with TypeScript.
- Deviations: None recorded.


## 2026-10-09 — T-91 Build the Tasks page header and view switcher
- Added the Figma-aligned page header options with a keyboard-operable, accessible selected state for Table View and Drag & Drop View. Verified with TypeScript.
- Deviations: None recorded.


## 2026-10-09 — T-90 Create the Tasks page structure
- Added the authenticated `/tasks` route backed by `getTasks`, shared page header, route loading skeleton, accessible empty/error states, and a Figma-guided table for available task fields. Verified with TypeScript.
- Deviations: None recorded.


## 2026-10-09 — T-89 Create the `getTasks` Server Action
- Added authenticated, strictly validated task filters and used the owner-scoped task service; returns typed records with string IDs and omits the owner ID from client data. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-88 Add task creation error feedback
- Added safe form-level and field-level validation/action errors with accessible announcements.
- Deviations: None recorded.

## 2026-10-09 — T-87 Add task creation success feedback
- Added a success toast after the task is saved and mounted the shared Toaster at the application root.
- Deviations: None recorded.

## 2026-10-09 — T-86 Add task creation loading state
- Disabled submit while groups load or the create action is pending and announced progress with a spinner label.
- Deviations: None recorded.

## 2026-10-09 — T-85 Connect the Task form to the `createTask` Server Action
- Submitted validated form values through the authenticated action; it verifies group ownership, creates through the Task service, and revalidates task routes.
- Deviations: None recorded.

## 2026-10-09 — T-84 Connect Zod validation to the Task form
- Applied the shared create-task schema to client form input and server action payloads.
- Deviations: None recorded.

## 2026-10-09 — T-83 Connect React Hook Form to the Task form
- Added controlled status, priority, group, and date values, field state, submit handling, and the create shortcut.
- Deviations: None recorded.

## 2026-10-09 — T-82 Add task group selector
- Added an owner-scoped group picker with a Personal choice for users who do not assign a group.
- Deviations: None recorded.

## 2026-10-09 — T-81 Add task due date selector
- Added the shared Gregorian calendar picker and optional due-date display.
- Deviations: None recorded.

## 2026-10-09 — T-80 Add task priority selector
- Added the Figma priority options with the shared semantic badge colors.
- Deviations: None recorded.

## 2026-10-09 — T-79 Add task status selector
- Added Todo, In Progress, and Done options with their shared status badge colors.
- Deviations: None recorded.

## 2026-10-09 — T-78 Add task description field
- Added the optional description area and character count, aligned to the Task schema limit.
- Deviations: None recorded.

## 2026-10-09 — T-77 Add task title field
- Added the required title field, character limit, and field-level feedback.
- Deviations: None recorded.

## 2026-10-09 — T-76 Create the Task form component
- Built the responsive, scrollable task dialog from Figma node `12:674`, using the shared dialog, form, and token-based controls; connected the header trigger.
- Deviations: None recorded.

## 2026-10-09 — T-75 Create the `createTask` Server Action
- Added authenticated, schema-validated task creation with owner-scoped group checks, safe errors, persistence through the Task service, and path revalidation.
- Deviations: None recorded.

## 2026-10-09 — T-74 Create the Task service foundation
- Added user-scoped task list and detail queries, with soft-deleted tasks excluded by default.
- Deviations: None recorded.

## 2026-10-09 — T-73 Create Task query keys
- Added user-scoped React Query keys for task lists, filters, and detail records.
- Deviations: None recorded.

## 2026-10-09 — T-72 Create Task Zod schemas
- Added Task persistence and creation schemas with validated IDs, status, priority, due date, and lifecycle fields.
- Deviations: None recorded.

## 2026-10-09 — T-71 Create Task TypeScript types
- Added shared task status, priority, record, list-filter, and DTO types; reused the shared status and priority types in Dashboard data.
- Deviations: None recorded.

## 2026-10-09 — T-70 Add task soft-delete fields
- Added nullable `deletedAt` and `archivedAt` lifecycle fields with indexes and service filters that exclude them by default.
- Deviations: None recorded.

## 2026-10-09 — T-69 Add task due date fields
- Added nullable `dueDate` to the Task model and validation contract with an index for due-date queries.
- Deviations: None recorded.

## 2026-10-09 — T-68 Add task priority fields
- Added the `low`, `medium`, and `high` priority values and a `medium` default to the model and Zod contract.
- Deviations: None recorded.

## 2026-10-09 — T-67 Add Todo, In Progress, and Done task statuses
- Added the `todo`, `in-progress`, and `done` status values and `todo` default, and shared the union with Dashboard task data.
- Deviations: None recorded.

## 2026-10-09 — T-66 Create the Task Mongoose model
- Added the server-only Task model in the existing `tasks` collection with owner/group references, timestamps, lifecycle fields, and query indexes.
- Deviations: None recorded.

## 2026-10-09 — T-63 Create the Note statistics Server Action and Dashboard card
- Added an authenticated count of the current user's active, unarchived notes and displayed it beside Groups using the shared Dashboard metric card. Generalized the task metric card for reuse. The Note model is scheduled later, so the action uses the documented collection directly for now. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-62 Create the Group statistics Server Action and Dashboard card
- Added an authenticated count scoped to the current user and excluded deleted groups; displayed the result in a shared-token Dashboard card with error feedback. The Group model is scheduled later, so this reads the documented group collection directly for now. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-61 Create the overdue tasks section
- Added a user-scoped overdue task query with a count and three-item limit, plus a token-based attention panel with task links and empty/error feedback. Integrated it with Dashboard. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-60 Create the upcoming tasks section
- Added a user-scoped query for the next three non-completed tasks due from today onward and a responsive section with due-date labels and empty/error states. Connected it to the Dashboard. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-59 Create the recent tasks section
- Added an authenticated recent-task query and a responsive, accessible task table with status/priority badges, empty feedback, and safe errors; connected it to the dashboard route. The query follows the documented Task fields pending the later model task. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-58 Connect task statistics to the Dashboard
- Loaded the authenticated statistics action in the dashboard route, populated all four task counts, and added route loading and safe error feedback through shared state components. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-57 Create the task statistics Server Action
- Added an authenticated Server Action that aggregates active personal task counts by status and overdue state, scoped by the signed-in user ID and returning the shared result type. The Task Mongoose model is scheduled after T-65, so the action currently queries the schema-defined Mongo collection directly. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-56 Create the Done tasks statistics card
- Added the completed-task count card to the dashboard metrics row using the shared completion icon and card styles. Values will be wired in T-58. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-55 Create the In Progress tasks statistics card
- Added the In Progress count card with a shared timer icon and status-appropriate description; live values are connected in T-58. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-54 Create the Todo tasks statistics card
- Added the Todo summary card to the responsive dashboard metrics row with the shared status icon and neutral unavailable value until T-58 connects live counts. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-53 Create the total tasks statistics card
- Added a token-based summary card for the total task count, using the Figma card size, icon placement, and workload caption. It displays a neutral placeholder until the statistics action is connected in T-58. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-52 Create the Dashboard page structure
- Added the protected `/dashboard` route and responsive semantic regions matching the approved Dashboard frame; the root route now forwards to the dashboard. Verified with TypeScript.
- Deviations: None recorded.


## 2026-10-09 — T-51 Handle expired and invalid sessions
- Distinguished expired JWTs from other invalid tokens, rejected both at the protected-route boundary, and displayed a generic sign-in-again notice without exposing token details. Successful login replaces the stale cookie. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-50 Keep authenticated users out of auth pages
- Applied the same verified current-user check to the public auth route group; valid sessions redirect to the app, while missing, invalid, or deleted-user sessions can access login/register. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-49 Protect authenticated application routes
- Strengthened the authenticated route-group guard to verify the signed token and load an existing user record before rendering protected pages; invalid and deleted-user sessions redirect to login. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-48 Add Logout functionality to the application UI
- Replaced the inert header logout control with the shared Form component wired to the logout Server Action and an accessible pending label. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-47 Create the Logout Server Action
- Added a Server Action that clears the HTTP-only session cookie and redirects to login. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-46 Connect the Login form to the Login Server Action
- Connected RHF-validated login input to the Server Action through `useActionState`, with pending state and generic server errors. Successful login sets the session cookie and redirects to the authenticated home. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-45 Create the Login form UI
- Implemented the Figma login frame with username/password fields, password visibility control, forgot-password and registration links, field-level errors, and pending feedback. Uses React Hook Form, Zod, and shared shadcn Form/Field components. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-44 Create the Login Server Action
- Added a form-compatible Server Action that validates credentials, fetches the hidden password hash only for verification, returns a generic invalid-credentials error, sets the signed 180-day HTTP-only cookie, and redirects after login. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-43 Connect the Register form to the Register Server Action
- Connected the React Hook Form submit handler to the typed Server Action through `useActionState`, showing server field errors and pending/success feedback and clearing credentials after successful registration. Updated the app-wide rule to follow shadcn’s RHF/Zod guidance and use shared Form/Field primitives. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-42 Create the Register form UI
- Implemented the Figma registration frame with username/email/password fields, password visibility controls, field-level feedback, pending/success/error states, terms links, and sign-in navigation. Uses React Hook Form, the Zod resolver, and shared Form/Input/Label/Button components. Documented this as the required form pattern across the app. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-41 Create the Register Server Action
- Added a form-compatible Server Action that validates registration input, hashes passwords, persists normalized account data, returns the shared result shape, and reports duplicate accounts without exposing database details. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-40 Create the `getCurrentUser` authentication helper
- Added a server-only helper that verifies the session token, loads only safe user profile fields, and returns a serializable user ID. Deleted or invalid accounts return `null`. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-39 Create secure HTTP-only authentication cookie utilities with a 180-day lifetime
- Added server-only helpers to set and clear the shared session cookie with HTTP-only, same-site, path, secure-production, and 180-day max-age options. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-38 Create JWT verification utilities
- Added strict HS256 JWT verification with expiry enforcement, subject validation, malformed-token handling, and an input size limit. Reused it from the existing session check. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-37 Create JWT generation utilities with a 180-day token lifetime
- Added a server-only HS256 token generator with a subject claim and a shared 180-day expiration constant. Added jsonwebtoken and its TypeScript declarations. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-36 Create password hashing utilities using bcryptjs
- Added server-only asynchronous hash and verification helpers using 12 bcrypt rounds. Rejects empty or over-72-byte inputs before hashing/comparison and rejects malformed hash prefixes. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-35 Create authentication Zod schemas
- Added registration and login validation with normalized username/email, an eight-character registration password minimum, and field-associated password confirmation errors. Exported inferred input types. Verified with TypeScript.
- Deviations: None recorded.

## 2026-10-09 — T-34 Create the User Mongoose model
- Aligned the server-only Mongoose User model and Zod contract with `context/schemas.md`, including unique normalized username/email indexes, profile fields, preferences, email verification, and account-security state. Enabled timestamps and excluded password and security secrets from ordinary queries. Verified with TypeScript and production build.
- Deviations: None recorded.

## 2026-10-09 — T-33 Create a shared Confirmation Dialog component
- Reused the accessible AlertDialog primitives, added the shared dialog shadow and Figma-like action row, exposed pending state, and announced pending/failure feedback. The dialog stays open after failures and while pending, closing only after confirmation succeeds. No dedicated destructive-confirmation frame exists in Figma; the inspected generic dialog is the visual reference. Verified with TypeScript and production build.
- Deviations: None recorded.

## 2026-10-09 — T-32 Create a shared Error State component
- Composed the existing destructive Alert primitive, associated its title and description for assistive technology, hid the decorative icon, and retained an optional recovery action. No dedicated error-state frame exists in Figma; styling reuses existing tokens and remains provisional. Verified with TypeScript and production build.
- Deviations: None recorded.

## 2026-10-09 — T-31 Create a shared Loading State component
- Kept the existing shared spinner and skeleton layout, marked the region busy, and hid the decorative spinner from assistive technology to avoid duplicate status announcements. No dedicated loading-state frame exists in Figma; styling reuses existing UI primitives and tokens. Verified with TypeScript and production build.
- Deviations: None recorded.

## 2026-10-09 — T-30 Create a shared Empty State component
- Composed the existing shadcn Empty primitives, retained the optional action/icon API, and added region labeling so assistive technology can associate each empty state with its heading and explanation. The approved Figma file has no Empty State frame; styling uses existing tokens and remains provisional. Verified with TypeScript and production build.
- Deviations: None recorded.

## 2026-10-09 — T-29 Create a shared Page Header component
- Aligned the existing shared heading to the inspected Figma page-heading frame: breadcrumb overline, exact 32px title style, supporting text, and a right-aligned actions slot. Preserved the existing component API. Verified with TypeScript and production build.
- Deviations: None recorded.

## 2026-10-09 — T-28 Create the authentication `(auth)` layout
- Added the public auth route-group layout with valid-session redirects and the responsive light/dark split framing from the Figma login/register pages, including a token-based workspace preview and shared brand treatment. The marketing preview is hidden below the desktop Figma breakpoint because no mobile auth frame exists. Verified with TypeScript and production build.
- Deviations: None recorded.

## 2026-10-09 — T-27 Create the authenticated `(view)` layout
- Moved the app shell into the `(view)` route group and redirect unauthenticated requests to `/login` after verifying the session cookie's HS256 signature, subject, and expiry. Added optional `JWT_SECRET` validation through the ignored root `.env`; persisted-session revocation remains for the later auth implementation. Verified with TypeScript and production build.
- Deviations: None recorded.


## 2026-10-09 — T-22 Create the application logo component
- Verified the existing reusable Orbit logo's accessible link, size variants, and theme-token tones with a component test.
- Deviations: None recorded.

## 2026-10-09 — T-21 Configure global English typography
- Loaded Inter with `next/font` as a self-hosted Latin font, exposed it globally, and retained system fallbacks with swap display.
- Deviations: None recorded.

## 2026-10-09 — T-20 Configure English LTR and Gregorian calendar
- Kept the existing English LTR document settings, defaulted the shared calendar to English Gregorian dates, and retained locale overrides. Added a calendar regression test.
- Deviations: None recorded.

## 2026-10-09 — T-19 Create the root application layout
- Verified the existing App Router root layout composes global styles, metadata, theme/query/tooltip/sidebar providers, and English LTR document settings. Confirmed with tests, TypeScript, and a production build.
- Deviations: None recorded.

## 2026-10-09 — T-18 Create global Server Action error handling
- Added safe error normalization, Zod field-error mapping, and Next.js control-flow rethrowing. Tests verify sensitive exception messages are not returned to callers.
- Deviations: None recorded.

## 2026-10-09 — T-17 Create the base Server Action result type
- Added exported discriminated success/failure types with typed data and optional field validation errors.
- Deviations: None recorded.

## 2026-10-09 — T-16 Create shared Zod validation helpers
- Added a reusable trimmed required-text schema and Zod 4 formatter for form and field errors, with focused validation tests.
- Deviations: None recorded.

## 2026-10-09 — T-15 Create shared TypeScript utility types
- Added common identifier, nullable, pagination/result, and object-shaping utility types under `types/`.
- Deviations: None recorded.

## 2026-10-09 — T-14 Create global application constants
- Added `DEFAULT_PAGE_SIZE` with the required default of 100 documents in the shared constants entry point.
- Deviations: None recorded.

## 2026-10-09 — T-12 Configure the application theme provider
- Wrapped the application in next-themes with class-based light, dark, and system support and suppressed the expected root theme hydration attribute mismatch.
- Deviations: None recorded.

## 2026-10-09 — T-11 Configure React Query provider
- Added a reusable provider with a browser singleton, per-render server client, and 60-second query freshness default. Verified provider behavior with a component test.
- Deviations: None recorded.

## 2026-10-09 — T-10 Create the MongoDB connection utility
- Added a server-only Mongoose connector that caches both the in-flight connection and resolved instance, clearing failed attempts for retry. Verified connection reuse with a unit test.
- Deviations: None recorded.

## 2026-10-09 — T-09 Configure automated test framework and shared test utilities
- Configured Vitest with jsdom, React Testing Library cleanup and matchers, shared test exports, and test scripts. Verified with the shared UI smoke test.
- Deviations: None recorded.

## 2026-10-09 — T-08 Validate environment variables with Zod
- Added `lib/env.ts` as a server-only Zod boundary, validating `MONGODB_URI` and exporting typed configuration with safe field-level diagnostics. Verified with `tsc --noEmit` and `npm run build`.
- Deviations: None recorded.

## 2026-10-09 — T-07 Configure environment variables
- Configured server-only `MONGODB_URI` in the ignored root `.env` and verified the ignore rules keep local secrets out of Git.
- Deviations: None recorded.

## 2026-10-09 — T-06 Base feature-based folder structure
- Scaffolded the eight architecture-defined feature roots and shared `services`, `types`, `utils`, and `constants` roots. Existing `app`, `components/shared`, `components/ui`, `hooks`, and `lib` remain the shared route/UI/infrastructure areas; feature subfolders are added as needed. Verified all expected directories exist.
- Deviations: None recorded.

## 2026-10-09 — T-05 Configure project path aliases
- Verified `@/*` resolves from the repository root without deprecated `baseUrl`, and project imports use aliases across app, components, and shared modules. Kept sibling-only imports relative. Verified with `tsc --noEmit` and `npm run build`.
- Deviations: None recorded.

## 2026-10-09 — T-119 Figma task card primitive
- Matched the shared Card surface to the Figma sample with token-based 14px padding, 10px spacing/radius, and the card shadow while preserving composition slots.
- Deviations: None recorded.

## 2026-10-09 — T-120 Figma design tokens and UI primitives
- Mapped the design-system typography and component samples to shared buttons, badges, cards, form controls, tables, and dialogs; reused the existing light/dark color tokens. Verified with TypeScript and production build.
- Deviations: None recorded.

## 2026-10-09 — T-121 Reusable UI and icon rule
- Documented that project screens should reuse components and icons from `components/` for consistency.
- Deviations: None recorded.

## 2026-10-09 — T-122 Collapsed navigation labels
- Hide sidebar link labels in icon-collapse mode while keeping the accessible link name and tooltip.
- Deviations: None recorded.

## 2026-10-09 — T-123 Collapsed sidebar Figma state
- Refactored the shadcn sidebar to match the new 72px collapsed design, including icon navigation, notification badge, workspace initial, expand control, and storage meter. Preserved expanded and mobile navigation. Verified with `tsc --noEmit` and `npm run build`.
- Deviations: None recorded.

## 2026-10-09 — T-124 Figma sidebar alignment
- Refined the shared sidebar to match the Figma design's Orbit brand, workspace switcher, single navigation group, notification count, active styling, and storage meter while retaining shadcn collapse and mobile behavior. Verified with `tsc --noEmit` and `npm run build`.
- Deviations: None recorded.

## 2026-10-09 — T-26 Create the mobile navigation component
- Reused the accessible Sheet and shared navigation links for mobile, aligned its visibility breakpoint with the desktop sidebar, and retained provisional behavior because the supplied Figma file has no mobile frame.
- Deviations: None recorded.

## 2026-10-09 — T-25 Create the Sidebar navigation items
- Matched the Figma navigation grouping and divider before Analytics, and shared typed route matching across desktop and mobile links.
- Deviations: None recorded.

## 2026-10-09 — T-24 Create the shared Sidebar component
- Compared expanded and collapsed sidebar states with Figma, corrected the workspace/storage surface, and added the collapsed-state expand control while retaining accessible navigation.
- Deviations: None recorded.

## 2026-10-09 — T-23 Create the shared Header component
- Compared light and dark header frames with the app shell and matched the 72px bar, 292px search, notifications, theme toggle, profile, logout, and Add task action using the local Figma avatar asset.
- Deviations: None recorded.

## 2026-10-09 — T-13 Export Figma icons
- Exported 71 distinct icon shapes from the Orbit Figma design into `components/icons/index.tsx`, replaced the provisional brand mark, retained existing icon imports, and aligned shared navigation with the design. Verified SVG path fidelity, TypeScript, and `npm run build`.
- Deviations: None recorded.

## 2026-10-09 — T-125 Component inventory implemented
- Added all 61 component paths listed in `context/generated/components.md`, including shadcn UI primitives, shared navigation and states, and local icons. Preserved existing theme and button edits. Verified with `tsc --noEmit`, inventory path checks, and `npm run build`.
- Deviations: None recorded.

## 2026-10-09 — T-04 Configure shadcn/ui
- Initialized the neutral Tailwind v4 setup with root aliases, `components/ui` output, a shared class utility, and light/dark CSS variable tokens. Verified with `tsc --noEmit` and `npm run build`.
- Deviations: None recorded.

## 2026-10-09 — T-03 Configure Tailwind CSS
- Installed Tailwind CSS v4 and its PostCSS plugin, imported the global stylesheet from the root layout, removed incompatible TypeScript flags that blocked the build, and verified with `npm run build`.
- Deviations: None recorded.

## 2026-10-09 — T-02 Configure TypeScript with strict mode
- Enabled strict compiler checks, including implicit-any errors, and mapped `@/*` to the repository root. Verified with `tsc --noEmit`.
- Deviations: None recorded.

## 2026-10-09 — T-01 Initialize the Next.js project with App Router
- Created the Orbit Next.js 16 App Router scaffold, initial English/LTR root layout and home route, npm development/build/start scripts, TypeScript bootstrap, `.gitignore`, and README development conventions. Verified with `npm run build`.
- Deviations: None recorded.
