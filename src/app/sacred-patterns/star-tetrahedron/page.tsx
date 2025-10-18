import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GeometryNavigation } from "@/components/geometry-navigation";
import { getGeometryBySlug } from "@/lib/data";

export default function MerkabaPage() {
  const geometry = getGeometryBySlug("star-tetrahedron");

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
              The Light Vehicle
            </Heading>
            <Text className="mb-4 text-blue-200">
              The word &quot;Merkaba&quot; comes from ancient Egyptian, meaning
              &quot;Mer&quot; (light), &quot;Ka&quot; (spirit), and
              &quot;Ba&quot; (body). Together: the light spirit body—a vehicle
              for ascending or traveling between dimensions.
            </Text>
            <Text className="text-blue-200">
              In Hebrew, Merkavah means &quot;chariot,&quot; referring to the
              divine throne-chariot of God described in Ezekiel&apos;s vision—a
              vehicle of light used to ascend to higher realms of consciousness.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Two Tetrahedrons, One Star
            </Heading>
            <Text className="mb-4 text-blue-200">
              The Merkaba is formed by two intersecting tetrahedrons:
            </Text>
            <Grid columns={{ initial: "1", sm: "2" }} gap="6">
              <div>
                <Text className="mb-3 text-blue-200">
                  <strong className="text-amber-300">Upward Pointing:</strong>{" "}
                  Represents the masculine, active, electric, fire,
                  consciousness, and heavenly energies.
                </Text>
              </div>
              <div>
                <Text className="mb-3 text-blue-200">
                  <strong className="text-amber-300">Downward Pointing:</strong>{" "}
                  Represents the feminine, receptive, magnetic, water, matter,
                  and earthly energies.
                </Text>
              </div>
            </Grid>
            <Text className="text-blue-200">
              When perfectly balanced and counter-rotating, these two
              tetrahedrons create an energy field capable of transporting
              consciousness—the Merkaba field.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Activation & Meditation
            </Heading>
            <Text className="mb-4 text-blue-200">
              Many spiritual traditions teach Merkaba meditation—a practice
              involving breath, visualization, and mudras (hand positions) to
              activate one&apos;s personal Merkaba field:
            </Text>
            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">Breath:</strong> Specific
                breathing patterns to energize the field
              </li>
              <li>
                <strong className="text-amber-300">Visualization:</strong>{" "}
                Seeing the two tetrahedrons spinning in opposite directions
                around your body
              </li>
              <li>
                <strong className="text-amber-300">Heart Connection:</strong>{" "}
                Maintaining unconditional love as the fuel for the Merkaba
              </li>
              <li>
                <strong className="text-amber-300">Speed & Rotation:</strong>{" "}
                The tetrahedrons spin faster as the field activates, eventually
                reaching light-speed
              </li>
            </ul>
          </Card>

          <Card className="border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Universal Symbol
            </Heading>
            <Text className="text-blue-200">
              The Merkaba appears across cultures: the Star of David in Judaism,
              the Seal of Solomon in Islamic mysticism, and the star tetrahedron
              in sacred geometry. It represents the perfect balance of opposing
              forces—the bridge between heaven and earth, spirit and matter,
              masculine and feminine—unified in a single, spinning field of
              light.
            </Text>
          </Card>

          {/* Navigation */}
          <GeometryNavigation currentSlug="star-tetrahedron" category="pattern" />
        </div>
      </div>
    </main>
  );
}
