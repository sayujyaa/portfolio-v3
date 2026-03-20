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

export function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([...INITIAL_NODES]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setNodes((nds) => {
          // Find the lowest Y among project cards to place remaining nodes below
          const projectNodes = nds.filter((n) => n.type === TYPE.PROJECT_CARD);
          const maxProjectY = Math.max(
            ...projectNodes.map((n) => n.position.y),
          );
          const belowProjectsY = maxProjectY + 600; // clear space below project row

          let preY = 0; // Y counter for nodes before projects
          let postY = belowProjectsY; // Y counter for nodes after projects
          const preTypes = [TYPE.INTRO, TYPE.CV, TYPE.EXPERIENCE];

          return nds.map((n) => {
            if (n.type === TYPE.PROJECT_CARD) {
              return n; // keep horizontal positions
            }

            if (preTypes.includes(n.type as (typeof preTypes)[number])) {
              const newNode = { ...n, position: { x: 0, y: preY } };
              let h = 800;
              if (n.type === TYPE.INTRO) h = 850;
              if (n.type === TYPE.CV) h = 350;
              if (n.type === TYPE.EXPERIENCE) h = 1200;
              preY += h;
              return newNode;
            }

            // Skills, Contact go below projects
            if (n.type === TYPE.CONTACT) postY += 200; // extra gap before contact
            const xOffset = n.type === TYPE.CONTACT ? 100 : 0;
            const newNode = { ...n, position: { x: xOffset, y: postY } };
            let h = 800;
            if (n.type === TYPE.SKILLS) h = 1100;
            if (n.type === TYPE.CONTACT) h = 400;
            postY += h;
            return newNode;
          });
        });

        // Add edge from last project to skills
        setEdges((eds) => {
          const lastProject = INITIAL_NODES.filter(
            (n) => n.type === TYPE.PROJECT_CARD,
          ).pop();
          if (!lastProject) return eds;
          return [
            ...eds,
            {
              id: "e-last-project-skills",
              source: lastProject.id,
              target: "skills-1",
              type: "pulsating",
            },
          ];
        });
      }
    });
    return () => cancelAnimationFrame(rafId);
  }, [setNodes, setEdges]);

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
        zoomOnPinch={!isMobile}
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
