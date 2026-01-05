"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, List } from "lucide-react";
import { Heading, Text } from "@radix-ui/themes";
import { cn } from "@/lib/utils";
import { useContentLayout } from "./content-layout-context";

// Consistent easing from the design system
const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/**
 * Scroll to a section
 */
function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition =
      elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

/**
 * Desktop Table of Contents - Sticky sidebar
 */
function DesktopTableOfContents() {
  const { sections, activeSection } = useContentLayout();

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden lg:block lg:w-64 lg:flex-shrink-0"
    >
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <div className="border-l-2 border-[var(--border-gold)] pl-4">
          <Heading
            size="3"
            className="mb-4 font-heading text-[var(--color-gold-muted)]"
          >
            Contents
          </Heading>

          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "block w-full cursor-pointer text-left text-sm transition-all duration-200",
                    "py-1.5 pr-2",
                    "hover:text-[var(--color-gold-bright)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-obsidian)]",
                    activeSection === section.id
                      ? "font-medium text-[var(--color-gold)] translate-x-1"
                      : "text-[var(--color-warm-gray)]"
                  )}
                  aria-current={
                    activeSection === section.id ? "true" : undefined
                  }
                >
                  <span
                    className={cn(
                      "inline-block transition-all duration-200",
                      activeSection === section.id && "translate-x-1"
                    )}
                  >
                    {section.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

/**
 * Mobile Table of Contents - Dropdown at top of content
 */
function MobileTableOfContents() {
  const { sections, activeSection } = useContentLayout();
  const [isOpen, setIsOpen] = useState(false);

  const handleSectionClick = useCallback((id: string) => {
    setIsOpen(false);
    scrollToSection(id);
  }, []);

  if (sections.length === 0) return null;

  const currentSection = sections.find((s) => s.id === activeSection);

  return (
    <div className="sticky top-16 z-20 mb-6 lg:hidden">
      <div className="rounded-lg border border-[var(--border-gold)] bg-[var(--color-obsidian)]/95 backdrop-blur-sm">
        {/* Dropdown trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full cursor-pointer items-center justify-between p-4",
            "transition-colors duration-200",
            "hover:bg-[var(--color-warm-charcoal)]/50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-inset"
          )}
          aria-expanded={isOpen}
          aria-controls="mobile-toc-menu"
        >
          <div className="flex items-center gap-3">
            <List className="h-4 w-4 text-[var(--color-gold)]" />
            <Text size="2" weight="medium" className="text-[var(--color-cream)]">
              {currentSection?.title ?? "Jump to section"}
            </Text>
          </div>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="text-[var(--color-gold)]"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </button>

        {/* Dropdown menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-toc-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.2, ease: EASE },
                opacity: { duration: 0.15, ease: EASE },
              }}
              className="overflow-hidden border-t border-[var(--border-gold)]/50"
            >
              <nav aria-label="Table of contents">
                <ul className="max-h-64 overflow-y-auto p-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => handleSectionClick(section.id)}
                        className={cn(
                          "block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm",
                          "transition-colors duration-150",
                          "hover:bg-[var(--color-warm-charcoal)]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-inset",
                          activeSection === section.id
                            ? "bg-[var(--color-warm-charcoal)] font-medium text-[var(--color-gold)]"
                            : "text-[var(--color-cream)]"
                        )}
                        aria-current={
                          activeSection === section.id ? "true" : undefined
                        }
                      >
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Table of Contents component
 * Renders desktop sidebar and mobile dropdown versions
 */
export function TableOfContents() {
  return (
    <>
      <DesktopTableOfContents />
      <MobileTableOfContents />
    </>
  );
}

export { DesktopTableOfContents, MobileTableOfContents };
