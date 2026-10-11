# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js App Router task management application. Routes and layouts live in `app/`; reusable components are in `components/` (`ui/` for shared UI primitives); domain code is organized by feature under `features/` (for example, `features/tasks/`). Shared hooks, services, utilities, types, and constants live in their respective root folders. Tests are in `tests/`, with shared setup in `tests/setup.ts`. Static assets belong in `public/`. Consult `context/architecture.md` and `context/rules.md` for detailed architecture and design requirements.

## Build, Test, and Development Commands

- `npm install` installs dependencies (Node.js 20.9+ and npm).
- `npm run dev` starts the local Next.js server at `http://localhost:3000`.
- `npm test` runs the Vitest suite once; `npm run test:watch` keeps it running during development.
- `npm run build` creates a production build; `npm run start` serves that build.

Set `MONGODB_URI` and a random `JWT_SECRET` (at least 32 characters) in `.env` before running the app. Keep secrets out of `NEXT_PUBLIC_` variables.

## Coding Style & Naming Conventions

Use strict TypeScript and avoid `any`. Follow existing formatting and patterns; components use PascalCase filenames, hooks use `useSomething.ts`, and utilities use camelCase. Keep files under 300 lines, components focused, and styling in Tailwind. Reuse shared components and tokens. Internal CRUD reads and writes must go through feature-owned Next.js Server Actions, with authorization and server-side validation at the action boundary. Forms use React Hook Form and feature-owned Zod schemas. Preserve accessibility and write user-facing copy in English.

## Testing Guidelines

Tests use Vitest with a jsdom environment and Testing Library. Add or update tests under `tests/` using descriptive `*.test.ts` or `*.test.tsx` names. Run `npm test` before submitting changes; there is no configured coverage threshold.

## Commit & Pull Request Guidelines

Use the history's Conventional Commit style, such as `feat(tasks): ...`, `fix(auth): ...`, or `refactor(...): ...`. Pull requests should explain the change and its user impact, link related issues or tasks, and include screenshots for visible UI changes. Note relevant test/build results and configuration changes.

## Security & Architecture

Never expose password hashes, token hashes, or other credential material. Keep data access and mutations server-side, and enforce workspace membership and role authorization in collaborative actions. Do not commit `.env` or other secrets.
