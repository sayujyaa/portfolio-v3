export const NODE_TYPES = {
  INTRO: "intro",
  CV: "cv",
  EXPERIENCE: "experience",
  PROJECT_CARD: "project-card",
  SKILLS: "skills",
  CONTACT: "contact",
} as const;

export const VIEW_CONFIG = {
  PADDING: {
    MOBILE: 0.2,
    DESKTOP: 0.6,
    INITIAL: 0.15,
  },
  DURATION: 1200,
  MAX_ZOOM: 2,
  INITIAL_ZOOM: 1.2,
} as const;
