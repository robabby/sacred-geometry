import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { SolidNavigation } from "@/components/solid-navigation";

const DATA = {
  name: "Tetrahedron",
  slug: "tetrahedron",
  category: "platonic-solids",
  element: "Fire",
  chakra: "Solar Plexus",
  faces: 4,
  vertices: 4,
  edges: 6,
  dualOf: "tetrahedron",
  featured: true,
  order: 1
}

export default function TetrahedronPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header with Image */}
          <Grid columns={{ initial: "1", md: "2" }} gap="8" className="mb-12">
            {/* Text Content */}
            <Flex direction="column" gap="6" justify="center">
              <Heading size="9" className="text-amber-100">
                The Tetrahedron: Gateway of Fire
              </Heading>

              <Text size="5" className="text-blue-200">
                The tetrahedron is the first Platonic Solid, the simplest three-dimensional form that can exist.
                Imagine consciousness taking its first step from the flat plane into depth—this is that moment crystallized.
              </Text>
            </Flex>

            {/* Hero Image */}
            <Box className="flex items-center justify-center">
              <Image
                src="/images/geometries/platonic-solids/tetrahedron/tetrahedron-3d.svg"
                alt="Tetrahedron"
                width={400}
                height={400}
                className="object-contain"
                style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
              />
            </Box>
          </Grid>

          {/* Sacred Significance */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-8 mb-8">
            <Heading size="6" className="text-amber-300 mb-4">Sacred Significance</Heading>

            <Grid columns="2" gap="4" className="mb-6">
              <Box>
                <Text weight="bold" className="text-amber-200">Element:</Text>
                <Text className="text-blue-200">{DATA.element}</Text>
              </Box>
              <Box>
                <Text weight="bold" className="text-amber-200">Chakra:</Text>
                <Text className="text-blue-200">{DATA.chakra}</Text>
              </Box>
              <Box>
                <Text weight="bold" className="text-amber-200">Dual:</Text>
                <Text className="text-blue-200">Self-dual (Tetrahedron)</Text>
              </Box>
              <Box>
                <Text weight="bold" className="text-amber-200">Order:</Text>
                <Text className="text-blue-200">First Solid</Text>
              </Box>
            </Grid>

            <Text className="text-blue-200">
              In the language of sacred geometry, the tetrahedron speaks of <strong>fire and transformation</strong>.
              With only four faces, it represents the minimum number of surfaces needed to enclose space.
              This makes it the foundation of all three-dimensional reality.
            </Text>

            <ul className="mt-4 space-y-2 text-blue-200">
              <li>• <strong>Fire and transformation</strong>, the spark of creation</li>
              <li>• <strong>Stability through tension</strong>, like a tripod that never wobbles</li>
              <li>• <strong>The Solar Plexus Chakra</strong>, our center of personal power</li>
              <li>• <strong>The number 4</strong>, representing foundation and structure</li>
            </ul>
          </Card>

          {/* Mathematical Properties */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-8 mb-8">
            <Heading size="6" className="text-amber-300 mb-4">Mathematical Properties</Heading>

            <Grid columns="3" gap="6" className="mb-6">
              <Box className="text-center">
                <Text size="8" weight="bold" className="text-amber-400">{DATA.faces}</Text>
                <Text className="text-blue-200">Faces</Text>
                <Text size="1" className="text-blue-300">Triangular</Text>
              </Box>
              <Box className="text-center">
                <Text size="8" weight="bold" className="text-amber-400">{DATA.vertices}</Text>
                <Text className="text-blue-200">Vertices</Text>
                <Text size="1" className="text-blue-300">Corners</Text>
              </Box>
              <Box className="text-center">
                <Text size="8" weight="bold" className="text-amber-400">{DATA.edges}</Text>
                <Text className="text-blue-200">Edges</Text>
                <Text size="1" className="text-blue-300">Lines</Text>
              </Box>
            </Grid>

            <Text className="text-blue-200 mb-4">
              The tetrahedron embodies the principle of <strong>minimal complexity</strong>. With its 4 faces,
              4 vertices, and 6 edges, it is the simplest possible polyhedron. Remarkably, it is
              <strong> self-dual</strong>—its dual is another tetrahedron, rotated inside the original.
            </Text>

            <Text className="text-blue-200">
              Every vertex connects to every other vertex—a complete graph in three dimensions. This
              represents total interconnection, where every point relates directly to all others.
              No simpler structure can achieve this.
            </Text>
          </Card>

          {/* Visual Representations */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-8 mb-8">
            <Heading size="6" className="text-amber-300 mb-6">Visual Representations</Heading>

            <Grid columns={{ initial: "1", md: "3" }} gap="6">
              <Flex direction="column" gap="3" align="center">
                <Box className="w-full h-40 flex items-center justify-center">
                  <Image
                    src="/images/geometries/platonic-solids/tetrahedron/tetrahedron-solid.svg"
                    alt="Tetrahedron Solid"
                    width={150}
                    height={150}
                    className="object-contain"
                    style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
                  />
                </Box>
                <Text weight="bold" className="text-amber-200">Solid View</Text>
                <Text size="2" className="text-blue-300 text-center">All faces visible</Text>
              </Flex>

              <Flex direction="column" gap="3" align="center">
                <Box className="w-full h-40 flex items-center justify-center">
                  <Image
                    src="/images/geometries/platonic-solids/tetrahedron/tetrahedron-wireframe.svg"
                    alt="Tetrahedron Wireframe"
                    width={150}
                    height={150}
                    className="object-contain"
                    style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
                  />
                </Box>
                <Text weight="bold" className="text-amber-200">Wireframe</Text>
                <Text size="2" className="text-blue-300 text-center">Edge structure</Text>
              </Flex>

              <Flex direction="column" gap="3" align="center">
                <Box className="w-full h-40 flex items-center justify-center">
                  <Image
                    src="/images/geometries/platonic-solids/tetrahedron/tetrahedron-net.svg"
                    alt="Tetrahedron Net"
                    width={150}
                    height={150}
                    className="object-contain"
                    style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
                  />
                </Box>
                <Text weight="bold" className="text-amber-200">Unfolded Net</Text>
                <Text size="2" className="text-blue-300 text-center">2D pattern</Text>
              </Flex>
            </Grid>
          </Card>

          {/* In Nature and Culture */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-8">
            <Heading size="6" className="text-amber-300 mb-4">In Nature and Culture</Heading>

            <Text className="text-blue-200 mb-4">
              The tetrahedral form appears throughout nature and sacred traditions:
            </Text>

            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">Chemistry:</strong> The carbon atom in methane (CH₄)
                forms a perfect tetrahedron
              </li>
              <li>
                <strong className="text-amber-300">Crystals:</strong> Diamond&apos;s crystal structure
                is based on tetrahedral geometry
              </li>
              <li>
                <strong className="text-amber-300">Engineering:</strong> The pyramid form provides
                maximum strength with minimum material
              </li>
              <li>
                <strong className="text-amber-300">Symbolism:</strong> Represents the element of fire
                in Greek philosophy—sharp, active, ascending
              </li>
            </ul>
          </Card>

          {/* Navigation */}
          <SolidNavigation currentSolid="tetrahedron" />
        </div>
      </div>
    </main>
  );
}
