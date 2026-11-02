import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SheetProps {
  /** Section number shown in the title block, e.g. "03". */
  index?: string;
  label: string;
  meta?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * The base "spec sheet" every canvas node is drawn on: a hairline frame,
 * accent registration corners and a mono title block.
 */
export function Sheet({ index, label, meta, className, children }: SheetProps) {
  return (
    <div
      className={cn(
        "relative border border-line bg-surface text-foreground shadow-[0_24px_60px_-30px_rgb(0_0_0/0.45)]",
        className,
      )}
    >
      <CornerMarks />
      <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
        <span className="label-mono">
          {index && <span className="text-ui-primary">{index} / </span>}
          {label}
        </span>
        {meta && <span className="label-mono">{meta}</span>}
      </header>
      {children}
    </div>
  );
}

function CornerMarks() {
  const base = "pointer-events-none absolute size-2.5 border-ui-primary";
  return (
    <>
      <span aria-hidden className={cn(base, "-left-px -top-px border-l border-t")} />
      <span aria-hidden className={cn(base, "-right-px -top-px border-r border-t")} />
      <span aria-hidden className={cn(base, "-bottom-px -left-px border-b border-l")} />
      <span aria-hidden className={cn(base, "-bottom-px -right-px border-b border-r")} />
    </>
  );
}
