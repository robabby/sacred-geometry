import { Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Hexagon, Star, Triangle } from "lucide-react";
import { ROUTES } from "@/util/routes";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Card } from "@/components/ui/card";

const sacredPatterns = [
  {
    slug: "flower-of-life",
    route: ROUTES.sacredPatterns.children.flowerOfLife,
    icon: Hexagon,
    color: "text-amber-400",
    category: "Universal Pattern",
    image: "/images/geometries/sacred-patterns/flower-of-life/flower-of-life-primary.svg",
  },
  {
    slug: "seed-of-life",
    route: ROUTES.sacredPatterns.children.seedOfLife,
    icon: Hexagon,
    color: "text-green-400",
    category: "Creation Symbol",
    image: "/images/geometries/sacred-patterns/seed-of-life/seed-of-life-primary.svg",
  },
  {
    slug: "metatrons-cube",
    route: ROUTES.sacredPatterns.children.metatronsCube,
    icon: Sparkles,
    color: "text-purple-400",
    category: "Sacred Blueprint",
    image: "/images/geometries/sacred-patterns/metatrons-cube/metatrons-cube-primary.svg",
  },
  {
    slug: "sri-yantra",
    route: ROUTES.sacredPatterns.children.sriYantra,
    icon: Triangle,
    color: "text-red-400",
    category: "Divine Union",
    image: "/images/geometries/sacred-patterns/sri-yantra/sri-yantra-primary.svg",
  },
  {
    slug: "merkaba",
    route: ROUTES.sacredPatterns.children.merkaba,
    icon: Star,
    color: "text-cyan-400",
    category: "Light Vehicle",
    image: "/images/geometries/sacred-patterns/merkaba/merkaba-primary.svg",
  },
  {
    slug: "golden-ratio",
    route: ROUTES.sacredPatterns.children.goldenRatio,
    icon: Sparkles,
    color: "text-yellow-400",
    category: "Divine Proportion",
    image: "/images/geometries/sacred-patterns/golden-ratio/golden-ratio-spiral.svg",
  },
];

export default function SacredPatternsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <Heading size="9" className="text-amber-100 mb-6">
            {ROUTES.sacredPatterns.name}
          </Heading>
          <Text size="5" className="text-blue-200 mb-4">
            {ROUTES.sacredPatterns.description}
          </Text>
          <Text size="3" className="text-blue-300/80 max-w-3xl mx-auto">
            These timeless patterns appear across cultures and throughout history, from ancient temples
            to modern science. They represent the fundamental organizing principles of consciousness,
            energy, and matter—the blueprint of creation itself.
          </Text>
        </div>

        {/* Sacred Patterns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {sacredPatterns.map((pattern) => {
            const Icon = pattern.icon;
            return (
              <HoverCard key={pattern.route.path}>
                <HoverCardTrigger asChild>
                  <Link href={pattern.route.path}>
                    <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 backdrop-blur-sm border-amber-500/20 p-6 hover:border-amber-500/40 transition-all hover:scale-105 cursor-pointer">
                      <div className="flex flex-col gap-4">
                        {/* Image */}
                        <div className="relative w-full h-48 flex items-center justify-center">
                          <Image
                            src={pattern.image}
                            alt={pattern.route.name}
                            width={180}
                            height={180}
                            className="object-contain"
                            style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-5 w-5 ${pattern.color}`} />
                            <Heading size="5" className="text-amber-100">
                              {pattern.route.name}
                            </Heading>
                          </div>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="secondary" className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                            {pattern.category}
                          </Badge>
                        </div>

                        <Text size="2" className="text-blue-300 flex-grow">
                          {pattern.route.description}
                        </Text>

                        <div className="text-amber-300 text-sm font-medium hover:text-amber-400 transition-colors">
                          Explore →
                        </div>
                      </div>
                    </Card>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-blue-950/90 border-amber-500/30 backdrop-blur-xl">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-amber-300">{pattern.route.name}</h4>
                    <p className="text-xs text-blue-200">
                      <strong>Category:</strong> {pattern.category}
                    </p>
                    <p className="text-xs text-blue-300/80">
                      {pattern.route.description}
                    </p>
                    <p className="text-xs text-blue-400 italic mt-2">
                      Click to explore this pattern in detail
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>

        {/* The Flower of Life - Featured Section */}
        <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-8 max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 flex items-center justify-center">
              <Image
                src="/images/geometries/sacred-patterns/flower-of-life/flower-of-life-primary.svg"
                alt="Flower of Life"
                width={48}
                height={48}
                style={{ filter: "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)" }}
              />
            </div>
            <Heading size="7" className="text-amber-300">
              The Flower of Life: Universal Pattern
            </Heading>
          </div>

          <Text className="text-blue-200 mb-4">
            The Flower of Life is perhaps the most widely recognized symbol in sacred geometry.
            Found in temples across the world—from Egypt to China, from Europe to India—this
            pattern predates all major religions and appears to encode fundamental truths about
            the nature of reality.
          </Text>

          <Text className="text-blue-200">
            By overlapping circles in a specific pattern, the Flower of Life emerges naturally.
            Within its petals hide countless other sacred patterns: the Seed of Life, the Tree
            of Life, Metatron&apos;s Cube, and all five Platonic Solids. It&apos;s as if this single
            pattern contains the entire library of creation&apos;s building blocks.
          </Text>
        </Card>

        {/* Sacred Ratios */}
        <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-8 max-w-4xl mx-auto mb-8">
          <Heading size="6" className="text-amber-300 mb-4">
            The Golden Ratio & Sacred Proportions
          </Heading>

          <Text className="text-blue-200 mb-4">
            Sacred patterns often embody special mathematical ratios that appear throughout nature:
          </Text>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <Text weight="bold" className="text-amber-300">
                φ (Phi) ≈ 1.618 - The Golden Ratio
              </Text>
              <Text className="text-blue-200">
                Found in spiral shells, flower petals, galaxy arms, and human proportions.
                Represents optimal growth and aesthetic perfection.
              </Text>
            </div>

            <div className="flex flex-col gap-2">
              <Text weight="bold" className="text-amber-300">
                √2 ≈ 1.414 - The Silver Ratio
              </Text>
              <Text className="text-blue-200">
                The diagonal of a square. Found in paper sizes and sacred architecture.
                Represents the bridge between dimensions.
              </Text>
            </div>

            <div className="flex flex-col gap-2">
              <Text weight="bold" className="text-amber-300">
                π (Pi) ≈ 3.14159 - Circle Constant
              </Text>
              <Text className="text-blue-200">
                The relationship between circle and diameter. Represents cycles, wholeness,
                and the infinite.
              </Text>
            </div>
          </div>
        </Card>

        {/* Where to Find Them */}
        <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-8 max-w-4xl mx-auto">
          <Heading size="6" className="text-amber-300 mb-4">
            Where Sacred Patterns Appear
          </Heading>

          <Text className="text-blue-200 mb-4">
            These patterns are not mere human inventions—they are discoveries. They appear everywhere:
          </Text>

          <ul className="space-y-3 text-blue-200">
            <li>
              <strong className="text-amber-300">Nature:</strong> Flower petals, pine cones,
              nautilus shells, crystal structures, DNA helixes
            </li>
            <li>
              <strong className="text-amber-300">Architecture:</strong> Temples, cathedrals,
              pyramids, mosques—structures designed to elevate consciousness
            </li>
            <li>
              <strong className="text-amber-300">Art:</strong> Mandalas, Islamic geometric patterns,
              Celtic knots, Renaissance paintings
            </li>
            <li>
              <strong className="text-amber-300">Science:</strong> Atomic structures, quantum fields,
              cymatics (sound made visible), fractal mathematics
            </li>
            <li>
              <strong className="text-amber-300">Human Body:</strong> Proportions, spiral of ear,
              arrangement of features, energy centers (chakras)
            </li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
