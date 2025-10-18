import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getGeometryBySlug } from "@/lib/data";

export default function SriYantraPage() {
  const geometry = getGeometryBySlug("sri-yantra");

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
              The Sacred Geometry
            </Heading>
            <Text className="mb-4 text-blue-200">
              The Sri Yantra (also Shri Yantra) is composed of nine interlocking
              triangles radiating from a central point (bindu):
            </Text>
            <Grid columns={{ initial: "1", sm: "2" }} gap="6">
              <div>
                <Text className="mb-3 text-blue-200">
                  <strong className="text-amber-300">
                    Five Downward Triangles:
                  </strong>{" "}
                  Represent Shakti, the divine feminine principle—creation,
                  manifestation, and material reality.
                </Text>
                <Text className="text-blue-200">
                  <strong className="text-amber-300">
                    Four Upward Triangles:
                  </strong>{" "}
                  Represent Shiva, the divine masculine principle—consciousness,
                  transcendence, and pure awareness.
                </Text>
              </div>
              <div>
                <Text className="text-blue-200">
                  These nine triangles intersect to form 43 smaller triangles,
                  organized in five concentric levels. The entire pattern is
                  enclosed by two lotus rings (8 petals and 16 petals) and a
                  square enclosure with four T-shaped portals.
                </Text>
              </div>
            </Grid>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Journey Inward
            </Heading>
            <Text className="mb-4 text-blue-200">
              The Sri Yantra is often used in meditation, representing the
              spiritual journey from outer material reality to inner
              enlightenment:
            </Text>
            <ol className="ml-4 space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">Outer Square:</strong> The
                material world, earthly existence
              </li>
              <li>
                <strong className="text-amber-300">Lotus Rings:</strong> Layers
                of consciousness, chakras, stages of awareness
              </li>
              <li>
                <strong className="text-amber-300">Triangular Layers:</strong>{" "}
                Progressive levels of reality, from gross to subtle
              </li>
              <li>
                <strong className="text-amber-300">Central Bindu:</strong> The
                point of absolute unity, the source of all creation
              </li>
            </ol>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Divine Union
            </Heading>
            <Text className="text-blue-200">
              The Sri Yantra represents the union of opposites—masculine and
              feminine, spirit and matter, consciousness and energy. This union
              creates the universe. The central bindu is the point of creation
              where these polarities merge into one, representing enlightenment,
              wholeness, and the return to source.
            </Text>
          </Card>

          <Card className="border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Mathematical Precision
            </Heading>
            <Text className="text-blue-200">
              Creating a perfect Sri Yantra is considered extremely
              difficult—the nine triangles must intersect at precise angles to
              create the proper pattern. Many believe this geometric precision
              channels specific energies, making it a powerful tool for
              meditation, manifestation, and spiritual practice.
            </Text>
          </Card>
        </div>
      </div>
    </main>
  );
}
