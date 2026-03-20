"use client";

import { memo } from "react";
import { Position } from "@xyflow/react";
import { Bot, Cpu, Database, Layers, Server, Code2 } from "lucide-react";
import { SKILLS } from "@/constants";
import HiddenHandle from "@/components/ui/HiddenHandle";

const ICONS: Record<string, React.ElementType> = {
  "Client Side": Layers,
  "Server Side": Server,
  Database: Database,
  "AI & Tooling": Bot,
};

export const MobileSkillsNode = memo(function MobileSkillsNode() {
  return (
    <section className="relative w-80 rounded-[2rem] border border-ui-primary/20 bg-background p-6 shadow-lg nodrag">
      <HiddenHandle type="target" position={Position.Top} />
      <HiddenHandle type="source" position={Position.Bottom} />

      <header className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-ui-primary/10 p-2 text-ui-primary">
          <Cpu size={18} />
        </div>
        <h3 className="text-2xl font-black tracking-tight">Tech Stack</h3>
      </header>

      <div className="space-y-4">
        {SKILLS.CATEGORIES.map((category) => {
          const Icon = ICONS[category.TITLE] || Code2;
          return (
          <article key={category.TITLE}>
            <p className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-foreground/60">
              <Icon size={14} className="text-ui-primary" />
              {category.TITLE}
            </p>
            <ul className="flex flex-wrap gap-2">
              {category.LIST.map((skill) => (
                <li
                  key={skill}
                  className="rounded-xl border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-sm font-bold"
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
