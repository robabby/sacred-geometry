"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import type { SectionInfo } from "@/lib/content/types";

interface ContentLayoutContextType {
  sections: SectionInfo[];
  activeSection: string | null;
  registerSection: (id: string, element: HTMLElement | null) => void;
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
 * Manages active section for ToC highlighting using centralized scroll tracking
 */
export function ContentLayoutProvider({
  sections,
  children,
}: ContentLayoutProviderProps) {
  const [activeSection, setActiveSection] = useState<string | null>(
    sections[0]?.id ?? null
  );

  // Map of registered section elements
  const sectionElements = useRef<Map<string, HTMLElement>>(new Map());

  // Register a section element
  const registerSection = useCallback(
    (id: string, element: HTMLElement | null) => {
      if (element) {
        sectionElements.current.set(id, element);
      } else {
        sectionElements.current.delete(id);
      }
    },
    []
  );

  // Calculate active section based on scroll position
  // Find the section whose top is closest to (but above) the threshold
  const calculateActiveSection = useCallback(() => {
    const elements = sectionElements.current;
    if (elements.size === 0) return null;

    const threshold = 150; // pixels from top of viewport
    let activeId: string | null = null;
    let smallestPositiveDistance = Infinity;

    elements.forEach((element, id) => {
      const rect = element.getBoundingClientRect();

      // Distance from section top to threshold line
      // Positive = section top is above threshold (scrolled past)
      // Negative = section top is below threshold (not yet reached)
      const distanceAboveThreshold = threshold - rect.top;

      // We want sections whose top has passed the threshold
      // AND are still visible (bottom > 0)
      if (distanceAboveThreshold >= 0 && rect.bottom > 0) {
        // Among sections that have passed threshold, pick the one
        // that passed most recently (smallest positive distance)
        if (distanceAboveThreshold < smallestPositiveDistance) {
          smallestPositiveDistance = distanceAboveThreshold;
          activeId = id;
        }
      }
    });

    // If no section has passed the threshold, use the first one closest to it
    if (!activeId) {
      let closestToThreshold = Infinity;
      elements.forEach((element, id) => {
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - threshold);
        if (distance < closestToThreshold && rect.bottom > 0) {
          closestToThreshold = distance;
          activeId = id;
        }
      });
    }

    return activeId;
  }, []);

  // Set up scroll listener for active section tracking
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const newActive = calculateActiveSection();
          if (newActive) {
            setActiveSection((prev) => (prev !== newActive ? newActive : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation after a short delay to ensure sections are registered
    const timeoutId = setTimeout(() => {
      const initialActive = calculateActiveSection();
      if (initialActive) {
        setActiveSection(initialActive);
      }
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [calculateActiveSection]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      sections,
      activeSection,
      registerSection,
    }),
    [sections, activeSection, registerSection]
  );

  return (
    <ContentLayoutContext.Provider value={contextValue}>
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
