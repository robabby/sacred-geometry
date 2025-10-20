# Global Search Implementation Plan

**Status**: Planning
**Started**: 2025-10-20
**Owner**: Sacred Geometry Site

---

## Executive Summary

This document outlines the phased implementation of global search functionality for the Sacred Geometry site. The approach prioritizes iterative delivery, starting with a hero section search (Phase 1) before expanding to global header search (Phase 3), with enhancements along the way.

**Selected Approach**: Command Palette (cmdk) starting in hero section
**Expected Timeline**: 4 phases over ~10-15 hours total effort
**Tech Stack**: shadcn/ui Command component, existing `searchGeometries()` function

---

## Current State Analysis

### Existing Infrastructure

**✅ Search Foundation Already Exists**:
- `searchGeometries()` function in `src/lib/data/helpers.ts:269`
- Searches across: name, aliases, description, properties
- Returns filtered geometry array
- No fuzzy matching (exact substring match)

**Dataset Characteristics**:
- ~22 total geometries (5 Platonic Solids + 17 Sacred Patterns)
- Small dataset → client-side search is perfect
- Rich metadata: images, elements, descriptions, relationships

**Current Header** (`src/components/header.tsx`):
- Minimal design: Logo + 2 nav links
- Mobile-optimized (responsive labels)
- Keyboard navigation support
- Sticky positioning with backdrop blur
- Height: 64px (4rem)

**Current Home Page** (`src/app/page.tsx`):
- Hero section with title, badges, description
- Two CTA buttons (Platonic Solids, Sacred Patterns)
- Tabbed content section below hero
- Plenty of vertical space in hero for search UI

**Available shadcn/ui Components**:
- ✅ badge, card, separator, tabs
- ❌ command, dialog, input (need to install)

---

## Approach Evaluation

### Option A: Hero Section Search First ⭐ (Selected)

**Pros**:
- ✅ Quick win - working search in 2-3 hours
- ✅ Less disruptive - no header redesign needed
- ✅ Easier mobile implementation (plenty of vertical space)
- ✅ Test & learn - validate UX before going global
- ✅ Natural fit in hero "call to action" area
- ✅ Iterative - easy to enhance and move later

**Cons**:
- ❌ Only available on home page initially
- ❌ Requires Phase 3 for global access

**Mobile Consideration**: ✅ Works great - plenty of vertical space

### Option B: Header Search First

**Pros**:
- ✅ Immediately global (all pages)
- ✅ Familiar pattern (users expect search in header)
- ✅ Persistent access

**Cons**:
- ❌ Header redesign required
- ❌ Mobile space constraints (64px header height)
- ❌ More complex initial implementation
- ❌ May conflict with existing nav structure
- ❌ Higher risk of breaking existing UI

**Mobile Consideration**: ⚠️ Would require hamburger menu or modal pattern

### Decision: Start with Option A, migrate to Option B in Phase 3

---

## Component Selection

### Selected: Command Palette (cmdk) via shadcn/ui

**Why Command?**
- ✅ Keyboard shortcuts built-in (⌘K / Ctrl+K)
- ✅ Categorized results (Platonic Solids / Sacred Patterns)
- ✅ Keyboard navigation (arrows, enter, escape)
- ✅ Mobile-friendly
- ✅ Accessible by default (ARIA support)
- ✅ Beautiful, modern UX
- ✅ Used by: GitHub, Linear, Vercel, Raycast

**Components to Install**:
```bash
pnpm dlx shadcn@latest add command dialog input
```

**Alternative Considered**: Input + Popover
- Lighter weight, fewer features
- Not selected: Command provides better UX for small additional size

---

## Search Architecture

### Data Flow

```
User Input → searchGeometries() → Group by Category → Render Results → Navigate
```

### Search Scope by Phase

**Phase 1 (MVP)**:
- Geometry names
- Aliases
- Descriptions
- Use existing `searchGeometries()` function as-is

**Phase 2 (Enhanced)**:
- Add element associations (Fire, Earth, Water, Air, Ether)
- Add symbolic properties
- Consider fuzzy matching (Fuse.js or similar)
- Highlight matching terms

**Phase 3 (Global)**:
- Same search, different location (header)
- Available on all pages

**Phase 4 (Advanced)**:
- Search MDX content (full-text)
- Search mathematical properties (vertices, edges, faces)
- Search relationship types
- Natural language queries (optional)

### Result Display Strategy

**Grouping**:
- Group 1: Platonic Solids (max 5 results)
- Group 2: Sacred Patterns (max 17 results)
- Order by: relevance (name match > alias match > description match)

**Result Item Structure**:
```tsx
<CommandItem>
  <Image src={heroImage} />
  <div>
    <h4>{geometry.name}</h4>
    <p>{geometry.description}</p>
  </div>
  <Badge>{element}</Badge>
</CommandItem>
```

**Keyboard Navigation**:
- ⌘K / Ctrl+K: Open search
- ↑/↓: Navigate results
- Enter: Navigate to selected geometry
- Escape: Close search

---

## Phase 1: Hero Search (MVP)

**Goal**: Working search on home page
**Timeline**: 2-3 hours
**Status**: Not Started

### Tasks

1. **Install Dependencies** (~5 min)
   - [ ] Run: `pnpm dlx shadcn@latest add command dialog input`
   - [ ] Verify components installed to `src/components/ui/`

2. **Create SearchCommand Component** (~1 hour)
   - [ ] Create `src/components/search-command.tsx`
   - [ ] Import Command components from shadcn/ui
   - [ ] Add state for open/close modal
   - [ ] Wire up keyboard shortcut (⌘K)
   - [ ] Create search input field
   - [ ] Wire up `searchGeometries()` function
   - [ ] Add loading/empty states

3. **Implement Result Rendering** (~45 min)
   - [ ] Create two CommandGroups (Platonic Solids, Sacred Patterns)
   - [ ] Map filtered results to CommandItems
   - [ ] Add geometry images
   - [ ] Add element badges
   - [ ] Style results with Tailwind
   - [ ] Add hover/focus states

4. **Add Navigation Logic** (~15 min)
   - [ ] Import `useRouter` from next/navigation
   - [ ] Implement `onSelect` handler
   - [ ] Use `getGeometryPath()` for navigation
   - [ ] Close modal after selection

5. **Integrate into Home Page** (~30 min)
   - [ ] Import SearchCommand into `src/app/page.tsx`
   - [ ] Add trigger button in hero section (between badges and CTA buttons)
   - [ ] Style trigger button to match theme
   - [ ] Add search icon (lucide-react)
   - [ ] Add "Press ⌘K to search" hint

6. **Mobile Optimization** (~30 min)
   - [ ] Test on mobile viewport (375px, 768px)
   - [ ] Adjust modal size for mobile
   - [ ] Adjust result item layout for mobile
   - [ ] Test touch interactions
   - [ ] Verify keyboard doesn't block content

7. **Testing & Polish** (~30 min)
   - [ ] Test search with various queries
   - [ ] Test keyboard navigation
   - [ ] Test keyboard shortcut
   - [ ] Verify navigation works
   - [ ] Check accessibility (screen reader)
   - [ ] Test on different browsers

### Component Structure

```tsx
// src/components/search-command.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { searchGeometries, getGeometryPath, getAllGeometries } from "@/lib/data";

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // ⌘K shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Search logic
  const results = query.length > 0
    ? searchGeometries(getAllGeometries(), query)
    : [];

  const platonicResults = results.filter(g => g.category === "platonic");
  const patternResults = results.filter(g => g.category === "pattern");

  // Navigation
  const handleSelect = (geometry: Geometry) => {
    setOpen(false);
    router.push(getGeometryPath(geometry));
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search geometries..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {platonicResults.length > 0 && (
          <CommandGroup heading="Platonic Solids">
            {platonicResults.map(geometry => (
              <CommandItem
                key={geometry.id}
                onSelect={() => handleSelect(geometry)}
              >
                {/* Result content */}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {patternResults.length > 0 && (
          <CommandGroup heading="Sacred Patterns">
            {patternResults.map(geometry => (
              <CommandItem
                key={geometry.id}
                onSelect={() => handleSelect(geometry)}
              >
                {/* Result content */}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
```

### Integration in Home Page

```tsx
// src/app/page.tsx (hero section)
export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="container mx-auto">
        {/* Title, description, badges... */}

        {/* NEW: Search trigger */}
        <SearchCommand />
        <button onClick={() => setSearchOpen(true)}>
          <Search className="h-5 w-5" />
          <span>Search geometries</span>
          <kbd>⌘K</kbd>
        </button>

        {/* CTA buttons... */}
      </div>
    </main>
  );
}
```

### Success Criteria

- [ ] ⌘K opens search modal
- [ ] Typing filters results in real-time
- [ ] Results grouped by category
- [ ] Clicking result navigates to geometry page
- [ ] Modal closes after selection
- [ ] Works on mobile
- [ ] Keyboard navigation works
- [ ] Accessible (screen reader compatible)

---

## Phase 2: Enhanced Search

**Goal**: Improve search quality and UX
**Timeline**: 1-2 hours
**Status**: Not Started

### Tasks

1. **Add Fuzzy Matching** (~30 min)
   - [ ] Install Fuse.js: `pnpm add fuse.js`
   - [ ] Create fuzzy search wrapper around `searchGeometries()`
   - [ ] Configure search keys and weights
   - [ ] Add threshold for match quality
   - [ ] Update search to use fuzzy matching

2. **Enhance Search Scope** (~20 min)
   - [ ] Add element searching (Fire, Earth, Water, Air, Ether)
   - [ ] Add symbolic property searching
   - [ ] Update `searchGeometries()` or create new function

3. **Add Search Highlights** (~30 min)
   - [ ] Install or create highlight utility
   - [ ] Highlight matching terms in result titles
   - [ ] Highlight matching terms in descriptions
   - [ ] Style highlights with amber color

4. **Improve Empty States** (~20 min)
   - [ ] Create "no results" message
   - [ ] Add suggestions for popular searches
   - [ ] Add "Browse All" fallback link

5. **Add Recent Searches** (~30 min)
   - [ ] Store recent searches in localStorage
   - [ ] Display recent searches when modal opens (no query)
   - [ ] Add clear history button
   - [ ] Limit to last 5 searches

### Fuzzy Search Configuration

```tsx
import Fuse from 'fuse.js';

const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'aliases', weight: 0.3 },
    { name: 'description', weight: 0.2 },
    { name: 'relatedBy.property', weight: 0.1 },
  ],
  threshold: 0.4, // 0 = exact match, 1 = match anything
  includeScore: true,
};

const fuse = new Fuse(geometries, fuseOptions);
const results = fuse.search(query);
```

### Success Criteria

- [ ] Fuzzy matching finds results with typos
- [ ] Element keywords return relevant geometries
- [ ] Matching terms highlighted in results
- [ ] Recent searches displayed when opening modal
- [ ] Empty state is helpful and actionable

---

## Phase 3: Global Header Search

**Goal**: Make search available on all pages
**Timeline**: 2-3 hours
**Status**: Not Started

### Tasks

1. **Design Header Layout** (~30 min)
   - [ ] Sketch header with search button
   - [ ] Desktop: `[Logo] [Search] | [Nav Links]`
   - [ ] Mobile: `[Logo] | [Search Icon] [Nav]`
   - [ ] Ensure 64px height maintained

2. **Refactor SearchCommand** (~30 min)
   - [ ] Move SearchCommand to `src/components/` (already there)
   - [ ] Ensure works from any page (use absolute paths)
   - [ ] Add prop for trigger button styling
   - [ ] Extract trigger button to separate component

3. **Update Header Component** (~1 hour)
   - [ ] Import SearchCommand into header
   - [ ] Add search trigger button before nav links
   - [ ] Style button to match header theme
   - [ ] Add search icon (lucide-react Search)
   - [ ] Adjust spacing for nav items

4. **Mobile Header Optimization** (~45 min)
   - [ ] Add mobile search icon button
   - [ ] Ensure doesn't conflict with nav
   - [ ] Test touch interactions
   - [ ] Verify modal works on mobile
   - [ ] Adjust header spacing

5. **Remove Hero Search** (~15 min)
   - [ ] Remove search trigger from home page hero
   - [ ] Keep SearchCommand in header only
   - [ ] Update home page layout/spacing
   - [ ] Test home page still looks good

6. **Test Across Pages** (~30 min)
   - [ ] Test on home page
   - [ ] Test on Platonic Solids list page
   - [ ] Test on Sacred Patterns list page
   - [ ] Test on individual geometry pages
   - [ ] Verify navigation works from all pages

### Header Layout (Desktop)

```tsx
// src/components/header.tsx
<header>
  <div className="container">
    {/* Logo */}
    <Link href="/">Sacred Geometry</Link>

    {/* NEW: Search trigger */}
    <button onClick={() => setSearchOpen(true)}>
      <Search className="h-4 w-4" />
      <span className="hidden md:inline">Search</span>
      <kbd className="hidden md:inline">⌘K</kbd>
    </button>

    {/* Existing nav */}
    <nav>
      <Link href="/platonic-solids">Platonic Solids</Link>
      <Link href="/sacred-patterns">Sacred Patterns</Link>
    </nav>
  </div>

  {/* SearchCommand modal */}
  <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
</header>
```

### Success Criteria

- [ ] Search button visible in header on all pages
- [ ] ⌘K works from any page
- [ ] Search results navigate correctly
- [ ] Header layout works on desktop and mobile
- [ ] No visual regression on existing pages
- [ ] Keyboard navigation doesn't conflict

---

## Phase 4: Advanced Features (Optional)

**Goal**: Next-level search experience
**Timeline**: 3-4 hours
**Status**: Not Started

### Tasks

1. **Search MDX Content** (~1.5 hours)
   - [ ] Create content indexing system
   - [ ] Parse MDX files for searchable text
   - [ ] Add content snippets to search results
   - [ ] Highlight matching sections
   - [ ] Link to specific page sections

2. **Search Mathematical Properties** (~30 min)
   - [ ] Add vertex count searching
   - [ ] Add edge count searching
   - [ ] Add face count searching
   - [ ] Support queries like "12 faces" or "20 vertices"

3. **Add Filters** (~1 hour)
   - [ ] Add category filter (Platonic / Pattern)
   - [ ] Add element filter (Fire, Earth, etc.)
   - [ ] Add "has dual" filter (Platonic only)
   - [ ] Add filter UI (checkboxes or pills)
   - [ ] Update search logic to respect filters

4. **Related Suggestions** (~45 min)
   - [ ] Show "Related geometries" at bottom of results
   - [ ] Use relationship data (contains, appearsIn, dual)
   - [ ] Add "Explore similar" link

5. **Search Analytics** (~30 min)
   - [ ] Track search queries (anonymously)
   - [ ] Track popular searches
   - [ ] Track no-result searches
   - [ ] Display in admin dashboard (future)

6. **Keyboard Shortcuts Help** (~30 min)
   - [ ] Add "?" shortcut to show help modal
   - [ ] List all keyboard shortcuts
   - [ ] Show in Command palette footer
   - [ ] Add help icon in search modal

### Success Criteria

- [ ] Can search within MDX content
- [ ] Can search by mathematical properties
- [ ] Filters work and improve results
- [ ] Related suggestions are relevant
- [ ] Analytics tracking works
- [ ] Keyboard help is accessible

---

## Technical Decisions

### Why Client-Side Search?

**Rationale**:
- Small dataset (~22 geometries)
- Fast enough for real-time filtering
- No server needed
- Works offline
- Simpler architecture

**When to switch to server-side**:
- Dataset grows beyond 100 geometries
- Need full-text search of MDX content
- Need analytics/logging
- Need personalization

### Why Command Palette?

**Rationale**:
- Best-in-class UX (GitHub, Linear, Vercel)
- Keyboard-first design
- Accessible by default
- Mobile-friendly
- Minimal code to implement

**Alternatives considered**:
- Algolia: Overkill for small dataset
- Input + Dropdown: Less feature-rich
- Modal + Input: Less discoverable

### Why Hero First?

**Rationale**:
- Quick win (validate UX)
- Less risky (no header redesign)
- Iterative approach
- Easy to move later

**When to move to header**:
- After Phase 1 proves valuable
- When ready to invest in header redesign
- When users request global search

---

## Open Questions

- [ ] Should we track search analytics? (Phase 4)
- [ ] Should we add voice search? (future)
- [ ] Should we add search filters in Phase 1 or wait for Phase 2?
- [ ] Should we search MDX content in Phase 2 or Phase 4?
- [ ] Should we add "Did you mean...?" for typos?

---

## Success Metrics

### Phase 1 Success
- [ ] Search modal opens with ⌘K
- [ ] Results appear in <100ms
- [ ] At least 80% of searches return results
- [ ] Click-through rate > 60%
- [ ] Mobile usability score > 90

### Phase 3 Success
- [ ] Search available on all pages
- [ ] Header redesign doesn't break existing UI
- [ ] Mobile header works well
- [ ] No performance regression

### Overall Success
- [ ] Users can find any geometry in <10 seconds
- [ ] Search is used on >30% of visits
- [ ] No accessibility violations
- [ ] Page load time impact <50ms

---

## Resources

**Documentation**:
- [shadcn/ui Command](https://ui.shadcn.com/docs/components/command)
- [cmdk (Radix UI)](https://cmdk.paco.me/)
- [Fuse.js](https://fusejs.io/)

**Inspiration**:
- [GitHub Command Palette](https://github.com/)
- [Linear Command Menu](https://linear.app/)
- [Vercel Dashboard Search](https://vercel.com/)

**Code References**:
- `src/lib/data/helpers.ts:269` - `searchGeometries()` function
- `src/components/header.tsx` - Current header component
- `src/app/page.tsx` - Home page hero section

---

## Timeline Summary

| Phase | Description | Effort | Status |
|-------|-------------|--------|--------|
| Phase 1 | Hero Search (MVP) | 2-3 hours | Not Started |
| Phase 2 | Enhanced Search | 1-2 hours | Not Started |
| Phase 3 | Global Header Search | 2-3 hours | Not Started |
| Phase 4 | Advanced Features | 3-4 hours | Not Started |
| **Total** | **Complete Implementation** | **10-15 hours** | **Planning** |

---

## Next Steps

1. Review this plan with team
2. Approve Phase 1 scope
3. Begin Phase 1 implementation
4. Test and iterate
5. Move to Phase 2 when ready

---

**Last Updated**: 2025-10-20
**Next Review**: After Phase 1 completion
