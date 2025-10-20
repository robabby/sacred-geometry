/**
 * Content loading and formatting utilities
 * Loads MDX content files for both Platonic Solids and Sacred Patterns
 */

// Platonic Solids (MDX)
export {
  getPlatonicSolidContent,
  getAllPlatonicSolidContentSlugs,
  platonicSolidContentExists,
  type PlatonicSolidContent,
} from "./platonic-solids";

// Sacred Patterns (MDX)
export {
  getSacredPatternContent,
  getAllSacredPatternContentSlugs,
  sacredPatternContentExists,
  type SacredPatternContent,
} from "./sacred-patterns";
