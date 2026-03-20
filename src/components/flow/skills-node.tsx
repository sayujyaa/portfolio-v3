import { Position } from "@xyflow/react";
import { Sparkles } from "lucide-react";
import { SKILLS } from "@/constants";
import { cn } from "@/lib/utils";
import HiddenHandle from "@/components/ui/HiddenHandle";

export function SkillsNode() {
  return (
    <section className="relative px-6 md:px-12 py-8 md:py-12 rounded-[2.5rem] md:rounded-[3rem] backdrop-blur-3xl bg-background/40 border border-foreground/10 shadow-2xl w-80 md:w-140 group overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-foreground/2 to-transparent bg-size-[100%_4px] animate-[pulse_4s_ease-in-out_infinite] pointer-events-none" />

      <HiddenHandle
        type="target"
        position={Position.Top}
        className="opacity-0 w-0 h-0"
      />
      <HiddenHandle
        type="source"
        position={Position.Bottom}
        className="opacity-0 w-0 h-0"
      />

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 font-mono">
          {SKILLS.CATEGORIES.map((cat, idx) => (
            <article
              key={idx}
              className={cn(
                "p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] space-y-4",
                idx === 0
                  ? "md:col-span-2 bg-foreground/5 border border-foreground/5"
                  : cat.VARIANT === "default"
                    ? "bg-ui-primary/10 border border-ui-primary/20"
                    : "bg-foreground/5 border border-foreground/[0.03]",
              )}
            >
              <h3
                className={cn(
                  "text-[10px] font-black uppercase tracking-widest",
                  cat.VARIANT === "default" ? "text-ui-primary" : "opacity-40",
                )}
              >
                {cat.TITLE}
              </h3>
              <ul
                className={
                  idx === 0 ? "flex flex-wrap gap-2" : "flex flex-col md:grid md:grid-cols-2 gap-2"
                }
              >
                {cat.LIST.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-xs font-bold leading-none",
                        idx === 0
                          ? "px-3 py-1.5 rounded-xl bg-background/50 border border-foreground/5 hover:bg-ui-primary hover:text-background transition-colors cursor-default"
                          : "opacity-80",
                        skill === "Claude Code" ? "text-ui-primary animate-pulse" : ""
                      )}
                    >
                      {skill === "Claude Code" ? <span className="opacity-60 text-[10px] mr-1 inline-block">[AI]</span> : null }
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
