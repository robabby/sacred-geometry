# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **T3 Stack** Next.js application focused on sacred geometry. The project uses Next.js 15 with the App Router, React 19, TypeScript, and Tailwind CSS v4. MDX support is integrated for content pages.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS v4 with Radix UI Themes
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
- `src/_components/` - Reusable React components
- `src/lib/` - Utility functions and shared logic
- `src/styles/` - Global CSS and Tailwind imports
- `src/env.js` - Environment variable validation schema

### Key Patterns

**Path Aliases**: Use `@/*` for imports from `src/` (e.g., `import { cn } from "@/lib/utils"`)

**Environment Variables**:
- Define new env vars in `src/env.js` with Zod schemas
- Server vars go in `server` object
- Client vars must be prefixed with `NEXT_PUBLIC_` and defined in `client` object
- All vars must be added to `runtimeEnv` object

**MDX Integration**:
- MDX files can be placed in `src/app/` as `.mdx` pages
- Custom MDX components defined in `src/mdx-components.tsx`
- Next.js config uses `@next/mdx` wrapper

**Styling Utilities**:
- Use `cn()` from `@/lib/utils` for conditional class merging
- Combines `clsx` and `tailwind-merge` for optimal Tailwind class handling

**Layout & Fonts**:
- Root layout in `src/app/layout.tsx` uses Geist font
- Radix UI Themes styles imported in layout
- Vercel Analytics component included in root layout

### TypeScript Configuration

- Strict mode enabled with `noUncheckedIndexedAccess`
- Path aliases: `@/*` maps to `./src/*`
- Module system: ESNext with bundler resolution
- JSX: preserve mode for Next.js
