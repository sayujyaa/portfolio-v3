import { memo } from "react";
import { Position } from "@xyflow/react";
import { ArrowUpRight } from "lucide-react";

import { PERSONAL_INFO, SOCIALS } from "@/constants";
import { Sheet } from "@/components/ui/sheet";
import { StatusDot } from "@/components/ui/status-dot";
import HiddenHandle from "@/components/ui/HiddenHandle";

export const ContactNode = memo(function ContactNode() {
  return (
    <Sheet
      index="06"
      label="Contact"
      meta={
        <span className="flex items-center gap-2 text-ok">
          <StatusDot />
          {PERSONAL_INFO.STATUS}
        </span>
      }
      className="w-80 md:w-[30rem]"
    >
      <HiddenHandle type="target" position={Position.Top} />

      <div className="p-6 md:p-9">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Let&apos;s build something.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          {PERSONAL_INFO.CONTACT_SUBTITLE}
        </p>

        <a
          href={`mailto:${PERSONAL_INFO.EMAIL}`}
          className="nodrag group mt-7 flex items-center justify-between gap-3 border border-ui-primary bg-ui-primary px-4 py-3.5 text-on-primary transition-colors hover:bg-transparent hover:text-ui-primary"
        >
          <span className="truncate font-mono text-sm">{PERSONAL_INFO.EMAIL}</span>
          <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        <ul className="mt-4 divide-y divide-line border-y border-line">
          {SOCIALS.filter((s) => s.LABEL !== "Email").map(
            ({ LABEL, HANDLE, ICON: Icon, HREF }) => (
              <li key={LABEL}>
                <a
                  href={HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nodrag group flex items-center gap-3 py-3 text-sm transition-colors hover:text-ui-primary"
                >
                  <Icon className="size-4 text-muted group-hover:text-ui-primary" />
                  <span className="font-medium">{LABEL}</span>
                  <span className="ml-auto font-mono text-[11px] text-muted">
                    {HANDLE}
                  </span>
                  <ArrowUpRight className="size-3.5 text-muted group-hover:text-ui-primary" />
                </a>
              </li>
            ),
          )}
        </ul>

        <p className="label-mono mt-8">{PERSONAL_INFO.COPYRIGHT}</p>
      </div>
    </Sheet>
  );
});
