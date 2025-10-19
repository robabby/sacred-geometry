import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GeometryNavigation } from "@/components/geometry-navigation";
import { getGeometryBySlug } from "@/lib/data";

export default function EggOfLifePage() {
  const geometry = getGeometryBySlug("egg-of-life");

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
              The Geometry of Life
            </Heading>
            <Text className="mb-4 text-blue-200">
              The Egg of Life consists of eight spheres arranged in a pattern
              that mirrors the first eight cells of embryonic development. This
              sacred geometry reveals the mathematical blueprint underlying all
              multicellular life forms.
            </Text>
            <Text className="text-blue-200">
              Created by rotating the Seed of Life pattern, the Egg of Life
              represents the transition from the seven-fold symmetry of
              creation to the infinite complexity of the Flower of Life. Its
              oval shape echoes the form of an actual egg—the vessel from which
              all life emerges.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Embryonic Development
            </Heading>
            <Text className="mb-4 text-blue-200">
              The Egg of Life perfectly mirrors the first stages of cellular
              division after conception. From a single cell, life divides into
              two, then four, then eight—precisely the pattern shown in this
              geometry.
            </Text>
            <Text className="text-blue-200">
              This eight-cell stage, known as the morula in biology, represents
              a critical moment in development. Every human, every animal, every
              plant begins with this same geometric pattern—a universal template
              encoded in the fabric of creation itself.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Bridge Between Patterns
            </Heading>
            <Text className="text-blue-200">
              The Egg of Life serves as a transitional form between the Seed of
              Life and the Flower of Life. It demonstrates how simple geometric
              principles—the rotation and overlapping of circles—generate
              increasingly complex patterns that underlie all of existence.
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
                <strong className="text-amber-300">Cell Division:</strong>{" "}
                Represents the eight-cell stage of embryonic development (the
                morula)
              </li>
              <li>
                <strong className="text-amber-300">
                  Blueprint of Life:
                </strong>{" "}
                Shows the geometric pattern underlying all multicellular
                organisms
              </li>
              <li>
                <strong className="text-amber-300">Transformation:</strong> The
                bridge between potential (Seed) and manifestation (Flower)
              </li>
              <li>
                <strong className="text-amber-300">Organic Forms:</strong>{" "}
                The oval shape reflects the egg as the vessel of life
              </li>
              <li>
                <strong className="text-amber-300">Eight-fold Path:</strong> In
                spiritual traditions, the number eight represents renewal and
                new beginnings
              </li>
            </ul>
          </Card>

          {/* Navigation */}
          <GeometryNavigation currentSlug="egg-of-life" category="pattern" />
        </div>
      </div>
    </main>
  );
}
