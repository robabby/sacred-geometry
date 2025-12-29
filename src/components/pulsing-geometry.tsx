"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Geometry image wrapper with subtle hover scale effect.
 * Provides smooth scale-up on hover for visual representations.
 */
interface PulsingGeometryProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

export function PulsingGeometry({
  children,
  className,
  interactive = true,
}: PulsingGeometryProps) {
  return (
    <motion.div
      className={cn(interactive && "cursor-pointer", className)}
      whileHover={{ scale: 1.03 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Visual representation card with stagger entrance and hover glow.
 */
interface VisualRepCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export function VisualRepCard({
  children,
  className,
  index = 0,
}: VisualRepCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-lg p-4 transition-shadow hover:shadow-[0_0_20px_rgba(212,168,75,0.15)]",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
