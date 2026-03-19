import { Handle, Position } from "@xyflow/react";
import { Briefcase, MapPin } from "lucide-react";
import { EXPERIENCE } from "@/constants";
import { cn } from "@/lib/utils";

export function ExperienceNode() {
  return (
    <section className="relative px-6 md:px-12 py-8 md:py-12 rounded-[2.5rem] md:rounded-[3.5rem] backdrop-blur-3xl bg-background/40 border border-foreground/10 shadow-2xl w-80 md:w-md transition-all duration-700 group overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-ui-primary to-transparent opacity-20" />

      <Handle type="target" position={Position.Top} className="opacity-0 w-0 h-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0 w-0 h-0" />
      <Handle type="source" position={Position.Right} id="projects" className="opacity-0 w-0 h-0" />

      {/* Header Section */}
      <header className="relative z-10 mb-16 px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-2xl bg-ui-primary/10 text-ui-primary shadow-lg shadow-ui-primary/10">
            <Briefcase size={24} />
          </div>
          <div className="h-px flex-1 bg-foreground/10" />
        </div>
        <h2 className="text-4xl font-black tracking-tighter leading-none mb-3">
          Professional <br />
          <span className="text-ui-primary">Journey</span>
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
          Career Timeline
        </p>
      </header>

      <div className="relative z-10 px-4">
        <div className="absolute left-7 top-0 bottom-0 w-1 bg-linear-to-b from-ui-primary/40 via-ui-primary/10 to-transparent rounded-full" />

        <div className="space-y-16">
          {EXPERIENCE.map((item, idx) => (
            <article key={idx} className="relative pl-12">
              <div className={item.IS_ACTIVE ? 
                "absolute left-1.75 top-1.5 w-6 h-6 -translate-x-1/2 rounded-full border-4 border-background bg-ui-primary shadow-[0_0_20px_var(--ui-primary)] z-10" : 
                "absolute left-1.75 top-1.5 w-4 h-4 -translate-x-1/2 rounded-full border-4 border-background bg-foreground/30 z-10"
              } />

              <div className={cn(
                "group/item -translate-y-1",
                !item.IS_ACTIVE && "opacity-60 hover:opacity-100 transition-opacity"
              )}>
                <header className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-ui-primary mb-2">
                  <span className="px-2 py-0.5 rounded bg-ui-primary/10 italic">
                    {item.YEAR}
                  </span>
                </header>
                <h4 className="font-black text-2xl tracking-tight mb-2 group-hover:translate-x-1 transition-transform">
                  {item.ROLE}
                </h4>
                <footer className="flex items-center gap-2 opacity-50 mb-4">
                  <span className="font-bold text-sm">{item.COMPANY}</span>
                  <span className="w-1 h-1 rounded-full bg-foreground" />
                  <MapPin size={12} />
                  <span className="text-xs font-bold">{item.LOCATION}</span>
                </footer>
                <p className="text-sm text-foreground/60 leading-relaxed font-medium">
                  {item.DESCRIPTION}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
