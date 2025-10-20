# Content Directory

This directory contains content files for sacred geometry pages. Content is separated from the core geometry data model to allow for flexible, maintainable page-specific content.

The project uses two content systems:
- **YAML** for Platonic Solids (structured, consistent schema)
- **MDX** for Sacred Patterns (rich narrative content with React components)

## Structure

```
src/content/
├── platonic-solids/   # YAML content for the 5 Platonic Solids
│   ├── tetrahedron.yml
│   ├── hexahedron.yml
│   ├── octahedron.yml
│   ├── dodecahedron.yml
│   └── icosahedron.yml
└── sacred-patterns/   # MDX content for 17 Sacred Patterns
    ├── circle-dot.mdx
    ├── vesica-piscis.mdx
    ├── flower-of-life.mdx
    ├── seed-of-life.mdx
    ├── fruit-of-life.mdx
    ├── egg-of-life.mdx
    ├── germ-of-life.mdx
    ├── pentagram.mdx
    ├── philosophers-stone.mdx
    ├── sri-yantra.mdx
    ├── star-tetrahedron.mdx
    ├── metatrons-cube.mdx
    ├── tree-of-life.mdx
    ├── torus.mdx
    ├── vector-equilibrium.mdx
    ├── 64-tetrahedron.mdx
    └── golden-ratio.mdx
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

## MDX Schema for Sacred Patterns

Sacred Patterns use MDX for rich narrative content with React components.

### Basic Structure

```mdx
---
slug: flower-of-life   # Must match geometry slug from data model
---

<Section title="Section Title">

## Section Title

Content goes here with **bold** text, *italic* text, and lists:

- **Key Point 1:** Description here
- **Key Point 2:** Description here

Regular paragraphs can include [links](/platonic-solids/tetrahedron) to other pages.

</Section>

<Section title="Another Section">

## Another Section

More content...

</Section>
```

### MDX Components

Custom components are defined in `src/components/mdx-components.tsx`:
- `<Section>` - Wraps content in styled Card components
- `h2`, `h3` - Styled headings (amber colors)
- `p` - Styled paragraphs (blue text)
- `ul`, `ol`, `li` - Styled lists
- `strong` - Bold text (amber color)

### Loading MDX Content

```typescript
import { getSacredPatternContent } from '@/lib/content';

const content = await getSacredPatternContent('flower-of-life');
// Returns: { slug: string, content: React.ReactElement }
```

### Rendering MDX Content

```typescript
export default async function Page({ params }: { params: { slug: string } }) {
  const patternContent = await getSacredPatternContent(params.slug);

  return <div>{patternContent.content}</div>;
}
```

## Editing Guidelines

### Sacred Pattern Content

- Each section should have a `title` prop AND an `h2` heading with the same text
- Use markdown formatting (`**bold**`, *italic*, lists, links)
- Keep content narrative and engaging (longer form than Platonic Solids)
- Use `<Section>` components to wrap major content sections
- Frontmatter must include `slug` matching the geometry data model

### Platonic Solid Content

- Use `**bold**` for emphasis (converted to `<strong>` tags)
- Use `*italic*` for subtle emphasis (converted to `<em>` tags)
- Keep slug consistent with geometry data model
- Follow structured YAML schema
