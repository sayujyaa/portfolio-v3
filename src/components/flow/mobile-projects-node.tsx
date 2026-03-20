"use client";

import { memo } from "react";
import { Position } from "@xyflow/react";
import HiddenHandle from "@/components/ui/HiddenHandle";

export const MobileProjectsNode = memo(function MobileProjectsNode() {
  return (
    <div className="relative w-full h-full nodrag px-12 py-10 transition-all duration-700">
      <HiddenHandle type="target" position={Position.Top} />
      <HiddenHandle type="source" position={Position.Bottom} />
    </div>
  );
});
