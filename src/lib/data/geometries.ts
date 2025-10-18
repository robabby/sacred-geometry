/**
 * Geometry Data Model and Catalog
 *
 * This module defines the data structure for sacred geometry relationships
 * and provides helper functions for querying and navigating these connections.
 */

export type GeometryCategory = "platonic" | "pattern";

export interface GeometryRelations {
  element?: "fire" | "earth" | "air" | "water" | "ether";
  chakra?: string;
  property?: string[];
}

export interface GeometryImages {
  heroImage?: string; // Path to hero/primary image
  solidImage?: string; // Path to solid view image
  wireframeImage?: string; // Path to wireframe view image
  netImage?: string; // Path to unfolded net image
}

export interface GeometryMathProperties {
  faces?: number;
  faceShape?: string; // e.g., "Triangular", "Square", "Pentagonal"
  vertices?: number;
  edges?: number;
}

export interface Geometry {
  id: string;
  name: string;
  slug: string;
  category: GeometryCategory;
  title?: string; // Full display title for the page
  description?: string;
  aliases?: string[]; // Alternative names for this geometry (e.g., "Merkaba" for Star Tetrahedron)
  dual?: string; // geometry id
  dualOfTitle?: string; // Display name for dual
  contains?: string[]; // array of geometry ids found within this geometry
  appearsIn?: string[]; // array of geometry ids where this appears
  relatedBy?: GeometryRelations;
  images?: GeometryImages;
  mathProperties?: GeometryMathProperties;
  featured?: boolean;
  order?: number; // Order/sequence number for display
}

/**
 * Complete catalog of sacred geometries and their relationships
 */
export const GEOMETRIES: Record<string, Geometry> = {
  // ============================================================================
  // PLATONIC SOLIDS
  // ============================================================================

  tetrahedron: {
    id: "tetrahedron",
    name: "Tetrahedron",
    slug: "tetrahedron",
    category: "platonic",
    title: "The Tetrahedron: Gateway of Fire",
    description:
      "The tetrahedron is the first Platonic Solid, the simplest three-dimensional form that can exist. It represents fire, transformation, and the spark of creation.",
    dual: "tetrahedron", // Self-dual
    dualOfTitle: "Self-dual (Tetrahedron)",
    appearsIn: ["metatrons-cube", "star-tetrahedron"],
    relatedBy: {
      element: "fire",
      property: [
        "4 faces",
        "4 vertices",
        "6 edges",
        "self-dual",
        "simplest polyhedron",
      ],
    },
    images: {
      heroImage:
        "/images/geometries/platonic-solids/tetrahedron/tetrahedron-3d.svg",
      solidImage:
        "/images/geometries/platonic-solids/tetrahedron/tetrahedron-solid.svg",
      wireframeImage:
        "/images/geometries/platonic-solids/tetrahedron/tetrahedron-wireframe.svg",
      netImage:
        "/images/geometries/platonic-solids/tetrahedron/tetrahedron-net.svg",
    },
    mathProperties: {
      faces: 4,
      faceShape: "Triangular",
      vertices: 4,
      edges: 6,
    },
    featured: true,
    order: 1,
  },

  hexahedron: {
    id: "hexahedron",
    name: "Hexahedron (Cube)",
    slug: "hexahedron",
    category: "platonic",
    title: "The Hexahedron (Cube): Foundation of Earth",
    description:
      "The hexahedron, commonly known as the cube, represents the element of Earth—stability, structure, and the material world. It is the most grounded of all Platonic Solids.",
    dual: "octahedron",
    dualOfTitle: "Octahedron",
    appearsIn: ["metatrons-cube"],
    relatedBy: {
      element: "earth",
      property: [
        "6 faces",
        "8 vertices",
        "12 edges",
        "stability",
        "foundation",
      ],
    },
    images: {
      heroImage:
        "/images/geometries/platonic-solids/hexahedron/hexahedron-3d.svg",
      solidImage:
        "/images/geometries/platonic-solids/hexahedron/hexahedron-solid.svg",
      wireframeImage:
        "/images/geometries/platonic-solids/hexahedron/hexahedron-wireframe.svg",
      netImage:
        "/images/geometries/platonic-solids/hexahedron/hexahedron-net.svg",
    },
    mathProperties: {
      faces: 6,
      faceShape: "Square",
      vertices: 8,
      edges: 12,
    },
    featured: true,
    order: 2,
  },

  octahedron: {
    id: "octahedron",
    name: "Octahedron",
    slug: "octahedron",
    category: "platonic",
    title: "The Octahedron: Breath of Air",
    description:
      "The octahedron embodies the element of Air—intellect, communication, and the breath of life. It represents perfect balance between the material and the ethereal.",
    dual: "hexahedron",
    dualOfTitle: "Cube (Hexahedron)",
    appearsIn: ["metatrons-cube"],
    relatedBy: {
      element: "air",
      property: ["8 faces", "6 vertices", "12 edges", "balance", "integration"],
    },
    images: {
      heroImage:
        "/images/geometries/platonic-solids/octahedron/octahedron-3d.svg",
      solidImage:
        "/images/geometries/platonic-solids/octahedron/octahedron-solid.svg",
      wireframeImage:
        "/images/geometries/platonic-solids/octahedron/octahedron-primary.svg",
      netImage:
        "/images/geometries/platonic-solids/octahedron/octahedron-net.svg",
    },
    mathProperties: {
      faces: 8,
      faceShape: "Triangular",
      vertices: 6,
      edges: 12,
    },
    featured: true,
    order: 3,
  },

  dodecahedron: {
    id: "dodecahedron",
    name: "Dodecahedron",
    slug: "dodecahedron",
    category: "platonic",
    title: "The Dodecahedron: Gateway to Spirit",
    description:
      "The dodecahedron represents Ether—the fifth element beyond the physical four. It is the shape of the cosmos itself, embodying the universe and higher consciousness.",
    dual: "icosahedron",
    dualOfTitle: "Icosahedron",
    appearsIn: ["metatrons-cube"],
    relatedBy: {
      element: "ether",
      property: [
        "12 faces",
        "20 vertices",
        "30 edges",
        "universe",
        "consciousness",
        "prana",
      ],
    },
    images: {
      heroImage:
        "/images/geometries/platonic-solids/dodecahedron/dodecahedron-3d.svg",
      solidImage:
        "/images/geometries/platonic-solids/dodecahedron/dodecahedron-primary.svg",
      wireframeImage:
        "/images/geometries/platonic-solids/dodecahedron/dodecahedron-wireframe.svg",
      netImage:
        "/images/geometries/platonic-solids/dodecahedron/dodecahedron-net.svg",
    },
    mathProperties: {
      faces: 12,
      faceShape: "Pentagonal",
      vertices: 20,
      edges: 30,
    },
    featured: true,
    order: 4,
  },

  icosahedron: {
    id: "icosahedron",
    name: "Icosahedron",
    slug: "icosahedron",
    category: "platonic",
    title: "The Icosahedron: Flow of Water",
    description:
      "The icosahedron embodies the element of Water—emotion, fluidity, and adaptability. It is the shape of flow and transformation, rolling smoothly like water itself.",
    dual: "dodecahedron",
    dualOfTitle: "Dodecahedron",
    appearsIn: ["metatrons-cube"],
    relatedBy: {
      element: "water",
      property: [
        "20 faces",
        "12 vertices",
        "30 edges",
        "flow",
        "transformation",
      ],
    },
    images: {
      heroImage:
        "/images/geometries/platonic-solids/icosahedron/icosahedron-3d.svg",
      solidImage:
        "/images/geometries/platonic-solids/icosahedron/icosahedron-solid.svg",
      wireframeImage:
        "/images/geometries/platonic-solids/icosahedron/icosahedron-wireframe.svg",
      netImage:
        "/images/geometries/platonic-solids/icosahedron/icosahedron-net.svg",
    },
    mathProperties: {
      faces: 20,
      faceShape: "Triangular",
      vertices: 12,
      edges: 30,
    },
    featured: true,
    order: 5,
  },

  // ============================================================================
  // SACRED PATTERNS
  // ============================================================================

  "circle-dot": {
    id: "circle-dot",
    name: "Circle Dot",
    slug: "circle-dot",
    category: "pattern",
    title: "Circle Dot",
    description:
      "The primordial symbol of unity and creation, representing the divine spark and the beginning of all form",
    relatedBy: {
      property: [
        "unity",
        "creation point",
        "divine spark",
        "zero point",
        "source",
        "monad",
        "bindu",
        "cosmic egg",
      ],
    },
    images: {
      heroImage:
        "/images/geometries/sacred-patterns/circle-dot/circle-dot-primary.svg",
    },
    featured: true,
    order: 1,
  },

  "flower-of-life": {
    id: "flower-of-life",
    name: "Flower of Life",
    slug: "flower-of-life",
    category: "pattern",
    title: "Flower of Life",
    description:
      "Ancient symbol of creation consisting of overlapping circles representing the fundamental forms of space and time",
    contains: ["seed-of-life", "vesica-piscis", "tree-of-life"],
    relatedBy: {
      property: [
        "19 circles",
        "creation",
        "unity",
        "infinite",
        "sacred blueprint",
      ],
    },
    images: {
      heroImage:
        "/images/geometries/sacred-patterns/flower-of-life/flower-of-life-primary.svg",
    },
    featured: true,
    order: 5,
  },

  "seed-of-life": {
    id: "seed-of-life",
    name: "Seed of Life",
    slug: "seed-of-life",
    category: "pattern",
    title: "Seed of Life",
    description:
      "Seven circles in perfect symmetry, representing the seven days of creation",
    appearsIn: ["flower-of-life"],
    contains: ["vesica-piscis"],
    relatedBy: {
      property: [
        "7 circles",
        "creation",
        "genesis",
        "foundation",
        "divine feminine",
      ],
    },
    images: {
      heroImage:
        "/images/geometries/sacred-patterns/seed-of-life/seed-of-life-primary.svg",
    },
    featured: true,
    order: 3,
  },

  "metatrons-cube": {
    id: "metatrons-cube",
    name: "Metatron's Cube",
    slug: "metatrons-cube",
    category: "pattern",
    title: "Metatron's Cube",
    description:
      "Contains all five Platonic Solids and represents the geometric pattern of the universe",
    contains: [
      "tetrahedron",
      "hexahedron",
      "octahedron",
      "dodecahedron",
      "icosahedron",
    ],
    appearsIn: ["flower-of-life", "fruit-of-life"],
    relatedBy: {
      property: [
        "13 circles",
        "all platonic solids",
        "universal pattern",
        "archangel metatron",
        "sacred geometry map",
      ],
    },
    images: {
      heroImage:
        "/images/geometries/sacred-patterns/metatrons-cube/metatrons-cube-primary.svg",
    },
    featured: true,
    order: 6,
  },

  "sri-yantra": {
    id: "sri-yantra",
    name: "Sri Yantra",
    slug: "sri-yantra",
    category: "pattern",
    title: "Sri Yantra",
    description:
      "Sacred Hindu geometry representing the union of divine masculine and feminine energies",
    contains: ["triangle"],
    relatedBy: {
      property: [
        "9 interlocking triangles",
        "shiva-shakti",
        "cosmic union",
        "tantric",
        "creation and manifestation",
      ],
    },
    images: {
      heroImage:
        "/images/geometries/sacred-patterns/sri-yantra/sri-yantra-primary.svg",
    },
    featured: true,
    order: 7,
  },

  "star-tetrahedron": {
    id: "star-tetrahedron",
    name: "Star Tetrahedron",
    slug: "star-tetrahedron",
    category: "pattern",
    title: "Star Tetrahedron",
    description:
      "Two interlocking tetrahedrons forming a three-dimensional Star of David, representing the union of spirit and matter",
    aliases: ["Merkaba", "Merkavah", "Light Body"],
    contains: ["tetrahedron"],
    relatedBy: {
      property: [
        "3D star of david",
        "masculine-feminine balance",
        "8 points",
        "dimensional gateway",
        "light body",
        "vehicle of ascension",
        "spirit-matter union",
        "counter-rotating fields",
      ],
    },
    images: {
      heroImage:
        "/images/geometries/sacred-patterns/star-tetrahedron/star-tetrahedron-primary.svg",
    },
    featured: true,
    order: 8,
  },

  "golden-ratio": {
    id: "golden-ratio",
    name: "Golden Ratio",
    slug: "golden-ratio",
    category: "pattern",
    title: "Golden Ratio",
    description:
      "Divine proportion (φ ≈ 1.618) that appears throughout nature and sacred architecture",
    appearsIn: ["fibonacci-spiral", "pentagram", "dodecahedron"],
    relatedBy: {
      property: [
        "phi φ ≈ 1.618",
        "divine proportion",
        "fibonacci",
        "natural growth",
        "harmony",
        "beauty",
      ],
    },
    images: {
      heroImage:
        "/images/geometries/sacred-patterns/golden-ratio/golden-ratio-spiral.svg",
    },
    featured: true,
    order: 9,
  },

  "vesica-piscis": {
    id: "vesica-piscis",
    name: "Vesica Piscis",
    slug: "vesica-piscis",
    category: "pattern",
    title: "Vesica Piscis",
    description:
      "The intersection of two circles, representing duality and the portal of creation",
    appearsIn: ["seed-of-life", "flower-of-life"],
    relatedBy: {
      property: [
        "2 circles",
        "intersection",
        "duality",
        "creation portal",
        "divine feminine",
        "sacred geometry foundation",
        "vesica",
        "almond shape",
      ],
    },
    images: {
      heroImage:
        "/images/geometries/sacred-patterns/vesica-piscis/vesica-piscis-primary.svg",
    },
    featured: true,
    order: 2,
  },

  "fruit-of-life": {
    id: "fruit-of-life",
    name: "Fruit of Life",
    slug: "fruit-of-life",
    category: "pattern",
    title: "Fruit of Life",
    description:
      "Thirteen circles extracted from the Flower of Life, representing the blueprint of the universe",
    appearsIn: ["flower-of-life"],
    contains: ["metatrons-cube"],
    relatedBy: {
      property: [
        "13 circles",
        "cosmic blueprint",
        "metatron's cube foundation",
        "universe structure",
        "sacred grid",
        "dimensional keys",
      ],
    },
    images: {
      heroImage:
        "/images/geometries/sacred-patterns/fruit-of-life/fruit-of-life-primary.svg",
    },
    featured: true,
    order: 4,
  },

  "philosophers-stone": {
    id: "philosophers-stone",
    name: "Philosopher's Stone",
    slug: "philosophers-stone",
    category: "pattern",
    title: "Philosopher's Stone",
    description:
      "Ancient alchemical symbol representing spiritual transformation and the union of opposites",
    relatedBy: {
      property: [
        "alchemy",
        "transformation",
        "union of opposites",
        "spiritual transmutation",
        "squared circle",
        "matter and spirit",
        "magnum opus",
      ],
    },
    images: {
      heroImage:
        "/images/geometries/sacred-patterns/philosophers-stone/philosophers-stone-primary.svg",
    },
    featured: true,
    order: 10,
  },

  // ============================================================================
  // ADDITIONAL GEOMETRIES (for completeness of relationships)
  // ============================================================================

  triangle: {
    id: "triangle",
    name: "Triangle",
    slug: "triangle",
    category: "pattern",
    description: "The fundamental polygon, representing trinity and stability",
    appearsIn: [
      "tetrahedron",
      "octahedron",
      "icosahedron",
      "sri-yantra",
      "star-tetrahedron",
    ],
    relatedBy: {
      property: [
        "3 sides",
        "trinity",
        "stability",
        "fundamental shape",
        "divine masculine/feminine",
      ],
    },
  },

  "tree-of-life": {
    id: "tree-of-life",
    name: "Tree of Life",
    slug: "tree-of-life",
    category: "pattern",
    description:
      "Kabbalistic diagram representing the path of spiritual ascent",
    appearsIn: ["flower-of-life"],
    relatedBy: {
      property: [
        "10 sephiroth",
        "22 paths",
        "kabbalah",
        "spiritual ascent",
        "divine emanations",
      ],
    },
  },

  pentagram: {
    id: "pentagram",
    name: "Pentagram",
    slug: "pentagram",
    category: "pattern",
    title: "Pentagram",
    description: "Five-pointed star embodying the golden ratio and representing the human form",
    contains: ["golden-ratio"],
    relatedBy: {
      property: [
        "5 points",
        "golden ratio",
        "microcosm",
        "human form",
        "protection",
        "pentacle",
        "phi ratio",
      ],
    },
    images: {
      heroImage:
        "/images/geometries/sacred-patterns/pentagram/pentagram-primary.svg",
    },
    featured: true,
    order: 11,
  },

  "fibonacci-spiral": {
    id: "fibonacci-spiral",
    name: "Fibonacci Spiral",
    slug: "fibonacci-spiral",
    category: "pattern",
    description: "Logarithmic spiral based on the Fibonacci sequence",
    contains: ["golden-ratio"],
    relatedBy: {
      property: [
        "fibonacci sequence",
        "golden ratio",
        "natural growth",
        "phi spiral",
        "expansion",
      ],
    },
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get a geometry by its ID
 */
export function getGeometryById(id: string): Geometry | undefined {
  return GEOMETRIES[id];
}

/**
 * Get a geometry by its slug
 * This is useful for dynamic routing where the slug is used in the URL
 * e.g., /platonic-solids/tetrahedron or /sacred-patterns/flower-of-life
 */
export function getGeometryBySlug(slug: string): Geometry | undefined {
  return Object.values(GEOMETRIES).find((g) => g.slug === slug);
}

/**
 * Get all geometries in a specific category
 */
export function getGeometriesByCategory(
  category: GeometryCategory
): Geometry[] {
  return Object.values(GEOMETRIES).filter((g) => g.category === category);
}

/**
 * Get the dual of a geometry (Platonic solids only)
 */
export function getDual(geometryId: string): Geometry | undefined {
  const geometry = GEOMETRIES[geometryId];
  if (!geometry?.dual) return undefined;
  return GEOMETRIES[geometry.dual];
}

/**
 * Get all geometries that this geometry contains
 */
export function getContainedGeometries(geometryId: string): Geometry[] {
  const geometry = GEOMETRIES[geometryId];
  if (!geometry?.contains) return [];
  return geometry.contains
    .map((id) => GEOMETRIES[id])
    .filter((g): g is Geometry => g !== undefined);
}

/**
 * Get all geometries where this geometry appears
 */
export function getAppearsInGeometries(geometryId: string): Geometry[] {
  const geometry = GEOMETRIES[geometryId];
  if (!geometry?.appearsIn) return [];
  return geometry.appearsIn
    .map((id) => GEOMETRIES[id])
    .filter((g): g is Geometry => g !== undefined);
}

/**
 * Get all related geometries (contains + appears in + dual)
 */
export function getRelatedGeometries(geometryId: string): {
  dual?: Geometry;
  contains: Geometry[];
  appearsIn: Geometry[];
} {
  return {
    dual: getDual(geometryId),
    contains: getContainedGeometries(geometryId),
    appearsIn: getAppearsInGeometries(geometryId),
  };
}

/**
 * Get all geometries associated with a specific element
 */
export function getGeometriesByElement(
  element: GeometryRelations["element"]
): Geometry[] {
  return Object.values(GEOMETRIES).filter(
    (g) => g.relatedBy?.element === element
  );
}

/**
 * Get all Platonic Solids
 */
export function getPlatonicSolids(): Geometry[] {
  return getGeometriesByCategory("platonic");
}

/**
 * Get all Sacred Patterns
 */
export function getSacredPatterns(): Geometry[] {
  return getGeometriesByCategory("pattern");
}

/**
 * Get all geometries as an array
 */
export function getAllGeometries(): Geometry[] {
  return Object.values(GEOMETRIES);
}

/**
 * Search geometries by name, aliases, description, or property
 */
export function searchGeometries(query: string): Geometry[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(GEOMETRIES).filter(
    (g) =>
      g.name.toLowerCase().includes(lowerQuery) ||
      (g.aliases?.some((alias) =>
        alias.toLowerCase().includes(lowerQuery)
      ) ?? false) ||
      (g.description?.toLowerCase().includes(lowerQuery) ?? false) ||
      (g.relatedBy?.property?.some((p) =>
        p.toLowerCase().includes(lowerQuery)
      ) ??
        false)
  );
}

/**
 * Get the URL path for a geometry based on its category
 */
export function getGeometryPath(geometry: Geometry): string {
  if (geometry.category === "platonic") {
    return `/platonic-solids/${geometry.slug}`;
  } else if (geometry.category === "pattern") {
    return `/sacred-patterns/${geometry.slug}`;
  }
  return "/";
}

/**
 * Get the URL path for a category's list page
 */
export function getGeometryListPath(category: GeometryCategory): string {
  if (category === "platonic") return "/platonic-solids";
  if (category === "pattern") return "/sacred-patterns";
  return "/";
}

/**
 * Get the next geometry in sequence within a category (by order field)
 */
export function getNextGeometry(
  currentId: string,
  category: GeometryCategory
): Geometry | undefined {
  const geometries = getGeometriesByCategory(category)
    .filter((g) => g.order !== undefined)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const currentIndex = geometries.findIndex((g) => g.id === currentId);
  return currentIndex >= 0 && currentIndex < geometries.length - 1
    ? geometries[currentIndex + 1]
    : undefined;
}

/**
 * Get the previous geometry in sequence within a category (by order field)
 */
export function getPreviousGeometry(
  currentId: string,
  category: GeometryCategory
): Geometry | undefined {
  const geometries = getGeometriesByCategory(category)
    .filter((g) => g.order !== undefined)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const currentIndex = geometries.findIndex((g) => g.id === currentId);
  return currentIndex > 0 ? geometries[currentIndex - 1] : undefined;
}
