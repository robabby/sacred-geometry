"use client";

import { GeometryViewer } from "./GeometryViewer";

/**
 * Example usage of the GeometryViewer component
 * This demonstrates how to use the component with custom Three.js content
 */
export function ExampleGeometryViewer() {
  return (
    <div className="h-[600px] w-full">
      <GeometryViewer>
        {/* Example: Simple rotating cube */}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </GeometryViewer>
    </div>
  );
}

/**
 * Example with custom geometry and material props
 */
export function ExampleWithProps() {
  return (
    <div className="h-[600px] w-full">
      <GeometryViewer>
        {/* Example: Icosahedron */}
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
