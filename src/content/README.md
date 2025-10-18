# Content Directory

This directory contains YAML content files for sacred geometry pages. Content is separated from the core geometry data model to allow for flexible, maintainable page-specific content.

## Structure

```
src/content/
├── platonic-solids/   # Content for the 5 Platonic Solids
│   ├── tetrahedron.yml
│   ├── hexahedron.yml
│   ├── octahedron.yml
│   ├── dodecahedron.yml
│   └── icosahedron.yml
└── sacred-patterns/   # Content for sacred patterns (future)
```

## YAML Schema for Platonic Solids

See `src/lib/content/types.ts` for the TypeScript interface.

### Basic Structure

```yaml
slug: tetrahedron        # Must match geometry slug from data model
order: First Solid       # Presentational string (e.g., "First Solid", "Second Solid")

symbolic:
  introduction: "..."    # Opening paragraph
  associations:          # List of symbolic meanings
    - "..."
    - "..."

mathematical:
  insights:              # Array of mathematical insights/paragraphs
    - "..."
    - "..."

nature:
  introduction: "..."    # Opening paragraph
  examples:              # Categorized real-world examples
    - category: Chemistry
      description: "..."
    - category: Crystals
      description: "..."
```

## Editing Guidelines

### Text Formatting

- Use `**bold**` for emphasis (converted to `<strong>` tags)
- Use `*italic*` for subtle emphasis (converted to `<em>` tags)
- Keep slug consistent with geometry data model in `src/lib/data/geometries.ts`

### Content Separation

- **Data Model** (`src/lib/data/geometries.ts`): Structural data, relationships, metadata
  - `order: number` - Integer for sorting/logic (1, 2, 3, etc.)

- **Content YAML**: Presentational content, copy, narrative
  - `order: string` - Display string ("First Solid", "Second Solid", etc.)

### Loading Content

```typescript
import { getPlatonicSolidContent } from '@/lib/content';

const content = getPlatonicSolidContent('tetrahedron');
```

### Rendering Formatted Text

```typescript
import { formatText } from '@/lib/content';

<Text dangerouslySetInnerHTML={{ __html: formatText(content.symbolic.introduction) }} />
```

## Future Extensions

- Sacred Patterns will likely use a different schema based on their unique content needs
- Additional formatting support can be added to `formatText()` as needed
- Content validation with Zod schemas can be added if required
