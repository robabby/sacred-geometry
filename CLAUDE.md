# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **T3 Stack** Next.js application focused on sacred geometry. The project uses Next.js 15 with the App Router, React 19, TypeScript, and Tailwind CSS v4. It includes shadcn/ui components for UI elements.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS v4 with Radix UI Themes
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Lucide React
- **Content**: MDX support via `@next/mdx`
- **Environment**: Type-safe env validation with `@t3-oss/env-nextjs`
- **Analytics**: Vercel Analytics
- **Package Manager**: pnpm

## Development Commands

```bash
# Development
pnpm dev              # Start dev server with Turbopack

# Type checking & linting
pnpm check            # Run lint + typecheck
pnpm typecheck        # TypeScript type checking only
pnpm lint             # ESLint
pnpm lint:fix         # ESLint with auto-fix

# Formatting
pnpm format:check     # Check Prettier formatting
pnpm format:write     # Apply Prettier formatting

# Build & production
pnpm build            # Production build
pnpm preview          # Build and start production server
pnpm start            # Start production server
```

## Architecture

### Directory Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/ui/` - shadcn/ui components (breadcrumb, dropdown-menu, etc.)
- `src/lib/` - Utility functions (`utils.ts` with `cn()` helper)
- `src/util/` - Application utilities (routing constants, etc.)
- `src/styles/` - Global CSS and Tailwind imports
- `src/env.js` - Environment variable validation schema

### Routing Architecture

The app uses a centralized routing system via `src/util/routes.ts` which defines all routes with metadata (name, path, description, order). Routes are hierarchical and support nested children (e.g., Platonic Solids have child routes for each solid). Always use `ROUTES` constants for navigation and links rather than hardcoding paths.

### Key Patterns

**Path Aliases**: Use `@/*` for imports from `src/` (e.g., `import { cn } from "@/lib/utils"`)

**shadcn/ui Components**:
- Configuration in `components.json` (New York style, RSC-enabled)
- Components installed to `src/components/ui/`
- Use Lucide icons for UI elements
- Aliases: `@/components`, `@/lib/utils`, `@/components/ui`, `@/lib`, `@/hooks`

**Environment Variables**:
- Define new env vars in `src/env.js` with Zod schemas
- Server vars go in `server` object
- Client vars must be prefixed with `NEXT_PUBLIC_` and defined in `client` object
- All vars must be added to `runtimeEnv` object
- Use `SKIP_ENV_VALIDATION=true` to skip validation (useful for Docker builds)

**MDX Integration**:
- MDX files can be placed in `src/app/` as `.mdx` pages
- Next.js config imports and validates env vars via `./src/env.js`

**Styling Utilities**:
- Use `cn()` from `@/lib/utils` for conditional class merging
- Combines `clsx` and `tailwind-merge` for optimal Tailwind class handling

**Layout & Theme**:
- Root layout in `src/app/layout.tsx` uses Geist font
- Radix UI Themes with dark appearance by default
- Vercel Analytics component included in root layout
- Theme wrapper: `<Theme appearance="dark">{children}</Theme>`

### TypeScript Configuration

- Strict mode enabled with `noUncheckedIndexedAccess`
- Path aliases: `@/*` maps to `./src/*`
- Module system: ESNext with bundler resolution
- JSX: preserve mode for Next.js
- `checkJs` enabled for JavaScript files
