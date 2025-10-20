import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { MDXSection } from "@/components/mdx-section";
import { getMDXComponents } from "@/components/mdx-components";

/**
 * Sacred Pattern MDX Content Interface
 */
export interface SacredPatternContent {
  slug: string;
  sections?: Array<{
    title: string;
    id: string;
  }>;
  content: React.ReactElement;
}

/**
 * Get the path to a Sacred Pattern MDX file
 */
function getContentPath(slug: string): string {
  return path.join(
    process.cwd(),
    "src/content/sacred-patterns",
    `${slug}.mdx`
  );
}

/**
 * Check if a Sacred Pattern MDX file exists
 */
export function sacredPatternContentExists(slug: string): boolean {
  const filePath = getContentPath(slug);
  return fs.existsSync(filePath);
}

/**
 * Load and compile Sacred Pattern MDX content
 */
export async function getSacredPatternContent(
  slug: string
): Promise<SacredPatternContent | null> {
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
    sections?: Array<{ title: string; id: string }>;
  }>({
    source,
    options: { parseFrontmatter: true },
    components: customComponents,
  });

  return {
    slug: frontmatter.slug ?? slug,
    sections: frontmatter.sections,
    content,
  };
}

/**
 * Get all available Sacred Pattern content slugs
 */
export function getAllSacredPatternContentSlugs(): string[] {
  const contentDir = path.join(
    process.cwd(),
    "src/content/sacred-patterns"
  );

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}
