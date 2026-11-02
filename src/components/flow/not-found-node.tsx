import { memo } from "react";
import Link from "next/link";
import { Position } from "@xyflow/react";
import { ArrowLeft } from "lucide-react";

import { Sheet } from "@/components/ui/sheet";
import HiddenHandle from "@/components/ui/HiddenHandle";

export const NotFoundNode = memo(function NotFoundNode() {
  return (
    <Sheet index="404" label="Not found" meta="No such node" className="w-80 md:w-96">
      <HiddenHandle type="source" position={Position.Right} />
      <HiddenHandle type="source" position={Position.Left} id="left" />

      <div className="p-6 md:p-8">
        <p className="font-mono text-7xl font-medium tracking-tight text-ui-primary">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          This page isn&apos;t on the map.
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          The link may be old, or the page has moved. Head back to the start
          and take a look around from there.
        </p>
        <Link
          href="/"
          className="group mt-7 inline-flex items-center gap-2 border border-ui-primary bg-ui-primary px-4 py-2.5 font-mono text-xs tracking-[0.08em] text-on-primary uppercase transition-colors hover:bg-transparent hover:text-ui-primary"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to start
        </Link>
      </div>
    </Sheet>
  );
});
