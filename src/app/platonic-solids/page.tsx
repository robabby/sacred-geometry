import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/util/routes";

const platonicSolids = [
  {
    slug: "tetrahedron",
    route: ROUTES.platonicSolids.children.tetrahedron,
    element: "Fire",
    faces: 4,
    image: "/images/geometries/platonic-solids/tetrahedron/tetrahedron-primary.svg",
  },
  {
    slug: "hexahedron",
    route: ROUTES.platonicSolids.children.hexahedron,
    element: "Earth",
    faces: 6,
    image: "/images/geometries/platonic-solids/hexahedron/hexahedron-primary.svg",
  },
  {
    slug: "octahedron",
    route: ROUTES.platonicSolids.children.octahedron,
    element: "Air",
    faces: 8,
    image: "/images/geometries/platonic-solids/octahedron/octahedron-primary.svg",
  },
  {
    slug: "dodecahedron",
    route: ROUTES.platonicSolids.children.dodecahedron,
    element: "Ether",
    faces: 12,
    image: "/images/geometries/platonic-solids/dodecahedron/dodecahedron-primary.svg",
  },
  {
    slug: "icosahedron",
    route: ROUTES.platonicSolids.children.icosahedron,
    element: "Water",
    faces: 20,
    image: "/images/geometries/platonic-solids/icosahedron/icosahedron-primary.svg",
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
        <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="6" className="max-w-6xl mx-auto">
          {platonicSolids.map((solid) => {
            return (
              <Card
                key={solid.route.path}
                className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 backdrop-blur-sm border-amber-500/20 p-6 hover:border-amber-500/40 transition-all hover:scale-105"
              >
                <Flex direction="column" gap="4">
                  {/* Image */}
                  <Box className="relative w-full h-48 flex items-center justify-center">
                    <Image
                      src={solid.image}
                      alt={solid.route.name}
                      width={180}
                      height={180}
                      className="object-contain filter brightness-0 invert opacity-90"
                      style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
                    />
                  </Box>

                  <Flex align="center" justify="between">
                    <Heading size="5" className="text-amber-100">
                      {solid.route.name}
                    </Heading>
                    <Text className="text-amber-300 text-sm">{solid.faces} faces</Text>
                  </Flex>

                  <Box>
                    <Text className="text-xs text-amber-300 mb-1">Element</Text>
                    <Text className="text-blue-200">{solid.element}</Text>
                  </Box>

                  <Text size="2" className="text-blue-300 flex-grow">
                    {solid.route.description}
                  </Text>

                  <Button
                    asChild
                    variant="soft"
                    className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                  >
                    <Link href={solid.route.path}>
                      Explore →
                    </Link>
                  </Button>
                </Flex>
              </Card>
            );
          })}
        </Grid>

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
