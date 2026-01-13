# CLAUDE.md

## Project Overview

T3 Stack Next.js 16 app for sacred geometry. Uses App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui (New York style), Radix UI Themes (dark default), MDX content via `next-mdx-remote`, Vitest, Stripe (checkout), and Printful (print-on-demand).

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
src/app/shop/               # Shop pages (listing, [slug], success, cancel)
src/app/api/                # API routes (checkout, webhooks)
src/components/ui/          # shadcn/ui components
src/components/geometry/    # Geometry-specific components
src/components/shop/        # Shop UI components (cart, product cards, etc.)
src/lib/data/               # Data model (geometries + products)
src/lib/shop/               # Shop: Printful API, Stripe, cart, feature flags
src/lib/content/            # MDX content loaders
src/content/                # MDX files (platonic-solids/, sacred-patterns/)
src/util/routes.ts          # Top-level routing only (NOT geometry links)
src/env.js                  # Env validation (Zod)
docs/plans/                 # Implementation plans (YYYY-MM-DD-<topic>.md)
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

## Shop Integration (`src/lib/shop/`)

| File | Purpose |
|------|---------|
| `printful.ts` | Printful API client with ISR caching (1hr revalidation) |
| `stripe.ts` | Stripe checkout session creation |
| `cart-context.tsx` | React Context for cart state + localStorage persistence |
| `feature-flags.ts` | `isShopEnabled()` for production feature gating |
| `types.ts` | TypeScript interfaces for products, variants, cart |

**Products** (`src/lib/data/products.ts`): Marketing data (name, tagline, description) mapped to Printful sync product IDs. Variant pricing/availability fetched from Printful at build time.

**Key Functions:**
- `getProductWithVariants(product)` - Hydrates product with Printful data
- `createCheckoutSession(items)` - Creates Stripe checkout session
- `useCart()` - Cart hook with add/remove/update/clear actions

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PRINTFUL_API_KEY` | Printful API token |
| `STRIPE_SECRET_KEY` | Stripe server key (`sk_*`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook verification (`whsec_*`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe client key (`pk_*`) |
| `NEXT_PUBLIC_SHOP_ENABLED` | Feature flag (`true`/`false`, default: `false`) |
| `APP_URL` | Base URL for Stripe redirects (default: `http://localhost:3000`) |

## Development Workflow

- **Feature implementations**: Use `/feature-dev:feature-dev` skill for guided feature development with codebase understanding and architecture focus
- **Prefer agents**: For multi-step implementations, use the Task tool with specialized agents (`feature-dev:code-architect`, `feature-dev:code-explorer`, `feature-dev:code-reviewer`) to parallelize work and maintain focus
- **Sub-agent model**: All sub-agents must use Claude Opus (`model: "opus"`)
- **Code review**: After implementations, use `feature-dev:code-reviewer` agent to review for bugs, security issues, and adherence to project conventions

## Linear Integration

- **Project**: Metatron Collective
- **Team**: Sherpa
- **Prefix**: `SG-`
- **Branch format**: `sg-<issue-number>-<slugified-title>`
- **Commits**: Reference issue ID (e.g., `SG-74: Add typography`)
- **Auto-close**: Issues are automatically marked Done when their branch is merged—rarely mark items Done manually
