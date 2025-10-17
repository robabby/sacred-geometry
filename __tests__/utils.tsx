import type { PropsWithChildren, ReactElement } from "react";

import { Theme } from "@radix-ui/themes";
import {
  render,
  type RenderOptions,
  type RenderResult,
} from "@testing-library/react";

const AllProviders = ({ children }: PropsWithChildren) => (
  <Theme appearance="dark">{children}</Theme>
);

type CustomRenderOptions = RenderOptions;

export function renderWithProviders(
  ui: ReactElement,
  options: CustomRenderOptions = {},
): RenderResult {
  return render(ui, {
    wrapper: AllProviders,
    ...options,
  });
}

export * from "@testing-library/react";
