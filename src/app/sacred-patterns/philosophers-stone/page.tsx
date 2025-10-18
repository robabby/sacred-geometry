import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GeometryNavigation } from "@/components/geometry-navigation";
import { getGeometryBySlug } from "@/lib/data";

export default function PhilosophersStonePage() {
  const geometry = getGeometryBySlug("philosophers-stone");

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
              The Great Work
            </Heading>
            <Text className="mb-4 text-blue-200">
              In alchemy, the Philosopher&apos;s Stone represents the culmination of
              the Great Work (Magnum Opus)—the transformation of base metals into
              gold, and symbolically, the transformation of the base human
              condition into spiritual enlightenment. While many sought it as a
              physical substance, the true alchemists understood it as a metaphor
              for inner transformation.
            </Text>
            <Text className="text-blue-200">
              The geometric symbol of the Philosopher&apos;s Stone typically features a
              circle squared, or a square circled—representing the union of heaven
              (circle) and earth (square), spirit and matter, the eternal and the
              temporal. This &quot;squaring of the circle&quot; is an ancient geometric
              puzzle that symbolizes the impossible made possible through spiritual
              work.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Union of Opposites
            </Heading>
            <Text className="mb-4 text-blue-200">
              Central to the Philosopher&apos;s Stone is the concept of &quot;coincidentia
              oppositorum&quot;—the coincidence of opposites. The alchemical process
              involves the marriage of opposing forces: masculine and feminine,
              sun and moon, sulfur and mercury, active and passive, conscious and
              unconscious.
            </Text>
            <Text className="text-blue-200">
              The geometric representation often includes overlapping triangles
              (like the Star of David), circles within squares, or other forms
              that demonstrate the integration of seemingly contradictory
              principles. This geometric integration mirrors the internal work of
              unifying the disparate aspects of the self.
            </Text>
          </Card>

          <Card className="border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Alchemical Symbolism
            </Heading>
            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">
                  Spiritual Transmutation:
                </strong>{" "}
                The transformation of consciousness from lead (heavy, base) to
                gold (illuminated, refined)
              </li>
              <li>
                <strong className="text-amber-300">The Squared Circle:</strong>{" "}
                Represents the reconciliation of the infinite (circle) with the
                finite (square)
              </li>
              <li>
                <strong className="text-amber-300">The Elixir of Life:</strong>{" "}
                Tradition holds that the Philosopher&apos;s Stone could create an
                elixir granting immortality and perfect health
              </li>
              <li>
                <strong className="text-amber-300">The Prima Materia:</strong> The
                original substance from which the Stone is created, representing
                the raw material of consciousness
              </li>
              <li>
                <strong className="text-amber-300">Sacred Marriage:</strong> The
                alchemical wedding (hieros gamos) of opposites to create
                something greater than either alone
              </li>
              <li>
                <strong className="text-amber-300">
                  Solve et Coagula:
                </strong>{" "}
                &quot;Dissolve and coagulate&quot;—the process of breaking down and
                rebuilding the self in purified form
              </li>
            </ul>
          </Card>

          {/* Navigation */}
          <GeometryNavigation
            currentSlug="philosophers-stone"
            category="pattern"
          />
        </div>
      </div>
    </main>
  );
}
