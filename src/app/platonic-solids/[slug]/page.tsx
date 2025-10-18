import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GeometryNavigation } from "@/components/geometry-navigation";
import { getGeometryBySlug, getPlatonicSolids } from "@/lib/data";
import { getPlatonicSolidContent, formatText } from "@/lib/content";

export async function generateStaticParams() {
  return getPlatonicSolids().map((solid) => ({
    slug: solid.slug,
  }));
}

export default async function PlatonicSolidPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const geometry = getGeometryBySlug(slug);
  const content = getPlatonicSolidContent(slug);

  if (!geometry || !content) {
    notFound();
  }

  const {
    title,
    description,
    images,
    mathProperties,
    relatedBy,
    dualOfTitle,
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
                alt={title ?? "Platonic Solid"}
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

          {/* Symbolic Properties */}
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
                  {relatedBy?.element
                    ? relatedBy.element.charAt(0).toUpperCase() +
                      relatedBy.element.slice(1)
                    : "N/A"}
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
                  {content.order}
                </Text>
              </Flex>
            </Grid>

            <Text
              className="text-blue-200"
              dangerouslySetInnerHTML={{
                __html: formatText(content.symbolic.introduction),
              }}
            />

            <ul className="mt-4 space-y-2 text-blue-200">
              {content.symbolic.associations.map((association, index) => (
                <li
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: `• ${formatText(association)}`,
                  }}
                />
              ))}
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

            {content.mathematical.insights.map((insight, index) => (
              <Text
                key={index}
                className={`text-blue-200 ${index > 0 ? "mt-4" : ""}`}
                dangerouslySetInnerHTML={{ __html: formatText(insight) }}
              />
            ))}
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
                    alt={`${title} Solid`}
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
                    alt={`${title} Wireframe`}
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
                    alt={`${title} Net`}
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

            <Text
              className="mb-4 text-blue-200"
              dangerouslySetInnerHTML={{
                __html: formatText(content.nature.introduction),
              }}
            />

            <ul className="space-y-3 text-blue-200">
              {content.nature.examples.map((example, index) => (
                <li key={index}>
                  <strong className="text-amber-300">{example.category}:</strong>{" "}
                  {example.description}
                </li>
              ))}
            </ul>
          </Card>

          {/* Navigation */}
          <GeometryNavigation currentSlug={slug} category="platonic" />
        </div>
      </div>
    </main>
  );
}
