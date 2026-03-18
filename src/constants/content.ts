export const PROJECTS = [
  {
    ID: "project-1",
    TITLE: "Portfolio V3",
    YEAR: "2024",
    DESCRIPTION: "Infinite canvas portfolio with OKLCH theming and interactive node architecture.",
    TAGS: ["ReactFlow", "Next.js", "Zustand"],
    LINK: "#",
  },
  {
    ID: "project-2",
    TITLE: "AI Workspace",
    YEAR: "2023",
    DESCRIPTION: "Cloud-native pair programming environment with integrated LLMs.",
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
    YEAR: "2023 — Present",
    ROLE: "Software Engineer",
    COMPANY: "TechCorp Systems",
    LOCATION: "Remote",
    DESCRIPTION: "Architecting next-gen AI workspaces and hyper-scalable frontend systems for fortune 500 clients.",
    IS_ACTIVE: true,
  },
  {
    YEAR: "2021 — 2023",
    ROLE: "Frontend Developer",
    COMPANY: "Innovate Startup Lab",
    LOCATION: "Hybrid",
    DESCRIPTION: "Developed a custom Component-Driven design system and reduced main-thread latency by 60%.",
    IS_ACTIVE: false,
  },
] as const;
