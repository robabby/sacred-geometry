/**
 * Example usage of the Geometry Data Model
 *
 * This file demonstrates how to use the various helper functions
 * to query and navigate sacred geometry relationships.
 */

import {
  getGeometryById,
  getGeometryBySlug,
  getPlatonicSolids,
  getDual,
  getRelatedGeometries,
  getGeometriesByElement,
  searchGeometries,
} from "./geometries";

// ============================================================================
// Basic Queries
// ============================================================================

// Get a specific geometry by ID
const tetrahedron = getGeometryById("tetrahedron");
console.log("Tetrahedron:", tetrahedron);

// Get a geometry by slug (useful for dynamic routes)
const flowerOfLife = getGeometryBySlug("flower-of-life");
console.log("Flower of Life:", flowerOfLife);

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
  const geometry = getGeometryById(geometryId);
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

  const g1 = getGeometryById(geometry1Id);
  const g2 = getGeometryById(geometry2Id);

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

// ============================================================================
// Dynamic Route Example (Next.js App Router)
// ============================================================================

/**
 * Example: Dynamic page component for geometry details
 * File: app/platonic-solids/[slug]/page.tsx or app/sacred-patterns/[slug]/page.tsx
 *
 * This demonstrates how to use getGeometryBySlug in a Next.js dynamic route
 */

interface GeometryPageProps {
  params: {
    slug: string;
  };
}

function GeometryPage({ params }: GeometryPageProps) {
  const geometry = getGeometryBySlug(params.slug);

  if (!geometry) {
    return <div>Geometry not found</div>;
  }

  const { dual, contains, appearsIn } = getRelatedGeometries(geometry.id);

  return (
    <div>
      <h1>{geometry.name}</h1>
      <p>{geometry.description}</p>

      {geometry.relatedBy?.element && (
        <div>Element: {geometry.relatedBy.element}</div>
      )}

      {dual && (
        <section>
          <h2>Dual Geometry</h2>
          <p>{dual.name}</p>
        </section>
      )}

      {contains.length > 0 && (
        <section>
          <h2>Contains</h2>
          <ul>
            {contains.map((g) => (
              <li key={g.id}>{g.name}</li>
            ))}
          </ul>
        </section>
      )}

      {appearsIn.length > 0 && (
        <section>
          <h2>Appears In</h2>
          <ul>
            {appearsIn.map((g) => (
              <li key={g.id}>{g.name}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

// Example usage
console.log("Example page for tetrahedron:", GeometryPage({ params: { slug: "tetrahedron" } }));
