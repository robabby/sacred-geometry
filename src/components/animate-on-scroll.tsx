"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "motion/react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  /** Animation variant to use */
  variant?: "fadeUp" | "fadeIn" | "scaleUp";
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Duration of the animation (in seconds) */
  duration?: number;
  /** How much of the element should be visible before triggering (0-1) */
  threshold?: number;
}

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
  fadeIn: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
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
    },
  },
};

export function AnimateOnScroll({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  duration = 0.5,
  threshold = 0.2,
}: AnimateOnScrollProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // ease-out curve
      }}
    >
      {children}
    </motion.div>
  );
}
