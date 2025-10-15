import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { SolidNavigation } from "@/components/solid-navigation";

const DATA = {
  name: "Icosahedron",
  slug: "icosahedron",
  category: "platonic-solids",
  element: "Water",
  chakra: "Sacral",
  faces: 20,
  vertices: 12,
  edges: 30,
  dualOf: "dodecahedron",
  featured: true,
  order: 5
}

export default function IcosahedronPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header with Image */}
          <Grid columns={{ initial: "1", md: "2" }} gap="8" className="mb-12">
            {/* Text Content */}
            <Flex direction="column" gap="6" justify="center">
              <Heading size="9" className="text-amber-100">
                The Icosahedron: Flow of Water
              </Heading>

              <Text size="5" className="text-blue-200">
                The icosahedron embodies the element of Water—emotion, fluidity, and adaptability.
                It is the shape of flow and transformation, rolling smoothly like water itself.
              </Text>
            </Flex>

            {/* Hero Image */}
            <Box className="flex items-center justify-center">
              <Image
                src="/images/geometries/platonic-solids/icosahedron/icosahedron-3d.svg"
                alt="Icosahedron"
                width={400}
                height={400}
                className="object-contain"
                style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
              />
            </Box>
          </Grid>

          {/* Sacred Significance */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-8 mb-8">
            <Heading size="6" className="text-amber-300 mb-6">Sacred Significance</Heading>

            <Grid columns={{ initial: "1", sm: "2" }} gap="6" className="mb-8">
              <Flex direction="column" gap="2">
                <Text weight="bold" className="text-amber-200 text-sm uppercase tracking-wide">Element</Text>
                <Text size="5" className="text-blue-200">{DATA.element}</Text>
              </Flex>
              <Flex direction="column" gap="2">
                <Text weight="bold" className="text-amber-200 text-sm uppercase tracking-wide">Chakra</Text>
                <Text size="5" className="text-blue-200">{DATA.chakra}</Text>
              </Flex>
              <Flex direction="column" gap="2">
                <Text weight="bold" className="text-amber-200 text-sm uppercase tracking-wide">Dual</Text>
                <Text size="5" className="text-blue-200">Dodecahedron</Text>
              </Flex>
              <Flex direction="column" gap="2">
                <Text weight="bold" className="text-amber-200 text-sm uppercase tracking-wide">Order</Text>
                <Text size="5" className="text-blue-200">Fifth Solid</Text>
              </Flex>
            </Grid>

            <Text className="text-blue-200">
              With twenty triangular faces, the icosahedron is the <strong>most spherical</strong>
              of the Platonic Solids—approaching the perfect fluidity of a sphere. This quality
              makes it the ideal representation of water. In sacred geometry, it symbolizes:
            </Text>

            <ul className="mt-4 space-y-2 text-blue-200">
              <li>• <strong>Water and emotions</strong>, the flow of feeling</li>
              <li>• <strong>The Sacral Chakra</strong>, center of creativity and emotion</li>
              <li>• <strong>Transformation and adaptability</strong>, like water taking any shape</li>
              <li>• <strong>Life force</strong> and the primordial waters of creation</li>
            </ul>
          </Card>

          {/* Mathematical Properties */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-8 mb-8">
            <Heading size="6" className="text-amber-300 mb-6">Mathematical Properties</Heading>

            <Grid columns={{ initial: "1", sm: "3" }} gap="8" className="mb-8">
              <Flex direction="column" gap="3" align="center" className="p-4">
                <Text size="8" weight="bold" className="text-amber-400">{DATA.faces}</Text>
                <Text size="4" weight="medium" className="text-blue-200">Faces</Text>
                <Text size="2" className="text-blue-300">Triangular</Text>
              </Flex>
              <Flex direction="column" gap="3" align="center" className="p-4">
                <Text size="8" weight="bold" className="text-amber-400">{DATA.vertices}</Text>
                <Text size="4" weight="medium" className="text-blue-200">Vertices</Text>
                <Text size="2" className="text-blue-300">Corners</Text>
              </Flex>
              <Flex direction="column" gap="3" align="center" className="p-4">
                <Text size="8" weight="bold" className="text-amber-400">{DATA.edges}</Text>
                <Text size="4" weight="medium" className="text-blue-200">Edges</Text>
                <Text size="2" className="text-blue-300">Lines</Text>
              </Flex>
            </Grid>

            <Text className="text-blue-200 mb-4">
              The icosahedron is the <strong>dual</strong> of the dodecahedron—where spirit
              (dodecahedron) meets matter through emotion (icosahedron). Together they represent
              the dance between consciousness and feeling, thought and sensation.
            </Text>

            <Text className="text-blue-200">
              It has the greatest number of faces among the Platonic Solids, giving it the
              largest surface area relative to its volume. This makes it <strong>the most
              efficient for containing and moving</strong>—just like water molecules arranging
              themselves for optimal flow.
            </Text>
          </Card>

          {/* Visual Representations */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-8 mb-8">
            <Heading mb="6" size="6" className="text-amber-300">Visual Representations</Heading>

            <Grid columns={{ initial: "1", md: "3" }} gap="6">
              <Flex direction="column" gap="3" align="center">
                <Box className="flex items-center justify-center">
                  <Image
                    src="/images/geometries/platonic-solids/icosahedron/icosahedron-solid.svg"
                    alt="Icosahedron Solid"
                    width={150}
                    height={150}
                    className="h-40 object-contain mx-auto"
                    style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
                  />
                </Box>
                <Text weight="bold" className="text-amber-200">Solid View</Text>
                <Text size="2" className="text-blue-300 text-center">All faces visible</Text>
              </Flex>

              <Flex direction="column" gap="3" align="center">
                <Box className="flex items-center justify-center">
                  <Image
                    src="/images/geometries/platonic-solids/icosahedron/icosahedron-wireframe.svg"
                    alt="Icosahedron Wireframe"
                    width={150}
                    height={150}
                    className="h-40 object-contain mx-auto"
                    style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
                  />
                </Box>
                <Text weight="bold" className="text-amber-200">Wireframe</Text>
                <Text size="2" className="text-blue-300 text-center">Edge structure</Text>
              </Flex>

              <Flex direction="column" gap="3" align="center">
                <Box className="flex items-center justify-center">
                  <Image
                    src="/images/geometries/platonic-solids/icosahedron/icosahedron-net.svg"
                    alt="Icosahedron Net"
                    width={150}
                    height={150}
                    className="h-40 object-contain mx-auto"
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
              The icosahedral form appears throughout nature and science:
            </Text>

            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">Water Structure:</strong> Researchers have
                found water molecules can form icosahedral clusters
              </li>
              <li>
                <strong className="text-amber-300">Geodesic Domes:</strong> Buckminster Fuller&apos;s
                geodesic structures are based on icosahedral geometry
              </li>
              <li>
                <strong className="text-amber-300">Biology:</strong> Many viruses and radiolaria
                (marine organisms) exhibit icosahedral symmetry
              </li>
              <li>
                <strong className="text-amber-300">Planetology:</strong> Some planetary features
                and gravitational models use icosahedral grids
              </li>
              <li>
                <strong className="text-amber-300">Gaming:</strong> The twenty-sided die (d20)
                brings this sacred form into play
              </li>
            </ul>
          </Card>

          {/* Navigation */}
          <SolidNavigation currentSolid="icosahedron" />
        </div>
      </div>
    </main>
  );
}
