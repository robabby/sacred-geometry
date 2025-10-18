import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import type { PlatonicSolidContent } from "./types";

/**
 * Loads content for a Platonic Solid from YAML file
 * @param slug - The slug of the solid (e.g., "tetrahedron")
 * @returns Parsed content object or null if not found/error
 */
export function getPlatonicSolidContent(
  slug: string,
): PlatonicSolidContent | null {
  try {
    const filePath = path.join(
      process.cwd(),
      "src/content/platonic-solids",
      `${slug}.yml`,
    );

    const fileContents = fs.readFileSync(filePath, "utf8");
    const content = yaml.load(fileContents) as PlatonicSolidContent;

    return content;
  } catch (error) {
    console.error(`Error loading content for ${slug}:`, error);
    return null;
  }
}
