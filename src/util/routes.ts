export const ROUTES = {
  home: {
    "name": "Home",
    "path": "/",
    "description": "Welcome to the world of sacred geometry",
    "order": 0
  },
  geometries: {
    "name": "Geometries",
    "path": "/geometries",
    "description": "Explore the fundamental shapes that underpin reality",
    "order": 1
  },
  platonicSolids: {
    "name": "Platonic Solids",
    "path": "/geometries/platonic-solids",
    "description": "The five perfect forms from which all matter emerges",
    "order": 2,
    children: {
      tetrahedron: {
        "name": "Tetrahedron",
        "path": "/geometries/platonic-solids/tetrahedron",
        "description": "The simplest Platonic solid, symbolizing fire and balance.",
        "order": 1
      },
      hexahedron: {
        "name": "Hexahedron (Cube)",
        "path": "/geometries/platonic-solids/hexahedron",
        "description": "Represents earth, stability, and groundedness.",
        "order": 2
      },
      octahedron: {
        "name": "Octahedron",
        "path": "/geometries/platonic-solids/octahedron",
        "description": "Symbolizes air, intellect, and communication.",
        "order": 3
      },
      dodecahedron: {
        "name": "Dodecahedron",
        "path": "/geometries/platonic-solids/dodecahedron",
        "description": "Associated with the universe, spirit, and higher consciousness.",
        "order": 4
      },
      icosahedron: {
        "name": "Icosahedron",
        "path": "/geometries/platonic-solids/icosahedron",
        "description": "Represents water, emotion, and fluidity.",
        "order": 5
      }
    }
  },
  sacredPatterns: {
    "name": "Sacred Patterns",
    "path": "/geometries/sacred-patterns",
    "description": "Infinite geometries that encode universal principles",
    "order": 3
  }
}