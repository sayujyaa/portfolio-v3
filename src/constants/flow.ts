import { Edge, Node } from "@xyflow/react";

export const NODE_TYPES = {
  INTRO: "intro",
  CV: "cv",
  BUILD_LOG: "build-log",
  WORK: "work",
  SKILLS: "skills",
  CONTACT: "contact",
} as const;

export const EDGE_TYPE = "signal";

export const VIEW_CONFIG = {
  /** Leaves room for the fixed top bar when focusing a node. */
  FOCUS_PADDING: { top: "96px", bottom: "40px", left: "40px", right: "40px" },
  DURATION: 800,
  MAX_ZOOM: 2,
  INITIAL_ZOOM: 1,
} as const;

export const INITIAL_NODES: Node[] = [
  { id: "intro-1", type: NODE_TYPES.INTRO, position: { x: 0, y: 0 }, data: {} },
  { id: "cv-1", type: NODE_TYPES.CV, position: { x: 420, y: 600 }, data: {} },
  {
    id: "build-log-1",
    type: NODE_TYPES.BUILD_LOG,
    position: { x: -220, y: 860 },
    data: {},
  },
  { id: "work-1", type: NODE_TYPES.WORK, position: { x: 560, y: 1280 }, data: {} },
  {
    id: "skills-1",
    type: NODE_TYPES.SKILLS,
    position: { x: 300, y: 2620 },
    data: {},
  },
  {
    id: "contact-1",
    type: NODE_TYPES.CONTACT,
    position: { x: -60, y: 3360 },
    data: {},
  },
];

export const INITIAL_EDGES: Edge[] = [
  { id: "e-intro-cv", source: "intro-1", target: "cv-1" },
  { id: "e-cv-log", source: "cv-1", target: "build-log-1" },
  {
    id: "e-log-work",
    source: "build-log-1",
    sourceHandle: "projects",
    target: "work-1",
    targetHandle: "left",
  },
  { id: "e-work-skills", source: "work-1", target: "skills-1" },
  { id: "e-skills-contact", source: "skills-1", target: "contact-1" },
].map((e) => ({ ...e, type: EDGE_TYPE }));
