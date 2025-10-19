import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GeometryNavigation } from "@/components/geometry-navigation";
import { getGeometryBySlug } from "@/lib/data";

export default function GermOfLifePage() {
  const geometry = getGeometryBySlug("germ-of-life");

  if (!geometry) {
    notFound();
  }
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <Grid
            columns={{ initial: "1", md: "2" }}
            gap={{ initial: "6", md: "8" }}
            className="mb-8 sm:mb-12"
          >
            <Flex direction="column" gap="6" justify="center">
              <Heading
                size={{ initial: "7", md: "9" }}
                className="text-amber-100"
              >
                {geometry.title}
              </Heading>
              <Text size={{ initial: "3", md: "5" }} className="text-blue-200">
                {geometry.description}
              </Text>
            </Flex>
            <div className="flex items-center justify-center">
              <Image
                src={geometry.images?.heroImage ?? ""}
                alt={geometry.name}
                width={400}
                height={400}
                className="w-full max-w-md object-contain"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)",
                }}
              />
            </div>
          </Grid>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The First Rotation
            </Heading>
            <Text className="mb-4 text-blue-200">
              The Germ of Life represents the first rotation in the genesis of
              sacred geometry patterns. Created by rotating the Vesica Piscis
              around a central point, it generates six perfect petals arranged
              in hexagonal symmetry—one of nature&apos;s most fundamental patterns.
            </Text>
            <Text className="text-blue-200">
              This rotation creates seven circles total: one central circle
              surrounded by six others. Unlike the Seed of Life where all
              circles overlap, the Germ of Life shows the distinct petals
              formed by this rotation—revealing the underlying structure of
              growth itself.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Foundation of Natural Growth
            </Heading>
            <Text className="mb-4 text-blue-200">
              The six-fold symmetry of the Germ of Life appears throughout the
              natural world as the fundamental pattern of efficient space
              filling and optimal growth. This hexagonal structure appears in
              snowflakes, honeycombs, crystalline structures, and the molecular
              geometry of water.
            </Text>
            <Text className="text-blue-200">
              The pattern demonstrates a universal principle: when circles of
              equal size pack together around a central point, they naturally
              form this hexagonal arrangement. This isn&apos;t arbitrary—it&apos;s the
              most efficient way to fill space in two dimensions.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Gateway to Complexity
            </Heading>
            <Text className="mb-4 text-blue-200">
              The Germ of Life serves as the foundation upon which the Seed of
              Life is built. While the Seed shows the complete pattern of
              overlapping circles, the Germ reveals the underlying rotational
              principle that generates the pattern.
            </Text>
            <Text className="text-blue-200">
              This pattern represents the first step from unity (the single
              circle) through duality (the Vesica Piscis) into multiplicity—the
              six petals around the center. It&apos;s the geometric representation
              of creation unfolding from the void.
            </Text>
          </Card>

          <Card className="border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Symbolic Meaning
            </Heading>
            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">
                  Hexagonal Symmetry:
                </strong>{" "}
                The six-fold pattern appears in crystals, honeycombs, and
                molecular structures
              </li>
              <li>
                <strong className="text-amber-300">First Day:</strong> In
                creation narratives, represents the initial act of
                differentiation from unity
              </li>
              <li>
                <strong className="text-amber-300">
                  Rotational Principle:
                </strong>{" "}
                Demonstrates how rotation around a center generates form and
                pattern
              </li>
              <li>
                <strong className="text-amber-300">Natural Growth:</strong> The
                fundamental pattern of cell division, flower petals, and
                organic expansion
              </li>
              <li>
                <strong className="text-amber-300">Space Efficiency:</strong>{" "}
                The most efficient packing arrangement in two-dimensional space
              </li>
              <li>
                <strong className="text-amber-300">Foundation Pattern:</strong>{" "}
                The building block from which more complex geometries emerge
              </li>
            </ul>
          </Card>

          {/* Navigation */}
          <GeometryNavigation currentSlug="germ-of-life" category="pattern" />
        </div>
      </div>
    </main>
  );
}
