# Sacred Patterns Dynamic Routing Migration Plan

**Project:** Migrate 17 static Sacred Pattern pages to dynamic routing using MDX content system

**Start Date:** 2025-10-19

**Goal:** Enable relationship links and global search by unifying Sacred Patterns with Platonic Solids dynamic routing architecture

---

## Project Overview

### Current State
- ✅ Platonic Solids: Dynamic routing (`/platonic-solids/[slug]`) with YAML content
- ❌ Sacred Patterns: 17 static routes with hardcoded content

### Target State
- ✅ Platonic Solids: Dynamic routing with YAML content (no change)
- ✅ Sacred Patterns: Dynamic routing (`/sacred-patterns/[slug]`) with MDX content

### Why MDX for Sacred Patterns?
- Rich narrative content (117-343 lines per page, avg 196 lines)
- Unique storytelling per pattern (vs standardized YAML schema)
- Future extensibility (can embed React components)
- Content-code separation (easier editing)

---

## Phase Status

### ✅ Phase 1: MDX Infrastructure Setup (COMPLETED)

**Tasks:**
- [x] Install MDX dependencies (`@next/mdx`, `next-mdx-remote`, `remark-gfm`)
- [x] Configure Next.js for MDX support (`next.config.js`)
- [x] Create MDX components system (`mdx-components.tsx`, `mdx-section.tsx`)
- [x] Create content loader utilities (`src/lib/content/sacred-patterns.ts`)
- [x] TypeScript compilation verified

**Files Created/Modified:**
- `next.config.js` - Added MDX configuration
- `mdx-components.tsx` - Root MDX components config
- `src/components/mdx-section.tsx` - Card wrapper component
- `src/components/mdx-components.tsx` - Styled MDX components
- `src/lib/content/sacred-patterns.ts` - Content loader functions
- `src/lib/content/index.ts` - Added Sacred Pattern exports

---

### ✅ Phase 2: Proof of Concept (COMPLETED)

**Tasks:**
- [x] Extract circle-dot to MDX (3 sections, 169 lines)
- [x] Extract vesica-piscis to MDX (3 sections, 134 lines)
- [x] Extract flower-of-life to MDX (5 sections, 338 lines)
- [x] Create dynamic route template
- [x] TypeScript compilation verified

**Files Created:**
- `src/content/sacred-patterns/circle-dot.mdx`
- `src/content/sacred-patterns/vesica-piscis.mdx`
- `src/content/sacred-patterns/flower-of-life.mdx`
- `src/content/sacred-patterns/seed-of-life.mdx`
- `src/content/sacred-patterns/fruit-of-life.mdx`
- `src/content/sacred-patterns/pentagram.mdx`
- `src/content/sacred-patterns/egg-of-life.mdx`
- `src/app/sacred-patterns-dynamic/[slug]/page.tsx`

**Test URLs (localhost:3001):**
- http://localhost:3001/sacred-patterns-dynamic/circle-dot
- http://localhost:3001/sacred-patterns-dynamic/vesica-piscis
- http://localhost:3001/sacred-patterns-dynamic/flower-of-life
- http://localhost:3001/sacred-patterns-dynamic/seed-of-life
- http://localhost:3001/sacred-patterns-dynamic/fruit-of-life
- http://localhost:3001/sacred-patterns-dynamic/pentagram
- http://localhost:3001/sacred-patterns-dynamic/egg-of-life

**Testing Checklist:**
- [ ] Hero section displays correctly (title, description, image)
- [ ] MDX content renders in styled cards
- [ ] All sections display
- [ ] Typography matches existing pages
- [ ] Navigation Previous/Next works
- [ ] No console errors

---

### 🔄 Phase 3: Bulk Content Migration (IN PROGRESS)

**Remaining Patterns to Extract (10 of 14 remaining):**

**Simple (117-150 lines):**
- [x] seed-of-life (117 lines) ✅
- [x] fruit-of-life (134 lines) ✅
- [x] pentagram (142 lines) ✅
- [x] egg-of-life (148 lines) ✅
- [ ] philosophers-stone (150 lines)

**Medium (157-169 lines):**
- [ ] sri-yantra (157 lines)
- [ ] star-tetrahedron (158 lines)
- [ ] germ-of-life (162 lines)

**Complex (206-343 lines):**
- [ ] metatrons-cube (206 lines)
- [ ] torus (216 lines)
- [ ] vector-equilibrium (232 lines)
- [ ] 64-tetrahedron (257 lines)
- [ ] tree-of-life (281 lines)
- [ ] golden-ratio (343 lines)

**Strategy:**
1. Process in batches of 3-4
2. Test each batch before continuing
3. Commit after successful batches

**Estimated Time:** 2-3 hours

---

### ✅ Phase 4: Cleanup & Deployment (COMPLETED)

**Tasks:**
- [x] Delete all static route directories (17 total)
- [x] Rename `sacred-patterns-dynamic/` to `sacred-patterns/[slug]/`
- [x] Run production build test (`pnpm build`)
- [x] Verify all 17 patterns in build output
- [x] Update CLAUDE.md documentation
- [x] Update src/content/README.md
- [x] Fixed ESLint error (created `getMDXComponents` non-hook version)

**Actual Time:** 45 minutes

---

## File Structure

### Before Migration
```
src/app/sacred-patterns/
├── page.tsx (list page - KEEP)
├── circle-dot/page.tsx (DELETE after migration)
├── vesica-piscis/page.tsx (DELETE after migration)
├── flower-of-life/page.tsx (DELETE after migration)
└── ... (14 more directories to DELETE)
```

### After Migration
```
src/app/sacred-patterns/
├── page.tsx (list page)
└── [slug]/page.tsx (dynamic route)

src/content/sacred-patterns/
├── circle-dot.mdx
├── vesica-piscis.mdx
├── flower-of-life.mdx
└── ... (14 more .mdx files)
```

---

## Testing Instructions

### Development Testing
1. Start dev server: `pnpm dev`
2. Visit test URLs (see Phase 2)
3. Verify rendering, navigation, styling
4. Check browser console for errors

### Production Build Testing
```bash
pnpm build
```

**Expected Output:**
- 29 total pages (5 platonic + 17 sacred patterns + 7 other)
- All sacred pattern routes listed
- No build errors

### Rollback Plan
If issues arise, rollback is simple:
1. Git: `git restore next.config.js mdx-components.tsx`
2. Git: `git clean -fd src/content/sacred-patterns/`
3. Git: `git restore src/components/mdx-*.tsx src/lib/content/`
4. Delete: `rm -rf src/app/sacred-patterns-dynamic/`

---

## Dependencies Installed

```json
{
  "@next/mdx": "15.5.6",
  "next-mdx-remote": "5.0.0",
  "remark-gfm": "4.0.1"
}
```

---

## Future Benefits

Once migration is complete, we can implement:

1. **Relationship Links Component** (2-3 hours)
   - Show related geometries on each page
   - Link to dual, contains, appearsIn geometries
   - Reusable component across all geometries

2. **Global Search Feature** (6-8 hours)
   - Search all geometries by name/properties
   - Navigate directly to any geometry
   - Cmd+K keyboard shortcut
   - Preview relationships in results

Both features require unified dynamic routing to work reliably.

---

## Notes

- **Dev server:** Running on port 3001 (port 3000 occupied)
- **TypeScript:** All code passes typecheck ✅
- **MDX Styling:** Matches existing design system (amber/blue theme)
- **Navigation:** Uses existing GeometryNavigation component
- **Content Source:**
  - Hero (title, description, image) from data model
  - Narrative sections from MDX files

---

## Current Status

**Last Updated:** 2025-10-19 (Migration Complete)

**Current Phase:** ✅ COMPLETE - All Phases Finished

**Patterns Completed:** 17 of 17 (100%) ✅

**Batch 1 (Simple):** seed-of-life, fruit-of-life, pentagram, egg-of-life, philosophers-stone ✅

**Batch 2 (Medium):** sri-yantra, star-tetrahedron, germ-of-life ✅

**Batch 3 (Complex part 1):** metatrons-cube, torus, vector-equilibrium ✅

**Batch 4 (Complex part 2):** 64-tetrahedron, tree-of-life, golden-ratio ✅

**Plus from Phase 2:** circle-dot, vesica-piscis, flower-of-life ✅

**Production Build:** ✅ Passing (31 total pages generated)

**Time Invested:** ~4.5 hours total
- Phase 1 (Infrastructure): ~30 min
- Phase 2 (Proof of Concept): ~1 hour
- Phase 3 (Bulk Migration): ~2.5 hours
- Phase 4 (Cleanup & Deployment): ~45 min

**Status:** 🎉 PROJECT COMPLETE 🎉
