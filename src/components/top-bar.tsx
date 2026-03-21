"use client";

import { useState, useEffect, useRef, ElementType } from "react";
import { Circle, Globe, Plus, Zap, Info } from "lucide-react";
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
  const [isInsightOpen, setIsInsightOpen] = useState(false);
  const insightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (insightRef.current && !insightRef.current.contains(event.target as Node)) {
        setIsInsightOpen(false);
      }
    };
    if (isInsightOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isInsightOpen]);

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
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-4 md:pt-8 pointer-events-auto w-fit h-fit"
    >
      <header className="flex items-center justify-center relative">
        <div className="relative group/bar overflow-visible" ref={insightRef}>
          {/* Main Glass HUD */}
          <section className="bg-background/20 backdrop-blur-3xl border border-white/10 rounded-full h-10 md:h-12 flex items-center shadow-2xl overflow-hidden relative">
            {/* ID Section */}
            <article className="flex items-center gap-3 pl-5 pr-6 h-full bg-ui-primary/10 border-r border-ui-primary/20 relative group/id cursor-default">
              <div className="w-1.5 h-1.5 rounded-full bg-ui-primary" />
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
                className="px-3"
              />
              <StatusItem
                icon={Globe}
                label="LOC"
                value={PERSONAL_INFO.LOCATION}
                className="hidden xs:flex px-3"
              />
            </nav>

            {/* Quick Insight — mobile only (desktop gets full experience) */}
            <article className="h-full flex items-center border-l border-white/5 md:hidden">
               <button
                 onClick={() => setIsInsightOpen(!isInsightOpen)}
                 className={`px-4 h-full flex items-center justify-center transition-all hover:bg-white/5 ${isInsightOpen ? 'bg-ui-primary/10 text-ui-primary' : 'text-foreground/40 hover:text-ui-primary/80'}`}
                 aria-label="Quick Insight"
               >
                 <Info size={14} strokeWidth={2.5} className={`${isInsightOpen ? 'scale-110' : ''} transition-transform`} />
               </button>
            </article>

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

            {/* Glitch Overlay Effect on hover */}
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-ui-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 blur-[1px] pointer-events-none" />
          </section>

          {/* Popover outside the overflow-hidden section */}
          {isInsightOpen && (
             <aside
                style={{ transform: 'translateX(-50%)' }}
                className="absolute top-[130%] left-1/2 z-60 w-64 p-5 md:hidden rounded-3xl bg-background/90 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
             >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-ui-primary/30 overflow-hidden">
                   <div className="w-1/2 h-full bg-ui-primary shadow-[0_0_10px_var(--ui-primary)]" />
                </div>
                
                <div className="flex flex-col gap-3">
                   <header className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-ui-primary/10 text-ui-primary">
                         <Info size={12} strokeWidth={3} />
                      </div>
                      <span className="text-[10px] font-black tracking-[0.2em] text-ui-primary uppercase">Quick Insight</span>
                   </header>
                   <p className="text-[13px] font-medium leading-relaxed text-foreground/70">
                      Mobile System Active: Navigation and advanced interactions are restricted. Please view on a Desktop for the full immersive experience.
                   </p>
                   <footer className="flex items-center justify-between pt-2 border-t border-white/5 opacity-40">
                      <span className="text-[8px] font-mono tracking-widest uppercase">SY_INSIGHT_M1</span>
                      <div className="flex gap-1">
                         <div className="w-1 h-1 rounded-full bg-ui-primary" />
                         <div className="w-1 h-1 rounded-full bg-foreground/20" />
                      </div>
                   </footer>
                </div>
             </aside>
          )}
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
      </header>
    </div>
  );
}
