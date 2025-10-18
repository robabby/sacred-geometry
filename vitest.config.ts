import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    include: [
      "__tests__/**/*.test.{ts,tsx}",
      "src/**/*.test.{ts,tsx}",
    ],
    setupFiles: ["./__tests__/setup.ts"],
    coverage: {
      reporter: ["text", "lcov"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    jsx: "automatic",
  },
});
