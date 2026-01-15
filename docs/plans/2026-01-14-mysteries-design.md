# Mysteries: Deep-Dive Relationship Content

## Overview

Create a new "Mysteries" section for the sacred geometry site that provides deep, narrative explorations of how geometries relate, transform, and emerge from one another. This is the flagship content type for visitors sincerely interested in learning sacred geometry.

## The Vision

Four initiatives to build depth around geometry relationships:

| Initiative | Description | Priority |
|------------|-------------|----------|
| **Mysteries (Journey Pages)** | Narrative explorations of transformations and relationships | **This session** |
| Expanded Relationship Cards | Click-through from existing cards to deeper content | Future |
| Relationships Hub | Index/map of all connections, browsable by type | Future |
| Illustrated Construction Guides | Step-by-step drawing instructions | Future |

## Mysteries Design

### Naming & URL Structure

```
/mysteries/                              → Mysteries index page
/mysteries/circle-to-flower-of-life      → Individual mystery page
```

### Flagship Mystery: Circle to Flower of Life

**7 Steps:**
1. The Circle (circle-dot)
2. The Vesica Piscis (vesica-piscis)
3. The Germ of Life (germ-of-life)
4. The Seed of Life (seed-of-life)
5. The Egg of Life (egg-of-life)
6. The Flower of Life (flower-of-life)
7. The Fruit of Life (fruit-of-life)

### Page Experience

- **Single page with anchored chapters** — Immersive scroll with clear sections
- **Sticky progress indicator** — Dots showing current step, clickable navigation
- **Scroll-triggered animations** — Subtle fade/slide reveals
- **Future: Key animated transitions** — Show transformations for "wow" moments
- **Balanced tone** — Educational + spiritual (matching existing content voice)

### Page Layout

```
┌─────────────────────────────────────────────────┐
│  Header: "The Mystery of the Unfolding Flower"  │
│  Subtitle + brief intro                         │
├─────────────────────────────────────────────────┤
│  Progress Indicator (sticky)                    │
│  ○───○───○───●───○───○───○                      │
├─────────────────────────────────────────────────┤
│  Step 1: The Circle                             │
│  [Image]  Narrative text...                     │
│                                                 │
│  ─ Transition: "What happens when..." ─         │
│                                                 │
│  Step 2: The Vesica Piscis                      │
│  [Image]  Narrative text...                     │
│                                                 │
│  ... continues through all 7 steps ...          │
├─────────────────────────────────────────────────┤
│  Footer: Related mysteries + geometry links     │
└─────────────────────────────────────────────────┘
```

### Data Model

**Types (`src/lib/data/mysteries.types.ts`):**

```typescript
// Type-safe mystery IDs (following geometry pattern)
export const MYSTERY_IDS = [
  "circle-to-flower-of-life",
  // ... future mysteries
] as const;

export type MysteryId = (typeof MYSTERY_IDS)[number];

export interface MysteryImages {
  heroImage: string;
  thumbnailImage?: string;
}

export interface Mystery {
  id: MysteryId;
  slug: string;
  title: string;              // "The Mystery of the Unfolding Flower"
  subtitle: string;           // "From primordial circle to infinite pattern"
  description: string;        // SEO/meta
  images: MysteryImages;
  steps: MysteryStep[];
  relatedMysteries?: MysteryId[];
  featured: boolean;
  order?: number;
  category?: "creation" | "transformation" | "revelation";
}

export interface MysteryStep {
  number: number;
  id: string;                 // "circle", "vesica-piscis"
  geometryId: GeometryId;     // Links to existing geometry
  title: string;              // "The Circle" or "The One"
  shortTitle: string;         // "Circle" - for progress indicator
  anchor: string;             // #the-circle
  transitionText?: string;    // "What happens when..."
}
```

**MDX Content Pattern:**

```mdx
---
slug: circle-to-flower-of-life
---

<MysteryStep step="circle">
## The Circle

Narrative content here...
</MysteryStep>

<MysteryTransition>
What happens when unity seeks to know itself?
</MysteryTransition>

<MysteryStep step="vesica-piscis">
## The Vesica Piscis

Narrative content here...
</MysteryStep>
```

### Navigation & Discovery

**Main Nav:** Add "Mysteries" after Sacred Patterns

```
Platonic Solids | Sacred Patterns | Mysteries | Shop
```

**Mysteries Index:** Card grid showing available mysteries

**Contextual Links:** On geometry detail pages, show callout when geometry appears in a mystery:

```
┌─────────────────────────────────────────────────┐
│  ✦ Explore this Mystery                        │
│  The Vesica Piscis is step 2 of 7 in          │
│  "The Mystery of the Unfolding Flower"         │
│  [Continue the journey →]                       │
└─────────────────────────────────────────────────┘
```

## Visual Design Specifications

### Design System Integration

**Colors** (from existing CSS variables):
- Backgrounds: `--color-obsidian`, `--color-warm-charcoal`, `--color-dark-bronze`
- Gold accents: `--color-gold`, `--color-gold-bright`, `--color-gold-muted`
- Copper/Bronze: `--color-copper`, `--color-bronze`
- Effects: `--glow-gold`, `--border-gold`

**Typography**:
- Display: `font-display` (Cinzel Decorative) - ceremonial headers
- Heading: `font-heading` (Cormorant Garamond) - section titles
- Body: `font-body` (Crimson Pro) - narrative text

**Animation** (from existing constants):
- Golden ratio timing: `PHI = 1.618`, `PHI_INVERSE = 0.618`
- Standard duration: `0.618s` with `EASE_PHI` easing
- Use existing `AnimateOnScroll`, `StaggerChildren` components

### MysteryProgress Component

**Visual Concept**: Seven circles connected by a golden thread
- Pill-shaped glassmorphism container (`rounded-full`, `backdrop-blur-md`)
- Horizontal golden line connecting all nodes
- Progress fill line (gradient) advances as user scrolls
- Active node: Pulsing glow animation (2s cycle)
- Hover tooltips show step names
- **Mobile**: Simplified to "2 / 7 - Vesica Piscis" counter

**Scroll Tracking**:
```typescript
const { scrollY } = useScroll();
useMotionValueEvent(scrollY, "change", () => {
  stepRefs.current.forEach((ref, index) => {
    const rect = ref.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.5 && rect.bottom > 0) {
      setCurrentStep(index);
    }
  });
});
```

### MysteryStep Component

- **Alternating layout**: Odd steps = image left, even steps = image right
- **Step indicator**: Numbered circle with gradient line extending right
- **Image animation**: Rotation + scale entrance using `EASE_PHI`
- **Golden glow**: Blurred radial behind geometry images
- **Gold image filter**: `brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg)`

### MysteryTransition Component

- Horizontal gradient separators above/below
- Italic `font-heading` for contemplative tone
- Gold accent on key words (geometry names)
- Decorative marks: Hedera (❧) or three-dot pattern
- Longer fade duration (1.0s) for meditative reveal

### MysteryCard Component

- Gradient background: warm charcoal → dark bronze
- Faint background pattern: final geometry outline at 4% opacity
- Journey preview: "Circle → Vesica Piscis → ... → Fruit of Life"
- Animated CTA arrow: gentle horizontal bounce
- Hover: 4px lift with golden glow shadow

### MysteryCallout Component

- Horizontal gradient ribbon appearance
- Corner accent: Subtle diagonal gold highlight
- Progress indicator: "step X of Y" in gold text
- Outline button with fill on hover

## Files to Create

| File | Purpose |
|------|---------|
| `src/lib/data/mysteries.types.ts` | TypeScript interfaces with MysteryId union type |
| `src/lib/data/mysteries.ts` | Mystery definitions + helper functions |
| `src/lib/content/mysteries.ts` | MDX content loader (following platonic-solids pattern) |
| `src/content/mysteries/circle-to-flower-of-life.mdx` | Narrative content |
| `src/app/mysteries/page.tsx` | Mysteries index |
| `src/app/mysteries/[slug]/page.tsx` | Mystery detail page |
| `src/components/mysteries/mystery-header.tsx` | Title/intro component |
| `src/components/mysteries/mystery-progress.tsx` | Sticky progress indicator with scroll tracking |
| `src/components/mysteries/mystery-step.tsx` | Step container (integrates with ContentLayoutContext) |
| `src/components/mysteries/mystery-transition.tsx` | Bridge text between steps |
| `src/components/mysteries/mystery-callout.tsx` | Contextual link for geometry pages |
| `src/components/mysteries/mystery-card.tsx` | Card for index page |

**Files to Modify:**

| File | Change |
|------|--------|
| `src/lib/data/index.ts` | Export mystery functions |
| `src/lib/content/index.ts` | Export mystery content loader |
| `src/components/mdx-components.tsx` | Register MysteryStep, MysteryTransition |
| `src/util/routes.ts` | Add mysteries routes |
| Navigation component | Add "Mysteries" to main nav |

## Helper Functions

**In `src/lib/data/mysteries.ts`:**

```typescript
export function getMysteries(): Mystery[]
export function getMysteryBySlug(slug: string): Mystery | undefined
export function getMysteryById(id: MysteryId): Mystery | undefined
export function getFeaturedMysteries(): Mystery[]
export function getMysteryPath(mystery: Mystery): string
export function getNextMystery(currentId: MysteryId): Mystery | undefined
export function getPreviousMystery(currentId: MysteryId): Mystery | undefined
export function getMysteryForGeometry(geometryId: GeometryId): Mystery | undefined
export function getStepForGeometry(geometryId: GeometryId): { mystery: Mystery; step: MysteryStep } | undefined
```

## Implementation Planning Approach

Before coding, run multi-agent planning:

1. **Frontend-design agents** — Refine visual design, component styling, animation details
2. **Feature-dev agents** — Validate architecture, verify code patterns match existing codebase

## Implementation Phases

1. **Data layer first** — Types and mystery definitions
2. **Basic page structure** — Index and detail pages with minimal styling
3. **Components** — Build mystery-specific components
4. **Content** — Write the 7-step narrative
5. **Polish** — Scroll animations, progress indicator, responsive design
6. **Integration** — Nav updates, contextual callouts on geometry pages

## Verification

- [ ] `/mysteries` shows index with mystery card
- [ ] `/mysteries/circle-to-flower-of-life` renders all 7 steps
- [ ] Progress indicator updates on scroll and allows click navigation
- [ ] Contextual callouts appear on relevant geometry pages
- [ ] Mobile responsive layout works
- [ ] `pnpm check` passes
- [ ] `pnpm build` succeeds

## Future Mysteries (not in scope)

- Metatron's Cube → Five Platonic Solids
- Platonic Solid Dualities (Cube↔Octahedron, etc.)
- Golden Ratio Threads
- Star Tetrahedron / Merkaba

## Linear Tracking

| Issue | Title | Status |
|-------|-------|--------|
| [SG-229](https://linear.app/sherpagg/issue/SG-229/mysteries-deep-dive-relationship-content-pages) | Mysteries: Deep-Dive Relationship Content Pages | **This session** |
| [SG-230](https://linear.app/sherpagg/issue/SG-230/expanded-relationship-cards) | Expanded Relationship Cards | Future |
| [SG-231](https://linear.app/sherpagg/issue/SG-231/relationships-hub) | Relationships Hub | Future |
| [SG-232](https://linear.app/sherpagg/issue/SG-232/illustrated-construction-guides) | Illustrated Construction Guides | Future |

**Branch:** `sg-229-mysteries-deep-dive-relationship-content-pages`
