/**
 * Content structure for Platonic Solid pages
 * Loaded from YAML files in src/content/platonic-solids/
 */
export interface PlatonicSolidContent {
  /** Slug matching the geometry data model (e.g., "tetrahedron") */
  slug: string;

  /** Presentational order string (e.g., "First Solid", "Second Solid") */
  order: string;

  /** Symbolic properties and spiritual meanings */
  symbolic: {
    /** Opening paragraph introducing symbolic significance */
    introduction: string;
    /** List of symbolic associations and meanings */
    associations: string[];
  };

  /** Mathematical properties and geometric insights */
  mathematical: {
    /** Array of paragraphs describing mathematical properties */
    insights: string[];
  };

  /** Real-world appearances in nature and culture */
  nature: {
    /** Opening paragraph introducing nature examples */
    introduction: string;
    /** Categorized examples of the geometry in nature/culture */
    examples: Array<{
      /** Category or domain (e.g., "Chemistry", "Crystals") */
      category: string;
      /** Specific example description */
      description: string;
    }>;
  };
}
