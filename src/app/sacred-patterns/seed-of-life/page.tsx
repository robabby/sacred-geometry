import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { ROUTES } from "@/util/routes";

export default function SeedOfLifePage() {
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
                {ROUTES.sacredPatterns.children.seedOfLife.name}
              </Heading>
              <Text size={{ initial: "3", md: "5" }} className="text-blue-200">
                Seven circles arranged in perfect hexagonal symmetry,
                representing the seven days of creation and forming the
                foundation from which the Flower of Life grows.
              </Text>
            </Flex>
            <div className="flex items-center justify-center">
              <Image
                src="/images/geometries/sacred-patterns/seed-of-life/seed-of-life-primary.svg"
                alt="Seed of Life"
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
              The Seven Days of Creation
            </Heading>
            <Text className="mb-4 text-blue-200">
              The Seed of Life consists of seven circles: one central circle
              surrounded by six others in perfect hexagonal symmetry. This
              pattern mirrors the creation story found in many traditions—seven
              days, seven stages, seven levels.
            </Text>
            <Text className="text-blue-200">
              The first circle represents the void or unity. The second creates
              the vesica piscis. By the seventh circle, the complete Seed
              pattern emerges—the blueprint from which all of creation unfolds.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Foundation of the Flower
            </Heading>
            <Text className="text-blue-200">
              The Seed of Life is the inner component of the Flower of Life. If
              you continue the pattern outward, adding more circles following
              the same geometric rules, the Seed blossoms into the full Flower.
              It represents potential—the seed from which infinite complexity
              grows.
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
                <strong className="text-amber-300">Seven Chakras:</strong> The
                pattern can represent the seven energy centers in the human body
              </li>
              <li>
                <strong className="text-amber-300">Seven Musical Notes:</strong>{" "}
                The seven-fold symmetry relates to harmonic octaves
              </li>
              <li>
                <strong className="text-amber-300">Seven Days:</strong> The
                creation cycle found in Genesis and other creation myths
              </li>
              <li>
                <strong className="text-amber-300">Cell Division:</strong>{" "}
                Mirrors the first seven stages of embryonic development
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </main>
  );
}
