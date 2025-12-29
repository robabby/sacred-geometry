import { Box, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import {
  Triangle,
  Box as BoxIcon,
  Octagon,
  Sparkles,
  Droplets,
} from "lucide-react";
import { ROUTES } from "@/util/routes";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getPlatonicSolids, getGeometryPath } from "@/lib/data";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { StaggerChildren, StaggerItem } from "@/components/stagger-children";

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
    slug: solid.slug,
    name: solid.name,
    title: solid.title,
    description: solid.description,
    path: getGeometryPath(solid),
    element: solid.relatedBy?.element
      ? solid.relatedBy.element.charAt(0).toUpperCase() +
        solid.relatedBy.element.slice(1)
      : "Unknown",
    faces: solid.mathProperties?.faces,
    vertices: solid.mathProperties?.vertices,
    edges: solid.mathProperties?.edges,
    icon: iconMap[solid.slug] ?? Triangle,
    color: colorMap[solid.slug] ?? "text-amber-400",
    image: solid.images?.heroImage ?? "",
  }));

export default function PlatonicSolidsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <AnimateOnScroll className="mx-auto mb-16 max-w-4xl text-center">
          <Heading size="9" className="text-amber-100" mb="4">
            {ROUTES.platonicSolids.name}
          </Heading>
          <Box mb="2">
            <Text size="5" className="text-blue-200">
              {ROUTES.platonicSolids.description}
            </Text>
          </Box>
          <Text size="3" className="mx-auto max-w-3xl text-blue-300/80">
            Discovered by the ancient Greeks and explored by Plato, these five
            perfect solids are the only three-dimensional shapes where every
            face, edge, and angle is identical. Each represents a fundamental
            element and holds profound significance in sacred geometry.
          </Text>
        </AnimateOnScroll>

        {/* Platonic Solids Grid */}
        <StaggerChildren
          className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.1}
        >
          {platonicSolids.map((solid) => {
            const Icon = solid.icon;
            return (
              <StaggerItem key={solid.path}>
                <Link href={solid.path}>
                  <Card className="h-full cursor-pointer border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 backdrop-blur-sm transition-all hover:scale-105 hover:border-amber-500/40">
                    <div className="flex flex-col gap-4">
                      {/* Image */}
                      <div className="relative flex h-48 w-full items-center justify-center">
                        <Image
                          src={solid.image}
                          alt={solid.name}
                          width={180}
                          height={180}
                          className="object-contain"
                          style={{
                            filter:
                              "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)",
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-5 w-5 ${solid.color}`} />
                          <Heading size="5" className="text-amber-100">
                            {solid.name}
                          </Heading>
                        </div>
                      </div>

                      <Text size="2" className="text-blue-300">
                        {solid.description}
                      </Text>

                      <div className="flex flex-wrap justify-between gap-2">
                        <Badge
                          variant="secondary"
                          className="border-amber-500/30 bg-amber-500/20 text-amber-300"
                        >
                          {solid.element}
                        </Badge>

                        <Text
                          size="1"
                          className="font-medium text-amber-300 transition-colors hover:text-amber-400"
                        >
                          Explore →
                        </Text>
                      </div>
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        {/* Additional Info */}
        <AnimateOnScroll delay={0.3}>
          <Card className="mx-auto mt-16 max-w-4xl border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-8">
            <Heading size="6" className="mb-4 text-amber-300">
              The Sacred Five
            </Heading>
            <Text className="mb-4 text-blue-200">
              These five shapes are unique in all of geometry. No other regular
              polyhedra exist beyond these. This mathematical limitation gives
              them profound significance—they represent the complete set of
              possible perfect three-dimensional forms.
            </Text>
            <Text className="text-blue-200">
              The ancient Greeks believed these shapes were the building blocks
              of reality itself. Modern physics has discovered surprising
              connections between these geometries and the structure of atoms,
              molecules, and even the fabric of spacetime.
            </Text>
          </Card>
        </AnimateOnScroll>
      </div>
    </main>
  );
}
