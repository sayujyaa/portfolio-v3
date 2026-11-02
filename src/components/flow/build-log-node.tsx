"use client";

import { memo } from "react";
import { Position } from "@xyflow/react";
import { ArrowUpRight } from "lucide-react";

import { BUILD_LOG, PROJECTS } from "@/constants";
import { Sheet } from "@/components/ui/sheet";
import HiddenHandle from "@/components/ui/HiddenHandle";
import { useProjectStore } from "@/store/project-store";

export const BuildLogNode = memo(function BuildLogNode() {
  const openProject = useProjectStore((s) => s.open);

  return (
    <Sheet
      index="03"
      label="Build log"
      meta="2026 — 2025"
      className="w-80 md:w-[36rem]"
    >
      <HiddenHandle type="target" position={Position.Top} />
      <HiddenHandle type="source" position={Position.Bottom} id="bottom" />
      <HiddenHandle type="source" position={Position.Right} id="projects" />

      <div className="px-6 pt-7 pb-2 md:px-9 md:pt-9">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          From first client to system design.
        </h2>
      </div>

      <ol className="px-6 pb-4 md:px-9 md:pb-6">
        {BUILD_LOG.map((entry, i) => {
          const isLast = i === BUILD_LOG.length - 1;
          return (
            <li key={entry.ID} className="relative grid grid-cols-[2.25rem_1fr] gap-x-4 md:gap-x-6">
              {/* Rail */}
              <div className="flex flex-col items-center pt-7">
                <span className="grid size-9 place-items-center border border-ui-primary font-mono text-xs text-ui-primary">
                  {String(BUILD_LOG.length - i).padStart(2, "0")}
                </span>
                {!isLast && <span className="w-px flex-1 border-l border-dashed border-line" />}
              </div>

              <article className={isLast ? "py-7" : "border-b border-line py-7"}>
                <p className="label-mono">{entry.PERIOD}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
                  {entry.TITLE}
                </h3>
                <p className="mt-1 text-sm text-muted">{entry.CONTEXT}</p>

                {entry.ROLES && (
                  <ul className="mt-4 space-y-1.5">
                    {entry.ROLES.map((role) => (
                      <li key={role.TITLE} className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
                        <span className="font-medium">{role.TITLE}</span>
                        <span className="font-mono text-[11px] text-muted">{role.PERIOD}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  {entry.SUMMARY}
                </p>

                <ul className="mt-4 space-y-2.5">
                  {entry.POINTS.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-[0.45em] size-1 shrink-0 bg-ui-primary" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {entry.STACK && (
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {entry.STACK.map((s) => (
                      <li key={s} className="chip">{s}</li>
                    ))}
                  </ul>
                )}

                {entry.PROJECT_REFS && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {entry.PROJECT_REFS.map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => openProject(id)}
                        className="nodrag group/ref inline-flex items-center gap-1.5 border border-ui-primary/50 px-2.5 py-1.5 font-mono text-[11px] text-ui-primary transition-colors hover:bg-ui-primary hover:text-on-primary"
                      >
                        {PROJECTS.find((p) => p.ID === id)?.TITLE}
                        <ArrowUpRight className="size-3 transition-transform group-hover/ref:translate-x-0.5 group-hover/ref:-translate-y-0.5" />
                      </button>
                    ))}
                  </div>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </Sheet>
  );
});
