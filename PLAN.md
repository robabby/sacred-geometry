# Migration Plan: YAML → MDX for Platonic Solids

## Overview

This document outlines the plan for transitioning Platonic Solid content from YAML to MDX format, unifying the content system so both Platonic Solids and Sacred Patterns use the same MDX infrastructure.

---

## Current State Analysis

### YAML Structure (src/content/platonic-solids/*.yml)
- Structured data with specific fields: `symbolic`, `mathematical`, `nature`
- Simple text formatting with `**bold**` markers
- Requires `formatText()` utility to convert to HTML
- Rigid schema with nested objects/arrays

**Example:**
```yaml
slug: tetrahedron
order: First Solid

symbolic:
  introduction: "In the language of sacred geometry..."
  associations:
    - "**Fire and transformation**, the spark of creation"

mathematical:
  insights:
    - "The tetrahedron embodies the principle..."

nature:
  introduction: "The tetrahedral form appears..."
  examples:
    - category: Chemistry
      description: "The carbon atom in methane..."
```

### MDX Structure (src/content/sacred-patterns/*.mdx)
- Free-form markdown with React components
- Uses `<Section>` wrapper (MDXSection) for styled Cards
- Native markdown formatting (no conversion needed)
- Flexible, extensible with custom components

**Example:**
```mdx
---
slug: flower-of-life
---

<Section>
## Construction & Geometry

The Flower of Life is created through a simple yet profound process...
</Section>
```

---

## Proposed MDX Schema for Platonic Solids

The new MDX format will mirror the current YAML structure but use natural markdown:

```mdx
---
slug: tetrahedron
---

<Section>
## Symbolic Properties

In the language of sacred geometry, the tetrahedron speaks of **fire and transformation**. With only four faces, it represents the minimum number of surfaces needed to enclose space. This makes it the foundation of all three-dimensional reality.

**Key Associations:**

- **Fire and transformation**, the spark of creation
- **Stability through tension**, like a tripod that never wobbles
- **The Solar Plexus Chakra**, our center of personal power
- **The number 4**, representing foundation and structure
</Section>

<Section>
## Mathematical Insights

The tetrahedron embodies the principle of **minimal complexity**. With its 4 faces, 4 vertices, and 6 edges, it is the simplest possible polyhedron. Remarkably, it is **self-dual**—its dual is another tetrahedron, rotated inside the original.

Every vertex connects to every other vertex—a complete graph in three dimensions. This represents total interconnection, where every point relates directly to all others. No simpler structure can achieve this.
</Section>

<Section>
## In Nature and Culture

The tetrahedral form appears throughout nature and sacred traditions:

- **Chemistry:** The carbon atom in methane (CH₄) forms a perfect tetrahedron
- **Crystals:** Diamond's crystal structure is based on tetrahedral geometry
- **Engineering:** The pyramid form provides maximum strength with minimum material
- **Symbolism:** Represents the element of fire in Greek philosophy—sharp, active, ascending
</Section>
```

### Benefits
- ✅ Uses existing MDX infrastructure (same as Sacred Patterns)
- ✅ Natural markdown - no text parsing needed
- ✅ Automatic styling via `mdx-components.tsx`
- ✅ Each `<Section>` wrapped in styled Card
- ✅ Easily extensible with more complex components later

---

## Page Component Changes

The `/platonic-solids/[slug]/page.tsx` will be simplified and restructured.

### Keep (data-driven sections)
- Header with title, description, hero image
- Visual Representations (3 images: solid, wireframe, net)
- Mathematical Properties grid (faces, vertices, edges)
- Symbolic Properties metadata (Element, Dual, Order)

### Replace with MDX
- Symbolic Properties narrative content
- Mathematical Insights paragraphs
- In Nature and Culture examples

### New Structure
```tsx
// Load data and MDX content
const geometry = getGeometryBySlug(slug);
const mdxContent = await getPlatonicSolidContent(slug);

// Render
<main>
  {/* Header - data model */}
  <Header title={geometry.title} description={geometry.description} />

  {/* Visual Representations - data model images */}
  <VisualRepresentations images={geometry.images} />

  {/* Mathematical Properties - data model */}
  <MathPropertiesGrid mathProperties={geometry.mathProperties} />

  {/* Symbolic Properties Metadata - data model */}
  <SymbolicMetadata element={geometry.relatedBy.element} dual={geometry.dualOfTitle} />

  {/* MDX Content - narrative sections */}
  {mdxContent?.content}

  {/* Navigation */}
  <GeometryNavigation currentSlug={slug} category="platonic" />
</main>
```

---

## Content Loading Updates

### New Loader Function

Create `src/lib/content/platonic-solids.ts`:

```typescript
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { MDXSection } from "@/components/mdx-section";
import { getMDXComponents } from "@/components/mdx-components";

/**
 * Platonic Solid MDX Content Interface
 */
export interface PlatonicSolidContent {
  slug: string;
  content: React.ReactElement;
}

/**
 * Get the path to a Platonic Solid MDX file
 */
function getContentPath(slug: string): string {
  return path.join(
    process.cwd(),
    "src/content/platonic-solids",
    `${slug}.mdx`
  );
}

/**
 * Check if a Platonic Solid MDX file exists
 */
export function platonicSolidContentExists(slug: string): boolean {
  const filePath = getContentPath(slug);
  return fs.existsSync(filePath);
}

/**
 * Load and compile Platonic Solid MDX content
 */
export async function getPlatonicSolidContent(
  slug: string
): Promise<PlatonicSolidContent | null> {
  const filePath = getContentPath(slug);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");

  // Get custom MDX components and merge with Section component
  const customComponents = getMDXComponents({
    Section: MDXSection,
  });

  const { content, frontmatter } = await compileMDX<{
    slug: string;
  }>({
    source,
    options: { parseFrontmatter: true },
    components: customComponents,
  });

  return {
    slug: frontmatter.slug ?? slug,
    content,
  };
}

/**
 * Get all available Platonic Solid content slugs
 */
export function getAllPlatonicSolidContentSlugs(): string[] {
  const contentDir = path.join(
    process.cwd(),
    "src/content/platonic-solids"
  );

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}
```

### Update Exports

Modify `src/lib/content/index.ts`:

```typescript
/**
 * Content loading and formatting utilities
 * Loads MDX content files for both Platonic Solids and Sacred Patterns
 */

// Platonic Solids (MDX)
export {
  getPlatonicSolidContent,
  getAllPlatonicSolidContentSlugs,
  platonicSolidContentExists,
  type PlatonicSolidContent,
} from "./platonic-solids";

// Sacred Patterns (MDX)
export {
  getSacredPatternContent,
  getAllSacredPatternContentSlugs,
  sacredPatternContentExists,
  type SacredPatternContent,
} from "./sacred-patterns";
```

---

## Implementation Steps

### Phase 1: Setup
1. ✅ Analyze current YAML structure and MDX implementation
2. ✅ Design MDX schema for Platonic Solids
3. ✅ Document migration plan

### Phase 2: Content Migration
4. ✅ Create `src/lib/content/platonic-solids.ts` MDX loader
5. ✅ Convert YAML files to MDX format:
   - tetrahedron.yml → tetrahedron.mdx
   - hexahedron.yml → hexahedron.mdx
   - octahedron.yml → octahedron.mdx
   - dodecahedron.yml → dodecahedron.mdx
   - icosahedron.yml → icosahedron.mdx

### Phase 3: Code Updates
6. ✅ Update `src/lib/content/index.ts` exports
7. ✅ Refactor `src/app/platonic-solids/[slug]/page.tsx` to use MDX
8. ✅ Test all 5 Platonic Solid pages render correctly

### Phase 4: Cleanup
9. ✅ Remove deprecated YAML files (*.yml)
10. ✅ Remove deprecated code:
    - `src/lib/content/loader.ts` (YAML loader)
    - `src/lib/content/format.ts` (formatText utility)
    - `src/lib/content/types.ts` (YAML types)

### Phase 5: Documentation
11. ✅ Update `CLAUDE.md` to reflect unified MDX system
12. ✅ Update `src/content/README.md` with new structure

---

## Files to Create/Modify/Remove

### Create
- ✅ `PLAN.md` (this file)
- ✅ `src/lib/content/platonic-solids.ts` (new MDX loader)
- ✅ `src/content/platonic-solids/tetrahedron.mdx`
- ✅ `src/content/platonic-solids/hexahedron.mdx`
- ✅ `src/content/platonic-solids/octahedron.mdx`
- ✅ `src/content/platonic-solids/dodecahedron.mdx`
- ✅ `src/content/platonic-solids/icosahedron.mdx`

### Modify
- ✅ `src/lib/content/index.ts` (update exports)
- ✅ `src/app/platonic-solids/[slug]/page.tsx` (use MDX instead of YAML)
- ✅ `CLAUDE.md` (update content system documentation)
- ✅ `src/content/README.md` (update with unified MDX approach)

### Remove (after testing)
- ✅ `src/content/platonic-solids/tetrahedron.yml`
- ✅ `src/content/platonic-solids/hexahedron.yml`
- ✅ `src/content/platonic-solids/octahedron.yml`
- ✅ `src/content/platonic-solids/dodecahedron.yml`
- ✅ `src/content/platonic-solids/icosahedron.yml`
- ✅ `src/lib/content/loader.ts` (YAML loader)
- ✅ `src/lib/content/format.ts` (formatText utility)
- ✅ `src/lib/content/types.ts` (YAML types)

---

## Risk Mitigation

### During Migration
- Keep YAML files until MDX implementation is tested and verified
- Test each converted file individually before moving to the next
- Keep git commits granular for easy rollback if needed

### Testing Strategy
1. Visual comparison: Compare rendered MDX pages with current YAML pages
2. Content verification: Ensure all text, formatting, and styling is preserved
3. Cross-browser testing: Verify rendering in multiple browsers
4. Build verification: Ensure production build succeeds

### Rollback Plan
- If issues arise, revert to YAML by:
  1. Restoring deleted YAML loader files
  2. Reverting page component changes
  3. Restoring YAML exports in index.ts

---

## Success Criteria

- ✅ All 5 Platonic Solid pages render correctly with MDX content
- ✅ Visual parity with existing YAML-based pages
- ✅ Production build succeeds without errors
- ✅ No TypeScript errors or warnings
- ✅ Content is easily editable in markdown format
- ✅ Documentation is updated and accurate
- ✅ Deprecated YAML code is removed

---

## Next Steps

After completing this migration:
1. Both content systems will use identical MDX infrastructure
2. Content editing will be unified and simplified
3. Future enhancements (custom components, interactive elements) can be added to both systems simultaneously
4. Content system is fully documented and maintainable

---

## Questions/Decisions

- ⬜ Should we keep the "Order" field in frontmatter (e.g., "First Solid") or remove it?
  - Current: Displayed in Symbolic Properties metadata section
  - Decision: Keep in data model's `order: number` field, optionally display as "First of Five" using logic

- ⬜ Should we add sections metadata to frontmatter for navigation?
  - Current: Sacred Patterns use this for table of contents
  - Decision: Not needed initially, can add later if desired

---

**Status:** ✅ **COMPLETE** - Migration successful!
**Completed:** 2025-10-20

## Migration Summary

The migration from YAML to MDX for Platonic Solid content has been successfully completed:

- ✅ All 5 YAML files converted to MDX format
- ✅ New MDX loader implemented and tested
- ✅ Page component refactored to use MDX
- ✅ All deprecated YAML code removed
- ✅ Documentation fully updated
- ✅ Production build successful
- ✅ All 5 Platonic Solid pages generated correctly

The project now uses a **unified MDX content system** for both Platonic Solids and Sacred Patterns, providing:
- Consistent content authoring experience
- Natural markdown formatting
- Reusable React components
- Better maintainability and extensibility
