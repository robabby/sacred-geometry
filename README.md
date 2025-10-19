# Sacred Geometry Web App

An interactive educational web application for exploring, visualizing, and learning about sacred geometry through immersive 3D experiences.

> **Live Site**: [sacred-geometry.vercel.app](https://sacred-geometry.vercel.app/)

## Overview

Sacred Geometry Web App bridges ancient wisdom with modern web technology, making sacred geometry accessible and interactive for students, seekers, and enthusiasts. Explore the fundamental patterns that underlie creation through detailed information pages.

## Features

### Sacred Geometry Library

- **5 Platonic Solids**: Tetrahedron, Hexahedron (Cube), Octahedron, Dodecahedron, Icosahedron
- **Sacred Patterns**: Flower of Life, Seed of Life, Metatron's Cube, Sri Yantra, Merkaba, Golden Ratio
- **Relationship Mapping**: Explore connections between geometries (duality, containment, appearances)
- **Element Associations**: Learn about the classical element correspondences with Platonic solids

### Educational Content

- Comprehensive descriptions of each geometry
- Mathematical properties and sacred significance
- Interconnected relationships and symbolic meanings
- Searchable geometry catalog

## Tech Stack

Built with modern web technologies for a fast, responsive, and accessible experience:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with [Radix UI Themes](https://www.radix-ui.com/themes)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **3D Graphics**: [Three.js](https://threejs.org/) with [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) and [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/react)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## Getting Started

### Prerequisites

- Node.js 20.x or later
- pnpm 9.x (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/robabby/sacred-geometry.git
cd sacred-geometry

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Development

### Available Scripts

```bash
# Development
pnpm dev              # Start dev server with Turbopack
pnpm build            # Create production build
pnpm start            # Start production server
pnpm preview          # Build and start production server

# Code Quality
pnpm check            # Run lint + typecheck
pnpm lint             # Run ESLint
pnpm lint:fix         # Run ESLint with auto-fix
pnpm typecheck        # TypeScript type checking

# Testing
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage

# Formatting
pnpm format:check     # Check Prettier formatting
pnpm format:write     # Apply Prettier formatting
```

### Project Structure

```
sacred-geometry/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── platonic-solids/    # Platonic solids pages
│   │   └── sacred-patterns/    # Sacred patterns pages
│   ├── components/
│   │   ├── 3d/                 # Three.js visualization components
│   │   ├── geometry/           # Sacred geometry components
│   │   └── ui/                 # shadcn/ui components
│   ├── lib/
│   │   └── data/               # Geometry data model & relationships
│   ├── util/                   # Utility functions & constants
│   └── styles/                 # Global styles
├── __tests__/                  # Test files
└── public/                     # Static assets
```

### Key Architecture Patterns

**Data Model**: Centralized geometry catalog in `src/lib/data/geometries.ts` with type-safe helper functions for querying relationships.

**3D Components**: Reusable `GeometryViewer` component in `src/components/3d/` provides a consistent framework for all 3D visualizations.

**Dynamic Routing**: Use slug-based routing with `getGeometryBySlug()` for flexible, data-driven pages.

See [CLAUDE.md](./CLAUDE.md) for comprehensive architecture documentation.

## Data Model

The app uses a centralized data model for all sacred geometries and their relationships. Key features:

- 16 geometries with full metadata (id, name, slug, category, description, relationships)
- Type-safe TypeScript interfaces
- Helper functions for querying relationships, filtering by category/element, and searching

Example usage:

```typescript
import { getGeometryBySlug, getRelatedGeometries } from "@/lib/data";

const geometry = getGeometryBySlug("flower-of-life");
const { dual, contains, appearsIn } = getRelatedGeometries(geometry.id);
```

See `src/lib/data/README.md` for complete documentation.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and type checking (`pnpm check`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Deployment

The app is deployed on Vercel with automatic deployments from the main branch.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/robabby/sacred-geometry)

## Credits & Acknowledgments

- Built with [T3 Stack](https://create.t3.gg/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- 3D rendering powered by [Three.js](https://threejs.org/) and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- Icons by [Lucide](https://lucide.dev/)

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Sacred Geometry Web App** - Exploring the fundamental patterns of creation through interactive 3D visualizations.

Built with 💜 by [Rob Abby](https://github.com/robabby)
