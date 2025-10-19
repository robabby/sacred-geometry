import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
// import CircleDot from "@/components/geometry/circle-dot";
import { GeometryNavigation } from "@/components/geometry-navigation";
import { getGeometryBySlug } from "@/lib/data";

export default function CircleDotPage() {
  const geometry = getGeometryBySlug("circle-dot");

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
              {/* <CircleDot /> */}
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
              The Beginning of All Form
            </Heading>
            <Text className="mb-4 text-blue-200">
              The circle with a dot at its center is perhaps the most
              fundamental symbol in sacred geometry—older than written language,
              appearing across cultures worldwide. Known as the circumpunct, it
              represents the primordial moment before creation: the point of
              consciousness within the infinite field of potential.
            </Text>
            <Text className="text-blue-200">
              The dot is the divine spark, the monad, the singularity from which
              all things emerge. The circle is the boundary of manifestation,
              the first container of form. Together, they represent the eternal
              dance between the One and the Many, between unity and diversity,
              between source and creation.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Across Cultures and Traditions
            </Heading>
            <Text className="mb-4 text-blue-200">
              This simple yet profound symbol appears throughout human history
              and across spiritual traditions:
            </Text>
            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">Astrology:</strong> The
                official symbol for the Sun (☉)—the center of our solar system
                and source of all light and life
              </li>
              <li>
                <strong className="text-amber-300">Alchemy:</strong> The symbol
                for Gold (⊙), the most perfect and incorruptible metal,
                representing spiritual perfection and the philosopher&apos;s
                stone
              </li>
              <li>
                <strong className="text-amber-300">Ancient Egypt:</strong> The
                symbol of Ra, the sun god—representing the divine light at the
                center of creation
              </li>
              <li>
                <strong className="text-amber-300">Hinduism:</strong> The bindu,
                the zero point of creation from which the universe unfolds
              </li>
              <li>
                <strong className="text-amber-300">Kabbalah:</strong> Kether,
                the crown—the first emanation of the divine
              </li>
              <li>
                <strong className="text-amber-300">Modern Physics:</strong> The
                singularity before the Big Bang, the point of infinite density
                from which spacetime emerged
              </li>
            </ul>
          </Card>

          <Card className="border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Foundation of Sacred Geometry
            </Heading>
            <Text className="mb-4 text-blue-200">
              All sacred geometric patterns begin with the circle and the
              point. From this foundation, the entire universe of form unfolds:
            </Text>
            <ul className="space-y-3 text-blue-200">
              <li>
                <strong className="text-amber-300">From One to Two:</strong>{" "}
                When the circle extends itself, it creates the Vesica Piscis—the
                birth of duality
              </li>
              <li>
                <strong className="text-amber-300">
                  The Seed Emerges:
                </strong>{" "}
                Repeated extension creates the Seed of Life, representing the
                seven days of creation
              </li>
              <li>
                <strong className="text-amber-300">
                  Infinite Complexity:
                </strong>{" "}
                From this seed grows the Flower of Life, containing all
                subsequent geometric patterns
              </li>
              <li>
                <strong className="text-amber-300">
                  Return to Source:
                </strong>{" "}
                All patterns ultimately return to the simplicity of the
                circle-dot—unity consciousness
              </li>
            </ul>
            <Text className="mt-4 text-blue-200">
              In meditation, focusing on the circle-dot is said to align
              awareness with source consciousness—the still point at the center
              of the turning world, the eternal now from which all time flows.
            </Text>
          </Card>

          {/* Navigation */}
          <GeometryNavigation currentSlug="circle-dot" category="pattern" />
        </div>
      </div>
    </main>
  );
}
