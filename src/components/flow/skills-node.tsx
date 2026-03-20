"use client";

import { Position } from "@xyflow/react";
import { Cpu, Layers, Database, Bot, Zap, Code2, Server } from "lucide-react";
import { motion } from "motion/react";
import { SKILLS } from "@/constants";
import { cn } from "@/lib/utils";
import HiddenHandle from "@/components/ui/HiddenHandle";

const ICONS: Record<string, React.ElementType> = {
  "Client Side": Layers,
  "Server Side": Server,
  "Database": Database,
  "AI & Tooling": Bot,
};

export function SkillsNode() {
  return (
    <div className="relative group w-85 md:w-175 nodrag cursor-pointer">
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

      {/* Main Aura Glow */}
      <div className="absolute -inset-10 bg-ui-primary/10 blur-[100px] rounded-full group-hover:bg-ui-primary/30 transition-all duration-1000 opacity-60 pointer-events-none" />
      
      {/* Node Container */}
      <section className="relative overflow-visible rounded-[2.5rem] border-2 border-ui-primary/20 bg-background/80 md:bg-background/60 backdrop-blur-xl md:backdrop-blur-3xl p-6 md:p-10 shadow-xl md:shadow-[0_0_60px_-15px_var(--ui-primary)] transition-all duration-700 hover:border-ui-primary/40 hover:shadow-[0_0_100px_-10px_var(--ui-primary)]">
        
        {/* Holographic Scanner Line - Removed by request */}
        
        {/* Grid Background Pattern */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[30px_30px] mask-[radial-gradient(ellipse_70%_70%_at_50%_0%,#000_80%,transparent_100%)] opacity-30 pointer-events-none" />

        <header className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-foreground/10 pb-6 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-ui-primary mb-2">
              <Cpu size={20} className="animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] bg-ui-primary/10 px-3 py-1 rounded-full border border-ui-primary/20">
                System Architecture
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50 tracking-tighter leading-none origin-left">
              Tech Stack
            </h2>
          </div>
          <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-2">
            <div className="flex items-center justify-center size-12 rounded-2xl bg-ui-primary/10 border border-ui-primary/30 text-ui-primary shadow-inner shadow-ui-primary/20 relative overflow-hidden group/icon">
              <span className="absolute inset-0 bg-ui-primary/20 scale-0 group-hover/icon:scale-100 transition-transform duration-500 rounded-2xl" />
              <Zap size={24} className="fill-ui-primary/30 animate-[pulse_2s_linear_infinite] relative z-10" />
            </div>
            <p className="text-[9px] font-mono tracking-widest opacity-60 uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ui-primary animate-ping" />
              Operational
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
          {SKILLS.CATEGORIES.map((cat, idx) => {
            const Icon = ICONS[cat.TITLE] || Code2;
            const isFeatured = idx === 0;
            return (
              <motion.article
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={cn(
                  "p-6 md:p-8 rounded-[2rem] relative overflow-hidden group/card transition-all duration-500 hover:shadow-2xl",
                  isFeatured
                    ? "md:col-span-2 bg-linear-to-br from-ui-primary/10 to-transparent border border-ui-primary/30 hover:border-ui-primary/60 hover:shadow-ui-primary/20"
                    : "bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10"
                )}
              >
                {/* Diagonal glitch lines on hover */}
                {isFeatured && (
                  <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.02)_10px,rgba(255,255,255,0.02)_20px)]" />
                )}

                <h3 className={cn(
                  "flex items-center gap-3 text-sm font-black uppercase tracking-widest mb-6 transition-colors duration-300 relative z-10",
                  isFeatured ? "text-ui-primary" : "text-foreground/70 group-hover/card:text-foreground"
                )}>
                  <Icon size={18} className={isFeatured ? "text-ui-primary" : "text-foreground/50 group-hover/card:text-foreground"} />
                  {cat.TITLE}
                </h3>
                
                <ul className="flex flex-wrap gap-3 relative z-10">
                  {cat.LIST.map((skill) => (
                    <motion.li
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold font-mono leading-none cursor-default border transition-all duration-300 shadow-lg select-none",
                        isFeatured
                          ? "bg-background border-ui-primary/20 text-foreground hover:bg-ui-primary hover:text-background hover:border-ui-primary hover:shadow-ui-primary/50"
                          : "bg-background/50 border-white/5 text-foreground/80 hover:bg-white/20 hover:text-foreground hover:border-white/30"
                      )}
                    >
                      {skill === "Codex" || skill === "Next.js" ? (
                        <span className={cn("inline-block w-2 h-2 rounded-full animate-pulse shadow-sm",
                          skill === "Codex" ? "bg-[#D97757] shadow-[#D97757]" : "bg-ui-primary shadow-ui-primary"
                        )} />
                      ) : null }
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </section>

    </div>
  );
}
