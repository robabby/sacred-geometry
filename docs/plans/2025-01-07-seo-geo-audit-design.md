# SEO & GEO Audit Design

**Date:** 2025-01-07
**Linear Issues:** SG-135 (Phase 1), SG-136 (Phase 2)
**Status:** In Progress

## Problem

The Sacred Geometry site lacks technical SEO elements. Search engines cannot index pages effectively. Social shares display no preview images. AI search engines (ChatGPT, Perplexity, Google SGE) cannot extract structured answers.

### Current Gaps

| Element | Status |
|---------|--------|
| Sitemap | Missing |
| robots.txt | Missing |
| OpenGraph/Twitter cards | Missing |
| JSON-LD structured data | Missing |
| generateMetadata on Platonic Solids | Missing |
| FAQ content | Missing |

## Solution

Two-phase implementation:

1. **Phase 1 (SG-135):** Technical SEO foundation
2. **Phase 2 (SG-136):** FAQ page with GEO optimization

## Phase 1: Technical SEO Foundation

### New Files

| File | Purpose |
|------|---------|
| `src/app/sitemap.ts` | Dynamic sitemap from geometry data |
| `src/app/robots.ts` | Crawler directives |
| `src/components/structured-data.tsx` | Reusable JSON-LD component |
| `public/images/og-default.png` | Default social image (1200x630) |

### Modified Files

| File | Changes |
|------|---------|
| `src/app/layout.tsx` | metadataBase, OpenGraph, Twitter cards, title template |
| `src/app/page.tsx` | Page metadata |
| `src/app/platonic-solids/page.tsx` | List page metadata |
| `src/app/sacred-patterns/page.tsx` | List page metadata |
| `src/app/platonic-solids/[slug]/page.tsx` | Add generateMetadata |
| `src/app/sacred-patterns/[slug]/page.tsx` | Add Article schema |

### Key Implementation Details

**Sitemap:** Uses `getAllGeometries()` to generate entries dynamically. Priority: home (1.0), lists (0.8), details (0.7).

**Metadata template:** `%s | Sacred Geometry` ensures consistent page titles.

**metadataBase:** Enables automatic absolute URL generation for OpenGraph images.

## Phase 2: FAQ Page & GEO

### New Files

| File | Purpose |
|------|---------|
| `src/lib/data/faq.ts` | FAQ data model and content |
| `src/app/faq/page.tsx` | FAQ page with FAQPage schema |

### Modified Files

| File | Changes |
|------|---------|
| `src/util/routes.ts` | Add faq route |
| `src/components/footer.tsx` | Add FAQ link to navigation |

### FAQ Structure

**Categories:**
- General (6-8 questions)
- Platonic Solids (5-7 questions)
- Sacred Patterns (6-8 questions)
- Practice (4-6 questions)

**Total:** ~20-25 AI-generated Q&As derived from existing MDX content.

**Schema:** FAQPage structured data for rich results in search engines.

## Verification

### Phase 1
- `pnpm build` passes
- `/sitemap.xml` returns valid XML
- `/robots.txt` contains sitemap reference
- Google Rich Results Test validates structured data
- Lighthouse SEO score: 100

### Phase 2
- `/faq` displays all categories
- Accordion interactions work
- Internal links function
- FAQPage schema validates

## Context Recovery

After `/clear`:
1. Run `/hydrate` to load memories
2. Check Linear issue (SG-135 or SG-136) for current status
3. Read this design doc for full context
