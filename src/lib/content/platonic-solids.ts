import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { MDXSection } from "@/components/mdx-section";
import { getMDXComponents } from "@/components/mdx-components";

/**
 * Platonic Solid MDX Content Interface
 */
export interface PlatonicSolidContent {
  slug: string;
  content: React.ReactElement;
}

/**
 * Get the path to a Platonic Solid MDX file
 */
function getContentPath(slug: string): string {
  return path.join(
    process.cwd(),
    "src/content/platonic-solids",
    `${slug}.mdx`
  );
}

/**
 * Check if a Platonic Solid MDX file exists
 */
export function platonicSolidContentExists(slug: string): boolean {
  const filePath = getContentPath(slug);
  return fs.existsSync(filePath);
}

/**
 * Load and compile Platonic Solid MDX content
 */
export async function getPlatonicSolidContent(
  slug: string
): Promise<PlatonicSolidContent | null> {
  const filePath = getContentPath(slug);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");

  // Get custom MDX components and merge with Section component
  const customComponents = getMDXComponents({
    Section: MDXSection,
  });

  const { content, frontmatter } = await compileMDX<{
    slug: string;
  }>({
    source,
    options: { parseFrontmatter: true },
    components: customComponents,
  });

  return {
    slug: frontmatter.slug ?? slug,
    content,
  };
}

/**
 * Get all available Platonic Solid content slugs
 */
export function getAllPlatonicSolidContentSlugs(): string[] {
  const contentDir = path.join(
    process.cwd(),
    "src/content/platonic-solids"
  );

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}
