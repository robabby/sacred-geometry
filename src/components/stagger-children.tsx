"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "motion/react";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  /** Delay between each child animation (in seconds) */
  staggerDelay?: number;
  /** Initial delay before first child animates (in seconds) */
  delayChildren?: number;
  /** How much of the container should be visible before triggering (0-1) */
  threshold?: number;
  /** Viewport margin to extend detection zone (CSS margin format) */
  viewportMargin?: string;
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0,
  threshold = 0,
  viewportMargin = "0px 0px 100px 0px",
}: StaggerChildrenProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin: viewportMargin }}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Child component to be used inside StaggerChildren
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  /** Animation variant to use */
  variant?: "fadeUp" | "fadeIn" | "scaleUp";
}

const itemVariants: Record<string, Variants> = {
  fadeUp: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  fadeIn: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  scaleUp: {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
};

export function StaggerItem({
  children,
  className,
  variant = "fadeUp",
}: StaggerItemProps) {
  return (
    <motion.div className={className} variants={itemVariants[variant]}>
      {children}
    </motion.div>
  );
}
