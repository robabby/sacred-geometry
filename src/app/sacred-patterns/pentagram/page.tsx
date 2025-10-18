import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GeometryNavigation } from "@/components/geometry-navigation";
import { getGeometryBySlug } from "@/lib/data";

export default function PentagramPage() {
  const geometry = getGeometryBySlug("pentagram");

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
              The Golden Proportion in Five
            </Heading>
            <Text className="mb-4 text-blue-200">
              The pentagram is perhaps the most mathematically elegant symbol in
              sacred geometry. Every line segment in a pentagram divides another
              in the golden ratio (φ ≈ 1.618). When you draw a pentagram, you are
              quite literally drawing the golden ratio multiple times in a
              single, unified form.
            </Text>
            <Text className="text-blue-200">
              The five-pointed star can be drawn with a single continuous line,
              symbolizing the interconnectedness of all things. It appears
              naturally in the patterns of apple cores, starfish, and many flowers
              with five petals—nature&apos;s signature written in mathematical
              perfection.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Human Microcosm
            </Heading>
            <Text className="mb-4 text-blue-200">
              Leonardo da Vinci&apos;s famous Vitruvian Man illustrates how the
              human body fits within a pentagram—head at the top point, arms and
              legs at the other four. This isn&apos;t mere coincidence; the human
              form embodies golden ratio proportions throughout its structure.
            </Text>
            <Text className="text-blue-200">
              Ancient philosophers called the pentagram the symbol of the
              microcosm—the small universe that reflects the greater cosmos. If
              the universe is built on mathematical harmony, and humans are built
              on the same proportions, then we are quite literally made in the
              image of cosmic order.
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
                <strong className="text-amber-300">Five Elements:</strong>{" "}
                Represents the classical elements (earth, water, fire, air) plus
                spirit at the top point
              </li>
              <li>
                <strong className="text-amber-300">Protection:</strong> Used in
                many traditions as a protective symbol, with the single point
                upward representing spirit ruling over matter
              </li>
              <li>
                <strong className="text-amber-300">Venus Cycle:</strong> The
                planet Venus traces a pentagram in the sky over its 8-year cycle
                with Earth
              </li>
              <li>
                <strong className="text-amber-300">Pythagorean Symbol:</strong>{" "}
                The ancient Pythagoreans used it as their secret symbol,
                recognizing its mathematical perfection
              </li>
              <li>
                <strong className="text-amber-300">
                  Mathematical Perfection:
                </strong>{" "}
                Every intersection creates a smaller pentagram, continuing
                infinitely—self-similar at all scales
              </li>
              <li>
                <strong className="text-amber-300">Human Hand:</strong> Five
                fingers, five senses, five-pointed star—the pentagram as a symbol
                of human agency and manifestation
              </li>
            </ul>
          </Card>

          {/* Navigation */}
          <GeometryNavigation currentSlug="pentagram" category="pattern" />
        </div>
      </div>
    </main>
  );
}
