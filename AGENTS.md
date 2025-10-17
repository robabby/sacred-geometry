# Repository Guidelines

Sacred Geometry combines Next.js App Router, React Three Fiber, and the T3 stack to render interactive geometry content. Use this guide to stay consistent with the existing patterns.

## Project Structure & Module Organization
- `src/app`: Next.js routes, layouts, and server components; co-locate route-specific utilities.
- `src/components`: Reusable UI primitives; prefer one component per file and export via index when sharing.
- `src/lib`, `src/util`, `src/hooks`: Domain helpers, pure utilities, and React hooks respectively—keep logic type-safe and unit-testable.
- `src/styles`: Tailwind layer overrides and theme tokens.
- `public`: Static assets referenced through `/public` paths (e.g., `<Image src="/textures/grid.png" />`).

## Build, Test, and Development Commands
- `pnpm dev`: Start the turbo Next.js dev server with hot reload.
- `pnpm build`: Produce the production bundle; run before deploying.
- `pnpm preview`: Smoke-test the production build locally (`next build && next start`).
- `pnpm check`: Run ESLint and TypeScript for regressions in a single pass.
- `pnpm format:check` / `pnpm format:write`: Validate or fix Prettier formatting, including Tailwind class sorting.

## Coding Style & Naming Conventions
Use Prettier defaults (2-space indent, double quotes in JSON) and respect the Tailwind plugin ordering. Components and pages live in `.tsx` files and are named in PascalCase (`GeometryCanvas.tsx`); hooks use the `useSomething` camelCase pattern. Prefer `clsx` and `tailwind-merge` over manual string concatenation, and colocate schema validation with `zod` in `src/lib` when possible.

## Testing Guidelines
Automated tests are not yet configured; rely on `pnpm check` for linting and type safety before opening a PR. When adding tests, follow the pattern `*.test.ts` or `*.test.tsx` in a `tests/` directory or next to the module under test, and favour lightweight React Testing Library or integration smoke tests. Document any new testing utilities in the PR description.

## Commit & Pull Request Guidelines
Write commit subjects in the imperative mood with a short summary and, when relevant, prefix the task key (e.g., `SG-42 refactor geometry parser`). Squash small fixups before review. PRs must include: a concise summary of changes, links to issues or user stories, screenshots or recordings for UI updates, and confirmation that `pnpm check` (and any added tests) passed. Flag any schema or environment changes explicitly for reviewers.

## Environment & Configuration
Application env vars are validated through `src/env.js`; document new keys in the `.env.example` file and surface their purpose in the PR. Avoid committing real secrets. When working with React Three Fiber assets, keep large files in external storage and reference them via URLs rather than embedding in `public/`.
