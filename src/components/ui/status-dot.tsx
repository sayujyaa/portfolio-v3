import { cn } from "@/lib/utils";

/** Small pulsing availability indicator. Inherits colour from text. */
export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex size-1.5", className)} aria-hidden>
      <span className="absolute inset-0 rounded-full bg-current opacity-60 motion-safe:animate-ping" />
      <span className="relative size-1.5 rounded-full bg-current" />
    </span>
  );
}
