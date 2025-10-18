import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GeometryNavigation } from "@/components/geometry-navigation";
import { getGeometryBySlug } from "@/lib/data";

export default function VesicaPiscisPage() {
  const geometry = getGeometryBySlug("vesica-piscis");

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
              The Portal of Creation
            </Heading>
            <Text className="mb-4 text-blue-200">
              The Vesica Piscis is formed when two circles of equal size overlap
              such that the center of each circle touches the circumference of the
              other. This simple geometric operation creates the almond-shaped
              &quot;vesica&quot; in the center—a shape that has profound symbolic and
              mathematical significance.
            </Text>
            <Text className="text-blue-200">
              It is called the &quot;womb of geometry&quot; because all other geometric forms
              can be derived from it. The vesica generates the triangle, square,
              pentagon, and all platonic solids through continued geometric
              construction.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Foundation of Sacred Geometry
            </Heading>
            <Text className="mb-4 text-blue-200">
              The Vesica Piscis is the fundamental building block of the Seed of Life
              and Flower of Life patterns. When you create the Seed of Life by
              drawing seven circles, you&apos;re actually creating six vesica piscis
              formations radiating from the center.
            </Text>
            <Text className="text-blue-200">
              The mathematical ratio of the width to height of the vesica piscis is
              1:√3 (approximately 1:1.732), connecting it to the geometry of
              equilateral triangles and hexagons.
            </Text>
          </Card>

          <Card className="border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Symbolic Meanings
            </Heading>
            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">Divine Feminine:</strong> The
                almond shape represents the vulva, womb, and portal of birth
              </li>
              <li>
                <strong className="text-amber-300">Duality & Unity:</strong> Two
                separate circles merging into one shared space, representing the
                union of opposites
              </li>
              <li>
                <strong className="text-amber-300">Christ Consciousness:</strong>{" "}
                In Christian iconography, the vesica piscis often frames Christ or
                Mary, symbolizing divine manifestation
              </li>
              <li>
                <strong className="text-amber-300">The Fish:</strong> &quot;Vesica
                Piscis&quot; means &quot;bladder of the fish&quot; in Latin, connecting to early
                Christian fish symbolism
              </li>
              <li>
                <strong className="text-amber-300">Sacred Architecture:</strong>{" "}
                Gothic pointed arches and window designs are based on the vesica
                piscis shape
              </li>
            </ul>
          </Card>

          {/* Navigation */}
          <GeometryNavigation
            currentSlug="vesica-piscis"
            category="pattern"
          />
        </div>
      </div>
    </main>
  );
}
