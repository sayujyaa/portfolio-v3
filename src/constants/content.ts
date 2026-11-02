export interface Project {
  ID: string;
  TITLE: string;
  KIND: "Client" | "Personal";
  YEAR: string;
  SUMMARY: string;
  HIGHLIGHTS: readonly string[];
  STACK: readonly string[];
  LINK?: string;
  GITHUB?: string;
}

/** Rendered in this order on the canvas: client work first. */
export const PROJECTS: readonly Project[] = [
  {
    ID: "project-ganesh-hemp",
    TITLE: "Ganesh Hemp",
    KIND: "Client",
    YEAR: "2026",
    SUMMARY:
      "An e-commerce platform built for Ganesh Adi so Ganesh Hemp can sell its products online. A team project I contributed to.",
    HIGHLIGHTS: [
      "Team build: I was one of several contributors",
      "Online storefront and product catalogue",
      "TanStack Start frontend on a Supabase backend",
    ],
    STACK: ["TanStack Start", "Supabase", "TypeScript"],
    LINK: "https://www.ganeshhemps.com/",
  },
  {
    ID: "project-indigo",
    TITLE: "Indigo Gallery Kathmandu",
    KIND: "Client",
    YEAR: "2025",
    SUMMARY:
      "An online home for a Kathmandu art gallery, where they can show their paintings, talk with buyers and sell artwork.",
    HIGHLIGHTS: [
      "Showcase for the gallery's paintings",
      "Buyers and the gallery can message each other",
      "Built end to end, then handed over to the gallery",
    ],
    STACK: ["MongoDB", "Express", "React", "Node.js", "TypeScript"],
    LINK: "https://indigo-rouge.vercel.app/",
  },
  {
    ID: "project-penguina",
    TITLE: "Penguina's Mart",
    KIND: "Personal",
    YEAR: "2025",
    SUMMARY: "A modern e-commerce storefront with a Postgres backend.",
    HIGHLIGHTS: [],
    STACK: ["Next.js", "PostgreSQL"],
    LINK: "https://penguinamart.vercel.app/",
    GITHUB: "https://github.com/AyjuYaas/penguinamart",
  },
  {
    ID: "project-therafind",
    TITLE: "Therafind",
    KIND: "Personal",
    YEAR: "2024",
    SUMMARY:
      "A social platform for mental-health support and awareness.",
    HIGHLIGHTS: [],
    STACK: ["MERN", "TypeScript"],
    LINK: "https://therafind.vercel.app/",
    GITHUB: "https://github.com/AyjuYaas/therafind",
  },
  {
    ID: "project-niraamayae",
    TITLE: "Niraamayae Assistant",
    KIND: "Personal",
    YEAR: "2024",
    SUMMARY: "A personal assistant app for health and fitness.",
    HIGHLIGHTS: [],
    STACK: ["MERN"],
    LINK: "https://niraamayaegym.vercel.app/",
    GITHUB: "https://github.com/AyjuYaas/niraamayaegym",
  },
];

/** Stable display code for a project, e.g. "P01". */
export const projectCode = (id: string) =>
  `P${String(PROJECTS.findIndex((p) => p.ID === id) + 1).padStart(2, "0")}`;

export interface BuildLogEntry {
  ID: string;
  PERIOD: string;
  TITLE: string;
  CONTEXT: string;
  ROLES?: readonly { TITLE: string; PERIOD: string }[];
  SUMMARY: string;
  POINTS: readonly string[];
  STACK?: readonly string[];
  /** Project node ids this chapter links to on the canvas. */
  PROJECT_REFS?: readonly string[];
}

/** Newest first: the latest chapter sits at the top of the card. */
export const BUILD_LOG: readonly BuildLogEntry[] = [
  {
    ID: "specc",
    PERIOD: "Mar 2026 — Nov 2026",
    TITLE: "Specc AS",
    CONTEXT: "Norway · Freelance, remote",
    ROLES: [
      { TITLE: "Frontend & System Design Engineer", PERIOD: "Freelance" },
    ],
    SUMMARY:
      "I freelanced on Specc's integration platform and owned most of the frontend. With AI assistants handling much of the typing, my time went into engineering: brainstorming, architecture and design.",
    POINTS: [
      "Built the platform's flow-based UI with React Flow, TypeScript and TanStack Start",
      "Designed the system of versioned DSL components and built the version handling",
      "Explored what a DSL is good for and how it can drive a whole system",
      "Moved into system design: how to structure the platform and how it scales",
    ],
    STACK: ["TypeScript", "TanStack Start", "React Flow", "DSL design"],
  },
  {
    ID: "resimator",
    PERIOD: "Dec 2025 — Apr 2026",
    TITLE: "Resimator OY",
    CONTEXT: "Nepal",
    ROLES: [
      { TITLE: "Junior Full Stack Developer", PERIOD: "Feb — Apr 2026" },
      { TITLE: "Full Stack Intern", PERIOD: "Dec 2025 — Jan 2026" },
    ],
    SUMMARY:
      "My first engineering team. I learned how production software is built across the frontend and the backend.",
    POINTS: [
      "Joined as an intern: fixed bugs, shipped small features and got to know the codebase through code review with senior engineers",
      "Promoted to junior after two months and built scalable websites across the stack",
      "Designed and built scalable REST APIs and wrote the documentation the team used to integrate with them",
    ],
    STACK: ["React", "TypeScript", "Node.js", "REST APIs"],
  },
  {
    ID: "client-builds",
    PERIOD: "2025 — 2026",
    TITLE: "Started by building",
    CONTEXT: "Freelance · Client projects",
    SUMMARY:
      "I got into this because I loved building things. My first real users were local businesses.",
    POINTS: [
      "Ganesh Hemp: contributed to a team-built e-commerce platform on TanStack Start and Supabase, so Ganesh Adi can sell the brand's products online.",
      "Indigo Gallery Kathmandu: a MERN + TypeScript platform where the gallery shows, discusses and sells its paintings. I built it and handed it over to them.",
    ],
    PROJECT_REFS: ["project-ganesh-hemp", "project-indigo"],
  },
];
