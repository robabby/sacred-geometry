/**
 * Geometry Data Model and Catalog
 *
 * This module defines the data structure for sacred geometry relationships
 * and provides helper functions for querying and navigating these connections.
 */

export type GeometryCategory = 'platonic' | 'pattern' | 'compound';

export interface GeometryRelations {
  element?: 'fire' | 'earth' | 'air' | 'water' | 'ether';
  chakra?: string;
  property?: string[];
}

export interface Geometry {
  id: string;
  name: string;
  slug: string;
  category: GeometryCategory;
  description?: string;
  dual?: string; // geometry id
  contains?: string[]; // array of geometry ids found within this geometry
  appearsIn?: string[]; // array of geometry ids where this appears
  relatedBy?: GeometryRelations;
}

/**
 * Complete catalog of sacred geometries and their relationships
 */
export const GEOMETRIES: Record<string, Geometry> = {
  // ============================================================================
  // PLATONIC SOLIDS
  // ============================================================================

  tetrahedron: {
    id: 'tetrahedron',
    name: 'Tetrahedron',
    slug: 'tetrahedron',
    category: 'platonic',
    description: 'The simplest Platonic solid, symbolizing fire and balance.',
    dual: 'tetrahedron', // Self-dual
    appearsIn: ['metatrons-cube', 'merkaba', 'star-tetrahedron'],
    relatedBy: {
      element: 'fire',
      property: ['4 faces', '4 vertices', '6 edges', 'self-dual', 'simplest polyhedron']
    }
  },

  hexahedron: {
    id: 'hexahedron',
    name: 'Hexahedron (Cube)',
    slug: 'hexahedron',
    category: 'platonic',
    description: 'Represents earth, stability, and groundedness.',
    dual: 'octahedron',
    appearsIn: ['metatrons-cube'],
    relatedBy: {
      element: 'earth',
      property: ['6 faces', '8 vertices', '12 edges', 'stability', 'foundation']
    }
  },

  octahedron: {
    id: 'octahedron',
    name: 'Octahedron',
    slug: 'octahedron',
    category: 'platonic',
    description: 'Symbolizes air, intellect, and communication.',
    dual: 'hexahedron',
    appearsIn: ['metatrons-cube'],
    relatedBy: {
      element: 'air',
      property: ['8 faces', '6 vertices', '12 edges', 'balance', 'integration']
    }
  },

  dodecahedron: {
    id: 'dodecahedron',
    name: 'Dodecahedron',
    slug: 'dodecahedron',
    category: 'platonic',
    description: 'Associated with the universe, spirit, and higher consciousness.',
    dual: 'icosahedron',
    appearsIn: ['metatrons-cube'],
    relatedBy: {
      element: 'ether',
      property: ['12 faces', '20 vertices', '30 edges', 'universe', 'consciousness', 'prana']
    }
  },

  icosahedron: {
    id: 'icosahedron',
    name: 'Icosahedron',
    slug: 'icosahedron',
    category: 'platonic',
    description: 'Represents water, emotion, and fluidity.',
    dual: 'dodecahedron',
    appearsIn: ['metatrons-cube'],
    relatedBy: {
      element: 'water',
      property: ['20 faces', '12 vertices', '30 edges', 'flow', 'transformation']
    }
  },

  // ============================================================================
  // SACRED PATTERNS
  // ============================================================================

  'flower-of-life': {
    id: 'flower-of-life',
    name: 'Flower of Life',
    slug: 'flower-of-life',
    category: 'pattern',
    description: 'Ancient symbol of creation consisting of overlapping circles representing the fundamental forms of space and time',
    contains: ['seed-of-life', 'vesica-piscis', 'tree-of-life'],
    relatedBy: {
      property: ['19 circles', 'creation', 'unity', 'infinite', 'sacred blueprint']
    }
  },

  'seed-of-life': {
    id: 'seed-of-life',
    name: 'Seed of Life',
    slug: 'seed-of-life',
    category: 'pattern',
    description: 'Seven circles in perfect symmetry, representing the seven days of creation',
    appearsIn: ['flower-of-life'],
    contains: ['vesica-piscis'],
    relatedBy: {
      property: ['7 circles', 'creation', 'genesis', 'foundation', 'divine feminine']
    }
  },

  'metatrons-cube': {
    id: 'metatrons-cube',
    name: "Metatron's Cube",
    slug: 'metatrons-cube',
    category: 'pattern',
    description: "Contains all five Platonic Solids and represents the geometric pattern of the universe",
    contains: ['tetrahedron', 'hexahedron', 'octahedron', 'dodecahedron', 'icosahedron'],
    appearsIn: ['flower-of-life'],
    relatedBy: {
      property: ['13 circles', 'all platonic solids', 'universal pattern', 'archangel metatron', 'sacred geometry map']
    }
  },

  'sri-yantra': {
    id: 'sri-yantra',
    name: 'Sri Yantra',
    slug: 'sri-yantra',
    category: 'pattern',
    description: 'Sacred Hindu geometry representing the union of divine masculine and feminine energies',
    contains: ['triangle'],
    relatedBy: {
      property: ['9 interlocking triangles', 'shiva-shakti', 'cosmic union', 'tantric', 'creation and manifestation']
    }
  },

  merkaba: {
    id: 'merkaba',
    name: 'Merkaba',
    slug: 'merkaba',
    category: 'compound',
    description: 'Sacred light vehicle, two interlocking tetrahedrons representing spirit and matter',
    contains: ['tetrahedron', 'star-tetrahedron'],
    relatedBy: {
      property: ['light body', 'vehicle of ascension', 'spirit-matter union', 'divine light vehicle', 'counter-rotating fields']
    }
  },

  'golden-ratio': {
    id: 'golden-ratio',
    name: 'Golden Ratio',
    slug: 'golden-ratio',
    category: 'pattern',
    description: 'Divine proportion (φ ≈ 1.618) that appears throughout nature and sacred architecture',
    appearsIn: ['fibonacci-spiral', 'pentagram', 'dodecahedron'],
    relatedBy: {
      property: ['phi φ ≈ 1.618', 'divine proportion', 'fibonacci', 'natural growth', 'harmony', 'beauty']
    }
  },

  // ============================================================================
  // ADDITIONAL GEOMETRIES (for completeness of relationships)
  // ============================================================================

  'vesica-piscis': {
    id: 'vesica-piscis',
    name: 'Vesica Piscis',
    slug: 'vesica-piscis',
    category: 'pattern',
    description: 'The intersection of two circles, representing duality and creation',
    appearsIn: ['seed-of-life', 'flower-of-life'],
    relatedBy: {
      property: ['intersection', 'duality', 'creation portal', 'divine feminine', 'sacred geometry foundation']
    }
  },

  'star-tetrahedron': {
    id: 'star-tetrahedron',
    name: 'Star Tetrahedron',
    slug: 'star-tetrahedron',
    category: 'compound',
    description: 'Two interlocking tetrahedrons forming a three-dimensional Star of David',
    contains: ['tetrahedron'],
    appearsIn: ['merkaba'],
    relatedBy: {
      property: ['3D star of david', 'masculine-feminine balance', '8 points', 'dimensional gateway']
    }
  },

  triangle: {
    id: 'triangle',
    name: 'Triangle',
    slug: 'triangle',
    category: 'pattern',
    description: 'The fundamental polygon, representing trinity and stability',
    appearsIn: ['tetrahedron', 'octahedron', 'icosahedron', 'sri-yantra', 'merkaba'],
    relatedBy: {
      property: ['3 sides', 'trinity', 'stability', 'fundamental shape', 'divine masculine/feminine']
    }
  },

  'tree-of-life': {
    id: 'tree-of-life',
    name: 'Tree of Life',
    slug: 'tree-of-life',
    category: 'pattern',
    description: 'Kabbalistic diagram representing the path of spiritual ascent',
    appearsIn: ['flower-of-life'],
    relatedBy: {
      property: ['10 sephiroth', '22 paths', 'kabbalah', 'spiritual ascent', 'divine emanations']
    }
  },

  pentagram: {
    id: 'pentagram',
    name: 'Pentagram',
    slug: 'pentagram',
    category: 'pattern',
    description: 'Five-pointed star embodying the golden ratio',
    contains: ['golden-ratio'],
    relatedBy: {
      property: ['5 points', 'golden ratio', 'microcosm', 'human form', 'protection']
    }
  },

  'fibonacci-spiral': {
    id: 'fibonacci-spiral',
    name: 'Fibonacci Spiral',
    slug: 'fibonacci-spiral',
    category: 'pattern',
    description: 'Logarithmic spiral based on the Fibonacci sequence',
    contains: ['golden-ratio'],
    relatedBy: {
      property: ['fibonacci sequence', 'golden ratio', 'natural growth', 'phi spiral', 'expansion']
    }
  }
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
 * Get all geometries in a specific category
 */
export function getGeometriesByCategory(category: GeometryCategory): Geometry[] {
  return Object.values(GEOMETRIES).filter(g => g.category === category);
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
    .map(id => GEOMETRIES[id])
    .filter((g): g is Geometry => g !== undefined);
}

/**
 * Get all geometries where this geometry appears
 */
export function getAppearsInGeometries(geometryId: string): Geometry[] {
  const geometry = GEOMETRIES[geometryId];
  if (!geometry?.appearsIn) return [];
  return geometry.appearsIn
    .map(id => GEOMETRIES[id])
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
export function getGeometriesByElement(element: GeometryRelations['element']): Geometry[] {
  return Object.values(GEOMETRIES).filter(
    g => g.relatedBy?.element === element
  );
}

/**
 * Get all Platonic Solids
 */
export function getPlatonicSolids(): Geometry[] {
  return getGeometriesByCategory('platonic');
}

/**
 * Get all Sacred Patterns
 */
export function getSacredPatterns(): Geometry[] {
  return getGeometriesByCategory('pattern');
}

/**
 * Get all geometries as an array
 */
export function getAllGeometries(): Geometry[] {
  return Object.values(GEOMETRIES);
}

/**
 * Search geometries by name or property
 */
export function searchGeometries(query: string): Geometry[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(GEOMETRIES).filter(
    g =>
      g.name.toLowerCase().includes(lowerQuery) ||
      (g.description?.toLowerCase().includes(lowerQuery) ?? false) ||
      (g.relatedBy?.property?.some(p => p.toLowerCase().includes(lowerQuery)) ?? false)
  );
}
