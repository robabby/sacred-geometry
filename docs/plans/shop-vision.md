# Shop Vision & Strategy

> Source of truth for Sacred Geometry shop strategy, product roadmap, and operational workflows.

---

## Market Research Insights

*Research conducted January 2026*

### Why Sacred Geometry Is Ideal for Low-Marketing Sales

Sacred geometry is an optimal niche because buyers:
- Have **strong emotional connections** (spirituality, meaning, mindfulness)
- **Actively search** for specific designs (Flower of Life, Metatron's Cube, Merkaba)
- Are **passionate** and become repeat customers/brand ambassadors
- Are willing to pay **premium prices** for authentic, meaningful designs

This means organic discovery works exceptionally well - buyers are already looking for these products.

### Market Size

- **Spiritual Products Market**: $178.9B (2024), growing at 4% CAGR
- **E-commerce dominance**: 70% of spiritual product sales occur online
- **Home Decor POD**: Fastest growing category at 28% CAGR

### Platform Strategy (Minimal Marketing)

| Platform | Monthly Traffic | Strategy |
|----------|-----------------|----------|
| **Etsy** | 400M visits, 89.6M active buyers | Primary - built-in discovery, buyers searching for sacred geometry |
| **Pinterest** | 553M users | Secondary - pins drive traffic for years, spiritual content performs well |
| **Own Site** | Zero built-in traffic | Tertiary - brand home, direct sales |

*Note: One seller reports $50k+/month on Etsy with NO ads - the platform's search brings buyers organically.*

### Product Margins by Category

| Product | Profit Margin | Notes |
|---------|---------------|-------|
| Stickers | 60-80% | Impulse buy, low barrier |
| Wall Art (Posters/Canvas) | 74-78% | Highest margins, ideal for sacred geometry |
| Mugs | 40-60% | Gift staple, consistent demand |
| Embroidered Caps | 30-45% | $6.50 digitization fee per design |
| T-shirts | 40-75% | Competitive market |

---

## Product Strategy

### Two-Tier Approach

| Tier | Description | Release Cadence | Lifecycle |
|------|-------------|-----------------|-----------|
| **Baseline** | Simple wireframe geometry on standard products | One-time setup, always available | Evergreen catalog |
| **Featured** | AI-generated sacred geometry artwork | Weekly/monthly releases | Permanent, but less prominent over time |

### MVP Products (Revised Based on Market Research)

Optimized for **highest margins** and **lowest marketing needs**:

| Product | Price Point | Margin | Why It Works |
|---------|-------------|--------|--------------|
| **Kiss-Cut Stickers** | $2-5 | 60-80% | Impulse buy, organic Etsy discovery |
| **Posters** | $18-35 | 74%+ | Perfect for sacred geometry, home decor growing 28% |
| **White Ceramic Mug (11oz)** | $15-20 | 40-60% | Gift staple, consistent demand |

**MVP Scope:**
- 3 geometries: **Flower of Life**, **Metatron's Cube**, **Seed of Life**
- 9 SKUs total (3 shapes × 3 products)
- Purpose: Validate the full pipeline before scaling

### Product Roadmap

**Tier 1 - MVP (Now):**
- Kiss-Cut Stickers
- Posters
- Mugs

**Tier 2 - After Validation:**
- Canvas prints (premium wall art)
- Tote bags
- Phone cases

**Tier 3 - Future/Featured:**
- Desk Mats (monthly AI artwork series)
- Embroidered caps
- All-over print tees/hoodies

### MVP Geometry Selection

Based on market research across Etsy, Amazon, and spiritual marketplaces:

**MVP Geometries (Start Here):**

| Shape | Category | Why Selected |
|-------|----------|--------------|
| **Flower of Life** | Sacred Pattern | #1 bestseller, universal recognition, mass market appeal |
| **Metatron's Cube** | Sacred Pattern | Strong niche appeal, visually impressive, contains all Platonic solids |
| **Seed of Life** | Sacred Pattern | Clean/minimalist, works great at small sizes, beginner-friendly |

**Geometry Rankings by Commercial Viability:**

*Tier 1 - High Commercial (Mass Market):*
- Flower of Life, Metatron's Cube, Seed of Life, Tree of Life

*Tier 2 - Strong Niche (Spiritual Practitioners):*
- Golden Ratio, Sri Yantra, Merkaba, Vesica Piscis

*Tier 3 - Platonic Solids (Differentiated):*
- Dodecahedron (ether/universe), Icosahedron (water), Tetrahedron (fire)

*Tier 4 - Skip for Now:*
- Hexahedron (too common), Torus (hard in 2D), 64-Tetrahedron (very niche), Pentagram (controversial)

### Design Style Guidelines

**Color Schemes by Market Segment:**

| Style | Target Market | Characteristics |
|-------|---------------|-----------------|
| **Minimalist Black & White** | Broadest appeal | Clean lines, high contrast, modern aesthetic |
| **Gold on Dark** | Premium segment | Gold foil on navy/black/purple, commands higher prices |
| **Colorful/Psychedelic** | Festival market | Vibrant blues, purples, teals, cosmic themes |
| **Neutral Earth Tones** | Wellness market | Beige, cream, subtle gold, "Pinterest-friendly" |

**Style Recommendations for MVP:**

1. **Start with minimalist black/white** - Works everywhere, lowest risk
2. **Add gold variants** for premium positioning
3. **Test colorful versions** after validating base designs

**Design Execution Standards:**
- Precise geometry (symmetry matters to this audience)
- Professional mockups showing lifestyle context (meditation spaces, yoga studios)
- High-quality product photography
- Meaningful descriptions connecting to spiritual significance

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

### Kiss-Cut Stickers (MVP)

| Spec | Value |
|------|-------|
| Material | Durable vinyl |
| Durability | Indoor/outdoor, water-resistant, scratch-resistant |
| File format | PNG with transparency, 300 DPI |
| **Sizes (@ 300 DPI)** | |
| 2" × 2" | 600 × 600 px |
| 3" × 3" | 900 × 900 px |
| 4" × 4" | 1200 × 1200 px (recommended) |
| 5.5" × 5.5" | 1650 × 1650 px |

### Posters (MVP)

| Spec | Value |
|------|-------|
| Print method | Giclée (archival quality) |
| Paper | Museum-quality matte or semi-gloss |
| **Common Sizes** | |
| 8" × 10" | 2400 × 3000 px @ 300 DPI |
| 12" × 16" | 3600 × 4800 px @ 300 DPI |
| 18" × 24" | 5400 × 7200 px @ 300 DPI |
| File format | PNG, 300 DPI |
| Notes | Sacred geometry designs are ideal for wall art/meditation spaces |

### White Ceramic Mug (11oz) (MVP)

| Spec | Value |
|------|-------|
| Print method | Sublimation (wrap-around) |
| **Pixel dimensions** | **2700 × 1050 px** |
| Physical size | Height: 3.79" (9.6 cm), Diameter: 3.25" (8.3 cm) |
| File format | PNG, 300 DPI |
| Features | Dishwasher and microwave safe |

### Embroidered Dad Cap (Tier 3)

| Spec | Value |
|------|-------|
| Max embroidery area | 4" × 1.75" (front) |
| **Pixel dimensions** | **1200 × 525 px** @ 300 DPI |
| Digitization fee | $6.50 per design (one-time) |
| File format | Vector preferred (AI, PDF) or high-res PNG |
| Max colors | 4 colors for flat embroidery |
| Notes | Deferred to Tier 3 due to per-design setup cost |

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
└── sacred-patterns/
    ├── flower-of-life/
    │   ├── flower-of-life-primary-sticker.png   (1200×1200 px)
    │   ├── flower-of-life-primary-poster.png    (3600×4800 px)
    │   └── flower-of-life-primary-mug.png       (2700×1050 px)
    ├── metatrons-cube/
    │   └── ...
    └── seed-of-life/
        └── ...

---

## Related Links

- **Linear Epic**: [SG-206: Shop MVP - Vision & Print Asset Tooling](https://linear.app/sherpagg/issue/SG-206)
- **Conversion Script**: `scripts/generate-print-assets.ts`
- **Product Data Model**: `src/lib/data/products.ts`
