"use client";

import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { VIEW_CONFIG } from "@/constants/flow";

const TOP_PAD = 96; // clears the fixed top bar
const BOTTOM_PAD = 40;
const SIDE_PAD = 40;

/**
 * Smoothly brings a node into view. Nodes that fit the viewport are framed
 * whole; taller ones (like the build log) are shown top-aligned at reading
 * zoom instead of being shrunk until the text is illegible.
 */
export function useFocusNode() {
  const { fitView, getInternalNode, setCenter } = useReactFlow();

  return useCallback(
    (id: string) => {
      const node = getInternalNode(id);
      const width = node?.measured.width ?? 0;
      const height = node?.measured.height ?? 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (node && height + TOP_PAD + BOTTOM_PAD > vh) {
        const zoom = Math.min(VIEW_CONFIG.INITIAL_ZOOM, (vw - SIDE_PAD * 2) / width);
        const { x, y } = node.internals.positionAbsolute;
        void setCenter(x + width / 2, y - TOP_PAD / zoom + vh / 2 / zoom, {
          zoom,
          duration: VIEW_CONFIG.DURATION,
        });
        return;
      }

      void fitView({
        nodes: [{ id }],
        duration: VIEW_CONFIG.DURATION,
        padding: VIEW_CONFIG.FOCUS_PADDING,
        maxZoom: VIEW_CONFIG.INITIAL_ZOOM,
      });
    },
    [fitView, getInternalNode, setCenter],
  );
}
