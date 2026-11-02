"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Compass, X } from "lucide-react";

import { NAV_LINKS } from "@/constants";
import { useFocusNode } from "@/lib/use-focus-node";

export function Nav() {
  const focusNode = useFocusNode();
  const [isOpen, setIsOpen] = useState(false);

  // Open by default on desktop; deferred a frame to avoid hydration mismatch.
  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      setIsOpen(window.innerWidth >= 768),
    );
    return () => cancelAnimationFrame(frame);
  }, []);

  const goTo = (id: string) => {
    focusNode(id);
    if (window.innerWidth < 768) setIsOpen(false);
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-2 md:right-6 md:bottom-6">
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            aria-label="Sections"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="w-48 border border-line bg-surface/90 backdrop-blur-md"
          >
            <p className="label-mono border-b border-line px-4 py-3">
              Navigator
            </p>
            <ol className="py-1.5">
              {NAV_LINKS.map((link, i) => (
                <li key={link.ID}>
                  <button
                    type="button"
                    onClick={() => goTo(link.ID)}
                    className="group flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors hover:bg-foreground/[0.05] hover:text-ui-primary"
                  >
                    <span className="font-mono text-[11px] text-muted group-hover:text-ui-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.LABEL}
                  </button>
                </li>
              ))}
            </ol>
          </motion.nav>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close navigator" : "Open navigator"}
        aria-expanded={isOpen}
        className="grid size-12 place-items-center border border-ui-primary bg-ui-primary text-on-primary transition-transform active:scale-95"
      >
        {isOpen ? <X className="size-5" /> : <Compass className="size-5" />}
      </button>
    </div>
  );
}
