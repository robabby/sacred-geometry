import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GeometryNavigation } from "@/components/geometry-navigation";
import { getGeometryBySlug, getPlatonicSolids } from "@/lib/data";
import { getPlatonicSolidContent } from "@/lib/content";
import { DetailHero, HeroText, HeroGeometry } from "@/components/detail-hero";
import { PulsingGeometry, VisualRepCard } from "@/components/pulsing-geometry";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { AnimatedCard } from "@/components/animated-card";

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
  const mdxContent = await getPlatonicSolidContent(slug);

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
  } = geometry;

  return (
    <main className="min-h-screen bg-[var(--color-obsidian)] text-[var(--color-cream)]">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header with Image */}
          <DetailHero>
            <Grid columns={{ initial: "1", md: "2" }} gap="8" className="mb-12">
              {/* Text Content */}
              <HeroText>
                <Flex direction="column" gap="6" justify="center">
                  <Heading size="9" className="font-display text-[var(--color-cream)]">
                    {title}
                  </Heading>

                  <Text size="5" className="text-[var(--color-gold)]">
                    {description}
                  </Text>
                </Flex>
              </HeroText>

              {/* Hero Image */}
              <HeroGeometry className="flex items-center justify-center">
                <PulsingGeometry>
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
                </PulsingGeometry>
              </HeroGeometry>
            </Grid>
          </DetailHero>

          {/* Visual Representations */}
          <AnimateOnScroll>
            <AnimatedCard className="mb-8 p-8">
              <Heading mb="6" size="6" className="font-heading text-[var(--color-gold)]">
                Visual Representations
              </Heading>

              <Grid columns={{ initial: "1", md: "3" }} gap="6">
                <VisualRepCard index={0}>
                  <Flex direction="column" gap="3" align="center">
                    <PulsingGeometry interactive={false} className="flex items-center justify-center">
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
                    </PulsingGeometry>
                    <Text weight="bold" className="text-[var(--color-gold-bright)]">
                      Solid View
                    </Text>
                    <Text size="2" className="text-center text-[var(--color-warm-gray)]">
                      All faces visible
                    </Text>
                  </Flex>
                </VisualRepCard>

                <VisualRepCard index={1}>
                  <Flex direction="column" gap="3" align="center">
                    <PulsingGeometry interactive={false} className="flex items-center justify-center">
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
                    </PulsingGeometry>
                    <Text weight="bold" className="text-[var(--color-gold-bright)]">
                      Wireframe
                    </Text>
                    <Text size="2" className="text-center text-[var(--color-warm-gray)]">
                      Edge structure
                    </Text>
                  </Flex>
                </VisualRepCard>

                <VisualRepCard index={2}>
                  <Flex direction="column" gap="3" align="center">
                    <PulsingGeometry interactive={false} className="flex items-center justify-center">
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
                    </PulsingGeometry>
                    <Text weight="bold" className="text-[var(--color-gold-bright)]">
                      Unfolded Net
                    </Text>
                    <Text size="2" className="text-center text-[var(--color-warm-gray)]">
                      2D pattern
                    </Text>
                  </Flex>
                </VisualRepCard>
              </Grid>
            </AnimatedCard>
          </AnimateOnScroll>

          {/* Mathematical Properties */}
          <AnimateOnScroll delay={0.1}>
            <AnimatedCard className="mb-8 p-8">
              <Heading size="6" className="font-heading text-[var(--color-gold)]" mb="6">
                Mathematical Properties
              </Heading>

              <Grid columns={{ initial: "1", sm: "3" }} gap="8">
                <Flex direction="column" gap="3" align="center" className="p-4">
                  <Text size="8" weight="bold" className="text-[var(--color-gold)]">
                    {mathProperties?.faces}
                  </Text>
                  <Text size="4" weight="medium" className="text-[var(--color-cream)]">
                    Faces
                  </Text>
                  <Text size="2" className="text-[var(--color-warm-gray)]">
                    {mathProperties?.faceShape}
                  </Text>
                </Flex>
                <Flex direction="column" gap="3" align="center" className="p-4">
                  <Text size="8" weight="bold" className="text-[var(--color-gold)]">
                    {mathProperties?.vertices}
                  </Text>
                  <Text size="4" weight="medium" className="text-[var(--color-cream)]">
                    Vertices
                  </Text>
                  <Text size="2" className="text-[var(--color-warm-gray)]">
                    Corners
                  </Text>
                </Flex>
                <Flex direction="column" gap="3" align="center" className="p-4">
                  <Text size="8" weight="bold" className="text-[var(--color-gold)]">
                    {mathProperties?.edges}
                  </Text>
                  <Text size="4" weight="medium" className="text-[var(--color-cream)]">
                    Edges
                  </Text>
                  <Text size="2" className="text-[var(--color-warm-gray)]">
                    Lines
                  </Text>
                </Flex>
              </Grid>
            </AnimatedCard>
          </AnimateOnScroll>

          {/* Symbolic Properties Metadata */}
          <AnimateOnScroll delay={0.2}>
            <AnimatedCard className="mb-8 p-8">
              <Heading size="6" className="font-heading text-[var(--color-gold)]" mb="6">
                Associations
              </Heading>

              <Grid columns={{ initial: "1", sm: "2" }} gap="6">
                <Flex direction="column" gap="2">
                  <Text
                    weight="bold"
                    className="text-sm uppercase tracking-wide text-[var(--color-gold-bright)]"
                  >
                    Element
                  </Text>
                  <Text size="5" className="text-[var(--color-cream)]">
                    {relatedBy?.element
                      ? relatedBy.element.charAt(0).toUpperCase() +
                        relatedBy.element.slice(1)
                      : "N/A"}
                  </Text>
                </Flex>
                <Flex direction="column" gap="2">
                  <Text
                    weight="bold"
                    className="text-sm uppercase tracking-wide text-[var(--color-gold-bright)]"
                  >
                    Dual
                  </Text>
                  <Text size="5" className="text-[var(--color-cream)]">
                    {dualOfTitle}
                  </Text>
                </Flex>
              </Grid>
            </AnimatedCard>
          </AnimateOnScroll>

          {/* MDX Content - Narrative sections */}
          {mdxContent ? (
            <Box>{mdxContent.content}</Box>
          ) : (
            <Box className="text-center text-blue-300">
              <Text>Content coming soon...</Text>
            </Box>
          )}

          {/* Navigation */}
          <GeometryNavigation currentSlug={slug} category="platonic" />
        </div>
      </div>
    </main>
  );
}
