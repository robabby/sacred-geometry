import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { getGeometryBySlug, getRelatedGeometries } from "@/lib/data";

interface RelatedGeometriesProps {
  slug: string;
}

/**
 * RelatedGeometries Component
 *
 * Displays related geometries grouped by relationship type.
 * Shows: dual, contains, appearsIn relationships.
 */
export function RelatedGeometries({ slug }: RelatedGeometriesProps) {
  const geometry = getGeometryBySlug(slug);

  if (!geometry) {
    return null;
  }

  const { dual, contains, appearsIn } = getRelatedGeometries(geometry.id);

  // Check if there are any relationships to display
  const hasRelationships =
    dual !== undefined || contains.length > 0 || appearsIn.length > 0;

  if (!hasRelationships) {
    return null;
  }

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
        {/* Dual Relationship */}
        {dual && (
          <div>
            <Heading size="4" className="mb-3 text-amber-200">
              Dual
            </Heading>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${dual.category === "platonic" ? "platonic-solids" : "sacred-patterns"}/${dual.slug}`}
                  className="text-blue-200 underline decoration-amber-500/30 transition-colors hover:text-amber-300 hover:decoration-amber-500"
                >
                  {dual.name}
                </Link>
                <Text className="ml-2 text-blue-300/70">
                  (Geometric duality)
                </Text>
              </li>
            </ul>
          </div>
        )}

        {/* Contains Relationships */}
        {contains.length > 0 && (
          <div>
            <Heading size="4" className="mb-3 text-amber-200">
              Contains
            </Heading>
            <ul className="space-y-2">
              {contains.map((geom) => (
                <li key={geom.id}>
                  <Link
                    href={`/${geom.category === "platonic" ? "platonic-solids" : "sacred-patterns"}/${geom.slug}`}
                    className="text-blue-200 underline decoration-amber-500/30 transition-colors hover:text-amber-300 hover:decoration-amber-500"
                  >
                    {geom.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Appears In Relationships */}
        {appearsIn.length > 0 && (
          <div>
            <Heading size="4" className="mb-3 text-amber-200">
              Appears In
            </Heading>
            <ul className="space-y-2">
              {appearsIn.map((geom) => (
                <li key={geom.id}>
                  <Link
                    href={`/${geom.category === "platonic" ? "platonic-solids" : "sacred-patterns"}/${geom.slug}`}
                    className="text-blue-200 underline decoration-amber-500/30 transition-colors hover:text-amber-300 hover:decoration-amber-500"
                  >
                    {geom.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Flex>
    </Card>
  );
}
