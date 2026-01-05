"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { SectionInfo } from "@/lib/content/types";

interface ContentLayoutContextType {
  sections: SectionInfo[];
  activeSection: string | null;
  setActiveSection: (id: string | null) => void;
}

const ContentLayoutContext = createContext<ContentLayoutContextType | null>(
  null
);

interface ContentLayoutProviderProps {
  sections: SectionInfo[];
  children: ReactNode;
}

/**
 * Provider for content layout state
 * Manages active section for ToC highlighting
 */
export function ContentLayoutProvider({
  sections,
  children,
}: ContentLayoutProviderProps) {
  const [activeSection, setActiveSection] = useState<string | null>(
    sections[0]?.id ?? null
  );

  return (
    <ContentLayoutContext.Provider
      value={{
        sections,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </ContentLayoutContext.Provider>
  );
}

/**
 * Hook to access content layout context
 * Must be used within a ContentLayoutProvider
 */
export function useContentLayout() {
  const context = useContext(ContentLayoutContext);
  if (!context) {
    throw new Error(
      "useContentLayout must be used within a ContentLayoutProvider"
    );
  }
  return context;
}

/**
 * Safe hook to access content layout context
 * Returns null if not within a ContentLayoutProvider (useful for optional collapsible behavior)
 */
export function useContentLayoutSafe() {
  return useContext(ContentLayoutContext);
}
