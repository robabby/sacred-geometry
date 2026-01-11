/**
 * Animation constants based on sacred geometry principles.
 * Centralizes timing, easing, and golden ratio values.
 */

// Golden ratio constants
export const PHI = 1.618033988749;
export const PHI_INVERSE = 1 / PHI; // 0.618...

// Sacred timing (based on phi and significant numbers)
export const TIMING = {
  fast: 0.3,
  normal: 0.618, // Golden ratio
  slow: 1.0,
  breath: 4.0, // Ambient loops
  emergence: 1.2, // Hero emergence
  rotation: 120, // Full cycle (existing)
} as const;

// Easing curves
// Golden ratio easing - balanced entry/exit based on phi
export const EASE_PHI: [number, number, number, number] = [0.618, 0, 0.382, 1];

// Emergence easing - smooth reveal for hero elements
export const EASE_EMERGENCE: [number, number, number, number] = [0.36, 0, 0.66, 1];

// Standard easing - widely used ease-out curve for UI transitions
export const EASE_STANDARD: [number, number, number, number] = [
  0.25, 0.46, 0.45, 0.94,
];
