# Sacred Geometry Frontend Design Enhancement Plan

## Linear Tracking

**Epic**: [SG-159 - Frontend Design Enhancement: Sacred Geometry Principles](https://linear.app/sherpagg/issue/SG-159)

| Phase | Issue | Title |
|-------|-------|-------|
| 1 | [SG-153](https://linear.app/sherpagg/issue/SG-153) | Animation Constants & Sacred Timing Foundation |
| 2 | [SG-154](https://linear.app/sherpagg/issue/SG-154) | Color Palette Extension: Cosmic Blues & Element Colors |
| 3 | [SG-155](https://linear.app/sherpagg/issue/SG-155) | Golden Ratio Layout System |
| 4 | [SG-156](https://linear.app/sherpagg/issue/SG-156) | Hero Emergence Animation with Golden Ratio Scaling |
| 5 | [SG-157](https://linear.app/sherpagg/issue/SG-157) | Geometric Watermarks & Background Atmospherics |
| 6 | [SG-158](https://linear.app/sherpagg/issue/SG-158) | View Transitions API (Experimental) |

**Dependencies**: SG-156 is blocked by SG-153

---

## Overview

Transform the Sacred Geometry website's frontend to embody sacred geometric principles in its design language. The site has strong foundations (gold/copper/obsidian palette, thematic fonts, motion infrastructure) but layouts are predictably symmetric, colors are monochromatic, and motion doesn't reference geometric concepts.

**Goal**: Make every design choice a deliberate reference to sacred geometric principles—golden ratio layouts, phi-based easing, element-specific colors, and geometric emergence animations.

---

## Phase 1: Animation Constants & Sacred Timing ([SG-153](https://linear.app/sherpagg/issue/SG-153))

**Purpose**: Establish shared animation constants that reference sacred geometry, eliminating duplicated magic numbers.

### Files to Create

#### `src/lib/animation-constants.ts` (NEW)
```typescript
// Golden ratio constants
export const PHI = 1.618033988749;
export const PHI_INVERSE = 1 / PHI; // 0.618...

// Sacred timing (based on phi and significant numbers)
export const TIMING = {
  fast: 0.3,
  normal: 0.618,      // Golden ratio
  slow: 1.0,
  breath: 4.0,        // Ambient loops
  emergence: 1.2,     // Hero emergence
  rotation: 120,      // Full cycle (existing)
} as const;

// Golden ratio easing curve
export const EASE_PHI: [number, number, number, number] = [0.618, 0, 0.382, 1];
export const EASE_EMERGENCE: [number, number, number, number] = [0.36, 0, 0.66, 1];
export const EASE_STANDARD: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
```

### Files to Modify

- **14+ files** currently duplicate `[0.25, 0.46, 0.45, 0.94]` easing—update to import from constants

---

## Phase 2: Color Palette Extension ([SG-154](https://linear.app/sherpagg/issue/SG-154))

**Purpose**: Add cosmic blues for depth, element-specific colors for Platonic solids, and platinum/silver for mathematical precision.

### File: `src/styles/globals.css`

Add to `@theme` block after existing colors (around line 51):

```css
/* Cosmic Blues - Celestial depth */
--color-cosmos: #0a0d14;
--color-midnight: #141a2a;
--color-nebula: #3a4a6e;
--glow-cosmic: rgba(58, 74, 110, 0.25);

/* Element Colors - Classical associations */
--color-element-fire: #c94a35;
--color-element-earth: #5a8f5a;
--color-element-air: #a8b4c0;
--color-element-water: #4a7a8c;
--color-element-aether: #9a8ac4;

/* Element Glows */
--glow-fire: rgba(201, 74, 53, 0.2);
--glow-earth: rgba(90, 143, 90, 0.2);
--glow-air: rgba(168, 180, 192, 0.2);
--glow-water: rgba(74, 122, 140, 0.2);
--glow-aether: rgba(154, 138, 196, 0.2);

/* Precious Metals - Mathematical precision */
--color-platinum: #e8e8ec;
--color-silver: #b8bcc8;
--color-graphite: #6a6e7a;
```

Add utility classes to `@layer utilities`:

```css
/* Element text colors */
.text-fire { color: var(--color-element-fire); }
.text-earth { color: var(--color-element-earth); }
.text-air { color: var(--color-element-air); }
.text-water { color: var(--color-element-water); }
.text-aether { color: var(--color-element-aether); }
```

### File: `src/app/platonic-solids/page.tsx`

Update `colorMap` (lines 28-35) to use CSS variables:

```typescript
const colorMap: Record<string, string> = {
  tetrahedron: "text-[var(--color-element-fire)]",
  hexahedron: "text-[var(--color-element-earth)]",
  octahedron: "text-[var(--color-element-air)]",
  dodecahedron: "text-[var(--color-element-aether)]",
  icosahedron: "text-[var(--color-element-water)]",
};
```

---

## Phase 3: Golden Ratio Layout System ([SG-155](https://linear.app/sherpagg/issue/SG-155))

**Purpose**: Apply 1.618:1 proportions to layouts, directly expressing the site's subject matter.

### File: `src/styles/globals.css`

Add to `@theme` block:

```css
/* Golden Ratio Layout */
--golden-ratio: 1.618;
--golden-ratio-inverse: 0.618;
```

Add to `@layer utilities`:

```css
/* Golden ratio grid columns */
.grid-cols-golden {
  grid-template-columns: 1fr 1.618fr;
}
.grid-cols-golden-reverse {
  grid-template-columns: 1.618fr 1fr;
}
```

### Files to Modify

| File | Current | Change |
|------|---------|--------|
| `src/app/platonic-solids/[slug]/page.tsx` | `<Grid columns={{ md: "2" }}>` (50/50 hero) | Use `grid-cols-[1fr_1.618fr]` for hero |
| `src/app/sacred-patterns/[slug]/page.tsx` | `<Grid columns={{ md: "2" }}>` (50/50 hero) | Use `grid-cols-[1fr_1.618fr]` for hero |
| `src/components/content-layout.tsx` | Fixed `lg:w-64` sidebar | Grid `grid-cols-[1fr_1.618fr]` or flex ratio |

---

## Phase 4: Hero Emergence Animation ([SG-156](https://linear.app/sherpagg/issue/SG-156))

**Purpose**: Create a mystical "manifestation from void" sequence for detail page heroes.

### File: `src/components/detail-hero.tsx`

Replace current simple fade/rotate with multi-phase emergence:

```typescript
import { EASE_EMERGENCE, PHI_INVERSE, TIMING } from "@/lib/animation-constants";

const emergenceVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    filter: "blur(20px)",
  },
  emerging: {
    opacity: [0, 0.3, 0.6, 1],
    scale: [0, 0.1, PHI_INVERSE, 1], // Golden ratio scaling
    filter: ["blur(20px)", "blur(10px)", "blur(2px)", "blur(0px)"],
    rotate: [0, 45, 90, 0],
    transition: {
      duration: TIMING.emergence,
      times: [0, 0.3, 0.6, 1],
      ease: EASE_EMERGENCE,
    },
  },
  breathing: {
    scale: [1, 1.02, 1],
    opacity: [1, 0.95, 1],
    transition: {
      duration: TIMING.breath,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
```

Update `HeroGeometry` component to use new variants and chain animations.

---

## Phase 5: Geometric Watermarks & Backgrounds ([SG-157](https://linear.app/sherpagg/issue/SG-157))

**Purpose**: Add page-specific sacred geometry patterns as subtle atmospheric elements.

### File: `src/components/section-background.tsx` (NEW)

```typescript
interface SectionBackgroundProps {
  pattern: "metatrons-cube" | "flower-of-life" | "seed-of-life";
  opacity?: number;
  className?: string;
}

export function SectionBackground({ pattern, opacity = 0.03, className }: SectionBackgroundProps) {
  const patternPath = {
    "metatrons-cube": "/images/geometries/sacred-patterns/metatrons-cube/metatrons-cube-wireframe.svg",
    "flower-of-life": "/images/geometries/sacred-patterns/flower-of-life/flower-of-life-wireframe.svg",
    "seed-of-life": "/images/geometries/sacred-patterns/seed-of-life/seed-of-life-wireframe.svg",
  };
  // Render fixed position background with pattern
}
```

### Files to Modify

| Page Type | Watermark Pattern |
|-----------|-------------------|
| `src/app/platonic-solids/[slug]/page.tsx` | Metatron's Cube (contains all 5 solids) |
| `src/app/sacred-patterns/[slug]/page.tsx` | Seed of Life |
| Homepage | Keep existing Flower of Life |

### File: `src/styles/globals.css`

Add cosmic gradient mesh utility:

```css
.cosmic-gradient-bg {
  background:
    radial-gradient(ellipse 80% 50% at 20% 30%, rgba(212, 168, 75, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 80% 70%, rgba(184, 115, 51, 0.06) 0%, transparent 50%),
    var(--color-obsidian);
}
```

---

## Phase 6: View Transitions ([SG-158](https://linear.app/sherpagg/issue/SG-158)) - Experimental

**Purpose**: Enable smooth page-to-page morphing transitions.

### File: `next.config.js`

```javascript
experimental: {
  viewTransitions: true,
}
```

### File: `src/styles/globals.css`

```css
::view-transition-old(geometry-hero),
::view-transition-new(geometry-hero) {
  animation-duration: 0.5s;
  animation-timing-function: cubic-bezier(0.618, 0, 0.382, 1);
}
```

**Note**: View Transitions API is experimental. Test thoroughly before enabling.

---

## Implementation Order

| Order | Issue | Phase | Effort | Impact |
|-------|-------|-------|--------|--------|
| 1 | [SG-153](https://linear.app/sherpagg/issue/SG-153) | Animation Constants | 1 hour | Foundation |
| 2 | [SG-154](https://linear.app/sherpagg/issue/SG-154) | Color Palette | 1 hour | Medium |
| 3 | [SG-155](https://linear.app/sherpagg/issue/SG-155) | Golden Ratio Layouts | 2 hours | High |
| 4 | [SG-156](https://linear.app/sherpagg/issue/SG-156) | Hero Emergence | 2 hours | High |
| 5 | [SG-157](https://linear.app/sherpagg/issue/SG-157) | Backgrounds | 2 hours | Medium |
| 6 | [SG-158](https://linear.app/sherpagg/issue/SG-158) | View Transitions | 1 hour | Experimental |

**Total Estimated Effort**: 8-10 hours

---

## Files Summary

### New Files to Create
- `src/lib/animation-constants.ts`
- `src/components/section-background.tsx`

### Files to Modify
| File | Changes |
|------|---------|
| `src/styles/globals.css` | Add colors, layout utilities, gradient backgrounds |
| `src/app/platonic-solids/page.tsx` | Update colorMap to use CSS variables |
| `src/app/platonic-solids/[slug]/page.tsx` | Golden ratio hero layout |
| `src/app/sacred-patterns/[slug]/page.tsx` | Golden ratio hero layout, add watermark |
| `src/components/detail-hero.tsx` | Multi-phase emergence animation |
| `src/components/content-layout.tsx` | Golden ratio sidebar proportions |
| `next.config.js` | View transitions (optional) |

---

## Verification Plan

### Visual Testing
1. Run `pnpm dev` and verify:
   - Homepage loads with existing Flower of Life background
   - Navigate to a Platonic solid page → hero emergence animation plays
   - Hero layout shows golden ratio proportions (geometry ~38%, text ~62%)
   - Element colors appear on Platonic solids listing page icons
   - Metatron's Cube watermark visible at low opacity on Platonic solid detail pages

### Accessibility Testing
2. Enable "Reduce Motion" in system preferences:
   - Verify animations respect `prefers-reduced-motion`
   - Content should appear immediately without animation

### Type Checking
3. Run `pnpm check` to verify no TypeScript errors

### Build Testing
4. Run `pnpm build` to verify production build succeeds

### Cross-Browser
5. Test in Chrome, Firefox, Safari:
   - Golden ratio grids render correctly
   - CSS custom properties work
   - Animations play smoothly

---

## Notes

- **Reduced Motion**: All animations already respect user preference via `MotionProvider`
- **Performance**: SVG watermarks are lightweight; CSS animations are GPU-accelerated
- **Radix UI Grid**: For golden ratio, prefer Tailwind grids over Radix `<Grid>` for precise control
- **View Transitions**: Mark as experimental; can be deferred if issues arise
