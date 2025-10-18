import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SolidNavigation } from "@/components/solid-navigation";
import { getGeometryBySlug } from "@/lib/data";

export default function HexahedronPage() {
  const geometry = getGeometryBySlug("hexahedron");

  if (!geometry) {
    notFound();
  }

  const {
    title,
    description,
    images,
    mathProperties,
    relatedBy,
    dualOfTitle,
    slug,
  } = geometry;
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header with Image */}
          <Grid columns={{ initial: "1", md: "2" }} gap="8" className="mb-12">
            {/* Text Content */}
            <Flex direction="column" gap="6" justify="center">
              <Heading size="9" className="text-amber-100">
                {title}
              </Heading>

              <Text size="5" className="text-blue-200">
                {description}
              </Text>
            </Flex>

            {/* Hero Image */}
            <Box className="flex items-center justify-center">
              <Image
                src={images?.heroImage ?? ""}
                alt={title ?? "Hexahedron"}
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

          {/* Sacred Significance */}
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
                  {relatedBy?.element === "earth" ? "Earth" : relatedBy?.element}
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
                  {relatedBy?.chakra}
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
                  {dualOfTitle}
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
                  Second Solid
                </Text>
              </Flex>
            </Grid>

            <Text className="text-blue-200">
              The cube embodies the principle of{" "}
              <strong>stability through right angles</strong>. Its six square
              faces represent the six directions of space—up, down, left, right,
              forward, and backward. In sacred geometry, it symbolizes:
            </Text>

            <ul className="mt-4 space-y-2 text-blue-200">
              <li>
                • <strong>Material reality</strong> and physical manifestation
              </li>
              <li>
                • <strong>Grounding and stability</strong>, like the foundation
                of a building
              </li>
              <li>
                • <strong>The Root Chakra</strong>, our connection to Earth and
                security
              </li>
              <li>
                • <strong>The four elements</strong> plus above and below
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
                  {mathProperties?.faces}
                </Text>
                <Text size="4" weight="medium" className="text-blue-200">
                  Faces
                </Text>
                <Text size="2" className="text-blue-300">
                  {mathProperties?.faceShape}
                </Text>
              </Flex>
              <Flex direction="column" gap="3" align="center" className="p-4">
                <Text size="8" weight="bold" className="text-amber-400">
                  {mathProperties?.vertices}
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
                  {mathProperties?.edges}
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
              The cube is unique among Platonic Solids for its perpendicular
              faces. Every edge meets every other edge at exactly 90 degrees,
              creating perfect stability. This is why we build our homes and
              cities using cubic forms—they naturally resist gravitational
              forces and provide maximum usable space.
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
                    src={images?.solidImage ?? ""}
                    alt="Hexahedron Solid"
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
                    src={images?.wireframeImage ?? ""}
                    alt="Hexahedron Wireframe"
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
                    src={images?.netImage ?? ""}
                    alt="Hexahedron Net"
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
              The cubic form appears throughout nature and human civilization:
            </Text>

            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">Crystals:</strong> Salt
                (halite) and pyrite form natural perfect cubes
              </li>
              <li>
                <strong className="text-amber-300">Architecture:</strong> The
                Kaaba in Mecca, representing the spiritual center of Islam
              </li>
              <li>
                <strong className="text-amber-300">Symbolism:</strong> The
                cornerstone, the building block of civilization
              </li>
              <li>
                <strong className="text-amber-300">Sacred Space:</strong> The
                cube represents the material temple that houses divine
                consciousness
              </li>
            </ul>
          </Card>

          {/* Navigation */}
          <SolidNavigation currentSolid={slug} />
        </div>
      </div>
    </main>
  );
}
