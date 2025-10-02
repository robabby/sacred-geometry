import { Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import { Triangle, Box as BoxIcon, Octagon, Sparkles, Droplets } from "lucide-react";
import { ROUTES } from "@/util/routes";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
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
    image: "/images/geometries/platonic-solids/dodecahedron/dodecahedron-3d.svg",
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
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <Heading size="9" className="text-amber-100 mb-6">
            {ROUTES.platonicSolids.name}
          </Heading>
          <Text size="5" className="text-blue-200 mb-4">
            {ROUTES.platonicSolids.description}
          </Text>
          <Text size="3" className="text-blue-300/80 max-w-3xl mx-auto">
            Discovered by the ancient Greeks and explored by Plato, these five perfect solids
            are the only three-dimensional shapes where every face, edge, and angle is identical.
            Each represents a fundamental element and holds profound significance in sacred geometry.
          </Text>
        </div>

        {/* Platonic Solids Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {platonicSolids.map((solid) => {
            const Icon = solid.icon;
            return (
              <HoverCard key={solid.route.path}>
                <HoverCardTrigger asChild>
                  <Link href={solid.route.path}>
                    <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 backdrop-blur-sm border-amber-500/20 p-6 hover:border-amber-500/40 transition-all hover:scale-105 cursor-pointer">
                      <div className="flex flex-col gap-4">
                        {/* Image */}
                        <div className="relative w-full h-48 flex items-center justify-center">
                          <Image
                            src={solid.image}
                            alt={solid.route.name}
                            width={180}
                            height={180}
                            className="object-contain"
                            style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
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

                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="secondary" className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                            {solid.element}
                          </Badge>
                          <Badge variant="outline" className="bg-blue-900/50 text-blue-200 border-blue-500/30">
                            {solid.faces} faces
                          </Badge>
                        </div>

                        <Text size="2" className="text-blue-300 flex-grow">
                          {solid.route.description}
                        </Text>

                        <div className="text-amber-300 text-sm font-medium hover:text-amber-400 transition-colors">
                          Explore →
                        </div>
                      </div>
                    </Card>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-blue-950/90 border-amber-500/30 backdrop-blur-xl">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-amber-300">{solid.route.name}</h4>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-blue-400">Faces</p>
                        <p className="text-white font-semibold">{solid.faces}</p>
                      </div>
                      <div>
                        <p className="text-blue-400">Vertices</p>
                        <p className="text-white font-semibold">{solid.vertices}</p>
                      </div>
                      <div>
                        <p className="text-blue-400">Edges</p>
                        <p className="text-white font-semibold">{solid.edges}</p>
                      </div>
                    </div>
                    <p className="text-xs text-blue-200 pt-2">
                      <strong>Element:</strong> {solid.element}
                    </p>
                    <p className="text-xs text-blue-300/80">
                      {solid.route.description}
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>

        {/* Additional Info */}
        <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-8 max-w-4xl mx-auto mt-16">
          <Heading size="6" className="text-amber-300 mb-4">
            The Sacred Five
          </Heading>
          <Text className="text-blue-200 mb-4">
            These five shapes are unique in all of geometry. No other regular polyhedra exist
            beyond these. This mathematical limitation gives them profound significance—they
            represent the complete set of possible perfect three-dimensional forms.
          </Text>
          <Text className="text-blue-200">
            The ancient Greeks believed these shapes were the building blocks of reality itself.
            Modern physics has discovered surprising connections between these geometries and
            the structure of atoms, molecules, and even the fabric of spacetime.
          </Text>
        </Card>
      </div>
    </main>
  );
}
