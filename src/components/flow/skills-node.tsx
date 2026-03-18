import { Handle, Position } from "@xyflow/react";
import { Sparkles } from "lucide-react";
import { SKILLS } from "@/constants";
import { cn } from "@/lib/utils";

export function SkillsNode() {
  return (
    <section className="relative px-8 md:px-12 py-10 md:py-12 rounded-[2.5rem] md:rounded-[3rem] backdrop-blur-3xl bg-background/40 border border-foreground/10 shadow-2xl w-[calc(100vw-2rem)] md:w-140 group overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-foreground/2 to-transparent bg-size-[100%_4px] animate-[pulse_4s_ease-in-out_infinite] pointer-events-none" />

      <Handle type="target" position={Position.Top} className="opacity-0 w-0 h-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0 w-0 h-0" />

      <div className="relative z-10">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black tracking-tighter">
              Stack & <br />
              <span className="text-ui-primary">Capabilities</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mt-2">
              Core Competencies
            </p>
          </div>
          <figure className="w-16 h-16 rounded-3xl bg-ui-primary/10 flex items-center justify-center text-ui-primary shadow-inner shadow-ui-primary/20">
            <Sparkles size={32} />
          </figure>
        </header>

        <div className="grid grid-cols-2 gap-4">
          {SKILLS.CATEGORIES.map((cat, idx) => (
            <article 
              key={idx} 
              className={cn(
                "p-6 rounded-[2rem] space-y-4",
                idx === 0 ? "col-span-2 bg-foreground/5 border border-foreground/5" : 
                cat.VARIANT === "primary" ? "bg-ui-primary/10 border border-ui-primary/20" : 
                "bg-foreground/5 border border-foreground/5"
              )}
            >
              <h3 className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                cat.VARIANT === "primary" ? "text-ui-primary" : "opacity-40"
              )}>
                {cat.TITLE}
              </h3>
              <ul className={idx === 0 ? "flex flex-wrap gap-2" : "grid grid-cols-2 gap-2"}>
                {cat.LIST.map((skill) => (
                  <li key={skill}>
                    <span className={idx === 0 ? 
                      "px-3 py-1.5 rounded-xl bg-background/50 border border-foreground/5 text-xs font-bold hover:bg-ui-primary hover:text-background transition-colors cursor-default" : 
                      "text-xs font-bold opacity-80"
                    }>
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
