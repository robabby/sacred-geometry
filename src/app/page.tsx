import { Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import { CircleDot, Sparkles, Triangle, Droplets, Box as BoxIcon, Octagon } from "lucide-react";
import { ROUTES } from "@/util/routes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const platonicSolids = [
  {
    name: "Tetrahedron",
    path: ROUTES.platonicSolids.children.tetrahedron.path,
    element: "Fire",
    faces: 4,
    icon: Triangle,
    image: "/images/geometries/platonic-solids/tetrahedron/tetrahedron-3d.svg",
    color: "text-red-400"
  },
  {
    name: "Hexahedron",
    path: ROUTES.platonicSolids.children.hexahedron.path,
    element: "Earth",
    faces: 6,
    icon: BoxIcon,
    image: "/images/geometries/platonic-solids/hexahedron/hexahedron-3d.svg",
    color: "text-green-400"
  },
  {
    name: "Octahedron",
    path: ROUTES.platonicSolids.children.octahedron.path,
    element: "Air",
    faces: 8,
    icon: Octagon,
    image: "/images/geometries/platonic-solids/octahedron/octahedron-3d.svg",
    color: "text-cyan-400"
  },
  {
    name: "Dodecahedron",
    path: ROUTES.platonicSolids.children.dodecahedron.path,
    element: "Ether",
    faces: 12,
    icon: Sparkles,
    image: "/images/geometries/platonic-solids/dodecahedron/dodecahedron-3d.svg",
    color: "text-purple-400"
  },
  {
    name: "Icosahedron",
    path: ROUTES.platonicSolids.children.icosahedron.path,
    element: "Water",
    faces: 20,
    icon: Droplets,
    image: "/images/geometries/platonic-solids/icosahedron/icosahedron-3d.svg",
    color: "text-blue-400"
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      {/* Hero Section */}
      <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center gap-8 px-4 py-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-4">
            <CircleDot className="h-12 w-12 text-amber-400 animate-pulse" />
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Sacred <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Geometry</span>
            </h1>
            <CircleDot className="h-12 w-12 text-amber-400 animate-pulse" />
          </div>

          <p className="max-w-2xl text-xl text-blue-200">
            {ROUTES.home.description}
          </p>

          <div className="flex gap-2 flex-wrap justify-center">
            <Badge variant="outline" className="bg-amber-500/10 text-amber-300 border-amber-500/30">
              5 Platonic Solids
            </Badge>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-300 border-amber-500/30">
              Sacred Patterns
            </Badge>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-300 border-amber-500/30">
              Golden Ratio
            </Badge>
          </div>

          <p className="max-w-3xl text-lg text-blue-300/80">
            Discover the mathematical principles and divine patterns that form the foundation of our universe.
            From the Platonic Solids to the Flower of Life, explore the geometries that have inspired
            mystics, scientists, and artists throughout history.
          </p>
        </div>

        <Flex gap="4" className="mt-8">
          <Button asChild size="4" className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-gray-900 font-semibold shadow-lg shadow-amber-500/30">
            <Link href={ROUTES.platonicSolids.path}>
              Explore Platonic Solids →
            </Link>
          </Button>
          <Button asChild size="4" variant="outline" className="border-amber-400/50 text-amber-300 hover:bg-amber-400/10 hover:border-amber-400">
            <Link href={ROUTES.sacredPatterns.path}>
              Sacred Patterns →
            </Link>
          </Button>
        </Flex>
      </div>

      <Separator className="bg-amber-500/20" />

      {/* Interactive Tabs Section */}
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="solids" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-blue-950/50 border border-amber-500/20">
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
          <TabsContent value="solids" className="mt-8">
            <div className="text-center mb-8">
              <Heading size="7" className="text-amber-100 mb-3">The Five Perfect Solids</Heading>
              <Text className="text-blue-200">
                Each solid represents a fundamental element and possesses complete geometric regularity
              </Text>
            </div>

            <Grid columns={{ initial: "2", md: "5" }} gap="4">
              {platonicSolids.map((solid) => {
                const Icon = solid.icon;
                return (
                  <HoverCard key={solid.name}>
                    <HoverCardTrigger asChild>
                      <Link href={solid.path}>
                        <div className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border border-amber-500/20 rounded-lg p-4 hover:border-amber-500/40 transition-all hover:scale-105 cursor-pointer">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-full h-24 flex items-center justify-center">
                              <Image
                                src={solid.image}
                                alt={solid.name}
                                width={80}
                                height={80}
                                className="object-contain"
                                style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
                              />
                            </div>
                            <Icon className={`h-5 w-5 ${solid.color}`} />
                            <Text className="text-xs text-amber-200 font-medium text-center">
                              {solid.name}
                            </Text>
                            <Badge variant="secondary" className="text-xs bg-blue-900/50">
                              {solid.faces} faces
                            </Badge>
                          </div>
                        </div>
                      </Link>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 bg-blue-950/90 border-amber-500/30 backdrop-blur-xl">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-amber-300">{solid.name}</h4>
                        <p className="text-xs text-blue-200">
                          <strong>Element:</strong> {solid.element}
                        </p>
                        <p className="text-xs text-blue-200">
                          <strong>Faces:</strong> {solid.faces} equilateral triangles or regular polygons
                        </p>
                        <p className="text-xs text-blue-300/80">
                          Click to explore the {solid.name} in detail and learn about its sacred significance.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                );
              })}
            </Grid>

            <div className="text-center mt-8">
              <Button asChild variant="outline" className="border-amber-400/50 text-amber-300 hover:bg-amber-400/10">
                <Link href={ROUTES.platonicSolids.path}>
                  View All Platonic Solids →
                </Link>
              </Button>
            </div>
          </TabsContent>

          {/* Sacred Patterns Tab */}
          <TabsContent value="patterns" className="mt-8">
            <div className="text-center mb-8">
              <Heading size="7" className="text-amber-100 mb-3">Infinite Geometries</Heading>
              <Text className="text-blue-200">
                Patterns that encode universal principles and appear throughout nature and consciousness
              </Text>
            </div>

            <Grid columns={{ initial: "1", md: "3" }} gap="6">
              <div className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border border-amber-500/20 rounded-lg p-6 hover:border-amber-500/40 transition-all">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full h-32 flex items-center justify-center">
                    <Image
                      src="/images/geometries/sacred-patterns/flower-of-life/flower-of-life-primary.svg"
                      alt="Flower of Life"
                      width={120}
                      height={120}
                      style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
                    />
                  </div>
                  <Heading size="4" className="text-amber-200">Flower of Life</Heading>
                  <Text size="2" className="text-blue-300 text-center">
                    Ancient symbol encoding the fundamental forms of space and time
                  </Text>
                  <Badge className="bg-amber-500/20 text-amber-300">Universal Pattern</Badge>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border border-amber-500/20 rounded-lg p-6 hover:border-amber-500/40 transition-all">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full h-32 flex items-center justify-center">
                    <Image
                      src="/images/geometries/sacred-patterns/metatrons-cube/metatrons-cube-primary.svg"
                      alt="Metatron's Cube"
                      width={120}
                      height={120}
                      style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
                    />
                  </div>
                  <Heading size="4" className="text-amber-200">Metatron&apos;s Cube</Heading>
                  <Text size="2" className="text-blue-300 text-center">
                    Contains all five Platonic Solids within its structure
                  </Text>
                  <Badge className="bg-amber-500/20 text-amber-300">Sacred Blueprint</Badge>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border border-amber-500/20 rounded-lg p-6 hover:border-amber-500/40 transition-all">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full h-32 flex items-center justify-center">
                    <Image
                      src="/images/geometries/sacred-patterns/golden-ratio/golden-ratio-spiral.svg"
                      alt="Golden Ratio"
                      width={120}
                      height={120}
                      style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
                    />
                  </div>
                  <Heading size="4" className="text-amber-200">Golden Ratio</Heading>
                  <Text size="2" className="text-blue-300 text-center">
                    Divine proportion (φ ≈ 1.618) found throughout nature
                  </Text>
                  <Badge className="bg-amber-500/20 text-amber-300">Divine Proportion</Badge>
                </div>
              </div>
            </Grid>

            <div className="text-center mt-8">
              <Button asChild variant="outline" className="border-amber-400/50 text-amber-300 hover:bg-amber-400/10">
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
