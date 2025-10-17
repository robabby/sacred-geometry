import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, vi } from "vitest";

// Provide lightweight mocks for Three.js + friends so 3D components
// work in unit tests without hitting a WebGL-backed runtime.
vi.mock("three", () => import("./mocks/three"));
vi.mock("@react-three/fiber", () => import("./mocks/react-three-fiber"));
vi.mock("@react-three/drei", () => import("./mocks/react-three-drei"));

const originalConsoleError = console.error;

beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const message = args[0];
    if (
      typeof message === "string" &&
      (message.includes("is using incorrect casing.") ||
        message.includes("is unrecognized in this browser."))
    ) {
      return;
    }

    originalConsoleError(...(args as Parameters<typeof console.error>));
  };
});

afterEach(() => {
  cleanup();
});

afterAll(() => {
  console.error = originalConsoleError;
});
