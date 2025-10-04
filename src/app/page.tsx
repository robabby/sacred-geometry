import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import { CircleDot, Sparkles, Triangle, Droplets, Box as BoxIcon, Octagon } from "lucide-react";
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
      <div className="container mx-auto flex min-h-[60vh] sm:min-h-[70vh] flex-col items-center justify-center gap-6 sm:gap-8 px-4 py-12 sm:py-16">
        <div className="flex flex-col items-center gap-4 sm:gap-6 text-center">
          <div className="flex items-center gap-2 sm:gap-4">
            <CircleDot className="h-8 w-8 sm:h-12 sm:w-12 text-amber-400" />
            <h1 className="text-3xl sm:text-5xl lg:text-[5rem] font-extrabold tracking-tight text-white">
              Sacred <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Geometry</span>
            </h1>
            <CircleDot className="h-8 w-8 sm:h-12 sm:w-12 text-amber-400" />
          </div>

          <p className="max-w-2xl text-base sm:text-xl text-blue-200 px-4">
            {ROUTES.home.description}
          </p>

          <div className="flex gap-2 flex-wrap justify-center px-4">
            <Badge variant="outline" className="bg-amber-500/10 text-amber-300 border-amber-500/30 text-xs sm:text-sm">
              5 Platonic Solids
            </Badge>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-300 border-amber-500/30 text-xs sm:text-sm">
              Sacred Patterns
            </Badge>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-300 border-amber-500/30 text-xs sm:text-sm">
              Golden Ratio
            </Badge>
          </div>

          <p className="max-w-3xl text-sm sm:text-lg text-blue-300/80 px-4">
            Discover the mathematical principles and divine patterns that form the foundation of our universe.
            From the Platonic Solids to the Flower of Life, explore the geometries that have inspired
            mystics, scientists, and artists throughout history.
          </p>
        </div>

        <Flex gap="3 sm:gap-4" className="mt-4 sm:mt-8 flex-col sm:flex-row w-full sm:w-auto px-4">
          <Button asChild size="3" mb={{ xs: "4", md: "0" }} mr={{ xs: "0", md: "4" }} className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-gray-900 font-semibold shadow-lg shadow-amber-500/30 w-full sm:w-auto">
            <Link href={ROUTES.platonicSolids.path}>
              <span className="hidden sm:inline">Explore Platonic Solids →</span>
              <span className="sm:hidden">Platonic Solids →</span>
            </Link>
          </Button>
          <Button asChild size="3" variant="outline" className="border-amber-400/50 text-amber-300 hover:bg-amber-400/10 hover:border-amber-400 w-full sm:w-auto">
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
          <TabsContent value="solids" className="mt-6 sm:mt-8">
            <div className="text-center mb-6 sm:mb-8 px-4">
              <Heading size={{ initial: "6", sm: "7" }} className="text-amber-100 mb-2 sm:mb-3">The Five Perfect Solids</Heading>
              <Text size={{ initial: "2", sm: "3" }} className="text-blue-200">
                Each solid represents a fundamental element and possesses complete geometric regularity
              </Text>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {platonicSolids.map((solid) => {
                const Icon = solid.icon;
                return (
                  <Link key={solid.name} href={solid.path}>
                    <div className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border border-amber-500/20 rounded-lg p-3 sm:p-4 hover:border-amber-500/40 transition-all hover:scale-105 cursor-pointer">
                      <div className="flex flex-col items-center gap-2 sm:gap-3">
                        <div className="w-full h-16 sm:h-24 flex items-center justify-center">
                          <Image
                            src={solid.image}
                            alt={solid.name}
                            width={60}
                            height={60}
                            className="object-contain sm:w-20 sm:h-20"
                            style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
                          />
                        </div>
                        <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${solid.color}`} />
                        <Text className="text-[10px] sm:text-xs text-amber-200 font-medium text-center leading-tight">
                          {solid.name}
                        </Text>
                        <Badge variant="secondary" className="text-[10px] sm:text-xs bg-blue-900/50 px-1.5 py-0.5">
                          {solid.element}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="text-center mt-6 sm:mt-8">
              <Button asChild variant="outline" size={{ initial: "2", sm: "3" }} className="border-amber-400/50 text-amber-300 hover:bg-amber-400/10">
                <Link href={ROUTES.platonicSolids.path}>
                  <span className="hidden sm:inline">View All Platonic Solids →</span>
                  <span className="sm:hidden">View All →</span>
                </Link>
              </Button>
            </div>
          </TabsContent>

          {/* Sacred Patterns Tab */}
          <TabsContent value="patterns" className="mt-6 sm:mt-8">
            <div className="text-center mb-6 sm:mb-8 px-4">
              <Heading size={{ initial: "6", sm: "7" }} className="text-amber-100 mb-2 sm:mb-3">Infinite Geometries</Heading>
              <Text size={{ initial: "2", sm: "3" }} className="text-blue-200">
                Patterns that encode universal principles and appear throughout nature and consciousness
              </Text>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
              <Link href={ROUTES.sacredPatterns.children.flowerOfLife.path}>
                <div className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border border-amber-500/20 rounded-lg p-6 hover:border-amber-500/40 transition-all hover:scale-105 cursor-pointer">
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
              </Link>

              <Link href={ROUTES.sacredPatterns.children.metatronsCube.path}>
                <div className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border border-amber-500/20 rounded-lg p-6 hover:border-amber-500/40 transition-all hover:scale-105 cursor-pointer">
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
              </Link>

              <Link href={ROUTES.sacredPatterns.children.goldenRatio.path}>
                <div className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border border-amber-500/20 rounded-lg p-6 hover:border-amber-500/40 transition-all hover:scale-105 cursor-pointer">
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
              </Link>
            </div>

            <div className="text-center mt-6 sm:mt-8 px-4">
              <Button asChild variant="outline" size={{ initial: "2", sm: "3" }} className="border-amber-400/50 text-amber-300 hover:bg-amber-400/10 w-full sm:w-auto">
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
