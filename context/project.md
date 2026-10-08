# Project Overview

## Project Name

Orbit

## Project Description

This project is a full-stack **Task Management Application** designed to help users organize their tasks, group related tasks, create rich notes, manage their personal profile, and track activities through an integrated notification system.

The application should provide a clean, scalable, and maintainable user experience while keeping each major feature separated by responsibility.

The primary application language and all user-facing content will be **English**. Use English for navigation, forms, validation, notifications, system messages, accessible labels, and date formatting. The default locale is `en-US`, and the application layout must use **LTR (Left-to-Right)** direction.

All user-facing calendar and date-selection interfaces must use the **Gregorian calendar** with English month and weekday names. Dates may be stored as standard JavaScript dates in UTC, and must be presented and entered using the Gregorian calendar in the user's timezone.

---

# Core Features

The application consists of the following major features:

- Task Management
- Task Group Management
- Notes
- Trash System
- Notification System
- Authentication
- Authorization
- User Profile
- Avatar Upload
- Theme Management
- Recurring Tasks
- Reminders and Push Notifications
- Subtasks and Checklists
- Tags and Labels
- Gregorian Calendar
- Saved Filters and Smart Lists
- Task Templates and Dependencies
- Archive
- Global Search
- File Attachments
- Data Import, Export, and Recovery
- Account Security and Session Management
- Collaboration and Workspaces
- Reports and Productivity Insights

---

# 1. Task Management

Users must be able to manage individual tasks.

Supported operations:

- Create task
- Read task
- Update task
- Move task to trash
- Restore task from trash
- Permanently delete task

A task represents a single actionable item that belongs to a user.

A task may optionally belong to a **Task Group**.

Example task properties may include:

```text
Title
Description
Status
Priority
Due Date
Task Group
Created At
Updated At
Deleted At
```

Every task must belong to the authenticated user.

Users must never be able to access or modify another user's tasks.

---

# 2. Task Groups

Users can create groups to organize multiple related tasks.

For example:

```text
Work
Personal
Learning
University
Shopping
Side Project
```

Supported operations:

- Create task group
- Read task group
- Update task group
- Move task group to trash
- Restore task group from trash
- Permanently delete task group

A task group can contain multiple tasks.

Relationship:

```text
User
 └── Task Group
      ├── Task
      ├── Task
      ├── Task
      └── Task
```

A task group must belong to exactly one user.

A task can:

- belong to one task group
- or exist without a task group

Moving a task group to trash must also move every task belonging to that group to trash.

Permanently deleting a task group must also permanently delete every task belonging to that group.

Both cascade operations must verify that the group and all affected tasks belong to the authenticated user.

---

# 3. Notes

The application must provide a complete note-taking system.

Users can create both short and long-form notes.

Supported operations:

- Create note
- Read note
- Update note
- Move note to trash
- Restore note from trash
- Permanently delete note

Notes should support rich content using:

```text
Tiptap Editor
```

The editor should allow users to create detailed and structured notes.

Possible editor features include:

```text
Headings
Paragraphs
Bold
Italic
Underline
Strike-through
Bullet Lists
Ordered Lists
Blockquotes
Code Blocks
Links
Horizontal Rules
Undo / Redo
```

The Notes feature should be designed in a way that additional Tiptap extensions can be added later without major architectural changes.

Each note belongs exclusively to the authenticated user.

---

# 4. Trash System

Tasks, task groups, and notes must support a trash system.

The application should use **soft deletion** before permanent deletion.

Instead of immediately removing a record from the database, the record should first be marked as deleted.

Example:

```text
deletedAt: Date | null
```

Normal records:

```text
deletedAt = null
```

Trashed records:

```text
deletedAt = deletion date
```

Supported trash operations:

```text
Move to Trash
Restore
Permanently Delete
```

The Trash section should allow users to see their deleted:

- Tasks
- Task Groups
- Notes

Permanent deletion must completely remove the resource from the database.

Permanent deletion should be treated as an irreversible operation.

Task-group trash and deletion operations cascade to the tasks in that group:

```text
Trash Task Group       → Trash all Tasks in the Group
Permanently Delete Group → Permanently Delete all Tasks in the Group
```

---

# 5. Notification System

The application must contain an internal notification system.

Important user actions inside the application should generate a notification.

Examples:

```text
Task created
Task updated
Task moved to trash
Task restored
Task permanently deleted

Task group created
Task group updated
Task group moved to trash
Task group restored
Task group permanently deleted

Note created
Note updated
Note moved to trash
Note restored
Note permanently deleted

Profile updated
Avatar updated
Password changed
```

A notification should contain enough information to explain what happened.

Possible notification properties:

```text
User
Type
Title
Message
Related Resource
Read Status
Created At
```

Example:

```text
Task "Complete dashboard" was created successfully.
```

Notifications belong exclusively to the user who triggered or should receive the event.

Users must not be able to access notifications belonging to another user.

---

## Notification State

Notifications should support at least:

```text
Read
Unread
```

Users should be able to:

- View notifications
- Mark a notification as read
- Mark notifications as unread if required
- Mark all notifications as read
- Delete notifications if supported

The application should display the number of unread notifications where appropriate.

---

# 6. Authentication

The application must provide username and password authentication.

Users should be able to:

```text
Register
Login
Logout
```

Registration initially requires:

```text
Username
Email
Password
Password Confirmation
```

The username must be unique.

Passwords must never be stored as plain text.

Passwords must be securely hashed before being stored in the database.

Authentication logic must be executed exclusively on the server.

JWT authentication tokens and their secure HTTP-only cookies must have a lifetime of **180 days**.

---

# 7. Authorization

Authentication determines who the user is.

Authorization determines what the authenticated user is allowed to access.

Every protected resource must verify ownership.

This includes:

```text
Tasks
Task Groups
Notes
Notifications
Profile
Settings
```

For example, a user must never be able to access another user's task by manually changing its ID in the URL or API request.

Resource access must always validate:

```text
resource.userId === authenticatedUser.id
```

Authorization must be enforced on the server and must never rely only on the client interface.

---

# 8. User Profile

Registration only requires the minimum authentication information.

Additional user information can be completed later from the Settings / Profile page.

Possible profile information includes:

```text
Username
First Name
Last Name
Display Name
Bio
Avatar
```

The profile architecture should allow additional user information to be added later without requiring major structural changes.

---

# 9. Avatar Upload

Users must be able to upload a profile avatar from the Profile Settings section.

Avatar files must be uploaded and stored using **UploadThing**.

The feature should support:

```text
Upload Avatar
Replace Avatar
Remove Avatar
```

The application must validate uploaded files.

Validation should include:

```text
Allowed file types
Maximum file size
Valid image formats
```

Examples of acceptable formats may include:

```text
JPEG
PNG
WebP
```

The database should not directly store large image binary files unless specifically required.

Instead, the application should preferably store a reference to the uploaded image, such as:

```text
Avatar URL
File Key
Storage Identifier
```

---

# 10. Theme Management

The application must support multiple appearance modes.

Available themes:

```text
Light
Dark
System
```

### Light

Forces the application to use the light theme.

### Dark

Forces the application to use the dark theme.

### System

Automatically follows the operating system or browser theme preference.

The user's selected theme should persist between sessions.

The application should avoid visible theme flashing during the initial page load.

---

# 11. Recurring Tasks and Reminders

Tasks may use daily, weekly, monthly, weekday, or custom recurrence rules. Completing a recurring task must create its next occurrence without modifying the completed occurrence.

Tasks may have one or more reminders. Users can dismiss or snooze reminders and receive them through the application and browser push notifications. Reminder delivery must respect the user's timezone and Gregorian calendar presentation.

---

# 12. Subtasks, Tags, and Dependencies

Tasks may contain ordered checklist items with individual completion state and progress. A checklist item may be promoted to a standalone task.

Users may create colored tags and attach multiple tags to tasks and notes. Tags must support filtering, search, rename, merge, and deletion.

Tasks may declare `blocked by` and `blocks` relationships. Circular dependencies must be rejected. The UI must warn users before completing a task whose dependencies remain incomplete.

---

# 13. Calendar, Smart Lists, and Templates

The application must provide Gregorian month, week, and agenda calendar views with English labels. Users may reschedule tasks by dragging them between dates.

Built-in smart lists must include Today, This Week, Overdue, High Priority, No Group, and Completed. Users may save custom combinations of search, filters, and sorting.

Users may save reusable task templates containing task fields, tags, checklist items, recurrence, and group selection.

---

# 14. Archive and Productivity Navigation

Completed tasks and old notes may be archived without being deleted. Archived resources must be excluded from normal and Trash queries and must support restoration from Archive.

The application must provide a command palette and keyboard shortcuts for navigation, search, task creation, status changes, and common actions.

---

# 15. Global Search

Global search must cover tasks, task groups, notes, notifications, comments, and workspace content that the authenticated user is authorized to access.

Search should support autocomplete, highlighted matches, recent searches, faceted filters, and full-text search over note content. Search results must never expose another user's private resources.

---

# 16. Attachments

Tasks and notes may contain multiple UploadThing attachments. Attachments must support upload progress, preview, download, removal, file-type and size validation, ownership checks, and private access where required.

Replacing or deleting a database attachment reference must also remove the corresponding UploadThing file. Failed or abandoned uploads must be cleaned up as orphaned files.

---

# 17. Account Security and Recovery

Accounts must support a unique email address, email verification, forgotten-password recovery, active-session and device management, revoking individual sessions, logging out all devices, and two-factor authentication.

Password changes must revoke other active sessions. Authentication endpoints and Server Actions must apply login-attempt throttling and record security events. Users must be able to export their account data and permanently delete their account.

---

# 18. Data Portability and Recovery

Users must be able to export tasks as CSV and export all account data as JSON. Imports must validate data, preview changes, report errors, and detect duplicates.

The system must support scheduled database backups, documented restoration, recent-action undo, and configurable automatic Trash retention. Permanent account deletion must remove database resources and associated UploadThing files.

---

# 19. Collaboration and Workspaces

Users may create shared workspaces, invite members, and manage Owner, Administrator, Editor, and Viewer roles. Workspace resources must remain separate from private resources.

Workspace features include task assignment, shared groups and notes, comments, replies, mentions, activity feeds, invitation expiration, real-time updates, and presence indicators. Every collaborative Server Action must enforce workspace membership and role permissions.

---

# 20. Reports and Productivity Insights

The application must provide completion trends, overdue trends, completed tasks by week or month, group progress, priority distribution, average completion time, and productivity streaks.

Reports must support Gregorian date ranges, workspace or personal scope, and exportable summaries.

---

# Main Application Areas

The application will contain areas such as:

```text
Dashboard
Tasks
Task Groups
Notes
Calendar
Smart Lists
Archive
Global Search
Workspaces
Reports
Trash
Notifications
Profile
Settings
Authentication
```

A possible high-level navigation structure:

```text
Application
│
├── Dashboard
│
├── Tasks
│
├── Task Groups
│
├── Notes
│
├── Calendar
│
├── Smart Lists
│
├── Archive
│
├── Global Search
│
├── Workspaces
│
├── Reports
│
├── Trash
│
├── Notifications
│
└── Settings
    ├── Profile
    ├── Avatar
    ├── Account
    └── Appearance
```

---

# Resource Ownership

Most application resources are user-specific.

General ownership model:

```text
User
│
├── Tasks
│
├── Task Groups
│   └── Tasks
│
├── Notes
│
├── Notifications
│
├── Tags / Saved Filters / Templates
│
├── Attachments / Sessions
│
├── Profile / Settings
│
└── Workspace Memberships

Workspace
│
├── Members and Roles
├── Shared Tasks and Groups
├── Shared Notes and Attachments
├── Comments and Mentions
└── Activity Events
```

Every server-side operation must confirm resource ownership before performing:

```text
Read
Update
Delete
Restore
Permanent Delete
```

---

# Feature Relationships

The primary relationships between application entities are:

```text
User
│
├── Profile
│
├── Tasks
│   └── Optional Task Group
│
├── Task Groups
│   └── Multiple Tasks
│
├── Notes
│
└── Notifications
```

---

# Application Events

Many user actions should generate application events.

Example:

```text
User creates a task
        ↓
Task is saved
        ↓
Task creation succeeds
        ↓
Notification is created
        ↓
UI is updated
        ↓
Relevant cached queries are invalidated/refetched
```

Notifications should only be generated after the primary action succeeds.

For example, if task creation fails, a successful "Task Created" notification must not be stored.

---

# Data Integrity Rules

The application must follow these rules:

- Every task must belong to a user.
- Every task group must belong to a user.
- Every note must belong to a user.
- Every notification must belong to a user.
- A task can optionally belong to one task group.
- A task cannot belong to another user's task group.
- Users cannot access another user's resources.
- Trashed resources should not appear in normal queries.
- Permanently deleted resources cannot be restored.
- Notifications must only be created after successful operations.
- Passwords must never be stored in plain text.
- Sensitive authentication information must never be exposed to the client.
- Uploaded files must be validated before storage.
- Archived resources must not appear in normal or Trash queries.
- Task dependencies must remain within an authorized personal or workspace scope.
- Circular Task dependencies are forbidden.
- Collaborative resources must belong to a Workspace and enforce membership roles.
- Attachment metadata and UploadThing files must be deleted together.
- Exports must never contain passwords, token hashes, two-factor secrets, or other credentials.
- Scheduled mutations must be idempotent and must enter through system Server Actions.

---

# General UX Requirements

The application should provide clear feedback for user actions.

Important actions should have:

```text
Loading states
Success feedback
Error feedback
Empty states
Confirmation dialogs
```

Destructive actions such as:

```text
Move to Trash
Permanent Delete
Remove Avatar
```

should clearly communicate their consequences.

Permanent deletion should require explicit user confirmation.

Paginated queries and views must use a default page size of **100 documents**.

---

# Project Goals

The project should be designed around the following goals:

- Clean architecture
- Feature-based organization
- Strong type safety
- Secure authentication
- Proper authorization
- Clear separation of responsibilities
- Reusable components
- Scalable feature structure
- Predictable server state
- Maintainable database models
- Good user experience
- Responsive design
- English-language UI and LTR support
- Easy future expansion
- AI-agent-friendly project context

The architecture should allow new features to be added later without requiring major changes to existing features.
