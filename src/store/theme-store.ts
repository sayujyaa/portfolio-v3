import { create } from "zustand";
import { persist } from "zustand/middleware";

export const THEMES = [
  { id: 1, label: "Paper", bg: "oklch(0.982 0.004 250)", accent: "oklch(0.5 0.19 260)" },
  { id: 2, label: "Drafting", bg: "oklch(0.962 0.02 85)", accent: "oklch(0.55 0.19 32)" },
  { id: 3, label: "Blueprint", bg: "oklch(0.255 0.07 256)", accent: "oklch(0.87 0.15 88)" },
  { id: 4, label: "Ink", bg: "oklch(0.15 0.01 260)", accent: "oklch(0.83 0.13 195)" },
] as const;

export const DEFAULT_THEME = 3;

interface ThemeState {
  level: number;
  setLevel: (level: number) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      level: DEFAULT_THEME,
      setLevel: (level) => set({ level }),
    }),
    {
      name: "theme-storage",
      // v1 replaced the old six themes; reset anyone with a stale choice.
      version: 1,
      migrate: () => ({ level: DEFAULT_THEME }),
    },
  ),
);
