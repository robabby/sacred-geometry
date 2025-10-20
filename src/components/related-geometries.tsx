import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import {
  getGeometryBySlug,
  type RelationshipType,
  type Geometry,
} from "@/lib/data";

interface RelatedGeometriesProps {
  slug: string;
}

// Helper to format relationship type labels
function formatRelationshipLabel(type: RelationshipType): string {
  const labels: Record<RelationshipType, string> = {
    // Structural
    contains: "Contains",
    "appears-in": "Appears In",
    "derived-from": "Derived From",
    "composed-of": "Composed Of",
    dual: "Dual",
    // Transformational
    "transforms-into": "Transforms Into",
    "emerges-from": "Emerges From",
    "unfolds-to": "Unfolds To",
    // Conceptual
    "similar-to": "Similar To",
    complementary: "Complementary",
    "resonates-with": "Resonates With",
    "related-by-element": "Related by Element",
    // Mathematical
    "ratio-related": "Ratio Related",
    proportional: "Proportional",
    "symmetric-with": "Symmetric With",
  };
  return labels[type] ?? type;
}

// Group relationship types by category
function getRelationshipCategory(
  type: RelationshipType
): "Structural" | "Transformational" | "Conceptual" | "Mathematical" {
  const structural: RelationshipType[] = [
    "contains",
    "appears-in",
    "derived-from",
    "composed-of",
    "dual",
  ];
  const transformational: RelationshipType[] = [
    "transforms-into",
    "emerges-from",
    "unfolds-to",
  ];
  const mathematical: RelationshipType[] = [
    "ratio-related",
    "proportional",
    "symmetric-with",
  ];

  if (structural.includes(type)) return "Structural";
  if (transformational.includes(type)) return "Transformational";
  if (mathematical.includes(type)) return "Mathematical";
  return "Conceptual";
}

/**
 * RelatedGeometries Component
 *
 * Displays related geometries grouped by relationship type.
 * Shows all enhanced relationships with context.
 */
export function RelatedGeometries({ slug }: RelatedGeometriesProps) {
  const geometry = getGeometryBySlug(slug);

  if (!geometry?.relationships || geometry.relationships.length === 0) {
    return null;
  }

  // Group relationships by category
  const grouped: Record<
    string,
    Array<{
      type: RelationshipType;
      target: Geometry;
      context?: string;
    }>
  > = {};

  geometry.relationships.forEach((rel) => {
    const target = getGeometryBySlug(rel.targetId);
    if (!target) return;

    const category = getRelationshipCategory(rel.type);
    grouped[category] ??= [];
    grouped[category].push({
      type: rel.type,
      target,
      context: rel.context,
    });
  });

  return (
    <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
      <Heading
        mb="6"
        size={{ initial: "5", md: "6" }}
        className="text-amber-300"
      >
        Related Geometries
      </Heading>

      <Flex direction="column" gap="6">
        {/* Render each category */}
        {Object.entries(grouped).map(([category, relationships]) => (
          <div key={category}>
            <Heading size="5" className="mb-4 text-amber-100">
              {category}
            </Heading>
            <Flex direction="column" gap="4">
              {/* Group by relationship type within category */}
              {Object.entries(
                relationships.reduce(
                  (acc, rel) => {
                    if (!acc[rel.type]) acc[rel.type] = [];
                    acc[rel.type].push(rel);
                    return acc;
                  },
                  {} as Record<
                    RelationshipType,
                    typeof relationships
                  >
                )
              ).map(([type, rels]) => (
                <div key={type}>
                  <Heading size="4" className="mb-2 text-amber-200">
                    {formatRelationshipLabel(type as RelationshipType)}
                  </Heading>
                  <ul className="space-y-2">
                    {rels.map((rel) => (
                      <li key={rel.target.id}>
                        <Link
                          href={`/${rel.target.category === "platonic" ? "platonic-solids" : "sacred-patterns"}/${rel.target.slug}`}
                          className="text-blue-200 underline decoration-amber-500/30 transition-colors hover:text-amber-300 hover:decoration-amber-500"
                        >
                          {rel.target.name}
                        </Link>
                        {rel.context && (
                          <Text className="ml-2 text-sm text-blue-300/70">
                            ({rel.context})
                          </Text>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Flex>
          </div>
        ))}
      </Flex>
    </Card>
  );
}
