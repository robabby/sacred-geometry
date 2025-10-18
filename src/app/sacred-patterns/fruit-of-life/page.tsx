import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GeometryNavigation } from "@/components/geometry-navigation";
import { getGeometryBySlug } from "@/lib/data";

export default function FruitOfLifePage() {
  const geometry = getGeometryBySlug("fruit-of-life");

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
              From Seed to Fruit
            </Heading>
            <Text className="mb-4 text-blue-200">
              The Fruit of Life consists of 13 circles arranged in a specific
              pattern derived from the Flower of Life. If the Seed of Life
              represents the initial stages of creation (the first seven &quot;days&quot;),
              and the Flower of Life represents the full blossoming of creation&apos;s
              potential, then the Fruit of Life is the essence extracted—the
              concentrated blueprint of the universe itself.
            </Text>
            <Text className="text-blue-200">
              These thirteen circles are not randomly selected. They form a precise
              geometric grid that, when connected with straight lines, creates
              Metatron&apos;s Cube—one of the most sacred and powerful symbols in
              sacred geometry, containing all five Platonic Solids.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Blueprint of Creation
            </Heading>
            <Text className="mb-4 text-blue-200">
              When you connect the centers of the 13 circles with straight lines,
              the result is Metatron&apos;s Cube. This transformation reveals how the
              Fruit of Life serves as a bridge between circular (feminine) and
              linear (masculine) geometries—between curved potential and angular
              manifestation.
            </Text>
            <Text className="text-blue-200">
              The 13 circles can be seen as representing the 13 archangels in some
              traditions, or the 13 lunar cycles in a solar year, connecting this
              pattern to both celestial mechanics and spiritual hierarchies.
            </Text>
          </Card>

          <Card className="border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Symbolic Significance
            </Heading>
            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">13 Circles:</strong> Represents
                Christ and the 12 apostles, or the sun surrounded by 12 zodiac
                signs
              </li>
              <li>
                <strong className="text-amber-300">Universal Blueprint:</strong>{" "}
                Contains the fundamental geometric ratios that structure physical
                reality
              </li>
              <li>
                <strong className="text-amber-300">Dimensional Keys:</strong> Some
                traditions view the Fruit of Life as a key to accessing higher
                dimensions of consciousness
              </li>
              <li>
                <strong className="text-amber-300">Sacred Grid:</strong> Forms a
                perfect grid system used in temple architecture and energy
                work
              </li>
              <li>
                <strong className="text-amber-300">Metatron&apos;s Foundation:</strong>{" "}
                Directly generates Metatron&apos;s Cube, which contains all Platonic
                Solids—the building blocks of matter
              </li>
            </ul>
          </Card>

          {/* Navigation */}
          <GeometryNavigation currentSlug="fruit-of-life" category="pattern" />
        </div>
      </div>
    </main>
  );
}
