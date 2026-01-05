import type { ReactElement } from "react";

/**
 * Section information for Table of Contents
 */
export interface SectionInfo {
  id: string;
  title: string;
}

/**
 * MDX content with extracted sections for navigation
 */
export interface ContentWithSections {
  slug: string;
  sections: SectionInfo[];
  content: ReactElement;
}

/**
 * Extract sections from MDX source by parsing h2 headings
 * Used as fallback when frontmatter doesn't include sections
 */
export function extractSectionsFromMDX(source: string): SectionInfo[] {
  const h2Regex = /^## (.+)$/gm;
  const sections: SectionInfo[] = [];
  let match;

  while ((match = h2Regex.exec(source)) !== null) {
    const title = match[1]?.trim();
    if (!title) continue;
    // Generate URL-friendly ID from title
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    sections.push({ id, title });
  }

  return sections;
}
