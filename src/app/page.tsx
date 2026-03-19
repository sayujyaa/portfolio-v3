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

import { PROJECTS, NODE_TYPES as TYPE, VIEW_CONFIG } from "@/constants";

// --- Flow Configuration Constants ---

const SORTED_PROJECTS = [...PROJECTS].sort(
  (a, b) => parseInt(b.YEAR) - parseInt(a.YEAR),
);

const INITIAL_NODES = [
  {
    id: "intro-1",
    type: TYPE.INTRO,
    position: { x: 0, y: 0 },
    data: {},
  },
  {
    id: "cv-1",
    type: TYPE.CV,
    position: { x: 400, y: 1100 },
    data: { label: "CV" },
  },

  {
    id: "experience-1",
    type: TYPE.EXPERIENCE,
    position: { x: -200, y: 1800 },
    data: { label: "Experience" },
  },

  ...SORTED_PROJECTS.map((p, i) => ({
    id: p.ID,
    type: TYPE.PROJECT_CARD,
    position: { x: 400 + i * 500, y: 1800 + (i % 2 === 0 ? -60 : 60) },
    data: {
      title: p.TITLE,
      year: p.YEAR,
      description: p.DESCRIPTION,
      tags: p.TAGS,
      link: p.LINK,
      github: p.GITHUB,
      nextId: i < SORTED_PROJECTS.length - 1 ? SORTED_PROJECTS[i + 1].ID : SORTED_PROJECTS[0].ID,
      prevId: i > 0 ? SORTED_PROJECTS[i - 1].ID : SORTED_PROJECTS[SORTED_PROJECTS.length - 1].ID,
    },
  })),

  {
    id: "skills-1",
    type: TYPE.SKILLS,
    position: { x: -300, y: 2600 },
    data: { label: "Skills" },
  },
  {
    id: "contact-1",
    type: TYPE.CONTACT,
    position: { x: 300, y: 3300 },
    data: { label: "Contact" },
  },
];

const INITIAL_EDGES: Edge[] = [
  {
    id: "e1-2",
    source: "intro-1",
    target: "cv-1",
    type: "pulsating",
  },
  {
    id: "e2-3",
    source: "cv-1",
    target: "experience-1",
    type: "pulsating",
  },
  // Project dynamic connections
  ...SORTED_PROJECTS.map((p, i) => ({
    id: `e-project-${i}`,
    source: i === 0 ? "experience-1" : SORTED_PROJECTS[i - 1].ID,
    sourceHandle: i === 0 ? "projects" : undefined,
    target: p.ID,
    type: "pulsating",
  })),
  {
    id: "e3-4",
    source: "experience-1",
    target: "skills-1",
    type: "pulsating",
  },
  {
    id: "e4-5",
    source: "skills-1",
    target: "contact-1",
    type: "pulsating",
  },
];

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

          <Nav />
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
