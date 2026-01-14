# Shop Vision & Strategy

> Source of truth for Sacred Geometry shop strategy, product roadmap, and operational workflows.

## Product Strategy

### Two-Tier Approach

| Tier | Description | Release Cadence | Lifecycle |
|------|-------------|-----------------|-----------|
| **Baseline** | Simple wireframe geometry on standard products | One-time setup, always available | Evergreen catalog |
| **Featured** | AI-generated sacred geometry artwork | Weekly/monthly releases | Permanent, but less prominent over time |

### MVP Products

For the initial launch, we're validating the pipeline with three product types:

1. **Embroidered Dad Cap** - Premium anchor, higher price point
2. **Kiss-Cut Stickers** - Low-cost entry, volume potential
3. **White Ceramic Mug (11oz)** - Classic middle-tier

**MVP Scope:**
- 2-3 geometries (spanning platonic solids + sacred patterns)
- ~6-9 SKUs total
- Purpose: Validate the full pipeline before scaling to 90+ products

### Future Products (Post-MVP)

For AI-generated featured artwork:
- **Desk Mats** - Monthly series, large canvas for detailed art
- **Posters** - Wall art pieces
- **All-over print tees/hoodies** - Vibrant, colorful artwork
- **Canvas Tote Bags** - Eco-friendly option

---

## Workflows

### Baseline Workflow (MVP)

For simple wireframe geometry products:

```
1. Select geometry from existing SVGs
2. Convert SVG → PNG (print-ready dimensions)
   └── Use: pnpm print-assets <geometry-slug>
3. Upload to Printful, create sync product
4. Add product to site data model (src/lib/data/products.ts)
5. Deploy
```

### Featured Workflow (Future)

For AI-generated artwork products:

```
1. Capture idea in Obsidian
   └── Prompt concepts, themes, target products

2. Generate artwork
   └── Midjourney, Nanobanana Pro, or Invoke AI

3. Export finals → defined folder

4. Log metadata in Obsidian
   └── Prompt used, model, generation date, linked files

5. Process for print
   └── Dimensions, transparency, color adjustments

6. Upload to Printful, create sync product

7. Add to site with accompanying content
   └── Story behind the artwork, geometry connections

8. Deploy
```

---

## Printful Product Specifications

### Embroidered Dad Cap

| Spec | Value |
|------|-------|
| Max embroidery area | 4" × 1.75" (front) |
| **Pixel dimensions** | **1200 × 525 px** @ 300 DPI |
| Side/back logo | 2" × 1" (600 × 300 px) |
| Digitization fee | $6.50 per design (one-time) |
| File format | Vector preferred (AI, PDF) or high-res PNG |
| Max colors | 4 colors for flat embroidery |
| Notes | Simple wireframe geometry is ideal (clean lines) |

### White Ceramic Mug (11oz)

| Spec | Value |
|------|-------|
| Print method | Sublimation (wrap-around) |
| **Pixel dimensions** | **2700 × 1050 px** |
| Physical size | Height: 3.79" (9.6 cm), Diameter: 3.25" (8.3 cm) |
| File format | PNG, 300 DPI |
| Features | Dishwasher and microwave safe |

### Kiss-Cut Stickers

| Spec | Value |
|------|-------|
| Material | Durable vinyl |
| Durability | Indoor/outdoor, water-resistant, scratch-resistant |
| File format | PNG with transparency, 300 DPI |
| **Sizes (@ 300 DPI)** | |
| 2" × 2" | 600 × 600 px |
| 3" × 3" | 900 × 900 px |
| 4" × 4" | 1200 × 1200 px |
| 5.5" × 5.5" | 1650 × 1650 px |

---

## Asset Pipeline

### Source Files

SVGs located in `public/images/geometries/`:
- `platonic-solids/` - 25 files (5 geometries)
- `sacred-patterns/` - 28 files (18 patterns)

### Target Variants

| Category | Preferred Variant |
|----------|-------------------|
| Platonic solids | `wireframe` (simple line art) |
| Sacred patterns | `primary` (fallback when `wireframe` unavailable) |

### Output Location

Print-ready PNGs in `print-assets/`:

```
print-assets/
├── platonic-solids/
│   ├── tetrahedron/
│   │   ├── tetrahedron-wireframe-cap.png
│   │   ├── tetrahedron-wireframe-mug.png
│   │   └── tetrahedron-wireframe-sticker.png
│   └── ...
└── sacred-patterns/
    └── ...
```

---

## Related Links

- **Linear Epic**: [SG-206: Shop MVP - Vision & Print Asset Tooling](https://linear.app/sherpagg/issue/SG-206)
- **Conversion Script**: `scripts/generate-print-assets.ts`
- **Product Data Model**: `src/lib/data/products.ts`
