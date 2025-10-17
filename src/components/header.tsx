"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { CircleDot } from "lucide-react";
import { ROUTES } from "@/util/routes";
import { cn } from "@/lib/utils";

type NavItem = {
  path: string;
  desktopLabel: string;
  mobileLabel: string;
};

export function Header() {
  const pathname = usePathname();

  const isActive = useCallback(
    (path: string) => {
      if (path === "/") return pathname === "/";
      return pathname.startsWith(path);
    },
    [pathname]
  );

  const navItems = useMemo<NavItem[]>(
    () => [
      {
        path: ROUTES.platonicSolids.path,
        desktopLabel: "Platonic Solids",
        mobileLabel: "Solids",
      },
      {
        path: ROUTES.sacredPatterns.path,
        desktopLabel: "Sacred Patterns",
        mobileLabel: "Patterns",
      },
    ],
    []
  );

  const activeIndex = useMemo(() => {
    const index = navItems.findIndex((item) => isActive(item.path));
    return index === -1 ? 0 : index;
  }, [isActive, navItems]);

  const [focusIndex, setFocusIndex] = useState(activeIndex);
  const navRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const homeRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    setFocusIndex(activeIndex);
  }, [activeIndex]);

  const focusNavItem = useCallback(
    (index: number) => {
      const clampedIndex =
        (index + navItems.length) % Math.max(navItems.length, 1);
      const node = navRefs.current[clampedIndex];
      setFocusIndex(clampedIndex);
      node?.focus();
    },
    [navItems.length]
  );

  const focusHome = useCallback(() => {
    homeRef.current?.focus();
  }, []);

  const handleHomeKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLAnchorElement>) => {
      if (navItems.length === 0) return;
      const { key } = event;
      if (
        !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "End"].includes(
          key
        )
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      switch (key) {
        case "ArrowRight":
        case "ArrowDown": {
          focusNavItem(0);
          break;
        }
        case "ArrowLeft":
        case "ArrowUp":
        case "End": {
          focusNavItem(navItems.length - 1);
          break;
        }
      }
    },
    [focusNavItem, navItems.length]
  );

  const handleNavKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (navItems.length === 0) return;
      const key = event.key;
      if (
        ![
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "Home",
          "End",
        ].includes(key)
      )
        return;

      if (focusIndex === 0 && ["ArrowLeft", "ArrowUp", "Home"].includes(key)) {
        event.preventDefault();
        event.stopPropagation();
        focusHome();
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      switch (key) {
        case "ArrowLeft": {
          focusNavItem(focusIndex - 1);
          break;
        }
        case "ArrowRight": {
          focusNavItem(focusIndex + 1);
          break;
        }
        case "ArrowUp": {
          focusNavItem(focusIndex - 1);
          break;
        }
        case "ArrowDown": {
          focusNavItem(focusIndex + 1);
          break;
        }
        case "Home": {
          focusNavItem(0);
          break;
        }
        case "End": {
          focusNavItem(navItems.length - 1);
          break;
        }
      }
    },
    [focusHome, focusIndex, focusNavItem, navItems.length]
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-500/20 bg-[#0a1628]/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href={ROUTES.home.path}
          ref={homeRef}
          className="flex items-center gap-1.5 transition-opacity hover:opacity-80 sm:gap-2"
          onKeyDown={handleHomeKeyDown}
        >
          <CircleDot className="h-5 w-5 text-amber-400 sm:h-6 sm:w-6" />
          <span className="text-base font-semibold text-amber-100 sm:text-lg">
            <span className="hidden sm:inline">Sacred Geometry</span>
            <span className="sm:hidden">Sacred Geometry</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav
          aria-label="Primary"
          className="flex items-center gap-3 sm:gap-6"
          onKeyDown={handleNavKeyDown}
        >
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              href={item.path}
              ref={(node) => {
                navRefs.current[index] = node;
              }}
              tabIndex={focusIndex === index ? 0 : -1}
              aria-current={isActive(item.path) ? "page" : undefined}
              onFocus={() => setFocusIndex(index)}
              className={cn(
                "text-xs font-medium transition-colors hover:text-amber-300 sm:text-sm",
                isActive(item.path) ? "text-amber-400" : "text-blue-200"
              )}
            >
              <span className="hidden sm:inline">{item.desktopLabel}</span>
              <span className="sm:hidden">{item.mobileLabel}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
