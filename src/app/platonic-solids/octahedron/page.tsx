import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { SolidNavigation } from "@/components/solid-navigation";

const DATA = {
  name: "Octahedron",
  slug: "octahedron",
  category: "platonic-solids",
  element: "Air",
  chakra: "Heart",
  faces: 8,
  vertices: 6,
  edges: 12,
  dualOf: "hexahedron",
  featured: true,
  order: 3
}

export default function OctahedronPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header with Image */}
          <Grid columns={{ initial: "1", md: "2" }} gap="8" className="mb-12">
            {/* Text Content */}
            <Flex direction="column" gap="6" justify="center">
              <Heading size="9" className="text-amber-100">
                The Octahedron: Breath of Air
              </Heading>

              <Text size="5" className="text-blue-200">
                The octahedron embodies the element of Air—intellect, communication, and the breath
                of life. It represents perfect balance between the material and the ethereal.
              </Text>
            </Flex>

            {/* Hero Image */}
            <Box className="flex items-center justify-center">
              <Image
                src="/images/geometries/platonic-solids/octahedron/octahedron-3d.svg"
                alt="Octahedron"
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
                <Text className="text-blue-200">Cube (Hexahedron)</Text>
              </Box>
              <Box>
                <Text weight="bold" className="text-amber-200">Order:</Text>
                <Text className="text-blue-200">Third Solid</Text>
              </Box>
            </Grid>

            <Text className="text-blue-200">
              Shaped like two square pyramids joined at their bases, the octahedron represents
              <strong> integration and balance</strong>. One pyramid points to the heavens,
              the other to the earth—perfectly unified at the center. In sacred geometry, it symbolizes:
            </Text>

            <ul className="mt-4 space-y-2 text-blue-200">
              <li>• <strong>Air and breath</strong>, the messenger between realms</li>
              <li>• <strong>The Heart Chakra</strong>, where upper and lower energies meet</li>
              <li>• <strong>Communication and exchange</strong> of ideas and energy</li>
              <li>• <strong>As above, so below</strong>—the hermetic principle</li>
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

            <Text className="text-blue-200">
              The octahedron is the <strong>geometric dual</strong> of the cube. If you place a
              point at the center of each face of a cube and connect them, you create an octahedron.
              This duality represents the profound relationship between Earth (cube) and Air (octahedron)
              —the material and the intellectual, form and thought.
            </Text>
          </Card>

          {/* Visual Representations */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-8 mb-8">
            <Heading size="6" className="text-amber-300 mb-6">Visual Representations</Heading>

            <Grid columns={{ initial: "1", md: "3" }} gap="6">
              <Flex direction="column" gap="3" align="center">
                <Box className="w-full h-40 flex items-center justify-center">
                  <Image
                    src="/images/geometries/platonic-solids/octahedron/octahedron-solid.svg"
                    alt="Octahedron Solid"
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
                    src="/images/geometries/platonic-solids/octahedron/octahedron-primary.svg"
                    alt="Octahedron Wireframe"
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
                    src="/images/geometries/platonic-solids/octahedron/octahedron-net.svg"
                    alt="Octahedron Net"
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
              The octahedral form appears in nature and spiritual practices:
            </Text>

            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">Crystals:</strong> Diamond&apos;s crystal structure
                is based on octahedral geometry
              </li>
              <li>
                <strong className="text-amber-300">Energy Work:</strong> Often used in meditation
                to balance upper and lower chakras
              </li>
              <li>
                <strong className="text-amber-300">Chemistry:</strong> Many molecular structures
                exhibit octahedral coordination
              </li>
              <li>
                <strong className="text-amber-300">Sacred Architecture:</strong> The double pyramid
                form appears in temples symbolizing the meeting of heaven and earth
              </li>
            </ul>
          </Card>

          {/* Navigation */}
          <SolidNavigation currentSolid="octahedron" />
        </div>
      </div>
    </main>
  );
}
