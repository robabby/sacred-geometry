/**
 * Geometry Type Definitions
 *
 * Core TypeScript interfaces and types for the sacred geometry data model
 */

/**
 * All geometry IDs for compile-time type safety
 */
export const GEOMETRY_IDS = [
  // Platonic Solids
  "tetrahedron",
  "hexahedron",
  "octahedron",
  "dodecahedron",
  "icosahedron",
  // Sacred Patterns
  "circle-dot",
  "vesica-piscis",
  "germ-of-life",
  "seed-of-life",
  "egg-of-life",
  "fruit-of-life",
  "flower-of-life",
  "metatrons-cube",
  "sri-yantra",
  "star-tetrahedron",
  "golden-ratio",
  "philosophers-stone",
  "pentagram",
  "torus",
  "tree-of-life",
  "vector-equilibrium",
  "64-tetrahedron",
  // Additional geometries
  "triangle",
  "fibonacci-spiral",
] as const;

/**
 * Union type of all valid geometry IDs
 */
export type GeometryId = (typeof GEOMETRY_IDS)[number];

/**
 * Geometry category types
 */
export type GeometryCategory = "platonic" | "pattern";

/**
 * Relationship types between geometries
 */
export type RelationshipType =
  // Structural relationships
  | "contains" // A contains B as a sub-pattern
  | "appears-in" // B appears within A (inverse of contains)
  | "derived-from" // B is derived/constructed from A
  | "composed-of" // A is composed of multiple instances of B
  | "dual" // Geometric duality (vertices ↔ faces)
  // Transformational relationships
  | "transforms-into" // A evolves into B through a process
  | "emerges-from" // B emerges from A through geometric operations
  | "unfolds-to" // A unfolds to reveal B
  // Conceptual relationships
  | "similar-to" // A and B share similar properties/symbolism
  | "complementary" // A and B complement each other
  | "resonates-with" // A resonates with B through shared concepts
  | "related-by-element" // A and B share elemental association
  // Mathematical relationships
  | "ratio-related" // A and B share a mathematical ratio (e.g., Golden Ratio)
  | "proportional" // A and B have proportional dimensions
  | "symmetric-with"; // A and B exhibit similar symmetry

/**
 * Relationship metadata for individual geometry relationships
 */
export interface RelationshipMeta {
  type: RelationshipType;
  targetId: GeometryId;
  strength?: number; // 1-10 scale for weighting (default: 5)
  context?: string; // Brief description of the relationship
  bidirectional?: boolean; // Whether relationship goes both ways (default: false)
  displayLabel?: string; // Override default type label
}

/**
 * Relationship metadata for a geometry (legacy)
 */
export interface GeometryRelations {
  element?: "fire" | "earth" | "air" | "water" | "ether";
  chakra?: string;
  property?: string[]; // Symbolic/conceptual properties only
}

/**
 * Image asset paths for a geometry
 */
export interface GeometryImages {
  heroImage?: string; // Path to hero/primary image
  solidImage?: string; // Path to solid view image
  wireframeImage?: string; // Path to wireframe view image
  netImage?: string; // Path to unfolded net image
}

/**
 * Mathematical properties of a geometry
 */
export interface GeometryMathProperties {
  faces?: number;
  faceShape?: string; // e.g., "Triangular", "Square", "Pentagonal"
  vertices?: number;
  edges?: number;
}

/**
 * Complete geometry definition
 */
export interface Geometry {
  id: GeometryId;
  name: string;
  slug: string;
  category: GeometryCategory;
  title?: string; // Full display title for the page
  description?: string;
  aliases?: string[]; // Alternative names (e.g., "Merkaba" for Star Tetrahedron)

  // Enhanced relationships (new system)
  relationships?: RelationshipMeta[]; // Explicit relationship metadata

  // Legacy relationship fields (auto-computed for backward compatibility)
  dual?: GeometryId; // Dual geometry (Platonic solids only)
  dualOfTitle?: string; // Display name for dual
  contains?: GeometryId[]; // Array of geometry ids found within this geometry
  appearsIn?: GeometryId[]; // Array of geometry ids where this appears (auto-computed)

  relatedBy?: GeometryRelations;
  images?: GeometryImages;
  mathProperties?: GeometryMathProperties;
  featured?: boolean;
  order?: number; // Order/sequence number for display
}
