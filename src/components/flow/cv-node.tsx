import { Handle, Position } from "@xyflow/react";
import { Download } from "lucide-react";
import { PERSONAL_INFO } from "@/constants";

export function CVNode() {
  return (
    <aside className="group relative px-6 md:px-8 py-5 md:py-6 rounded-[1.5rem] md:rounded-[2rem] backdrop-blur-3xl bg-ui-primary/5 border border-ui-primary/20 shadow-[0_20px_50px_-15px_var(--ui-primary)]/20 w-72 md:w-64 cursor-pointer hover:bg-ui-primary/10 transition-all duration-700 hover:-translate-y-2 overflow-hidden">
      {/* Holographic light streak */}
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-ui-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

      <Handle type="target" position={Position.Top} className="opacity-0 w-0 h-0" />

      <div className="relative z-10 flex flex-col gap-6">
        <header className="flex justify-between items-start">
          <div className="p-3 rounded-2xl bg-ui-primary/10 text-ui-primary group-hover:rotate-12 transition-transform duration-500">
            <Download size={24} strokeWidth={3} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ui-primary opacity-50 px-3 py-1 rounded-full border border-ui-primary/20">
            {PERSONAL_INFO.CV_VERSION}
          </span>
        </header>

        <section>
          <h3 className="text-xl font-black tracking-tighter text-ui-primary mb-1 uppercase">
            Curriculum Vitae
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-ui-primary animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
              {PERSONAL_INFO.CV_SUBTITLE}
            </p>
          </div>
        </section>
      </div>

      <Handle type="source" position={Position.Bottom} className="opacity-0 w-0 h-0" />
    </aside>
  );
}
