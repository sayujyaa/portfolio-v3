"use client";

import { memo } from "react";
import { Position } from "@xyflow/react";
import { Bot, Braces, Cpu, Database, Layers, Server } from "lucide-react";
import { SKILLS } from "@/constants";
import HiddenHandle from "@/components/ui/HiddenHandle";

const ICONS: Record<string, React.ElementType> = {
  "Client Side": Layers,
  "Server Side": Server,
  Database: Database,
  "AI & Tooling": Bot,
  "Version Control": Braces,
};

export const MobileSkillsNode = memo(function MobileSkillsNode() {
  return (
    <section className="relative w-80 rounded-[2rem] border border-foreground/15 bg-background p-5 shadow-xl nodrag">
      <HiddenHandle type="target" position={Position.Top} />
      <HiddenHandle type="source" position={Position.Bottom} />

      <header className="mb-5 rounded-2xl border border-ui-primary/25 bg-ui-primary/8 px-3.5 py-3">
        <div className="mb-2 flex items-center gap-2 text-ui-primary">
          <Cpu size={16} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Core Toolkit
          </span>
        </div>
        <h3 className="text-2xl font-black tracking-tight">Tech Stack</h3>
      </header>

      <div className="space-y-3.5">
        {SKILLS.CATEGORIES.map((category, idx) => {
          const Icon = ICONS[category.TITLE] || Braces;
          return (
            <article
              key={category.TITLE}
              className="rounded-2xl border border-foreground/10 bg-foreground/5 px-3 py-3"
            >
              <p className="mb-2.5 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-foreground/70">
                <span className="rounded-md border border-ui-primary/20 bg-ui-primary/10 p-1 text-ui-primary">
                  <Icon size={12} />
                </span>
                {category.TITLE}
                <span className="ml-auto text-[10px] tracking-normal opacity-45">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </p>
              <ul className="flex flex-wrap gap-2">
                {category.LIST.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-foreground/10 bg-background px-2.5 py-1.5 text-[13px] font-semibold leading-none"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
});
