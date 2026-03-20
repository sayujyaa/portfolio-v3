"use client";

import { useState, useEffect, ElementType } from "react";
import { Panel } from "@xyflow/react";
import { motion } from "motion/react";
import { Circle, Globe, Plus, Zap } from "lucide-react";
import { PERSONAL_INFO } from "@/constants";

interface StatusItemProps {
  icon: ElementType;
  label: string;
  value: string;
  active?: boolean;
  className?: string;
}

const StatusItem = ({
  icon: Icon,
  label,
  value,
  active = false,
  className = "",
}: StatusItemProps) => (
  <main
    className={`flex items-center gap-2.5 px-4 h-full border-r border-white/5 last:border-0 hover:bg-white/5 transition-colors group cursor-default whitespace-nowrap ${className}`}
  >
    <figure
      className={`p-1.5 rounded-lg shrink-0 ${active ? "bg-ui-primary/20 text-ui-primary shadow-[0_0_15px_rgba(var(--ui-primary-rgb),0.3)]" : "bg-white/5 text-foreground/40"} group-hover:scale-110 transition-transform`}
    >
      <Icon size={12} />
    </figure>
    <figcaption className="flex items-baseline gap-1.5">
      <span className="text-[8px] font-black uppercase tracking-widest">
        {label}:
      </span>
      <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/80 group-hover:text-foreground transition-colors">
        {value}
      </span>
    </figcaption>
  </main>
);

export function TopBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Panel
      position="top-center"
      className="m-4 md:m-8 z-50 pointer-events-none sm:pointer-events-auto w-fit bg-transparent!"
    >
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "circOut" }}
        className="flex items-center justify-center"
      >
        <div className="relative group/bar overflow-hidden">
          {/* Main Glass HUD */}
          <section className="bg-background/20 backdrop-blur-3xl border border-white/10 rounded-full h-10 md:h-12 flex items-center shadow-2xl overflow-hidden">
            {/* ID Section */}
            <article className="flex items-center gap-3 pl-5 pr-6 h-full bg-ui-primary/10 border-r border-ui-primary/20 relative group/id cursor-default">
              <div className="w-1.5 h-1.5 rounded-full bg-ui-primary animate-pulse" />
              <div className="flex items-baseline gap-2">
                <span className="text-[11px] font-black tracking-[0.2em]">
                  {PERSONAL_INFO.NAME.toUpperCase()}
                </span>
                <span className="text-[8px] font-bold opacity-70 tracking-widest hidden sm:inline">
                  CORE_UNIT_V3
                </span>
              </div>
            </article>

            {/* Hub Data - Mobile/Desktop */}
            <nav className="flex h-full items-center">
              <StatusItem
                icon={Zap}
                label="SYS"
                value="ACTIVE"
                active
                className="px-3 md:px-4"
              />
              <StatusItem
                icon={Globe}
                label="LOC"
                value={PERSONAL_INFO.LOCATION}
                className="hidden xs:flex px-3 md:px-4"
              />
            </nav>

            {/* Universal Clock - Desktop Only */}
            <time className="hidden sm:flex items-center h-full border-l border-white/5 bg-white/5 pl-5 pr-6 cursor-default">
              <article className="flex items-center gap-3">
                <div className="hidden lg:flex flex-col items-end opacity-20">
                  <span className="text-[7px] font-black uppercase tracking-widest leading-none">
                    UTC
                  </span>
                </div>

                <span className="text-[11px] font-mono font-bold tracking-[0.15em] text-ui-primary/90 drop-shadow-[0_0_8px_var(--ui-primary)]">
                  {time || "--:--:--"}
                </span>
              </article>
            </time>
          </section>

          {/* Glitch Overlay Effect on hover */}
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-ui-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 blur-[1px]" />
        </div>

        {/* Navigation Instructions HUD */}
        <aside className="absolute -bottom-10 hidden md:flex items-center gap-6 px-6 py-2 rounded-full border border-white/5 bg-background/5 backdrop-blur-3xl opacity-30 group-hover/bar:opacity-100 transition-all duration-700 pointer-events-none scale-95 group-hover/bar:scale-100">
          <article className="flex items-center">
            <span className="text-[8px] font-black uppercase tracking-[0.2em] px-1">
              Scroll
            </span>
            <Plus className="size-2.5 stroke-3" />
            <span className="text-[8px] font-black uppercase tracking-[0.2em] px-1">
              Pan
            </span>
          </article>
          <Circle className="size-2 fill-ui-primary" />
          <article className="flex items-center gap-2">
            <span className="text-[8px] font-black uppercase tracking-[0.2em]">
              Ctrl / Cmd + Scroll to Zoom · Drag to Move
            </span>
          </article>
        </aside>
      </motion.header>
    </Panel>
  );
}
