"use client";

import { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { PERSONAL_INFO } from "@/constants";
import { StatusDot } from "@/components/ui/status-dot";

const formatTime = () =>
  new Date().toLocaleTimeString("en-GB", {
    timeZone: PERSONAL_INFO.TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
  });

/** Local time where I am, so visitors know when to expect a reply. */
function useLocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(formatTime());
    const frame = requestAnimationFrame(update);
    const interval = setInterval(update, 10_000);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  }, []);
  return time;
}

export function TopBar() {
  const time = useLocalTime();
  const [isHintOpen, setIsHintOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isHintOpen) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setIsHintOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [isHintOpen]);

  const cell = "flex items-center gap-2 border-l border-line px-3.5 first:border-l-0 sm:px-4";

  return (
    <div
      ref={ref}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 md:top-6"
    >
      <header className="label-mono flex h-10 items-stretch whitespace-nowrap border border-line bg-surface/85 backdrop-blur-md">
        <span className={`${cell} text-foreground`}>
          <span className="size-1.5 bg-ui-primary" aria-hidden />
          <span className="sm:hidden">{PERSONAL_INFO.NAME}</span>
          <span className="hidden sm:inline">{PERSONAL_INFO.FULL_NAME}</span>
        </span>
        <span className={`${cell} hidden lg:flex`}>{PERSONAL_INFO.ROLE}</span>
        <span className={`${cell} text-ok`}>
          <StatusDot />
          {PERSONAL_INFO.STATUS}
        </span>
        <time className={`${cell} hidden sm:flex`} suppressHydrationWarning>
          {PERSONAL_INFO.TIME_ZONE_LABEL}
          <span className="text-foreground tabular-nums">{time || "--:--"}</span>
        </time>
        <button
          type="button"
          onClick={() => setIsHintOpen((o) => !o)}
          aria-label="How to navigate"
          aria-expanded={isHintOpen}
          className={`${cell} transition-colors hover:text-ui-primary md:hidden ${isHintOpen ? "text-ui-primary" : ""}`}
        >
          <Info className="size-3.5" />
        </button>
      </header>

      {/* Desktop controls legend */}
      <p className="label-mono mt-3 hidden justify-center gap-4 text-[10px] opacity-70 md:flex">
        <span>Scroll · pan</span>
        <span>Ctrl / ⌘ + scroll · zoom</span>
        <span>Drag · move cards</span>
      </p>

      {/* Mobile hint */}
      <AnimatePresence>
        {isHintOpen && (
          <motion.aside
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 mt-2 w-72 -translate-x-1/2 border border-line bg-surface p-4 shadow-xl md:hidden"
          >
            <p className="label-mono text-ui-primary">How to navigate</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Drag to pan around the map, and swipe the projects rail
              sideways. The button in the bottom-right jumps between sections.
              It&apos;s nicest on a desktop.
            </p>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
