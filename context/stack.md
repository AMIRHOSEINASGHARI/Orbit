# Tech Stack

This project is a **Task Management Application** built with a modern full-stack Next.js architecture.

The technologies are organized based on their responsibilities within the application.

---

## 1. Core Front-End

### Next.js

- Main React framework of the application.
- Uses the **App Router** architecture.
- Responsible for:
  - Routing
  - Layouts
  - Pages
  - Server Components
  - Client Components
  - Server Actions
  - API Route Handlers for non-CRUD external endpoints only
  - Middleware
  - Metadata management

- Provides both front-end and server-side capabilities in a single application.

### React.js

- Used internally through Next.js.
- Responsible for building reusable and interactive user interfaces.
- Used for:
  - Components
  - State-driven UI
  - Event handling
  - Hooks
  - Client-side interactions

### TypeScript

- Primary programming language of the project.
- TypeScript must run in **strict mode**.

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

- Used for:
  - Component props
  - API responses
  - Database models
  - Form data
  - Utility functions
  - Feature types
  - Application domain types

- NEVER use `any` type.

---

## 2. Styling & UI

### Tailwind CSS

- Main styling solution.

- Used for:
  - Layout
  - Responsive design
  - Spacing
  - Typography
  - Colors
  - States
  - Component styling
  - Dark mode

- Prefer reusable design tokens and consistent utility patterns.

### shadcn/ui

- Main UI component foundation of the application.

- Used for reusable interface components such as:
  - Buttons
  - Inputs
  - Dialogs
  - Dropdown menus
  - Selects
  - Checkboxes
  - Tabs
  - Tooltips
  - Popovers
  - Sheets
  - Cards
  - Forms
  - Toasts
  - Command menus

- shadcn components may be customized according to the application's design system.

---

## 3. Icons

Use Icons inside 'components/icons folder in entire application

Use icons consistently throughout the application for:

- Navigation
- Buttons
- Actions
- Task statuses
- Priorities
- Settings
- Notifications
- Search
- Filters
- User interface controls

Avoid mixing multiple unrelated icon libraries unless necessary.

---

## 4. Forms

### React Hook Form

- Main form management library.
- Used for:
  - Form state
  - Validation integration
  - Error handling
  - Form submission
  - Input registration
  - Controlled components

Examples include:

- Login form
- Registration form
- Create task form
- Edit task form
- Profile form
- Settings form
- Search/filter forms
- etc

---

## 5. Validation

### Zod

- Main schema validation library.
- Used for both client-side and server-side validation.

Use Zod for:

- Form validation
- External endpoint validation
- Server Action validation
- Query parameter validation
- Environment variable validation
- Data transformation
- Runtime type safety

Whenever possible, TypeScript types should be inferred directly from Zod schemas.

Example:

```ts
type CreateTaskInput = z.infer<typeof createTaskSchema>;
```

This prevents duplication between validation schemas and TypeScript types.

---

## 6. Server State Management

### TanStack React Query with Server Actions

- Main client-side solution for managing **server state** returned by Server Actions.

Used for:

- Invoking data-read Server Actions
- Caching Server Action results
- Synchronizing server data
- Background refetching
- Mutations
- Cache invalidation
- Loading states
- Error states
- Optimistic updates
- Pagination
- Infinite queries

Examples of server state:

```text
Tasks
Projects
Users
Notifications
Profile information
Dashboard statistics
```

React Query should not be treated as general-purpose client/global state management.

Use it specifically for data whose source of truth exists on the server.

---

## 7. Database

### MongoDB

MongoDB is the primary database used by the application.

It stores application entities such as:

```text
Users
Tasks
Projects
Notes
Notifications
Settings
Sessions
```

---

## 8. Database ODM

### Mongoose

- Main MongoDB Object Data Modeling library.
- Used exclusively in the **server-side layer**.

Responsible for:

- Database schemas
- Models
- Validation
- Relationships
- Indexes
- Queries
- Middleware
- Data transformations

Example:

```text
User Model
Task Model
Project Model
Note Model
Notification Model
```

Mongoose must never be imported directly into Client Components.

Every internal CRUD operation must enter through a Server Action.

Server Actions may delegate database work to server-side services or repositories. Components and Route Handlers must not call CRUD services, repositories, or Mongoose models as an alternative CRUD entry point.

---

## 9. Authentication

### JSON Web Token

Use `jsonwebtoken` for token-based authentication when JWT authentication is required.

Responsibilities include:

- Generating authentication tokens
- Verifying authentication tokens
- Handling authorization payloads
- Validating authenticated requests

JWT operations must only happen on the server.

Sensitive token operations must never be exposed to Client Components.

---

## 10. Password Security

### bcryptjs

Use `bcryptjs` for password hashing and password verification.

Responsibilities:

```text
Hash user passwords before storing them
Compare login passwords against stored hashes
Protect raw passwords from database exposure
```

Password hashing must happen exclusively on the server.

Raw passwords must never be stored in the database.

---

## 11. Search & Debouncing

### use-debounce

Use `use-debounce` for features where frequent user input could cause unnecessary Server Action calls.

Main use case:

```text
Search
```

Example flow:

```text
User types
      ↓
Local input state updates
      ↓
Debounce delay
      ↓
Search query changes
      ↓
React Query invokes a filtered-data Server Action
```

This prevents invoking the search Server Action after every keystroke.

It may also be used for:

- Filtering
- Autocomplete
- Dynamic suggestions
- Remote search
- Expensive client-side operations

---

## 12. File Uploads

### UploadThing

Use **UploadThing** for avatar and attachment file uploads and storage.

UploadThing is responsible for transferring and storing avatar files. Creating, replacing, or removing the avatar reference in the application database must still happen through Server Actions.

---

## 13. Search

Use MongoDB indexes for the initial authenticated global-search implementation. MongoDB Atlas Search may be enabled for autocomplete, highlighting, relevance scoring, and faceted search.

All search requests must enter through Server Actions and enforce private-resource ownership and workspace membership.

---

## 14. Push Notifications and PWA

Use the browser Service Worker, Notifications, and Push APIs for installable-app behavior and background reminder delivery.

Push subscriptions are persisted per user and device. Subscription CRUD must use Server Actions, and invalid subscriptions must be removed safely.

---

## 15. Real-Time Collaboration

Use MongoDB change streams or an equivalent managed real-time transport to broadcast committed workspace changes. Real-time transport is read-only application delivery infrastructure and must not bypass Server Actions for CRUD.

---

## 16. Background Work

Use a deployment-compatible scheduler and worker mechanism for reminders, recurring-task generation, Trash retention, orphan-file cleanup, backups, and report aggregation.

Scheduled jobs must invoke authenticated, idempotent system Server Actions. The concrete scheduler provider must be selected together with the deployment platform.

---

## 17. Email Delivery

Use a transactional email provider for verification, password recovery, workspace invitations, and security alerts. Keep the provider behind a server-only email service so it can be replaced without changing feature logic.

---

# Responsibility Overview

| Responsibility        | Technology                                 |
| --------------------- | ------------------------------------------ |
| Application Framework | Next.js                                    |
| UI Rendering          | React.js                                   |
| Type Safety           | TypeScript                                 |
| Styling               | Tailwind CSS                               |
| UI Components         | shadcn/ui                                  |
| Icons                 | Exported icons set from figma design       |
| Forms                 | React Hook Form                            |
| Schema Validation     | Zod                                        |
| External HTTP Client  | Axios, when required                       |
| Server State          | TanStack React Query                       |
| Database              | MongoDB                                    |
| Database ODM          | Mongoose                                   |
| Authentication Tokens | jsonwebtoken                               |
| Password Hashing      | bcryptjs                                   |
| Search Debouncing     | use-debounce                               |
| File Uploads          | UploadThing                                |
| Full-Text Search      | MongoDB / Atlas Search                     |
| Push Notifications    | Service Worker and Push API                |
| Real-Time Updates     | MongoDB Change Streams / Managed Transport |
| Background Work       | Deployment-Compatible Scheduler            |
| Transactional Email   | Server-Only Email Provider                 |

---

# Main Technical Principles

The project should follow these principles:

- TypeScript strict mode must remain enabled.
- Prefer Server Components by default.
- Use Client Components only when client-side interactivity is required.
- Keep database logic on the server.
- Never expose Mongoose models to Client Components.
- Validate external input using Zod.
- Use React Hook Form together with Zod for complex forms.
- Use React Query specifically for server state.
- Route every internal CRUD operation, including reads, through a Server Action.
- Keep authentication and password logic exclusively on the server.
- Use consistent shadcn/ui components throughout the application.
- Use Solar Bold/Duotone icons consistently.
- Debounce search input to avoid unnecessary Server Action calls.
- Use English (`en-US`) for user-facing text and display/accept dates with the Gregorian calendar.
- Use 100 documents as the default page size for paginated queries.
- Keep background jobs idempotent and route their CRUD through system Server Actions.
- Enforce workspace roles in every collaborative Server Action.
- Remove UploadThing files when their attachment or owning account is permanently deleted.
- Never include credential, token, or two-factor secrets in exports.
- Keep responsibilities clearly separated between UI, client data, server logic, and database layers.
