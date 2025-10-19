/**
 * Image Path Utilities
 *
 * Helper functions to generate consistent image paths for geometries
 */

/**
 * Get image path for a Platonic Solid
 */
export function getPlatonicImagePath(
  slug: string,
  variant: "3d" | "solid" | "wireframe" | "net" | "primary"
): string {
  return `/images/geometries/platonic-solids/${slug}/${slug}-${variant}.svg`;
}

/**
 * Get image path for a Sacred Pattern
 */
export function getPatternImagePath(
  slug: string,
  variant: "primary" | "wireframe" | "net" | "with-flower" = "primary"
): string {
  return `/images/geometries/sacred-patterns/${slug}/${slug}-${variant}.svg`;
}

/**
 * Get all standard image paths for a Platonic Solid
 */
export function getPlatonicImages(slug: string) {
  return {
    heroImage: getPlatonicImagePath(slug, "3d"),
    solidImage: getPlatonicImagePath(slug, "solid"),
    wireframeImage: getPlatonicImagePath(slug, "wireframe"),
    netImage: getPlatonicImagePath(slug, "net"),
  };
}

/**
 * Get hero image path for a Sacred Pattern
 */
export function getPatternHeroImage(slug: string) {
  return {
    heroImage: getPatternImagePath(slug, "primary"),
  };
}
