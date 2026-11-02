import { memo } from "react";
import { Position } from "@xyflow/react";
import { ArrowDownToLine, FileText } from "lucide-react";

import { PERSONAL_INFO } from "@/constants";
import { Sheet } from "@/components/ui/sheet";
import HiddenHandle from "@/components/ui/HiddenHandle";

export const CVNode = memo(function CVNode() {
  return (
    <Sheet index="02" label="Résumé" meta="PDF" className="group w-72">
      <HiddenHandle type="target" position={Position.Top} />
      <HiddenHandle type="source" position={Position.Bottom} />

      <a
        href={PERSONAL_INFO.CV_LINK}
        download={PERSONAL_INFO.CV_FILENAME}
        className="flex items-center gap-4 p-5 transition-colors hover:bg-foreground/[0.04]"
      >
        <FileText className="size-8 shrink-0 text-ui-primary" strokeWidth={1.5} />
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">Download CV</span>
          <span className="mt-1 block truncate font-mono text-[11px] text-muted">
            {PERSONAL_INFO.CV_FILENAME}
          </span>
        </span>
        <ArrowDownToLine className="size-4 text-muted transition-transform group-hover:translate-y-0.5 group-hover:text-ui-primary" />
      </a>
    </Sheet>
  );
});
