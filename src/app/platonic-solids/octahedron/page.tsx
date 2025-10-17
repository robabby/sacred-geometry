import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { SolidNavigation } from "@/components/solid-navigation";

const DATA = {
  name: "Octahedron",
  slug: "octahedron",
  title: "The Octahedron: Breath of Air",
  description:
    "The octahedron embodies the element of Air—intellect, communication, and the breath of life. It represents perfect balance between the material and the ethereal.",
  heroImage: "/images/geometries/platonic-solids/octahedron/octahedron-3d.svg",
  solidImage:
    "/images/geometries/platonic-solids/octahedron/octahedron-solid.svg",
  wireframeImage:
    "/images/geometries/platonic-solids/octahedron/octahedron-primary.svg",
  netImage: "/images/geometries/platonic-solids/octahedron/octahedron-net.svg",
  category: "platonic-solids",
  element: "Air",
  chakra: "Heart",
  faces: 8,
  faceShape: "Triangular",
  vertices: 6,
  edges: 12,
  dualOf: "hexahedron",
  dualOfTitle: "Cube (Hexahedron)",
  featured: true,
  order: 3,
};

export default function OctahedronPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header with Image */}
          <Grid columns={{ initial: "1", md: "2" }} gap="8" className="mb-12">
            {/* Text Content */}
            <Flex direction="column" gap="6" justify="center">
              <Heading size="9" className="text-amber-100">
                {DATA.title}
              </Heading>

              <Text size="5" className="text-blue-200">
                {DATA.description}
              </Text>
            </Flex>

            {/* Hero Image */}
            <Box className="flex items-center justify-center">
              <Image
                src={DATA.heroImage}
                alt={DATA.name}
                width={400}
                height={400}
                className="object-contain"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)",
                }}
              />
            </Box>
          </Grid>

          <Card className="mb-8 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-8">
            <Heading size="6" className="mb-6 text-amber-300">
              Symbolic Properties
            </Heading>

            <Grid columns={{ initial: "1", sm: "2" }} gap="6" className="mb-8">
              <Flex direction="column" gap="2">
                <Text
                  weight="bold"
                  className="text-sm tracking-wide text-amber-200 uppercase"
                >
                  Element
                </Text>
                <Text size="5" className="text-blue-200">
                  {DATA.element}
                </Text>
              </Flex>
              <Flex direction="column" gap="2">
                <Text
                  weight="bold"
                  className="text-sm tracking-wide text-amber-200 uppercase"
                >
                  Chakra
                </Text>
                <Text size="5" className="text-blue-200">
                  {DATA.chakra}
                </Text>
              </Flex>
              <Flex direction="column" gap="2">
                <Text
                  weight="bold"
                  className="text-sm tracking-wide text-amber-200 uppercase"
                >
                  Dual
                </Text>
                <Text size="5" className="text-blue-200">
                  {DATA.dualOfTitle}
                </Text>
              </Flex>
              <Flex direction="column" gap="2">
                <Text
                  weight="bold"
                  className="text-sm tracking-wide text-amber-200 uppercase"
                >
                  Order
                </Text>
                <Text size="5" className="text-blue-200">
                  Third Solid
                </Text>
              </Flex>
            </Grid>

            <Text className="text-blue-200">
              Shaped like two square pyramids joined at their bases, the
              octahedron represents
              <strong> integration and balance</strong>. One pyramid points to
              the heavens, the other to the earth—perfectly unified at the
              center. In sacred geometry, it symbolizes:
            </Text>

            <ul className="mt-4 space-y-2 text-blue-200">
              <li>
                • <strong>Air and breath</strong>, the messenger between realms
              </li>
              <li>
                • <strong>The Heart Chakra</strong>, where upper and lower
                energies meet
              </li>
              <li>
                • <strong>Communication and exchange</strong> of ideas and
                energy
              </li>
              <li>
                • <strong>As above, so below</strong>—the hermetic principle
              </li>
            </ul>
          </Card>

          {/* Mathematical Properties */}
          <Card className="mb-8 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-8">
            <Heading size="6" className="mb-6 text-amber-300">
              Mathematical Properties
            </Heading>

            <Grid columns={{ initial: "1", sm: "3" }} gap="8" className="mb-8">
              <Flex direction="column" gap="3" align="center" className="p-4">
                <Text size="8" weight="bold" className="text-amber-400">
                  {DATA.faces}
                </Text>
                <Text size="4" weight="medium" className="text-blue-200">
                  Faces
                </Text>
                <Text size="2" className="text-blue-300">
                  {DATA.faceShape}
                </Text>
              </Flex>
              <Flex direction="column" gap="3" align="center" className="p-4">
                <Text size="8" weight="bold" className="text-amber-400">
                  {DATA.vertices}
                </Text>
                <Text size="4" weight="medium" className="text-blue-200">
                  Vertices
                </Text>
                <Text size="2" className="text-blue-300">
                  Corners
                </Text>
              </Flex>
              <Flex direction="column" gap="3" align="center" className="p-4">
                <Text size="8" weight="bold" className="text-amber-400">
                  {DATA.edges}
                </Text>
                <Text size="4" weight="medium" className="text-blue-200">
                  Edges
                </Text>
                <Text size="2" className="text-blue-300">
                  Lines
                </Text>
              </Flex>
            </Grid>

            <Text className="text-blue-200">
              The octahedron is the <strong>geometric dual</strong> of the cube.
              If you place a point at the center of each face of a cube and
              connect them, you create an octahedron. This duality represents
              the profound relationship between Earth (cube) and Air
              (octahedron) —the material and the intellectual, form and thought.
            </Text>
          </Card>

          {/* Visual Representations */}
          <Card className="mb-8 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-8">
            <Heading mb="6" size="6" className="text-amber-300">
              Visual Representations
            </Heading>

            <Grid columns={{ initial: "1", md: "3" }} gap="6">
              <Flex direction="column" gap="3" align="center">
                <Box className="flex items-center justify-center">
                  <Image
                    src={DATA.solidImage}
                    alt="Octahedron Solid"
                    width={150}
                    height={150}
                    className="mx-auto h-40 object-contain"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)",
                    }}
                  />
                </Box>
                <Text weight="bold" className="text-amber-200">
                  Solid View
                </Text>
                <Text size="2" className="text-center text-blue-300">
                  All faces visible
                </Text>
              </Flex>

              <Flex direction="column" gap="3" align="center">
                <Box className="flex items-center justify-center">
                  <Image
                    src={DATA.wireframeImage}
                    alt="Octahedron Wireframe"
                    width={150}
                    height={150}
                    className="mx-auto h-40 object-contain"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)",
                    }}
                  />
                </Box>
                <Text weight="bold" className="text-amber-200">
                  Wireframe
                </Text>
                <Text size="2" className="text-center text-blue-300">
                  Edge structure
                </Text>
              </Flex>

              <Flex direction="column" gap="3" align="center">
                <Box className="flex items-center justify-center">
                  <Image
                    src={DATA.netImage}
                    alt="Octahedron Net"
                    width={150}
                    height={150}
                    className="mx-auto h-40 object-contain"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)",
                    }}
                  />
                </Box>
                <Text weight="bold" className="text-amber-200">
                  Unfolded Net
                </Text>
                <Text size="2" className="text-center text-blue-300">
                  2D pattern
                </Text>
              </Flex>
            </Grid>
          </Card>

          {/* In Nature and Culture */}
          <Card className="border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-8">
            <Heading size="6" className="mb-4 text-amber-300">
              In Nature and Culture
            </Heading>

            <Text className="mb-4 text-blue-200">
              The octahedral form appears in nature and spiritual practices:
            </Text>

            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">Crystals:</strong>{" "}
                Diamond&apos;s crystal structure is based on octahedral geometry
              </li>
              <li>
                <strong className="text-amber-300">Energy Work:</strong> Often
                used in meditation to balance upper and lower chakras
              </li>
              <li>
                <strong className="text-amber-300">Chemistry:</strong> Many
                molecular structures exhibit octahedral coordination
              </li>
              <li>
                <strong className="text-amber-300">Sacred Architecture:</strong>{" "}
                The double pyramid form appears in temples symbolizing the
                meeting of heaven and earth
              </li>
            </ul>
          </Card>

          {/* Navigation */}
          <SolidNavigation currentSolid={DATA.slug} />
        </div>
      </div>
    </main>
  );
}
