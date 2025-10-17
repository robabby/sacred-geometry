"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import type * as THREE from "three";

interface GeometryViewerProps {
  geometry?: THREE.BufferGeometry;
  material?: THREE.Material;
  children?: React.ReactNode;
}

function Scene({
  geometry,
  material,
  children,
}: Omit<GeometryViewerProps, "fallback">) {
  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Orbit controls for mouse/touch interaction */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
        enableZoom={true}
        enablePan={false}
      />

      {/* Render custom children or default mesh */}
      {children ?? (geometry && material ? (
        <mesh geometry={geometry} material={material} />
      ) : null)}
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        <p className="text-sm text-gray-600">Loading 3D scene...</p>
      </div>
    </div>
  );
}

export function GeometryViewer({
  geometry,
  material,
  children,
}: GeometryViewerProps) {
  const [isSupported, setIsSupported] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check for WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
      if (!gl) {
        setIsSupported(false);
      }
    } catch {
      setIsSupported(false);
    }
  }, []);

  // Don't render anything on server
  if (!isClient) {
    return <LoadingFallback />;
  }

  // Show fallback for unsupported browsers
  if (!isSupported) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <p className="mb-2 text-lg font-semibold text-gray-800">
            WebGL Not Supported
          </p>
          <p className="text-sm text-gray-600">
            Your browser doesn&apos;t support WebGL, which is required for 3D
            graphics.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Please try a modern browser like Chrome, Firefox, or Edge.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{
          position: [3, 3, 3],
          fov: 75,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene geometry={geometry} material={material}>
            {children}
          </Scene>
        </Suspense>
      </Canvas>
    </div>
  );
}
