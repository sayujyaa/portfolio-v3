import { Briefcase, Github, Linkedin, Mail, MapPin, Send, Sparkles, Twitter } from "lucide-react";

export const ICONS = {
  LOCATION: MapPin,
  EXPERIENCE: Briefcase,
  STACK: Sparkles,
  MAIL: Mail,
  GITHUB: Github,
  LINKEDIN: Linkedin,
  TWITTER: Twitter,
  ROCKET: Send,
} as const;


export const NAV_LINKS = [
  { ID: "intro-1", LABEL: "Start" },
  { ID: "experience-1", LABEL: "Journey" },
  { ID: "project-1", LABEL: "Works" },
  { ID: "skills-1", LABEL: "Stack" },
  { ID: "contact-1", LABEL: "Contact" },
] as const;

