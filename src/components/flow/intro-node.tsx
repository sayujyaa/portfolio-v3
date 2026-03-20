"use client";

import { useCallback } from "react";
import { Position, useNodeId, useReactFlow } from "@xyflow/react";
import Image from "next/image";
import { Caveat } from "next/font/google";
import { ChevronDown, Circle } from "lucide-react";
import { PERSONAL_INFO } from "@/constants";
import { cn } from "@/lib/utils";

import myImage from "../../../public/myImage.jpg";
import HiddenHandle from "../ui/HiddenHandle";

const paintedFont = Caveat({
  subsets: ["latin"],
  weight: "700",
});

export function IntroNode() {
  const { fitBounds, getNodesBounds } = useReactFlow();
  const nodeId = useNodeId();

  const focusCard = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      window.setTimeout(() => {
        const id = nodeId ?? "intro-1";
        const b = getNodesBounds([id]);
        const mobile = window.innerWidth < 768;
        const trim = mobile
          ? { L: 16, R: 64, T: 48, B: 56 }
          : { L: 20, R: 80, T: 56, B: 60 };

        const tight = {
          x: b.x + trim.L,
          y: b.y + trim.T,
          width: Math.max(120, b.width - trim.L - trim.R),
          height: Math.max(120, b.height - trim.T - trim.B),
        };

        void fitBounds(tight, { padding: 0.08, duration: 800 });
      }, 50);
    },
    [fitBounds, getNodesBounds, nodeId],
  );

  return (
    <section
      className="relative px-6 md:px-12 py-8 md:py-16 rounded-[3rem] backdrop-blur-xl md:backdrop-blur-3xl bg-background/80 md:bg-background/20 border border-foreground/10 shadow-lg md:shadow-[0_0_100px_-20px_var(--ui-primary)]/20 w-80 md:w-115 max-w-lg text-center transition-all duration-700 group hover:shadow-[0_0_120px_-10px_var(--ui-primary)]/40 overflow-visible nodrag cursor-pointer"
      onClick={focusCard}
    >
      {/* Animated Mesh Aura Background */}
      <figure className="absolute inset-4 -z-10 overflow-hidden rounded-[2.5rem] opacity-30 group-hover:opacity-50 transition-opacity duration-1000">
        <span className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-[aura_15s_linear_infinite] bg-[radial-gradient(circle_at_center,var(--ui-primary)_0%,transparent_50%),radial-gradient(circle_at_30%_30%,var(--ui-tail)_0%,transparent_40%),radial-gradient(circle_at_70%_70%,var(--ui-primary)_0%,transparent_40%)] blur-3xl opacity-40 will-change-transform" />
      </figure>

      {/* Floating Geometric Embellishments */}
      <aside className="absolute -top-6 -left-6 w-12 h-12 flex items-center justify-center opacity-20 animate-[float_4s_ease-in-out_infinite] group-hover:opacity-100 transition-opacity pointer-events-none">
        <span className="w-1 h-8 bg-ui-primary rounded-full rotate-45" />
        <span className="w-1 h-8 bg-ui-primary rounded-full -rotate-45 absolute" />
      </aside>

      <span className="absolute -bottom-8 -right-8 w-16 h-16 rounded-full border-2 border-dashed border-ui-primary/30 animate-[spin_8s_linear_infinite] opacity-50 pointer-events-none" />

      {/* Status Badge */}
      <p className="absolute flex items-center gap-2 -top-4 -right-4 px-5 py-2 rounded-2xl bg-ui-primary text-background text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-ui-primary/40 rotate-6 group-hover:rotate-0 transition-transform duration-700 z-50 not-italic">
        <PERSONAL_INFO.STATUS.ICON className="size-6" />
        {PERSONAL_INFO.STATUS.LABEL}
      </p>

      <HiddenHandle type="source" position={Position.Bottom} />

      {/* Profile Image */}
      <figure className="relative mx-auto w-48 h-48 mb-8 group-hover:scale-105 transition-transform duration-1000">
        <div className="absolute inset-0 rounded-full border-2 border-ui-primary opacity-20 scale-110 animate-[pulse_3s_ease-in-out_infinite]" />
        <div className="absolute inset-0 rounded-full border-2 border-ui-primary/10 scale-125 animate-[pulse_4s_ease-in-out_infinite_1s]" />
        <section className="w-full h-full rounded-full overflow-hidden border-4 border-background shadow-[0_0_50px_-10px_var(--ui-primary)]/40 relative z-10 transition-shadow duration-1000 group-hover:shadow-[0_0_80px_0_var(--ui-primary)]/60">
          <Image
            src={myImage}
            alt={PERSONAL_INFO.NAME}
            placeholder="blur"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          />
        </section>
      </figure>

      <header className="relative z-10">
        <h1
          className={cn(
            paintedFont.className,
            "text-8xl md:text-9xl font-black bg-clip-text text-transparent bg-linear-to-b from-ui-primary via-foreground to-foreground/70 tracking-tighter leading-none pb-2 mb-4 transform -rotate-1 group-hover:rotate-0 transition-transform duration-1000 drop-shadow-2xl",
          )}
        >
          Hello, I&apos;m {PERSONAL_INFO.NAME}.
        </h1>

        <p className="text-sm text-foreground/40 font-black uppercase tracking-[1em] mb-8 group-hover:tracking-[1.2em] transition-all duration-1000 scale-90 md:scale-100">
          {PERSONAL_INFO.ROLE}
        </p>

        <section className="flex items-center justify-center gap-10 pt-8 border-t border-foreground/5 mb-10 relative overflow-hidden">
          <article className="flex flex-col gap-1 items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">
              Located in
            </span>
            <span className="text-base font-black opacity-80 uppercase tracking-tighter">
              {PERSONAL_INFO.LOCATION}
            </span>
          </article>
          <Circle className="size-2 text-ui-primary/40 fill-ui-primary/40" />
          <article className="flex flex-col gap-1 items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">
              Building for
            </span>
            <span className="text-base font-black opacity-80 uppercase tracking-tighter">
              {PERSONAL_INFO.EXPERIENCE_YEARS}
            </span>
          </article>
        </section>
      </header>

      {/* Side-Sticking Scroll Tab */}
      <aside className="absolute top-1/2 -right-12 -translate-y-1/2 flex items-center group/scroll cursor-pointer select-none">
        <div className="h-42 w-12 rounded-r-[2.5rem] border-2 border-l-0 border-ui-primary/40 bg-ui-primary/5 backdrop-blur-3xl flex flex-col items-center justify-center gap-3 pr-2 shadow-2xl transition-all duration-700 group-hover/scroll:bg-ui-primary/20 group-hover/scroll:pr-4">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180 opacity-40">
            Explore
          </span>
          <div className="animate-[bounce-y_2s_infinite]">
            <ChevronDown className="text-ui-primary size-4" />
          </div>
        </div>
      </aside>

      <style jsx>{`
        @keyframes aura {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        @keyframes bounce-y {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }
      `}</style>
    </section>
  );
}
