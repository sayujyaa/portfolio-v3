import { memo } from "react";
import { Position, useReactFlow } from "@xyflow/react";
import { ArrowRight, ArrowLeft, Github, Link2 } from "lucide-react";
import { VIEW_CONFIG } from "@/constants";
import HiddenHandle from "../ui/HiddenHandle";

interface ProjectData {
  title: string;
  description: string;
  link?: string;
  github?: string;
  year: string;
  tags: string[];
  nextId?: string;
  prevId?: string;
}

export const ProjectCardNode = memo(function ProjectCardNode({ data }: { data: ProjectData }) {
  const { fitView } = useReactFlow();

  const handleSwitch = (targetId?: string) => {
    if (targetId) {
      fitView({
        nodes: [{ id: targetId }],
        padding: VIEW_CONFIG.PADDING.DESKTOP,
        duration: 1000,
      });
    }
  };

  return (
    <main className="relative group p-1 rounded-[1.5rem] md:rounded-[2rem] bg-linear-to-br from-foreground/10 to-transparent hover:from-ui-primary/40 hover:to-ui-primary/10 transition-all duration-700 w-80 md:w-96 overflow-hidden">
      <HiddenHandle type="target" position={Position.Left} />
      <HiddenHandle type="source" position={Position.Right} />
      <HiddenHandle type="target" position={Position.Top} id="top" />
      <HiddenHandle type="source" position={Position.Bottom} id="bottom" />

      <div className="relative bg-background md:bg-background/90 md:backdrop-blur-3xl rounded-[1.8rem] p-6 md:p-8 h-full flex flex-col justify-between border border-foreground/5 shadow-xl md:shadow-2xl">
        <section className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
          <span className="text-8xl font-black">{data.year.slice(-2)}</span>
        </section>

        <section>
          <header className="mb-6">
            <span className="px-3 py-1 rounded-full bg-ui-primary/10 text-ui-primary text-[10px] font-black uppercase tracking-widest">
              Project
            </span>
          </header>

          <h3 className="text-3xl font-black tracking-tighter mb-4 group-hover:text-ui-primary transition-colors">
            {data.title}
          </h3>
          <p className="text-sm text-foreground/60 leading-relaxed font-medium line-clamp-3 mb-6">
            {data.description}
          </p>

          <article className="flex flex-col gap-3 relative z-20">
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 hover:text-ui-primary transition-all no-underline"
              >
                <div className="w-5 h-px bg-foreground/20 group-hover/link:bg-ui-primary group-hover/link:w-8 transition-all" />
                <Github
                  size={12}
                  strokeWidth={3}
                  className="opacity-40 group-hover/link:opacity-100 transition-opacity"
                />
                <span>GitHub Repository</span>
              </a>
            )}
            <a
              href={data.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 hover:text-ui-primary transition-all no-underline"
            >
              <div className="w-5 h-px bg-foreground/20 group-hover/link:bg-ui-primary group-hover/link:w-8 transition-all" />
              <Link2
                size={12}
                strokeWidth={3}
                className="opacity-40 group-hover/link:opacity-100 transition-opacity"
              />
              <span>Launch Live Site</span>
            </a>
          </article>
        </section>

        <footer className="mt-8 flex justify-between items-end">
          <ul className="flex flex-wrap gap-2 max-w-[70%]">
            {data.tags.map((tag) => (
              <li
                key={tag}
                className="text-[9px] font-black uppercase tracking-wide opacity-40 group-hover:opacity-100 transition-opacity"
              >
                #{tag}
              </li>
            ))}
          </ul>

          <div className="flex gap-1.5 translate-y-1">
            <button
              onClick={() => handleSwitch(data.prevId)}
              className="p-2.5 rounded-2xl bg-foreground/5 text-foreground/40 hover:bg-ui-primary hover:text-background transition-all duration-500 flex items-center justify-center border border-white/5"
              title="Previous Project"
            >
              <ArrowLeft size={16} strokeWidth={3} />
            </button>

            <button
              onClick={() => handleSwitch(data.nextId)}
              className="p-2.5 rounded-2xl bg-ui-primary text-background hover:scale-110 transition-all duration-500 flex items-center justify-center shadow-lg shadow-ui-primary/20"
              title="Next Project"
            >
              <ArrowRight size={16} strokeWidth={3} />
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
});
