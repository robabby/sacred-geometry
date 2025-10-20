# Relationship Mapping Enhancement Plan

**Date**: 2025-01-20
**Status**: Planning
**Goal**: Improve relationship mapping between geometries to support better navigation and prepare for global search

---

## Table of Contents

1. [Current State Analysis](#current-state-analysis)
2. [Vision & Goals](#vision--goals)
3. [Enhanced Relationship System](#enhanced-relationship-system)
4. [Immediate Implementation: MDX Display](#immediate-implementation-mdx-display)
5. [Data Model Changes](#data-model-changes)
6. [Search Infrastructure Preparation](#search-infrastructure-preparation)
7. [Implementation Phases](#implementation-phases)
8. [Technical Specifications](#technical-specifications)

---

## Current State Analysis

### Existing Relationship Types

**1. Contains/AppearsIn** (`CONTAINS_GRAPH`)
- Hierarchical containment relationships
- Auto-computed inverse (`appearsIn`)
- Examples: Flower of Life contains Seed of Life, Metatron's Cube contains all 5 Platonic Solids

**2. Dual** (`DUAL_GRAPH`)
- Platonic Solid duality (vertices ↔ faces)
- Bidirectional or self-dual
- Examples: Cube ↔ Octahedron, Dodecahedron ↔ Icosahedron, Tetrahedron ↔ Tetrahedron

**3. Element Association** (metadata only)
- Stored in `relatedBy.element`
- Not formalized as queryable relationships
- Values: fire, earth, air, water, ether

**4. Property Tags** (metadata only)
- Stored in `relatedBy.property` array
- Conceptual/symbolic properties
- Not structured for relationship queries

### Current Helper Functions

- `getRelatedGeometries(id)` → Returns dual, contains, appearsIn
- `getGeometriesByElement(element)` → Filter by element
- `searchGeometries(query)` → Text search across names/descriptions/properties
- `getGeometryPath(geometry)` → Generate URL for linking

### Limitations & Gaps

1. **Limited Relationship Types**: Only contains/dual are formalized
2. **No Relationship Metadata**: Can't describe why/how geometries relate
3. **No Derivation Tracking**: Can't express "X is derived from Y"
4. **No Transformation Paths**: Can't show evolutionary connections
5. **No Weighted Relationships**: All relationships treated equally
6. **Element Relationships Informal**: Can't query "all geometries related by Fire element"
7. **No Bidirectional Context**: Can't distinguish parent vs. child semantics in display
8. **Search Not Optimized**: No relationship-based search, no graph traversal for discovery

---

## Vision & Goals

### Immediate Goals (Phase 1)

1. **Visual Relationship Display**: Add a "Related Geometries" section to each MDX page
2. **Grouped by Type**: Organize relationships into logical categories (Contains, Appears In, Dual, etc.)
3. **Clickable Links**: Each related geometry links to its detail page
4. **Clean UI**: Simple, scannable list format

### Medium-term Goals (Phases 2-3)

1. **Enhanced Relationship Types**: Add derived-from, transforms-into, similar-to, complementary
2. **Relationship Metadata**: Describe strength, context, and nature of connections
3. **Element-based Relationships**: Formalize element associations as queryable relationships
4. **Search Integration**: Use relationships to improve search relevance and discovery

### Long-term Goals (Phase 4+)

1. **Graph Visualization**: Interactive relationship graph
2. **Relationship Paths**: "How is X related to Y?" with path explanation
3. **Recommendation Engine**: "If you like X, explore Y"
4. **Semantic Search**: Search by conceptual relationships

---

## Enhanced Relationship System

### Proposed Relationship Types

#### 1. **Structural Relationships**

- **contains**: A contains B as a sub-pattern (existing)
- **appears-in**: B appears within A (inverse of contains, existing)
- **derived-from**: B is derived/constructed from A
- **composed-of**: A is composed of multiple instances of B
- **dual**: Geometric duality (vertices ↔ faces, existing)

#### 2. **Transformational Relationships**

- **transforms-into**: A evolves/transforms into B through a process
- **emerges-from**: B emerges from A through geometric operations
- **unfolds-to**: A unfolds to reveal B

#### 3. **Conceptual Relationships**

- **similar-to**: A and B share similar properties/symbolism
- **complementary**: A and B complement each other (e.g., masculine/feminine)
- **resonates-with**: A resonates with B through shared concepts
- **related-by-element**: A and B share elemental association (fire, water, etc.)

#### 4. **Mathematical Relationships**

- **ratio-related**: A and B share a mathematical ratio (e.g., Golden Ratio)
- **proportional**: A and B have proportional dimensions
- **symmetric-with**: A and B exhibit similar symmetry

### Relationship Metadata Structure

Each relationship should include:

```typescript
interface RelationshipMetadata {
  type: RelationshipType;
  targetId: GeometryId;
  strength?: number; // 1-10 scale for weighting
  context?: string; // Brief description of the relationship
  bidirectional?: boolean; // Whether relationship goes both ways
  displayLabel?: string; // Override default label (e.g., "Dual of" instead of "Dual")
}
```

### Example Relationships

**Flower of Life**:
- **contains**: Seed of Life, Vesica Piscis, Tree of Life (existing)
- **derived-from**: Circle (foundational geometry)
- **similar-to**: Seed of Life (structural similarity)
- **resonates-with**: All patterns (universal connector)

**Tetrahedron**:
- **dual**: Tetrahedron (self-dual, existing)
- **appears-in**: Metatron's Cube, Star Tetrahedron, 64-Tetrahedron (existing)
- **related-by-element**: Fire (elemental association)
- **composed-of** (inverse): Star Tetrahedron (2 tetrahedra form Merkaba)

**Golden Ratio**:
- **appears-in**: Pentagram, Fibonacci Spiral (existing)
- **ratio-related**: Dodecahedron, Icosahedron (pentagonal faces use Golden Ratio)
- **resonates-with**: Phi-based patterns

---

## Immediate Implementation: MDX Display

### Phase 1: Simple Relationship Display

#### Visual Design

Add a new section to each geometry's MDX file that displays related geometries:

```mdx
---
slug: flower-of-life
---

<Section>
## The Pattern of Creation
...existing content...
</Section>

<RelatedGeometries />

<!-- Or manually specified: -->
<Section>
## Related Geometries

### Contains
- [Seed of Life](/sacred-patterns/seed-of-life)
- [Vesica Piscis](/sacred-patterns/vesica-piscis)
- [Tree of Life](/sacred-patterns/tree-of-life)

### Similar Patterns
- [Egg of Life](/sacred-patterns/egg-of-life) - Structural variation
- [Fruit of Life](/sacred-patterns/fruit-of-life) - Extended pattern
</Section>
```

#### Component Approach

Create a reusable `<RelatedGeometries />` React component that:

1. Accepts optional `slug` prop (or derives from context)
2. Fetches geometry data and relationships via helper functions
3. Groups relationships by type
4. Renders clickable links with proper paths
5. Falls back gracefully if no relationships exist

```typescript
// Usage in MDX
<RelatedGeometries />

// Or with explicit slug
<RelatedGeometries slug="flower-of-life" />
```

#### Benefits

- **Data-driven**: Automatically pulls from data model
- **Consistent**: Same display across all pages
- **Maintainable**: Update data model, UI updates automatically
- **Search-ready**: Component can be enhanced with search integration later

---

## Data Model Changes

### New Type Definitions

#### Relationship Type Enum

```typescript
// src/lib/data/geometries.types.ts

export type RelationshipType =
  // Structural
  | "contains"
  | "appears-in"
  | "derived-from"
  | "composed-of"
  | "dual"
  // Transformational
  | "transforms-into"
  | "emerges-from"
  | "unfolds-to"
  // Conceptual
  | "similar-to"
  | "complementary"
  | "resonates-with"
  | "related-by-element"
  // Mathematical
  | "ratio-related"
  | "proportional"
  | "symmetric-with";
```

#### Relationship Metadata Interface

```typescript
export interface RelationshipMeta {
  type: RelationshipType;
  targetId: GeometryId;
  strength?: number; // 1-10, default 5
  context?: string; // Description of relationship
  bidirectional?: boolean; // Default false
  displayLabel?: string; // Override default type label
}

export interface Geometry {
  // ...existing fields...

  // Enhanced relationships
  relationships?: RelationshipMeta[]; // New: explicit relationship metadata

  // Deprecated (keep for backward compatibility, auto-computed)
  contains?: GeometryId[];
  appearsIn?: GeometryId[];
  dual?: GeometryId;
}
```

### Enhanced Relationship Graphs

#### Extended Relationship Definitions

```typescript
// src/lib/data/relationships.ts

/**
 * RELATIONSHIP_GRAPH
 *
 * Central source of truth for ALL geometry relationships.
 * Replaces CONTAINS_GRAPH and DUAL_GRAPH with unified system.
 */
export const RELATIONSHIP_GRAPH: Record<GeometryId, RelationshipMeta[]> = {
  "flower-of-life": [
    { type: "contains", targetId: "seed-of-life", strength: 10 },
    { type: "contains", targetId: "vesica-piscis", strength: 9 },
    { type: "contains", targetId: "tree-of-life", strength: 8 },
    { type: "derived-from", targetId: "circle-dot", strength: 9, context: "Built from overlapping circles" },
    { type: "similar-to", targetId: "seed-of-life", strength: 7 },
  ],

  tetrahedron: [
    { type: "dual", targetId: "tetrahedron", strength: 10, context: "Self-dual polyhedron" },
    { type: "appears-in", targetId: "metatrons-cube", strength: 10 },
    { type: "composed-of", targetId: "star-tetrahedron", strength: 10, context: "Two tetrahedra form Merkaba" },
    { type: "related-by-element", targetId: "fire", strength: 10 },
  ],

  // ... etc for all geometries
};
```

#### Migration Strategy

1. **Keep existing graphs** during transition (CONTAINS_GRAPH, DUAL_GRAPH)
2. **Add new RELATIONSHIP_GRAPH** alongside
3. **Enhance helper functions** to query both (prioritize new graph)
4. **Auto-compute legacy fields** from RELATIONSHIP_GRAPH
5. **Deprecate old graphs** in Phase 3

---

## Search Infrastructure Preparation

### Relationship Indexing

#### Search Index Structure

```typescript
interface GeometrySearchIndex {
  id: GeometryId;
  name: string;
  aliases: string[];
  description: string;
  category: GeometryCategory;
  tags: string[]; // Derived from properties, elements, etc.

  // Relationship data for search
  relationships: {
    type: RelationshipType;
    targetId: GeometryId;
    targetName: string;
    strength: number;
    context?: string;
  }[];

  // Pre-computed relationship paths (for graph search)
  relatedIds: GeometryId[]; // All IDs within 2 degrees

  // Search relevance scoring
  searchWeight: number; // Base relevance (featured geometries = higher)
}
```

#### Indexing Functions

```typescript
// src/lib/data/search-index.ts

/**
 * Build search index from geometry data
 */
export function buildSearchIndex(
  geometries: Record<string, Geometry>
): GeometrySearchIndex[] {
  return Object.values(geometries).map(geometry => ({
    id: geometry.id,
    name: geometry.name,
    aliases: geometry.aliases ?? [],
    description: geometry.description ?? "",
    category: geometry.category,
    tags: extractTags(geometry),
    relationships: extractRelationshipData(geometry),
    relatedIds: getRelatedGeometryIds(geometry, geometries, 2), // 2 degrees of separation
    searchWeight: geometry.featured ? 10 : 5,
  }));
}

/**
 * Extract tags from geometry for faceted search
 */
function extractTags(geometry: Geometry): string[] {
  const tags: string[] = [];

  // Element tags
  if (geometry.relatedBy?.element) {
    tags.push(geometry.relatedBy.element);
  }

  // Property tags
  if (geometry.relatedBy?.property) {
    tags.push(...geometry.relatedBy.property);
  }

  // Relationship type tags
  geometry.relationships?.forEach(rel => {
    tags.push(rel.type);
  });

  // Category tags
  tags.push(geometry.category);

  return [...new Set(tags)]; // Deduplicate
}

/**
 * Get all related geometry IDs within N degrees of separation
 */
function getRelatedGeometryIds(
  geometry: Geometry,
  geometries: Record<string, Geometry>,
  degrees: number
): GeometryId[] {
  // BFS traversal of relationship graph
  const visited = new Set<GeometryId>([geometry.id]);
  const queue: Array<{ id: GeometryId; depth: number }> = [{ id: geometry.id, depth: 0 }];

  while (queue.length > 0) {
    const { id, depth } = queue.shift()!;

    if (depth >= degrees) continue;

    const current = geometries[id];
    const relations = current.relationships ?? [];

    relations.forEach(rel => {
      if (!visited.has(rel.targetId)) {
        visited.add(rel.targetId);
        queue.push({ id: rel.targetId, depth: depth + 1 });
      }
    });
  }

  visited.delete(geometry.id); // Remove self
  return Array.from(visited);
}
```

### Search Query Functions

```typescript
// src/lib/data/search.ts

export interface SearchOptions {
  query?: string; // Text search
  category?: GeometryCategory; // Filter by category
  tags?: string[]; // Filter by tags (AND logic)
  relatedTo?: GeometryId; // Find geometries related to this one
  relationshipTypes?: RelationshipType[]; // Filter by relationship type
  minStrength?: number; // Minimum relationship strength
  limit?: number; // Max results
}

export interface SearchResult {
  geometry: Geometry;
  relevance: number; // 0-100 score
  matchReason: string; // Why this result was returned
  relationshipPath?: GeometryId[]; // Path if searching by relationship
}

/**
 * Search geometries with advanced options
 */
export function searchGeometries(
  geometries: Record<string, Geometry>,
  options: SearchOptions
): SearchResult[] {
  // Implementation will support:
  // - Text search across name/description/aliases
  // - Tag-based filtering (element, property, relationship type)
  // - Relationship-based search (find all related to X)
  // - Relevance scoring (featured, direct match, relationship strength)
  // - Graph traversal for multi-degree relationships

  // Placeholder for now
  return [];
}

/**
 * Find path between two geometries
 */
export function findRelationshipPath(
  geometries: Record<string, Geometry>,
  fromId: GeometryId,
  toId: GeometryId,
  maxDepth = 3
): GeometryId[] | null {
  // BFS to find shortest path
  // Returns array of geometry IDs forming the path
  // Returns null if no path exists within maxDepth

  // Placeholder for now
  return null;
}
```

### Query Examples

```typescript
// Find all geometries containing the Golden Ratio
const results = searchGeometries(geometries, {
  relatedTo: "golden-ratio",
  relationshipTypes: ["contains", "ratio-related"],
});

// Search for fire element geometries
const fireGeometries = searchGeometries(geometries, {
  tags: ["fire"],
  category: "platonic",
});

// Find geometries similar to Flower of Life
const similar = searchGeometries(geometries, {
  relatedTo: "flower-of-life",
  relationshipTypes: ["similar-to", "derived-from"],
  minStrength: 7,
});

// Text search with relationship boost
const results = searchGeometries(geometries, {
  query: "transformation",
  limit: 10,
});
```

---

## Implementation Phases

### Phase 1: Core Relationship Display (Immediate)

**Timeline**: 1-2 days

**Scope**:
1. Create `<RelatedGeometries />` component
2. Display existing relationships (contains, appears-in, dual)
3. Group relationships by type
4. Add component to all MDX files
5. Style with Radix UI (match existing Card components)

**Deliverables**:
- ✅ New component: `src/components/related-geometries.tsx`
- ✅ Updated MDX files with `<RelatedGeometries />` section
- ✅ Basic styling and responsive layout
- ✅ Fallback UI for geometries with no relationships

**Success Metrics**:
- All geometry pages show related geometries
- Links work correctly
- UI matches site design system
- No TypeScript errors

---

### Phase 2: Enhanced Relationships & Metadata (Medium-term)

**Timeline**: 3-5 days

**Scope**:
1. Define new relationship types (derived-from, similar-to, etc.)
2. Add `RelationshipMeta` interface with strength/context
3. Create `RELATIONSHIP_GRAPH` with enhanced relationships
4. Update helper functions to query new graph
5. Auto-compute legacy fields for backward compatibility
6. Update `<RelatedGeometries />` to show relationship context

**Deliverables**:
- ✅ Updated type definitions with `RelationshipType` and `RelationshipMeta`
- ✅ New `RELATIONSHIP_GRAPH` in `relationships.ts`
- ✅ Enhanced helper functions (`getRelationshipsByType`, `getRelationshipStrength`)
- ✅ Updated component showing relationship context (tooltips/descriptions)
- ✅ Migration of existing relationships to new format

**Success Metrics**:
- All existing relationships migrated
- New relationship types added (minimum 20 new connections)
- Component displays context on hover/click
- Backward compatibility maintained

---

### Phase 3: Search Integration (Future)

**Timeline**: 5-7 days

**Scope**:
1. Build search index with relationship data
2. Implement `searchGeometries()` with relationship filters
3. Add graph traversal for multi-degree relationships
4. Create search UI (command palette or dedicated page)
5. Integrate with `<RelatedGeometries />` for "Find similar"

**Deliverables**:
- ✅ Search index builder (`buildSearchIndex`)
- ✅ Advanced search function with filters
- ✅ Graph traversal utilities (`findRelationshipPath`)
- ✅ Search UI component (command palette)
- ✅ Integration with relationship display

**Success Metrics**:
- Search returns relevant results
- Relationship-based search works (e.g., "find all fire element geometries")
- Graph traversal finds paths within 3 degrees
- Search UI is fast (<100ms response time)

---

### Phase 4: Advanced Features (Long-term)

**Timeline**: 1-2 weeks

**Scope**:
1. Interactive graph visualization (D3.js or similar)
2. Recommendation engine ("If you like X, explore Y")
3. Relationship path explanation ("How is X related to Y?")
4. Semantic search with natural language queries
5. Relationship strength visualization (thicker lines = stronger connection)

**Deliverables**:
- ✅ Graph visualization component
- ✅ Recommendation algorithm
- ✅ Path explanation UI
- ✅ Semantic search integration
- ✅ Advanced relationship analytics

**Success Metrics**:
- Graph visualization renders all geometries
- Recommendations are accurate and useful
- Path explanations are clear and educational
- Semantic search understands natural language queries

---

## Technical Specifications

### File Structure Changes

```
src/
├── components/
│   ├── related-geometries.tsx          # NEW: Relationship display component
│   └── relationship-graph.tsx          # FUTURE: Graph visualization
├── lib/
│   └── data/
│       ├── geometries.types.ts         # MODIFIED: Add RelationshipMeta, RelationshipType
│       ├── relationships.ts            # MODIFIED: Add RELATIONSHIP_GRAPH
│       ├── helpers.ts                  # MODIFIED: Enhanced query functions
│       ├── search-index.ts             # NEW: Search index builder
│       └── search.ts                   # NEW: Advanced search functions
└── content/
    ├── platonic-solids/                # MODIFIED: Add <RelatedGeometries /> to each
    └── sacred-patterns/                # MODIFIED: Add <RelatedGeometries /> to each
```

### Component API

#### `<RelatedGeometries />` Component

```typescript
interface RelatedGeometriesProps {
  slug?: string; // Optional: derive from context if not provided
  showStrength?: boolean; // Show relationship strength indicators
  groupByType?: boolean; // Group by relationship type (default: true)
  limit?: number; // Max relationships to show per type
  showContext?: boolean; // Show relationship context/description
}

export function RelatedGeometries(props: RelatedGeometriesProps): JSX.Element;
```

**Features**:
- Responsive grid layout
- Relationship type headers (e.g., "Contains", "Appears In", "Similar To")
- Clickable geometry cards with image + name
- Hover tooltips showing relationship context
- Empty state for geometries with no relationships
- Loading state for async data fetching

**Styling**:
- Match existing Card component style
- Blue gradient background with amber border
- Amber text for headings
- Blue text for body content
- Responsive: 1 column mobile, 2-3 columns desktop

### Helper Function Enhancements

#### New Query Functions

```typescript
// Get relationships by type
export function getRelationshipsByType(
  geometries: Record<string, Geometry>,
  geometryId: GeometryId,
  type: RelationshipType
): Geometry[];

// Get relationship strength between two geometries
export function getRelationshipStrength(
  geometries: Record<string, Geometry>,
  fromId: GeometryId,
  toId: GeometryId
): number | null;

// Get all relationship types for a geometry
export function getRelationshipTypes(
  geometries: Record<string, Geometry>,
  geometryId: GeometryId
): RelationshipType[];

// Get grouped relationships (for display)
export function getGroupedRelationships(
  geometries: Record<string, Geometry>,
  geometryId: GeometryId
): Record<RelationshipType, Geometry[]>;
```

---

## Benefits & Impact

### For Users

1. **Better Navigation**: Easily discover related geometries
2. **Deeper Understanding**: See how geometries connect conceptually
3. **Exploration**: Follow relationship paths to learn
4. **Search Power**: Find geometries by relationship type

### For Search (Future)

1. **Relevance**: Use relationship strength for ranking
2. **Discovery**: Surface related geometries in results
3. **Faceted Search**: Filter by relationship type, element, etc.
4. **Graph Queries**: "Show me everything related to X"
5. **Semantic Understanding**: Relationship context improves NLP

### For Development

1. **Type Safety**: Relationship types enforced at compile-time
2. **Maintainability**: Single source of truth for relationships
3. **Scalability**: Easy to add new geometries and relationships
4. **Testability**: Pure functions, easy to unit test
5. **Documentation**: Relationship metadata self-documents connections

---

## Next Steps

### Immediate Actions

1. ✅ Review and approve this plan
2. ⬜ Create `<RelatedGeometries />` component (Phase 1)
3. ⬜ Add component to all MDX files
4. ⬜ Test on all geometry pages
5. ⬜ Gather user feedback

### Future Planning

1. ⬜ Define comprehensive relationship mappings (all geometries)
2. ⬜ Design search UI mockups
3. ⬜ Research graph visualization libraries
4. ⬜ Plan search indexing strategy

---

## Appendix

### Relationship Type Definitions

| Type | Description | Example |
|------|-------------|---------|
| `contains` | A contains B as a sub-pattern | Flower of Life contains Seed of Life |
| `appears-in` | B appears within A (inverse of contains) | Vesica Piscis appears in Flower of Life |
| `dual` | Geometric duality (vertices ↔ faces) | Cube is dual of Octahedron |
| `derived-from` | B is derived/constructed from A | Flower of Life derived from Circle |
| `composed-of` | A is composed of multiple instances of B | Star Tetrahedron composed of 2 Tetrahedra |
| `transforms-into` | A evolves into B through a process | Seed of Life transforms into Flower of Life |
| `emerges-from` | B emerges from A through operations | Metatron's Cube emerges from Fruit of Life |
| `similar-to` | A and B share similar properties | Seed of Life similar to Egg of Life |
| `complementary` | A and B complement each other | Masculine/feminine pairings |
| `resonates-with` | A resonates with B through shared concepts | Golden Ratio resonates with pentagonal forms |
| `related-by-element` | A and B share elemental association | Tetrahedron and Fire element |
| `ratio-related` | A and B share mathematical ratio | Dodecahedron and Golden Ratio |
| `proportional` | A and B have proportional dimensions | Scaling relationships |
| `symmetric-with` | A and B exhibit similar symmetry | Shared symmetry groups |

### Example Geometry with Full Relationships

```typescript
{
  id: "flower-of-life",
  name: "Flower of Life",
  slug: "flower-of-life",
  category: "pattern",
  relationships: [
    // Structural
    { type: "contains", targetId: "seed-of-life", strength: 10, context: "First 7 circles" },
    { type: "contains", targetId: "vesica-piscis", strength: 9, context: "Fundamental overlap" },
    { type: "contains", targetId: "tree-of-life", strength: 8, context: "Kabbalistic overlay" },
    { type: "derived-from", targetId: "circle-dot", strength: 9, context: "Built from circles" },

    // Conceptual
    { type: "similar-to", targetId: "egg-of-life", strength: 7, context: "Structural variation" },
    { type: "resonates-with", targetId: "metatrons-cube", strength: 8, context: "Universal patterns" },

    // Transformational
    { type: "transforms-into", targetId: "fruit-of-life", strength: 8, context: "Extended pattern" },
  ],

  // Legacy fields (auto-computed for backward compatibility)
  contains: ["seed-of-life", "vesica-piscis", "tree-of-life"],
}
```

---

**End of Plan**
