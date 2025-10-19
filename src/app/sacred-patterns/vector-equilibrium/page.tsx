import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GeometryNavigation } from "@/components/geometry-navigation";
import { getGeometryBySlug } from "@/lib/data";

export default function VectorEquilibriumPage() {
  const geometry = getGeometryBySlug("vector-equilibrium");

  if (!geometry) {
    notFound();
  }
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
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
                {geometry.title}
              </Heading>
              <Text size={{ initial: "3", md: "5" }} className="text-blue-200">
                {geometry.description}
              </Text>
            </Flex>
            <div className="flex items-center justify-center">
              <Image
                src={geometry.images?.heroImage ?? ""}
                alt={geometry.name}
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

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Geometry of Perfect Balance
            </Heading>
            <Text className="mb-4 text-blue-200">
              The Vector Equilibrium, also known as the cuboctahedron, is
              unique among all geometric forms. It is the only configuration
              where the radius (distance from center to any vertex) equals the
              length of every edge. This means all vectors radiating from the
              center are identical in length to all vectors connecting the
              vertices—creating perfect equilibrium in all directions.
            </Text>
            <Text className="text-blue-200">
              Buckminster Fuller called this the &quot;Vector
              Equilibrium&quot; because it represents the condition of
              perfectly balanced forces. At absolute zero—the point of complete
              stillness—all energy patterns would theoretically assume this
              configuration. It embodies the zero-point state where all forces
              are in dynamic equilibrium.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Structure and Properties
            </Heading>
            <Text className="mb-4 text-blue-200">
              The Vector Equilibrium contains fourteen faces: eight equilateral
              triangles and six squares. It has twelve vertices (corner points)
              and twenty-four edges. When viewed from different angles, it
              reveals both cubic and octahedral symmetries—bridging these two
              fundamental Platonic solids.
            </Text>
            <ul className="mb-4 space-y-2 text-blue-200">
              <li>
                <strong className="text-amber-300">14 Faces:</strong> 8
                triangular + 6 square faces in perfect balance
              </li>
              <li>
                <strong className="text-amber-300">12 Vertices:</strong> Each
                vertex equidistant from the center
              </li>
              <li>
                <strong className="text-amber-300">24 Edges:</strong> All edges
                equal length, matching the radius
              </li>
              <li>
                <strong className="text-amber-300">Equal Vectors:</strong> All
                vectors from center to vertices = all edge vectors
              </li>
            </ul>
            <Text className="text-blue-200">
              This configuration creates the most economical arrangement of
              space-filling vectors. It represents nature&apos;s most efficient
              solution to distributing force equally in all directions from a
              central point.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Isotropic Vector Matrix
            </Heading>
            <Text className="mb-4 text-blue-200">
              When Vector Equilibria are nested and arranged in sequence, they
              form what Fuller called the &quot;Isotropic Vector Matrix&quot;—a
              three-dimensional lattice structure that fills all of space. This
              matrix reveals the fundamental scaffolding underlying physical
              reality itself.
            </Text>
            <Text className="text-blue-200">
              The IVM represents the closest packing of spheres in
              three-dimensional space, the most efficient way to organize energy
              and matter. Many believe this geometric matrix is the hidden
              architecture behind quantum foam, the fabric of spacetime, and the
              organization of consciousness itself.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Zero-Point Geometry
            </Heading>
            <Text className="mb-4 text-blue-200">
              The Vector Equilibrium exists in a state of perfect
              equilibrium—but paradoxically, this state is unstable in the
              physical world. The slightest perturbation causes it to collapse
              into either an icosahedron (through expansion) or an octahedron
              (through contraction).
            </Text>
            <Text className="text-blue-200">
              This instability is deeply meaningful. The Vector Equilibrium
              represents the zero-point between manifestation and
              non-manifestation, the threshold between energy and matter,
              potential and actual. It is the geometry of the void—the
              still-point where creation emerges from and returns to perfect
              balance.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Hidden in the Flower of Life
            </Heading>
            <Text className="text-blue-200">
              Like many sacred geometries, the Vector Equilibrium can be found
              encoded within the Flower of Life pattern. By connecting specific
              intersection points in the Flower, the three-dimensional form of
              the Vector Equilibrium emerges. This reveals how the ancient
              symbol contains the blueprint for perfect equilibrium—the balance
              point of all creation.
            </Text>
          </Card>

          <Card className="border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Symbolic Meaning
            </Heading>
            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">
                  Perfect Equilibrium:
                </strong>{" "}
                The only geometry where all vectors are balanced equally in all
                directions
              </li>
              <li>
                <strong className="text-amber-300">Zero-Point State:</strong>{" "}
                Represents the still-point of absolute balance and infinite
                potential
              </li>
              <li>
                <strong className="text-amber-300">
                  Threshold of Creation:
                </strong>{" "}
                The geometry at the boundary between manifestation and void
              </li>
              <li>
                <strong className="text-amber-300">
                  Isotropic Vector Matrix:
                </strong>{" "}
                When repeated, forms the fundamental structure of space itself
              </li>
              <li>
                <strong className="text-amber-300">
                  Unified Field Geometry:
                </strong>{" "}
                Believed to represent the geometric pattern of the unified field
              </li>
              <li>
                <strong className="text-amber-300">Dynamic Balance:</strong>{" "}
                Perfect equilibrium achieved through equal distribution of
                forces
              </li>
            </ul>
          </Card>

          {/* Navigation */}
          <GeometryNavigation
            currentSlug="vector-equilibrium"
            category="pattern"
          />
        </div>
      </div>
    </main>
  );
}
