import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { Heading, Text } from "@radix-ui/themes";
import { RelatedGeometries } from "@/components/related-geometries";

/**
 * Named h2 component with displayName for MDXSection title extraction
 * The displayName "MDXHeading2" is checked by extractTitleFromChildren()
 * in mdx-section.tsx to identify h2 elements for collapsible section titles.
 */
function MDXHeading2({ children }: { children: ReactNode }) {
  return (
    <Heading mb="2" size="5" className="text-amber-300">
      {children}
    </Heading>
  );
}
MDXHeading2.displayName = "MDXHeading2";

/**
 * Get custom MDX components for Sacred Pattern content
 * Non-hook version for use in server-side functions
 */
export function getMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children }) => (
      <Heading
        mb="2"
        size="6"
        className="text-amber-300"
      >
        {children}
      </Heading>
    ),
    h2: MDXHeading2,
    h3: ({ children }) => (
      <Heading size="4" mb="3" className="text-amber-200">
        {children}
      </Heading>
    ),

    // Paragraphs
    p: ({ children }) => (
      <Text as="p" mb="2" className="text-[var(--color-cream)]">
        {children}
      </Text>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="mb-4 space-y-3 text-[var(--color-cream)]">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-4 space-y-3 text-[var(--color-cream)]">{children}</ol>
    ),
    li: ({ children }) => <li>{children}</li>,

    // Strong text
    strong: ({ children }) => (
      <strong className="text-amber-300">{children}</strong>
    ),

    // Wrapper for sections - wraps content between h2s in Cards
    wrapper: ({ children }) => <>{children}</>,

    // Custom components
    RelatedGeometries,

    ...components,
  };
}

/**
 * Custom MDX components for Sacred Pattern content
 * Hook version for use in client components
 * These components style MDX content to match our design system
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return getMDXComponents(components);
}
