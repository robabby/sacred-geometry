/**
 * Minimal @react-three/drei mocks. We only need to return simple React
 * nodes so components render without relying on Drei’s WebGL helpers.
 */

import type { PropsWithChildren } from "react";

export const OrbitControls = ({ children }: PropsWithChildren) => (
  <>{children}</>
);

export default {
  OrbitControls,
};
