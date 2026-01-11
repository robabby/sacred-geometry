"use client";

import { type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { GeometryBackground } from "./geometry-background";
import { EASE_STANDARD } from "@/lib/animation-constants";

interface AnimatedHeroProps {
  children: ReactNode;
  className?: string;
}

// Staggered entrance animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_STANDARD,
    },
  },
};

export function AnimatedHero({ children, className }: AnimatedHeroProps) {
  const { scrollY } = useScroll();

  // Parallax effect: background moves at 0.9x speed relative to scroll
  const backgroundY = useTransform(scrollY, [0, 500], [0, 50]);

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      {/* Animated background with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <GeometryBackground />
      </motion.div>

      {/* Content layer with staggered entrance */}
      <motion.div
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Export item variants for use in child components
export { itemVariants };

// Animated wrapper for individual hero elements
interface AnimatedHeroItemProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedHeroItem({ children, className }: AnimatedHeroItemProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
