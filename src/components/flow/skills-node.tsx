import { memo } from "react";
import { Position } from "@xyflow/react";

import { SKILLS } from "@/constants";
import { Sheet } from "@/components/ui/sheet";
import HiddenHandle from "@/components/ui/HiddenHandle";

const TOOL_COUNT = SKILLS.reduce((n, c) => n + c.LIST.length, 0);

export const SkillsNode = memo(function SkillsNode() {
  return (
    <Sheet
      index="05"
      label="Stack"
      meta={`${TOOL_COUNT} tools`}
      className="w-80 md:w-[44rem]"
    >
      <HiddenHandle type="target" position={Position.Top} />
      <HiddenHandle type="source" position={Position.Bottom} />

      <div className="px-6 pt-7 pb-6 md:px-9 md:pt-9">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          What I build with.
        </h2>
      </div>

      <dl className="border-t border-line">
        {SKILLS.map((category, i) => (
          <div
            key={category.TITLE}
            className="grid gap-3 border-b border-line px-6 py-5 last:border-0 md:grid-cols-[11rem_1fr] md:gap-6 md:px-9"
          >
            <dt className="label-mono flex items-center gap-3 md:pt-1.5">
              <span className="text-ui-primary">{String(i + 1).padStart(2, "0")}</span>
              {category.TITLE}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-1.5">
                {category.LIST.map((skill) => (
                  <li key={skill} className="chip px-2.5 py-1.5 text-xs">
                    {skill}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Sheet>
  );
});
