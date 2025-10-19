/**
 * Helper Functions and Data Enhancement
 *
 * Query utilities and relationship enhancement logic for geometries
 */

import type {
  Geometry,
  GeometryCategory,
  GeometryRelations,
} from "./geometries.types";
import { CONTAINS_GRAPH, DUAL_GRAPH } from "./relationships";

/**
 * Enhance geometries with computed relationships
 *
 * This function:
 * 1. Adds `contains` relationships from CONTAINS_GRAPH
 * 2. Adds `dual` relationships from DUAL_GRAPH
 * 3. Auto-computes `appearsIn` as the inverse of `contains`
 */
export function enhanceGeometries(
  geometries: Record<string, Geometry>
): Record<string, Geometry> {
  const enhanced: Record<string, Geometry> = {};

  // First pass: copy all geometries and add contains/dual from graphs
  Object.entries(geometries).forEach(([id, geom]) => {
    enhanced[id] = {
      ...geom,
      contains: CONTAINS_GRAPH[id] ?? geom.contains ?? [],
      dual: DUAL_GRAPH[id] ?? geom.dual,
      appearsIn: [], // Will be computed in next pass
    };
  });

  // Second pass: compute inverse relationships (appearsIn from contains)
  Object.values(enhanced).forEach((geometry) => {
    geometry.contains?.forEach((containedId) => {
      const contained = enhanced[containedId];
      if (contained) {
        contained.appearsIn = contained.appearsIn ?? [];
        if (!contained.appearsIn.includes(geometry.id)) {
          contained.appearsIn.push(geometry.id);
        }
      }
    });
  });

  return enhanced;
}

/**
 * Validate all relationship references
 *
 * Throws an error if any relationship references a non-existent geometry
 */
export function validateGeometries(
  geometries: Record<string, Geometry>
): void {
  const errors: string[] = [];

  Object.values(geometries).forEach((geom) => {
    // Validate contains references
    geom.contains?.forEach((id) => {
      if (!geometries[id]) {
        errors.push(`${geom.id}.contains: Invalid reference to "${id}"`);
      }
    });

    // Validate appearsIn references
    geom.appearsIn?.forEach((id) => {
      if (!geometries[id]) {
        errors.push(`${geom.id}.appearsIn: Invalid reference to "${id}"`);
      }
    });

    // Validate dual reference
    if (geom.dual && !geometries[geom.dual]) {
      errors.push(`${geom.id}.dual: Invalid reference to "${geom.dual}"`);
    }
  });

  if (errors.length > 0) {
    throw new Error(
      `Geometry validation failed:\n${errors.map((e) => `  - ${e}`).join("\n")}`
    );
  }
}

// ============================================================================
// QUERY FUNCTIONS
// ============================================================================

/**
 * Get a geometry by its ID
 */
export function getGeometryById(
  geometries: Record<string, Geometry>,
  id: string
): Geometry | undefined {
  return geometries[id];
}

/**
 * Get a geometry by its slug
 * This is useful for dynamic routing where the slug is used in the URL
 * e.g., /platonic-solids/tetrahedron or /sacred-patterns/flower-of-life
 */
export function getGeometryBySlug(
  geometries: Record<string, Geometry>,
  slug: string
): Geometry | undefined {
  return Object.values(geometries).find((g) => g.slug === slug);
}

/**
 * Get all geometries in a specific category
 */
export function getGeometriesByCategory(
  geometries: Record<string, Geometry>,
  category: GeometryCategory
): Geometry[] {
  return Object.values(geometries)
    .filter((g) => g.category === category)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/**
 * Get the dual of a geometry (Platonic solids only)
 */
export function getDual(
  geometries: Record<string, Geometry>,
  geometryId: string
): Geometry | undefined {
  const geometry = geometries[geometryId];
  if (!geometry?.dual) return undefined;
  return geometries[geometry.dual];
}

/**
 * Get all geometries that this geometry contains
 */
export function getContainedGeometries(
  geometries: Record<string, Geometry>,
  geometryId: string
): Geometry[] {
  const geometry = geometries[geometryId];
  if (!geometry?.contains) return [];
  return geometry.contains
    .map((id) => geometries[id])
    .filter((g): g is Geometry => g !== undefined);
}

/**
 * Get all geometries where this geometry appears
 */
export function getAppearsInGeometries(
  geometries: Record<string, Geometry>,
  geometryId: string
): Geometry[] {
  const geometry = geometries[geometryId];
  if (!geometry?.appearsIn) return [];
  return geometry.appearsIn
    .map((id) => geometries[id])
    .filter((g): g is Geometry => g !== undefined);
}

/**
 * Get all related geometries (contains + appears in + dual)
 */
export function getRelatedGeometries(
  geometries: Record<string, Geometry>,
  geometryId: string
): {
  dual?: Geometry;
  contains: Geometry[];
  appearsIn: Geometry[];
} {
  return {
    dual: getDual(geometries, geometryId),
    contains: getContainedGeometries(geometries, geometryId),
    appearsIn: getAppearsInGeometries(geometries, geometryId),
  };
}

/**
 * Get all geometries associated with a specific element
 */
export function getGeometriesByElement(
  geometries: Record<string, Geometry>,
  element: GeometryRelations["element"]
): Geometry[] {
  return Object.values(geometries).filter(
    (g) => g.relatedBy?.element === element
  );
}

/**
 * Get all Platonic Solids
 */
export function getPlatonicSolids(
  geometries: Record<string, Geometry>
): Geometry[] {
  return getGeometriesByCategory(geometries, "platonic");
}

/**
 * Get all Sacred Patterns
 */
export function getSacredPatterns(
  geometries: Record<string, Geometry>
): Geometry[] {
  return getGeometriesByCategory(geometries, "pattern");
}

/**
 * Get all geometries as an array
 */
export function getAllGeometries(
  geometries: Record<string, Geometry>
): Geometry[] {
  return Object.values(geometries);
}

/**
 * Search geometries by name, aliases, description, or property
 */
export function searchGeometries(
  geometries: Record<string, Geometry>,
  query: string
): Geometry[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(geometries).filter(
    (g) =>
      g.name.toLowerCase().includes(lowerQuery) ||
      (g.aliases?.some((alias) =>
        alias.toLowerCase().includes(lowerQuery)
      ) ??
        false) ||
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
  geometries: Record<string, Geometry>,
  currentId: string,
  category: GeometryCategory
): Geometry | undefined {
  const sortedGeometries = getGeometriesByCategory(geometries, category)
    .filter((g) => g.order !== undefined)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const currentIndex = sortedGeometries.findIndex((g) => g.id === currentId);
  return currentIndex >= 0 && currentIndex < sortedGeometries.length - 1
    ? sortedGeometries[currentIndex + 1]
    : undefined;
}

/**
 * Get the previous geometry in sequence within a category (by order field)
 */
export function getPreviousGeometry(
  geometries: Record<string, Geometry>,
  currentId: string,
  category: GeometryCategory
): Geometry | undefined {
  const sortedGeometries = getGeometriesByCategory(geometries, category)
    .filter((g) => g.order !== undefined)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const currentIndex = sortedGeometries.findIndex((g) => g.id === currentId);
  return currentIndex > 0 ? sortedGeometries[currentIndex - 1] : undefined;
}
