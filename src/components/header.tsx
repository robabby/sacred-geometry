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
import { motion } from "motion/react";
import { CircleDot, Search } from "lucide-react";
import { ROUTES } from "@/util/routes";
import { cn } from "@/lib/utils";
import { SearchCommand } from "@/components/search-command";

type NavItem = {
  path: string;
  desktopLabel: string;
  mobileLabel: string;
};

// Coming soon nav item with tooltip
function ComingSoonNavItem({
  desktopLabel,
  mobileLabel,
}: {
  desktopLabel: string;
  mobileLabel: string;
}) {
  return (
    <span
      className="group relative cursor-default text-xs font-medium text-[var(--color-dim)] sm:text-sm"
      title="Coming Soon"
    >
      <span className="hidden sm:inline">{desktopLabel}</span>
      <span className="sm:hidden">{mobileLabel}</span>

      {/* Coming Soon tooltip */}
      <span className="pointer-events-none absolute -bottom-8 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded bg-[var(--color-dark-bronze)] px-2 py-1 text-xs text-[var(--color-warm-gray)] opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        Coming Soon
      </span>
    </span>
  );
}

// Animated nav link with underline draw effect
function AnimatedNavLink({
  href,
  isActive,
  desktopLabel,
  mobileLabel,
  tabIndex,
  onFocus,
  refCallback,
}: {
  href: string;
  isActive: boolean;
  desktopLabel: string;
  mobileLabel: string;
  tabIndex: number;
  onFocus: () => void;
  refCallback: (node: HTMLAnchorElement | null) => void;
}) {
  return (
    <Link
      href={href}
      ref={refCallback}
      tabIndex={tabIndex}
      aria-current={isActive ? "page" : undefined}
      onFocus={onFocus}
      className={cn(
        "group relative text-xs font-medium transition-colors hover:text-[var(--color-gold)] focus:outline-none focus-visible:text-[var(--color-gold)] sm:text-sm",
        isActive ? "text-[var(--color-gold)]" : "text-[var(--color-warm-gray)]"
      )}
    >
      <span className="hidden sm:inline">{desktopLabel}</span>
      <span className="sm:hidden">{mobileLabel}</span>

      {/* Underline - draws on hover, stays if active */}
      <motion.span
        className="absolute -bottom-1 left-0 h-0.5 bg-[var(--color-gold)]"
        initial={false}
        animate={{
          width: isActive ? "100%" : "0%",
          opacity: isActive ? 1 : 0,
        }}
        whileHover={{
          width: "100%",
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          boxShadow: isActive ? "0 0 8px var(--glow-gold)" : "none",
        }}
      />
    </Link>
  );
}

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
    <>
      {/* Global Search Command - listens for ⌘K */}
      <SearchCommand />

      <header className="sticky top-0 z-50 w-full border-b border-[var(--border-gold)] bg-[var(--color-obsidian)]/95 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link
            href={ROUTES.home.path}
            ref={homeRef}
            className="flex items-center gap-1.5 transition-opacity hover:opacity-80 sm:gap-2"
            onKeyDown={handleHomeKeyDown}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.2,
              }}
            >
              <CircleDot className="h-5 w-5 text-[var(--color-gold)] sm:h-6 sm:w-6" />
            </motion.div>
            <span className="font-heading text-lg font-semibold text-[var(--color-cream)] sm:text-xl">
              Sacred Geometry
            </span>
          </Link>

          {/* Right side: Search + Navigation */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Button */}
            <button
              onClick={() => {
                // Trigger the ⌘K keyboard event
                const event = new KeyboardEvent("keydown", {
                  key: "k",
                  metaKey: true,
                  bubbles: true,
                });
                document.dispatchEvent(event);
              }}
              className="flex items-center gap-1.5 rounded-md border border-[var(--border-gold)] bg-[var(--color-warm-charcoal)] px-2 py-1.5 text-xs font-medium text-[var(--color-warm-gray)] transition-colors hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-dark-bronze)] hover:text-[var(--color-gold)] sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm"
              aria-label="Search geometries"
            >
              <Search className="h-3.5 w-3.5 text-[var(--color-gold)]/70 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden rounded border border-[var(--border-gold)] bg-[var(--color-dark-bronze)] px-1.5 py-0.5 text-xs text-[var(--color-gold)]/70 md:inline">
                ⌘K
              </kbd>
            </button>

            {/* Navigation */}
            <nav
              aria-label="Primary"
              className="flex items-center gap-3 sm:gap-6"
              onKeyDown={handleNavKeyDown}
            >
              {navItems.map((item, index) => (
                <AnimatedNavLink
                  key={item.path}
                  href={item.path}
                  isActive={isActive(item.path)}
                  desktopLabel={item.desktopLabel}
                  mobileLabel={item.mobileLabel}
                  tabIndex={focusIndex === index ? 0 : -1}
                  onFocus={() => setFocusIndex(index)}
                  refCallback={(node) => {
                    navRefs.current[index] = node;
                  }}
                />
              ))}

              {/* Coming Soon items */}
              <ComingSoonNavItem desktopLabel="Journal" mobileLabel="Journal" />
              <ComingSoonNavItem desktopLabel="Shop" mobileLabel="Shop" />
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
