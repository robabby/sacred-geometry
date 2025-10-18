import { describe, it, expect } from "vitest";
import {
  GEOMETRIES,
  getAllGeometries,
  getGeometryById,
  getPlatonicSolids,
  getSacredPatterns,
} from "./geometries";

describe("Data Model Validation", () => {
  const allGeometries = getAllGeometries();

  describe("All Geometries", () => {
    it("should have at least 16 geometries", () => {
      expect(allGeometries.length).toBeGreaterThanOrEqual(16);
    });

    it("should all have unique IDs", () => {
      const ids = allGeometries.map((g) => g.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("should all have unique slugs", () => {
      const slugs = allGeometries.map((g) => g.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it("should have valid category for all geometries", () => {
      allGeometries.forEach((geometry) => {
        expect(["platonic", "pattern"]).toContain(geometry.category);
      });
    });

    it("should have matching id and key in GEOMETRIES object", () => {
      Object.entries(GEOMETRIES).forEach(([key, geometry]) => {
        expect(geometry.id).toBe(key);
      });
    });
  });

  describe("Relationship Integrity", () => {
    it("should have valid dual references", () => {
      allGeometries
        .filter((g) => g.dual)
        .forEach((geometry) => {
          const dual = getGeometryById(geometry.dual!);
          expect(dual).toBeDefined();
          // For self-dual geometries
          if (geometry.dual === geometry.id) {
            expect(dual?.id).toBe(geometry.id);
          }
        });
    });

    it("should have valid contains references", () => {
      allGeometries
        .filter((g) => g.contains)
        .forEach((geometry) => {
          geometry.contains!.forEach((containedId) => {
            const contained = getGeometryById(containedId);
            expect(contained).toBeDefined();
          });
        });
    });

    it("should have valid appearsIn references", () => {
      allGeometries
        .filter((g) => g.appearsIn)
        .forEach((geometry) => {
          geometry.appearsIn!.forEach((parentId) => {
            const parent = getGeometryById(parentId);
            expect(parent).toBeDefined();
          });
        });
    });

    it("should have reciprocal contains/appearsIn relationships", () => {
      allGeometries
        .filter((g) => g.contains)
        .forEach((parent) => {
          parent.contains!.forEach((childId) => {
            const child = getGeometryById(childId);
            // Child should list parent in appearsIn
            expect(child?.appearsIn).toContain(parent.id);
          });
        });
    });
  });

  describe("Featured Geometries", () => {
    it("should have exactly 5 featured Platonic Solids", () => {
      const featuredSolids = getPlatonicSolids().filter((s) => s.featured);
      expect(featuredSolids).toHaveLength(5);
    });

    it("should have exactly 11 featured Sacred Patterns", () => {
      const featuredPatterns = getSacredPatterns().filter((p) => p.featured);
      expect(featuredPatterns).toHaveLength(11);
    });

    it("all featured geometries should have order field", () => {
      const featured = allGeometries.filter((g) => g.featured);
      featured.forEach((geometry) => {
        expect(geometry.order).toBeDefined();
        expect(typeof geometry.order).toBe("number");
        expect(geometry.order).toBeGreaterThan(0);
      });
    });
  });

  describe("Image Paths", () => {
    it("should have valid heroImage paths for featured geometries", () => {
      const featured = allGeometries.filter((g) => g.featured);
      featured.forEach((geometry) => {
        expect(geometry.images?.heroImage).toBeDefined();
        expect(geometry.images?.heroImage).toMatch(/^\/images\/geometries\//);
        expect(geometry.images?.heroImage).toMatch(/\.(svg|png|jpg|jpeg)$/);
      });
    });

    it("Platonic Solids should have all image variants", () => {
      getPlatonicSolids().forEach((solid) => {
        expect(solid.images).toBeDefined();
        expect(solid.images?.heroImage).toBeDefined();
        expect(solid.images?.solidImage).toBeDefined();
        expect(solid.images?.wireframeImage).toBeDefined();
        expect(solid.images?.netImage).toBeDefined();
      });
    });

    it("should follow naming convention for image paths", () => {
      allGeometries
        .filter((g) => g.images?.heroImage)
        .forEach((geometry) => {
          const expectedPath = `/images/geometries/${geometry.category === "platonic" ? "platonic-solids" : "sacred-patterns"}/${geometry.slug}/`;
          expect(geometry.images?.heroImage).toContain(expectedPath);
        });
    });
  });

  describe("Platonic Solids Specific", () => {
    const solids = getPlatonicSolids();

    it("should have exactly 5 Platonic Solids", () => {
      expect(solids).toHaveLength(5);
    });

    it("should all have dual relationships", () => {
      solids.forEach((solid) => {
        expect(solid.dual).toBeDefined();
      });
    });

    it("should all have element associations", () => {
      solids.forEach((solid) => {
        expect(solid.relatedBy?.element).toBeDefined();
      });
    });

    it("should have unique element associations", () => {
      const elements = solids.map((s) => s.relatedBy?.element);
      const uniqueElements = new Set(elements);
      expect(uniqueElements.size).toBe(5);
    });

    it("should all have mathematical properties", () => {
      solids.forEach((solid) => {
        expect(solid.mathProperties).toBeDefined();
        expect(solid.mathProperties?.faces).toBeGreaterThan(0);
        expect(solid.mathProperties?.vertices).toBeGreaterThan(0);
        expect(solid.mathProperties?.edges).toBeGreaterThan(0);
      });
    });

    it("should satisfy Euler's formula (V - E + F = 2)", () => {
      solids.forEach((solid) => {
        const V = solid.mathProperties?.vertices ?? 0;
        const E = solid.mathProperties?.edges ?? 0;
        const F = solid.mathProperties?.faces ?? 0;
        expect(V - E + F).toBe(2);
      });
    });

    it("should have complete title field", () => {
      solids.forEach((solid) => {
        expect(solid.title).toBeDefined();
        expect(solid.title).toContain(solid.name);
      });
    });
  });

  describe("Sacred Patterns Specific", () => {
    const patterns = getSacredPatterns().filter((p) => p.featured);

    it("should all have title field", () => {
      patterns.forEach((pattern) => {
        expect(pattern.title).toBeDefined();
        expect(pattern.title?.length).toBeGreaterThan(0);
      });
    });

    it("should all have description field", () => {
      patterns.forEach((pattern) => {
        expect(pattern.description).toBeDefined();
        expect(pattern.description?.length).toBeGreaterThan(0);
      });
    });

    it("should all have relatedBy properties", () => {
      patterns.forEach((pattern) => {
        expect(pattern.relatedBy?.property).toBeDefined();
        expect(pattern.relatedBy?.property?.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Slug Format", () => {
    it("should all have lowercase slugs", () => {
      allGeometries.forEach((geometry) => {
        expect(geometry.slug).toBe(geometry.slug.toLowerCase());
      });
    });

    it("should all have kebab-case slugs", () => {
      allGeometries.forEach((geometry) => {
        expect(geometry.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      });
    });

    it("should not have spaces in slugs", () => {
      allGeometries.forEach((geometry) => {
        expect(geometry.slug).not.toContain(" ");
      });
    });
  });

  describe("Order Field Validation", () => {
    it("Platonic Solids should have sequential orders (1-5)", () => {
      const solids = getPlatonicSolids().sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
      );
      const orders = solids.map((s) => s.order);
      expect(orders).toEqual([1, 2, 3, 4, 5]);
    });

    it("Featured Sacred Patterns should have sequential orders (1-11)", () => {
      const patterns = getSacredPatterns()
        .filter((p) => p.featured)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      const orders = patterns.map((p) => p.order);
      expect(orders).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    });

    it("should not have duplicate order values within a category", () => {
      const checkCategory = (category: string) => {
        const geometries = allGeometries
          .filter((g) => g.category === category && g.order !== undefined)
          .map((g) => g.order);
        const unique = new Set(geometries);
        expect(unique.size).toBe(geometries.length);
      };

      checkCategory("platonic");
      checkCategory("pattern");
    });
  });
});
