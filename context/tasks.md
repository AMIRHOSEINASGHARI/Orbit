# Development Workflow

## Figma UI implementation rule

For every task that creates or changes a UI component, open the canonical Figma design link recorded in `context/generated/figma-design.md` and inspect the exact frame or component, including its variants and states. Recreate it faithfully: match its structure, layout, sizing, typography, colors, spacing, radii, borders, shadows, icons, responsive behavior, and interactions using the shared design tokens and components. Do not approximate or redesign the approved UI. If the link or exact reference cannot be inspected, record the blocker and ask for the missing design reference instead of inventing visual details.

## T-01

Initialize the Next.js project with App Router.

**Description:** Bootstrap the Next.js application with the App Router and establish the initial route, root layout, and development conventions used by every later feature.

---

## T-02

Configure TypeScript with strict mode.

**Description:** Enable strict TypeScript checks and align compiler settings with Next.js, the root import alias, and the rule against unsafe implicit types.

---

## T-03

Configure Tailwind CSS.

**Description:** Configure Tailwind CSS in the Next.js build pipeline and connect the global stylesheet so utility classes and design tokens are available application-wide.

---

## T-04

Configure shadcn/ui.

**Description:** Configure shadcn/ui for the repository Tailwind setup, aliases, component directory, and CSS variable theme so generated components integrate cleanly.

---

## T-05

Configure project path aliases.

**Description:** Set the @/\* alias to resolve from the repository root and use it consistently across app, component, feature, and shared modules.

---

## T-06

Create the base feature-based folder structure.

**Description:** Create domain-owned folders for each feature and shared app concerns, with a predictable place for components, actions, schemas, services, and types.

---

## T-07

Configure environment variables.

**Description:** Define required runtime configuration in local environment files and keep credentials out of source control.

---

## T-08

Create and apply a Zod schema for environment variable validation.

**Description:** Validate environment values once at the application boundary with Zod, report missing or malformed configuration clearly, and export typed values to consumers.

---

## T-09

Configure the automated test framework and shared test utilities.

**Description:** Configure the test runner, DOM environment, setup hooks, and reusable helpers so unit and component tests can run consistently.

---

## T-10

Create the MongoDB connection utility.

**Description:** Create a server-only MongoDB connector that reuses a cached connection during development and returns a stable connection for data services.

---

## T-11

Configure React Query provider.

**Description:** Provide a reusable React Query client for browser rendering and a request-safe client for server rendering, with sensible defaults for fetching and cache lifetime.

---

## T-12

Configure the application theme provider.

**Description:** Wrap the application in next-themes with light, dark, and system modes, class-based theme selection, and hydration-safe rendering for theme-dependent UI.

---

## T-13

Export icons used inside figma design into folder components/icons/index.tsx

**Description:** Set up Icons collection and a shared usage pattern so application icons remain consistent.

---

## T-14

Create global application constants, including a default pagination size of 100 documents.

**Description:** Centralize reusable application constants, including the default page size of 100 records, and use them instead of duplicating values.

---

## T-15

Create shared TypeScript utility types.

**Description:** Define shared strict TypeScript utility types for common identifiers, nullable values, pagination, and reusable data transformations.

---

## T-16

Create shared Zod validation helpers.

**Description:** Create shared Zod helpers for common validation patterns and error formatting so feature schemas behave consistently.

---

## T-17

Create the base Server Action result type.

**Description:** Define a typed Server Action result shape for success data, validation issues, and safe user-facing errors.

---

## T-18

Create global error handling utilities for Server Actions.

**Description:** Normalize exceptions from Server Actions into the shared result type without leaking secrets or internal stack traces.

---

## T-19

Create the root application layout.

**Description:** Create the root App Router layout with global providers, styles, metadata, and document-level settings used by every route.

---

## T-20

Configure the English LTR layout and edit calendar.tsx UI component inside folder components/ui/calendar.tsx to use the Gregorian calendar.

**Description:** Set the document language to English and application direction to LTR, and configure Gregorian date handling without breaking locale-aware layouts.

---

## T-21

Configure the global English typography.

**Description:** Load and apply the selected English font globally, with suitable fallbacks and typography defaults for all routes and components.

---

## T-22

Create the application logo component.

**Description:** Build a reusable application logo component that supports the required size and color variants and works in both light and dark surfaces.

---

## T-23

Create the shared Header component.

**Description:** Build the shared responsive header with app identity, global actions, account controls, and accessible navigation affordances.

---

## T-24

Create the shared Sidebar component.

**Description:** Build the shared desktop sidebar with grouped navigation, active-route states, and the application theme tokens.

---

## T-25

Create the Sidebar navigation items.

**Description:** Define typed sidebar navigation groups and links, including route destinations, labels, icons, and active matching.

---

## T-26

Create the mobile navigation component.

**Description:** Build the compact mobile navigation for narrow screens with accessible open/close behavior and links to the main application sections.

---

## T-27

Create the authenticated `(view)` layout.

**Description:** Create the authenticated route-group layout that supplies shared app navigation and rejects unauthenticated access.

---

## T-28

Create the authentication `(auth)` layout.

**Description:** Create the public authentication route-group layout with focused page framing and redirects for users who already have a valid session.

---

## T-29

Create a shared Page Header component.

**Description:** Build a reusable page heading with title, supporting text, breadcrumbs or actions where needed, and consistent spacing.

---

## T-30

Create a shared Empty State component.

**Description:** Build a reusable empty state with a clear explanation and an optional next action, sized and styled consistently across resource pages.

---

## T-31

Create a shared Loading State component.

**Description:** Build reusable loading indicators and skeleton patterns that preserve page layout while data or actions are pending.

---

## T-32

Create a shared Error State component.

**Description:** Build a reusable error state that explains the failure safely and offers retry or recovery actions when available.

---

## T-33

Create a shared Confirmation Dialog component.

**Description:** Build a shared accessible confirmation dialog for destructive actions, with clear consequences and explicit cancel/confirm controls.

---

# Authentication

## T-34

Create the User Mongoose model.

**Description:** Define the User persistence model and its TypeScript and validation contracts. Specify required fields, defaults, references, indexes, and lifecycle rules, and keep the model aligned with its Zod schemas.

---

## T-35

Create authentication Zod schemas.

**Description:** Create authentication Zod schemas for Authentication. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-36

Create password hashing utilities using bcryptjs.

**Description:** Create password hashing utilities using bcryptjs for Authentication. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-37

Create JWT generation utilities with a 180-day token lifetime.

**Description:** Create JWT generation utilities with a 180-day token lifetime for Authentication. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-38

Create JWT verification utilities.

**Description:** Create JWT verification utilities for Authentication. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-39

Create secure HTTP-only authentication cookie utilities with a 180-day lifetime.

**Description:** Create secure HTTP-only authentication cookie utilities with a 180-day lifetime for Authentication. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-40

Create the `getCurrentUser` authentication helper.

**Description:** Create the `getCurrentUser` authentication helper for Authentication. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-41

Create the Register Server Action.

**Description:** Implement the `Register` Server Action for Authentication. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-42

Create the Register form UI.

**Description:** Build the Register form for Authentication with labeled, accessible controls, sensible defaults, field-level validation, and pending, error, and success feedback. Connect submission to its intended Server Action when specified.

---

## T-43

Connect the Register form to the Register Server Action.

**Description:** Connect the Register form to the Register Server Action end to end within Authentication. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

## T-44

Create the Login Server Action.

**Description:** Implement the `Login` Server Action for Authentication. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-45

Create the Login form UI.

**Description:** Build the Login form for Authentication with labeled, accessible controls, sensible defaults, field-level validation, and pending, error, and success feedback. Connect submission to its intended Server Action when specified.

---

## T-46

Connect the Login form to the Login Server Action.

**Description:** Connect the Login form to the Login Server Action end to end within Authentication. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

## T-47

Create the Logout Server Action.

**Description:** Implement the `Logout` Server Action for Authentication. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-48

Add Logout functionality to the application UI.

**Description:** Add Logout functionality to the application UI. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-49

Protect authenticated application routes.

**Description:** Protect authenticated application routes by enforcing authentication before protected content or actions are available, and verify unauthorized requests are redirected or rejected safely.

---

## T-50

Prevent authenticated users from accessing Login and Register pages.

**Description:** Prevent authenticated users from accessing Login and Register pages with route-level session checks and the correct redirect behavior for authenticated and unauthenticated users.

---

## T-51

Handle expired and invalid 180-day authentication sessions.

**Description:** Handle expired and invalid 180-day authentication sessions consistently, including validation, safe user feedback, and the appropriate recovery or rejection behavior.

---

# Dashboard

## T-52

Create the Dashboard analytics page structure.

**Description:** Compose the approved analytics Dashboard frame inside the authenticated application layout, including summary metrics, charts, task sections, notes, and activity. Keep the page responsive and accessible, with designed loading, empty, and recoverable error states.

---

## T-53

Create the total tasks summary card.

**Description:** Display the signed-in user's total task count and the Todo, In Progress, and Done composition bar in the Figma summary card.

---

## T-54

Create the completed this week summary card.

**Description:** Display the signed-in user's tasks completed in the last seven days with the approved completion icon and supporting detail.

---

## T-55

Create the In Progress summary card.

**Description:** Display the signed-in user's In Progress count and its share of current tasks in the approved summary card.

---

## T-56

Create the overdue summary card.

**Description:** Display the signed-in user's overdue task count and attention indicator in the approved summary card.

---

## T-57

Create the Dashboard analytics Server Action.

**Description:** Return typed task totals, seven-day completion trends, group workload, priority counts, deadline buckets, and activity measures. Enforce caller ownership and return safe errors through the shared ActionResult contract.

---

## T-58

Connect Dashboard analytics and export controls.

**Description:** Load analytics and section data on the Dashboard route, render the selected personal scope and seven-day period, and export the displayed report as CSV. Preserve the page layout during loading and surface safe errors.

---

## T-59

Create the recent tasks section.

**Description:** Show the latest authorized tasks in the Figma table with group, priority, due date, and status. Include a link to all tasks, an empty state, and a safe error state.

---

## T-60

Create the upcoming tasks list.

**Description:** Show the signed-in user's next due tasks inside the Needs Attention panel with dates, empty state, and safe error state.

---

## T-61

Create the overdue tasks panel.

**Description:** Show the overdue count and first overdue task details above the upcoming list, with a link to open the task and safe error and empty states.

---

## T-62

Create the Group workload chart and progress measures.

**Description:** Aggregate owned tasks by active Group and display stacked status counts, totals, and completion percentages. Exclude Groups the caller cannot access.

---

## T-63

Create the Note statistics and recent Notes count.

**Description:** Return the signed-in user's active Note count for the Recent Notes heading, keeping deleted and archived Notes out of the total.

---

## T-64

Create the recent Notes Dashboard section using a Server Action.

**Description:** Return a small, typed list of the caller's recently updated Notes and display each title, preview, and update time in the Recent Notes card. Include empty and safe error states.

---

## T-65

Create the recent Notifications Dashboard section using a Server Action.

**Description:** Return a small, typed list of the caller's recent Notifications and display each event icon, title, and time in the Recent Activity card. Enforce recipient ownership and include empty and safe error states.

---

# Task Foundation

## T-66

Create the Task Mongoose model.

**Description:** Define the Task persistence model and its TypeScript and validation contracts. Specify required fields, defaults, references, indexes, and lifecycle rules, and keep the model aligned with its Zod schemas.

---

## T-67

Add `Todo`, `In Progress`, and `Done` task statuses.

**Description:** Add `Todo`, `In Progress`, and `Done` task statuses to Task Foundation. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-68

Add task priority fields.

**Description:** Add task priority fields to Task Foundation. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-69

Add task due date fields.

**Description:** Add task due date fields to Task Foundation. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-70

Add task soft-delete fields.

**Description:** Add task soft-delete fields to Task Foundation. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-71

Create Task TypeScript types.

**Description:** Create Task TypeScript types for Task Foundation. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-72

Create Task Zod schemas.

**Description:** Create Task Zod schemas for Task Foundation. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-73

Create Task query keys.

**Description:** Create Task query keys for Task Foundation. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-74

Create the Task service foundation.

**Description:** Create the Task service foundation for Task Foundation. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

# Task Creation

## T-75

Create the `createTask` Server Action.

**Description:** Implement the `createTask` Server Action for Task Creation. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-76

Create the Task form component.

**Description:** Build the Task form interface for Task Creation using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-77

Add task title field.

**Description:** Add task title field to Task Creation. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-78

Add task description field.

**Description:** Add task description field to Task Creation. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-79

Add task status selector.

**Description:** Add task status selector to Task Creation. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-80

Add task priority selector.

**Description:** Add task priority selector to Task Creation. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-81

Add task due date selector.

**Description:** Add task due date selector to Task Creation. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-82

Add task group selector.

**Description:** Add task group selector to Task Creation. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-83

Connect React Hook Form to the Task form.

**Description:** Connect React Hook Form to the Task form end to end within Task Creation. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

## T-84

Connect Zod validation to the Task form.

**Description:** Connect Zod validation to the Task form end to end within Task Creation. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

## T-85

Connect the Task form to the `createTask` Server Action.

**Description:** Connect the Task form to the `createTask` Server Action end to end within Task Creation. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

## T-86

Add task creation loading state.

**Description:** Add task creation loading state to Task Creation. Show it at the appropriate point in the user flow, keep the layout clear, and provide accessible text or controls for the relevant state.

---

## T-87

Add task creation success feedback.

**Description:** Add task creation success feedback to Task Creation. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-88

Add task creation error feedback.

**Description:** Add task creation error feedback to Task Creation. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

# Task Reading

## T-89

Create the `getTasks` Server Action.

**Description:** Implement the `getTasks` Server Action for Task Reading. Authenticate the caller, authorize access to the requested data, validate query parameters, and return a typed result with safe errors.

---

## T-90

Create the Tasks page route and states.

**Description:** Build the authenticated `/tasks` route inside the shared application shell, using the approved Figma Tasks Table View (`2:35588`) as the page reference. Connect the task-reading data flow and provide accessible loading, empty, and recoverable error states. Keep the route usable at narrow widths.

---

## T-91

Build the Tasks page header and view switcher.

**Description:** Recreate the Tasks page heading from Figma node `2:35665`: `WORKSPACE / TASKS` breadcrumb, “Tasks” title, supporting description, and the Table View / Drag & Drop View switcher. Use shared components and design tokens, show the active view clearly, and make view switching keyboard accessible.

---

## T-92

Build the Tasks search and filter toolbar.

**Description:** Recreate the toolbar in Figma node `2:35677` with task search, Status, Priority, Group, and Due date filters, Last updated sorting, and the task-view preset control. Connect controls to the task query, preserve combined filter selections, and support keyboard use, clear labels, and narrow screens.

---

## T-93

Display tasks in the Figma table view.

**Description:** Implement the Tasks table from Figma node `2:35705` and its selected-row state `2:35996` with persisted, authorized task data. Match the designed columns for task, created date, priority, group, due date, status, assignees, and row actions; include row selection, the table footer and pagination, and connect view to the details drawer, edit to the shared task dialog, and delete to its task flow. Use the shared Table component, handle missing optional values, and keep the table accessible and usable on narrow screens.

---

## T-94

Create the `getTaskById` Server Action.

**Description:** Implement the `getTaskById` Server Action for Task Reading. Authenticate the caller, authorize access to the requested data, validate query parameters, and return a typed result with safe errors.

---

## T-95

Create the Task Details drawer.

**Description:** Build the task details interface as a drawer opened from a task row or card, using the shared `components/ui/drawer.tsx` component and the approved Figma Tasks Details drawer (`8:2169`). Load the selected task through `getTaskById`, handle loading and safe error states, and support accessible close behavior. Do not create a standalone task details route or page.

---

## T-96

Display basic task information.

**Description:** Display the selected task's title, description, due date, and group information inside the Task Details drawer using authorized persisted data. Handle missing optional values and keep the content readable on narrow screens and with assistive technology.

---

## T-97

Display task status.

**Description:** Display the selected task's status inside the Task Details drawer using the approved status treatment and persisted data. Keep the status understandable to assistive technology and readable at narrow widths.

---

## T-98

Display task priority.

**Description:** Display the selected task's priority inside the Task Details drawer using the approved priority treatment and persisted data. Keep the priority understandable to assistive technology and readable at narrow widths.

---

## T-99

Display task due date.

**Description:** Display task due date in Task Reading using the persisted data and shared visual patterns. Include the relevant empty and loading states and ensure the content remains readable on mobile and with assistive technology.

---

## T-100

Display task group information.

**Description:** Display task group information in Task Reading using the persisted data and shared visual patterns. Include the relevant empty and loading states and ensure the content remains readable on mobile and with assistive technology.

---

# Task Updating

## T-101

Create the `updateTask` Server Action.

**Description:** Implement the `updateTask` Server Action for Task Updating. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-102

Open the shared task dialog in edit mode.

**Description:** Open the existing task creation dialog from the selected task's Edit action. Keep editing in the current Tasks page and do not add a standalone `/edit` route.

---

## T-103

Load selected task data into the shared dialog.

**Description:** Prefill the shared task dialog from the selected task record, retaining its current field values and showing the same form validation used during creation.

---

## T-104

Connect the shared task dialog to the `updateTask` Server Action.

**Description:** Submit edits from the shared task dialog through the owner-authorized `updateTask` Server Action. Handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

## T-105

Add task update success feedback.

**Description:** Add task update success feedback to Task Updating. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-106

Add task update error feedback.

**Description:** Add task update error feedback to Task Updating. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

# Task Status

## T-107

Create the `changeTaskStatus` Server Action.

**Description:** Implement the `changeTaskStatus` Server Action for Task Status. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-108

Add Todo status action.

**Description:** Add the To do choice to the task table's inline status selector and persist it through the authorized status action with clear pending, success, and failure feedback.

---

## T-109

Add In Progress status action.

**Description:** Add the In progress choice to the task table's inline status selector and persist it through the authorized status action with clear pending, success, and failure feedback.

---

## T-110

Add Done status action.

**Description:** Add the Done choice to the task table's inline status selector and persist it through the authorized status action with clear pending, success, and failure feedback.

---

## T-111

Update task status without opening the task edit dialog.

**Description:** Update task status without opening the task edit dialog in the current interface and persist the change through the authorized data flow, with pending and error feedback.

---

# Task Trash

## T-112

Create the `trashTask` Server Action.

**Description:** Implement the `trashTask` Server Action for Task Trash. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-113

Add Move to Trash action to Task Card.

**Description:** Add Move to Trash action to Task Card. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-114

Add task trash confirmation dialog.

**Description:** Add task trash confirmation dialog to Task Trash. Show it at the appropriate point in the user flow, keep the layout clear, and provide accessible text or controls for the relevant state.

---

## T-115

Exclude trashed tasks from normal Task queries.

**Description:** Exclude trashed tasks from normal Task queries from the relevant queries and views, while keeping the resource available through its intended recovery or archive flow.

---

## T-116

Create the `restoreTask` Server Action.

**Description:** Implement the `restoreTask` Server Action for Task Trash. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-117

Create the `permanentlyDeleteTask` Server Action.

**Description:** Implement the `permanentlyDeleteTask` Server Action for Task Trash. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

# Task Search

## T-118

Create the Task search input.

**Description:** Create the Task search input for Task Search. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-119

Add search query state.

**Description:** Add search query state to Task Search. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

## T-120

Add `use-debounce` to Task search.

**Description:** Add `use-debounce` to Task search. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-121

Add server-side Task search.

**Description:** Add server-side Task search to Task Search. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

## T-122

Synchronize Task search with URL search parameters.

**Description:** Synchronize Task search with URL search parameters so URL parameters and interface state stay aligned on navigation, refresh, and browser back or forward actions.

---

# Task Filtering

## T-123

Create the Task filters UI.

**Description:** Build the Task filters interface for Task Filtering using shared components and design tokens. Do it by adding a Dialog component an inside the Dialog, there will be the filters funcionalities. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-124

Add filtering by status.

**Description:** Add filtering by status to Task Filtering. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

## T-125

Add filtering by priority.

**Description:** Add filtering by priority to Task Filtering. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

## T-126

Add filtering by group.

**Description:** Add filtering by group to Task Filtering. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

## T-127

Add filtering by due date.

**Description:** Add filtering by due date to Task Filtering. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

## T-128

Synchronize Task filters with URL search parameters.

**Description:** Synchronize Task filters with URL search parameters so URL parameters and interface state stay aligned on navigation, refresh, and browser back or forward actions.

---

## T-129

Add Clear Filters functionality.

**Description:** Add Clear Filters functionality to Task Filtering. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

# Task Sorting

## T-130

Create the Task sorting control.

**Description:** Build the Task sorting interface for Task Sorting using shared components and design tokens. Do it by adding a Dialog component an inside the Dialog, there will be the sorting funcionalities. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-131

Add sorting by creation date.

**Description:** Add sorting by creation date to Task Sorting. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

## T-132

Add sorting by due date.

**Description:** Add sorting by due date to Task Sorting. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

## T-133

Add sorting by priority.

**Description:** Add sorting by priority to Task Sorting. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

## T-134

Synchronize Task sorting with URL search parameters.

**Description:** Synchronize Task sorting with URL search parameters so URL parameters and interface state stay aligned on navigation, refresh, and browser back or forward actions.

---

# Task Pagination

## T-135

Add Task pagination to the Server Action with a default page size of 100 documents.

**Description:** Add Task pagination to the Server Action with a default page size of 100 documents. Keep the selected value in application state, apply it to the results, and preserve it through URL parameters and navigation where specified.

---

## T-136

Create the Task pagination UI.

**Description:** Build the Task pagination interface for Task Pagination using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-137

Synchronize Task pagination with URL search parameters.

**Description:** Synchronize Task pagination with URL search parameters so URL parameters and interface state stay aligned on navigation, refresh, and browser back or forward actions.

---

# Task Views

**Design reference:** [Tasks — Drag & Drop View · Light](https://www.figma.com/design/laiZSESHpTPjtjhrWSU4aK/Orbit?node-id=2-36433). The Figma switcher exposes two modes: **Table View** and **Drag & Drop View**. “List View” below refers to the row-based task collection used by Table View; do not add a third view mode.

## T-138

Create the List View component.

**Description:** Create the data-driven, row-based task collection used by the Figma Table View. Render the current filtered and paginated task results without changing their order; expose task and action callbacks to the table presentation. This is a composition/data responsibility, not a separate third option in the view switcher. Keep loading, error, and empty states consistent with the Tasks page.

---

## T-139

Create the Table View component.

**Description:** Present the List View collection as the Figma row-based table, with columns for task title and identifier, created date, priority, group, due date, status, assignees, and row actions. Match the existing Tasks table design and reuse its controls for selection, status/priority updates, view, edit, and trash. Keep the table horizontally usable on narrow screens and retain the shared search/filter/sort toolbar and pagination. Show assignee, comment, or subtask metadata only when supported by task data; do not invent values.

---

## T-140

Create the Drag & Drop board structure.

**Description:** Create the Figma Kanban board with three equal-width, independently scrollable columns in Todo, In Progress, Done order. Keep the board below the shared Tasks heading and search/filter/sort toolbar. Each column must accept its status-specific tasks, expose an accessible heading/count, and provide the column actions space. Allow horizontal board scrolling on narrow screens rather than collapsing the columns until unusable. Include loading, error, and empty-column states.

---

## T-141

Create the Todo Drag & Drop column.

**Description:** Implement the Todo column in the board style: muted status indicator, “Todo” heading and task count, Add task action, overflow menu, and a vertically scrollable stack of task cards. Show only Todo tasks and provide an empty-column state. The Add task action must open the existing task creation form with Todo selected.

---

## T-142

Create the In Progress Drag & Drop column.

**Description:** Implement the In Progress column in the board style: blue status indicator, heading and count, Add task action, overflow menu, and a vertically scrollable stack of matching task cards. The Add task action must open the existing task creation form with In Progress selected. Include an empty-column state.

---

## T-143

Create the Done Drag & Drop column.

**Description:** Implement the Done column in the board style: green status indicator, heading and count, Add task action, overflow menu, and a vertically scrollable stack of matching task cards. The Add task action must open the existing task creation form with Done selected. Include an empty-column state.

---

## T-144

Enable task dragging between columns.

**Description:** Make the Figma task cards draggable between status columns using the visible grip affordance. Support pointer and keyboard movement with clear focus, drag, and drop feedback. A completed drop into another column changes the task status; canceling or dropping outside a valid column leaves it unchanged. Do not add manual within-column reordering because Tasks has no persisted ordering field.

---

## T-145

Persist Drag & Drop status changes using a Server Action.

**Description:** Persist a cross-column drop through the existing authenticated, ownership-checked task status update flow (reuse or extend the existing Server Action). Validate the task ID and destination status, update the board and affected task queries after success, and roll the card back to its original column with an accessible error message if saving fails. Avoid changing the table’s ordering behavior when a status is updated.

---

## T-146

Create the Task View switcher.

**Description:** Build the Figma two-option switcher labeled “Table View” and “Drag & Drop View,” with matching list/table and columns icons, active selection styling, keyboard operation, and accessible selected-state semantics. Table View is the default. Keep the shared Tasks heading and toolbar visible when switching views.

---

## T-147

Connect List View to the Task View switcher.

**Description:** Connect the row-based List View collection to the Table View option. Pass the current filtered, sorted, and paginated task data and existing row callbacks without reordering results or duplicating fetching and mutation state.

---

## T-148

Connect Table View to the Task View switcher.

**Description:** Render the Figma Table View when the Table View option is selected, using the shared List View collection and preserving its current filters, sort, pagination, selection, and task actions when changing modes.

---

## T-149

Connect Drag & Drop View to the Task View switcher.

**Description:** Render the three-column board when Drag & Drop View is selected. Reuse the current task query and shared toolbar state, preserve filter and sort behavior, and connect cross-column drops to the status update flow. Switching views must not reset task data or trigger duplicate requests.

---

# Bulk Task Selection

## T-150

Add task selection checkbox to List View.

**Description:** Add task selection checkbox to List View. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-151

Add task selection checkbox to Table View.

**Description:** Add task selection checkbox to Table View. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-152

Create selected task state.

**Description:** Create selected task state for Bulk Task Selection. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-153

Add Select All functionality.

**Description:** Add Select All functionality to Bulk Task Selection. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-154

Add Clear Selection functionality.

**Description:** Add Clear Selection functionality to Bulk Task Selection. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-155

Create the Bulk Actions toolbar.

**Description:** Build the Bulk Actions interface for Bulk Task Selection using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-156

Create Bulk Move to Trash Server Action.

**Description:** Implement the `Bulk Move to Trash` Server Action for Bulk Task Selection. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-157

Connect Bulk Move to Trash to selected tasks.

**Description:** Connect Bulk Move to Trash to selected tasks end to end within Bulk Task Selection. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

## T-158

Create Bulk Change Status Server Action.

**Description:** Implement the `Bulk Change Status` Server Action for Bulk Task Selection. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-159

Connect Bulk Change Status to selected tasks.

**Description:** Connect Bulk Change Status to selected tasks end to end within Bulk Task Selection. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

## T-160

Create Bulk Change Priority Server Action.

**Description:** Implement the `Bulk Change Priority` Server Action for Bulk Task Selection. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-161

Connect Bulk Change Priority to selected tasks.

**Description:** Connect Bulk Change Priority to selected tasks end to end within Bulk Task Selection. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

## T-162

Create Bulk Move to Group Server Action.

**Description:** Implement the `Bulk Move to Group` Server Action for Bulk Task Selection. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-163

Connect Bulk Move to Group to selected tasks.

**Description:** Connect Bulk Move to Group to selected tasks end to end within Bulk Task Selection. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

## T-164

Create Bulk Remove from Group Server Action.

**Description:** Implement the `Bulk Remove from Group` Server Action for Bulk Task Selection. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-165

Connect Bulk Remove from Group to selected tasks.

**Description:** Connect Bulk Remove from Group to selected tasks end to end within Bulk Task Selection. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

## T-166

Create the Bulk Permanently Delete Tasks Server Action.

**Description:** Implement the `Bulk Permanently Delete Tasks` Server Action for Bulk Task Selection. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-167

Connect Bulk Permanently Delete to selected tasks with confirmation.

**Description:** Connect Bulk Permanently Delete to selected tasks with confirmation end to end within Bulk Task Selection. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

## T-168

Create the Bulk Restore Tasks Server Action.

**Description:** Implement the `Bulk Restore Tasks` Server Action for Bulk Task Selection. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-169

Connect Bulk Restore to selected trashed tasks.

**Description:** Connect Bulk Restore to selected trashed tasks end to end within Bulk Task Selection. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

# Task Groups

## T-170

Create the Task Group Mongoose model.

**Description:** Define the Task Group persistence model and its TypeScript and validation contracts. Specify required fields, defaults, references, indexes, and lifecycle rules, and keep the model aligned with its Zod schemas.

---

## T-171

Create Task Group TypeScript types.

**Description:** Create Task Group TypeScript types for Task Groups. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-172

Create Task Group Zod schemas.

**Description:** Create Task Group Zod schemas for Task Groups. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-173

Track whether a task was automatically trashed by its Task Group.

**Description:** Track whether a task was automatically trashed by its Task Group in persisted data and update it consistently when the related operation succeeds or is reversed.

---

## T-174

Create the `createGroup` Server Action.

**Description:** Implement the `createGroup` Server Action for Task Groups. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-175

Create the Group form.

**Description:** Build the Group form for Task Groups with labeled, accessible controls, sensible defaults, field-level validation, and pending, error, and success feedback. Connect submission to its intended Server Action when specified.

---

## T-176

Connect the Group form to the Create Server Action.

**Description:** Connect the Group form to the Create Server Action end to end within Task Groups. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

## T-177

Create the `getGroups` Server Action.

**Description:** Implement the `getGroups` Server Action for Task Groups. Authenticate the caller, authorize access to the requested data, validate query parameters, and return a typed result with safe errors.

---

## T-178

Create the Groups page.

**Description:** Build the Groups page for Task Groups with the shared application layout, the required data and actions, and clear loading, empty, and error states. Ensure the route is accessible and responsive.

---

## T-179

Create the Group Card component.

**Description:** Build the Group Card interface for Task Groups using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-180

Display Groups on the Groups page.

**Description:** Display Groups on the Groups page in Task Groups using the persisted data and shared visual patterns. Include the relevant empty and loading states and ensure the content remains readable on mobile and with assistive technology.

---

## T-181

Create the `getGroupById` Server Action.

**Description:** Implement the `getGroupById` Server Action for Task Groups. Authenticate the caller, authorize access to the requested data, validate query parameters, and return a typed result with safe errors.

---

## T-182

Create the Group Details page.

**Description:** Build the Group Details page for Task Groups with the shared application layout, the required data and actions, and clear loading, empty, and error states. Ensure the route is accessible and responsive.

---

## T-183

Display tasks belonging to a Group.

**Description:** Display tasks belonging to a Group in Task Groups using the persisted data and shared visual patterns. Include the relevant empty and loading states and ensure the content remains readable on mobile and with assistive technology.

---

## T-184

Create the `updateGroup` Server Action.

**Description:** Implement the `updateGroup` Server Action for Task Groups. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-185

Create the Edit Group page.

**Description:** Build the Edit Group page for Task Groups with the shared application layout, the required data and actions, and clear loading, empty, and error states. Ensure the route is accessible and responsive.

---

## T-186

Create the `trashGroup` Server Action and cascade soft deletion to every task in the group.

**Description:** Implement the `trashGroup` Server Action for Task Groups. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data. Also cascade soft deletion to every task in the group as part of the same workflow.

---

## T-187

Add Move Group to Trash functionality.

**Description:** Add Move Group to Trash functionality. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-188

Exclude trashed Groups from normal Group queries.

**Description:** Exclude trashed Groups from normal Group queries from the relevant queries and views, while keeping the resource available through its intended recovery or archive flow.

---

## T-189

Create the `restoreGroup` Server Action and restore only tasks automatically trashed with that Group.

**Description:** Implement the `restoreGroup` Server Action for Task Groups. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data. Also restore only tasks automatically trashed with that Group as part of the same workflow.

---

## T-190

Create the `permanentlyDeleteGroup` Server Action and cascade permanent deletion to every task in the group.

**Description:** Implement the `permanentlyDeleteGroup` Server Action for Task Groups. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data. Also cascade permanent deletion to every task in the group as part of the same workflow.

---

## T-191

Add Group search.

**Description:** Add Group search to Task Groups. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

## T-192

Add Group sorting.

**Description:** Add Group sorting to Task Groups. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

# Notes

## T-193

Create the Note Mongoose model.

**Description:** Define the Note persistence model and its TypeScript and validation contracts. Specify required fields, defaults, references, indexes, and lifecycle rules, and keep the model aligned with its Zod schemas.

---

## T-194

Create Note TypeScript types.

**Description:** Create Note TypeScript types for Notes. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-195

Create Note Zod schemas.

**Description:** Create Note Zod schemas for Notes. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-196

Install and configure Tiptap.

**Description:** Install and configure Tiptap with the required editor extensions, application integration, and shared styling.

---

## T-197

Create the base Note Editor component.

**Description:** Build the base Note Editor interface for Notes using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-198

Create the Tiptap toolbar.

**Description:** Build the Tiptap interface for Notes using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-199

Add heading formatting.

**Description:** Add heading formatting to Notes. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-200

Add bold formatting.

**Description:** Add bold formatting to Notes. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-201

Add italic formatting.

**Description:** Add italic formatting to Notes. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-202

Add underline formatting.

**Description:** Add underline formatting to Notes. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-203

Add strike-through formatting.

**Description:** Add strike-through formatting to Notes. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-204

Add bullet lists.

**Description:** Add bullet lists to Notes. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-205

Add ordered lists.

**Description:** Add ordered lists to Notes. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-206

Add blockquotes.

**Description:** Add blockquotes to Notes. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-207

Add code blocks.

**Description:** Add code blocks to Notes. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-208

Add links.

**Description:** Add links to Notes. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-209

Add horizontal-rule formatting.

**Description:** Add horizontal-rule formatting to Notes. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-210

Add Undo / Redo functionality.

**Description:** Add Undo / Redo functionality to Notes. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-211

Create the `createNote` Server Action.

**Description:** Implement the `createNote` Server Action for Notes. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-212

Create the Create Note page.

**Description:** Build the Create Note page for Notes with the shared application layout, the required data and actions, and clear loading, empty, and error states. Ensure the route is accessible and responsive.

---

## T-213

Connect Tiptap Editor to note creation.

**Description:** Connect Tiptap Editor to note creation end to end within Notes. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

## T-214

Create the `getNotes` Server Action.

**Description:** Implement the `getNotes` Server Action for Notes. Authenticate the caller, authorize access to the requested data, validate query parameters, and return a typed result with safe errors.

---

## T-215

Create the Notes page.

**Description:** Build the Notes page for Notes with the shared application layout, the required data and actions, and clear loading, empty, and error states. Ensure the route is accessible and responsive.

---

## T-216

Create the Note Card component.

**Description:** Build the Note Card interface for Notes using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-217

Create the `getNoteById` Server Action.

**Description:** Implement the `getNoteById` Server Action for Notes. Authenticate the caller, authorize access to the requested data, validate query parameters, and return a typed result with safe errors.

---

## T-218

Create the Note Details page.

**Description:** Build the Note Details page for Notes with the shared application layout, the required data and actions, and clear loading, empty, and error states. Ensure the route is accessible and responsive.

---

## T-219

Create the `updateNote` Server Action.

**Description:** Implement the `updateNote` Server Action for Notes. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-220

Create the Edit Note page.

**Description:** Build the Edit Note page for Notes with the shared application layout, the required data and actions, and clear loading, empty, and error states. Ensure the route is accessible and responsive.

---

## T-221

Create the `trashNote` Server Action.

**Description:** Implement the `trashNote` Server Action for Notes. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-222

Exclude trashed Notes from normal Note queries.

**Description:** Exclude trashed Notes from normal Note queries from the relevant queries and views, while keeping the resource available through its intended recovery or archive flow.

---

## T-223

Create the `restoreNote` Server Action.

**Description:** Implement the `restoreNote` Server Action for Notes. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-224

Create the `permanentlyDeleteNote` Server Action.

**Description:** Implement the `permanentlyDeleteNote` Server Action for Notes. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-225

Add Note search.

**Description:** Add Note search to Notes. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

## T-226

Add Note sorting.

**Description:** Add Note sorting to Notes. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

## T-227

Add Note pagination with a default page size of 100 documents.

**Description:** Add Note pagination with a default page size of 100 documents to Notes. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

# Notifications

## T-228

Create the Notification Mongoose model.

**Description:** Define the Notification persistence model and its TypeScript and validation contracts. Specify required fields, defaults, references, indexes, and lifecycle rules, and keep the model aligned with its Zod schemas.

---

## T-229

Create Notification TypeScript types.

**Description:** Create Notification TypeScript types for Notifications. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-230

Create the Notification service.

**Description:** Create the Notification service for Notifications. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-231

Create notification after Task creation.

**Description:** Create notification after Task creation for Notifications. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-232

Create notification after Task update.

**Description:** Create notification after Task update for Notifications. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-233

Create notification after Task permanent deletion.

**Description:** Create notification after Task permanent deletion for Notifications. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-234

Create notification after a Task is moved to Trash.

**Description:** Create notification after a Task is moved to Trash for Notifications. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-235

Create notification after a Task status change.

**Description:** Create notification after a Task status change for Notifications. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-236

Create notification after Task restore.

**Description:** Create notification after Task restore for Notifications. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-237

Create notification after Group operations.

**Description:** Create notification after Group operations for Notifications. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-238

Create notification after Note operations.

**Description:** Create notification after Note operations for Notifications. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-239

Create notification after Profile updates.

**Description:** Create notification after Profile updates for Notifications. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-240

Create notification after Avatar update.

**Description:** Create notification after Avatar update for Notifications. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-241

Create notification after Avatar removal.

**Description:** Create notification after Avatar removal for Notifications. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-242

Create notification after Password change.

**Description:** Create notification after Password change for Notifications. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-243

Create the `getNotifications` Server Action.

**Description:** Implement the `getNotifications` Server Action for Notifications. Authenticate the caller, authorize access to the requested data, validate query parameters, and return a typed result with safe errors.

---

## T-244

Create the Notifications page.

**Description:** Build the Notifications page for Notifications with the shared application layout, the required data and actions, and clear loading, empty, and error states. Ensure the route is accessible and responsive.

---

## T-245

Create the Notification Item component.

**Description:** Build the Notification Item interface for Notifications using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-246

Create the Notification Details page or dialog.

**Description:** Build the Notification Details page or interface for Notifications using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-247

Create the unread notification counter.

**Description:** Create the unread notification counter for Notifications. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-248

Create the `markNotificationAsRead` Server Action.

**Description:** Implement the `markNotificationAsRead` Server Action for Notifications. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-249

Create the `markNotificationAsUnread` Server Action.

**Description:** Implement the `markNotificationAsUnread` Server Action for Notifications. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-250

Create the `markAllNotificationsAsRead` Server Action.

**Description:** Implement the `markAllNotificationsAsRead` Server Action for Notifications. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-251

Create the `deleteNotification` Server Action.

**Description:** Implement the `deleteNotification` Server Action for Notifications. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-252

Add Notification pagination with a default page size of 100 documents.

**Description:** Add Notification pagination with a default page size of 100 documents to Notifications. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

## T-253

Add Notification sorting.

**Description:** Add Notification sorting to Notifications. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

# Trash

## T-254

Create the Trash page structure.

**Description:** Build the Trash page for Trash with the shared application layout, the required data and actions, and clear loading, empty, and error states. Ensure the route is accessible and responsive.

---

## T-255

Create the `getTrashedTasks` Server Action.

**Description:** Implement the `getTrashedTasks` Server Action for Trash. Authenticate the caller, authorize access to the requested data, validate query parameters, and return a typed result with safe errors.

---

## T-256

Display trashed Tasks.

**Description:** Display trashed Tasks in Trash using the persisted data and shared visual patterns. Include the relevant empty and loading states and ensure the content remains readable on mobile and with assistive technology.

---

## T-257

Create the `getTrashedGroups` Server Action.

**Description:** Implement the `getTrashedGroups` Server Action for Trash. Authenticate the caller, authorize access to the requested data, validate query parameters, and return a typed result with safe errors.

---

## T-258

Display trashed Groups.

**Description:** Display trashed Groups in Trash using the persisted data and shared visual patterns. Include the relevant empty and loading states and ensure the content remains readable on mobile and with assistive technology.

---

## T-259

Create the `getTrashedNotes` Server Action.

**Description:** Implement the `getTrashedNotes` Server Action for Trash. Authenticate the caller, authorize access to the requested data, validate query parameters, and return a typed result with safe errors.

---

## T-260

Display trashed Notes.

**Description:** Display trashed Notes in Trash using the persisted data and shared visual patterns. Include the relevant empty and loading states and ensure the content remains readable on mobile and with assistive technology.

---

## T-261

Create Trash resource-type filters and pagination with a default page size of 100 documents.

**Description:** Create Trash resource-type filters and pagination with a default page size of 100 documents for Trash. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-262

Add Trash item sorting.

**Description:** Add Trash item sorting to Trash. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

## T-263

Add Restore action to Trash items.

**Description:** Add Restore action to Trash items. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-264

Add Permanent Delete action to Trash items.

**Description:** Add Permanent Delete action to Trash items. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-265

Create the Empty Trash Server Action.

**Description:** Implement the `Empty Trash` Server Action for Trash. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-266

Add Empty Trash confirmation dialog.

**Description:** Add Empty Trash confirmation dialog to Trash. Show it at the appropriate point in the user flow, keep the layout clear, and provide accessible text or controls for the relevant state.

---

# Profile

## T-267

Create the Profile page.

**Description:** Build the Profile page for Profile with the shared application layout, the required data and actions, and clear loading, empty, and error states. Ensure the route is accessible and responsive.

---

## T-268

Create the `getProfile` Server Action.

**Description:** Implement the `getProfile` Server Action for Profile. Authenticate the caller, authorize access to the requested data, validate query parameters, and return a typed result with safe errors.

---

## T-269

Load the Profile page through the `getProfile` Server Action.

**Description:** Load the Profile page through the `getProfile` Server Action through the specified data source, validate the result, and provide clear loading, empty, and failure states.

---

## T-270

Create the Profile form.

**Description:** Build the Profile form for Profile with labeled, accessible controls, sensible defaults, field-level validation, and pending, error, and success feedback. Connect submission to its intended Server Action when specified.

---

## T-271

Add first name field.

**Description:** Add first name field to Profile. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-272

Add last name field.

**Description:** Add last name field to Profile. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-273

Add display name field.

**Description:** Add display name field to Profile. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-274

Add bio field.

**Description:** Add bio field to Profile. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-275

Add the username field and unique username validation to Profile settings.

**Description:** Add the username field and unique username validation to Profile settings. Define its type, validation rules, and defaults where needed, then carry it through the relevant forms, Server Actions, persistence, and display.

---

## T-276

Create the `updateUsername` Server Action.

**Description:** Implement the `updateUsername` Server Action for Profile. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-277

Connect username updates to the `updateUsername` Server Action.

**Description:** Connect username updates to the `updateUsername` Server Action end to end within Profile. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

## T-278

Create the `updateProfile` Server Action.

**Description:** Implement the `updateProfile` Server Action for Profile. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-279

Connect Profile form to the Server Action.

**Description:** Connect Profile form to the Server Action end to end within Profile. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

# Avatar

## T-280

Create the Avatar upload UI.

**Description:** Build the Avatar upload interface for Avatar using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-281

Create Avatar file type validation.

**Description:** Create Avatar file type validation for Avatar. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-282

Create Avatar file size validation.

**Description:** Create Avatar file size validation for Avatar. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-283

Create Avatar image preview.

**Description:** Create Avatar image preview for Avatar. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-284

Create the Avatar upload Server Action.

**Description:** Implement the `Avatar upload` Server Action for Avatar. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-285

Connect Avatar upload to UploadThing storage.

**Description:** Connect Avatar upload to UploadThing storage end to end within Avatar. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

## T-286

Store Avatar reference in the User model.

**Description:** Store Avatar reference in the User model in the appropriate model, validate it at input boundaries, and expose it only to authorized flows.

---

## T-287

Create the Replace Avatar Server Action.

**Description:** Implement the `Replace Avatar` Server Action for Avatar. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-288

Create the Remove Avatar Server Action.

**Description:** Implement the `Remove Avatar` Server Action for Avatar. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

# Account Settings

## T-289

Create the Account Settings page.

**Description:** Build the Account Settings page for Account Settings with the shared application layout, the required data and actions, and clear loading, empty, and error states. Ensure the route is accessible and responsive.

---

## T-290

Create the Change Password form.

**Description:** Build the Change Password form for Account Settings with labeled, accessible controls, sensible defaults, field-level validation, and pending, error, and success feedback. Connect submission to its intended Server Action when specified.

---

## T-291

Create Change Password validation.

**Description:** Create Change Password validation for Account Settings. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-292

Create the `changePassword` Server Action.

**Description:** Implement the `changePassword` Server Action for Account Settings. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-293

Connect Change Password form to the Server Action.

**Description:** Connect Change Password form to the Server Action end to end within Account Settings. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

## T-294

Create the `getUserPreferences` Server Action.

**Description:** Implement the `getUserPreferences` Server Action for Account Settings. Authenticate the caller, authorize access to the requested data, validate query parameters, and return a typed result with safe errors.

---

## T-295

Load Settings pages through the `getUserPreferences` Server Action.

**Description:** Load Settings pages through the `getUserPreferences` Server Action through the specified data source, validate the result, and provide clear loading, empty, and failure states.

---

# Appearance Settings

## T-296

Create the Appearance Settings page.

**Description:** Build the Appearance Settings page for Appearance Settings with the shared application layout, the required data and actions, and clear loading, empty, and error states. Ensure the route is accessible and responsive.

---

## T-297

Create the Light Theme option.

**Description:** Create the Light Theme option for Appearance Settings. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-298

Create the Dark Theme option.

**Description:** Create the Dark Theme option for Appearance Settings. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-299

Create the System Theme option.

**Description:** Create the System Theme option for Appearance Settings. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-300

Create the `updateThemePreference` Server Action.

**Description:** Implement the `updateThemePreference` Server Action for Appearance Settings. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-301

Connect Theme preference controls to the `updateThemePreference` Server Action.

**Description:** Connect Theme preference controls to the `updateThemePreference` Server Action end to end within Appearance Settings. Pass the right inputs and state, handle pending and error results, provide accessible feedback, and refresh affected data after success.

---

## T-302

Load the saved Theme through the `getUserPreferences` Server Action.

**Description:** Load the saved Theme through the `getUserPreferences` Server Action through the specified data source, validate the result, and provide clear loading, empty, and failure states.

---

## T-303

Prevent visible Theme flashing during initial page load.

**Description:** Prevent visible Theme flashing during initial page load with route-level session checks and the correct redirect behavior for authenticated and unauthenticated users.

---

# Task View Settings

## T-304

Create the Task View Settings section.

**Description:** Create the Task View Settings section for Task View Settings. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-305

Add List View preference option.

**Description:** Add List View preference option to Task View Settings. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-306

Add Table View preference option.

**Description:** Add Table View preference option to Task View Settings. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-307

Add Drag & Drop View preference option.

**Description:** Add Drag & Drop View preference option to Task View Settings. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-308

Add default Task View field to user settings.

**Description:** Add default Task View field to user settings. Define its type, validation rules, and defaults where needed, then carry it through the relevant forms, Server Actions, persistence, and display.

---

## T-309

Create the Update Task View Preference Server Action.

**Description:** Implement the `Update Task View Preference` Server Action for Task View Settings. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-310

Load the user's preferred Task View through the `getUserPreferences` Server Action.

**Description:** Load the user's preferred Task View through the `getUserPreferences` Server Action through the specified data source, validate the result, and provide clear loading, empty, and failure states.

---

## T-311

Automatically open Tasks using the preferred View.

**Description:** Automatically open Tasks using the preferred View based on the saved preference, without requiring an extra user action, and keep manual view switching available.

---

# Responsive Design

## T-312

Make the Header responsive.

**Description:** Make the Header responsive across mobile, tablet, and desktop widths. Preserve usable navigation, readable content, and accessible controls at each size.

---

## T-313

Make the Sidebar responsive.

**Description:** Make the Sidebar responsive across mobile, tablet, and desktop widths. Preserve usable navigation, readable content, and accessible controls at each size.

---

## T-314

Make Dashboard responsive.

**Description:** Make Dashboard responsive across mobile, tablet, and desktop widths. Preserve usable navigation, readable content, and accessible controls at each size.

---

## T-315

Make Task List View responsive.

**Description:** Make Task List View responsive across mobile, tablet, and desktop widths. Preserve usable navigation, readable content, and accessible controls at each size.

---

## T-316

Make Task Table View responsive.

**Description:** Make Task Table View responsive across mobile, tablet, and desktop widths. Preserve usable navigation, readable content, and accessible controls at each size.

---

## T-317

Make Drag & Drop View responsive.

**Description:** Make Drag & Drop View responsive across mobile, tablet, and desktop widths. Preserve usable navigation, readable content, and accessible controls at each size.

---

## T-318

Make Groups pages responsive.

**Description:** Make Groups pages responsive across mobile, tablet, and desktop widths. Preserve usable navigation, readable content, and accessible controls at each size.

---

## T-319

Make Notes pages responsive.

**Description:** Make Notes pages responsive across mobile, tablet, and desktop widths. Preserve usable navigation, readable content, and accessible controls at each size.

---

## T-320

Make Settings pages responsive.

**Description:** Make Settings pages responsive across mobile, tablet, and desktop widths. Preserve usable navigation, readable content, and accessible controls at each size.

---

## T-321

Make the Trash page responsive.

**Description:** Make the Trash page responsive across mobile, tablet, and desktop widths. Preserve usable navigation, readable content, and accessible controls at each size.

---

## T-322

Make the Notifications page responsive.

**Description:** Make the Notifications page responsive across mobile, tablet, and desktop widths. Preserve usable navigation, readable content, and accessible controls at each size.

---

# UX Improvements

## T-323

Add global toast feedback.

**Description:** Add global toast feedback to UX Improvements. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-324

Add loading states to Server Action forms.

**Description:** Add loading states to Server Action forms. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-325

Add skeletons to Task pages.

**Description:** Add skeletons to Task pages. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-326

Add skeletons to Dashboard.

**Description:** Add skeletons to Dashboard. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-327

Add skeletons to Notes pages.

**Description:** Add skeletons to Notes pages. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-328

Add empty states to Tasks.

**Description:** Add empty states to Tasks. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-329

Add empty states to Groups.

**Description:** Add empty states to Groups. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-330

Add empty states to Notes.

**Description:** Add empty states to Notes. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-331

Add empty state to Notifications.

**Description:** Add empty state to Notifications. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-332

Add empty state to Trash.

**Description:** Add empty state to Trash. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-333

Add confirmation dialogs to destructive operations.

**Description:** Add confirmation dialogs to destructive operations. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

# Performance

## T-334

Implement targeted cache revalidation in every mutation Server Action.

**Description:** Implement the `targeted cache revalidation in every mutation` Server Action for Performance. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-335

Audit Server and Client Component boundaries.

**Description:** Inspect Server and Client Component boundaries across Performance, verify it follows the stated security, access, or implementation requirements, and fix or record any gaps found.

---

## T-336

Remove unnecessary `"use client"` directives.

**Description:** Remove unnecessary `"use client"` directives where they are not required by the application's framework conventions, and verify the affected routes and components still work.

---

## T-337

Dynamically load the Tiptap Editor.

**Description:** Dynamically load the Tiptap Editor so its client code is loaded only when needed, with an appropriate fallback while it initializes.

---

## T-338

Optimize React Query cache invalidation.

**Description:** Optimize React Query cache invalidation to reduce unnecessary work and data transfer while preserving correct results and cache behavior.

---

## T-339

Optimize MongoDB field selection.

**Description:** Optimize MongoDB field selection to reduce unnecessary work and data transfer while preserving correct results and cache behavior.

---

## T-340

Add required MongoDB indexes.

**Description:** Add required MongoDB indexes to Performance. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-341

Optimize pagination queries.

**Description:** Optimize pagination queries to reduce unnecessary work and data transfer while preserving correct results and cache behavior.

---

## T-342

Optimize avatar image loading.

**Description:** Optimize avatar image loading to reduce unnecessary work and data transfer while preserving correct results and cache behavior.

---

## T-343

Configure `next/image` where appropriate.

**Description:** Configure `next/image` where appropriate for Performance so it works with the existing application setup. Include the required defaults, integration points, and validation, and document any settings developers must provide.

---

# Security

## T-344

Audit authentication on every protected Server Action.

**Description:** Inspect authentication on every protected Server Action across Security, verify it follows the stated security, access, or implementation requirements, and fix or record any gaps found.

---

## T-345

Audit authorization on every resource Server Action.

**Description:** Inspect authorization on every resource Server Action across Security, verify it follows the stated security, access, or implementation requirements, and fix or record any gaps found.

---

## T-346

Audit resource ownership checks.

**Description:** Inspect resource ownership checks across Security, verify it follows the stated security, access, or implementation requirements, and fix or record any gaps found.

---

## T-347

Audit Zod validation for every Server Action.

**Description:** Inspect Zod validation for every Server Action across Security, verify it follows the stated security, access, or implementation requirements, and fix or record any gaps found.

---

## T-348

Audit every Server Component CRUD read to ensure it enters through a Server Action.

**Description:** Inspect every Server Component CRUD read to ensure it enters through a Server Action across Security, verify it follows the stated security, access, or implementation requirements, and fix or record any gaps found.

---

## T-349

Audit that components and Route Handlers never bypass the Server Action CRUD boundary.

**Description:** Inspect that components and Route Handlers never bypass the Server Action CRUD boundary across Security, verify it follows the stated security, access, or implementation requirements, and fix or record any gaps found.

---

## T-350

Audit password and JWT security.

**Description:** Inspect password and JWT security across Security, verify it follows the stated security, access, or implementation requirements, and fix or record any gaps found.

---

## T-351

Audit HTTP-only cookie configuration.

**Description:** Inspect HTTP-only cookie configuration across Security, verify it follows the stated security, access, or implementation requirements, and fix or record any gaps found.

---

## T-352

Audit Avatar upload security.

**Description:** Inspect Avatar upload security across Security, verify it follows the stated security, access, or implementation requirements, and fix or record any gaps found.

---

## T-353

Add rich-text sanitization for Notes.

**Description:** Add rich-text sanitization for Notes to Security. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

# Error Handling

## T-354

Create shared application error types.

**Description:** Create shared application error types for Error Handling. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-355

Standardize Server Action responses.

**Description:** Standardize Server Action responses across the feature so callers receive predictable typed results and consistent success and error handling.

---

## T-356

Handle validation errors consistently.

**Description:** Handle validation errors consistently consistently, including validation, safe user feedback, and the appropriate recovery or rejection behavior.

---

## T-357

Handle authentication errors consistently.

**Description:** Handle authentication errors consistently consistently, including validation, safe user feedback, and the appropriate recovery or rejection behavior.

---

## T-358

Handle authorization errors consistently.

**Description:** Handle authorization errors consistently consistently, including validation, safe user feedback, and the appropriate recovery or rejection behavior.

---

## T-359

Handle not-found errors consistently.

**Description:** Handle not-found errors consistently consistently, including validation, safe user feedback, and the appropriate recovery or rejection behavior.

---

## T-360

Create the global Next.js Error page.

**Description:** Build the global Next.js Error page for Error Handling with the shared application layout, the required data and actions, and clear loading, empty, and error states. Ensure the route is accessible and responsive.

---

## T-361

Create the global Not Found page.

**Description:** Build the global Not Found page for Error Handling with the shared application layout, the required data and actions, and clear loading, empty, and error states. Ensure the route is accessible and responsive.

---

# Email, Recovery, Sessions, and Two-Factor Authentication

## T-362

Add unique email and email-verification fields to the User model.

**Description:** Add unique email and email-verification fields to the User model with appropriate types, defaults, indexes, uniqueness, and validation. Update related schemas and ensure the fields are persisted and exposed in the required flows.

---

## T-363

Add email validation to authentication Zod schemas.

**Description:** Add email validation to authentication Zod schemas. Define its type, validation rules, and defaults where needed, then carry it through the relevant forms, Server Actions, persistence, and display.

---

## T-364

Add email to Registration and Profile forms.

**Description:** Add email to Registration and Profile forms. Define its type, validation rules, and defaults where needed, then carry it through the relevant forms, Server Actions, persistence, and display.

---

## T-365

Create the server-only transactional email service.

**Description:** Create the server-only transactional email service for Email, Recovery, Sessions, and Two-Factor Authentication. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-366

Create hashed, expiring, single-use email verification tokens.

**Description:** Create hashed, expiring, single-use email verification tokens for Email, Recovery, Sessions, and Two-Factor Authentication. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-367

Create the `sendEmailVerification` Server Action.

**Description:** Implement the `sendEmailVerification` Server Action for Email, Recovery, Sessions, and Two-Factor Authentication. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-368

Create the `verifyEmail` Server Action and verification page.

**Description:** Implement the `verifyEmail` Server Action for Email, Recovery, Sessions, and Two-Factor Authentication. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data. Also verification page as part of the same workflow.

---

## T-369

Create hashed, expiring, single-use password reset tokens.

**Description:** Create hashed, expiring, single-use password reset tokens for Email, Recovery, Sessions, and Two-Factor Authentication. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-370

Create the Forgot Password form and `requestPasswordReset` Server Action.

**Description:** Implement the `Forgot Password form and `requestPasswordReset`` Server Action for Email, Recovery, Sessions, and Two-Factor Authentication. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-371

Create the Reset Password form and `resetPassword` Server Action.

**Description:** Implement the `Reset Password form and `resetPassword`` Server Action for Email, Recovery, Sessions, and Two-Factor Authentication. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-372

Create the persisted Session model with device, activity, expiration, and revocation data.

**Description:** Create the persisted Session model with device, activity, expiration, and revocation data for Email, Recovery, Sessions, and Two-Factor Authentication. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-373

Persist and validate a Session record for every issued JWT.

**Description:** Persist and validate a Session record for every issued JWT at the data boundary, enforce ownership, and keep stored state consistent with the related authentication flow.

---

## T-374

Create the `getActiveSessions` Server Action and Active Sessions UI.

**Description:** Implement the `getActiveSessions` Server Action for Email, Recovery, Sessions, and Two-Factor Authentication. Authenticate the caller, authorize access to the requested data, validate query parameters, and return a typed result with safe errors. Also Active Sessions UI as part of the same workflow.

---

## T-375

Create the `revokeSession` Server Action.

**Description:** Implement the `revokeSession` Server Action for Email, Recovery, Sessions, and Two-Factor Authentication. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-376

Create the `logoutAllDevices` Server Action.

**Description:** Implement the `logoutAllDevices` Server Action for Email, Recovery, Sessions, and Two-Factor Authentication. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-377

Revoke other Sessions after a successful password change.

**Description:** Revoke other Sessions after a successful password change after the triggering security event and ensure revoked credentials can no longer access protected resources.

---

## T-378

Add two-factor authentication fields and encrypted secret handling.

**Description:** Add two-factor authentication fields and encrypted secret handling to Email, Recovery, Sessions, and Two-Factor Authentication. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-379

Create the two-factor setup, confirmation, and recovery-code flow.

**Description:** Create the two-factor setup, confirmation, and recovery-code flow for Email, Recovery, Sessions, and Two-Factor Authentication. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-380

Require a two-factor challenge during Login when enabled.

**Description:** Require a two-factor challenge during Login when enabled before completing the protected operation, and reject missing or invalid challenges without exposing sensitive details.

---

## T-381

Create the `disableTwoFactorAuthentication` Server Action.

**Description:** Implement the `disableTwoFactorAuthentication` Server Action for Email, Recovery, Sessions, and Two-Factor Authentication. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-382

Add throttling to Login, Registration, verification, and password-recovery actions.

**Description:** Add throttling to Login, Registration, verification, and password-recovery actions. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-383

Create the Security Event model and server-side event service.

**Description:** Create the Security Event model and server-side event service for Email, Recovery, Sessions, and Two-Factor Authentication. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-384

Record Login, password, email, two-factor, Session, and account security events.

**Description:** Record Login, password, email, two-factor, Session, and account security events with the relevant actor, resource, and timestamp, while preventing unauthorized access to the resulting history.

---

## T-385

Create the Security Event history page and paginated Server Action.

**Description:** Implement the `Security Event history page and paginated` Server Action for Email, Recovery, Sessions, and Two-Factor Authentication. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

# Tags and Labels

## T-386

Create the Tag Mongoose model, types, and Zod schemas.

**Description:** Define the Tag persistence model and its TypeScript and validation contracts. Specify required fields, defaults, references, indexes, and lifecycle rules, and keep the model aligned with its Zod schemas.

---

## T-387

Create Tag query keys and the Tag service.

**Description:** Create Tag query keys and the Tag service for Tags and Labels. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-388

Create the `createTag`, `getTags`, `updateTag`, and `deleteTag` Server Actions.

**Description:** Create the `createTag`, `getTags`, `updateTag`, and `deleteTag` Server Actions for Tags and Labels. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-389

Create Tag management UI with names and colors.

**Description:** Create Tag management UI with names and colors for Tags and Labels. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-390

Create the `mergeTags` Server Action and merge confirmation UI.

**Description:** Implement the `mergeTags` Server Action for Tags and Labels. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data. Also merge confirmation UI as part of the same workflow.

---

## T-391

Add multiple Tag selection to Task forms.

**Description:** Add multiple Tag selection to Task forms. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-392

Add multiple Tag selection to Note forms.

**Description:** Add multiple Tag selection to Note forms. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-393

Display Tags on Task cards, the Task Details drawer, and Note details pages.

**Description:** Display persisted Tags on Task cards, inside the Task Details drawer, and on Note details pages in Tags and Labels. Include relevant empty and loading states and keep the content readable on mobile and with assistive technology.

---

## T-394

Add Task and Note filtering by Tag.

**Description:** Add Task and Note filtering by Tag to Tags and Labels. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

# Subtasks and Checklists

## T-395

Add ordered checklist items to the Task model and validation schemas.

**Description:** Add ordered checklist items to the Task model and validation schemas. Define its type, validation rules, and defaults where needed, then carry it through the relevant forms, Server Actions, persistence, and display.

---

## T-396

Create checklist item add, edit, complete, delete, and reorder Server Actions.

**Description:** Create checklist item add, edit, complete, delete, and reorder Server Actions for Subtasks and Checklists. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-397

Create the Task checklist editor UI.

**Description:** Build the Task checklist editor interface for Subtasks and Checklists using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-398

Display checklist progress on Task cards and in the Task Details drawer.

**Description:** Display persisted checklist progress on Task cards and in the Task Details drawer in Subtasks and Checklists. Include relevant empty and loading states and keep the content readable on mobile and with assistive technology.

---

## T-399

Create the `promoteChecklistItemToTask` Server Action.

**Description:** Implement the `promoteChecklistItemToTask` Server Action for Subtasks and Checklists. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-400

Add checklist-item promotion controls and success feedback.

**Description:** Add checklist-item promotion controls and success feedback to Subtasks and Checklists. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

# Recurring Tasks

## T-401

Add recurrence fields and recurrence validation to the Task model.

**Description:** Add recurrence fields and recurrence validation to the Task model with appropriate types, defaults, indexes, uniqueness, and validation. Update related schemas and ensure the fields are persisted and exposed in the required flows.

---

## T-402

Create daily, weekly, monthly, weekday, and custom recurrence rules.

**Description:** Create daily, weekly, monthly, weekday, and custom recurrence rules for Recurring Tasks. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-403

Create the Recurrence Editor using Gregorian dates.

**Description:** Create the Recurrence Editor using Gregorian dates for Recurring Tasks. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-404

Create the `updateTaskRecurrence` Server Action.

**Description:** Implement the `updateTaskRecurrence` Server Action for Recurring Tasks. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-405

Generate the next Task occurrence after recurring Task completion.

**Description:** Generate the next Task occurrence after recurring Task completion at the defined lifecycle point and make the operation safe to retry without producing duplicate records.

---

## T-406

Create pause, resume, and end recurrence Server Actions and controls.

**Description:** Create pause, resume, and end recurrence Server Actions and controls for Recurring Tasks. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-407

Make recurring-task generation idempotent and retry-safe.

**Description:** Make recurring-task generation safe to retry by recording or deriving a stable occurrence key and preventing duplicate next occurrences when a job or action runs more than once.

---

# Reminders, Push Notifications, and PWA

## T-408

Add multiple Reminder fields and validation to the Task model.

**Description:** Add multiple Reminder fields and validation to the Task model with appropriate types, defaults, indexes, uniqueness, and validation. Update related schemas and ensure the fields are persisted and exposed in the required flows.

---

## T-409

Create Reminder add, update, dismiss, snooze, and delete Server Actions.

**Description:** Create Reminder add, update, dismiss, snooze, and delete Server Actions for Reminders, Push Notifications, and PWA. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-410

Create the Gregorian Reminder Picker UI.

**Description:** Build the Gregorian Reminder Picker interface for Reminders, Push Notifications, and PWA using shared components and design tokens. Support English labels, required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-411

Create the Push Subscription model, types, and validation.

**Description:** Create the Push Subscription model, types, and validation for Reminders, Push Notifications, and PWA. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-412

Create subscribe, list, and unsubscribe Push Subscription Server Actions.

**Description:** Create subscribe, list, and unsubscribe Push Subscription Server Actions for Reminders, Push Notifications, and PWA. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-413

Create the notification-permission and subscription UI.

**Description:** Build the notification-permission and subscription interface for Reminders, Push Notifications, and PWA using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-414

Create and register the application Service Worker.

**Description:** Create and register the application Service Worker for Reminders, Push Notifications, and PWA. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-415

Configure the PWA manifest, icons, install prompt, and update prompt.

**Description:** Configure the PWA manifest, icons, install prompt, and update prompt for Reminders, Push Notifications, and PWA so it works with the existing application setup. Include the required defaults, integration points, and validation, and document any settings developers must provide.

---

## T-416

Create the scheduled Reminder delivery system Server Action.

**Description:** Implement the `scheduled Reminder delivery system` Server Action for Reminders, Push Notifications, and PWA. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-417

Deliver in-app and browser Push notifications without duplicates.

**Description:** Deliver in-app and browser Push notifications without duplicates reliably, prevent duplicate delivery, and handle expired destinations and retryable failures.

---

## T-418

Remove expired or invalid Push Subscriptions.

**Description:** Remove expired or invalid Push Subscriptions when delivery reports that they can no longer receive notifications. Keep transient delivery failures retryable and avoid deleting subscriptions owned by another user.

---

## T-419

Create offline and reconnect indicators.

**Description:** Create offline and reconnect indicators for Reminders, Push Notifications, and PWA. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

# Gregorian Calendar

## T-420

Create the Gregorian Calendar page and navigation.

**Description:** Create the Gregorian Calendar page and navigation. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-421

Create Gregorian Month, Week, and Agenda views.

**Description:** Create Gregorian Month, Week, and Agenda views with English labels. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-422

Create the `getCalendarTasks` Server Action with authorized date-range queries.

**Description:** Create the `getCalendarTasks` Server Action with authorized Gregorian date-range queries. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-423

Display due, completed, recurring, and reminder Tasks on the Calendar.

**Description:** Display due, completed, recurring, and reminder Tasks on the Gregorian Calendar using the persisted data and shared visual patterns. Use English labels, include relevant empty and loading states, and ensure the content remains readable on mobile and with assistive technology.

---

## T-424

Add drag-to-reschedule through the `updateTask` Server Action.

**Description:** Add drag-to-reschedule through the `updateTask` Server Action to the Gregorian Calendar. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-425

Add Today navigation and timezone-aware Gregorian date boundaries.

**Description:** Add Today navigation and timezone-aware Gregorian date boundaries to the Calendar. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

# Smart Lists and Saved Filters

## T-426

Create Today, This Week, Overdue, High Priority, No Group, and Completed Smart Lists.

**Description:** Create Today, This Week, Overdue, High Priority, No Group, and Completed Smart Lists for Smart Lists and Saved Filters. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-427

Create the Saved Filter Mongoose model, types, and Zod schemas.

**Description:** Define the Saved Filter persistence model and its TypeScript and validation contracts. Specify required fields, defaults, references, indexes, and lifecycle rules, and keep the model aligned with its Zod schemas.

---

## T-428

Create Saved Filter query keys and service.

**Description:** Create Saved Filter query keys and service for Smart Lists and Saved Filters. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-429

Create the `createSavedFilter`, `getSavedFilters`, `updateSavedFilter`, and `deleteSavedFilter` Server Actions.

**Description:** Create the `createSavedFilter`, `getSavedFilters`, `updateSavedFilter`, and `deleteSavedFilter` Server Actions for Smart Lists and Saved Filters. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-430

Create Save Current Filter and Manage Saved Filters UI.

**Description:** Build the Save Current Filter and Manage Saved Filters interface for Smart Lists and Saved Filters using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-431

Add Smart Lists and Saved Filters to navigation.

**Description:** Add Smart Lists and Saved Filters to navigation. Keep the selected value in application state, apply it to the results, and preserve it through URL parameters and navigation where specified.

---

# Task Templates

## T-432

Create the Task Template Mongoose model, types, and Zod schemas.

**Description:** Define the Task Template persistence model and its TypeScript and validation contracts. Specify required fields, defaults, references, indexes, and lifecycle rules, and keep the model aligned with its Zod schemas.

---

## T-433

Create Task Template query keys and service.

**Description:** Create Task Template query keys and service for Task Templates. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-434

Create the `createTemplateFromTask` Server Action.

**Description:** Implement the `createTemplateFromTask` Server Action for Task Templates. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-435

Create the `createTaskFromTemplate` Server Action.

**Description:** Implement the `createTaskFromTemplate` Server Action for Task Templates. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-436

Create Task Template update and delete Server Actions.

**Description:** Create Task Template update and delete Server Actions for Task Templates. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-437

Create Task Template management and selection UI.

**Description:** Build the Task Template management and selection interface for Task Templates using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-438

Support Tags, checklist items, recurrence, priority, and Group defaults in templates.

**Description:** Support Tags, checklist items, recurrence, priority, and Group defaults in templates in the relevant creation and editing flows, validate the values, and preserve them when resources are instantiated.

---

# Task Dependencies

## T-439

Add Task dependency fields and validation.

**Description:** Add Task dependency fields and validation to Task Dependencies. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-440

Create add and remove Task dependency Server Actions.

**Description:** Create add and remove Task dependency Server Actions for Task Dependencies. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-441

Reject cross-user or unauthorized cross-workspace dependencies.

**Description:** Reject Task dependencies that cross user ownership or workspace boundaries unless both tasks are accessible within the same authorized scope. Return a validation error before saving the relationship.

---

## T-442

Detect and reject circular Task dependencies.

**Description:** Detect and reject circular Task dependencies before saving changes, and return a clear validation error that identifies the invalid relationship.

---

## T-443

Create the Dependency Picker and dependency graph UI.

**Description:** Build the Dependency Picker and dependency graph interface for Task Dependencies using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-444

Warn before completing a Task with incomplete dependencies.

**Description:** Warn the user when before completing a Task with incomplete dependencies and explain what remains incomplete before allowing the action to continue.

---

# Archive

## T-445

Add archive fields to Task and Note models and schemas.

**Description:** Add archive fields to Task and Note models and schemas. Define its type, validation rules, and defaults where needed, then carry it through the relevant forms, Server Actions, persistence, and display.

---

## T-446

Create Task and Note archive and restore Server Actions.

**Description:** Create Task and Note archive and restore Server Actions for Archive. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-447

Exclude archived resources from normal and Trash queries.

**Description:** Exclude archived resources from normal and Trash queries from the relevant queries and views, while keeping the resource available through its intended recovery or archive flow.

---

## T-448

Create the Archive page and paginated `getArchivedItems` Server Action.

**Description:** Implement the `Archive page and paginated `getArchivedItems`` Server Action for Archive. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-449

Create Archive resource filters, sorting, and empty states.

**Description:** Create Archive resource filters, sorting, and empty states for Archive. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-450

Add permanent deletion from Archive with confirmation.

**Description:** Add permanent deletion from Archive with confirmation to Archive. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

# Command Palette and Keyboard Shortcuts

## T-451

Create the global Command Palette component.

**Description:** Build the global Command Palette interface for Command Palette and Keyboard Shortcuts using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-452

Add commands for navigation, search, Task creation, and status changes.

**Description:** Add commands for navigation, search, Task creation, and status changes to Command Palette and Keyboard Shortcuts. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

## T-453

Create configurable keyboard shortcuts and conflict handling.

**Description:** Create configurable keyboard shortcuts and conflict handling for Command Palette and Keyboard Shortcuts. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-454

Create the Keyboard Shortcut reference dialog.

**Description:** Build the Keyboard Shortcut reference interface for Command Palette and Keyboard Shortcuts using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-455

Audit Command Palette accessibility and LTR keyboard behavior.

**Description:** Inspect Command Palette accessibility and LTR keyboard behavior across Command Palette and Keyboard Shortcuts, verify it follows the stated security, access, or implementation requirements, and fix or record any gaps found.

---

# Global Search

## T-456

Define the authorized cross-resource search contract and result types.

**Description:** Define the authorized cross-resource search contract and result types with explicit field shapes, validation rules, and access constraints so dependent actions and UI use a consistent contract.

---

## T-457

Create search indexes for Tasks, Groups, Notes, Notifications, Comments, and Workspaces.

**Description:** Create search indexes for Tasks, Groups, Notes, Notifications, Comments, and Workspaces for Global Search. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-458

Create the `globalSearch` Server Action.

**Description:** Implement the `globalSearch` Server Action for Global Search. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-459

Create the Global Search dialog and results page.

**Description:** Build the Global Search dialog and results page for Global Search with the shared application layout, the required data and actions, and clear loading, empty, and error states. Ensure the route is accessible and responsive.

---

## T-460

Add full-text search for Note content.

**Description:** Add full-text search for Note content to Global Search. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

## T-461

Add autocomplete suggestions and highlighted matches.

**Description:** Add autocomplete suggestions and highlighted matches to Global Search. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-462

Add faceted Global Search filters and pagination.

**Description:** Add faceted Global Search filters and pagination to Global Search. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

## T-463

Create recent-search Server Actions and history UI.

**Description:** Build the recent-search Server Actions and history interface for Global Search using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-464

Enforce private ownership and workspace membership in every search result.

**Description:** Enforce private ownership and workspace membership in every search result at the server boundary for every relevant result, including records returned through nested or shared-resource queries.

---

# Task and Note Attachments

## T-465

Create the Attachment Mongoose model, types, and Zod schemas.

**Description:** Define the Attachment persistence model and its TypeScript and validation contracts. Specify required fields, defaults, references, indexes, and lifecycle rules, and keep the model aligned with its Zod schemas.

---

## T-466

Create authenticated UploadThing file routes for Task and Note attachments.

**Description:** Create authenticated UploadThing file routes for Task and Note attachments for Task and Note Attachments. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-467

Configure attachment file-type, file-size, and file-count limits.

**Description:** Configure attachment file-type, file-size, and file-count limits for Task and Note Attachments so it works with the existing application setup. Include the required defaults, integration points, and validation, and document any settings developers must provide.

---

## T-468

Create the `createAttachmentReference` Server Action.

**Description:** Implement the `createAttachmentReference` Server Action for Task and Note Attachments. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-469

Create the `getAttachments` Server Action.

**Description:** Implement the `getAttachments` Server Action for Task and Note Attachments. Authenticate the caller, authorize access to the requested data, validate query parameters, and return a typed result with safe errors.

---

## T-470

Create the `removeAttachment` Server Action and delete the UploadThing file.

**Description:** Implement the `removeAttachment` Server Action for Task and Note Attachments. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data. Also delete the UploadThing file as part of the same workflow.

---

## T-471

Create multiple-file upload, progress, retry, preview, download, and removal UI.

**Description:** Build the multiple-file upload, progress, retry, preview, download, and removal interface for Task and Note Attachments using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-472

Add private attachment access and ownership validation.

**Description:** Add private attachment access and ownership validation to Task and Note Attachments. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-473

Display per-user and per-workspace storage usage.

**Description:** Display per-user and per-workspace storage usage in Task and Note Attachments using the persisted data and shared visual patterns. Include the relevant empty and loading states and ensure the content remains readable on mobile and with assistive technology.

---

## T-474

Create scheduled orphaned UploadThing file cleanup.

**Description:** Create scheduled orphaned UploadThing file cleanup for Task and Note Attachments. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

# Data Export, Import, Backup, and Recovery

## T-475

Define versioned JSON and CSV export formats.

**Description:** Define versioned JSON and CSV export formats with explicit field shapes, validation rules, and access constraints so dependent actions and UI use a consistent contract.

---

## T-476

Create the `exportAccountData` Server Action without credential material.

**Description:** Create the `exportAccountData` Server Action without credential material for Data Export, Import, Backup, and Recovery. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-477

Create the `exportTasksCsv` Server Action.

**Description:** Implement the `exportTasksCsv` Server Action for Data Export, Import, Backup, and Recovery. Authenticate the caller, authorize access to the requested data, validate query parameters, and return a typed result with safe errors.

---

## T-478

Create account data and Task CSV export UI.

**Description:** Build the account data and Task CSV export interface for Data Export, Import, Backup, and Recovery using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-479

Create JSON and CSV import schemas and file validation.

**Description:** Create JSON and CSV import schemas and file validation for Data Export, Import, Backup, and Recovery. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-480

Create the `previewImport` Server Action with duplicate detection.

**Description:** Create the `previewImport` Server Action with duplicate detection for Data Export, Import, Backup, and Recovery. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-481

Create the Import preview, error report, and confirmation UI.

**Description:** Build the Import preview, error report, and confirmation interface for Data Export, Import, Backup, and Recovery using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-482

Create the batched, idempotent `confirmImport` Server Action.

**Description:** Implement the `batched, idempotent `confirmImport`` Server Action for Data Export, Import, Backup, and Recovery. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-483

Create scheduled database backup automation and retention rules.

**Description:** Set up scheduled database backups with a defined frequency, secure storage, retention period, and cleanup policy. Record backup outcomes and failures so operators can verify recovery points and respond to failed runs.

---

## T-484

Document and test backup restoration and rollback procedures.

**Description:** Document and test backup restoration and rollback procedures with reproducible steps, expected outcomes, and recovery guidance for failures.

---

## T-485

Create compensating Server Actions for supported recent-action Undo operations.

**Description:** Create compensating Server Actions for supported recent-action Undo operations for Data Export, Import, Backup, and Recovery. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-486

Create the Undo toast and expiration behavior.

**Description:** Create the Undo toast and expiration behavior for Data Export, Import, Backup, and Recovery. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-487

Create configurable automatic Trash retention settings.

**Description:** Create configurable automatic Trash retention settings for Data Export, Import, Backup, and Recovery. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-488

Create the scheduled Trash-retention cleanup system Server Action.

**Description:** Implement the `scheduled Trash-retention cleanup system` Server Action for Data Export, Import, Backup, and Recovery. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-489

Create the account data download request flow.

**Description:** Create the account data download request flow for Data Export, Import, Backup, and Recovery. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-490

Create the permanent account deletion confirmation and reauthentication flow.

**Description:** Create the permanent account deletion confirmation and reauthentication flow for Data Export, Import, Backup, and Recovery. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-491

Create the `permanentlyDeleteAccount` Server Action.

**Description:** Implement the `permanentlyDeleteAccount` Server Action for Data Export, Import, Backup, and Recovery. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-492

Delete all account database resources and UploadThing files during permanent account deletion.

**Description:** Delete all account database resources and UploadThing files during permanent account deletion only after the authorized permanent-deletion flow, and verify related records and stored files are handled consistently.

---

# Collaboration and Workspaces

## T-493

Create Workspace, Membership, and Invitation Mongoose models.

**Description:** Create Workspace, Membership, and Invitation Mongoose models for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-494

Create Workspace, Membership, Invitation, and role validation schemas.

**Description:** Create Workspace, Membership, Invitation, and role validation schemas for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-495

Create Workspace query keys and service layer.

**Description:** Create Workspace query keys and service layer for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-496

Create Workspace create, read, update, trash, restore, and permanent-delete Server Actions.

**Description:** Create Workspace create, read, update, trash, restore, and permanent-delete Server Actions for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-497

Create the Workspace switcher, list, details, and settings pages.

**Description:** Create the Workspace switcher, list, details, and settings pages for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-498

Create Owner, Administrator, Editor, and Viewer permission policies.

**Description:** Create Owner, Administrator, Editor, and Viewer permission policies for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-499

Create the shared workspace authorization helper for Server Actions.

**Description:** Create the shared workspace authorization helper for Server Actions for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-500

Create hashed, expiring Workspace Invitation tokens.

**Description:** Create hashed, expiring Workspace Invitation tokens for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-501

Create invite, resend, cancel, accept, and decline Invitation Server Actions.

**Description:** Create invite, resend, cancel, accept, and decline Invitation Server Actions for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-502

Create invitation email templates and delivery.

**Description:** Create invitation email templates and delivery for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-503

Create the Workspace member and invitation management UI.

**Description:** Build the Workspace member and invitation management interface for Collaboration and Workspaces using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-504

Create change-role, remove-member, leave-workspace, and transfer-ownership Server Actions.

**Description:** Create change-role, remove-member, leave-workspace, and transfer-ownership Server Actions for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-505

Add workspace scope to Task, Group, Note, Tag, Template, Attachment, and Notification models.

**Description:** Add workspace scope to Task, Group, Note, Tag, Template, Attachment, and Notification models. Define its type, validation rules, and defaults where needed, then carry it through the relevant forms, Server Actions, persistence, and display.

---

## T-506

Add workspace selection to supported resource forms.

**Description:** Add workspace selection to supported resource forms. Follow the existing component and data patterns, handle relevant loading and error states, and make the behavior accessible and responsive.

---

## T-507

Create workspace-scoped Task, Group, Note, Tag, Template, and Attachment Server Actions.

**Description:** Implement workspace-scoped Task, Group, Note, Tag, Template, and Attachment actions. Require workspace membership, enforce role permissions and resource ownership, validate inputs, and scope every read or mutation to the selected workspace.

---

## T-508

Create Task assignment and unassignment Server Actions.

**Description:** Create Task assignment and unassignment Server Actions for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-509

Create the Assignee Picker and assigned-to-me filters.

**Description:** Create the Assignee Picker and assigned-to-me filters for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-510

Create the Comment Mongoose model, types, validation, and service.

**Description:** Create the Comment Mongoose model, types, validation, and service for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-511

Create Comment create, read, update, and soft-delete Server Actions.

**Description:** Create Comment create, read, update, and soft-delete Server Actions for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-512

Create Comment threads, replies, editing, and deletion UI.

**Description:** Build the Comment threads, replies, editing, and deletion interface for Collaboration and Workspaces using shared components and design tokens. Support the required interactions, accessible keyboard behavior, responsive layout, and applicable loading or error states.

---

## T-513

Create Mention parsing, authorized suggestions, and notifications.

**Description:** Create Mention parsing, authorized suggestions, and notifications for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-514

Create the Activity Event model and append-only activity service.

**Description:** Create the Activity Event model and append-only activity service for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-515

Record successful collaborative resource and membership events.

**Description:** Record successful collaborative resource and membership events with the relevant actor, resource, and timestamp, while preventing unauthorized access to the resulting history.

---

## T-516

Create the paginated Workspace Activity Feed Server Action and timeline UI.

**Description:** Implement the `paginated Workspace Activity Feed` Server Action for Collaboration and Workspaces. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data. Also timeline UI as part of the same workflow.

---

## T-517

Configure real-time delivery for committed workspace changes.

**Description:** Configure real-time delivery for committed workspace changes for Collaboration and Workspaces so it works with the existing application setup. Include the required defaults, integration points, and validation, and document any settings developers must provide.

---

## T-518

Create real-time client subscription, reconnection, and cache synchronization.

**Description:** Create real-time client subscription, reconnection, and cache synchronization for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-519

Create workspace Presence tracking and indicators.

**Description:** Create workspace Presence tracking and indicators for Collaboration and Workspaces. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-520

Audit every collaborative Server Action for membership, role, and cross-workspace isolation.

**Description:** Inspect every collaborative Server Action for membership, role, and cross-workspace isolation across Collaboration and Workspaces, verify it follows the stated security, access, or implementation requirements, and fix or record any gaps found.

---

# Reports and Productivity Insights

## T-521

Define personal and Workspace report result types and date-range schemas.

**Description:** Define personal and Workspace report result types and date-range schemas with explicit field shapes, validation rules, and access constraints so dependent actions and UI use a consistent contract.

---

## T-522

Create the authenticated `getProductivityReport` Server Action.

**Description:** Implement the `authenticated `getProductivityReport`` Server Action for Reports and Productivity Insights. Authenticate and authorize the caller, validate input, enforce resource ownership, perform the mutation through the data layer, return the shared result shape, and revalidate affected data.

---

## T-523

Calculate completion and overdue trends.

**Description:** Calculate completion and overdue trends from authorized source data, handle empty date ranges, and return typed values suitable for reports and exports.

---

## T-524

Calculate weekly and monthly completed Task totals.

**Description:** Calculate weekly and monthly completed Task totals from authorized source data, handle empty date ranges, and return typed values suitable for reports and exports.

---

## T-525

Calculate Group progress and priority distribution.

**Description:** Calculate Group progress and priority distribution from authorized source data, handle empty date ranges, and return typed values suitable for reports and exports.

---

## T-526

Calculate average completion time and productivity streaks.

**Description:** Calculate average completion time and productivity streaks from authorized source data, handle empty date ranges, and return typed values suitable for reports and exports.

---

## T-527

Create the Reports page with metric cards and accessible charts.

**Description:** Create the Reports page with metric cards and accessible charts for Reports and Productivity Insights. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-528

Create Gregorian report date-range and personal or Workspace scope controls.

**Description:** Create Gregorian report date-range and personal or Workspace scope controls for Reports and Productivity Insights. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-529

Create report CSV and printable export Server Actions.

**Description:** Create report CSV and printable export Server Actions for Reports and Productivity Insights. Define the required behavior and data contract, integrate it with related features, and handle validation, access control, and expected failure states where applicable.

---

## T-530

Optimize and index report aggregation queries.

**Description:** Optimize and index report aggregation queries to reduce unnecessary work and data transfer while preserving correct results and cache behavior.

---

# Automated Testing

## T-531

Add authentication, JWT, cookie, and session-expiration tests.

**Description:** Add authentication, JWT, cookie, and session-expiration tests to Automated Testing. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-532

Add Server Action validation, authentication, authorization, and ownership tests.

**Description:** Add Server Action validation, authentication, authorization, and ownership tests to Automated Testing. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-533

Add Task, Group, Note, Notification, Profile, and Settings CRUD tests.

**Description:** Add Task, Group, Note, Notification, Profile, and Settings CRUD tests to Automated Testing. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-534

Add Trash, cascade deletion, cascade restoration, and permanent deletion tests.

**Description:** Add Trash, cascade deletion, cascade restoration, and permanent deletion tests to Automated Testing. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-535

Add end-to-end tests for the primary authenticated user workflows.

**Description:** Add end-to-end tests for the primary authenticated user workflows to Automated Testing. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-536

Add email verification, password recovery, two-factor, throttling, and Session revocation tests.

**Description:** Add email verification, password recovery, two-factor, throttling, and Session revocation tests to Automated Testing. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-537

Add Tag, checklist, recurrence, Reminder, Calendar, and dependency tests.

**Description:** Add Tag, checklist, recurrence, Reminder, Calendar, and dependency tests to Automated Testing. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-538

Add Saved Filter, Template, Archive, Command Palette, and Global Search tests.

**Description:** Add Saved Filter, Template, Archive, Command Palette, and Global Search tests to Automated Testing. Apply the selected criteria to the displayed results, keep the controls accessible, and preserve state through navigation where the task calls for it.

---

## T-539

Add UploadThing attachment authorization, deletion, and orphan-cleanup tests.

**Description:** Add UploadThing attachment authorization, deletion, and orphan-cleanup tests to Automated Testing. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-540

Add import, export, Undo, Trash-retention, backup, and account-deletion tests.

**Description:** Add import, export, Undo, Trash-retention, backup, and account-deletion tests to Automated Testing. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-541

Add Workspace role, invitation, assignment, Comment, Mention, and isolation tests.

**Description:** Add Workspace role, invitation, assignment, Comment, Mention, and isolation tests to Automated Testing. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-542

Add real-time reconnection, Presence, Push delivery, and idempotent background-job tests.

**Description:** Add real-time reconnection, Presence, Push delivery, and idempotent background-job tests to Automated Testing. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

## T-543

Add Reports calculation, authorization, Gregorian date-range, and export tests.

**Description:** Add Reports calculation, authorization, Gregorian date-range, and export tests to Automated Testing. Integrate it with the relevant data and UI, validate input where applicable, and provide clear feedback for success, pending, and failure states.

---

# Final Quality

## T-544

Review feature-based folder boundaries.

**Description:** Review feature-based folder boundaries across Final Quality for correctness, accessibility, responsiveness, and consistency; resolve issues and confirm the expected behavior.

---

## T-545

Remove duplicated code.

**Description:** Consolidate duplicated logic into focused shared helpers or components, update callers, and confirm behavior remains consistent across the affected features.

---

## T-546

Remove unused dependencies.

**Description:** Remove unused dependencies after checking for references, and confirm the application still builds with the remaining dependencies.

---

## T-547

Remove unused components.

**Description:** Remove unused components after checking for references, and confirm the application still builds with the remaining dependencies.

---

## T-548

Remove unused Server Actions.

**Description:** Remove unused Server Actions after checking for references, and confirm the application still builds with the remaining dependencies.

---

## T-549

Review TypeScript strict-mode errors.

**Description:** Review TypeScript strict-mode errors across Final Quality for correctness, accessibility, responsiveness, and consistency; resolve issues and confirm the expected behavior.

---

## T-550

Review accessibility of forms.

**Description:** Review accessibility of forms across Final Quality for correctness, accessibility, responsiveness, and consistency; resolve issues and confirm the expected behavior.

---

## T-551

Review keyboard navigation.

**Description:** Review keyboard navigation across Final Quality for correctness, accessibility, responsiveness, and consistency; resolve issues and confirm the expected behavior.

---

## T-552

Review LTR behavior.

**Description:** Review LTR behavior across Final Quality for correctness, accessibility, responsiveness, and consistency; resolve issues and confirm the expected behavior.

---

## T-553

Review mobile usability.

**Description:** Review mobile usability across Final Quality for correctness, accessibility, responsiveness, and consistency; resolve issues and confirm the expected behavior.

---

## T-554

Review loading and empty states.

**Description:** Review loading and empty states across Final Quality for correctness, accessibility, responsiveness, and consistency; resolve issues and confirm the expected behavior.

---

## T-555

Review destructive action confirmations.

**Description:** Review destructive action confirmations across Final Quality for correctness, accessibility, responsiveness, and consistency; resolve issues and confirm the expected behavior.

---

## T-556

Review application performance.

**Description:** Review application performance across Final Quality for correctness, accessibility, responsiveness, and consistency; resolve issues and confirm the expected behavior.

---

## T-557

Review security-sensitive operations.

**Description:** Review security-sensitive operations across Final Quality for correctness, accessibility, responsiveness, and consistency; resolve issues and confirm the expected behavior.

---

## T-558

Perform the final production build check.

**Description:** Run the production build with the documented environment, resolve build-blocking errors, and record the verification outcome.

---

## T-559

Fix production build warnings and errors.

**Description:** Fix production build warnings and errors and verify the production build completes without those warnings or errors.

---

## T-560

Perform the final end-to-end application review.

**Description:** Walk through the primary user journeys from sign-in through task, group, note, settings, and recovery flows. Fix release-blocking defects and confirm responsive and accessible behavior.

---

## T-561

Prepare the application for deployment.

**Description:** Prepare a production deployment by documenting required environment configuration, build and start commands, database setup, and operational checks. Confirm the application can be built and started using the documented process.
