import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GeometryNavigation } from "@/components/geometry-navigation";
import { getGeometryBySlug } from "@/lib/data";

export default function SixtyFourTetrahedronPage() {
  const geometry = getGeometryBySlug("64-tetrahedron");

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
              The Geometry of the Vacuum
            </Heading>
            <Text className="mb-4 text-blue-200">
              The 64 Tetrahedron Grid is a three-dimensional fractal structure
              composed of 64 perfectly interlocking tetrahedra. When complete,
              these 64 tetrahedra form a stellated sphere—a geometric pattern
              that many researchers believe represents the fundamental structure
              of the quantum vacuum, the zero-point field from which all matter
              and energy emerge.
            </Text>
            <Text className="text-blue-200">
              This geometry is created by nesting eight Star Tetrahedra (or
              Merkaba) together in a specific pattern. Each Star Tetrahedron
              contains 8 smaller tetrahedra, and when all eight are combined in
              perfect alignment, they generate the complete 64-tetrahedron
              matrix—revealing the hidden architecture of space itself.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Fractal Structure
            </Heading>
            <Text className="mb-4 text-blue-200">
              The 64 Tetrahedron Grid is inherently fractal—it exhibits
              self-similarity at different scales. The same pattern that creates
              the whole structure is repeated in each of its parts. This fractal
              nature mirrors the organization of the universe itself, where
              similar patterns repeat from the quantum scale to the cosmic
              scale.
            </Text>
            <Text className="text-blue-200">
              The grid forms an 8x8 matrix when viewed from certain
              perspectives—eight tetrahedra along each axis. This 8x8 structure
              creates 64 individual cells, each a perfect tetrahedron, all
              nested together in a unified whole. This is the same pattern found
              in many fundamental systems across nature and consciousness.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Universal Pattern of 64
            </Heading>
            <Text className="mb-4 text-blue-200">
              The number 64 appears remarkably often in fundamental patterns
              across multiple domains of knowledge, suggesting this geometry
              encodes a universal organizing principle:
            </Text>
            <ul className="mb-4 space-y-2 text-blue-200">
              <li>
                <strong className="text-amber-300">DNA Codons:</strong> The
                genetic code consists of exactly 64 codons—the three-nucleotide
                sequences that encode all biological information
              </li>
              <li>
                <strong className="text-amber-300">I Ching:</strong> The
                ancient Chinese divination system contains 64 hexagrams
                representing all possible states of change
              </li>
              <li>
                <strong className="text-amber-300">Chess Board:</strong> 64
                squares form the playing field for one of humanity&apos;s oldest
                strategic games
              </li>
              <li>
                <strong className="text-amber-300">Computer Memory:</strong>{" "}
                64-bit architecture represents a fundamental threshold in
                computational power
              </li>
              <li>
                <strong className="text-amber-300">Sanskrit Alphabet:</strong>{" "}
                64 letters in the original Devanagari script
              </li>
            </ul>
            <Text className="text-blue-200">
              These parallel occurrences suggest the 64 Tetrahedron Grid may
              represent a fundamental pattern through which information,
              consciousness, and physical reality organize themselves.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Quantum Vacuum Structure
            </Heading>
            <Text className="mb-4 text-blue-200">
              Physicist Nassim Haramein has extensively studied the 64
              Tetrahedron Grid as a candidate for the geometric structure of
              spacetime at the Planck scale. According to his research, the
              quantum vacuum is not empty but rather filled with an infinitely
              dense geometric lattice—and the 64 Tetrahedron Grid may be that
              fundamental lattice.
            </Text>
            <Text className="text-blue-200">
              This structure creates what physicists call the &quot;zero-point
              field&quot;—the background energy that permeates all of space.
              From this perspective, the 64 Tetrahedron Grid isn&apos;t just a
              beautiful pattern—it&apos;s the actual geometric framework from
              which particles, forces, and spacetime itself emerge.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Geometry of Consciousness
            </Heading>
            <Text className="mb-4 text-blue-200">
              Beyond its physical implications, the 64 Tetrahedron Grid is
              considered by many to represent the geometric structure of
              consciousness itself. The grid forms when eight Merkaba (Star
              Tetrahedra)—the ancient symbol of the human energy field—are
              combined in perfect harmony.
            </Text>
            <Text className="text-blue-200">
              This suggests that consciousness, like physical matter, may
              organize itself according to precise geometric principles. The 64
              Tetrahedron Grid could be the hidden architecture linking mind and
              matter, the bridge between awareness and the physical world—a
              unified geometric field in which consciousness and cosmos are one.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Hidden Within the Flower of Life
            </Heading>
            <Text className="text-blue-200">
              Like many sacred geometries, the 64 Tetrahedron Grid can be
              derived from the Flower of Life pattern. By connecting specific
              points within the two-dimensional Flower, the three-dimensional 64
              Tetrahedron structure emerges—demonstrating once again that
              ancient sacred geometry encoded the deepest secrets of the
              universe&apos;s structure.
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
                  Quantum Vacuum Structure:
                </strong>{" "}
                The proposed geometric framework of the zero-point field and
                spacetime fabric
              </li>
              <li>
                <strong className="text-amber-300">
                  Universal Information Code:
                </strong>{" "}
                The pattern underlying DNA, I Ching, and fundamental information
                systems
              </li>
              <li>
                <strong className="text-amber-300">
                  Consciousness Geometry:
                </strong>{" "}
                The structural pattern through which awareness organizes itself
              </li>
              <li>
                <strong className="text-amber-300">Fractal Matrix:</strong>{" "}
                Self-similar structure repeating across all scales of reality
              </li>
              <li>
                <strong className="text-amber-300">
                  Eight-Fold Symmetry:
                </strong>{" "}
                Eight nested Merkaba creating the complete 64-cell grid
              </li>
              <li>
                <strong className="text-amber-300">Unified Field:</strong> The
                geometry bridging consciousness, information, and physical
                reality
              </li>
            </ul>
          </Card>

          {/* Navigation */}
          <GeometryNavigation currentSlug="64-tetrahedron" category="pattern" />
        </div>
      </div>
    </main>
  );
}
