import { Handle, Position } from "@xyflow/react";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";
import { PERSONAL_INFO } from "@/constants";

export function ContactNode() {
  const SOCIALS = [
    { ICON: Github, HREF: "#" },
    { ICON: Linkedin, HREF: "#" },
    { ICON: Twitter, HREF: "#" },
  ] as const;

  return (
    <footer className="px-8 py-8 rounded-3xl backdrop-blur-xl bg-foreground/5 border border-foreground/10 shadow-2xl w-[calc(100vw-2rem)] md:w-90 text-center transition-transform hover:-translate-y-2 duration-500 group relative overflow-hidden">
      <Handle type="target" position={Position.Top} className="opacity-0 w-0 h-0" />

      <figure className="inline-block p-4 rounded-2xl bg-ui-primary/10 mb-4 shadow-[0_0_20px_var(--ui-primary)]/20 group-hover:scale-110 transition-transform duration-500">
        <Mail size={32} className="text-ui-primary" />
      </figure>

      <header>
        <h2 className="text-3xl font-black bg-clip-text text-transparent bg-linear-to-r from-ui-primary to-foreground mb-2">
          Let&apos;s Connect
        </h2>
        <p className="text-sm text-foreground/60 font-medium mb-6">
          {PERSONAL_INFO.CONTACT_SUBTITLE}
        </p>
      </header>

      <nav className="flex justify-center gap-4">
        {SOCIALS.map(({ ICON: Icon, HREF }, idx) => (
          <a
            key={idx}
            href={HREF}
            className="p-3 rounded-full bg-foreground/5 hover:bg-ui-primary/20 hover:text-ui-primary transition-colors duration-300"
          >
            <Icon size={20} />
          </a>
        ))}
      </nav>

      <p className="mt-8 text-[9px] font-black uppercase tracking-[0.4em] opacity-20">
        {PERSONAL_INFO.COPYRIGHT}
      </p>
    </footer>
  );
}
