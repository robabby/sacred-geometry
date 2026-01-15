# Repository Guidelines

## Project Structure & Module Organization
- Source lives in `src/` with Next.js App Router under `src/app`.
- Sacred pattern pages are in `src/app/sacred-patterns` and use shared navigation helpers.
- Geometry catalog and helpers are in `src/lib/data` with a barrel at `src/lib/data/index.ts`.
- UI primitives live in `src/components/ui`; 3D scenes are in `src/components/3d`.
- Content data is YAML in `src/content`; static assets are under `public/`.
- Tests live next to modules or in `__tests__/` with `*.test.ts(x)` names.

## Build, Test, and Development Commands
- `pnpm dev`: start the Next.js dev server (Turbopack).
- `pnpm build`: production build.
- `pnpm preview`: build and run the production server.
- `pnpm start`: run the production server without rebuilding.
- `pnpm check`: ESLint + TypeScript in one pass.
- `pnpm lint` / `pnpm lint:fix`: run ESLint (optionally auto-fix).
- `pnpm typecheck`: TypeScript only.
- `pnpm format:check` / `pnpm format:write`: Prettier/Tailwind formatting.
- `pnpm test` / `pnpm test:watch`: Vitest suite.

## Coding Style & Naming Conventions
- TypeScript with strict settings; React 19, Next.js 15 App Router.
- Use path aliases like `@/lib/data` and `@/components/...`.
- Prefer `cn()` from `@/lib/utils` for class composition.
- Components/pages use PascalCase `.tsx`; hooks use `use*` naming.
- Tailwind class order is enforced by Prettier; run formatting before PRs.

## Testing Guidelines
- Framework: Vitest + React Testing Library + happy-dom.
- Name tests `*.test.ts` or `*.test.tsx`.
- Update navigation expectations in `src/components/geometry-navigation.test.tsx` when changing catalog order or slugs.

## Commit & Pull Request Guidelines
- Recent history uses ticket-style prefixes (e.g., `SG-228: Metatron's Cube Stickers Product`). Follow that pattern when possible.
- Keep commits focused and imperative; include PR numbers if used by the repo.
- PRs should describe changes, link issues/tickets, and include screenshots for UI changes.

## Data & Content Tips
- Read geometry data via `@/lib/data` helpers to keep relationship enhancement consistent.
- When adding new geometries, keep `order` and `featured` in sync with navigation/tests.
- Add env vars to `src/env.js` and `.env.example`; client vars require `NEXT_PUBLIC_`.
