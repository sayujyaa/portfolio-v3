import { memo } from "react";
import Image from "next/image";
import { Position } from "@xyflow/react";
import { MoveDown } from "lucide-react";

import { PERSONAL_INFO } from "@/constants";
import { Sheet } from "@/components/ui/sheet";
import { StatusDot } from "@/components/ui/status-dot";
import HiddenHandle from "@/components/ui/HiddenHandle";
import myImage from "../../../public/myImage.jpg";

export const IntroNode = memo(function IntroNode() {
  return (
    <Sheet
      index="01"
      label="Hello"
      meta={
        <span className="flex items-center gap-2 text-ok">
          <StatusDot />
          {PERSONAL_INFO.STATUS}
        </span>
      }
      className="w-80 md:w-[34rem]"
    >
      <HiddenHandle type="source" position={Position.Bottom} />

      <div className="p-6 md:p-9">
        <div className="flex items-center gap-5 md:gap-7">
          <figure className="relative size-20 shrink-0 border border-line p-1 md:size-28">
            <Image
              src={myImage}
              alt={PERSONAL_INFO.FULL_NAME}
              placeholder="blur"
              sizes="112px"
              priority
              className="size-full object-cover grayscale-[0.2]"
            />
          </figure>
          <div className="min-w-0">
            <h1 className="text-3xl leading-[0.95] font-semibold tracking-tight md:text-5xl">
              {PERSONAL_INFO.FULL_NAME}
            </h1>
            <p className="mt-3 font-mono text-xs tracking-[0.12em] text-ui-primary uppercase">
              {PERSONAL_INFO.ROLE}
            </p>
          </div>
        </div>

        <p className="mt-7 text-[15px] leading-relaxed text-muted md:text-lg">
          {PERSONAL_INFO.TAGLINE}
        </p>

        <dl className="mt-7 grid grid-cols-3 divide-x divide-line border border-line">
          {PERSONAL_INFO.SPECS.map((spec) => (
            <div key={spec.LABEL} className="px-3 py-3 md:px-4">
              <dt className="label-mono text-[10px]">{spec.LABEL}</dt>
              <dd className="mt-2 text-sm leading-tight font-medium">
                {spec.VALUE}
              </dd>
            </div>
          ))}
        </dl>

        <p className="label-mono mt-7 flex items-center gap-2">
          <MoveDown className="size-3.5 text-ui-primary motion-safe:animate-bounce" />
          Pan down, or use the navigator
        </p>
      </div>
    </Sheet>
  );
});
