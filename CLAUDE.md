# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **T3 Stack** Next.js application focused on sacred geometry. The project uses Next.js 15 with the App Router, React 19, TypeScript, and Tailwind CSS v4. It includes shadcn/ui components for UI elements.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS v4 with Radix UI Themes
- **UI Components**: shadcn/ui (New York style)
- **3D Graphics**: Three.js with @react-three/fiber and @react-three/drei
- **Icons**: Lucide React
- **Content**: MDX support via `@next/mdx`
- **Environment**: Type-safe env validation with `@t3-oss/env-nextjs`
- **Analytics**: Vercel Analytics
- **Testing**: Vitest with React Testing Library and happy-dom
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

# Testing
pnpm test             # Run tests with Vitest
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage

# Build & production
pnpm build            # Production build
pnpm preview          # Build and start production server
pnpm start            # Start production server
```

## Architecture

### Directory Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/ui/` - shadcn/ui components (breadcrumb, dropdown-menu, etc.)
- `src/components/3d/` - Three.js 3D visualization components
- `src/components/geometry/` - Sacred geometry specific components
- `src/lib/` - Utility functions and shared logic
- `src/lib/data/` - **Data models and geometry relationships catalog**
- `src/util/` - Application utilities (routing constants, etc.)
- `src/styles/` - Global CSS and Tailwind imports
- `src/env.js` - Environment variable validation schema

### Routing Architecture

The app uses a **dual routing approach**:

1. **Static Routes** (`src/util/routes.ts`): Defines all routes with metadata (name, path, description, order). Routes are hierarchical and support nested children. Use `ROUTES` constants for navigation and links.

2. **Dynamic Routes** (recommended for geometry pages): Use slug-based dynamic routing with the data model:
   - Pattern: `app/platonic-solids/[slug]/page.tsx` or `app/sacred-patterns/[slug]/page.tsx`
   - Fetch geometry data using `getGeometryBySlug(params.slug)` from `@/lib/data`
   - This approach consolidates multiple static pages into reusable templates

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

### Data Model Architecture

**Sacred Geometry Data Catalog** (`src/lib/data/geometries.ts`):

- Centralized data model for all sacred geometries and their relationships
- Includes 16 geometries: 5 Platonic Solids, 6 Sacred Patterns, and additional supporting geometries
- Each geometry has: `id`, `name`, `slug`, `category`, `description`, `dual`, `contains`, `appearsIn`, `relatedBy`
- Type-safe with full TypeScript interfaces

**Key Helper Functions**:

- `getGeometryById(id)` - Get geometry by ID
- `getGeometryBySlug(slug)` - **Primary function for dynamic routes**
- `getRelatedGeometries(id)` - Get all relationships (dual, contains, appearsIn)
- `getPlatonicSolids()` - Get all Platonic solids
- `getSacredPatterns()` - Get all sacred patterns
- `getGeometriesByElement(element)` - Filter by element association
- `searchGeometries(query)` - Search by name/description/properties

**Example Usage**:

```typescript
import { getGeometryBySlug, getRelatedGeometries } from "@/lib/data";

export default function Page({ params }: { params: { slug: string } }) {
  const geometry = getGeometryBySlug(params.slug);
  if (!geometry) notFound();

  const { dual, contains, appearsIn } = getRelatedGeometries(geometry.id);
  // render geometry...
}
```

See `src/lib/data/README.md` for comprehensive documentation.

### 3D Visualization Components

**GeometryViewer Component** (`src/components/3d/GeometryViewer.tsx`):

- Reusable Three.js scene framework for 3D visualizations
- Features: responsive canvas, orbit controls, lighting, WebGL detection
- Server-side rendering safe with client-side hydration
- Accepts `geometry` and `material` props or custom React children

**Usage**:

```typescript
import { GeometryViewer } from "@/components/3d";

export function MyGeometry() {
  return (
    <div className="h-[600px] w-full">
      <GeometryViewer>
        <mesh>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#4fa3d1" />
        </mesh>
      </GeometryViewer>
    </div>
  );
}
```

See `src/components/3d/README.md` for detailed documentation.

### TypeScript Configuration

- Strict mode enabled with `noUncheckedIndexedAccess`
- Path aliases: `@/*` maps to `./src/*`
- Module system: ESNext with bundler resolution
- JSX: preserve mode for Next.js
- `checkJs` enabled for JavaScript files

### Testing

- **Framework**: Vitest with React Testing Library
- **DOM Environment**: happy-dom
- **Coverage**: Available via `pnpm test:coverage`
- Test files should be colocated with source files or in `__tests__` directories
- Use `.test.ts` or `.test.tsx` extensions
