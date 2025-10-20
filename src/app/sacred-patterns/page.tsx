import { Box, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Hexagon, Star, Triangle, Circle } from "lucide-react";
import { ROUTES } from "@/util/routes";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getSacredPatterns, getGeometryPath } from "@/lib/data";

// Icon mapping for Sacred Patterns
const iconMap: Record<string, typeof Hexagon> = {
  "circle-dot": Circle,
  "flower-of-life": Hexagon,
  "seed-of-life": Hexagon,
  "metatrons-cube": Sparkles,
  "sri-yantra": Triangle,
  "star-tetrahedron": Star,
  "golden-ratio": Sparkles,
  "vesica-piscis": Hexagon,
  "fruit-of-life": Hexagon,
  "philosophers-stone": Star,
  "pentagram": Star,
};

// Color mapping for Sacred Patterns
const colorMap: Record<string, string> = {
  "circle-dot": "text-white",
  "flower-of-life": "text-amber-400",
  "seed-of-life": "text-green-400",
  "metatrons-cube": "text-purple-400",
  "sri-yantra": "text-red-400",
  "star-tetrahedron": "text-cyan-400",
  "golden-ratio": "text-yellow-400",
  "vesica-piscis": "text-blue-400",
  "fruit-of-life": "text-pink-400",
  "philosophers-stone": "text-orange-400",
  "pentagram": "text-emerald-400",
};

// Category mapping for Sacred Patterns
const categoryMap: Record<string, string> = {
  "circle-dot": "Divine Source",
  "flower-of-life": "Universal Pattern",
  "seed-of-life": "Creation Symbol",
  "metatrons-cube": "Sacred Blueprint",
  "sri-yantra": "Divine Union",
  "star-tetrahedron": "Light Vehicle",
  "golden-ratio": "Divine Proportion",
  "vesica-piscis": "Creation Portal",
  "fruit-of-life": "Cosmic Blueprint",
  "philosophers-stone": "Alchemical Symbol",
  "pentagram": "Human Microcosm",
};

const sacredPatterns = getSacredPatterns()
  .filter((p) => p.featured)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  .map((pattern) => ({
    slug: pattern.slug,
    name: pattern.name,
    description: pattern.description,
    path: getGeometryPath(pattern),
    icon: iconMap[pattern.slug] ?? Hexagon,
    color: colorMap[pattern.slug] ?? "text-amber-400",
    category: categoryMap[pattern.slug] ?? "Sacred Pattern",
    image: pattern.images?.heroImage ?? "",
  }));

export default function SacredPatternsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <Heading size="9" className="text-amber-100" mb="4">
            {ROUTES.sacredPatterns.name}
          </Heading>
          <Box mb="2">
            <Text size="5" className="mb-4 text-blue-200">
              {ROUTES.sacredPatterns.description}
            </Text>
          </Box>
          <Text size="3" className="mx-auto max-w-3xl text-blue-300/80">
            These timeless patterns appear across cultures and throughout
            history, from ancient temples to modern science. They represent the
            fundamental organizing principles of consciousness, energy, and
            matter—the blueprint of creation itself.
          </Text>
        </div>

        {/* Sacred Patterns Grid */}
        <div className="mx-auto mb-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sacredPatterns.map((pattern) => {
            const Icon = pattern.icon;
            return (
              <Link key={pattern.path} href={pattern.path}>
                <Card className="cursor-pointer border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 backdrop-blur-sm transition-all hover:scale-105 hover:border-amber-500/40">
                  <div className="flex min-h-[380px] flex-col gap-4">
                    {/* Image */}
                    <div className="relative flex h-48 w-full items-center justify-center">
                      <Image
                        src={pattern.image}
                        alt={pattern.name}
                        width={180}
                        height={180}
                        className="object-contain"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)",
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-5 w-5 ${pattern.color}`} />
                        <Heading size="5" className="text-amber-100">
                          {pattern.name}
                        </Heading>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="border-amber-500/30 bg-amber-500/20 text-amber-300"
                      >
                        {pattern.category}
                      </Badge>
                    </div>

                    <Text size="2" className="line-clamp-3 text-blue-300">
                      {pattern.description}
                    </Text>

                    <div className="mt-auto text-sm font-medium text-amber-300 transition-colors hover:text-amber-400">
                      Explore →
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* The Flower of Life - Featured Section */}
        <Card className="mx-auto mb-8 max-w-4xl border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-8">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                src="/images/geometries/sacred-patterns/flower-of-life/flower-of-life-primary.svg"
                alt="Flower of Life"
                width={48}
                height={48}
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)",
                }}
              />
            </div>
            <Heading size="7" className="text-amber-300">
              The Flower of Life: Universal Pattern
            </Heading>
          </div>

          <Text className="mb-4 text-blue-200">
            The Flower of Life is perhaps the most widely recognized symbol in
            sacred geometry. Found in temples across the world—from Egypt to
            China, from Europe to India—this pattern predates all major
            religions and appears to encode fundamental truths about the nature
            of reality.
          </Text>

          <Text className="text-blue-200">
            By overlapping circles in a specific pattern, the Flower of Life
            emerges naturally. Within its petals hide countless other sacred
            patterns: the Seed of Life, the Tree of Life, Metatron&apos;s Cube,
            and all five Platonic Solids. It&apos;s as if this single pattern
            contains the entire library of creation&apos;s building blocks.
          </Text>
        </Card>

        {/* Sacred Ratios */}
        <Card className="mx-auto mb-8 max-w-4xl border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-8">
          <Heading size="6" className="mb-4 text-amber-300">
            The Golden Ratio & Sacred Proportions
          </Heading>

          <Text className="mb-4 text-blue-200">
            Sacred patterns often embody special mathematical ratios that appear
            throughout nature:
          </Text>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <Text weight="bold" className="text-amber-300">
                φ (Phi) ≈ 1.618 - The Golden Ratio
              </Text>
              <Text className="text-blue-200">
                Found in spiral shells, flower petals, galaxy arms, and human
                proportions. Represents optimal growth and aesthetic perfection.
              </Text>
            </div>

            <div className="flex flex-col gap-2">
              <Text weight="bold" className="text-amber-300">
                √2 ≈ 1.414 - The Silver Ratio
              </Text>
              <Text className="text-blue-200">
                The diagonal of a square. Found in paper sizes and sacred
                architecture. Represents the bridge between dimensions.
              </Text>
            </div>

            <div className="flex flex-col gap-2">
              <Text weight="bold" className="text-amber-300">
                π (Pi) ≈ 3.14159 - Circle Constant
              </Text>
              <Text className="text-blue-200">
                The relationship between circle and diameter. Represents cycles,
                wholeness, and the infinite.
              </Text>
            </div>
          </div>
        </Card>

        {/* Where to Find Them */}
        <Card className="mx-auto max-w-4xl border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-8">
          <Heading size="6" className="mb-4 text-amber-300">
            Where Sacred Patterns Appear
          </Heading>

          <Text className="mb-4 text-blue-200">
            These patterns are not mere human inventions—they are discoveries.
            They appear everywhere:
          </Text>

          <ul className="space-y-3 text-blue-200">
            <li>
              <strong className="text-amber-300">Nature:</strong> Flower petals,
              pine cones, nautilus shells, crystal structures, DNA helixes
            </li>
            <li>
              <strong className="text-amber-300">Architecture:</strong> Temples,
              cathedrals, pyramids, mosques—structures designed to elevate
              consciousness
            </li>
            <li>
              <strong className="text-amber-300">Art:</strong> Mandalas, Islamic
              geometric patterns, Celtic knots, Renaissance paintings
            </li>
            <li>
              <strong className="text-amber-300">Science:</strong> Atomic
              structures, quantum fields, cymatics (sound made visible), fractal
              mathematics
            </li>
            <li>
              <strong className="text-amber-300">Human Body:</strong>{" "}
              Proportions, spiral of ear, arrangement of features, energy
              centers (chakras)
            </li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
