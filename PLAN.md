# Detail Page Layout Enhancement Plan

**Linear Initiative:** [SG-85](https://linear.app/sherpagg/issue/SG-85/detail-page-layout-enhancement-initiative)

## Overview

Targeted improvements to the Platonic Solid and Sacred Pattern detail pages to enhance visual impact and user experience while maintaining the current design language.

## Guiding Principles

- **Enhance, don't restructure** - Build on existing solid foundation
- **Subtle refinements** - Small changes with high visual impact
- **Maintain consistency** - Keep the gold/obsidian aesthetic cohesive
- **Respect reduced motion** - All animations honor user preferences

---

## Phase 1: Hero Section Enhancement

**Linear Issue:** [SG-80](https://linear.app/sherpagg/issue/SG-80/phase-1-hero-section-enhancement)

**Goal:** Make the hero geometry feel more luminous and precious with subtle background effects.

### Changes

1. **Radial glow behind hero geometry**
   - Add subtle gold radial gradient emanating from center
   - Pulsing/breathing animation on the glow (subtle, slow)
   - Ensure glow doesn't overpower the geometry itself

2. **Hero section vertical rhythm**
   - Review spacing between title, description, and geometry
   - Ensure consistent padding on mobile vs desktop

### Files to Modify
- `src/components/detail-hero.tsx` - Add glow wrapper component
- `src/app/platonic-solids/[slug]/page.tsx` - Apply to hero
- `src/app/sacred-patterns/[slug]/page.tsx` - Apply to hero

---

## Phase 2: Visual Representations Card (Platonic Solids)

**Linear Issue:** [SG-81](https://linear.app/sherpagg/issue/SG-81/phase-2-visual-representations-card-enhancement)

**Goal:** Give the 3 geometry views more breathing room and visual presence.

### Changes

1. **Increase image sizes**
   - Bump from 150×150px to 200×200px
   - Adjust container height accordingly

2. **Improve card padding**
   - Add more vertical space within the card
   - Better separation between images and labels

3. **Enhance hover interaction**
   - Consider individual image hover states (subtle scale)
   - Keep coordinated with existing PulsingGeometry effect

### Files to Modify
- `src/app/platonic-solids/[slug]/page.tsx` - Image sizes and card padding

---

## Phase 3: Breadcrumb Navigation

**Linear Issue:** [SG-82](https://linear.app/sherpagg/issue/SG-82/phase-3-breadcrumb-navigation)

**Goal:** Improve wayfinding with contextual breadcrumb trail.

### Changes

1. **Create Breadcrumb component**
   - Simple, elegant design matching site aesthetic
   - Format: `Sacred Patterns / Flower of Life` or `Platonic Solids / Tetrahedron`
   - Subtle separator (perhaps a small geometric shape)
   - Gold accent color for links, cream for current page

2. **Position above hero**
   - Small text, doesn't compete with hero title
   - Responsive: may hide on very small screens

### Files to Create/Modify
- `src/components/breadcrumb-nav.tsx` - New component
- `src/app/platonic-solids/[slug]/page.tsx` - Add breadcrumb
- `src/app/sacred-patterns/[slug]/page.tsx` - Add breadcrumb

---

## Phase 4: Animated Number Counters (Platonic Solids)

**Linear Issue:** [SG-83](https://linear.app/sherpagg/issue/SG-83/phase-4-animated-number-counters)

**Goal:** Add subtle delight when Mathematical Properties card enters viewport.

### Changes

1. **Count-up animation for numbers**
   - Faces, Vertices, Edges count from 0 to final value
   - Triggered on scroll into view (once)
   - Duration: ~1 second with easing
   - Respects reduced motion preference (instant display)

2. **Staggered reveal**
   - Each number starts slightly after the previous
   - Creates a left-to-right reveal effect

### Files to Create/Modify
- `src/components/animated-counter.tsx` - New component
- `src/app/platonic-solids/[slug]/page.tsx` - Replace static numbers

---

## Phase 5: Related Geometries Enhancement (Sacred Patterns)

**Linear Issue:** [SG-84](https://linear.app/sherpagg/issue/SG-84/phase-5-related-geometries-visual-enhancement)

**Goal:** Make the Related Geometries section more visual and inviting.

### Changes

1. **Add geometry thumbnails**
   - Small (40-50px) geometry images next to each related pattern name
   - Reuse existing hero images at small size
   - Subtle hover effect to indicate clickability

2. **Improve section layout**
   - Convert from simple text list to card-based layout
   - Group by relationship type (Contains, Derived From, etc.)
   - Each item becomes a mini-card with image + name

3. **Consider implementation approach**
   - Option A: Enhance MDX components to support images
   - Option B: Move Related Geometries out of MDX into page template
   - Recommendation: Option B for better data model integration

### Files to Modify
- `src/app/sacred-patterns/[slug]/page.tsx` - Add Related Geometries section
- `src/content/sacred-patterns/*.mdx` - Remove Related Geometries from MDX (if moving to template)
- Possibly create new `RelatedGeometries` component

---

## Implementation Order

| Phase | Issue | Description | Priority | Effort |
|-------|-------|-------------|----------|--------|
| 1 | [SG-80](https://linear.app/sherpagg/issue/SG-80) | Hero Section Enhancement | High | Low |
| 2 | [SG-81](https://linear.app/sherpagg/issue/SG-81) | Visual Representations Card | High | Low |
| 3 | [SG-82](https://linear.app/sherpagg/issue/SG-82) | Breadcrumb Navigation | Medium | Low |
| 4 | [SG-83](https://linear.app/sherpagg/issue/SG-83) | Animated Number Counters | Medium | Medium |
| 5 | [SG-84](https://linear.app/sherpagg/issue/SG-84) | Related Geometries Enhancement | Medium | Medium |

**Recommended approach:** Complete phases sequentially, reviewing each before proceeding. Phases 1-3 can likely be completed quickly. Phases 4-5 require more consideration.

---

## Success Criteria

- [ ] Hero geometry has subtle luminous glow effect
- [ ] Visual Representations images are larger with better spacing
- [ ] Breadcrumb appears on all detail pages
- [ ] Mathematical Properties numbers animate on scroll
- [ ] Related Geometries shows visual thumbnails
- [ ] All animations respect prefers-reduced-motion
- [ ] No regression in page load performance
- [ ] Mobile experience remains excellent

---

## Out of Scope

These were considered but intentionally excluded:

- **Card layout asymmetry** - Current uniform design works well
- **Click-to-expand image modals** - Over-engineering for current needs
- **Complex page transitions** - Already decided against in previous work
- **Parallax scrolling effects** - Would conflict with accessibility goals
