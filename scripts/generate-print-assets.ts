#!/usr/bin/env npx tsx

/**
 * Generate Print Assets
 *
 * Converts geometry SVGs to print-ready PNGs for Printful products.
 *
 * Usage:
 *   pnpm print-assets <geometry-slug>     # Single geometry
 *   pnpm print-assets tetra flower        # Multiple geometries
 *   pnpm print-assets --all               # All geometries
 *   pnpm print-assets --list              # List available geometries
 *
 * Products supported (MVP):
 *   - Kiss-Cut Sticker (3″-5.5″): 1800 × 1800 px @ 300+ DPI
 *   - Poster (12"×16"): 3600 × 4800 px
 *   - White Ceramic Mug (11oz): 2700 × 1050 px
 */

import { Resvg } from "@resvg/resvg-js";
import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";

// Product dimensions (in pixels) - MVP products optimized for margins & organic sales
// Sticker: 1800px supports Printful sizes 3"×3", 4"×4", 5.5"×5.5" at 300+ DPI
const PRODUCTS = {
  sticker: { width: 1800, height: 1800, name: "Kiss-Cut Sticker (3″-5.5″)" },
  poster: { width: 3600, height: 4800, name: 'Poster (12"×16")' },
  mug: { width: 2700, height: 1050, name: "White Ceramic Mug (11oz)" },
} as const;

type ProductType = keyof typeof PRODUCTS;

// Geometry data (simplified for script - avoids importing full data model)
interface GeometryInfo {
  slug: string;
  category: "platonic-solids" | "sacred-patterns";
  variant: string;
}

// All available geometries
const GEOMETRIES: GeometryInfo[] = [
  // Platonic Solids (use 3d variant for striking visuals)
  { slug: "tetrahedron", category: "platonic-solids", variant: "3d" },
  { slug: "hexahedron", category: "platonic-solids", variant: "3d" },
  { slug: "octahedron", category: "platonic-solids", variant: "3d" },
  { slug: "dodecahedron", category: "platonic-solids", variant: "3d" },
  { slug: "icosahedron", category: "platonic-solids", variant: "3d" },
  // Sacred Patterns (use primary variant)
  { slug: "circle-dot", category: "sacred-patterns", variant: "primary" },
  { slug: "vesica-piscis", category: "sacred-patterns", variant: "primary" },
  { slug: "seed-of-life", category: "sacred-patterns", variant: "primary" },
  { slug: "egg-of-life", category: "sacred-patterns", variant: "primary" },
  { slug: "flower-of-life", category: "sacred-patterns", variant: "primary" },
  { slug: "fruit-of-life", category: "sacred-patterns", variant: "primary" },
  { slug: "tree-of-life", category: "sacred-patterns", variant: "primary" },
  { slug: "metatrons-cube", category: "sacred-patterns", variant: "primary" },
  { slug: "64-tetrahedron", category: "sacred-patterns", variant: "primary" },
  {
    slug: "vector-equilibrum",
    category: "sacred-patterns",
    variant: "primary",
  },
  { slug: "star-tetrahedron", category: "sacred-patterns", variant: "primary" },
  { slug: "merkaba", category: "sacred-patterns", variant: "primary" },
  { slug: "sri-yantra", category: "sacred-patterns", variant: "primary" },
  { slug: "torus", category: "sacred-patterns", variant: "primary" },
  { slug: "golden-ratio", category: "sacred-patterns", variant: "spiral" },
  { slug: "pentagram", category: "sacred-patterns", variant: "primary" },
  { slug: "germ-of-life", category: "sacred-patterns", variant: "primary" },
  {
    slug: "philosophers-stone",
    category: "sacred-patterns",
    variant: "primary",
  },
];

// Paths
const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");
const SVG_BASE = path.join(PROJECT_ROOT, "public", "images", "geometries");
const OUTPUT_BASE = path.join(PROJECT_ROOT, "print-assets");

/**
 * Get SVG file path for a geometry
 */
function getSvgPath(geometry: GeometryInfo): string {
  return path.join(
    SVG_BASE,
    geometry.category,
    geometry.slug,
    `${geometry.slug}-${geometry.variant}.svg`
  );
}

/**
 * Render SVG centered on a transparent canvas at exact target dimensions
 */
async function renderSvgCentered(
  svgPath: string,
  targetWidth: number,
  targetHeight: number
): Promise<Buffer> {
  const svgContent = fs.readFileSync(svgPath, "utf-8");

  // Calculate max design area (with padding)
  const padding = 0.1; // 10% padding on each side
  const maxDesignWidth = Math.round(targetWidth * (1 - 2 * padding));
  const maxDesignHeight = Math.round(targetHeight * (1 - 2 * padding));

  // Render SVG at high resolution first (we'll scale down as needed)
  const renderSize = Math.max(maxDesignWidth, maxDesignHeight) * 2;

  const resvg = new Resvg(svgContent, {
    fitTo: {
      mode: "width",
      value: renderSize,
    },
    background: "transparent",
  });

  const rendered = resvg.render();
  const designPng = rendered.asPng();

  // Use sharp to resize the design to fit within max bounds while maintaining aspect ratio
  const resizedDesign = await sharp(designPng)
    .resize(maxDesignWidth, maxDesignHeight, {
      fit: "inside",
      withoutEnlargement: false,
    })
    .png()
    .toBuffer();

  // Get the actual dimensions after resize
  const metadata = await sharp(resizedDesign).metadata();
  const designWidth = metadata.width ?? maxDesignWidth;
  const designHeight = metadata.height ?? maxDesignHeight;

  // Calculate centering offsets
  const left = Math.round((targetWidth - designWidth) / 2);
  const top = Math.round((targetHeight - designHeight) / 2);

  // Create transparent canvas at target dimensions and composite design centered
  const result = await sharp({
    create: {
      width: targetWidth,
      height: targetHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: resizedDesign,
        left,
        top,
      },
    ])
    .png()
    .toBuffer();

  return result;
}

/**
 * Generate print assets for a single geometry
 */
async function generateForGeometry(geometry: GeometryInfo): Promise<void> {
  const svgPath = getSvgPath(geometry);

  if (!fs.existsSync(svgPath)) {
    console.error(`  ❌ SVG not found: ${svgPath}`);
    return;
  }

  // Create output directory
  const outputDir = path.join(OUTPUT_BASE, geometry.category, geometry.slug);
  fs.mkdirSync(outputDir, { recursive: true });

  console.log(`  📁 ${geometry.slug}`);

  // Generate for each product
  for (const [productKey, product] of Object.entries(PRODUCTS)) {
    const outputPath = path.join(
      outputDir,
      `${geometry.slug}-${geometry.variant}-${productKey}.png`
    );

    try {
      const pngBuffer = await renderSvgCentered(
        svgPath,
        product.width,
        product.height
      );
      fs.writeFileSync(outputPath, pngBuffer);
      console.log(`     ✓ ${productKey}: ${product.width}×${product.height}px`);
    } catch (error) {
      console.error(
        `     ✗ ${productKey}: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
}

/**
 * Find geometry by slug (partial match supported)
 */
function findGeometry(slug: string): GeometryInfo | undefined {
  // Exact match first
  const exact = GEOMETRIES.find((g) => g.slug === slug);
  if (exact) return exact;

  // Partial match
  const partial = GEOMETRIES.find(
    (g) => g.slug.includes(slug) || slug.includes(g.slug)
  );
  return partial;
}

/**
 * List all available geometries
 */
function listGeometries(): void {
  console.log("\n📐 Available Geometries:\n");

  console.log("Platonic Solids:");
  GEOMETRIES.filter((g) => g.category === "platonic-solids").forEach((g) => {
    console.log(`  - ${g.slug}`);
  });

  console.log("\nSacred Patterns:");
  GEOMETRIES.filter((g) => g.category === "sacred-patterns").forEach((g) => {
    console.log(`  - ${g.slug}`);
  });

  console.log(`\nTotal: ${GEOMETRIES.length} geometries`);
}

/**
 * Main CLI entry point
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`
Generate Print Assets - Convert SVGs to print-ready PNGs

Usage:
  pnpm print-assets <geometry-slug>     # Single geometry
  pnpm print-assets tetra flower        # Multiple geometries (partial match)
  pnpm print-assets --all               # All geometries
  pnpm print-assets --list              # List available geometries

Products:
  - sticker: ${PRODUCTS.sticker.width}×${PRODUCTS.sticker.height}px (${PRODUCTS.sticker.name})
  - poster:  ${PRODUCTS.poster.width}×${PRODUCTS.poster.height}px (${PRODUCTS.poster.name})
  - mug:     ${PRODUCTS.mug.width}×${PRODUCTS.mug.height}px (${PRODUCTS.mug.name})

Output: print-assets/{category}/{slug}/
`);
    return;
  }

  if (args.includes("--list") || args.includes("-l")) {
    listGeometries();
    return;
  }

  console.log("\n🎨 Generating Print Assets\n");

  let geometriesToProcess: GeometryInfo[] = [];

  if (args.includes("--all") || args.includes("-a")) {
    geometriesToProcess = GEOMETRIES;
    console.log(`Processing all ${GEOMETRIES.length} geometries...\n`);
  } else {
    // Process each argument as a geometry slug
    for (const arg of args) {
      const geometry = findGeometry(arg);
      if (geometry) {
        geometriesToProcess.push(geometry);
      } else {
        console.warn(`  ⚠️  Unknown geometry: ${arg}`);
      }
    }
  }

  if (geometriesToProcess.length === 0) {
    console.error("No valid geometries to process.");
    process.exit(1);
  }

  // Process each geometry
  for (const geometry of geometriesToProcess) {
    await generateForGeometry(geometry);
  }

  console.log(`\n✅ Done! Assets saved to: ${OUTPUT_BASE}\n`);
}

main().catch(console.error);
