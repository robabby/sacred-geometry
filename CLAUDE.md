# CLAUDE.md

## Project Overview

T3 Stack Next.js 16 app for sacred geometry. Uses App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui (New York style), Radix UI Themes (dark default), MDX content via `next-mdx-remote`, and Vitest.

## Commands

```bash
pnpm dev          # Dev server (Turbopack)
pnpm check        # Lint + typecheck
pnpm lint:fix     # ESLint auto-fix
pnpm test         # Vitest
pnpm build        # Production build
```

## Directory Structure

```
src/app/                    # App Router pages
src/components/ui/          # shadcn/ui components
src/components/geometry/    # Geometry-specific components
src/lib/data/               # Data model (7 files, see below)
src/lib/content/            # MDX content loaders
src/content/                # MDX files (platonic-solids/, sacred-patterns/)
src/util/routes.ts          # Top-level routing only (NOT geometry links)
src/env.js                  # Env validation (Zod)
```

## Key Patterns

- **Imports**: Use `@/*` for `src/` (e.g., `import { cn } from "@/lib/utils"`)
- **Styling**: `cn()` merges classes via clsx + tailwind-merge
- **Theme**: `<Theme appearance="dark">` in root layout
- **Env vars**: Define in `src/env.js`, prefix client vars with `NEXT_PUBLIC_`

## Data Model (`src/lib/data/`)

Modular architecture with auto-computed relationships:

| File | Purpose |
|------|---------|
| `index.ts` | Main exports |
| `geometries.types.ts` | TypeScript interfaces |
| `platonic-solids.ts` | 5 Platonic solids |
| `sacred-patterns.ts` | 17+ sacred patterns |
| `relationships.ts` | `CONTAINS_GRAPH` & `DUAL_GRAPH` (single source of truth) |
| `helpers.ts` | Query functions |

**Key Functions:**
- `getGeometryBySlug(slug)` - Primary for dynamic routes
- `getRelatedGeometries(id)` - Returns `{ dual, contains, appearsIn }`
- `getPlatonicSolids()` / `getSacredPatterns()` - Sorted lists
- `getGeometryPath(geometry)` - Generate URL path
- `getNextGeometry(id, category)` / `getPreviousGeometry(id, category)`

**Adding Geometries:** Add to `platonic-solids.ts` or `sacred-patterns.ts`, then add relationships to `relationships.ts`. Inverse relationships auto-compute.

## Dynamic Routes

Both use same pattern:
- `app/platonic-solids/[slug]/page.tsx` - Uses `getGeometryBySlug()` + `getPlatonicSolidContent()`
- `app/sacred-patterns/[slug]/page.tsx` - Uses `getGeometryBySlug()` + `getSacredPatternContent()`

## MDX Content

Content in `src/content/{platonic-solids,sacred-patterns}/`. Uses `<Section>` component for styling.

```mdx
---
slug: tetrahedron
---
<Section>
## Symbolic Properties
Content here...
</Section>
```

## Navigation

Use `<GeometryNavigation currentSlug={slug} category="platonic|pattern" />` at bottom of geometry pages.

## Development Workflow

- **Feature implementations**: Use `/feature-dev:feature-dev` skill for guided feature development with codebase understanding and architecture focus
- **Prefer agents**: For multi-step implementations, use the Task tool with specialized agents (`feature-dev:code-architect`, `feature-dev:code-explorer`, `feature-dev:code-reviewer`) to parallelize work and maintain focus
- **Sub-agent model**: All sub-agents must use Claude Opus (`model: "opus"`)
- **Code review**: After implementations, use `feature-dev:code-reviewer` agent to review for bugs, security issues, and adherence to project conventions

## Linear Integration

- **Prefix**: `SG-`
- **Branch format**: `sg-<issue-number>-<slugified-title>`
- **Commits**: Reference issue ID (e.g., `SG-74: Add typography`)
- **Auto-close**: Issues are automatically marked Done when their branch is merged—rarely mark items Done manually
