export const PROJECTS = [
  {
    ID: "project-1",
    TITLE: "Portfolio V3",
    YEAR: "2024",
    DESCRIPTION:
      "Infinite canvas portfolio with OKLCH theming and interactive node architecture.",
    TAGS: ["ReactFlow", "Next.js", "Zustand"],
    LINK: "#",
  },
  {
    ID: "project-2",
    TITLE: "AI Workspace",
    YEAR: "2023",
    DESCRIPTION:
      "Cloud-native pair programming environment with integrated LLMs.",
    TAGS: ["TypeScript", "Docker", "LLM"],
    LINK: "#",
  },
  {
    ID: "project-3",
    TITLE: "Neural Synth",
    YEAR: "2023",
    DESCRIPTION: "Generative audio engine powered by deep learning models.",
    TAGS: ["Python", "WASM", "Web Audio"],
    LINK: "#",
  },
] as const;

export const EXPERIENCE = [
  {
    YEAR: "2025 — Present",
    ROLE: "Frontend Developer",
    COMPANY: "Resimator OY",
    LOCATION: "Nepal",
    DESCRIPTION:
      "Developing frontend applications for Specc, an intelligent no coding integration platform.",
    IS_ACTIVE: true,
  },
  {
    YEAR: "2024 — 2025",
    ROLE: "Full Stack Developer",
    COMPANY: "Startup",
    LOCATION: "Nepal",
    DESCRIPTION:
      "Developed some personal projects and a few freelance projects.",
    IS_ACTIVE: false,
  },
] as const;
