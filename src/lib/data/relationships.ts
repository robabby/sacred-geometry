/**
 * Relationship Graphs
 *
 * Central source of truth for geometry relationships.
 * The `appearsIn` relationships are auto-computed from this graph.
 */

import type { GeometryId, RelationshipMeta } from "./geometries.types";

/**
 * CONTAINS_GRAPH
 *
 * Defines which geometries contain which other geometries.
 * The inverse relationship (appearsIn) is computed automatically.
 *
 * Example: "flower-of-life" contains "seed-of-life"
 *   → seed-of-life.appearsIn will include "flower-of-life"
 */
export const CONTAINS_GRAPH: Record<string, GeometryId[]> = {
  // Sacred Patterns
  "flower-of-life": ["seed-of-life", "vesica-piscis", "tree-of-life"],
  "seed-of-life": ["vesica-piscis", "germ-of-life"],
  "egg-of-life": ["seed-of-life", "vesica-piscis"],
  "fruit-of-life": ["metatrons-cube"],
  "germ-of-life": ["vesica-piscis"],
  "metatrons-cube": [
    "tetrahedron",
    "hexahedron",
    "octahedron",
    "dodecahedron",
    "icosahedron",
  ],
  "sri-yantra": ["triangle"],
  "star-tetrahedron": ["tetrahedron"],
  pentagram: ["golden-ratio"],
  "64-tetrahedron": ["tetrahedron", "star-tetrahedron"],
  "fibonacci-spiral": ["golden-ratio"],
};

/**
 * DUAL_GRAPH
 *
 * Defines dual relationships between Platonic Solids.
 * A dual relationship means the vertices of one become the faces of the other.
 */
export const DUAL_GRAPH: Record<string, GeometryId> = {
  // Self-dual
  tetrahedron: "tetrahedron",
  // Cube ↔ Octahedron
  hexahedron: "octahedron",
  octahedron: "hexahedron",
  // Dodecahedron ↔ Icosahedron
  dodecahedron: "icosahedron",
  icosahedron: "dodecahedron",
};

/**
 * RELATIONSHIP_GRAPH
 *
 * Enhanced relationship system with metadata.
 * This is the new, unified source of truth for ALL geometry relationships.
 * Includes relationship type, strength, and context.
 *
 * Note: Legacy fields (contains, dual, appearsIn) are auto-computed from this graph.
 */
export const RELATIONSHIP_GRAPH: Partial<Record<GeometryId, RelationshipMeta[]>> = {
  // ========================================
  // PLATONIC SOLIDS
  // ========================================

  tetrahedron: [
    // Structural
    { type: "dual", targetId: "tetrahedron", strength: 10, context: "Self-dual polyhedron" },
    { type: "appears-in", targetId: "metatrons-cube", strength: 10 },
    { type: "appears-in", targetId: "star-tetrahedron", strength: 10 },
    { type: "appears-in", targetId: "64-tetrahedron", strength: 10 },
    // Conceptual
    { type: "related-by-element", targetId: "pentagram", strength: 6, context: "Both associated with fire element" },
  ],

  hexahedron: [
    // Structural
    { type: "dual", targetId: "octahedron", strength: 10, context: "Cube-octahedron duality" },
    { type: "appears-in", targetId: "metatrons-cube", strength: 10 },
    // Conceptual
    { type: "similar-to", targetId: "philosophers-stone", strength: 7, context: "Cubic foundation symbolism" },
  ],

  octahedron: [
    // Structural
    { type: "dual", targetId: "hexahedron", strength: 10, context: "Octahedron-cube duality" },
    { type: "appears-in", targetId: "metatrons-cube", strength: 10 },
    { type: "appears-in", targetId: "star-tetrahedron", strength: 7, context: "Shares dual pyramid form" },
    // Conceptual
    { type: "similar-to", targetId: "vector-equilibrium", strength: 6, context: "Balanced geometric forms" },
  ],

  dodecahedron: [
    // Structural
    { type: "dual", targetId: "icosahedron", strength: 10, context: "Dodecahedron-icosahedron duality" },
    { type: "appears-in", targetId: "metatrons-cube", strength: 10 },
    // Mathematical
    { type: "ratio-related", targetId: "golden-ratio", strength: 10, context: "Pentagonal faces embody phi" },
    { type: "ratio-related", targetId: "pentagram", strength: 9, context: "Pentagon-pentagram relationship" },
  ],

  icosahedron: [
    // Structural
    { type: "dual", targetId: "dodecahedron", strength: 10, context: "Icosahedron-dodecahedron duality" },
    { type: "appears-in", targetId: "metatrons-cube", strength: 10 },
    // Mathematical
    { type: "ratio-related", targetId: "golden-ratio", strength: 9, context: "Triangular faces contain phi ratios" },
    // Conceptual
    { type: "similar-to", targetId: "torus", strength: 6, context: "Both represent flow and water" },
  ],

  // ========================================
  // SACRED PATTERNS - FOUNDATIONAL
  // ========================================

  "circle-dot": [
    // Transformational
    { type: "transforms-into", targetId: "vesica-piscis", strength: 10, context: "Two circles create vesica" },
    { type: "transforms-into", targetId: "flower-of-life", strength: 9, context: "Foundation of flower pattern" },
    // Conceptual
    { type: "resonates-with", targetId: "torus", strength: 7, context: "Both represent unity and center" },
  ],

  "vesica-piscis": [
    // Structural
    { type: "appears-in", targetId: "flower-of-life", strength: 10 },
    { type: "appears-in", targetId: "seed-of-life", strength: 10 },
    { type: "appears-in", targetId: "egg-of-life", strength: 10 },
    { type: "appears-in", targetId: "germ-of-life", strength: 10 },
    // Transformational
    { type: "derived-from", targetId: "circle-dot", strength: 10, context: "Formed by two overlapping circles" },
    { type: "transforms-into", targetId: "seed-of-life", strength: 9, context: "Multiple vesicas form seed" },
    // Mathematical
    { type: "ratio-related", targetId: "golden-ratio", strength: 7, context: "Contains phi proportions" },
  ],

  // ========================================
  // SACRED PATTERNS - LIFE SERIES
  // ========================================

  "germ-of-life": [
    // Structural
    { type: "contains", targetId: "vesica-piscis", strength: 10 },
    { type: "appears-in", targetId: "seed-of-life", strength: 10 },
    // Transformational
    { type: "transforms-into", targetId: "seed-of-life", strength: 9, context: "Expands into seed of life" },
  ],

  "seed-of-life": [
    // Structural
    { type: "contains", targetId: "vesica-piscis", strength: 10 },
    { type: "contains", targetId: "germ-of-life", strength: 9 },
    { type: "appears-in", targetId: "flower-of-life", strength: 10 },
    { type: "appears-in", targetId: "egg-of-life", strength: 9 },
    // Transformational
    { type: "transforms-into", targetId: "flower-of-life", strength: 10, context: "Foundation circles of flower" },
    { type: "transforms-into", targetId: "egg-of-life", strength: 8, context: "Variant expansion pattern" },
    // Conceptual
    { type: "similar-to", targetId: "egg-of-life", strength: 8, context: "Structural variations of same pattern" },
  ],

  "egg-of-life": [
    // Structural
    { type: "contains", targetId: "seed-of-life", strength: 10 },
    { type: "contains", targetId: "vesica-piscis", strength: 9 },
    // Transformational
    { type: "derived-from", targetId: "seed-of-life", strength: 9, context: "Variant of seed pattern" },
    // Conceptual
    { type: "similar-to", targetId: "seed-of-life", strength: 8, context: "Structural variations" },
    { type: "resonates-with", targetId: "torus", strength: 6, context: "Both represent life generation" },
  ],

  "flower-of-life": [
    // Structural
    { type: "contains", targetId: "seed-of-life", strength: 10 },
    { type: "contains", targetId: "vesica-piscis", strength: 10 },
    { type: "contains", targetId: "tree-of-life", strength: 9 },
    { type: "contains", targetId: "fruit-of-life", strength: 8 },
    // Transformational
    { type: "derived-from", targetId: "circle-dot", strength: 9, context: "Built from overlapping circles" },
    { type: "derived-from", targetId: "seed-of-life", strength: 10, context: "Expanded from seed" },
    { type: "transforms-into", targetId: "fruit-of-life", strength: 9, context: "Evolves into fruit pattern" },
    // Conceptual
    { type: "resonates-with", targetId: "metatrons-cube", strength: 9, context: "Universal geometric blueprints" },
  ],

  "fruit-of-life": [
    // Structural
    { type: "contains", targetId: "metatrons-cube", strength: 10 },
    { type: "appears-in", targetId: "flower-of-life", strength: 8 },
    // Transformational
    { type: "transforms-into", targetId: "metatrons-cube", strength: 10, context: "Connecting centers forms Metatron" },
    { type: "emerges-from", targetId: "flower-of-life", strength: 9, context: "13 circles from flower pattern" },
  ],

  "metatrons-cube": [
    // Structural
    { type: "contains", targetId: "tetrahedron", strength: 10 },
    { type: "contains", targetId: "hexahedron", strength: 10 },
    { type: "contains", targetId: "octahedron", strength: 10 },
    { type: "contains", targetId: "dodecahedron", strength: 10 },
    { type: "contains", targetId: "icosahedron", strength: 10 },
    { type: "appears-in", targetId: "fruit-of-life", strength: 10 },
    // Transformational
    { type: "derived-from", targetId: "fruit-of-life", strength: 10, context: "Formed by connecting fruit centers" },
    { type: "emerges-from", targetId: "flower-of-life", strength: 9, context: "Ultimate pattern from flower" },
    // Conceptual
    { type: "resonates-with", targetId: "tree-of-life", strength: 8, context: "Both map divine structure" },
  ],

  // ========================================
  // SACRED PATTERNS - SPECIALIZED
  // ========================================

  "tree-of-life": [
    // Structural
    { type: "appears-in", targetId: "flower-of-life", strength: 9 },
    // Conceptual
    { type: "resonates-with", targetId: "metatrons-cube", strength: 8, context: "Both map divine emanation" },
    { type: "similar-to", targetId: "sri-yantra", strength: 7, context: "Sacred geometric cosmologies" },
  ],

  pentagram: [
    // Mathematical
    { type: "ratio-related", targetId: "golden-ratio", strength: 10, context: "Pentagram perfectly embodies phi" },
    { type: "ratio-related", targetId: "dodecahedron", strength: 9, context: "Pentagonal face relationships" },
    // Conceptual
    { type: "related-by-element", targetId: "tetrahedron", strength: 6, context: "Fire element associations" },
  ],

  "golden-ratio": [
    // Mathematical
    { type: "ratio-related", targetId: "pentagram", strength: 10 },
    { type: "ratio-related", targetId: "dodecahedron", strength: 10 },
    { type: "ratio-related", targetId: "icosahedron", strength: 9 },
    { type: "ratio-related", targetId: "fibonacci-spiral", strength: 10, context: "Fibonacci sequence generates phi" },
    { type: "ratio-related", targetId: "vesica-piscis", strength: 7 },
    // Conceptual
    { type: "resonates-with", targetId: "flower-of-life", strength: 8, context: "Divine proportion in nature" },
  ],

  "fibonacci-spiral": [
    // Mathematical
    { type: "ratio-related", targetId: "golden-ratio", strength: 10, context: "Spiral embodies phi growth" },
    // Conceptual
    { type: "similar-to", targetId: "torus", strength: 7, context: "Both represent spiraling energy" },
  ],

  "star-tetrahedron": [
    // Structural
    { type: "composed-of", targetId: "tetrahedron", strength: 10, context: "Two interlocking tetrahedra" },
    { type: "appears-in", targetId: "64-tetrahedron", strength: 9 },
    // Conceptual
    { type: "complementary", targetId: "octahedron", strength: 7, context: "Dual pyramid forms" },
  ],

  "64-tetrahedron": [
    // Structural
    { type: "composed-of", targetId: "tetrahedron", strength: 10, context: "64 tetrahedra in fractal array" },
    { type: "composed-of", targetId: "star-tetrahedron", strength: 9, context: "Contains 8 star tetrahedra" },
    // Conceptual
    { type: "similar-to", targetId: "vector-equilibrium", strength: 8, context: "Both represent perfect balance" },
  ],

  "vector-equilibrium": [
    // Conceptual
    { type: "similar-to", targetId: "64-tetrahedron", strength: 8, context: "Geometric equilibrium structures" },
    { type: "similar-to", targetId: "octahedron", strength: 6, context: "Balanced polyhedral forms" },
    { type: "resonates-with", targetId: "torus", strength: 7, context: "Dynamic balance and flow" },
  ],

  torus: [
    // Conceptual
    { type: "resonates-with", targetId: "circle-dot", strength: 7, context: "Both represent wholeness" },
    { type: "resonates-with", targetId: "vector-equilibrium", strength: 7, context: "Dynamic energy flow" },
    { type: "similar-to", targetId: "fibonacci-spiral", strength: 7, context: "Spiraling growth patterns" },
    { type: "similar-to", targetId: "icosahedron", strength: 6, context: "Water and flow symbolism" },
  ],

  "sri-yantra": [
    // Structural
    { type: "composed-of", targetId: "triangle", strength: 10, context: "9 interlocking triangles" },
    // Conceptual
    { type: "similar-to", targetId: "tree-of-life", strength: 7, context: "Maps of cosmic consciousness" },
    { type: "complementary", targetId: "star-tetrahedron", strength: 6, context: "Sacred masculine-feminine balance" },
  ],

  "philosophers-stone": [
    // Conceptual
    { type: "similar-to", targetId: "hexahedron", strength: 7, context: "Cubic alchemical symbolism" },
    { type: "resonates-with", targetId: "metatrons-cube", strength: 6, context: "Alchemical transformation maps" },
  ],

  triangle: [
    // Structural
    { type: "appears-in", targetId: "sri-yantra", strength: 10 },
    { type: "appears-in", targetId: "tetrahedron", strength: 9, context: "Triangular faces" },
    { type: "appears-in", targetId: "octahedron", strength: 9, context: "Triangular faces" },
    // Conceptual
    { type: "related-by-element", targetId: "tetrahedron", strength: 8, context: "Fire element connections" },
  ],
};
