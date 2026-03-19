"use client";

import { useMemo } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { NotFoundNode } from "@/components/flow/not-found-node";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Meteors } from "@/components/background";

const INITIAL_NODES = [
  {
    id: "not-found",
    type: "not-found",
    position: { x: 0, y: 0 },
    data: {},
  },
  // Phantom nodes to give scale
  { id: "p1", position: { x: -400, y: -200 }, type: "default", data: { label: "???" }, opacity: 0.1 },
  { id: "p2", position: { x: 450, y: 300 }, type: "default", data: { label: "LOST" }, opacity: 0.1 },
];

const INITIAL_EDGES = [
  { id: "e1-2", source: "not-found", target: "p1", animated: true, style: { stroke: "rgba(239,68,68,0.2)", strokeWidth: 2 } },
  { id: "e2-3", source: "not-found", target: "p2", animated: true, style: { stroke: "rgba(255,255,255,0.05)", strokeWidth: 1 } },
];

export default function NotFound() {
  const nodeTypes = useMemo(() => ({
    "not-found": NotFoundNode,
  }), []);

  return (
    <main className="w-full h-screen bg-background text-foreground overflow-hidden selection:bg-red-500 selection:text-white">
      <ReactFlowProvider>
        <ReactFlow
          nodes={INITIAL_NODES}
          edges={INITIAL_EDGES}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{
            padding: 0.4,
          }}
          panOnDrag={true}
          zoomOnScroll={true}
          style={{ width: "100%", height: "100%" }}
        >
          <Meteors 
            count={40} 
            color="#ef4444" 
            tailColor="rgba(239,68,68,0.2)" 
          />
          
          <Background 
            color="var(--ui-primary)" 
            variant={BackgroundVariant.Dots} 
            gap={20} 
            size={1} 
            className="opacity-[0.05]" 
          />
          <ThemeSwitcher />
        </ReactFlow>
      </ReactFlowProvider>
    </main>
  );
}
