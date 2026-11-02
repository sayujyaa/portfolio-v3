import { Background, BackgroundVariant } from "@xyflow/react";

/** Two-weight graph paper: a fine 24px grid with a heavier line every 5 cells. */
export function CanvasGrid() {
  return (
    <>
      <Background
        id="grid-minor"
        variant={BackgroundVariant.Lines}
        gap={24}
        lineWidth={1}
        color="var(--grid)"
      />
      <Background
        id="grid-major"
        variant={BackgroundVariant.Lines}
        gap={120}
        lineWidth={1}
        color="var(--grid-major)"
      />
    </>
  );
}
