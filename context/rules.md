# Development Rules

## General Rules

- TypeScript strict mode enabled
- Avoid any type
- Prefer composition over inheritance
- Keep components small
- Route every internal CRUD operation, including reads, through a Next.js Server Action
- Never use components, Route Handlers, internal API routes, or internal HTTP endpoints to bypass the Server Action CRUD boundary
- Route scheduled CRUD through authenticated, idempotent system Server Actions
- Enforce workspace membership and role authorization in every collaborative Server Action
- Delete external UploadThing files when their application records are permanently removed
- Never export password hashes, token hashes, two-factor secrets, or other credential material
- Write all user-facing content, including success and error messages, in English; keep developer diagnostics and logs in English as well

---

## Component Rules

Maximum file size:

300 lines

If larger:

Split component

---

## Naming

Components:

PascalCase

Example:

FlashcardList.tsx

Hooks:

useSomething.ts

Example:

useDecks.ts

Utilities:

camelCase

---

## React Rules

- Functional components only
- Use hooks
- No class components
- Memoize expensive calculations

---

## Styling Rules

Use Tailwind only.

Avoid custom CSS when possible.

---

## Accessibility

All buttons:

aria-label

All forms:

label element

All dialogs:

keyboard accessible

---

## Git Rules

### Task Completion Commits

- After completing and verifying any numbered task (`T-N`), update `context/progress.md` and commit all changes made for that task with Git.
- Do not begin the next numbered task until the commit succeeds.
- Keep each numbered task in its own commit whenever practical.

Branch Naming:

feature/

bugfix/

refactor/

---

## Commit Convention

feat:

fix:

refactor:

docs:

test:

chore:

---

## Security

Never store sensitive data in localStorage.

Use secure HTTP-only cookies if backend supports them.
