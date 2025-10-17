# GeometryViewer Component

A reusable Three.js component framework for adding 3D visualizations to any geometry page.

## Features

- ✅ Three.js scene with camera, lighting, and renderer
- ✅ Responsive canvas that adapts to container size
- ✅ Basic orbit controls (rotate with mouse/touch)
- ✅ Loading state and fallback for unsupported browsers
- ✅ Accepts `geometry` and `material` props or custom children
- ✅ Server-side rendering compatible with client-side hydration

## Installation

The required dependencies are already installed:
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Helper components and abstractions
- `three` - Three.js library
- `@types/three` - TypeScript types

## Usage

### Basic Usage with Children

```tsx
import { GeometryViewer } from "@/components/3d";

export function MyGeometry() {
  return (
    <div className="h-[600px] w-full">
      <GeometryViewer>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </GeometryViewer>
    </div>
  );
}
```

### Advanced Usage with Icosahedron

```tsx
import { GeometryViewer } from "@/components/3d";

export function Icosahedron() {
  return (
    <div className="h-[600px] w-full">
      <GeometryViewer>
        <mesh>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#4fa3d1"
            wireframe={false}
            flatShading={true}
          />
        </mesh>
      </GeometryViewer>
    </div>
  );
}
```

### Using with Custom Geometry and Material Props

```tsx
import { GeometryViewer } from "@/components/3d";
import * as THREE from "three";

export function CustomGeometry() {
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

  return (
    <div className="h-[600px] w-full">
      <GeometryViewer geometry={geometry} material={material} />
    </div>
  );
}
```

## Technical Details

### Camera Setup
- Default position: `[3, 3, 3]` looking at origin
- Field of view: 75°
- Automatically adjusts to canvas size

### Lighting
- Ambient light with 0.5 intensity for overall illumination
- Directional light at position `[10, 10, 5]` with intensity 1

### Orbit Controls
- Damping enabled for smooth movement
- Damping factor: 0.05
- Rotate speed: 0.5
- Zoom enabled
- Pan disabled

### Browser Support
- Automatically detects WebGL support
- Shows fallback UI for unsupported browsers
- Client-side only rendering with SSR-safe loading state

## Component Props

```typescript
interface GeometryViewerProps {
  geometry?: THREE.BufferGeometry;
  material?: THREE.Material;
  children?: React.ReactNode;
}
```

- `geometry` (optional): Three.js BufferGeometry instance
- `material` (optional): Three.js Material instance
- `children` (optional): React children to render in the scene (takes precedence over geometry/material props)

## Examples

See `example-usage.tsx` for working examples.
