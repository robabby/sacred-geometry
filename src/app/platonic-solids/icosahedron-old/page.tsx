import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SolidNavigation } from "@/components/solid-navigation";
import { getGeometryBySlug } from "@/lib/data";

export default function IcosahedronPage() {
  const geometry = getGeometryBySlug("icosahedron");

  if (!geometry) {
    notFound();
  }

  const {
    name,
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
                alt={name ?? "Icosahedron"}
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
                  {relatedBy?.element === "water" ? "Water" : relatedBy?.element}
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
                  Fifth Solid
                </Text>
              </Flex>
            </Grid>

            <Text className="text-blue-200">
              With twenty triangular faces, the icosahedron is the{" "}
              <strong>most spherical</strong>
              of the Platonic Solids—approaching the perfect fluidity of a
              sphere. This quality makes it the ideal representation of water.
              In sacred geometry, it symbolizes:
            </Text>

            <ul className="mt-4 space-y-2 text-blue-200">
              <li>
                • <strong>Water and emotions</strong>, the flow of feeling
              </li>
              <li>
                • <strong>The Sacral Chakra</strong>, center of creativity and
                emotion
              </li>
              <li>
                • <strong>Transformation and adaptability</strong>, like water
                taking any shape
              </li>
              <li>
                • <strong>Life force</strong> and the primordial waters of
                creation
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

            <Text className="mb-4 text-blue-200">
              The icosahedron is the <strong>dual</strong> of the
              dodecahedron—where spirit (dodecahedron) meets matter through
              emotion (icosahedron). Together they represent the dance between
              consciousness and feeling, thought and sensation.
            </Text>

            <Text className="text-blue-200">
              It has the greatest number of faces among the Platonic Solids,
              giving it the largest surface area relative to its volume. This
              makes it{" "}
              <strong>the most efficient for containing and moving</strong>—just
              like water molecules arranging themselves for optimal flow.
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
                    alt="Icosahedron Solid"
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
                    alt="Icosahedron Wireframe"
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
                    alt="Icosahedron Net"
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
              The icosahedral form appears throughout nature and science:
            </Text>

            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">Water Structure:</strong>{" "}
                Researchers have found water molecules can form icosahedral
                clusters
              </li>
              <li>
                <strong className="text-amber-300">Geodesic Domes:</strong>{" "}
                Buckminster Fuller&apos;s geodesic structures are based on
                icosahedral geometry
              </li>
              <li>
                <strong className="text-amber-300">Biology:</strong> Many
                viruses and radiolaria (marine organisms) exhibit icosahedral
                symmetry
              </li>
              <li>
                <strong className="text-amber-300">Planetology:</strong> Some
                planetary features and gravitational models use icosahedral
                grids
              </li>
              <li>
                <strong className="text-amber-300">Gaming:</strong> The
                twenty-sided die (d20) brings this sacred form into play
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
