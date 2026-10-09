# Orbit

Orbit is a task management application built with Next.js and the App Router.
The interface uses English (`en-US`) and left-to-right layout.

## Getting started

Use Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

Available commands:

- `npm run dev` starts the local development server.
- `npm run build` creates a production build.
- `npm run start` serves the production build.

## Project conventions

- App Router routes and layouts live under `app/`.
- Global Tailwind styles live in `app/globals.css`.
- shadcn/ui is configured in `components.json`; generated UI components belong in `components/ui/`, and light/dark tokens live in `app/globals.css`.
- Shared interface components belong under `components/`; domain-specific code belongs under `features/` as those areas are added.
- Keep server-side data access and mutations on the server. Internal CRUD flows use Server Actions, as specified in `context/architecture.md`.
- Write user-facing copy in English and set document language and direction to `en` and `ltr`.
- Keep feature components focused and follow the project rules in `context/rules.md`.
