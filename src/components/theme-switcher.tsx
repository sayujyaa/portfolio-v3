"use client";

import { useEffect, useState, useRef } from "react";
import { Sun, CloudSun, Cloud, Moon, MoonStar, Sparkles } from "lucide-react";
import { useThemeStore } from "@/store/theme-store";
import { motion, AnimatePresence } from "motion/react";

const THEMES = [
  { id: 1, icon: Sun, label: "Daylight" },
  { id: 2, icon: CloudSun, label: "Cream" },
  { id: 3, icon: Cloud, label: "Gloaming" },
  { id: 4, icon: Moon, label: "Twilight" },
  { id: 5, icon: MoonStar, label: "Space" },
  { id: 6, icon: Sparkles, label: "Void" },
];

export function ThemeSwitcher() {
  const { level, setLevel } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      document.documentElement.setAttribute("data-level", level.toString());
    });
    return () => cancelAnimationFrame(frame);
  }, [level]);

  // Handle outside click to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-60 md:hidden p-4 rounded-full bg-background/80 backdrop-blur-2xl border border-foreground/10 shadow-2xl text-ui-primary active:scale-90 transition-transform"
      >
        <Sparkles size={24} />
      </button>

      {/* Backdrop for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden bg-background/10 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Rail - Desktop: Fixed left | Mobile: Overlaid drawer */}
      <div 
        ref={switcherRef}
        className={`
          fixed left-0 top-0 bottom-0 z-50 flex items-center transition-all duration-700
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          px-4 md:px-6 bg-background/5 md:bg-transparent backdrop-blur-3xl md:backdrop-blur-none py-12
      `}>
        {/* Vertical THEMES wording */}
        <div className="flex flex-col items-center justify-center mr-6 select-none opacity-40">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] rotate-180 [writing-mode:vertical-lr] text-foreground">
            Themes
          </span>
        </div>

        <div className="relative flex flex-col items-start justify-center gap-2 h-auto">
          {THEMES.map((theme, idx) => {
            const Icon = theme.icon;
            const isActive = level === theme.id;
            const isBig = theme.id % 2 !== 0;

            return (
              <motion.div
                key={theme.id}
                initial={isOpen ? { x: -25, opacity: 0 } : false}
                animate={isOpen ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="relative flex items-center group/item h-12"
              >
                <button
                  onClick={() => {
                    setLevel(theme.id);
                    setIsOpen(false);
                  }}
                  className="relative flex items-center gap-6 cursor-pointer focus:outline-none transition-all group"
                >
                  <div
                    className={`transition-all duration-500 rounded-full ${
                      isActive
                        ? "h-3 opacity-100 shadow-[0_0_15px_var(--ui-primary)]"
                        : "h-1 opacity-50 group-hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor: "var(--ui-primary)",
                      width: isBig ? "48px" : "24px",
                    }}
                  />

                  <div
                    className={`transition-all duration-300 ${isActive ? "scale-110" : "opacity-40 group-hover:opacity-80"}`}
                    style={{
                      color: isActive ? "var(--ui-primary)" : "currentColor",
                    }}
                  >
                    <Icon size={20} strokeWidth={isActive ? 3 : 1.5} />
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}
