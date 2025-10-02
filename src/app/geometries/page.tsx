import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/util/routes";

export default function GeometriesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <Heading size="9" className="text-amber-100 mb-6">
            {ROUTES.geometries.name}
          </Heading>
          <Text size="5" className="text-blue-200 mb-4">
            {ROUTES.geometries.description}
          </Text>
          <Text size="3" className="text-blue-300/80 max-w-3xl mx-auto">
            Sacred geometry reveals the blueprint of creation—the patterns, ratios, and shapes
            that structure reality from the smallest atom to the largest galaxy. These forms
            are not merely mathematical curiosities; they are the language through which the
            universe expresses itself.
          </Text>
        </div>

        {/* Main Categories */}
        <Grid columns={{ initial: "1", md: "2" }} gap="8" className="max-w-5xl mx-auto">
          {/* Platonic Solids Card */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 backdrop-blur-sm border-amber-500/20 p-8 hover:border-amber-500/40 transition-all hover:scale-[1.02]">
            <Flex direction="column" gap="6">
              <Box className="w-full h-64 flex items-center justify-center">
                <Image
                  src="/images/geometries/platonic-solids/tetrahedron/tetrahedron-3d.svg"
                  alt="Platonic Solids"
                  width={200}
                  height={200}
                  className="object-contain"
                  style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
                />
              </Box>

              <Heading size="7" className="text-amber-100">
                {ROUTES.platonicSolids.name}
              </Heading>

              <Text className="text-blue-200">
                {ROUTES.platonicSolids.description}
              </Text>

              <Text size="2" className="text-blue-300">
                The five perfect solids discovered by the ancient Greeks—each representing a
                fundamental element and possessing complete geometric regularity. These are the
                only forms where every face, edge, and angle is identical.
              </Text>

              <Box>
                <Button
                  asChild
                  size="3"
                  className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-gray-900 font-semibold shadow-lg shadow-amber-500/30"
                >
                  <Link href={ROUTES.platonicSolids.path}>
                    Explore the Five Solids →
                  </Link>
                </Button>
              </Box>
            </Flex>
          </Card>

          {/* Sacred Patterns Card */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 backdrop-blur-sm border-amber-500/20 p-8 hover:border-amber-500/40 transition-all hover:scale-[1.02]">
            <Flex direction="column" gap="6">
              <Box className="w-full h-64 flex items-center justify-center">
                <Image
                  src="/images/geometries/sacred-patterns/flower-of-life/flower-of-life-primary.svg"
                  alt="Sacred Patterns"
                  width={200}
                  height={200}
                  className="object-contain"
                  style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
                />
              </Box>

              <Heading size="7" className="text-amber-100">
                {ROUTES.sacredPatterns.name}
              </Heading>

              <Text className="text-blue-200">
                {ROUTES.sacredPatterns.description}
              </Text>

              <Text size="2" className="text-blue-300">
                Recurring patterns found across cultures and throughout history—from the Flower
                of Life to Metatron&apos;s Cube. These geometries encode divine proportions like the
                Golden Ratio and appear in nature, architecture, and consciousness itself.
              </Text>

              <Box>
                <Button
                  asChild
                  size="3"
                  className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-gray-900 font-semibold shadow-lg shadow-amber-500/30"
                >
                  <Link href={ROUTES.sacredPatterns.path}>
                    Discover the Patterns →
                  </Link>
                </Button>
              </Box>
            </Flex>
          </Card>
        </Grid>

        {/* Additional Context */}
        <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-8 max-w-4xl mx-auto mt-16">
          <Heading size="6" className="text-amber-300 mb-4">
            Why Sacred Geometry?
          </Heading>
          <Text className="text-blue-200 mb-4">
            Sacred geometry is the study of geometric forms and their metaphysical meanings.
            These shapes and patterns are considered &quot;sacred&quot; because they appear to be
            fundamental to the structure of the universe itself.
          </Text>
          <Text className="text-blue-200">
            From the spiral of a nautilus shell to the hexagonal structure of a snowflake,
            from the proportions of the human body to the orbits of planets—these same
            mathematical relationships appear again and again. Understanding these patterns
            offers insight into the deep order underlying apparent chaos.
          </Text>
        </Card>
      </div>
    </main>
  );
}
