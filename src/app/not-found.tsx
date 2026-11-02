"use client";

import { ReactFlow, ReactFlowProvider, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { NotFoundNode } from "@/components/flow/not-found-node";
import { CanvasGrid } from "@/components/canvas-grid";
import { ThemeSwitcher } from "@/components/theme-switcher";

const NODE_TYPES = { "not-found": NotFoundNode };
const NODES: Node[] = [
  { id: "not-found", type: "not-found", position: { x: 0, y: 0 }, data: {} },
];

export default function NotFound() {
  return (
    <main className="h-screen w-full overflow-hidden bg-background text-foreground">
      <ReactFlowProvider>
        <ReactFlow
          nodes={NODES}
          nodeTypes={NODE_TYPES}
          nodesDraggable={false}
          fitView
          fitViewOptions={{ padding: 0.4, maxZoom: 1 }}
        >
          <CanvasGrid />
          <ThemeSwitcher />
        </ReactFlow>
      </ReactFlowProvider>
    </main>
  );
}
