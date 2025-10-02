import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { ROUTES } from "@/util/routes";

export default function GoldenRatioPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header with Image */}
          <Grid columns={{ initial: "1", md: "2" }} gap={{ initial: "6", md: "8" }} className="mb-8 sm:mb-12">
            <Flex direction="column" gap="6" justify="center">
              <Heading size={{ initial: "7", md: "9" }} className="text-amber-100">
                {ROUTES.sacredPatterns.children.goldenRatio.name}
              </Heading>

              <Text size={{ initial: "3", md: "5" }} className="text-blue-200">
                The divine proportion φ (phi) ≈ 1.618, found throughout nature, art, and architecture.
                From spiral galaxies to nautilus shells, from the human body to the Parthenon, this ratio
                appears wherever optimal growth and aesthetic perfection manifest.
              </Text>
            </Flex>

            {/* Hero Image */}
            <div className="flex items-center justify-center">
              <Image
                src="/images/geometries/sacred-patterns/golden-ratio/golden-ratio-spiral.svg"
                alt="Golden Ratio"
                width={400}
                height={400}
                className="object-contain w-full max-w-md"
                style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
              />
            </div>
          </Grid>

          {/* The Mathematics */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-6 sm:p-8 mb-6 sm:mb-8">
            <Heading size={{ initial: "5", md: "6" }} className="text-amber-300 mb-4">
              The Mathematics of Beauty
            </Heading>

            <Text className="text-blue-200 mb-4">
              The Golden Ratio is an irrational number, approximately <strong className="text-amber-300">1.61803398875...</strong> It is defined by a simple yet profound relationship:
            </Text>

            <div className="bg-blue-900/30 p-6 rounded-lg mb-6 text-center">
              <Text size="6" className="text-amber-300 font-mono mb-2">
                φ = (1 + √5) / 2
              </Text>
              <Text size="2" className="text-blue-300">
                When a line is divided at the Golden Ratio, the whole is to the larger part as the larger part is to the smaller part
              </Text>
            </div>

            <Grid columns={{ initial: "1", sm: "2" }} gap="6">
              <div>
                <Text weight="bold" className="text-amber-200 mb-2">Unique Properties:</Text>
                <ul className="space-y-2 text-blue-200 text-sm ml-4">
                  <li>φ + 1 = φ²</li>
                  <li>φ - 1 = 1/φ</li>
                  <li>φ² = φ + 1</li>
                  <li>1/φ = φ - 1</li>
                </ul>
              </div>
              <div>
                <Text weight="bold" className="text-amber-200 mb-2">The Fibonacci Sequence:</Text>
                <Text size="2" className="text-blue-200">
                  0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...
                </Text>
                <Text size="2" className="text-blue-300 mt-2">
                  Each number is the sum of the previous two. As the sequence progresses, the ratio between consecutive numbers approaches φ
                </Text>
              </div>
            </Grid>
          </Card>

          {/* In Nature */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-6 sm:p-8 mb-6 sm:mb-8">
            <Heading size={{ initial: "5", md: "6" }} className="text-amber-300 mb-4">
              The Pattern of Growth
            </Heading>

            <Text className="text-blue-200 mb-4">
              The Golden Ratio appears repeatedly in nature, particularly in growth patterns:
            </Text>

            <Grid columns={{ initial: "1", sm: "2" }} gap="4">
              <div>
                <Text weight="bold" className="text-amber-200 mb-2">Flora</Text>
                <Text size="2" className="text-blue-200">
                  • Flower petals (lilies have 3, buttercups 5, delphiniums 8, marigolds 13, asters 21, daisies 34, 55 or 89)
                  <br />• Pine cone spirals
                  <br />• Sunflower seed arrangements
                  <br />• Rose petal spirals
                  <br />• Leaf arrangements (phyllotaxis)
                </Text>
              </div>

              <div>
                <Text weight="bold" className="text-amber-200 mb-2">Fauna & Astronomy</Text>
                <Text size="2" className="text-blue-200">
                  • Nautilus shell spiral
                  <br />• Spiral galaxies
                  <br />• Hurricane formations
                  <br />• DNA molecule (34 Ångströms long, 21 Ångströms wide)
                  <br />• Human face proportions
                  <br />• Finger bones ratios
                </Text>
              </div>
            </Grid>
          </Card>

          {/* In Art and Architecture */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-6 sm:p-8 mb-6 sm:mb-8">
            <Heading size={{ initial: "5", md: "6" }} className="text-amber-300 mb-4">
              Art, Architecture & Design
            </Heading>

            <Text className="text-blue-200 mb-4">
              Artists and architects have used the Golden Ratio for centuries to create aesthetically pleasing, harmonious compositions:
            </Text>

            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">The Parthenon:</strong> The ancient Greek temple&apos;s facade can be divided into golden rectangles, creating visual harmony.
              </li>
              <li>
                <strong className="text-amber-300">Great Pyramid of Giza:</strong> The ratio of the height to half the base approximates φ, whether by design or coincidence.
              </li>
              <li>
                <strong className="text-amber-300">Leonardo da Vinci:</strong> Used the Golden Ratio extensively in paintings like the Mona Lisa and The Last Supper.
              </li>
              <li>
                <strong className="text-amber-300">Modern Design:</strong> Apple, Twitter, and other tech companies use golden ratio proportions in logo and interface design.
              </li>
              <li>
                <strong className="text-amber-300">Music:</strong> Compositions by Mozart, Beethoven, and Debussy incorporate golden ratio proportions in timing and structure.
              </li>
            </ul>
          </Card>

          {/* The Golden Spiral */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-6 sm:p-8 mb-6 sm:mb-8">
            <Heading size={{ initial: "5", md: "6" }} className="text-amber-300 mb-4">
              The Golden Spiral
            </Heading>

            <Text className="text-blue-200 mb-4">
              When you create squares based on Fibonacci numbers and connect their corners with an arc, you create the Golden Spiral—a logarithmic spiral that grows outward by a factor of φ for every quarter turn.
            </Text>

            <Grid columns={{ initial: "1", sm: "2" }} gap="6">
              <div>
                <Text className="text-blue-200 mb-3">
                  This spiral appears in:
                </Text>
                <ul className="space-y-2 text-blue-200 text-sm ml-4">
                  <li>Nautilus shells</li>
                  <li>Spiral galaxies like the Milky Way</li>
                  <li>Hurricane and tornado formations</li>
                  <li>Cochlea of the human ear</li>
                  <li>Unfurling fern fronds</li>
                  <li>Spider webs</li>
                </ul>
              </div>

              <div>
                <Text className="text-blue-200 mb-3">
                  <strong className="text-amber-300">Why this spiral?</strong> It represents the most efficient growth pattern—expanding without changing shape, maintaining the same proportions at any scale. Nature favors it because it optimizes space while minimizing energy expenditure.
                </Text>
              </div>
            </Grid>
          </Card>

          {/* Human Body */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-6 sm:p-8 mb-6 sm:mb-8">
            <Heading size={{ initial: "5", md: "6" }} className="text-amber-300 mb-4">
              The Human Blueprint
            </Heading>

            <Text className="text-blue-200 mb-4">
              The Golden Ratio appears throughout human anatomy, suggesting it may be fundamental to biological form:
            </Text>

            <Grid columns={{ initial: "1", sm: "3" }} gap="4">
              <div className="text-center">
                <Text weight="bold" className="text-amber-200 mb-2">Proportions</Text>
                <Text size="2" className="text-blue-200">
                  Navel to floor / head to navel ≈ φ
                </Text>
              </div>

              <div className="text-center">
                <Text weight="bold" className="text-amber-200 mb-2">Facial Features</Text>
                <Text size="2" className="text-blue-200">
                  Width of smile / width of nose ≈ φ
                </Text>
              </div>

              <div className="text-center">
                <Text weight="bold" className="text-amber-200 mb-2">Fingers</Text>
                <Text size="2" className="text-blue-200">
                  Each bone is φ times longer than the next
                </Text>
              </div>
            </Grid>

            <Text className="text-blue-200 mt-4">
              Leonardo da Vinci&apos;s famous <em>Vitruvian Man</em> depicts these proportions, showing the human body as a microcosm of divine mathematical harmony.
            </Text>
          </Card>

          {/* Why Does It Appear? */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-6 sm:p-8">
            <Heading size={{ initial: "5", md: "6" }} className="text-amber-300 mb-4">
              Why Does Nature Use φ?
            </Heading>

            <Text className="text-blue-200 mb-4">
              The Golden Ratio may be nature&apos;s solution to fundamental optimization problems:
            </Text>

            <Grid columns={{ initial: "1", sm: "2" }} gap="6">
              <div>
                <Text className="text-blue-200 mb-3">
                  <strong className="text-amber-300">Efficient Packing:</strong> The golden angle (≈137.5°, derived from φ) allows seeds, leaves, and petals to pack with minimal overlap, maximizing sunlight exposure and space utilization.
                </Text>

                <Text className="text-blue-200">
                  <strong className="text-amber-300">Optimal Growth:</strong> The Golden Spiral allows organisms to grow while maintaining the same proportions—crucial for shells, horns, and other structures that grow continuously.
                </Text>
              </div>

              <div>
                <Text className="text-blue-200 mb-3">
                  <strong className="text-amber-300">Aesthetic Appeal:</strong> Humans find φ proportions pleasing because our brains are wired to recognize efficient, optimal patterns. What we call beauty may be our recognition of mathematical perfection.
                </Text>

                <Text className="text-blue-200">
                  <strong className="text-amber-300">Fractal Self-Similarity:</strong> The ratio maintains the same proportions at every scale, creating visual harmony and structural stability.
                </Text>
              </div>
            </Grid>
          </Card>
        </div>
      </div>
    </main>
  );
}
