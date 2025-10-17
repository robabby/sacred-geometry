import { describe, expect, it, vi } from "vitest";

import { GeometryViewer } from "@/components/3d/GeometryViewer";
import { renderWithProviders, screen } from "./utils";

describe("GeometryViewer", () => {
  it("renders within the mocked Canvas when WebGL is available", async () => {
    const originalCreateElement = document.createElement.bind(document);
    const canvasElement = originalCreateElement("canvas") as HTMLCanvasElement;
    // Pretend WebGL is available so the component renders its Canvas path.
    canvasElement.getContext = vi.fn().mockReturnValue({});

    const createElementMock = vi
      .spyOn(document, "createElement")
      .mockImplementation((tagName: string, options?: ElementCreationOptions) => {
        if (tagName === "canvas") {
          return canvasElement;
        }
        return originalCreateElement(tagName, options);
      });

    renderWithProviders(
      <GeometryViewer>
        <mesh />
      </GeometryViewer>,
    );

    expect(await screen.findByTestId("mock-canvas")).toBeInTheDocument();

    createElementMock.mockRestore();
  });
});
