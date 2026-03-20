import { Position } from "@xyflow/react";

import { PERSONAL_INFO, SOCIALS } from "@/constants";
import { Mail } from "lucide-react";
import HiddenHandle from "../ui/HiddenHandle";

export function ContactNode() {
  return (
    <main className="px-6 py-8 rounded-3xl backdrop-blur-md md:backdrop-blur-xl bg-background/80 md:bg-foreground/5 border border-foreground/10 shadow-xl md:shadow-2xl w-72 md:w-90 text-center transition-transform hover:-translate-y-2 duration-500 group relative overflow-hidden">
      <HiddenHandle type="target" position={Position.Top} />

      <figure className="inline-block p-4 rounded-2xl bg-ui-primary/10 mb-4 shadow-[0_0_20px_var(--ui-primary)]/20 group-hover:scale-110 transition-transform duration-500">
        <Mail className="text-ui-primary size-10" />
      </figure>

      <header>
        <h2 className="text-3xl font-black bg-clip-text text-transparent bg-linear-to-r from-ui-primary to-foreground mb-2">
          Let&apos;s Connect
        </h2>
        <p className="text-sm text-foreground/60 font-medium mb-6">
          {PERSONAL_INFO.CONTACT_SUBTITLE}
        </p>
      </header>

      <section className="flex justify-center gap-4">
        {SOCIALS.map(({ ICON: Icon, HREF }, idx) => (
          <a
            key={idx}
            href={HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-foreground/5 hover:bg-ui-primary/20 hover:text-ui-primary transition-colors duration-300"
          >
            <Icon size={20} />
          </a>
        ))}
      </section>

      <p className="mt-8 text-[9px] font-black uppercase tracking-[0.4em] opacity-20">
        {PERSONAL_INFO.COPYRIGHT}
      </p>
    </main>
  );
}
