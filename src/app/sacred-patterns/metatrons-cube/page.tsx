"use client";

import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { motion } from "motion/react";
import { ROUTES } from "@/util/routes";

export default function MetatronsCubePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <Grid columns={{ initial: "1", md: "2" }} gap={{ initial: "6", md: "8" }} className="mb-8 sm:mb-12">
            <Flex direction="column" gap="6" justify="center">
              <Heading size={{ initial: "7", md: "9" }} className="text-amber-100">
                {ROUTES.sacredPatterns.children.metatronsCube.name}
              </Heading>
              <Text size={{ initial: "3", md: "5" }} className="text-blue-200">
                Named after Archangel Metatron, this sacred pattern contains all five Platonic Solids
                within its structure, representing the geometric blueprint of the universe itself.
              </Text>
            </Flex>
            <div className="flex items-center justify-center">
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
                className="MetatronsCube"
                id="svg2"
                viewBox="0 0 435 482"
              >
              <motion.g id="layer1">
                <motion.g id="circles">
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 262.5 241.5 A 47 47 0 1 1  168.5,241.5 A 47 47 0 1 1  262.5 241.5 z"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition: { duration: .250 }
                    }}
                    style={{ fill:"none" }}
                    id="center-circle"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 262.5 335.5 A 47 47 0 1 1  168.5,335.5 A 47 47 0 1 1  262.5 335.5 z"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition: { duration: .250, delay: .250 }
                    }}
                    style={{ fill:"none" }}
                    id="second-ring-bottom-circle"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 262.5 147.5 A 47 47 0 1 1  168.5,147.5 A 47 47 0 1 1  262.5 147.5 z"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition: { duration: .250, delay: .250 }
                    }}
                    style={{ fill:"none" }}
                    id="second-ring-top-circle"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 180.5 194.5 A 47 47 0 1 1  86.5,194.5 A 47 47 0 1 1  180.5 194.5 z"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition: { duration: .250, delay: .250 }
                    }}
                    style={{ fill:"none" }}
                    id="second-ring-top-left-circle"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 344.5 194.5 A 47 47 0 1 1  250.5,194.5 A 47 47 0 1 1  344.5 194.5 z"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition: { duration: .250, delay: .250 }
                    }}
                    style={{ fill:"none" }}
                    id="second-ring-top-right-circle"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 180.5 288.5 A 47 47 0 1 1  86.5,288.5 A 47 47 0 1 1  180.5 288.5 z"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition: { duration: .250, delay: .250 }
                    }}
                    style={{ fill:"none" }}
                    id="second-ring-bottom-left-circle"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 344.5 288.5 A 47 47 0 1 1  250.5,288.5 A 47 47 0 1 1  344.5 288.5 z"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition: { duration: .250, delay: .250 }
                    }}
                    style={{ fill:"none" }}
                    id="second-ring-bottom-right-circle"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 262.5 429.5 A 47 47 0 1 1  168.5,429.5 A 47 47 0 1 1  262.5 429.5 z"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition: { duration: .250, delay: .500 }
                    }}
                    style={{ fill:"none" }}
                    id="outer-ring-bottom-circle"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 262.5 53.5 A 47 47 0 1 1  168.5,53.5 A 47 47 0 1 1  262.5 53.5 z"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition: { duration: .250, delay: .500 }
                    }}
                    style={{ fill:"none" }}
                    id="outer-ring-top-circle"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 98.5 147.5 A 47 47 0 1 1  4.5,147.5 A 47 47 0 1 1  98.5 147.5 z"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition: { duration: .250, delay: .500 }
                    }}
                    style={{ fill:"none" }}
                    id="outer-ring-top-left-circle"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 426.5 147.5 A 47 47 0 1 1  332.5,147.5 A 47 47 0 1 1  426.5 147.5 z"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition: { duration: .250, delay: .500 }
                    }}
                    style={{ fill:"none" }}
                    id="outer-ring-top-right-circle"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 98.5 335.5 A 47 47 0 1 1  4.5,335.5 A 47 47 0 1 1  98.5 335.5 z"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition: { duration: .250, delay: .500 }
                    }}
                    style={{ fill:"none" }}
                    id="outer-ring-bottom-left-circle"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 426.5 335.5 A 47 47 0 1 1  332.5,335.5 A 47 47 0 1 1  426.5 335.5 z"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition: { duration: .250, delay: .500 }
                    }}
                    style={{ fill:"none" }}
                    id="outer-ring-bottom-right-circle"
                  />
                </motion.g>
                <motion.g id="lines">
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 215.5,53.5 L 379.5,147.5 L 379.5,335.5 L 215.5,429.5 L 51.5,335.5 L 51.5,147.5 L 215.5,53.5 z "
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      transition: { duration: 2.22, delay: 1 }
                    }}
                    style={{ fill:"none" }}
                    id="outer-hexagon-outline"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 215.5,53.5 L 51.5,335.5 L 379.5,335.5 L 215.5,53.5 z "
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      transition: { duration: 2.22, delay: 1 }
                    }}
                    style={{ fill:"none" }}
                    id="outer-upward-triangle"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 51.5,147.5 L 215.5,429.5 L 379.5,147.5 L 51.5,147.5 z "
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      transition: { duration: 2.22, delay: 1 }
                    }}
                    style={{ fill:"none" }}
                    id="outer-downward-triangle"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 215.5,147.5 L 133.5,194.5 L 133.5,288.5 L 215.5,335.5 L 297.5,288.5 L 297.5,194.5 L 215.5,147.5 z "
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      transition: { duration: 2.22, delay: 1 }
                    }}
                    style={{ fill:"none" }}
                    id="inner-hexagon-outline"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 51.5,147.5 L 379.5,335.5"
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      transition: { duration: 2.22, delay: 1 }
                    }}
                    style={{ fill:"none" }}
                    id="diagonal-left"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 51.5,335.5 L 379.5,147.5"
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      transition: { duration: 2.22, delay: 1 }
                    }}
                    style={{ fill:"none" }}
                    id="diagonal-right"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 215.5,53.5 L 215.5,429.5"
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      transition: { duration: 2.22, delay: 1 }
                    }}
                    style={{ fill:"none" }}
                    id="vertical-line"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 133.5,288.5 L 215.5,53.5 L 297.5,288.5 L 133.5,288.5 z "
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      transition: { duration: 2.22, delay: 1 }
                    }}
                    style={{ fill:"none" }}
                    id="path2894"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 215.5,429.5 L 133.5,194.5 L 297.5,194.5 L 215.5,429.5 z "
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      transition: { duration: 2.22, delay: 1 }
                    }}
                    style={{ fill:"none" }}
                    id="path2896"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 51.5,335.5 L 215.5,147.5 L 297.5,288.5 L 51.5,335.5 z "
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      transition: { duration: 2.22, delay: 1 }
                    }}
                    style={{ fill:"none" }}
                    id="path2904"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 379.5,335.5 L 215.5,147.5 L 133.5,288.5 L 379.5,335.5 z "
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      transition: { duration: 2.22, delay: 1 }
                    }}
                    style={{ fill:"none" }}
                    id="path2906"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 379.5,147.5 L 133.5,194.5 L 215.5,335.5 L 379.5,147.5 z "
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      transition: { duration: 2.22, delay: 1 }
                    }}
                    style={{ fill:"none" }}
                    id="path2908"
                  />
                  <motion.path
                    stroke="var(--amber-a10)"
                    d="M 51.5,147.5 L 215.5,335.5 L 297.5,194.5 L 51.5,147.5 z "
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      transition: { duration: 2.22, delay: 1 }
                    }}
                    style={{ fill:"none" }}
                    id="path2910"
                  />
                </motion.g>
              </motion.g>
            </motion.svg>
            </div>
          </Grid>

          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-6 sm:p-8 mb-6 sm:mb-8">
            <Heading size={{ initial: "5", md: "6" }} className="text-amber-300 mb-4">
              All Five Platonic Solids Within
            </Heading>
            <Text className="text-blue-200 mb-4">
              Metatron&apos;s Cube is derived from the Fruit of Life (13 circles from the Flower of Life). When you connect the centers of these 13 circles, you create a complex pattern containing all five Platonic Solids:
            </Text>
            <Grid columns={{ initial: "1", sm: "2" }} gap="4">
              <div>
                <ul className="space-y-2 text-blue-200">
                  <li>• <Link href={ROUTES.platonicSolids.children.tetrahedron.path} className="text-amber-300 hover:text-amber-400">Tetrahedron</Link> (Fire)</li>
                  <li>• <Link href={ROUTES.platonicSolids.children.hexahedron.path} className="text-amber-300 hover:text-amber-400">Hexahedron/Cube</Link> (Earth)</li>
                  <li>• <Link href={ROUTES.platonicSolids.children.octahedron.path} className="text-amber-300 hover:text-amber-400">Octahedron</Link> (Air)</li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2 text-blue-200">
                  <li>• <Link href={ROUTES.platonicSolids.children.dodecahedron.path} className="text-amber-300 hover:text-amber-400">Dodecahedron</Link> (Ether/Universe)</li>
                  <li>• <Link href={ROUTES.platonicSolids.children.icosahedron.path} className="text-amber-300 hover:text-amber-400">Icosahedron</Link> (Water)</li>
                </ul>
              </div>
            </Grid>
          </Card>

          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-6 sm:p-8 mb-6 sm:mb-8">
            <Heading size={{ initial: "5", md: "6" }} className="text-amber-300 mb-4">
              Archangel Metatron
            </Heading>
            <Text className="text-blue-200 mb-4">
              In Kabbalistic tradition, Metatron is the angel who sits at the throne of God, acting as a scribe recording all deeds. The cube bearing his name is said to contain the patterns of creation itself—the geometric map used to design the universe.
            </Text>
            <Text className="text-blue-200">
              Some believe Metatron uses this cube to oversee the flow of energy in creation, maintaining the cosmic order through these perfect geometric forms.
            </Text>
          </Card>

          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-6 sm:p-8 mb-6 sm:mb-8">
            <Heading size={{ initial: "5", md: "6" }} className="text-amber-300 mb-4">
              The Complete Blueprint
            </Heading>
            <Text className="text-blue-200 mb-4">
              Because Metatron&apos;s Cube contains all five Platonic Solids, and these solids were believed by ancient Greeks to be the building blocks of reality, this pattern is often called the blueprint of creation:
            </Text>
            <ul className="space-y-3 text-blue-200">
              <li><strong className="text-amber-300">Physical Matter:</strong> All matter is built from atoms whose electron shells form these geometric shapes</li>
              <li><strong className="text-amber-300">Crystalline Structures:</strong> Minerals and gems form in these exact patterns</li>
              <li><strong className="text-amber-300">Molecular Geometry:</strong> Chemical compounds arrange themselves in these configurations</li>
              <li><strong className="text-amber-300">Energy Patterns:</strong> Sound, light, and electromagnetic fields move through space in these forms</li>
            </ul>
          </Card>

          <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-amber-500/20 p-6 sm:p-8">
            <Heading size={{ initial: "5", md: "6" }} className="text-amber-300 mb-4">
              Sacred Protection
            </Heading>
            <Text className="text-blue-200">
              Many spiritual traditions use Metatron&apos;s Cube as a protective symbol, believing it wards off negative energies. The completeness of the pattern—containing all the building blocks of creation—is thought to create a shield of divine geometry that maintains balance and harmony.
            </Text>
          </Card>
        </div>
      </div>
    </main>
  );
}
