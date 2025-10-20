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
- **Content**: MDX content system via `@next/mdx` and `next-mdx-remote`
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
- `src/lib/data/` - **Modular data model with 7 focused files for geometry relationships**
- `src/lib/content/` - **Content loading and formatting utilities**
- `src/content/` - **MDX content files for geometry pages**
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

2. **Data Model** (`src/lib/data/`): **Individual geometry content and paths**
   - All geometry data: names, descriptions, images, relationships
   - Modular structure with auto-computed relationships
   - Path generation via `getGeometryPath(geometry)`
   - Navigation helpers: `getNextGeometry()`, `getPreviousGeometry()`
   - Use for: Geometry cards, detail pages, navigation between geometries

3. **Dynamic Routes** (Both categories - implemented):
   - **Platonic Solids**: `app/platonic-solids/[slug]/page.tsx`
     - Fetch data: `getGeometryBySlug(params.slug)` and `getPlatonicSolidContent(params.slug)`
     - Uses MDX content system
     - Consolidates 5 pages into one reusable template

   - **Sacred Patterns**: `app/sacred-patterns/[slug]/page.tsx`
     - Fetch data: `getGeometryBySlug(params.slug)` and `getSacredPatternContent(params.slug)`
     - Uses MDX content system
     - Consolidates 17 pages into one reusable template

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

**Modular Data Structure** (`src/lib/data/`):

The data model uses a **modular architecture** split across 7 focused files for maintainability and scalability:

```
src/lib/data/
├── index.ts                 # Main export - combines all modules
├── geometries.types.ts      # TypeScript interfaces & type-safe IDs
├── platonic-solids.ts       # 5 Platonic solids definitions
├── sacred-patterns.ts       # 17+ sacred patterns definitions
├── relationships.ts         # CONTAINS_GRAPH & DUAL_GRAPH (single source of truth)
├── image-paths.ts          # Image path utility functions
└── helpers.ts              # Query & enhancement functions
```

**Key Features**:
- **Type-safe geometry IDs**: Compile-time validation using TypeScript const assertions
- **Auto-computed relationships**: `appearsIn` is automatically computed from `CONTAINS_GRAPH`
- **Single source of truth**: Relationships defined once in central graphs
- **Runtime validation**: Catches broken references at startup (development only)
- **Image path utilities**: Auto-generate paths from slugs, no repetition

**Relationship Management**:

Relationships are defined in **one place** (`relationships.ts`) and enhanced automatically:

```typescript
// Define "contains" relationships once
export const CONTAINS_GRAPH: Record<string, GeometryId[]> = {
  "flower-of-life": ["seed-of-life", "vesica-piscis", "tree-of-life"],
  "seed-of-life": ["vesica-piscis", "germ-of-life"],
  // ... etc
};

// "appearsIn" is auto-computed as the inverse
// vesica-piscis.appearsIn → ["flower-of-life", "seed-of-life"]
```

**Adding New Geometries**:

1. Add definition to `platonic-solids.ts` or `sacred-patterns.ts`
2. Add relationships to `CONTAINS_GRAPH` or `DUAL_GRAPH` (if applicable)
3. That's it! Inverse relationships and validation are automatic

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

**Image Path Utilities**:

Use helper functions instead of hardcoding paths:

```typescript
import { getPlatonicImages, getPatternHeroImage } from "@/lib/data/image-paths";

// Platonic solids - auto-generates all 4 image paths
images: getPlatonicImages("tetrahedron")
// → { heroImage, solidImage, wireframeImage, netImage }

// Sacred patterns - auto-generates hero image path
images: getPatternHeroImage("flower-of-life")
// → { heroImage: "/images/geometries/sacred-patterns/flower-of-life/flower-of-life-primary.svg" }
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

The project uses a **unified MDX content system** to separate page-specific narrative content from the structural geometry data model. This allows for maintainable, version-controlled content that can be easily edited without touching code.

**Content Files** (`src/content/`):
- `src/content/platonic-solids/` - MDX content for Platonic Solid pages (tetrahedron.mdx, hexahedron.mdx, etc.)
- `src/content/sacred-patterns/` - MDX content for Sacred Pattern pages (circle-dot.mdx, flower-of-life.mdx, etc.)

**Content Loading** (`src/lib/content/`):

Both content systems use the same MDX infrastructure:

**Platonic Solids (MDX)**:
- `getPlatonicSolidContent(slug)` - Load and compile MDX content for a Platonic Solid
- `platonicSolidContentExists(slug)` - Check if MDX file exists
- `getAllPlatonicSolidContentSlugs()` - Get all available solid slugs
- Type-safe with `PlatonicSolidContent` interface
- Uses `next-mdx-remote/rsc` for server-side MDX compilation
- Custom MDX components in `src/components/mdx-components.tsx` for styling

**Sacred Patterns (MDX)**:
- `getSacredPatternContent(slug)` - Load and compile MDX content for a Sacred Pattern
- `sacredPatternContentExists(slug)` - Check if MDX file exists
- `getAllSacredPatternContentSlugs()` - Get all available pattern slugs
- Type-safe with `SacredPatternContent` interface
- Uses `next-mdx-remote/rsc` for server-side MDX compilation
- Custom MDX components in `src/components/mdx-components.tsx` for styling

**Separation of Concerns**:
- **Data Model** (`src/lib/data/`): Structural data, relationships, mathematical properties
  - Modular files: `platonic-solids.ts`, `sacred-patterns.ts`, `relationships.ts`
  - `order: number` - Integer for sorting/logic (1, 2, 3, etc.)
- **Content Files** (MDX): Presentational content, narrative, symbolic meanings
  - Natural markdown formatting with React components
  - Rich narrative content with styling via custom MDX components

**Example Usage - Platonic Solids (MDX)**:

```typescript
import { getGeometryBySlug } from "@/lib/data";
import { getPlatonicSolidContent } from "@/lib/content";

export default async function Page({ params }: { params: { slug: string } }) {
  const geometry = getGeometryBySlug(params.slug);
  const mdxContent = await getPlatonicSolidContent(params.slug);

  if (!geometry) notFound();

  // Render MDX content directly
  return (
    <main>
      <h1>{geometry.title}</h1>
      {mdxContent?.content}
    </main>
  );
}
```

**Platonic Solids MDX Schema**:
```mdx
---
slug: tetrahedron
---

<Section>
## Symbolic Properties

In the language of sacred geometry, the tetrahedron speaks of **fire and transformation**...

**Key Associations:**

- **Fire and transformation**, the spark of creation
- **Stability through tension**, like a tripod that never wobbles
</Section>

<Section>
## Mathematical Insights

The tetrahedron embodies the principle of **minimal complexity**...
</Section>

<Section>
## In Nature and Culture

The tetrahedral form appears throughout nature:

- **Chemistry:** The carbon atom in methane forms a perfect tetrahedron
- **Crystals:** Diamond's crystal structure is based on tetrahedral geometry
</Section>
```

**Example Usage - Sacred Patterns (MDX)**:

```typescript
import { getGeometryBySlug } from "@/lib/data";
import { getSacredPatternContent } from "@/lib/content";

export default async function Page({ params }: { params: { slug: string } }) {
  const geometry = getGeometryBySlug(params.slug);
  const patternContent = await getSacredPatternContent(params.slug);

  if (!geometry || !patternContent) notFound();

  // Render MDX content directly
  return (
    <div>
      <h1>{geometry.title}</h1>
      {patternContent.content}
    </div>
  );
}
```

**MDX Schema**:
```mdx
---
slug: flower-of-life
---

<Section title="The Pattern of Creation">

## The Pattern of Creation

The Flower of Life is a geometric pattern consisting of multiple evenly-spaced, overlapping circles...

- **Universal Symbol:** Found in ancient temples worldwide
- **Sacred Geometry:** Contains the Seed of Life, Egg of Life, and Fruit of Life
- **Mathematical Perfection:** Based on the hexagonal packing of circles

</Section>

<Section title="Historical Significance">

## Historical Significance

This pattern appears in Egyptian temples, Chinese art, and Renaissance manuscripts...

</Section>
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
