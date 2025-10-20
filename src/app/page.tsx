import { Button, Callout, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import {
  CircleDot,
  InfoIcon,
  Sparkles,
  Triangle,
  Droplets,
  Box as BoxIcon,
  Octagon,
} from "lucide-react";
import { ROUTES } from "@/util/routes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  getPlatonicSolids,
  getSacredPatterns,
  getGeometryPath,
} from "@/lib/data";
import { SearchCommandTrigger } from "@/components/search-command-trigger";

// Icon mapping for Platonic Solids
const iconMap: Record<string, typeof Triangle> = {
  tetrahedron: Triangle,
  hexahedron: BoxIcon,
  octahedron: Octagon,
  dodecahedron: Sparkles,
  icosahedron: Droplets,
};

// Color mapping for Platonic Solids
const colorMap: Record<string, string> = {
  tetrahedron: "text-red-400",
  hexahedron: "text-green-400",
  octahedron: "text-cyan-400",
  dodecahedron: "text-purple-400",
  icosahedron: "text-blue-400",
};

const platonicSolids = getPlatonicSolids()
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  .map((solid) => ({
    id: solid.id,
    name: solid.name,
    path: getGeometryPath(solid),
    element: solid.relatedBy?.element
      ? solid.relatedBy.element.charAt(0).toUpperCase() +
        solid.relatedBy.element.slice(1)
      : "Unknown",
    faces: solid.mathProperties?.faces ?? 0,
    icon: iconMap[solid.slug] ?? Triangle,
    image: solid.images?.heroImage ?? "",
    color: colorMap[solid.slug] ?? "text-amber-400",
  }));

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      {/* Hero Section */}
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-12 sm:min-h-[70vh] sm:gap-8 sm:py-16">
        <div className="flex flex-col items-center gap-4 text-center sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <CircleDot className="h-8 w-8 text-amber-400 sm:h-12 sm:w-12" />
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[5rem]">
              Sacred{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Geometry
              </span>
            </h1>
            <CircleDot className="h-8 w-8 text-amber-400 sm:h-12 sm:w-12" />
          </div>

          <Callout.Root>
            <Callout.Icon>
              <InfoIcon />
            </Callout.Icon>
            <Callout.Text>
              All text content on this site is AI generated, and may not be factually correct. This site is for educational and illustrative purposes only.
            </Callout.Text>
          </Callout.Root>

          <p className="max-w-2xl px-4 text-base text-blue-200 sm:text-xl">
            {ROUTES.home.description}
          </p>

          <div className="flex flex-wrap justify-center gap-2 px-4">
            <Badge
              variant="outline"
              className="border-amber-500/30 bg-amber-500/10 text-xs text-amber-300 sm:text-sm"
            >
              5 Platonic Solids
            </Badge>
            <Badge
              variant="outline"
              className="border-amber-500/30 bg-amber-500/10 text-xs text-amber-300 sm:text-sm"
            >
              Sacred Patterns
            </Badge>
            <Badge
              variant="outline"
              className="border-amber-500/30 bg-amber-500/10 text-xs text-amber-300 sm:text-sm"
            >
              Golden Ratio
            </Badge>
          </div>

          <p className="max-w-3xl px-4 text-sm text-blue-300/80 sm:text-lg">
            Discover the mathematical principles and divine patterns that form
            the foundation of our universe. From the Platonic Solids to the
            Flower of Life, explore the geometries that have inspired mystics,
            scientists, and artists throughout history.
          </p>

          {/* Search Command */}
          <div className="w-full px-4 sm:px-0 sm:w-auto sm:max-w-md">
            <SearchCommandTrigger />
          </div>
        </div>

        <Flex
          gap="3 sm:gap-4"
          className="mt-4 w-full flex-col px-4 sm:mt-8 sm:w-auto sm:flex-row"
        >
          <Button
            asChild
            size="3"
            mb={{ xs: "4", md: "0" }}
            mr={{ xs: "0", md: "4" }}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 font-semibold text-gray-900 shadow-lg shadow-amber-500/30 hover:from-amber-600 hover:to-yellow-700 sm:w-auto"
          >
            <Link href={ROUTES.platonicSolids.path}>
              <span className="hidden sm:inline">
                Explore Platonic Solids →
              </span>
              <span className="sm:hidden">Platonic Solids →</span>
            </Link>
          </Button>
          <Button
            asChild
            size="3"
            variant="outline"
            className="w-full border-amber-400/50 text-amber-300 hover:border-amber-400 hover:bg-amber-400/10 sm:w-auto"
          >
            <Link href={ROUTES.sacredPatterns.path}>Sacred Patterns →</Link>
          </Button>
        </Flex>
      </div>

      <Separator className="bg-amber-500/20" />

      {/* Interactive Tabs Section */}
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="solids" className="mx-auto max-w-6xl">
          <TabsList className="grid w-full grid-cols-2 border border-amber-500/20 bg-blue-950/50">
            <TabsTrigger
              value="solids"
              className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
            >
              Platonic Solids
            </TabsTrigger>
            <TabsTrigger
              value="patterns"
              className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
            >
              Sacred Patterns
            </TabsTrigger>
          </TabsList>

          {/* Platonic Solids Tab */}
          <TabsContent value="solids" className="mt-6 sm:mt-8">
            <div className="mb-6 px-4 text-center sm:mb-8">
              <Heading
                size={{ initial: "6", sm: "7" }}
                className="mb-2 text-amber-100 sm:mb-3"
              >
                The Five Perfect Solids
              </Heading>
              <Text size={{ initial: "2", sm: "3" }} className="text-blue-200">
                Each solid represents a fundamental element and possesses
                complete geometric regularity
              </Text>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
              {platonicSolids.map((solid) => {
                const Icon = solid.icon;
                return (
                  <Link key={solid.name} href={solid.path}>
                    <div className="cursor-pointer rounded-lg border border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-3 transition-all hover:scale-105 hover:border-amber-500/40 sm:p-4">
                      <div className="flex flex-col items-center gap-2 sm:gap-3">
                        <div className="flex h-16 w-full items-center justify-center sm:h-24">
                          <Image
                            src={solid.image}
                            alt={solid.name}
                            width={60}
                            height={60}
                            className="object-contain sm:h-20 sm:w-20"
                            style={{
                              filter:
                                "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)",
                            }}
                          />
                        </div>
                        <Icon
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${solid.color}`}
                        />
                        <Text className="text-center text-[10px] leading-tight font-medium text-amber-200 sm:text-xs">
                          {solid.name}
                        </Text>
                        <Badge
                          variant="secondary"
                          className="bg-blue-900/50 px-1.5 py-0.5 text-[10px] sm:text-xs"
                        >
                          {solid.element}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 text-center sm:mt-8">
              <Button
                asChild
                variant="outline"
                size={{ initial: "2", sm: "3" }}
                className="border-amber-400/50 text-amber-300 hover:bg-amber-400/10"
              >
                <Link href={ROUTES.platonicSolids.path}>
                  <span className="hidden sm:inline">
                    View All Platonic Solids →
                  </span>
                  <span className="sm:hidden">View All →</span>
                </Link>
              </Button>
            </div>
          </TabsContent>

          {/* Sacred Patterns Tab */}
          <TabsContent value="patterns" className="mt-6 sm:mt-8">
            <div className="mb-6 px-4 text-center sm:mb-8">
              <Heading
                size={{ initial: "6", sm: "7" }}
                className="mb-2 text-amber-100 sm:mb-3"
              >
                Infinite Geometries
              </Heading>
              <Text size={{ initial: "2", sm: "3" }} className="text-blue-200">
                Patterns that encode universal principles and appear throughout
                nature and consciousness
              </Text>
            </div>

            <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:gap-6 sm:px-0 lg:grid-cols-3">
              {[
                { slug: "flower-of-life", badge: "Universal Pattern" },
                { slug: "metatrons-cube", badge: "Sacred Blueprint" },
                { slug: "golden-ratio", badge: "Divine Proportion" },
              ].map(({ slug, badge }) => {
                const pattern = getSacredPatterns().find((p) => p.slug === slug);
                if (!pattern) return null;
                return (
                  <Link key={pattern.slug} href={getGeometryPath(pattern)}>
                    <div className="cursor-pointer rounded-lg border border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 transition-all hover:scale-105 hover:border-amber-500/40">
                      <div className="flex flex-col items-center gap-4">
                        <div className="flex h-32 w-full items-center justify-center">
                          <Image
                            src={pattern.images?.heroImage ?? ""}
                            alt={pattern.name}
                            width={120}
                            height={120}
                            style={{
                              filter:
                                "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)",
                            }}
                          />
                        </div>
                        <Heading size="4" className="text-amber-200">
                          {pattern.name}
                        </Heading>
                        <Text size="2" className="text-center text-blue-300">
                          {pattern.description}
                        </Text>
                        <Badge className="bg-amber-500/20 text-amber-300">
                          {badge}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 px-4 text-center sm:mt-8">
              <Button
                asChild
                variant="outline"
                size={{ initial: "2", sm: "3" }}
                className="w-full border-amber-400/50 text-amber-300 hover:bg-amber-400/10 sm:w-auto"
              >
                <Link href={ROUTES.sacredPatterns.path}>
                  Explore All Patterns →
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
