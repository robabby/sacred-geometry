/**
 * Relationship Graphs
 *
 * Central source of truth for geometry relationships.
 * The `appearsIn` relationships are auto-computed from this graph.
 */

import type { GeometryId } from "./geometries.types";

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
