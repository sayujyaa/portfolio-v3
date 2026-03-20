"use client";

import { useState, useEffect, useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Navigation2 } from "lucide-react";
import { NAV_LINKS, VIEW_CONFIG } from "@/constants";

export function Nav() {
  const { fitView } = useReactFlow();
  const [isOpen, setIsOpen] = useState(false);

  const handleGoTo = useCallback(
    (id: string) => {
      window.setTimeout(() => {
        void fitView({
          nodes: [{ id }],
          duration: 800,
          padding: VIEW_CONFIG.NODE_FOCUS_PADDING,
          maxZoom: VIEW_CONFIG.INITIAL_ZOOM,
        });
      }, 50);
    },
    [fitView],
  );

  useEffect(() => {
    // Initialize in Next.js safely by deferring to the next frame
    // This avoids the "synchronous setState in effect" cascading render warning
    const rafId = requestAnimationFrame(() => {
      const isStartMobile = window.innerWidth < 768;
      setIsOpen(!isStartMobile);
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main className="fixed bottom-6 right-6 z-50 overflow-visible">
      <div className="flex flex-col items-end gap-4">
        {/* Navigation Rail */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              className="flex flex-col gap-2.5 items-end"
            >
              {NAV_LINKS.map((link, idx) => (
                <motion.button
                  key={link.ID}
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGoTo(link.ID)}
                  className="group relative flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-background/95 backdrop-blur-3xl border border-white/20 hover:border-ui-primary/50 hover:bg-ui-primary/5 transition-all text-right shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                  <div className="absolute inset-y-0 right-0 w-1 bg-ui-primary/10 group-hover:bg-ui-primary transition-colors h-1/2 my-auto" />

                  <div className="flex flex-col items-end">
                    <span className="text-[7px] font-black uppercase tracking-[0.4em] opacity-40 leading-none mb-1 group-hover:text-ui-primary group-hover:opacity-100 transition-all">
                      PATH_{idx + 1}
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest italic group-hover:text-ui-primary transition-colors">
                      {link.LABEL}
                    </span>
                  </div>
                </motion.button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Control Button */}
        <div className="relative flex items-center">
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
                className="absolute bottom-full -right-1.5 mb-8 flex flex-col items-end gap-6 pointer-events-none md:hidden"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 [writing-mode:vertical-rl] rotate-180 select-none whitespace-nowrap">
                  Lost? Use this navigator
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 rounded-2xl bg-ui-primary text-background flex items-center justify-center shadow-[0_10px_30px_rgba(var(--ui-primary-rgb),0.5)] border-4 border-white/10 transition-transform z-10"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "open" : "closed"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <ChevronDown size={24} strokeWidth={3} />
                ) : (
                  <Navigation2
                    size={24}
                    className="rotate-45"
                    strokeWidth={3}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </main>
  );
}
