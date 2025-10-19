import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GeometryNavigation } from "@/components/geometry-navigation";
import { getGeometryBySlug } from "@/lib/data";

export default function TreeOfLifePage() {
  const geometry = getGeometryBySlug("tree-of-life");

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
              The Map of Creation
            </Heading>
            <Text className="mb-4 text-blue-200">
              The Tree of Life, or Etz Chaim in Hebrew, is the central symbol
              of Kabbalah—the mystical tradition of Judaism. This sacred
              diagram maps the descent of divine energy from the infinite source
              (Ein Sof) into material manifestation, and simultaneously shows
              the path of return—the journey of spiritual ascent back to unity.
            </Text>
            <Text className="text-blue-200">
              The Tree consists of ten spheres called Sephiroth (singular:
              Sephirah), connected by twenty-two paths. Each Sephirah represents
              a different aspect of divine consciousness and a stage in the
              creative process. Together, they form a complete map of reality—
              from the highest spiritual realms to the physical world we
              inhabit.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Ten Sephiroth
            </Heading>
            <Text className="mb-4 text-blue-200">
              The ten Sephiroth represent ten divine emanations or attributes
              through which the infinite becomes finite, spirit becomes matter.
              Arranged in three pillars, they form a balanced structure of
              creative forces:
            </Text>
            <div className="space-y-3 text-blue-200">
              <div>
                <strong className="text-amber-300">1. Kether (Crown):</strong>{" "}
                The first emanation, closest to the infinite source, pure divine
                will
              </div>
              <div>
                <strong className="text-amber-300">
                  2. Chokmah (Wisdom):
                </strong>{" "}
                Raw creative force, divine masculine principle, the father
              </div>
              <div>
                <strong className="text-amber-300">
                  3. Binah (Understanding):
                </strong>{" "}
                Divine feminine, the cosmic mother who gives form to creation
              </div>
              <div>
                <strong className="text-amber-300">
                  4. Chesed (Mercy):
                </strong>{" "}
                Loving-kindness, expansion, grace, and boundless generosity
              </div>
              <div>
                <strong className="text-amber-300">
                  5. Geburah (Severity):
                </strong>{" "}
                Strength, judgment, discipline, the power of limitation
              </div>
              <div>
                <strong className="text-amber-300">
                  6. Tiphereth (Beauty):
                </strong>{" "}
                Harmony, balance, the heart center where all forces unite
              </div>
              <div>
                <strong className="text-amber-300">
                  7. Netzach (Victory):
                </strong>{" "}
                Endurance, emotion, art, and the drive to persist
              </div>
              <div>
                <strong className="text-amber-300">8. Hod (Glory):</strong>{" "}
                Intellect, communication, analysis, and mental clarity
              </div>
              <div>
                <strong className="text-amber-300">
                  9. Yesod (Foundation):
                </strong>{" "}
                The subconscious, dreams, the astral realm, connection to the
                physical
              </div>
              <div>
                <strong className="text-amber-300">
                  10. Malkuth (Kingdom):
                </strong>{" "}
                The physical world, earth, manifestation, where spirit becomes
                matter
              </div>
            </div>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Twenty-Two Paths
            </Heading>
            <Text className="mb-4 text-blue-200">
              Connecting the ten Sephiroth are twenty-two paths, each
              corresponding to a letter of the Hebrew alphabet and a card in the
              Major Arcana of the Tarot. These paths represent the transitions
              between states of consciousness and the channels through which
              divine energy flows.
            </Text>
            <Text className="text-blue-200">
              While the Sephiroth represent states of being, the paths represent
              processes of becoming. To walk the Tree is to traverse these
              paths, experiencing transformation as consciousness moves between
              different modes of awareness and understanding.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Three Pillars
            </Heading>
            <Text className="mb-4 text-blue-200">
              The Tree&apos;s structure reveals three vertical pillars that
              represent fundamental cosmic forces:
            </Text>
            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">
                  Left Pillar (Severity):
                </strong>{" "}
                Feminine force—Binah, Geburah, Hod—representing structure,
                limitation, and form
              </li>
              <li>
                <strong className="text-amber-300">
                  Right Pillar (Mercy):
                </strong>{" "}
                Masculine force—Chokmah, Chesed, Netzach—representing expansion,
                creativity, and energy
              </li>
              <li>
                <strong className="text-amber-300">
                  Middle Pillar (Equilibrium):
                </strong>{" "}
                Balance point—Kether, Tiphereth, Yesod, Malkuth—the path of
                harmony between opposites
              </li>
            </ul>
            <Text className="mt-4 text-blue-200">
              Spiritual development involves balancing these forces within
              oneself—integrating expansion with limitation, mercy with
              severity, masculine with feminine—to walk the middle path of
              equilibrium.
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
              Remarkably, the Tree of Life can be perfectly overlaid onto the
              Flower of Life pattern. By selecting specific intersection points
              within the Flower, the ten Sephiroth emerge naturally. This
              geometric relationship suggests that the Kabbalistic wisdom is not
              separate from sacred geometry—both describe the same fundamental
              patterns underlying creation itself.
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
                  Path of Spiritual Ascent:
                </strong>{" "}
                A map for consciousness evolution from material to divine
                awareness
              </li>
              <li>
                <strong className="text-amber-300">
                  Divine Emanations:
                </strong>{" "}
                Shows how the infinite descends into finite manifestation
                through ten stages
              </li>
              <li>
                <strong className="text-amber-300">
                  Microcosm and Macrocosm:
                </strong>{" "}
                Reflects both the structure of the cosmos and the human soul
              </li>
              <li>
                <strong className="text-amber-300">Four Worlds:</strong> Can be
                divided into four realms—Atziluth (divine), Briah (creative),
                Yetzirah (formative), Assiah (physical)
              </li>
              <li>
                <strong className="text-amber-300">Balance of Opposites:</strong>{" "}
                Teaches integration of masculine/feminine, mercy/severity,
                expansion/contraction
              </li>
              <li>
                <strong className="text-amber-300">Universal Template:</strong>{" "}
                Found hidden in the Flower of Life, revealing the unity of all
                mystical traditions
              </li>
            </ul>
          </Card>

          {/* Navigation */}
          <GeometryNavigation currentSlug="tree-of-life" category="pattern" />
        </div>
      </div>
    </main>
  );
}
