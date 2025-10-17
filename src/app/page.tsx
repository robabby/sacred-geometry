import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import {
  CircleDot,
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

const platonicSolids = [
  {
    name: "Tetrahedron",
    path: ROUTES.platonicSolids.children.tetrahedron.path,
    element: "Fire",
    faces: 4,
    icon: Triangle,
    image: "/images/geometries/platonic-solids/tetrahedron/tetrahedron-3d.svg",
    color: "text-red-400",
  },
  {
    name: "Hexahedron",
    path: ROUTES.platonicSolids.children.hexahedron.path,
    element: "Earth",
    faces: 6,
    icon: BoxIcon,
    image: "/images/geometries/platonic-solids/hexahedron/hexahedron-3d.svg",
    color: "text-green-400",
  },
  {
    name: "Octahedron",
    path: ROUTES.platonicSolids.children.octahedron.path,
    element: "Air",
    faces: 8,
    icon: Octagon,
    image: "/images/geometries/platonic-solids/octahedron/octahedron-3d.svg",
    color: "text-cyan-400",
  },
  {
    name: "Dodecahedron",
    path: ROUTES.platonicSolids.children.dodecahedron.path,
    element: "Ether",
    faces: 12,
    icon: Sparkles,
    image:
      "/images/geometries/platonic-solids/dodecahedron/dodecahedron-3d.svg",
    color: "text-purple-400",
  },
  {
    name: "Icosahedron",
    path: ROUTES.platonicSolids.children.icosahedron.path,
    element: "Water",
    faces: 20,
    icon: Droplets,
    image: "/images/geometries/platonic-solids/icosahedron/icosahedron-3d.svg",
    color: "text-blue-400",
  },
];

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
              <Link href={ROUTES.sacredPatterns.children.flowerOfLife.path}>
                <div className="cursor-pointer rounded-lg border border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 transition-all hover:scale-105 hover:border-amber-500/40">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-32 w-full items-center justify-center">
                      <Image
                        src="/images/geometries/sacred-patterns/flower-of-life/flower-of-life-primary.svg"
                        alt="Flower of Life"
                        width={120}
                        height={120}
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)",
                        }}
                      />
                    </div>
                    <Heading size="4" className="text-amber-200">
                      Flower of Life
                    </Heading>
                    <Text size="2" className="text-center text-blue-300">
                      Ancient symbol encoding the fundamental forms of space and
                      time
                    </Text>
                    <Badge className="bg-amber-500/20 text-amber-300">
                      Universal Pattern
                    </Badge>
                  </div>
                </div>
              </Link>

              <Link href={ROUTES.sacredPatterns.children.metatronsCube.path}>
                <div className="cursor-pointer rounded-lg border border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 transition-all hover:scale-105 hover:border-amber-500/40">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-32 w-full items-center justify-center">
                      <Image
                        src="/images/geometries/sacred-patterns/metatrons-cube/metatrons-cube-primary.svg"
                        alt="Metatron's Cube"
                        width={120}
                        height={120}
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)",
                        }}
                      />
                    </div>
                    <Heading size="4" className="text-amber-200">
                      Metatron&apos;s Cube
                    </Heading>
                    <Text size="2" className="text-center text-blue-300">
                      Contains all five Platonic Solids within its structure
                    </Text>
                    <Badge className="bg-amber-500/20 text-amber-300">
                      Sacred Blueprint
                    </Badge>
                  </div>
                </div>
              </Link>

              <Link href={ROUTES.sacredPatterns.children.goldenRatio.path}>
                <div className="cursor-pointer rounded-lg border border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 transition-all hover:scale-105 hover:border-amber-500/40">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-32 w-full items-center justify-center">
                      <Image
                        src="/images/geometries/sacred-patterns/golden-ratio/golden-ratio-spiral.svg"
                        alt="Golden Ratio"
                        width={120}
                        height={120}
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)",
                        }}
                      />
                    </div>
                    <Heading size="4" className="text-amber-200">
                      Golden Ratio
                    </Heading>
                    <Text size="2" className="text-center text-blue-300">
                      Divine proportion (φ ≈ 1.618) found throughout nature
                    </Text>
                    <Badge className="bg-amber-500/20 text-amber-300">
                      Divine Proportion
                    </Badge>
                  </div>
                </div>
              </Link>
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
