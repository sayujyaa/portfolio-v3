import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  level: number;
  setLevel: (level: number) => void;
}

const themeCreator: StateCreator<ThemeState, [], [["zustand/persist", unknown]]> = (set) => ({
  level: 4, 
  setLevel: (level: number) => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-level", level.toString());
    }
    set({ level });
  },
});

export const useThemeStore = create<ThemeState>()(
  persist(themeCreator, {
    name: "theme-storage",
  })
);
