import { Card } from "@radix-ui/themes";
import type { ReactNode } from "react";

/**
 * Card wrapper for MDX sections
 * Used to wrap content sections in styled cards matching our design system
 */
export function MDXSection({ children }: { children: ReactNode }) {
  return (
    <Card className="mb-6 border-amber-500/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-6 sm:mb-8 sm:p-8">
      {children}
    </Card>
  );
}
