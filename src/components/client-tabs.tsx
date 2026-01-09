"use client";

import dynamic from "next/dynamic";
import { type Tabs as BaseTabs } from "@/components/ui/tabs";

// Re-export other tab components directly (they're already client components)
export { TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Dynamically import Tabs with SSR disabled to avoid hydration mismatch
// caused by React 19.2's useId() changes affecting Radix UI's internal ID generation
// See: https://github.com/radix-ui/primitives/issues/3700
export const Tabs = dynamic(
  () => import("@/components/ui/tabs").then((mod) => mod.Tabs),
  { ssr: false }
) as typeof BaseTabs;
