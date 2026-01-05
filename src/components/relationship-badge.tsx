import { cn } from "@/lib/utils";
import type { RelationshipType } from "@/lib/data";

interface RelationshipBadgeProps {
  type: RelationshipType;
  className?: string;
}

// Format relationship type to human-readable label
function formatRelationshipLabel(type: RelationshipType): string {
  const labels: Record<RelationshipType, string> = {
    // Structural
    contains: "Contains",
    "appears-in": "Appears In",
    "derived-from": "Derived From",
    "composed-of": "Composed Of",
    dual: "Dual",
    // Transformational
    "transforms-into": "Transforms Into",
    "emerges-from": "Emerges From",
    "unfolds-to": "Unfolds To",
    // Conceptual
    "similar-to": "Similar To",
    complementary: "Complementary",
    "resonates-with": "Resonates With",
    "related-by-element": "Related by Element",
    // Mathematical
    "ratio-related": "Ratio Related",
    proportional: "Proportional",
    "symmetric-with": "Symmetric With",
  };
  return labels[type] ?? type;
}

// Get relationship category for color coding
function getRelationshipCategory(
  type: RelationshipType
): "structural" | "transformational" | "conceptual" | "mathematical" {
  const structural: RelationshipType[] = [
    "contains",
    "appears-in",
    "derived-from",
    "composed-of",
    "dual",
  ];
  const transformational: RelationshipType[] = [
    "transforms-into",
    "emerges-from",
    "unfolds-to",
  ];
  const mathematical: RelationshipType[] = [
    "ratio-related",
    "proportional",
    "symmetric-with",
  ];

  if (structural.includes(type)) return "structural";
  if (transformational.includes(type)) return "transformational";
  if (mathematical.includes(type)) return "mathematical";
  return "conceptual";
}

// Category color schemes
const categoryStyles: Record<
  "structural" | "transformational" | "conceptual" | "mathematical",
  string
> = {
  structural:
    "bg-[var(--color-gold)]/20 text-[var(--color-gold)] border-[var(--color-gold)]/30",
  transformational:
    "bg-[var(--color-copper)]/20 text-[var(--color-copper)] border-[var(--color-copper)]/30",
  conceptual:
    "bg-[var(--color-bronze)]/20 text-[var(--color-bronze)] border-[var(--color-bronze)]/30",
  mathematical:
    "bg-[var(--color-gold-bright)]/20 text-[var(--color-gold-bright)] border-[var(--color-gold-bright)]/30",
};

export function RelationshipBadge({ type, className }: RelationshipBadgeProps) {
  const category = getRelationshipCategory(type);
  const label = formatRelationshipLabel(type);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        categoryStyles[category],
        className
      )}
    >
      {label}
    </span>
  );
}

// Export helpers for use in other components
export { formatRelationshipLabel, getRelationshipCategory };
