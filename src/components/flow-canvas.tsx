"use client";

import { useMemo, useCallback, useState, useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  BackgroundVariant,
  PanOnScrollMode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { IntroNode } from "@/components/flow/intro-node";
import { CVNode } from "@/components/flow/cv-node";
import { ExperienceNode } from "@/components/flow/projects-node";
import { ProjectCardNode } from "@/components/flow/project-card-node";
import { SkillsNode } from "@/components/flow/skills-node";
import { MobileSkillsNode } from "@/components/flow/mobile-skills-node";
import { ContactNode } from "@/components/flow/contact-node";
import { MobileProjectsNode } from "@/components/flow/mobile-projects-node";
import { PulsatingEdge } from "@/components/flow/pulsating-edge";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Meteors } from "@/components/background";
import { Nav } from "@/components/nav";
import { TopBar } from "@/components/top-bar";
import {
  NODE_TYPES as TYPE,
  VIEW_CONFIG,
  INITIAL_NODES,
  INITIAL_EDGES,
} from "@/constants";
import { getFlowData } from "@/lib/flow-utils";

interface FlowCanvasProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
}

export function FlowCanvas({ initialNodes, initialEdges }: FlowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes || [...INITIAL_NODES],
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialEdges || INITIAL_EDGES,
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      const { nodes: newNodes, edges: newEdges } = getFlowData(mobile);
      setNodes(newNodes);
      setEdges(newEdges);
    };

    const rafId = requestAnimationFrame(handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [setNodes, setEdges]);

  const nodeTypes = useMemo(
    () => ({
      [TYPE.INTRO]: IntroNode,
      [TYPE.CV]: CVNode,
      [TYPE.EXPERIENCE]: ExperienceNode,
      [TYPE.PROJECT_CARD]: ProjectCardNode,
      [TYPE.SKILLS]: SkillsNode,
      [TYPE.MOBILE_SKILLS]: MobileSkillsNode,
      [TYPE.CONTACT]: ContactNode,
      [TYPE.MOBILE_PROJECTS]: MobileProjectsNode,
    }),
    [],
  );

  const edgeTypes = useMemo(
    () => ({
      pulsating: PulsatingEdge,
    }),
    [],
  );

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        minZoom={0.2}
        maxZoom={VIEW_CONFIG.MAX_ZOOM}
        panOnScroll
        panOnScrollMode={PanOnScrollMode.Free}
        fitView
        fitViewOptions={{
          padding: VIEW_CONFIG.NODE_FOCUS_PADDING,
          nodes: [{ id: "intro-1" }],
          maxZoom: VIEW_CONFIG.INITIAL_ZOOM,
        }}
        nodesDraggable={!isMobile}
        // zoomOnPinch={!isMobile}
        onlyRenderVisibleElements={isMobile}
      >
        <Nav />
        {!isMobile && (
          <div className="pointer-events-none absolute inset-0 z-0">
            <Meteors count={30} />
          </div>
        )}

        <TopBar />

        {!isMobile && (
          <Background
            color="var(--ui-primary)"
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            className="opacity-[0.15]"
          />
        )}
        <ThemeSwitcher />
      </ReactFlow>
    </ReactFlowProvider>
  );
}
