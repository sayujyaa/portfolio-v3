"use client";

import { useEffect, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  PanOnScrollMode,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { IntroNode } from "@/components/flow/intro-node";
import { CVNode } from "@/components/flow/cv-node";
import { BuildLogNode } from "@/components/flow/build-log-node";
import { WorkIndexNode } from "@/components/flow/work-index-node";
import { SkillsNode } from "@/components/flow/skills-node";
import { ContactNode } from "@/components/flow/contact-node";
import { SignalEdge } from "@/components/flow/signal-edge";
import { CanvasGrid } from "@/components/canvas-grid";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Nav } from "@/components/nav";
import { TopBar } from "@/components/top-bar";
import { ProjectPanel } from "@/components/project-panel";
import { NODE_TYPES as TYPE, EDGE_TYPE, VIEW_CONFIG } from "@/constants";
import { getFlowData } from "@/lib/flow-utils";

// Defined at module scope so React Flow never sees a new object identity.
const nodeTypes = {
  [TYPE.INTRO]: IntroNode,
  [TYPE.CV]: CVNode,
  [TYPE.BUILD_LOG]: BuildLogNode,
  [TYPE.WORK]: WorkIndexNode,
  [TYPE.SKILLS]: SkillsNode,
  [TYPE.CONTACT]: ContactNode,
};
const edgeTypes = { [EDGE_TYPE]: SignalEdge };

const MOBILE_BREAKPOINT = 768;

interface FlowCanvasProps {
  initialNodes: Node[];
  initialEdges: Edge[];
}

export function FlowCanvas({ initialNodes, initialEdges }: FlowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isMobile, setIsMobile] = useState(false);

  // The server guesses mobile vs desktop from the user agent; correct it
  // here from the real viewport, and only re-layout when the mode flips.
  useEffect(() => {
    let current: boolean | null = null;
    const sync = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      if (mobile === current) return;
      current = mobile;
      setIsMobile(mobile);
      const data = getFlowData(mobile);
      setNodes(data.nodes);
      setEdges(data.edges);
    };
    const frame = requestAnimationFrame(sync);
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", sync);
    };
  }, [setNodes, setEdges]);

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        minZoom={isMobile ? 0.5 : 0.2}
        maxZoom={isMobile ? 1.15 : VIEW_CONFIG.MAX_ZOOM}
        nodesConnectable={false}
        nodesDraggable={!isMobile}
        panOnScroll
        panOnScrollMode={PanOnScrollMode.Free}
        fitView
        fitViewOptions={{
          nodes: [{ id: "intro-1" }],
          padding: VIEW_CONFIG.FOCUS_PADDING,
          maxZoom: VIEW_CONFIG.INITIAL_ZOOM,
        }}
        onlyRenderVisibleElements={isMobile}
      >
        <CanvasGrid />
        <TopBar />
        <Nav />
        <ThemeSwitcher />
      </ReactFlow>
      <ProjectPanel />
    </ReactFlowProvider>
  );
}
