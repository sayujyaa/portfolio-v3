import { Github, Linkedin, Mail } from "lucide-react";

export const PERSONAL_INFO = {
  NAME: "Sayujya",
  FULL_NAME: "Sayujya Satyal",
  ROLE: "Full Stack Developer",
  TAGLINE:
    "I build web products end to end. Lately I spend more time designing the system than typing the code.",
  LOCATION: "Nepal",
  TIME_ZONE: "Asia/Kathmandu",
  TIME_ZONE_LABEL: "KTM",
  STATUS: "Open to work",
  SPECS: [
    { LABEL: "Based in", VALUE: "Nepal" },
    { LABEL: "Building", VALUE: "Since 2024" },
    { LABEL: "Focus", VALUE: "Frontend & systems" },
  ],
  CV_LINK: "/my-cv.pdf",
  CV_FILENAME: "Sayujya_Satyal_CV.pdf",
  EMAIL: "sayujya57@gmail.com",
  CONTACT_SUBTITLE:
    "Open to full-time roles and interesting freelance work. If you're building something with a hard frontend or a system to design, I'd like to hear about it.",
  COPYRIGHT: `© ${new Date().getFullYear()} Sayujya Satyal`,
} as const;

export const SOCIALS = [
  {
    LABEL: "GitHub",
    HANDLE: "sayujyaa",
    ICON: Github,
    HREF: "https://github.com/sayujyaa",
  },
  {
    LABEL: "LinkedIn",
    HANDLE: "sayujya-satyal",
    ICON: Linkedin,
    HREF: "https://www.linkedin.com/in/sayujya-satyal-3452b5217/",
  },
  {
    LABEL: "Email",
    HANDLE: "sayujya57@gmail.com",
    ICON: Mail,
    HREF: "mailto:sayujya57@gmail.com",
  },
] as const;
