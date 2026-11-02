"use client";

import { memo } from "react";
import { Position } from "@xyflow/react";
import { ArrowUpRight } from "lucide-react";

import { PROJECTS, projectCode, type Project } from "@/constants";
import { Sheet } from "@/components/ui/sheet";
import HiddenHandle from "@/components/ui/HiddenHandle";
import { useProjectStore } from "@/store/project-store";

const GROUPS: { KIND: Project["KIND"]; LABEL: string }[] = [
  { KIND: "Client", LABEL: "Client work" },
  { KIND: "Personal", LABEL: "Personal projects" },
];

/** Compact index of every project; details open in the ProjectPanel. */
export const WorkIndexNode = memo(function WorkIndexNode() {
  const open = useProjectStore((s) => s.open);

  return (
    <Sheet
      index="04"
      label="Selected work"
      meta={`${PROJECTS.length} projects`}
      className="w-80 md:w-[34rem]"
    >
      <HiddenHandle type="target" position={Position.Left} id="left" />
      <HiddenHandle type="target" position={Position.Top} id="top" />
      <HiddenHandle type="source" position={Position.Bottom} />

      <div className="px-6 pt-7 pb-6 md:px-9 md:pt-9">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Things I&apos;ve shipped.
        </h2>
        <p className="mt-2 text-sm text-muted">
          Pick one to open the full write-up.
        </p>
      </div>

      {GROUPS.map((group) => (
        <section key={group.KIND} className="border-t border-line">
          <p className="label-mono px-6 pt-5 pb-1 md:px-9">{group.LABEL}</p>
          <ul>
            {PROJECTS.filter((p) => p.KIND === group.KIND).map((p) => (
              <li key={p.ID}>
                <button
                  type="button"
                  onClick={() => open(p.ID)}
                  className="nodrag group grid w-full grid-cols-[1fr_auto] items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-foreground/[0.04] md:px-9"
                >
                  <span className="min-w-0">
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] text-ui-primary">
                        {projectCode(p.ID)}
                      </span>
                      <span className="truncate text-lg font-semibold tracking-tight transition-colors group-hover:text-ui-primary">
                        {p.TITLE}
                      </span>
                    </span>
                    <span className="mt-1 block truncate pl-9 text-sm text-muted">
                      {p.SUMMARY}
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-muted">{p.YEAR}</span>
                    <ArrowUpRight className="size-4 text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ui-primary" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <div className="h-3" />
    </Sheet>
  );
});
