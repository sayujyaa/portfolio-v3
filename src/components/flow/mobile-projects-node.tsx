"use client";

import { memo } from "react";
import { Position } from "@xyflow/react";
import HiddenHandle from "@/components/ui/HiddenHandle";

export const MobileProjectsNode = memo(function MobileProjectsNode() {
  return (
    <div className="relative w-full h-full nodrag px-12 py-10 transition-all duration-700">
      {/* Very subtle background glow instead of a solid box */}
      <div className="absolute inset-0 opacity-10 pointer-events-none rounded-[4rem] bg-[radial-gradient(circle_at_50%_50%,var(--ui-primary)_0%,transparent_70%)]" />

      <HiddenHandle type="target" position={Position.Top} />
      <HiddenHandle type="source" position={Position.Bottom} />
    </div>
  );
});
