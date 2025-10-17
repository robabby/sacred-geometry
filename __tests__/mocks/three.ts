/**
 * Light-weight Three.js mocks that let us exercise 3D-aware components
 * without needing a real WebGL context. The goal is to provide the bits
 * that React Three Fiber interacts with (object lifecycle, geometry and
 * material placeholders) while staying easy to extend when new classes
 * show up in tests.
 */

import { vi } from "vitest";

class Object3D {
  name = "";
  children: Object3D[] = [];
  position = { x: 0, y: 0, z: 0, set: vi.fn() };
  rotation = { x: 0, y: 0, z: 0, set: vi.fn() };
  scale = { x: 1, y: 1, z: 1, set: vi.fn() };

  add = vi.fn((...objects: Object3D[]) => {
    this.children.push(...objects);
  });

  remove = vi.fn((...objects: Object3D[]) => {
    this.children = this.children.filter((child) => !objects.includes(child));
  });
}

export class Scene extends Object3D {
  background: unknown = null;
}

export class Group extends Object3D {}

export class BufferGeometry {
  parameters: Record<string, unknown> = {};
  dispose = vi.fn();
}

class PrimitiveGeometry extends BufferGeometry {
  constructor(...args: unknown[]) {
    super();
    this.parameters.args = args;
  }
}

export class TetrahedronGeometry extends PrimitiveGeometry {}
export class BoxGeometry extends PrimitiveGeometry {}
export class IcosahedronGeometry extends PrimitiveGeometry {}

export class PerspectiveCamera extends Object3D {
  constructor(
    public fov: number,
    public aspect: number,
    public near: number,
    public far: number,
  ) {
    super();
  }

  updateProjectionMatrix = vi.fn();
}

export class WebGLRenderer {
  domElement =
    typeof document !== "undefined"
      ? document.createElement("canvas")
      : ({} as HTMLCanvasElement);

  setSize = vi.fn();
  render = vi.fn();
  dispose = vi.fn();
}

export class Material {
  constructor(public params: Record<string, unknown> = {}) {}

  dispose = vi.fn();
}

export class MeshStandardMaterial extends Material {}

export class LineSegments extends Object3D {
  constructor(public geometry: BufferGeometry, public material: Material) {
    super();
  }
}

export class Mesh extends Object3D {
  constructor(public geometry?: BufferGeometry, public material?: Material) {
    super();
  }
}

export { Object3D };
