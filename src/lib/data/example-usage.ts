/**
 * Example usage of the Geometry Data Model
 *
 * This file demonstrates how to use the various helper functions
 * to query and navigate sacred geometry relationships.
 */

import {
  getGeometry,
  getPlatonicSolids,
  getDual,
  getRelatedGeometries,
  getGeometriesByElement,
  searchGeometries,
} from "./geometries";

// ============================================================================
// Basic Queries
// ============================================================================

// Get a specific geometry
const tetrahedron = getGeometry("tetrahedron");
console.log("Tetrahedron:", tetrahedron);

// Get all Platonic Solids
const platonicSolids = getPlatonicSolids();
console.log("Platonic Solids:", platonicSolids.map((g) => g.name));

// ============================================================================
// Duality Relationships
// ============================================================================

// Get the dual of a Platonic solid
const cubeDual = getDual("hexahedron");
console.log("Dual of Cube:", cubeDual?.name); // "Octahedron"

// Tetrahedron is self-dual
const tetrahedronDual = getDual("tetrahedron");
console.log("Dual of Tetrahedron:", tetrahedronDual?.name); // "Tetrahedron"

// ============================================================================
// Containment Relationships
// ============================================================================

// Get all geometries contained in Metatron's Cube
const metatronsRelations = getRelatedGeometries("metatrons-cube");
console.log(
  "Metatron's Cube contains:",
  metatronsRelations.contains.map((g) => g.name)
);
// ["Tetrahedron", "Hexahedron (Cube)", "Octahedron", "Dodecahedron", "Icosahedron"]

// Get all geometries where Tetrahedron appears
console.log(
  "Tetrahedron appears in:",
  metatronsRelations.appearsIn.map((g) => g.name)
);

// ============================================================================
// Element Associations
// ============================================================================

// Get all geometries associated with fire
const fireGeometries = getGeometriesByElement("fire");
console.log("Fire geometries:", fireGeometries.map((g) => g.name));

// Get all element associations for Platonic solids
const elementMap = platonicSolids.reduce(
  (acc, solid) => {
    if (solid.relatedBy?.element) {
      acc[solid.name] = solid.relatedBy.element;
    }
    return acc;
  },
  {} as Record<string, string>
);
console.log("Element associations:", elementMap);

// ============================================================================
// Search Functionality
// ============================================================================

// Search for geometries related to creation
const creationGeometries = searchGeometries("creation");
console.log("Creation-related:", creationGeometries.map((g) => g.name));

// Search for geometries with "circles" in properties
const circleGeometries = searchGeometries("circles");
console.log("Circle-based:", circleGeometries.map((g) => g.name));

// ============================================================================
// Building a Relationship Graph
// ============================================================================

function buildRelationshipGraph(geometryId: string): Record<string, unknown> {
  const geometry = getGeometry(geometryId);
  if (!geometry) return {};

  const relations = getRelatedGeometries(geometryId);

  return {
    name: geometry.name,
    category: geometry.category,
    element: geometry.relatedBy?.element,
    dual: relations.dual?.name,
    contains: relations.contains.map((g) => g.name),
    appearsIn: relations.appearsIn.map((g) => g.name),
    properties: geometry.relatedBy?.property,
  };
}

// Example: Build graph for Merkaba
const merkabaGraph = buildRelationshipGraph("merkaba");
console.log("Merkaba relationship graph:", merkabaGraph);

// ============================================================================
// Finding Connections Between Geometries
// ============================================================================

function findConnections(
  geometry1Id: string,
  geometry2Id: string
): string[] {
  const connections: string[] = [];

  const g1 = getGeometry(geometry1Id);
  const g2 = getGeometry(geometry2Id);

  if (!g1 || !g2) return connections;

  // Check if g1 contains g2
  if (g1.contains?.includes(geometry2Id)) {
    connections.push(`${g1.name} contains ${g2.name}`);
  }

  // Check if g2 contains g1
  if (g2.contains?.includes(geometry1Id)) {
    connections.push(`${g2.name} contains ${g1.name}`);
  }

  // Check if g1 appears in g2
  if (g1.appearsIn?.includes(geometry2Id)) {
    connections.push(`${g1.name} appears in ${g2.name}`);
  }

  // Check if g2 appears in g1
  if (g2.appearsIn?.includes(geometry1Id)) {
    connections.push(`${g2.name} appears in ${g1.name}`);
  }

  // Check if they are duals
  if (g1.dual === geometry2Id) {
    connections.push(`${g1.name} and ${g2.name} are duals`);
  }

  return connections;
}

// Example: Find connections between Tetrahedron and Merkaba
const connections = findConnections("tetrahedron", "merkaba");
console.log("Connections:", connections);
