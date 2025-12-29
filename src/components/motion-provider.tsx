"use client";

import { type ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * Motion provider that respects prefers-reduced-motion preference.
 * Wraps the app to provide consistent animation behavior.
 *
 * When reducedMotion is "user", Framer Motion automatically:
 * - Detects the user's system preference
 * - Skips animations when reduced motion is preferred
 * - Completes animations instantly instead of animating
 */
interface MotionProviderProps {
  children: ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
