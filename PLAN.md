# Responsive Design Improvement Plan

## Current State Summary

### Working Well
- Fluid typography with `clamp()` — smooth scaling, no jumps
- Mobile-first Tailwind patterns (`sm:`, `md:`, `lg:`)
- Touch-friendly spacing and button sizes
- Proper stacking layouts on mobile

### Issues Identified

| Priority | Issue | Location |
|----------|-------|----------|
| Critical | No mobile hamburger menu | `header.tsx` |
| Critical | Grid breakpoint jumps (1→3) | Detail pages |
| Medium | Navigation overflow on <375px | `geometry-navigation.tsx` |
| Medium | Fixed image dimensions | Multiple components |
| Minor | Inconsistent container padding | Various pages |

---

## Phase 1: Navigation & Header

### 1.1 Mobile Navigation Menu
- [ ] Add hamburger menu for screens < 640px
- [ ] Slide-out drawer with sacred geometry styling (gold accents, dark backdrop)
- [ ] Include: Platonic Solids, Sacred Patterns, Search trigger
- [ ] Animate with subtle reveal (opacity + translateY)

### 1.2 Header Overflow Protection
- [ ] Ensure logo + nav items never wrap
- [ ] Add `flex-shrink-0` to logo container
- [ ] Test at 320px viewport width

---

## Phase 2: Grid Intermediate Breakpoints

### 2.1 Visual Representations Grid
- Current: `initial: "1", md: "3"`
- Proposed: `initial: "1", sm: "2", lg: "3"`
- [ ] Update detail page grids for smoother tablet transition

### 2.2 Home Page Platonic Solids Grid
- Current: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`
- Consider: `grid-cols-2 md:grid-cols-3 lg:grid-cols-5`
- [ ] Delay 3-col until md breakpoint

### 2.3 Associations/Properties Grids
- [ ] Add `sm:grid-cols-2` before jumping to `md:grid-cols-3`

---

## Phase 3: Responsive Images

### 3.1 Hero Images
- [ ] Replace fixed `width={400}` with responsive sizing
- [ ] Use `sizes` prop: `sizes="(max-width: 768px) 100vw, 50vw"`
- [ ] Consider `aspect-ratio: 1` with percentage-based width

### 3.2 Card Images
- [ ] Use `fill` layout with container sizing
- [ ] Apply `object-contain` consistently

---

## Phase 4: Navigation Component Polish

### 4.1 GeometryNavigation Improvements
- [ ] Add `min-w-0` to allow text truncation
- [ ] Smaller font on mobile: `text-sm sm:text-base`
- [ ] Icon-only mode for extra-small screens (< 400px)

### 4.2 Touch Target Sizing
- [ ] Ensure all buttons meet 44px minimum touch target
- [ ] Add `min-h-11` to navigation buttons

---

## Phase 5: Container & Spacing Consistency

### 5.1 Standardize Container Pattern
```tsx
// Proposed standard
<div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
```

### 5.2 Spacing Scale Review
- [ ] Mobile: `gap-4` / `py-8`
- [ ] Tablet: `gap-6` / `py-12`
- [ ] Desktop: `gap-8` / `py-16`

---

## Aesthetic Guidelines

Improvements must maintain the site's distinctive character:

- **Dark theme with gold/copper accents** — preserve throughout responsive states
- **Sacred geometry motifs** — mobile menu could feature subtle geometric patterns
- **Refined minimalism** — avoid clutter on mobile, prioritize breathing room
- **Motion** — scale back animations on mobile for performance, keep subtle hover states

---

## Implementation Order

1. **Header mobile menu** — Highest impact, solves critical overflow issue
2. **Grid intermediate breakpoints** — Quick wins, CSS-only changes
3. **Navigation component polish** — Improves usability on small phones
4. **Responsive images** — Performance improvement
5. **Container standardization** — Consistency polish
