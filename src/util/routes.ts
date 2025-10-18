export const ROUTES = {
  home: {
    name: "Home",
    path: "/",
    description: "Welcome to the world of sacred geometry",
    order: 0,
  },
  platonicSolids: {
    name: "Platonic Solids",
    path: "/platonic-solids",
    description: "The five perfect forms from which all matter emerges",
    order: 1,
    children: {
      tetrahedron: {
        name: "Tetrahedron",
        path: "/platonic-solids/tetrahedron",
        description:
          "The simplest Platonic solid, symbolizing fire and balance.",
        order: 1,
      },
      hexahedron: {
        name: "Hexahedron (Cube)",
        path: "/platonic-solids/hexahedron",
        description: "Represents earth, stability, and groundedness.",
        order: 2,
      },
      octahedron: {
        name: "Octahedron",
        path: "/platonic-solids/octahedron",
        description: "Symbolizes air, intellect, and communication.",
        order: 3,
      },
      dodecahedron: {
        name: "Dodecahedron",
        path: "/platonic-solids/dodecahedron",
        description:
          "Associated with the universe, spirit, and higher consciousness.",
        order: 4,
      },
      icosahedron: {
        name: "Icosahedron",
        path: "/platonic-solids/icosahedron",
        description: "Represents water, emotion, and fluidity.",
        order: 5,
      },
    },
  },
  sacredPatterns: {
    name: "Sacred Patterns",
    path: "/sacred-patterns",
    description: "Infinite geometries that encode universal principles",
    order: 2,
    children: {
      vesicaPiscis: {
        name: "Vesica Piscis",
        path: "/sacred-patterns/vesica-piscis",
        description:
          "The intersection of two circles, representing duality and the portal of creation",
        order: 1,
      },
      seedOfLife: {
        name: "Seed of Life",
        path: "/sacred-patterns/seed-of-life",
        description:
          "Seven circles in perfect symmetry, representing the seven days of creation",
        order: 2,
      },
      fruitOfLife: {
        name: "Fruit of Life",
        path: "/sacred-patterns/fruit-of-life",
        description:
          "Thirteen circles extracted from the Flower of Life, representing the blueprint of the universe",
        order: 3,
      },
      flowerOfLife: {
        name: "Flower of Life",
        path: "/sacred-patterns/flower-of-life",
        description:
          "Ancient symbol of creation consisting of overlapping circles representing the fundamental forms of space and time",
        order: 4,
      },
      metatronsCube: {
        name: "Metatron's Cube",
        path: "/sacred-patterns/metatrons-cube",
        description:
          "Contains all five Platonic Solids and represents the geometric pattern of the universe",
        order: 5,
      },
      sriYantra: {
        name: "Sri Yantra",
        path: "/sacred-patterns/sri-yantra",
        description:
          "Sacred Hindu geometry representing the union of divine masculine and feminine energies",
        order: 6,
      },
      starTetrahedron: {
        name: "Star Tetrahedron",
        path: "/sacred-patterns/star-tetrahedron",
        description:
          "Two interlocking tetrahedrons forming a three-dimensional Star of David, representing the union of spirit and matter",
        order: 7,
      },
      goldenRatio: {
        name: "Golden Ratio",
        path: "/sacred-patterns/golden-ratio",
        description:
          "Divine proportion (φ ≈ 1.618) that appears throughout nature and sacred architecture",
        order: 8,
      },
      philosophersStone: {
        name: "Philosopher's Stone",
        path: "/sacred-patterns/philosophers-stone",
        description:
          "Ancient alchemical symbol representing spiritual transformation and the union of opposites",
        order: 9,
      },
      pentagram: {
        name: "Pentagram",
        path: "/sacred-patterns/pentagram",
        description:
          "Five-pointed star embodying the golden ratio and representing the human form",
        order: 10,
      },
    },
  },
};
