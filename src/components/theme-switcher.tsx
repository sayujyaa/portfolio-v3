"use client";

import { useEffect, useRef, useState } from "react";
import { Palette } from "lucide-react";

import { THEMES, useThemeStore } from "@/store/theme-store";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { level, setLevel } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-level", String(level));
  }, [level]);

  useEffect(() => {
    if (!isOpen) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [isOpen]);

  return (
    <div
      ref={ref}
      className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2 md:top-1/2 md:bottom-auto md:left-6 md:-translate-y-1/2"
    >
      <div
        role="radiogroup"
        aria-label="Theme"
        className={cn(
          "flex-col border border-line bg-surface/90 backdrop-blur-md md:flex",
          isOpen ? "flex" : "hidden",
        )}
      >
        <p className="label-mono border-b border-line px-3 py-3 text-[10px]">
          Theme
        </p>
        {THEMES.map((theme) => {
          const active = level === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => {
                setLevel(theme.id);
                setIsOpen(false);
              }}
              title={theme.label}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-foreground/[0.05]",
                active && "bg-foreground/[0.06]",
              )}
            >
              <span
                className={cn(
                  "relative size-5 border",
                  active ? "border-ui-primary" : "border-line",
                )}
                style={{ background: theme.bg }}
              >
                <span
                  className="absolute right-0.5 bottom-0.5 size-1.5"
                  style={{ background: theme.accent }}
                />
              </span>
              <span
                className={cn(
                  "font-mono text-[11px] md:hidden",
                  active ? "text-ui-primary" : "text-muted",
                )}
              >
                {theme.label}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Change theme"
        aria-expanded={isOpen}
        className="grid size-12 place-items-center border border-line bg-surface/90 text-ui-primary backdrop-blur-md active:scale-95 md:hidden"
      >
        <Palette className="size-5" />
      </button>
    </div>
  );
}
