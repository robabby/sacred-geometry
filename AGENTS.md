# Agent Handbook

## Project Overview
- Sacred Geometry is a Next.js 15 App Router project that blends the T3 stack with React Three Fiber to render interactive geometry content.
- The app targets React 19 with strict TypeScript, Tailwind CSS v4, Radix UI Themes, and shadcn/ui components (New York style).
- Three.js powers all 3D scenes via `@react-three/fiber` and `@react-three/drei`, while Lucide React provides icons.
- Sacred Pattern pages now live under `src/app/sacred-patterns`, delivering long-form narratives (Circle Dot → Pentagram) wired into the geometry catalog and sequential navigation.

## Tech Stack & Tooling
- Runtime: Next.js 15 (App Router), React 19, TypeScript strict.
- Styling: Tailwind CSS v4, Radix UI Themes, utility helpers via `cn()` from `@/lib/utils`.
- Content: YAML-driven content system in `src/content` parsed with `js-yaml`, optional MDX through `@next/mdx`.
- Env validation: `@t3-oss/env-nextjs` schema in `src/env.js`.
- Analytics: Vercel Analytics included in the root layout.
- Testing: Vitest + React Testing Library + happy-dom.
- Package manager: pnpm.

## Core Commands
```bash
pnpm dev           # Start the Turbopack-powered dev server
pnpm build         # Production build
pnpm preview       # Build and start the production server
pnpm start         # Start the production server without rebuilding

pnpm check         # ESLint + TypeScript in one pass
pnpm typecheck     # TypeScript only
pnpm lint          # ESLint
pnpm lint:fix      # ESLint with auto-fix
pnpm format:check  # Prettier/Tailwind formatting validation
pnpm format:write  # Apply Prettier/Tailwind formatting

pnpm test          # Vitest test suite
pnpm test:watch    # Vitest watch mode
pnpm test:coverage # Vitest coverage
```

## Project Structure
- `src/app`: Next.js routes, layouts, server components; co-locate route utilities.
- `src/app/sacred-patterns`: Featured sacred-pattern detail pages sharing layout, imagery, and GeometryNavigation wiring.
- `src/components/ui`: shadcn/ui primitives.
- `src/components/3d`: React Three Fiber scenes and helpers.
- `src/components/geometry`: Domain-specific geometry components.
- `src/lib`: Shared utilities; `src/lib/data` hosts geometry catalog logic.
- `src/lib/content`: Content loading/formatting helpers for YAML.
- `src/content`: YAML content files for geometries (e.g., Platonic solids).
- `src/hooks`: Reusable React hooks.
- `src/styles`: Tailwind layer overrides, tokens, and global CSS.
- `src/util`: Routing constants and general utilities.
- `public`: Static assets referenced via `/...`.

## Key Patterns & Conventions
- Components/pages use PascalCase `.tsx`; hooks use camelCase `use*`.
- Prefer `cn()` (clsx + tailwind-merge) over manual class concatenation.
- Tailwind classes follow plugin ordering enforced by Prettier config.
- Use path aliases (`@/...`) for imports from `src/`.
- Schema validation lives with `zod` in `src/lib` where practical.
- When creating dynamic routes for geometries, fetch data with `getGeometryBySlug` and related helpers from `@/lib/data`.
- Geometry detail pages should use `GeometryNavigation` with `getGeometryPath` / `getGeometryListPath` to keep previous/next/all links in sync with the catalog ordering.

## Data & Content Model
- `src/lib/data/geometries.ts` defines the sacred geometry catalog (5 Platonic Solids, 11 featured Sacred Patterns from Circle Dot through Pentagram, plus supporting shapes like Triangle, Tree of Life, Fibonacci Spiral). Keep `order` and `featured` fields aligned with navigation expectations.
- Helper functions: `getGeometryById`, `getGeometryBySlug`, `getGeometryPath`, `getGeometryListPath`, `getRelatedGeometries`, `getNextGeometry`, `getPreviousGeometry`, `getPlatonicSolids`, `getSacredPatterns`, `getGeometriesByElement`, `searchGeometries`.
- `src/content/platonic-solids/*.yml` stores narrative content (order strings, symbolic associations, etc.).
- Combine structural data and YAML content in pages to render full experiences.

## Testing & QA
- Automated tests live alongside modules or under `__tests__/` with the `*.test.ts(x)` naming convention.
- Run `pnpm check` before PRs to cover linting and type safety.
- Use Vitest (with RTL + happy-dom) for new tests; document new utilities in PRs.
- Sacred-pattern and platonic navigation behavior is covered in `src/components/geometry-navigation.test.tsx`; update expectations when changing catalog order, slugs, or navigation rules.

## Environment & Assets
- Define new env vars in `src/env.js` with Zod schemas; add to `.env.example` and `runtimeEnv`.
- Client vars require `NEXT_PUBLIC_` prefix.
- Large 3D assets should live off-repo and be referenced by URL rather than committed under `public/`.
