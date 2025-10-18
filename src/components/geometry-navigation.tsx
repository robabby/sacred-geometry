import Link from "next/link";
import { Button, Flex } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  type GeometryCategory,
  getGeometryBySlug,
  getNextGeometry,
  getPreviousGeometry,
  getGeometryPath,
  getGeometryListPath,
} from "@/lib/data";

interface GeometryNavigationProps {
  currentSlug: string;
  category: GeometryCategory;
}

export function GeometryNavigation({
  currentSlug,
  category,
}: GeometryNavigationProps) {
  const currentGeometry = getGeometryBySlug(currentSlug);

  if (!currentGeometry) {
    return null;
  }

  const prevGeometry = getPreviousGeometry(currentGeometry.id, category);
  const nextGeometry = getNextGeometry(currentGeometry.id, category);

  // Category-specific labels
  const allLabel =
    category === "platonic" ? "All Platonic Solids" : "All Sacred Patterns";
  const allLabelMobile = category === "platonic" ? "All Solids" : "All Patterns";

  return (
    <Flex
      direction={{ initial: "column", sm: "row" }}
      justify="between"
      gap={{ initial: "3", sm: "4" }}
      className="mt-12 border-t border-amber-500/20 pt-6 sm:mt-16 sm:pt-8"
    >
      <div className="w-full flex-1 sm:w-auto">
        {prevGeometry && (
          <Button
            asChild
            variant="outline"
            size={{ initial: "2", sm: "3" }}
            className="w-full border-amber-400/50 text-amber-300 hover:border-amber-400 hover:bg-amber-400/10 sm:w-auto"
          >
            <Link
              href={getGeometryPath(prevGeometry)}
              className="flex items-center justify-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous: </span>
              <span className="sm:hidden">Prev: </span>
              <span className="truncate">{prevGeometry.name}</span>
            </Link>
          </Button>
        )}
      </div>

      <Button
        asChild
        variant="soft"
        size={{ initial: "2", sm: "3" }}
        className="w-full bg-blue-900/50 text-blue-200 hover:bg-blue-900/70 sm:w-auto"
      >
        <Link href={getGeometryListPath(category)}>
          <span className="hidden sm:inline">{allLabel}</span>
          <span className="sm:hidden">{allLabelMobile}</span>
        </Link>
      </Button>

      <div className="flex w-full flex-1 justify-end sm:w-auto">
        {nextGeometry && (
          <Button
            asChild
            variant="outline"
            size={{ initial: "2", sm: "3" }}
            className="w-full border-amber-400/50 text-amber-300 hover:border-amber-400 hover:bg-amber-400/10 sm:w-auto"
          >
            <Link
              href={getGeometryPath(nextGeometry)}
              className="flex items-center justify-center gap-2"
            >
              <span className="hidden sm:inline">Next: </span>
              <span className="sm:hidden">Next: </span>
              <span className="truncate">{nextGeometry.name}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </Flex>
  );
}
