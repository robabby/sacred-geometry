import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GeometryNavigation } from "@/components/geometry-navigation";
// import MetatronsCube from "@/components/geometry/metatrons-cube";
import { getGeometryBySlug } from "@/lib/data";

export default function MetatronsCubePage() {
  const geometry = getGeometryBySlug("metatrons-cube");

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
              {/* <MetatronsCube /> */}
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
              mb="4"
              size={{ initial: "5", md: "6" }}
              className="text-amber-300"
            >
              All Five Platonic Solids Within
            </Heading>
            <Text mb="4" className="text-blue-200">
              Metatron&apos;s Cube is derived from the Fruit of Life (13 circles
              from the Flower of Life). When you connect the centers of these 13
              circles, you create a complex pattern containing all five Platonic
              Solids:
            </Text>
            <Grid columns={{ initial: "1", sm: "2" }} gap="4">
              <div>
                <ul className="space-y-2 text-blue-200">
                  <li>
                    •{" "}
                    <Link
                      href="/platonic-solids/tetrahedron"
                      className="text-amber-300 hover:text-amber-400"
                    >
                      Tetrahedron
                    </Link>{" "}
                    (Fire)
                  </li>
                  <li>
                    •{" "}
                    <Link
                      href="/platonic-solids/hexahedron"
                      className="text-amber-300 hover:text-amber-400"
                    >
                      Hexahedron/Cube
                    </Link>{" "}
                    (Earth)
                  </li>
                  <li>
                    •{" "}
                    <Link
                      href="/platonic-solids/octahedron"
                      className="text-amber-300 hover:text-amber-400"
                    >
                      Octahedron
                    </Link>{" "}
                    (Air)
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2 text-blue-200">
                  <li>
                    •{" "}
                    <Link
                      href="/platonic-solids/dodecahedron"
                      className="text-amber-300 hover:text-amber-400"
                    >
                      Dodecahedron
                    </Link>{" "}
                    (Ether/Universe)
                  </li>
                  <li>
                    •{" "}
                    <Link
                      href="/platonic-solids/icosahedron"
                      className="text-amber-300 hover:text-amber-400"
                    >
                      Icosahedron
                    </Link>{" "}
                    (Water)
                  </li>
                </ul>
              </div>
            </Grid>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Archangel Metatron
            </Heading>
            <Text className="mb-4 text-blue-200">
              In Kabbalistic tradition, Metatron is the angel who sits at the
              throne of God, acting as a scribe recording all deeds. The cube
              bearing his name is said to contain the patterns of creation
              itself—the geometric map used to design the universe.
            </Text>
            <Text className="text-blue-200">
              Some believe Metatron uses this cube to oversee the flow of energy
              in creation, maintaining the cosmic order through these perfect
              geometric forms.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Complete Blueprint
            </Heading>
            <Text className="mb-4 text-blue-200">
              Because Metatron&apos;s Cube contains all five Platonic Solids,
              and these solids were believed by ancient Greeks to be the
              building blocks of reality, this pattern is often called the
              blueprint of creation:
            </Text>
            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">Physical Matter:</strong> All
                matter is built from atoms whose electron shells form these
                geometric shapes
              </li>
              <li>
                <strong className="text-amber-300">
                  Crystalline Structures:
                </strong>{" "}
                Minerals and gems form in these exact patterns
              </li>
              <li>
                <strong className="text-amber-300">Molecular Geometry:</strong>{" "}
                Chemical compounds arrange themselves in these configurations
              </li>
              <li>
                <strong className="text-amber-300">Energy Patterns:</strong>{" "}
                Sound, light, and electromagnetic fields move through space in
                these forms
              </li>
            </ul>
          </Card>

          <Card className="border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Sacred Protection
            </Heading>
            <Text className="text-blue-200">
              Many spiritual traditions use Metatron&apos;s Cube as a protective
              symbol, believing it wards off negative energies. The completeness
              of the pattern—containing all the building blocks of creation—is
              thought to create a shield of divine geometry that maintains
              balance and harmony.
            </Text>
          </Card>

          {/* Navigation */}
          <GeometryNavigation currentSlug="metatrons-cube" category="pattern" />
        </div>
      </div>
    </main>
  );
}
