import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import { CircleDot } from "lucide-react";
import { ROUTES } from "@/util/routes";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      {/* Hero Section */}
      <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center gap-8 px-4 py-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-4">
            <CircleDot className="h-12 w-12 text-amber-400" />
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Sacred <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Geometry</span>
            </h1>
            <CircleDot className="h-12 w-12 text-amber-400" />
          </div>

          <p className="max-w-2xl text-xl text-blue-200">
            {ROUTES.home.description}
          </p>

          <p className="max-w-3xl text-lg text-blue-300/80">
            Discover the mathematical principles and divine patterns that form the foundation of our universe.
            From the Platonic Solids to the Flower of Life, explore the geometries that have inspired
            mystics, scientists, and artists throughout history.
          </p>
        </div>

        <Flex gap="4" className="mt-8">
          <Button asChild size="4" className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-gray-900 font-semibold shadow-lg shadow-amber-500/30">
            <Link href={ROUTES.geometries.path}>
              Explore All Geometries
            </Link>
          </Button>
          <Button asChild size="4" variant="outline" className="border-amber-400/50 text-amber-300 hover:bg-amber-400/10 hover:border-amber-400">
            <Link href={ROUTES.platonicSolids.path}>
              Platonic Solids
            </Link>
          </Button>
        </Flex>
      </div>

      {/* Featured Sections */}
      <div className="container mx-auto px-4 pb-16">
        <Grid columns={{ initial: "1", md: "2" }} gap="6" className="max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 backdrop-blur-sm border-amber-500/20 p-6 hover:border-amber-500/40 transition-colors">
            <Flex direction="column" gap="4">
              <Box className="w-full h-32 flex items-center justify-center">
                <Image
                  src="/images/geometries/platonic-solids/tetrahedron/tetrahedron-primary.svg"
                  alt="Platonic Solids"
                  width={120}
                  height={120}
                  style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
                />
              </Box>
              <Heading size="6" className="text-amber-100">{ROUTES.platonicSolids.name}</Heading>
              <Text className="text-blue-200">
                {ROUTES.platonicSolids.description}
              </Text>
              <Box>
                <Button asChild variant="soft" className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30">
                  <Link href={ROUTES.platonicSolids.path}>
                    Learn More →
                  </Link>
                </Button>
              </Box>
            </Flex>
          </Card>

          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 backdrop-blur-sm border-amber-500/20 p-6 hover:border-amber-500/40 transition-colors">
            <Flex direction="column" gap="4">
              <Box className="w-full h-32 flex items-center justify-center">
                <Image
                  src="/images/geometries/sacred-patterns/flower-of-life/flower-of-life-primary.svg"
                  alt="Sacred Patterns"
                  width={120}
                  height={120}
                  style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
                />
              </Box>
              <Heading size="6" className="text-amber-100">{ROUTES.sacredPatterns.name}</Heading>
              <Text className="text-blue-200">
                {ROUTES.sacredPatterns.description}
              </Text>
              <Box>
                <Button asChild variant="soft" className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30">
                  <Link href={ROUTES.sacredPatterns.path}>
                    Learn More →
                  </Link>
                </Button>
              </Box>
            </Flex>
          </Card>
        </Grid>
      </div>
    </main>
  );
}
