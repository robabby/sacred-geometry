import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { ROUTES } from "@/util/routes";

const sacredPatterns = [
  {
    slug: "flower-of-life",
    name: "Flower of Life",
    description: "Ancient symbol of creation, consisting of overlapping circles representing the fundamental forms of space and time.",
    image: "/images/geometries/sacred-patterns/flower-of-life/flower-of-life-primary.svg",
  },
  {
    slug: "seed-of-life",
    name: "Seed of Life",
    description: "Seven circles arranged in perfect symmetry, representing the seven days of creation and the foundation of all form.",
    image: "/images/geometries/sacred-patterns/seed-of-life/seed-of-life-primary.svg",
  },
  {
    slug: "metatrons-cube",
    name: "Metatron's Cube",
    description: "Contains all five Platonic Solids and represents the underlying geometric pattern of the universe.",
    image: "/images/geometries/sacred-patterns/metatrons-cube/metatrons-cube-primary.svg",
  },
  {
    slug: "sri-yantra",
    name: "Sri Yantra",
    description: "Sacred Hindu geometry representing the union of divine masculine and feminine energies.",
    image: "/images/geometries/sacred-patterns/sri-yantra/sri-yantra-primary.svg",
  },
  {
    slug: "merkaba",
    name: "Merkaba",
    description: "Sacred light vehicle, two interlocking tetrahedrons representing the union of spirit and matter.",
    image: "/images/geometries/sacred-patterns/merkaba/merkaba-primary.svg",
  },
  {
    slug: "golden-ratio",
    name: "Golden Ratio",
    description: "Divine proportion (φ ≈ 1.618) that appears throughout nature, art, and sacred architecture.",
    image: "/images/geometries/sacred-patterns/golden-ratio/golden-ratio-spiral.svg",
  },
];

export default function SacredPatternsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <Heading size="9" className="text-amber-100 mb-6">
            {ROUTES.sacredPatterns.name}
          </Heading>
          <Text size="5" className="text-blue-200 mb-4">
            {ROUTES.sacredPatterns.description}
          </Text>
          <Text size="3" className="text-blue-300/80 max-w-3xl mx-auto">
            These timeless patterns appear across cultures and throughout history, from ancient temples
            to modern science. They represent the fundamental organizing principles of consciousness,
            energy, and matterthe blueprint of creation itself.
          </Text>
        </div>

        {/* Sacred Patterns Grid */}
        <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="6" className="max-w-6xl mx-auto mb-16">
          {sacredPatterns.map((pattern) => {
            return (
              <Card
                key={pattern.name}
                className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 backdrop-blur-sm border-amber-500/20 p-6 hover:border-amber-500/40 transition-colors"
              >
                <Flex direction="column" gap="4">
                  {/* Image */}
                  <Box className="relative w-full h-48 flex items-center justify-center">
                    <Image
                      src={pattern.image}
                      alt={pattern.name}
                      width={180}
                      height={180}
                      className="object-contain"
                      style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
                    />
                  </Box>

                  <Heading size="5" className="text-amber-100">
                    {pattern.name}
                  </Heading>

                  <Text size="2" className="text-blue-300">
                    {pattern.description}
                  </Text>
                </Flex>
              </Card>
            );
          })}
        </Grid>

        {/* The Flower of Life - Featured Section */}
        <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-8 max-w-4xl mx-auto mb-8">
          <Flex direction="column" gap="4">
            <Flex align="center" gap="4">
              <Box className="w-12 h-12 flex items-center justify-center">
                <Image
                  src="/images/geometries/sacred-patterns/flower-of-life/flower-of-life-primary.svg"
                  alt="Flower of Life"
                  width={48}
                  height={48}
                  style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
                />
              </Box>
              <Heading size="7" className="text-amber-300">
                The Flower of Life: Universal Pattern
              </Heading>
            </Flex>

            <Text className="text-blue-200">
              The Flower of Life is perhaps the most widely recognized symbol in sacred geometry.
              Found in temples across the worldfrom Egypt to China, from Europe to Indiathis
              pattern predates all major religions and appears to encode fundamental truths about
              the nature of reality.
            </Text>

            <Text className="text-blue-200">
              By overlapping circles in a specific pattern, the Flower of Life emerges naturally.
              Within its petals hide countless other sacred patterns: the Seed of Life, the Tree
              of Life, Metatron&apos;s Cube, and all five Platonic Solids. It&apos;s as if this single
              pattern contains the entire library of creation&apos;s building blocks.
            </Text>
          </Flex>
        </Card>

        {/* Sacred Ratios */}
        <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-8 max-w-4xl mx-auto mb-8">
          <Heading size="6" className="text-amber-300 mb-4">
            The Golden Ratio & Sacred Proportions
          </Heading>

          <Text className="text-blue-200 mb-4">
            Sacred patterns often embody special mathematical ratios that appear throughout nature:
          </Text>

          <Grid columns="1" gap="4">
            <Box>
              <Flex direction="column" gap="2">
                <Text weight="bold" className="text-amber-300">
                  � (Phi) H 1.618 - The Golden Ratio
                </Text>
                <Text className="text-blue-200">
                  Found in spiral shells, flower petals, galaxy arms, and human proportions.
                  Represents optimal growth and aesthetic perfection.
                </Text>
              </Flex>
            </Box>

            <Box>
              <Flex direction="column" gap="2">
                <Text weight="bold" className="text-amber-300">
                  2 H 1.414 - The Silver Ratio
                </Text>
                <Text className="text-blue-200">
                  The diagonal of a square. Found in paper sizes and sacred architecture.
                  Represents the bridge between dimensions.
                </Text>
              </Flex>
            </Box>

            <Box>
              <Flex direction="column" gap="2">
                <Text weight="bold" className="text-amber-300">
                  � (Pi) H 3.14159 - Circle Constant
                </Text>
                <Text className="text-blue-200">
                  The relationship between circle and diameter. Represents cycles, wholeness,
                  and the infinite.
                </Text>
              </Flex>
            </Box>
          </Grid>
        </Card>

        {/* Where to Find Them */}
        <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-8 max-w-4xl mx-auto">
          <Heading size="6" className="text-amber-300 mb-4">
            Where Sacred Patterns Appear
          </Heading>

          <Text className="text-blue-200 mb-4">
            These patterns are not mere human inventionsthey are discoveries. They appear everywhere:
          </Text>

          <ul className="space-y-3 text-blue-200">
            <li>
              <strong className="text-amber-300">Nature:</strong> Flower petals, pine cones,
              nautilus shells, crystal structures, DNA helixes
            </li>
            <li>
              <strong className="text-amber-300">Architecture:</strong> Temples, cathedrals,
              pyramids, mosquesstructures designed to elevate consciousness
            </li>
            <li>
              <strong className="text-amber-300">Art:</strong> Mandalas, Islamic geometric patterns,
              Celtic knots, Renaissance paintings
            </li>
            <li>
              <strong className="text-amber-300">Science:</strong> Atomic structures, quantum fields,
              cymatics (sound made visible), fractal mathematics
            </li>
            <li>
              <strong className="text-amber-300">Human Body:</strong> Proportions, spiral of ear,
              arrangement of features, energy centers (chakras)
            </li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
