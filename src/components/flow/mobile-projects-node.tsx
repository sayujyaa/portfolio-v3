"use client";

import { memo } from "react";
import { Position } from "@xyflow/react";
import { Briefcase, Github, Link2 } from "lucide-react";
import { SORTED_PROJECTS } from "@/constants";
import HiddenHandle from "@/components/ui/HiddenHandle";

export const MobileProjectsNode = memo(function MobileProjectsNode() {
  return (
    <div className="relative w-[85vw] max-w-95 nodrag">
      <HiddenHandle type="target" position={Position.Top} />
      <HiddenHandle type="source" position={Position.Bottom} />

      {/* Header */}
      <header className="flex items-center gap-3 mb-5">
        <figure className="p-2.5 rounded-2xl bg-ui-primary/10 text-ui-primary">
          <Briefcase className="size-6" />
        </figure>
        <div>
          <h2 className="text-2xl font-black tracking-tighter leading-none">
            Projects
          </h2>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30">
            Swipe to explore
          </p>
        </div>
      </header>

      {/* Horizontal Scroll Container */}
      <div
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {SORTED_PROJECTS.map((project) => (
          <article
            key={project.ID}
            className="snap-center shrink-0 w-[75vw] max-w-[320px] rounded-2xl bg-background border border-foreground/10 p-5 flex flex-col justify-between"
          >
            {/* Year Badge */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-ui-primary/10 text-ui-primary text-[10px] font-black uppercase tracking-widest">
                  {project.YEAR}
                </span>
                <span className="text-3xl font-black opacity-5">
                  {project.YEAR.slice(-2)}
                </span>
              </div>

              <h3 className="text-xl font-black tracking-tighter mb-2">
                {project.TITLE}
              </h3>
              <p className="text-xs text-foreground/60 leading-relaxed font-medium mb-4">
                {project.DESCRIPTION}
              </p>

              {/* Tags */}
              <ul className="flex flex-wrap gap-1.5 mb-5">
                {project.TAGS.map((tag) => (
                  <li
                    key={tag}
                    className="text-[9px] font-black uppercase tracking-wide opacity-40"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2 border-t border-foreground/5 pt-4">
              {project.GITHUB && (
                <a
                  href={project.GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-foreground/40 no-underline"
                >
                  <Github size={12} strokeWidth={3} />
                  <span>GitHub</span>
                </a>
              )}
              <a
                href={project.LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-ui-primary no-underline"
              >
                <Link2 size={12} strokeWidth={3} />
                <span>Live Site</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Scroll indicator dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {SORTED_PROJECTS.map((p) => (
          <span
            key={p.ID}
            className="w-1.5 h-1.5 rounded-full bg-foreground/20"
          />
        ))}
      </div>
    </div>
  );
});
