/**
 * React Three Fiber mock surface so component tests can render without
 * touching the actual reconciler or WebGL runtime.
 */

import type { PropsWithChildren } from "react";

import { vi } from "vitest";

type CanvasProps = PropsWithChildren<Record<string, unknown>>;

export const Canvas = ({ children, ...props }: CanvasProps) => (
  <div data-testid="mock-canvas" {...props}>
    {children}
  </div>
);

Canvas.displayName = "MockCanvas";

export const useFrame = vi.fn();
export const useThree = vi.fn(() => ({
  scene: {},
  camera: {},
  gl: { render: vi.fn(), setSize: vi.fn() },
}));
export const useLoader = vi.fn();
export const extend = vi.fn();
export const createPortal = vi.fn((children) => children);
export const applyProps = vi.fn();

export default {
  Canvas,
  useFrame,
  useThree,
  useLoader,
  extend,
  createPortal,
  applyProps,
};
