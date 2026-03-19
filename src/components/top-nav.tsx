"use client";

import { useState, useEffect } from "react";
import { Panel, useReactFlow } from "@xyflow/react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, ICONS, VIEW_CONFIG } from "@/constants";

export function TopNav() {
  const { fitView } = useReactFlow();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleGoTo = (id: string) => {
    setIsOpen(false);
    const isStart = id === "intro-1";
    fitView({
      nodes: [{ id }],
      padding: isStart
        ? VIEW_CONFIG.PADDING.INITIAL
        : isMobile
          ? VIEW_CONFIG.PADDING.MOBILE
          : VIEW_CONFIG.PADDING.DESKTOP,
      duration: VIEW_CONFIG.DURATION,
      maxZoom: isStart ? VIEW_CONFIG.INITIAL_ZOOM : VIEW_CONFIG.MAX_ZOOM,
    });
  };

  const NavIcon = ICONS.ROCKET;

  return (
    <Panel position="bottom-center" className="m-4 md:m-8 z-50 overflow-visible">
      <div className="relative">
        <motion.div
          layout
          className="bg-background/20 backdrop-blur-3xl border border-white/10 p-2 md:p-3 rounded-[2rem] flex flex-col-reverse md:flex-row items-center gap-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]"
        >
          <div className="flex items-center justify-between w-full md:w-auto px-4 md:px-2">
            <div className="flex items-center gap-2 text-foreground">
              <NavIcon size={16} />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">
                Explore
              </span>
            </div>
            {isMobile && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-ui-primary"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>

          <AnimatePresence>
            {(!isMobile || isOpen) && (
              <motion.nav
                initial={
                  isMobile ? { opacity: 0, height: 0, marginBottom: 0 } : {}
                }
                animate={
                  isMobile ? { opacity: 1, height: "auto", marginBottom: 12 } : {}
                }
                exit={isMobile ? { opacity: 0, height: 0, marginBottom: 0 } : {}}
                className="flex flex-col md:flex-row gap-2 w-full md:w-auto px-2 pb-2 md:pb-0"
              >
                {NAV_LINKS.map((link, idx) => (
                  <motion.button
                    key={link.ID}
                    whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleGoTo(link.ID)}
                    className="px-4 md:px-5 py-2 md:py-1.5 rounded-full text-[10px] md:text-[11px] font-black tracking-widest bg-white/5 hover:bg-ui-primary hover:text-background border border-white/5 transition-colors uppercase italic shadow-lg"
                    style={{
                      transform: `rotate(${idx % 2 === 0 ? -1 : 1}deg)`,
                    }}
                  >
                    {link.LABEL}
                  </motion.button>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Panel>
  );
}
