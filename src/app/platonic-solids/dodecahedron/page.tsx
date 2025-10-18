import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SolidNavigation } from "@/components/solid-navigation";
import { getGeometryBySlug } from "@/lib/data";

export default function DodecahedronPage() {
  const geometry = getGeometryBySlug("dodecahedron");

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
                alt={title ?? "Dodecahedron"}
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
                  {relatedBy?.element === "ether" ? "Ether/Spirit" : relatedBy?.element}
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
                  Fourth Solid
                </Text>
              </Flex>
            </Grid>

            <Text className="text-blue-200">
              With twelve pentagonal faces, the dodecahedron is the most complex
              and elegant of the Platonic Solids. Plato associated it with{" "}
              <strong>the heavens and the arrangement of constellations</strong>
              . In sacred geometry, it symbolizes:
            </Text>

            <ul className="mt-4 space-y-2 text-blue-200">
              <li>
                • <strong>Divine consciousness</strong> and universal mind
              </li>
              <li>
                • <strong>The Crown Chakra</strong>, connection to source energy
              </li>
              <li>
                • <strong>The cosmos</strong> and celestial spheres
              </li>
              <li>
                • <strong>Ascension</strong> and spiritual evolution
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
              The dodecahedron embodies the{" "}
              <strong>Golden Ratio (φ ≈ 1.618)</strong> throughout its
              structure. Every edge, face, and angle relates to this divine
              proportion. The pentagon itself contains the golden ratio in the
              relationship between its diagonal and side.
            </Text>

            <Text className="text-blue-200">
              The number twelve appears throughout cosmic and sacred systems:
              twelve zodiac signs, twelve months, twelve apostles, twelve
              tribes—the dodecahedron geometrically encodes this universal
              pattern of completion and cosmic order.
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
                    alt="Dodecahedron Solid"
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
                    alt="Dodecahedron Wireframe"
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
                    alt="Dodecahedron Net"
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
              The dodecahedron appears in profound contexts:
            </Text>

            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">Cosmic Topology:</strong>{" "}
                Some theories suggest our universe may have a dodecahedral shape
              </li>
              <li>
                <strong className="text-amber-300">Viruses:</strong> Many virus
                capsids have icosahedral or dodecahedral symmetry
              </li>
              <li>
                <strong className="text-amber-300">Sacred Artifacts:</strong>{" "}
                Ancient Roman dodecahedrons have been found across Europe, their
                purpose still mysterious
              </li>
              <li>
                <strong className="text-amber-300">Meditation:</strong> Used to
                access higher states of consciousness and cosmic awareness
              </li>
              <li>
                <strong className="text-amber-300">Architecture:</strong> The
                pentagon appears in sacred buildings representing heavenly
                perfection
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
