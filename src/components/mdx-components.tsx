import type { MDXComponents } from "mdx/types";
import { Heading, Text } from "@radix-ui/themes";
import { RelatedGeometries } from "@/components/related-geometries";

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
    h2: ({ children }) => (
      <Heading
        mb="2"
        size="5"
        className="text-amber-300"
      >
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading size="4" mb="3" className="text-amber-200">
        {children}
      </Heading>
    ),

    // Paragraphs
    p: ({ children }) => (
      <Text as="p" mb="2" className="text-blue-200">
        {children}
      </Text>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="mb-4 space-y-3 text-blue-200">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-4 space-y-3 text-blue-200">{children}</ol>
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
