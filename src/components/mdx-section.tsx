"use client";

import { type ReactNode, useRef, useEffect, useId } from "react";
import { Card } from "@radix-ui/themes";
import { useContentLayoutSafe } from "./content-layout-context";

interface MDXSectionProps {
  children: ReactNode;
}

/**
 * Generate URL-friendly ID from title
 */
function generateIdFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Extract the first h2 text from children to determine section ID
 */
function extractH2TextFromChildren(children: ReactNode): string | null {
  // Convert children to array and look for text patterns
  // This is a simplified approach that works with serialized MDX content
  const childArray = Array.isArray(children) ? children : [children];

  for (const child of childArray) {
    if (child && typeof child === "object" && "props" in child) {
      const props = child.props as Record<string, unknown>;
      // Check if this is an h2 element
      if (child.type === "h2" || (props && props.id)) {
        if (typeof props.children === "string") {
          return props.children;
        }
      }
    }
  }

  return null;
}

/**
 * MDX Section Component
 *
 * Renders content sections as styled cards.
 * When used within ContentLayout, tracks active section for ToC highlighting.
 */
export function MDXSection({ children }: MDXSectionProps) {
  const context = useContentLayoutSafe();
  const sectionRef = useRef<HTMLDivElement>(null);
  const fallbackId = useId();

  // Try to extract title from h2 in children for ID generation
  const extractedTitle = extractH2TextFromChildren(children);

  // Determine section ID
  let id: string;

  if (context && extractedTitle) {
    // Find matching section by title for consistent ID
    const normalizedTitle = extractedTitle.toLowerCase().trim();
    const matchingSection = context.sections.find(
      (s) => s.title.toLowerCase().trim() === normalizedTitle
    );

    id = matchingSection?.id ?? generateIdFromTitle(extractedTitle);
  } else if (extractedTitle) {
    id = generateIdFromTitle(extractedTitle);
  } else {
    id = fallbackId;
  }

  // Set up IntersectionObserver to track active section for ToC
  useEffect(() => {
    if (!context) return;

    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            context.setActiveSection(id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [id, context]);

  return (
    <Card
      ref={sectionRef}
      id={id}
      className="mb-6 border-[var(--border-gold)] bg-gradient-to-br from-[var(--color-warm-charcoal)] to-[var(--color-dark-bronze)] p-6 sm:mb-8 sm:p-8"
    >
      {children}
    </Card>
  );
}
