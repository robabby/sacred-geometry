import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { ROUTES } from "@/util/routes";

export default function MerkabaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <Grid columns={{ initial: "1", md: "2" }} gap={{ initial: "6", md: "8" }} className="mb-8 sm:mb-12">
            <Flex direction="column" gap="6" justify="center">
              <Heading size={{ initial: "7", md: "9" }} className="text-amber-100">
                {ROUTES.sacredPatterns.children.merkaba.name}
              </Heading>
              <Text size={{ initial: "3", md: "5" }} className="text-blue-200">
                A star tetrahedron formed by two interlocking tetrahedrons, one pointing up
                (masculine/spirit) and one pointing down (feminine/matter), creating a three-dimensional
                Star of David.
              </Text>
            </Flex>
            <div className="flex items-center justify-center">
              <Image
                src="/images/geometries/sacred-patterns/merkaba/merkaba-primary.svg"
                alt="Merkaba"
                width={400}
                height={400}
                className="object-contain w-full max-w-md"
                style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
              />
            </div>
          </Grid>

          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-6 sm:p-8 mb-6 sm:mb-8">
            <Heading size={{ initial: "5", md: "6" }} className="text-amber-300 mb-4">
              The Light Vehicle
            </Heading>
            <Text className="text-blue-200 mb-4">
              The word "Merkaba" comes from ancient Egyptian, meaning "Mer" (light), "Ka" (spirit), and "Ba" (body). Together: the light spirit body—a vehicle for ascending or traveling between dimensions.
            </Text>
            <Text className="text-blue-200">
              In Hebrew, Merkavah means "chariot," referring to the divine throne-chariot of God described in Ezekiel's vision—a vehicle of light used to ascend to higher realms of consciousness.
            </Text>
          </Card>

          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-6 sm:p-8 mb-6 sm:mb-8">
            <Heading size={{ initial: "5", md: "6" }} className="text-amber-300 mb-4">
              Two Tetrahedrons, One Star
            </Heading>
            <Text className="text-blue-200 mb-4">
              The Merkaba is formed by two intersecting tetrahedrons:
            </Text>
            <Grid columns={{ initial: "1", sm: "2" }} gap="6">
              <div>
                <Text className="text-blue-200 mb-3">
                  <strong className="text-amber-300">Upward Pointing:</strong> Represents the masculine, active, electric, fire, consciousness, and heavenly energies.
                </Text>
              </div>
              <div>
                <Text className="text-blue-200 mb-3">
                  <strong className="text-amber-300">Downward Pointing:</strong> Represents the feminine, receptive, magnetic, water, matter, and earthly energies.
                </Text>
              </div>
            </Grid>
            <Text className="text-blue-200">
              When perfectly balanced and counter-rotating, these two tetrahedrons create an energy field capable of transporting consciousness—the Merkaba field.
            </Text>
          </Card>

          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-6 sm:p-8 mb-6 sm:mb-8">
            <Heading size={{ initial: "5", md: "6" }} className="text-amber-300 mb-4">
              Activation & Meditation
            </Heading>
            <Text className="text-blue-200 mb-4">
              Many spiritual traditions teach Merkaba meditation—a practice involving breath, visualization, and mudras (hand positions) to activate one's personal Merkaba field:
            </Text>
            <ul className="space-y-3 text-blue-200">
              <li><strong className="text-amber-300">Breath:</strong> Specific breathing patterns to energize the field</li>
              <li><strong className="text-amber-300">Visualization:</strong> Seeing the two tetrahedrons spinning in opposite directions around your body</li>
              <li><strong className="text-amber-300">Heart Connection:</strong> Maintaining unconditional love as the fuel for the Merkaba</li>
              <li><strong className="text-amber-300">Speed & Rotation:</strong> The tetrahedrons spin faster as the field activates, eventually reaching light-speed</li>
            </ul>
          </Card>

          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-6 sm:p-8">
            <Heading size={{ initial: "5", md: "6" }} className="text-amber-300 mb-4">
              Universal Symbol
            </Heading>
            <Text className="text-blue-200">
              The Merkaba appears across cultures: the Star of David in Judaism, the Seal of Solomon in Islamic mysticism, and the star tetrahedron in sacred geometry. It represents the perfect balance of opposing forces—the bridge between heaven and earth, spirit and matter, masculine and feminine—unified in a single, spinning field of light.
            </Text>
          </Card>
        </div>
      </div>
    </main>
  );
}
