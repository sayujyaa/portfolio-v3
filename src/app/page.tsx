"use client";

import { useMemo, useCallback, useState, useEffect } from "react";
import {
  ReactFlow,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  Connection,
  Edge,
  useReactFlow,
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

import { NAV_LINKS, ICONS, PROJECTS, NODE_TYPES as TYPE } from "@/constants";

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

const VIEW_CONFIG = {
  PADDING: {
    MOBILE: 0.2,
    DESKTOP: 0.6,
    INITIAL: 0.15,
  },
  DURATION: 1200,
  MAX_ZOOM: 2,
  INITIAL_ZOOM: 1.2,
} as const;

function TopNav() {
  const { fitView } = useReactFlow();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleGoTo = (id: string) => {
    const isStart = id === "intro-1";
    fitView({
      nodes: [{ id }],
      padding: isStart
        ? VIEW_CONFIG.PADDING.INITIAL
        : isMobile
          ? VIEW_CONFIG.PADDING.MOBILE
          : VIEW_CONFIG.PADDING.DESKTOP,
      duration: VIEW_CONFIG.DURATION,
      maxZoom: isStart ? VIEW_CONFIG.INITIAL_ZOOM : VIEW_CONFIG.MAX_ZOOM,
    });
  };

  const NavIcon = ICONS.ROCKET;

  return (
    <Panel
      position="top-right"
      className="bg-background/80 backdrop-blur-3xl border border-foreground/10 px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-3 md:gap-6 shadow-2xl m-4 md:m-8 z-50 transition-all"
    >
      <div className="items-center gap-2 text-foreground/30 hidden sm:flex">
        <NavIcon size={16} />
        <span className="text-[9px] font-black uppercase tracking-[0.3em]">
          Navigation
        </span>
      </div>
      <nav className="flex gap-1 md:gap-2">
        {NAV_LINKS.map((link) => (
          <button
            key={link.ID}
            onClick={() => handleGoTo(link.ID)}
            className="px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-black tracking-widest hover:bg-ui-primary hover:text-background transition-all uppercase"
          >
            {link.LABEL}
          </button>
        ))}
      </nav>
    </Panel>
  );
}

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

          <TopNav />
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
