# Sacred Geometry Website Enhancement Plan

## Overview

Transform the Sacred Geometry website from a functional dark-themed site into a **distinctive, memorable portfolio piece** that demonstrates sophisticated frontend skills and refined design taste.

### Goals

1. **Impress hiring managers** — Create a "wow" moment in the first 5-10 seconds
2. **Demonstrate technical skill** — Modern animations, performance optimization, responsive design
3. **Show design taste** — Elegant restraint over flashy complexity
4. **Future-proof** — Architecture ready for blog (Journal) and e-commerce (Shop) expansion

### Design Philosophy

**Elegant restraint**: Multiple subtle effects that compound into something memorable, rather than one dramatic animation. Harder to execute well, ages better, signals sophistication.

---

## Color Palette: Obsidian, Copper & Gold

A distinctive palette that evokes ancient metalwork, alchemical instruments, and sacred artifacts. Completely avoids the purple gradient "AI slop" aesthetic.

### Backgrounds

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Deep | Obsidian | `#0c0c0c` | Page background |
| Mid | Warm Charcoal | `#1a1714` | Card backgrounds |
| Elevated | Dark Bronze | `#252019` | Hover states, elevated cards |

### Primary Accent (Gold)

Gold carries esoteric significance: divine light, solar consciousness, spiritual perfection.

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | True Gold | `#d4a84b` | Hero text, primary highlights, geometry line art |
| Light | Bright Gold | `#e8c068` | Hover states, glows |
| Muted | Aged Gold | `#a68a3c` | Pressed states |

### Secondary Accent (Copper)

Copper provides structure and earthly grounding—the vessel for golden light.

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Warm Copper | `#b87333` | Secondary buttons, borders |
| Secondary | Aged Bronze | `#8a7355` | Tertiary text, subtle accents |
| Tertiary | Tarnished | `#5c4d3d` | Dividers, faint borders |

### Text

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Cream | `#f5f0e6` | Headings, primary text |
| Secondary | Warm Gray | `#b8a99a` | Body text, descriptions |
| Muted | Dim | `#7a6b5a` | Captions, metadata |

### Effects

| Role | Value | Usage |
|------|-------|-------|
| Gold Glow | `rgba(212, 168, 75, 0.2)` | Primary hover glows, focus rings |
| Copper Glow | `rgba(184, 115, 51, 0.15)` | Secondary hover glows |
| Gold Border | `rgba(212, 168, 75, 0.3)` | Card borders |

### Thematic Hierarchy

- **Gold** = Sacred, primary, divine (hero titles, key geometry, primary CTAs)
- **Copper** = Supporting, structural, earthly (card borders, secondary actions, navigation)
- **Obsidian** = The void from which form emerges (backgrounds)

---

## Typography

Replace system fonts with distinctive typefaces that evoke ancient manuscripts and sacred texts.

### Font Stack

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display | Cinzel Decorative | 400, 700 | Hero titles, page headings |
| Heading | Cormorant Garamond | 500, 600 | Section headings, card titles |
| Body | Crimson Pro (or current) | 400, 500 | Body text, descriptions |

### Scale

Define CSS custom properties for consistent sizing:

```css
--font-display: 'Cinzel Decorative', serif;
--font-heading: 'Cormorant Garamond', serif;
--font-body: 'Crimson Pro', serif;

--text-hero: clamp(2.5rem, 8vw, 5rem);
--text-page-title: clamp(2rem, 5vw, 3.5rem);
--text-section: clamp(1.5rem, 3vw, 2rem);
--text-card-title: clamp(1.125rem, 2vw, 1.5rem);
--text-body: 1rem;
--text-small: 0.875rem;
```

---

## Hero Experience

The homepage hero creates an immediate impression through layered subtlety.

### Visual Layers (back to front)

1. **Deep background** — Obsidian base with subtle animated grain texture. The grain slowly shifts, creating living atmosphere without demanding attention.

2. **Geometric pattern layer** — A faded Flower of Life SVG positioned off-center, slowly rotating (one full rotation per 60+ seconds). Opacity ~8-12%. Feels ancient, like a watermark on metal.

3. **Content layer** — The title "Sacred Geometry" in Cinzel Decorative with gold coloring. Subtitle and CTAs fade in with staggered timing (200ms delays).

### Motion Design

- **Page load**: Background gradient subtly shifts, then content fades up in sequence (title → subtitle → buttons)
- **Scroll**: Gentle parallax—background pattern moves at 0.9x scroll speed relative to content
- **Timing**: All animations use `ease-out` curves and modest distances (20-30px transforms)
- **Duration**: Entrance animations 0.6-0.8s, hover transitions 0.3-0.4s

### Technical Implementation

```tsx
// Hero entrance animation config
const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] // ease-out
    }
  })
};
```

---

## Scroll Experience & Card Animations

Content should *arrive* rather than just appear. Each element earns its place through purposeful motion.

### Scroll-Triggered Reveals

- **Cards**: Fade up with slight Y-translation (20px → 0) as they enter viewport
- **Stagger timing**: Cards in a row animate with 100ms delays between each
- **Trigger point**: Animation fires when element is ~20% into viewport
- **Once only**: Elements animate in once, then stay. No re-animation on scroll back up.

### Card Hover States

| Property | Default | Hover | Duration |
|----------|---------|-------|----------|
| Border opacity | 30% | 50% | 0.3s |
| Box shadow | none | `0 0 20px rgba(212, 168, 75, 0.15)` | 0.3s |
| Scale | 1.0 | 1.02 | 0.3s |
| Geometry rotation | 0deg | 15deg | 0.4s |

### Section Transitions

- Horizontal divider lines "draw" themselves as you scroll past
- Section headings fade in slightly before their content

### Framer Motion Configuration

```tsx
// Reusable scroll animation wrapper
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  {children}
</motion.div>
```

---

## Detail Pages & Atmospheric Elements

Enhance existing detail pages without restructuring.

### Detail Page Hero

- Geometry illustration enters with gentle rotation + fade (starts at -10°, animates to 0°)
- Title and description fade in with stagger
- Subtle parallax: illustration moves at 0.9x scroll speed relative to text

### Visual Representations Section

- Three views (Solid, Wireframe, Net) animate in as a staggered group
- On hover, each geometry subtly pulses (scale 1.0 → 1.03 → 1.0, looping)
- Optional: wireframe version "draws" its lines on first view (SVG stroke animation)

### Content Cards

- Each card fades up as it enters viewport
- Cards animate in sequence down the page
- No hover effects on content cards—they're for reading, not interaction

### Atmospheric Texture (Global)

Applied site-wide via fixed overlay:

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url('/textures/noise.png');
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
}
```

- **Noise grain**: Very subtle (opacity 0.03-0.05), adds organic warmth
- **Vignette**: Optional slight darkening at screen edges

### Background Enhancement

- Current flat gradient → Gradient mesh with 2-3 color stops
- Very slow color position shifts (30+ second cycles)
- Creates sense of "living" background without distraction

---

## Navigation & Future-Proofing

### Header Refinements

- **Logo animation**: Circled dot icon rotates once (360°) on page load, then settles
- **Nav link hovers**: Underline draws from left to right (CSS or Framer Motion)
- **Active state**: Current page link has subtle golden underline with glow
- **Search button**: Gentle pulse on first load to draw attention

### Page Transitions

Minimal for performance and accessibility:

- **Exit**: Current page content fades out (200ms)
- **Enter**: New page content fades in with slight upward motion (300ms)
- Use Next.js App Router + Framer Motion's `AnimatePresence`

### Future Navigation Items

Add to header now, styled as "coming soon":

```
Sacred Geometry | Platonic Solids | Sacred Patterns | Journal | Shop
```

- **Journal**: Future blog/articles section
- **Shop**: Future t-shirt/merchandise store
- Both render slightly dimmed with "Coming Soon" tooltip on hover
- Signals vision and forward-thinking to hiring managers

### Footer (New Component)

Currently no footer. Add minimal footer:

- Geometric divider line (SVG pattern)
- Three columns: Navigation links | About blurb | Social/contact
- Small text: "Built with Next.js, React, and curiosity"
- Understated—supports content, doesn't compete

---

## Responsive Design & Accessibility

### Responsive Animation Strategy

**Desktop (1024px+):**
- Full animation suite as described
- Hero geometry pattern visible and rotating
- Card hover states with rotation + glow

**Tablet (768px - 1023px):**
- Hero geometry scales down, remains centered behind content
- Card grid shifts to 2-column; stagger timing adjusts
- Hover states still active
- Slightly reduced parallax intensity

**Mobile (< 768px):**
- Hero geometry becomes very subtle or repositions (smaller, top of hero)
- Single-column cards; simpler stagger (sequential fade-up)
- No hover-dependent interactions—everything visible by default
- Tap states replace hover states
- Page transitions simplified to fade-only

### Performance Budget

- Hero animation must not delay LCP (Largest Contentful Paint)
- Geometry SVGs inlined or preloaded
- Use Framer Motion's `LazyMotion` to reduce bundle size
- Target: < 100ms input latency, smooth 60fps scrolling

### Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| Reduced motion | `prefers-reduced-motion`: animations skip or complete instantly |
| Focus states | Golden ring animation on keyboard focus |
| Color contrast | All text meets WCAG AA (4.5:1 minimum) |
| Screen readers | Decorative animations marked `aria-hidden="true"` |
| Fallbacks | All content accessible even if animation fails |

---

## Implementation Phases

### Phase 1: Foundation (Typography + Atmosphere)

**Scope:**
- Install and configure Google Fonts (Cinzel Decorative, Cormorant Garamond)
- Create typography scale with CSS variables
- Implement new color palette as CSS custom properties
- Add noise grain texture overlay (global)
- Refine background gradient

**Files to modify:**
- `src/styles/globals.css` — CSS variables, texture overlay
- `src/app/layout.tsx` — Font imports
- `tailwind.config.ts` — Extended color palette

---

### Phase 2: Hero Experience

**Scope:**
- Build `<AnimatedHero>` component with Framer Motion
- Create rotating geometry background pattern
- Implement entrance animations for hero content
- Add subtle parallax on scroll
- Responsive adjustments

**Files to create/modify:**
- `src/components/animated-hero.tsx` — New component
- `src/components/geometry-background.tsx` — New component
- `src/app/page.tsx` — Integrate hero

---

### Phase 3: Scroll Animations

**Scope:**
- Create reusable `<AnimateOnScroll>` wrapper component
- Create `<StaggerChildren>` component for grouped animations
- Apply to homepage cards
- Apply to list page cards
- Implement stagger timing system

**Files to create/modify:**
- `src/components/animate-on-scroll.tsx` — New component
- `src/components/stagger-children.tsx` — New component
- `src/app/page.tsx` — Apply animations
- `src/app/platonic-solids/page.tsx` — Apply animations
- `src/app/sacred-patterns/page.tsx` — Apply animations

---

### Phase 4: Interactive Elements

**Scope:**
- Enhanced card hover states (glow, scale, geometry rotation)
- Navigation link animations (underline draw effect)
- Logo animation on page load
- Button/CTA refinements
- Focus state animations

**Files to modify:**
- `src/components/header.tsx` — Nav animations, logo
- Card components — Hover states
- `src/components/ui/button.tsx` — Enhanced states

---

### Phase 5: Detail Pages

**Scope:**
- Hero section entrance animations
- Content card scroll reveals
- Geometry illustration hover/pulse effects
- Optional: SVG line-draw animation for wireframes

**Files to modify:**
- `src/app/platonic-solids/[slug]/page.tsx`
- `src/app/sacred-patterns/[slug]/page.tsx`
- Geometry image components

---

### Phase 6: Navigation & Polish

**Scope:**
- Page transitions with `AnimatePresence`
- Add Journal/Shop nav items (coming soon state)
- Build footer component
- `prefers-reduced-motion` support
- Final responsive QA pass

**Files to create/modify:**
- `src/components/page-transition.tsx` — New component
- `src/components/footer.tsx` — New component
- `src/components/header.tsx` — New nav items
- `src/app/layout.tsx` — Integrate transitions

---

## Success Criteria

- [ ] First-time visitor experiences "wow" moment within 5 seconds
- [ ] Animations feel intentional and refined, not gratuitous
- [ ] Site performs smoothly on mobile devices
- [ ] Color palette is distinctive and memorable
- [ ] Typography evokes sacred/ancient quality
- [ ] Reduced motion preferences are respected
- [ ] Portfolio demonstrates modern frontend skills
- [ ] Architecture ready for Journal and Shop expansion
