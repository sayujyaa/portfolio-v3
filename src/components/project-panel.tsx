"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";

import { PROJECTS, projectCode } from "@/constants";
import { Sheet } from "@/components/ui/sheet";
import { useProjectStore } from "@/store/project-store";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Project detail panel: slides in from the right on desktop and up from the
 * bottom on mobile. Opened from the Selected Work index or the Build Log.
 */
export function ProjectPanel() {
  const { openId, open, close } = useProjectStore();
  const index = PROJECTS.findIndex((p) => p.ID === openId);
  const project = index >= 0 ? PROJECTS[index] : null;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, close]);

  const step = (delta: number) =>
    open(PROJECTS[(index + delta + PROJECTS.length) % PROJECTS.length].ID);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-[2px]"
          />
          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-panel-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-x-3 bottom-3 z-[61] max-h-[85dvh] md:inset-x-auto md:top-6 md:right-6 md:bottom-6 md:max-h-none md:w-[30rem]"
          >
            <Sheet
              index={projectCode(project.ID)}
              label={`${project.KIND} work · ${project.YEAR}`}
              meta={
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  className="-my-1 flex items-center gap-1.5 transition-colors hover:text-ui-primary"
                >
                  Close <X className="size-3.5" />
                </button>
              }
              className="flex h-full max-h-[inherit] flex-col"
            >
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <h2
                  id="project-panel-title"
                  className="text-3xl font-semibold tracking-tight md:text-4xl"
                >
                  {project.TITLE}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {project.SUMMARY}
                </p>

                {project.HIGHLIGHTS.length > 0 && (
                  <section className="mt-8">
                    <p className="label-mono">Highlights</p>
                    <ul className="mt-4 space-y-3">
                      {project.HIGHLIGHTS.map((h) => (
                        <li key={h} className="flex gap-3 text-[15px] leading-relaxed">
                          <span className="mt-[0.5em] size-1 shrink-0 bg-ui-primary" aria-hidden />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <section className="mt-8">
                  <p className="label-mono">Stack</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.STACK.map((s) => (
                      <li key={s} className="chip px-2.5 py-1.5 text-xs">
                        {s}
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="mt-8 flex flex-wrap gap-2">
                  {project.LINK && (
                    <ExternalLink href={project.LINK} primary>
                      {project.KIND === "Client" ? "Visit site" : "Live demo"}
                    </ExternalLink>
                  )}
                  {project.GITHUB && (
                    <ExternalLink href={project.GITHUB}>Source</ExternalLink>
                  )}
                </div>
              </div>

              <footer className="flex items-center justify-between border-t border-line">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous project"
                  className="grid size-12 place-items-center border-r border-line text-muted transition-colors hover:bg-foreground/[0.05] hover:text-ui-primary"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <span className="label-mono tabular-nums">
                  {pad(index + 1)} / {pad(PROJECTS.length)}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next project"
                  className="grid size-12 place-items-center border-l border-line text-muted transition-colors hover:bg-foreground/[0.05] hover:text-ui-primary"
                >
                  <ArrowRight className="size-4" />
                </button>
              </footer>
            </Sheet>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function ExternalLink({
  href,
  primary,
  children,
}: {
  href: string;
  primary?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group/link inline-flex items-center gap-1.5 border px-3.5 py-2.5 font-mono text-[11px] tracking-[0.08em] uppercase transition-colors",
        primary
          ? "border-ui-primary bg-ui-primary text-on-primary hover:bg-transparent hover:text-ui-primary"
          : "border-line text-foreground hover:border-ui-primary hover:text-ui-primary",
      )}
    >
      {children}
      <ArrowUpRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
    </a>
  );
}
