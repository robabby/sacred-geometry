import type { MDXComponents } from "mdx/types";
import { useMDXComponents as getMDXComponents } from "./src/components/mdx-components";

/**
 * Root MDX components configuration
 * This file is required by Next.js for MDX support
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return getMDXComponents(components);
}
