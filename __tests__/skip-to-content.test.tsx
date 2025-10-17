import { describe, expect, it } from "vitest";

import { SkipToContent } from "@/components/skip-to-content";
import { renderWithProviders, screen } from "./utils";

describe("SkipToContent", () => {
  it("renders skip link pointing to the main content anchor", () => {
    renderWithProviders(<SkipToContent />);

    const link = screen.getByRole("link", { name: /skip to main content/i });
    expect(link).toHaveAttribute("href", "#main-content");
  });
});
