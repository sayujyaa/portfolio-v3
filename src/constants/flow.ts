import { Edge } from "@xyflow/react";
import { PROJECTS } from "./content";

export const NODE_TYPES = {
  INTRO: "intro",
  CV: "cv",
  EXPERIENCE: "experience",
  PROJECT_CARD: "project-card",
  SKILLS: "skills",
  CONTACT: "contact",
  MOBILE_PROJECTS: "mobile-projects",
} as const;

export const VIEW_CONFIG = {
  PADDING: {
    MOBILE: 0.5,
    DESKTOP: 0.8,
    INITIAL: { top: 100, bottom: 100, left: 100, right: 100 },
  },
  INTRO_FOCUS_PADDING: {
    MOBILE: { top: 190, bottom: 110, left: 36, right: 36 },
    DESKTOP: { top: 220, bottom: 140, left: 72, right: 72 },
  },
  NODE_FOCUS_PADDING: 0.5,
  DURATION: 1100,
  MAX_ZOOM: 2,
  INITIAL_ZOOM: 1,
} as const;

export const SORTED_PROJECTS = [...PROJECTS].sort(
  (a, b) => parseInt(b.YEAR) - parseInt(a.YEAR),
);

export const INITIAL_NODES = [
  {
    id: "intro-1",
    type: NODE_TYPES.INTRO,
    position: { x: 0, y: 0 },
    data: {},
  },
  {
    id: "cv-1",
    type: NODE_TYPES.CV,
    position: { x: 400, y: 1100 },
    data: { label: "CV" },
  },

  {
    id: "experience-1",
    type: NODE_TYPES.EXPERIENCE,
    position: { x: -200, y: 1800 },
    data: { label: "Experience" },
  },

  ...SORTED_PROJECTS.map((p, i) => ({
    id: p.ID,
    type: NODE_TYPES.PROJECT_CARD,
    position: { x: 400 + i * 500, y: 1800 + (i % 2 === 0 ? -60 : 60) },
    data: {
      title: p.TITLE,
      year: p.YEAR,
      description: p.DESCRIPTION,
      tags: p.TAGS,
      link: p.LINK,
      github: p.GITHUB,
      nextId:
        i < SORTED_PROJECTS.length - 1
          ? SORTED_PROJECTS[i + 1].ID
          : SORTED_PROJECTS[0].ID,
      prevId:
        i > 0
          ? SORTED_PROJECTS[i - 1].ID
          : SORTED_PROJECTS[SORTED_PROJECTS.length - 1].ID,
    },
  })),

  {
    id: "skills-1",
    type: NODE_TYPES.SKILLS,
    position: { x: 200, y: 2800 },
    data: { label: "Skills" },
  },
  {
    id: "contact-1",
    type: NODE_TYPES.CONTACT,
    position: { x: -100, y: 3800 },
    data: { label: "Contact" },
  },
];

export const INITIAL_EDGES: Edge[] = [
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
