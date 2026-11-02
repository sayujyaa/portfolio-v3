import { create } from "zustand";

interface ProjectState {
  /** Id of the project open in the detail panel, or null when closed. */
  openId: string | null;
  open: (id: string) => void;
  close: () => void;
}

export const useProjectStore = create<ProjectState>()((set) => ({
  openId: null,
  open: (id) => set({ openId: id }),
  close: () => set({ openId: null }),
}));
