import { Mail, Linkedin, Github, Lock } from "lucide-react";

export const PERSONAL_INFO = {
  NAME: "Sayujya",
  ROLE: "Full Stack Developer",
  LOCATION: "Nepal",
  EXPERIENCE_YEARS: "1+ Years",
  STATUS: {
    LABEL: "Working",
    ICON: Lock,
  },
  CV_VERSION: "v1.0",
  CV_SUBTITLE: "DOWNLOAD PDF",
  CV_LINK: "/my-cv.pdf",
  CONTACT_SUBTITLE:
    "I'm always open to new opportunities and interesting projects.",
  COPYRIGHT: "Sayujya © 2026",
} as const;

export const SOCIALS = [
  { ICON: Github, HREF: "https://github.com/sayujyaa" },
  {
    ICON: Linkedin,
    HREF: "https://www.linkedin.com/in/sayujya-satyal-3452b5217/",
  },
  { ICON: Mail, HREF: "mailto:sayujya57@gmail.com" },
] as const;
