import { Edge, Node } from "@xyflow/react";
import {
  INITIAL_NODES,
  INITIAL_EDGES,
  NODE_TYPES as TYPE,
} from "@/constants/flow";

export interface FlowData {
  nodes: Node[];
  edges: Edge[];
}

/**
 * Approximate rendered heights on mobile (w-80 cards). Nodes are stacked
 * vertically using these, so update them if a card's content grows.
 */
const MOBILE_HEIGHTS: Record<string, number> = {
  [TYPE.INTRO]: 460,
  [TYPE.CV]: 130,
  [TYPE.BUILD_LOG]: 2270,
  [TYPE.WORK]: 660,
  [TYPE.SKILLS]: 800,
  [TYPE.CONTACT]: 560,
};

/** Small horizontal zig-zag so edges step instead of being dead straight. */
const MOBILE_X: Record<string, number> = {
  [TYPE.INTRO]: 0,
  [TYPE.CV]: 40,
  [TYPE.BUILD_LOG]: -20,
  [TYPE.WORK]: 20,
  [TYPE.SKILLS]: -10,
  [TYPE.CONTACT]: 10,
};

const GAP_Y = 80;

export function getFlowData(isMobile: boolean): FlowData {
  if (!isMobile) {
    return { nodes: INITIAL_NODES, edges: INITIAL_EDGES };
  }

  // Mobile: one vertical column, in the same order as the desktop story.
  let y = 0;
  const nodes = INITIAL_NODES.map((n) => {
    const type = n.type as string;
    const placed = { ...n, position: { x: MOBILE_X[type] ?? 0, y } };
    y += MOBILE_HEIGHTS[type] + GAP_Y;
    return placed;
  });

  const edges = INITIAL_EDGES.map((e) =>
    e.id === "e-log-work"
      ? { ...e, sourceHandle: "bottom", targetHandle: "top" }
      : e,
  );

  return { nodes, edges };
}
