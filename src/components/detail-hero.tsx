"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Detail page hero section with entrance animations.
 * Content fades in with stagger, geometry rotates in.
 */
interface DetailHeroProps {
  children: ReactNode;
  className?: string;
}

export function DetailHero({ children, className }: DetailHeroProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Hero text content with fade-up animation.
 */
interface HeroTextProps {
  children: ReactNode;
  className?: string;
}

export function HeroText({ children, className }: HeroTextProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Hero geometry image with rotation entrance animation.
 */
interface HeroGeometryProps {
  children: ReactNode;
  className?: string;
}

export function HeroGeometry({ children, className }: HeroGeometryProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, rotate: -15, scale: 0.9 },
        visible: {
          opacity: 1,
          rotate: 0,
          scale: 1,
          transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
