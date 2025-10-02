"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleDot } from "lucide-react";
import { ROUTES } from "@/util/routes";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-500/20 bg-[#0a1628]/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={ROUTES.home.path} className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity">
          <CircleDot className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />
          <span className="text-base sm:text-lg font-semibold text-amber-100">
            <span className="hidden sm:inline">Sacred Geometry</span>
            <span className="sm:hidden">Sacred Geometry</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-3 sm:gap-6">
          <Link
            href={ROUTES.platonicSolids.path}
            className={cn(
              "text-xs sm:text-sm font-medium transition-colors hover:text-amber-300",
              isActive(ROUTES.platonicSolids.path)
                ? "text-amber-400"
                : "text-blue-200"
            )}
          >
            <span className="hidden sm:inline">Platonic Solids</span>
            <span className="sm:hidden">Solids</span>
          </Link>
          <Link
            href={ROUTES.sacredPatterns.path}
            className={cn(
              "text-xs sm:text-sm font-medium transition-colors hover:text-amber-300",
              isActive(ROUTES.sacredPatterns.path)
                ? "text-amber-400"
                : "text-blue-200"
            )}
          >
            <span className="hidden sm:inline">Sacred Patterns</span>
            <span className="sm:hidden">Patterns</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
