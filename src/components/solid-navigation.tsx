import Link from "next/link";
import { Button, Flex } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ROUTES } from "@/util/routes";

const solidsOrder = [
  { key: "tetrahedron", route: ROUTES.platonicSolids.children.tetrahedron },
  { key: "hexahedron", route: ROUTES.platonicSolids.children.hexahedron },
  { key: "octahedron", route: ROUTES.platonicSolids.children.octahedron },
  { key: "dodecahedron", route: ROUTES.platonicSolids.children.dodecahedron },
  { key: "icosahedron", route: ROUTES.platonicSolids.children.icosahedron },
];

interface SolidNavigationProps {
  currentSolid: "tetrahedron" | "hexahedron" | "octahedron" | "dodecahedron" | "icosahedron";
}

export function SolidNavigation({ currentSolid }: SolidNavigationProps) {
  const currentIndex = solidsOrder.findIndex(s => s.key === currentSolid);
  const prevSolid = currentIndex > 0 ? solidsOrder[currentIndex - 1] : null;
  const nextSolid = currentIndex < solidsOrder.length - 1 ? solidsOrder[currentIndex + 1] : null;

  return (
    <Flex justify="between" gap="4" className="mt-16 pt-8 border-t border-amber-500/20">
      <div className="flex-1">
        {prevSolid && (
          <Button
            asChild
            variant="outline"
            size="3"
            className="border-amber-400/50 text-amber-300 hover:bg-amber-400/10 hover:border-amber-400"
          >
            <Link href={prevSolid.route.path} className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous: </span>
              {prevSolid.route.name}
            </Link>
          </Button>
        )}
      </div>

      <Button
        asChild
        variant="soft"
        size="3"
        className="bg-blue-900/50 text-blue-200 hover:bg-blue-900/70"
      >
        <Link href={ROUTES.platonicSolids.path}>
          All Platonic Solids
        </Link>
      </Button>

      <div className="flex-1 flex justify-end">
        {nextSolid && (
          <Button
            asChild
            variant="outline"
            size="3"
            className="border-amber-400/50 text-amber-300 hover:bg-amber-400/10 hover:border-amber-400"
          >
            <Link href={nextSolid.route.path} className="flex items-center gap-2">
              <span className="hidden sm:inline">Next: </span>
              {nextSolid.route.name}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </Flex>
  );
}
