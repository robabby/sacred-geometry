import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GeometryNavigation } from "@/components/geometry-navigation";
import { getGeometryBySlug } from "@/lib/data";

export default function TorusPage() {
  const geometry = getGeometryBySlug("torus");

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
              The Universal Energy Pattern
            </Heading>
            <Text className="mb-4 text-blue-200">
              The torus is the fundamental geometric pattern of energy flow in
              the universe. This donut-shaped form creates a self-sustaining
              vortex where energy circulates from one pole, flows around the
              surface, and returns through the opposite pole—a perfect,
              continuous circulation system.
            </Text>
            <Text className="text-blue-200">
              At the center of every torus lies a point of stillness—the
              zero-point where energy reverses direction. This center point
              represents the balance between inflow and outflow, the eye of the
              cosmic storm where perfect equilibrium exists.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Pattern Across All Scales
            </Heading>
            <Text className="mb-4 text-blue-200">
              Remarkably, the toroidal field appears at every scale of
              existence. From the quantum realm to cosmic structures, this same
              pattern repeats:
            </Text>
            <ul className="mb-4 space-y-2 text-blue-200">
              <li>
                <strong className="text-amber-300">Atomic Level:</strong>{" "}
                Electrons orbit the nucleus in toroidal probability clouds
              </li>
              <li>
                <strong className="text-amber-300">Human Body:</strong> The
                human heart generates a powerful toroidal electromagnetic field
                extending several feet from the body
              </li>
              <li>
                <strong className="text-amber-300">Earth:</strong> Our
                planet&apos;s magnetic field forms a massive torus around the
                planet, protecting us from solar radiation
              </li>
              <li>
                <strong className="text-amber-300">Solar System:</strong> The
                Sun&apos;s heliosphere creates a toroidal bubble around our
                entire solar system
              </li>
              <li>
                <strong className="text-amber-300">Galaxies:</strong> Spiral
                galaxies exhibit toroidal rotation patterns and energy flows
              </li>
            </ul>
            <Text className="text-blue-200">
              This fractal repetition suggests the torus is not merely a
              shape—it&apos;s the fundamental architecture of how energy
              organizes itself across all dimensions.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              Self-Sustaining Vortex Dynamics
            </Heading>
            <Text className="mb-4 text-blue-200">
              The torus is unique because it&apos;s self-sustaining. Energy
              flowing out from the center naturally curves back to flow in
              again, creating a perpetual circulation. This dynamic balance
              makes the torus incredibly stable—it can maintain its pattern
              indefinitely without external input.
            </Text>
            <Text className="text-blue-200">
              The vortex motion creates two complementary spirals: one flowing
              outward from the center, expanding into manifestation, and one
              spiraling inward, returning to the source. This mirrors the
              cosmic dance of creation and dissolution, expansion and
              contraction, yang and yin.
            </Text>
          </Card>

          <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
            <Heading
              size={{ initial: "5", md: "6" }}
              className="mb-4 text-amber-300"
            >
              The Torus in Nature
            </Heading>
            <Text className="mb-4 text-blue-200">
              Beyond energy fields, the toroidal form appears in countless
              natural structures:
            </Text>
            <ul className="space-y-2 text-blue-200">
              <li>
                Apples, oranges, and many fruits grow following toroidal
                patterns
              </li>
              <li>
                Smoke rings and vortex rings in fluids naturally form tori
              </li>
              <li>
                Hurricanes and tornadoes exhibit toroidal circulation patterns
              </li>
              <li>Pine cones and sunflowers spiral in toroidal arrangements</li>
              <li>
                The human aura is described in many traditions as having a
                toroidal field structure
              </li>
            </ul>
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
                <strong className="text-amber-300">Infinite Flow:</strong> The
                torus represents perpetual, self-sustaining energy circulation
              </li>
              <li>
                <strong className="text-amber-300">Zero-Point Center:</strong>{" "}
                The still point at the center symbolizes the source of creation
                and perfect balance
              </li>
              <li>
                <strong className="text-amber-300">
                  Macrocosm-Microcosm:
                </strong>{" "}
                The same pattern appearing at all scales reveals the unity of
                all existence
              </li>
              <li>
                <strong className="text-amber-300">
                  Breath of the Universe:
                </strong>{" "}
                The inflow and outflow mirrors the cosmic breath—creation and
                dissolution
              </li>
              <li>
                <strong className="text-amber-300">Heart-Centered:</strong> The
                heart&apos;s toroidal field suggests love as the fundamental
                organizing force
              </li>
              <li>
                <strong className="text-amber-300">Dynamic Equilibrium:</strong>{" "}
                Perfect balance achieved through constant motion and exchange
              </li>
            </ul>
          </Card>

          {/* Navigation */}
          <GeometryNavigation currentSlug="torus" category="pattern" />
        </div>
      </div>
    </main>
  );
}
