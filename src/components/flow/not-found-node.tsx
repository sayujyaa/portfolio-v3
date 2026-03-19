"use client";

import { Position } from "@xyflow/react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import HiddenHandle from "../ui/HiddenHandle";

export function NotFoundNode() {
  return (
    <main className="relative p-1 rounded-[2.5rem] bg-linear-to-br from-red-500/20 to-transparent border border-red-500/10 shadow-[0_0_50px_rgba(239,68,68,0.1)] w-80 md:w-96 overflow-hidden">
      <HiddenHandle type="target" position={Position.Top} />
      <HiddenHandle type="source" position={Position.Bottom} />

      <div className="relative bg-background/80 backdrop-blur-3xl rounded-[2.3rem] p-8 text-center border border-white/5">
        <aside className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <span className="text-[12rem] font-black italic">404</span>
        </aside>

        <header className="relative z-10 mb-8 flex justify-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-4 rounded-full bg-red-500/10 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
          >
            <AlertCircle size={48} strokeWidth={1.5} />
          </motion.div>
        </header>

        <section className="relative z-10">
          <h1 className="text-4xl font-black tracking-tighter mb-4 uppercase italic">
            Connection <br />
            <span className="text-red-500">Severed</span>
          </h1>
          <p className="text-sm text-foreground/50 leading-relaxed font-medium mb-10 max-w-[80%] mx-auto">
            The node you&apos;re looking for was either de-indexed or moved to
            an encrypted sector.
          </p>

          <Link
            href="/"
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-foreground text-background font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-500 shadow-xl overflow-hidden"
          >
            <motion.div
              animate={{ x: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowLeft size={16} strokeWidth={3} />
            </motion.div>
            <span>Reconnect to Core</span>
          </Link>
        </section>

        <footer className="mt-8 flex justify-center gap-1.5 pointer-events-none opacity-20">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-red-500" />
          ))}
        </footer>
      </div>
    </main>
  );
}
