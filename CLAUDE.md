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
- **Content**: YAML content system via `js-yaml`, MDX support via `@next/mdx`
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
- `src/lib/content/` - **Content loading and formatting utilities**
- `src/content/` - **YAML content files for geometry pages**
- `src/util/` - Application utilities (routing constants, etc.)
- `src/styles/` - Global CSS and Tailwind imports
- `src/env.js` - Environment variable validation schema

### Routing Architecture

The app uses a **clear separation between page structure and content**:

1. **ROUTES** (`src/util/routes.ts`): **Page-level routing and metadata only**
   - Defines top-level sections: Home, Platonic Solids, Sacred Patterns
   - Provides section metadata: names, descriptions, paths
   - Use for: Header navigation, page titles, section descriptions
   - **Do NOT use for individual geometry links** - use the data model instead

2. **Data Model** (`src/lib/data/geometries.ts`): **Individual geometry content and paths**
   - All geometry data: names, descriptions, images, relationships
   - Path generation via `getGeometryPath(geometry)`
   - Navigation helpers: `getNextGeometry()`, `getPreviousGeometry()`
   - Use for: Geometry cards, detail pages, navigation between geometries

3. **Dynamic Routes** (Platonic Solids - implemented):
   - Pattern: `app/platonic-solids/[slug]/page.tsx`
   - Fetch data: `getGeometryBySlug(params.slug)` and `getPlatonicSolidContent(params.slug)`
   - Consolidates 5 static pages into one reusable template

4. **Static Routes** (Sacred Patterns - current):
   - Individual pages: `app/sacred-patterns/flower-of-life/page.tsx`, etc.
   - Still use data model for titles, images, and navigation
   - Will migrate to dynamic routing when all patterns have animated SVGs

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

**Querying Geometries:**
- `getGeometryById(id)` - Get geometry by ID
- `getGeometryBySlug(slug)` - **Primary function for dynamic routes**
- `getRelatedGeometries(id)` - Get all relationships (dual, contains, appearsIn)
- `getPlatonicSolids()` - Get all Platonic solids (sorted by order)
- `getSacredPatterns()` - Get all sacred patterns (sorted by order)
- `getGeometriesByElement(element)` - Filter by element association
- `searchGeometries(query)` - Search by name/description/properties

**Path Generation:**
- `getGeometryPath(geometry)` - Generate URL path based on category (`/platonic-solids/{slug}` or `/sacred-patterns/{slug}`)
- `getGeometryListPath(category)` - Get list page path (`/platonic-solids` or `/sacred-patterns`)

**Navigation:**
- `getNextGeometry(currentId, category)` - Get next geometry in sequence (by order field)
- `getPreviousGeometry(currentId, category)` - Get previous geometry in sequence (by order field)

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

### Navigation Components

**GeometryNavigation Component** (`src/components/geometry-navigation.tsx`):

A reusable navigation component that provides Previous/Next buttons and a link back to the category list page.

**Features:**
- Fully data-driven (uses data model, not ROUTES)
- Category-agnostic (works for both Platonic Solids and Sacred Patterns)
- Responsive design with mobile/desktop labels
- Automatically determines previous/next based on `order` field

**Usage:**

```typescript
import { GeometryNavigation } from "@/components/geometry-navigation";

export default function Page({ params }: { params: { slug: string } }) {
  // ... your page content ...

  return (
    <main>
      {/* Your content here */}

      {/* Navigation - add at bottom of page */}
      <GeometryNavigation currentSlug={params.slug} category="platonic" />
      {/* or category="pattern" for Sacred Patterns */}
    </main>
  );
}
```

**How It Works:**
1. Fetches current geometry by slug
2. Uses `getPreviousGeometry(id, category)` and `getNextGeometry(id, category)` to find adjacent geometries
3. Generates paths using `getGeometryPath(geometry)` and `getGeometryListPath(category)`
4. Renders Previous/Next buttons (only if they exist) + "All [Category]" link

**Adding to New Pages:**
Always add `<GeometryNavigation />` at the bottom of geometry detail pages to provide consistent exploration flow.

### Content System Architecture

**YAML Content Files** (`src/content/`):

The project uses a YAML-based content system to separate page-specific narrative content from the structural geometry data model. This allows for maintainable, version-controlled content that can be easily edited without touching code.

**Structure**:
- `src/content/platonic-solids/` - Content for Platonic Solid pages (tetrahedron.yml, hexahedron.yml, etc.)
- `src/content/sacred-patterns/` - Content for sacred pattern pages (future, different schema)

**Content Loading** (`src/lib/content/`):

- `getPlatonicSolidContent(slug)` - Load YAML content for a Platonic Solid
- `formatText(text)` - Simple formatter converting `**bold**` to `<strong>` tags
- Type-safe with `PlatonicSolidContent` interface

**Separation of Concerns**:
- **Data Model** (`src/lib/data/geometries.ts`): Structural data, relationships, mathematical properties
  - `order: number` - Integer for sorting/logic (1, 2, 3, etc.)
- **Content YAML**: Presentational content, narrative, symbolic meanings
  - `order: string` - Display string ("First Solid", "Second Solid", etc.)

**Example Usage**:

```typescript
import { getGeometryBySlug } from "@/lib/data";
import { getPlatonicSolidContent, formatText } from "@/lib/content";

export default function Page({ params }: { params: { slug: string } }) {
  const geometry = getGeometryBySlug(params.slug);
  const content = getPlatonicSolidContent(params.slug);

  if (!geometry || !content) notFound();

  // Render with formatted text
  return (
    <Text dangerouslySetInnerHTML={{
      __html: formatText(content.symbolic.introduction)
    }} />
  );
}
```

**YAML Schema**:
```yaml
slug: tetrahedron
order: First Solid

symbolic:
  introduction: "Opening paragraph with **bold** text..."
  associations:
    - "List of symbolic meanings..."

mathematical:
  insights:
    - "Mathematical paragraphs..."

nature:
  introduction: "Opening paragraph..."
  examples:
    - category: Chemistry
      description: "Specific example..."
```

See `src/content/README.md` for detailed content editing guidelines.

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
