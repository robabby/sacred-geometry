/**
 * Platonic Solids Data
 *
 * The five regular convex polyhedra - the only possible three-dimensional
 * forms with all faces being identical regular polygons.
 */

import type { Geometry } from "./geometries.types";
import { getPlatonicImages } from "./image-paths";

export const PLATONIC_SOLIDS: Record<string, Geometry> = {
  tetrahedron: {
    id: "tetrahedron",
    name: "Tetrahedron",
    slug: "tetrahedron",
    category: "platonic",
    title: "The Tetrahedron: Gateway of Fire",
    description:
      "The tetrahedron is the first Platonic Solid, the simplest three-dimensional form that can exist. It represents fire, transformation, and the spark of creation.",
    dualOfTitle: "Self-dual (Tetrahedron)",
    relatedBy: {
      element: "fire",
      property: [
        "self-dual",
        "simplest polyhedron",
        "transformation",
        "spark of creation",
      ],
    },
    images: getPlatonicImages("tetrahedron"),
    mathProperties: {
      faces: 4,
      faceShape: "Triangular",
      vertices: 4,
      edges: 6,
    },
    featured: true,
    order: 1,
  },

  hexahedron: {
    id: "hexahedron",
    name: "Hexahedron (Cube)",
    slug: "hexahedron",
    category: "platonic",
    title: "The Hexahedron (Cube): Foundation of Earth",
    description:
      "The hexahedron, commonly known as the cube, represents the element of Earth—stability, structure, and the material world. It is the most grounded of all Platonic Solids.",
    dualOfTitle: "Octahedron",
    relatedBy: {
      element: "earth",
      property: ["stability", "foundation", "structure", "material world"],
    },
    images: getPlatonicImages("hexahedron"),
    mathProperties: {
      faces: 6,
      faceShape: "Square",
      vertices: 8,
      edges: 12,
    },
    featured: true,
    order: 2,
  },

  octahedron: {
    id: "octahedron",
    name: "Octahedron",
    slug: "octahedron",
    category: "platonic",
    title: "The Octahedron: Breath of Air",
    description:
      "The octahedron embodies the element of Air—intellect, communication, and the breath of life. It represents perfect balance between the material and the ethereal.",
    dualOfTitle: "Cube (Hexahedron)",
    relatedBy: {
      element: "air",
      property: [
        "balance",
        "integration",
        "intellect",
        "communication",
        "breath of life",
      ],
    },
    images: {
      heroImage: `/images/geometries/platonic-solids/octahedron/octahedron-3d.svg`,
      solidImage: `/images/geometries/platonic-solids/octahedron/octahedron-solid.svg`,
      wireframeImage: `/images/geometries/platonic-solids/octahedron/octahedron-primary.svg`,
      netImage: `/images/geometries/platonic-solids/octahedron/octahedron-net.svg`,
    },
    mathProperties: {
      faces: 8,
      faceShape: "Triangular",
      vertices: 6,
      edges: 12,
    },
    featured: true,
    order: 3,
  },

  icosahedron: {
    id: "icosahedron",
    name: "Icosahedron",
    slug: "icosahedron",
    category: "platonic",
    title: "The Icosahedron: Flow of Water",
    description:
      "The icosahedron embodies the element of Water—emotion, fluidity, and adaptability. It is the shape of flow and transformation, rolling smoothly like water itself.",
    dualOfTitle: "Dodecahedron",
    relatedBy: {
      element: "water",
      property: [
        "flow",
        "transformation",
        "emotion",
        "fluidity",
        "adaptability",
      ],
    },
    images: getPlatonicImages("icosahedron"),
    mathProperties: {
      faces: 20,
      faceShape: "Triangular",
      vertices: 12,
      edges: 30,
    },
    featured: true,
    order: 4,
  },

  dodecahedron: {
    id: "dodecahedron",
    name: "Dodecahedron",
    slug: "dodecahedron",
    category: "platonic",
    title: "The Dodecahedron: Gateway to Spirit",
    description:
      "The dodecahedron represents Ether—the fifth element beyond the physical four. It is the shape of the cosmos itself, embodying the universe and higher consciousness.",
    dualOfTitle: "Icosahedron",
    relatedBy: {
      element: "ether",
      property: [
        "universe",
        "consciousness",
        "prana",
        "cosmic structure",
        "fifth element",
      ],
    },
    images: {
      heroImage: `/images/geometries/platonic-solids/dodecahedron/dodecahedron-3d.svg`,
      solidImage: `/images/geometries/platonic-solids/dodecahedron/dodecahedron-primary.svg`,
      wireframeImage: `/images/geometries/platonic-solids/dodecahedron/dodecahedron-wireframe.svg`,
      netImage: `/images/geometries/platonic-solids/dodecahedron/dodecahedron-net.svg`,
    },
    mathProperties: {
      faces: 12,
      faceShape: "Pentagonal",
      vertices: 20,
      edges: 30,
    },
    featured: true,
    order: 5,
  },
};
