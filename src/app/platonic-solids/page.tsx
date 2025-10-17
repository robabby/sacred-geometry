import { Heading, Text } from "@radix-ui/themes";
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

const platonicSolids = [
  {
    slug: "tetrahedron",
    route: ROUTES.platonicSolids.children.tetrahedron,
    element: "Fire",
    faces: 4,
    vertices: 4,
    edges: 6,
    icon: Triangle,
    color: "text-red-400",
    image: "/images/geometries/platonic-solids/tetrahedron/tetrahedron-3d.svg",
  },
  {
    slug: "hexahedron",
    route: ROUTES.platonicSolids.children.hexahedron,
    element: "Earth",
    faces: 6,
    vertices: 8,
    edges: 12,
    icon: BoxIcon,
    color: "text-green-400",
    image: "/images/geometries/platonic-solids/hexahedron/hexahedron-3d.svg",
  },
  {
    slug: "octahedron",
    route: ROUTES.platonicSolids.children.octahedron,
    element: "Air",
    faces: 8,
    vertices: 6,
    edges: 12,
    icon: Octagon,
    color: "text-cyan-400",
    image: "/images/geometries/platonic-solids/octahedron/octahedron-3d.svg",
  },
  {
    slug: "dodecahedron",
    route: ROUTES.platonicSolids.children.dodecahedron,
    element: "Ether",
    faces: 12,
    vertices: 20,
    edges: 30,
    icon: Sparkles,
    color: "text-purple-400",
    image:
      "/images/geometries/platonic-solids/dodecahedron/dodecahedron-3d.svg",
  },
  {
    slug: "icosahedron",
    route: ROUTES.platonicSolids.children.icosahedron,
    element: "Water",
    faces: 20,
    vertices: 12,
    edges: 30,
    icon: Droplets,
    color: "text-blue-400",
    image: "/images/geometries/platonic-solids/icosahedron/icosahedron-3d.svg",
  },
];

export default function PlatonicSolidsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <Heading size="9" className="mb-6 text-amber-100">
            {ROUTES.platonicSolids.name}
          </Heading>
          <Text size="5" className="mb-4 text-blue-200">
            {ROUTES.platonicSolids.description}
          </Text>
          <Text size="3" className="mx-auto max-w-3xl text-blue-300/80">
            Discovered by the ancient Greeks and explored by Plato, these five
            perfect solids are the only three-dimensional shapes where every
            face, edge, and angle is identical. Each represents a fundamental
            element and holds profound significance in sacred geometry.
          </Text>
        </div>

        {/* Platonic Solids Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {platonicSolids.map((solid) => {
            const Icon = solid.icon;
            return (
              <Link key={solid.route.path} href={solid.route.path}>
                <Card className="cursor-pointer border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 backdrop-blur-sm transition-all hover:scale-105 hover:border-amber-500/40">
                  <div className="flex flex-col gap-4">
                    {/* Image */}
                    <div className="relative flex h-48 w-full items-center justify-center">
                      <Image
                        src={solid.image}
                        alt={solid.route.name}
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
                          {solid.route.name}
                        </Heading>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="border-amber-500/30 bg-amber-500/20 text-amber-300"
                      >
                        {solid.element}
                      </Badge>
                    </div>

                    <Text size="2" className="flex-grow text-blue-300">
                      {solid.route.description}
                    </Text>

                    <div className="text-sm font-medium text-amber-300 transition-colors hover:text-amber-400">
                      Explore →
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Additional Info */}
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
            The ancient Greeks believed these shapes were the building blocks of
            reality itself. Modern physics has discovered surprising connections
            between these geometries and the structure of atoms, molecules, and
            even the fabric of spacetime.
          </Text>
        </Card>
      </div>
    </main>
  );
}
