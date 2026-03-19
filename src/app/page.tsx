"use client";

import { useMemo, useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Connection,
  Edge,
  ReactFlowProvider,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { IntroNode } from "@/components/flow/intro-node";
import { CVNode } from "@/components/flow/cv-node";
import { ExperienceNode } from "@/components/flow/projects-node";
import { ProjectCardNode } from "@/components/flow/project-card-node";
import { SkillsNode } from "@/components/flow/skills-node";
import { ContactNode } from "@/components/flow/contact-node";
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

export default function Portfolio() {
  const [nodes, , onNodesChange] = useNodesState([...INITIAL_NODES]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);

  const nodeTypes = useMemo(
    () => ({
      [TYPE.INTRO]: IntroNode,
      [TYPE.CV]: CVNode,
      [TYPE.EXPERIENCE]: ExperienceNode,
      [TYPE.PROJECT_CARD]: ProjectCardNode,
      [TYPE.SKILLS]: SkillsNode,
      [TYPE.CONTACT]: ContactNode,
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
    <main className="w-full h-screen bg-background text-foreground overflow-hidden selection:bg-ui-primary selection:text-background">
      <ReactFlowProvider>
        <Nav />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{
            nodes: [{ id: "intro-1" }],
            padding: VIEW_CONFIG.PADDING.INITIAL,
            maxZoom: VIEW_CONFIG.INITIAL_ZOOM,
          }}
        >
          <Meteors count={30} />

          <TopBar />
          <Background
            color="var(--ui-primary)"
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            className="opacity-[0.15]"
          />
          <ThemeSwitcher />
        </ReactFlow>
      </ReactFlowProvider>
    </main>
  );
}
