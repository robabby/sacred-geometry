"use client";

import type { ReactNode } from "react";
import type { SectionInfo } from "@/lib/content/types";
import { ContentLayoutProvider } from "./content-layout-context";
import { DesktopTableOfContents, MobileTableOfContents } from "./table-of-contents";

interface ContentLayoutProps {
  sections: SectionInfo[];
  children: ReactNode;
}

/**
 * ContentLayout component
 *
 * Provides a two-column layout with:
 * - Sticky sidebar Table of Contents (desktop)
 * - Dropdown Table of Contents (mobile)
 * - Collapsible content sections
 *
 * The ContentLayoutProvider is made available to MDXSection components,
 * enabling them to render in collapsible mode with shared state.
 *
 * Usage:
 * ```tsx
 * <ContentLayout sections={mdxContent.sections}>
 *   {mdxContent.content}
 * </ContentLayout>
 * ```
 */
export function ContentLayout({ sections, children }: ContentLayoutProps) {
  // Don't render the layout if there are no sections
  if (sections.length === 0) {
    return <>{children}</>;
  }

  return (
    <ContentLayoutProvider sections={sections}>
      {/* Mobile ToC - shows at top on small screens */}
      <MobileTableOfContents />

      {/* Main content area with desktop ToC sidebar */}
      <div className="flex gap-8 lg:gap-12">
        {/* Desktop ToC - sticky sidebar */}
        <DesktopTableOfContents />

        {/* Content area */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </ContentLayoutProvider>
  );
}
