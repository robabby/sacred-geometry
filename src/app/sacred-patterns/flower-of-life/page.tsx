import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { ROUTES } from "@/util/routes";

export default function FlowerOfLifePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header with Image */}
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
                {ROUTES.sacredPatterns.children.flowerOfLife.name}
              </Heading>

              <Text size={{ initial: "3", md: "5" }} className="text-blue-200">
                The Flower of Life is perhaps the most recognized sacred
                geometry symbol, found in temples worldwide from Egypt to China.
                This ancient pattern contains the fundamental forms of space and
                time.
              </Text>
            </Flex>

            {/* Hero Image */}
            <div className="flex items-center justify-center">
              <Image
                src="/images/geometries/sacred-patterns/flower-of-life/flower-of-life-primary.svg"
                alt="Flower of Life"
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

          {/* Construction & Geometry */}
          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Construction & Geometry
            </Heading>

            <Text className="mb-4 text-blue-200">
              The Flower of Life is created through a simple yet profound
              geometric process:
            </Text>

            <ol className="mb-6 ml-4 space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">1. The First Circle:</strong>{" "}
                Begin with a single circle— representing unity, the void, or
                pure consciousness.
              </li>
              <li>
                <strong className="text-amber-300">
                  2. The Vesica Piscis:
                </strong>{" "}
                Draw a second circle of equal size, with its center on the
                circumference of the first. The overlap creates the vesica
                piscis, the womb of creation.
              </li>
              <li>
                <strong className="text-amber-300">3. The Seed of Life:</strong>{" "}
                Continue adding circles, each with its center on the
                intersection points, forming seven circles—the Seed of Life.
              </li>
              <li>
                <strong className="text-amber-300">4. The Flower:</strong>{" "}
                Expand outward, adding more circles in the same pattern,
                creating the full Flower of Life with 19 complete circles.
              </li>
            </ol>

            <Text className="text-blue-200">
              This pattern is composed of perfect circles in a hexagonal
              arrangement, creating a flower-like pattern that has captivated
              mystics, mathematicians, and artists for millennia.
            </Text>
          </Card>

          {/* Hidden Patterns Within */}
          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Patterns Within
            </Heading>

            <Text className="mb-4 text-blue-200">
              The Flower of Life is remarkable because it contains numerous
              other sacred geometric patterns within its structure:
            </Text>

            <Grid columns={{ initial: "1", sm: "2" }} gap="4" className="mb-6">
              <div>
                <Text weight="bold" className="mb-2 text-amber-200">
                  Seed of Life
                </Text>
                <Text size="2" className="text-blue-300">
                  The first seven circles represent the seven days of creation
                </Text>
              </div>

              <div>
                <Text weight="bold" className="mb-2 text-amber-200">
                  Fruit of Life
                </Text>
                <Text size="2" className="text-blue-300">
                  Thirteen circles that form the blueprint for Metatron&apos;s
                  Cube
                </Text>
              </div>

              <div>
                <Text weight="bold" className="mb-2 text-amber-200">
                  Tree of Life
                </Text>
                <Text size="2" className="text-blue-300">
                  The Kabbalistic diagram of divine emanation can be found
                  within
                </Text>
              </div>

              <div>
                <Text weight="bold" className="mb-2 text-amber-200">
                  Platonic Solids
                </Text>
                <Text size="2" className="text-blue-300">
                  All five perfect solids can be derived from the pattern
                </Text>
              </div>

              <div>
                <Text weight="bold" className="mb-2 text-amber-200">
                  Vesica Piscis
                </Text>
                <Text size="2" className="text-blue-300">
                  The fundamental shape of sacred geometry and the golden ratio
                </Text>
              </div>

              <div>
                <Text weight="bold" className="mb-2 text-amber-200">
                  Golden Ratio
                </Text>
                <Text size="2" className="text-blue-300">
                  The divine proportion φ appears throughout the pattern&apos;s
                  relationships
                </Text>
              </div>
            </Grid>

            <Text className="text-blue-200">
              It&apos;s as if the Flower of Life is a complete library of the
              geometries that structure reality— encoded in a single, elegant
              design.
            </Text>
          </Card>

          {/* Historical & Cultural Significance */}
          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Ancient Appearances
            </Heading>

            <Text className="mb-4 text-blue-200">
              The Flower of Life has been found carved, drawn, and built into
              temples and sacred sites across the globe:
            </Text>

            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">
                  Temple of Osiris, Egypt:
                </strong>{" "}
                Perhaps the oldest known example, found in Abydos, dating back
                thousands of years. Some claim it may have been burned into the
                granite with laser-like precision.
              </li>
              <li>
                <strong className="text-amber-300">
                  Forbidden City, China:
                </strong>{" "}
                Found beneath the paw of the guardian lion statues, suggesting
                ancient Chinese knowledge of this pattern.
              </li>
              <li>
                <strong className="text-amber-300">India & Turkey:</strong>{" "}
                Appears in ancient temples and manuscripts, transcending
                cultural and religious boundaries.
              </li>
              <li>
                <strong className="text-amber-300">Israel & Europe:</strong>{" "}
                Medieval churches, Jewish synagogues, and Renaissance art all
                contain variations of this pattern.
              </li>
              <li>
                <strong className="text-amber-300">Modern Rediscovery:</strong>{" "}
                Leonardo da Vinci studied the Flower of Life extensively,
                drawing Metatron&apos;s Cube and the Platonic Solids from it.
              </li>
            </ul>
          </Card>

          {/* Symbolic Meaning */}
          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Symbolic Meaning
            </Heading>

            <Grid columns={{ initial: "1", sm: "2" }} gap="6">
              <div>
                <Text className="mb-3 text-blue-200">
                  <strong className="text-amber-300">
                    Unity & Interconnection:
                  </strong>{" "}
                  The overlapping circles demonstrate that all things are
                  connected—separate yet one.
                </Text>

                <Text className="mb-3 text-blue-200">
                  <strong className="text-amber-300">Creation Pattern:</strong>{" "}
                  The progressive unfoldment from one circle to many mirrors the
                  process of creation itself, from the void to manifest reality.
                </Text>

                <Text className="text-blue-200">
                  <strong className="text-amber-300">Consciousness Map:</strong>{" "}
                  Some traditions view it as a blueprint of consciousness,
                  showing how awareness expands from unity into multiplicity.
                </Text>
              </div>

              <div>
                <Text className="mb-3 text-blue-200">
                  <strong className="text-amber-300">Cellular Division:</strong>{" "}
                  The pattern remarkably mirrors the first stages of embryonic
                  development, from one cell to many.
                </Text>

                <Text className="mb-3 text-blue-200">
                  <strong className="text-amber-300">
                    Harmonic Resonance:
                  </strong>{" "}
                  The hexagonal structure reflects the most efficient packing
                  arrangement in nature—seen in honeycombs, crystals, and
                  molecular structures.
                </Text>

                <Text className="text-blue-200">
                  <strong className="text-amber-300">
                    Universal Language:
                  </strong>{" "}
                  Found across cultures that had no contact, suggesting it may
                  be a fundamental pattern woven into reality itself.
                </Text>
              </div>
            </Grid>
          </Card>

          {/* Practical Applications */}
          <Card className="border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Modern Applications & Science
            </Heading>

            <Text className="mb-4 text-blue-200">
              Beyond its mystical significance, the Flower of Life appears in
              various scientific and practical contexts:
            </Text>

            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">Chemistry & Biology:</strong>{" "}
                The pattern mirrors molecular structures, cell division, and
                crystalline formations at the microscopic level.
              </li>
              <li>
                <strong className="text-amber-300">Architecture:</strong> Used
                as a design principle for creating harmonious, aesthetically
                pleasing spaces with optimal acoustic and energetic properties.
              </li>
              <li>
                <strong className="text-amber-300">Art & Design:</strong>{" "}
                Artists and designers use the pattern as a foundation for
                creating balanced, harmonious compositions.
              </li>
              <li>
                <strong className="text-amber-300">
                  Meditation & Consciousness:
                </strong>{" "}
                Contemplating the Flower of Life is said to activate both
                hemispheres of the brain, promoting holistic thinking and
                expanded awareness.
              </li>
              <li>
                <strong className="text-amber-300">Water Structuring:</strong>{" "}
                Some researchers claim that exposing water to this pattern
                improves its molecular structure and energetic properties.
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </main>
  );
}
