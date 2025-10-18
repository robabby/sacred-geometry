import { describe, it, expect } from "vitest";
import {
  getGeometryPath,
  getGeometryListPath,
  getNextGeometry,
  getPreviousGeometry,
  getGeometryBySlug,
  getPlatonicSolids,
  getSacredPatterns,
  type Geometry,
} from "./geometries";

describe("Path Generation", () => {
  describe("getGeometryPath", () => {
    it("should generate correct path for platonic solid", () => {
      const tetrahedron = getGeometryBySlug("tetrahedron");
      expect(tetrahedron).toBeDefined();
      expect(getGeometryPath(tetrahedron!)).toBe("/platonic-solids/tetrahedron");
    });

    it("should generate correct path for sacred pattern", () => {
      const flowerOfLife = getGeometryBySlug("flower-of-life");
      expect(flowerOfLife).toBeDefined();
      expect(getGeometryPath(flowerOfLife!)).toBe(
        "/sacred-patterns/flower-of-life"
      );
    });

    it("should generate correct path for pattern geometry (Star Tetrahedron)", () => {
      const starTet = getGeometryBySlug("star-tetrahedron");
      expect(starTet).toBeDefined();
      expect(getGeometryPath(starTet!)).toBe("/sacred-patterns/star-tetrahedron");
    });

    it("should return root path for unknown category", () => {
      const unknownGeometry: Geometry = {
        id: "unknown",
        name: "Unknown",
        slug: "unknown",
        category: "platonic" as any, // Force invalid category
      };
      // Modify to test edge case
      const modifiedGeometry = { ...unknownGeometry, category: "invalid" as any };
      expect(getGeometryPath(modifiedGeometry)).toBe("/");
    });
  });

  describe("getGeometryListPath", () => {
    it("should return correct path for platonic category", () => {
      expect(getGeometryListPath("platonic")).toBe("/platonic-solids");
    });

    it("should return correct path for pattern category", () => {
      expect(getGeometryListPath("pattern")).toBe("/sacred-patterns");
    });
  });
});

describe("Navigation Helpers", () => {
  describe("getNextGeometry", () => {
    it("should return next platonic solid in sequence", () => {
      const tetrahedron = getGeometryBySlug("tetrahedron");
      expect(tetrahedron).toBeDefined();

      const next = getNextGeometry(tetrahedron!.id, "platonic");
      expect(next).toBeDefined();
      expect(next?.slug).toBe("hexahedron");
      expect(next?.order).toBe(2);
    });

    it("should return undefined when at the last geometry", () => {
      const icosahedron = getGeometryBySlug("icosahedron");
      expect(icosahedron).toBeDefined();

      const next = getNextGeometry(icosahedron!.id, "platonic");
      expect(next).toBeUndefined();
    });

    it("should return next sacred pattern in sequence", () => {
      const flowerOfLife = getGeometryBySlug("flower-of-life");
      expect(flowerOfLife).toBeDefined();

      const next = getNextGeometry(flowerOfLife!.id, "pattern");
      expect(next).toBeDefined();
      expect(next?.slug).toBe("seed-of-life");
    });

    it("should handle geometries without order field", () => {
      // vesica-piscis doesn't have an order field
      const vesicaPiscis = getGeometryBySlug("vesica-piscis");
      if (vesicaPiscis) {
        const next = getNextGeometry(vesicaPiscis.id, "pattern");
        // Should not appear in navigation since it lacks order
        expect(next).toBeUndefined();
      }
    });
  });

  describe("getPreviousGeometry", () => {
    it("should return previous platonic solid in sequence", () => {
      const hexahedron = getGeometryBySlug("hexahedron");
      expect(hexahedron).toBeDefined();

      const prev = getPreviousGeometry(hexahedron!.id, "platonic");
      expect(prev).toBeDefined();
      expect(prev?.slug).toBe("tetrahedron");
      expect(prev?.order).toBe(1);
    });

    it("should return undefined when at the first geometry", () => {
      const tetrahedron = getGeometryBySlug("tetrahedron");
      expect(tetrahedron).toBeDefined();

      const prev = getPreviousGeometry(tetrahedron!.id, "platonic");
      expect(prev).toBeUndefined();
    });

    it("should return previous sacred pattern in sequence", () => {
      const seedOfLife = getGeometryBySlug("seed-of-life");
      expect(seedOfLife).toBeDefined();

      const prev = getPreviousGeometry(seedOfLife!.id, "pattern");
      expect(prev).toBeDefined();
      expect(prev?.slug).toBe("flower-of-life");
    });
  });
});

describe("Data Integrity", () => {
  describe("Platonic Solids", () => {
    const platonicSolids = getPlatonicSolids();

    it("should have exactly 5 platonic solids", () => {
      expect(platonicSolids).toHaveLength(5);
    });

    it("should all have order field defined", () => {
      platonicSolids.forEach((solid) => {
        expect(solid.order).toBeDefined();
        expect(typeof solid.order).toBe("number");
      });
    });

    it("should have unique order values", () => {
      const orders = platonicSolids.map((s) => s.order);
      const uniqueOrders = new Set(orders);
      expect(uniqueOrders.size).toBe(orders.length);
    });

    it("should be sorted by order field", () => {
      const orders = platonicSolids.map((s) => s.order ?? 0);
      const sortedOrders = [...orders].sort((a, b) => a - b);
      expect(orders).toEqual(sortedOrders);
    });

    it("should all have required fields", () => {
      platonicSolids.forEach((solid) => {
        expect(solid.id).toBeDefined();
        expect(solid.name).toBeDefined();
        expect(solid.slug).toBeDefined();
        expect(solid.category).toBe("platonic");
        expect(solid.description).toBeDefined();
        expect(solid.title).toBeDefined();
        expect(solid.featured).toBe(true);
      });
    });

    it("should all have images defined", () => {
      platonicSolids.forEach((solid) => {
        expect(solid.images).toBeDefined();
        expect(solid.images?.heroImage).toBeDefined();
        expect(solid.images?.heroImage).toMatch(/^\/images\//);
      });
    });

    it("should all have mathematical properties", () => {
      platonicSolids.forEach((solid) => {
        expect(solid.mathProperties).toBeDefined();
        expect(solid.mathProperties?.faces).toBeDefined();
        expect(solid.mathProperties?.vertices).toBeDefined();
        expect(solid.mathProperties?.edges).toBeDefined();
      });
    });

    it("should all have element associations", () => {
      platonicSolids.forEach((solid) => {
        expect(solid.relatedBy?.element).toBeDefined();
        expect(["fire", "earth", "air", "water", "ether"]).toContain(
          solid.relatedBy?.element
        );
      });
    });
  });

  describe("Sacred Patterns", () => {
    const sacredPatterns = getSacredPatterns().filter((p) => p.featured);

    it("should have exactly 6 featured sacred patterns", () => {
      expect(sacredPatterns).toHaveLength(6);
    });

    it("should all have order field defined", () => {
      sacredPatterns.forEach((pattern) => {
        expect(pattern.order).toBeDefined();
        expect(typeof pattern.order).toBe("number");
      });
    });

    it("should have unique order values", () => {
      const orders = sacredPatterns.map((p) => p.order);
      const uniqueOrders = new Set(orders);
      expect(uniqueOrders.size).toBe(orders.length);
    });

    it("should all have required fields", () => {
      sacredPatterns.forEach((pattern) => {
        expect(pattern.id).toBeDefined();
        expect(pattern.name).toBeDefined();
        expect(pattern.slug).toBeDefined();
        expect(pattern.category).toBe("pattern");
        expect(pattern.description).toBeDefined();
        expect(pattern.title).toBeDefined();
        expect(pattern.featured).toBe(true);
      });
    });

    it("should all have images defined", () => {
      sacredPatterns.forEach((pattern) => {
        expect(pattern.images).toBeDefined();
        expect(pattern.images?.heroImage).toBeDefined();
        expect(pattern.images?.heroImage).toMatch(/^\/images\//);
      });
    });
  });
});
