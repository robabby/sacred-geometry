import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GeometryNavigation } from "@/components/geometry-navigation";
import { getGeometryBySlug, getSacredPatterns } from "@/lib/data";
import { getSacredPatternContent } from "@/lib/content";

/**
 * Generate static params for all Sacred Patterns
 */
export async function generateStaticParams() {
  return getSacredPatterns().map((pattern) => ({
    slug: pattern.slug,
  }));
}

/**
 * Generate metadata for Sacred Pattern pages
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const geometry = getGeometryBySlug(slug);

  if (!geometry) {
    return {
      title: "Sacred Pattern Not Found",
    };
  }

  return {
    title: `${geometry.name} | Sacred Geometry`,
    description: geometry.description,
  };
}

/**
 * Sacred Pattern Detail Page (Dynamic Route)
 */
export default async function SacredPatternPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Load geometry data from data model
  const geometry = getGeometryBySlug(slug);

  // Load MDX content
  const mdxContent = await getSacredPatternContent(slug);

  if (!geometry) {
    notFound();
  }

  const { title, description, images, name } = geometry;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section - Data from geometry model */}
          <Grid
            columns={{ initial: "1", md: "2" }}
            gap={{ initial: "6", md: "8" }}
            className="mb-8 sm:mb-12"
          >
            <Flex direction="column" gap="6" justify="center">
              <Heading
                size={{ initial: "7", md: "9" }}
                className="text-amber-100"
              >
                {title ?? name}
              </Heading>
              <Text size={{ initial: "3", md: "5" }} className="text-blue-200">
                {description}
              </Text>
            </Flex>

            {/* Hero Image */}
            <div className="flex items-center justify-center">
              <Image
                src={images?.heroImage ?? ""}
                alt={name}
                width={400}
                height={400}
                className="w-full max-w-md object-contain"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)",
                }}
              />
            </div>
          </Grid>

          {/* MDX Content - Narrative sections */}
          {mdxContent ? (
            <Box>{mdxContent.content}</Box>
          ) : (
            <Box className="text-center text-blue-300">
              <Text>Content coming soon...</Text>
            </Box>
          )}

          {/* Navigation */}
          <GeometryNavigation currentSlug={slug} category="pattern" />
        </div>
      </div>
    </main>
  );
}
