import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { ROUTES } from "@/util/routes";

export default function SriYantraPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header with Image */}
          <Grid columns={{ initial: "1", md: "2" }} gap="8" className="mb-12">
            <Flex direction="column" gap="6" justify="center">
              <Heading size="9" className="text-amber-100">
                {ROUTES.sacredPatterns.children.sriYantra.name}
              </Heading>

              <Text size="5" className="text-blue-200">
                An ancient Hindu sacred geometry consisting of nine interlocking triangles,
                representing the union of divine masculine (Shiva) and feminine (Shakti) energies.
              </Text>
            </Flex>

            {/* Hero Image */}
            <div className="flex items-center justify-center">
              <Image
                src="/images/geometries/sacred-patterns/sri-yantra/sri-yantra-primary.svg"
                alt="Sri Yantra"
                width={400}
                height={400}
                className="object-contain"
                style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
              />
            </div>
          </Grid>

          {/* Content sections coming soon */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-8">
            <Heading size="6" className="text-amber-300 mb-4">
              Divine Union
            </Heading>
            <Text className="text-blue-200">
              Content coming soon...
            </Text>
          </Card>
        </div>
      </div>
    </main>
  );
}
