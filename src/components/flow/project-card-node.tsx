import { Handle, Position } from "@xyflow/react";
import { ArrowUpRight, Github } from "lucide-react";

interface ProjectData {
  title: string;
  description: string;
  link?: string;
  github?: string;
  year: string;
  tags: string[];
}

export function ProjectCardNode({ data }: { data: ProjectData }) {
  return (
    <article className="relative group p-1 rounded-[1.5rem] md:rounded-[2rem] bg-linear-to-br from-foreground/10 to-transparent hover:from-ui-primary/40 hover:to-ui-primary/10 transition-all duration-700 w-80 md:w-96 overflow-hidden">
      <Handle type="target" position={Position.Left} className="opacity-0 w-0 h-0" />
      <Handle type="source" position={Position.Right} className="opacity-0 w-0 h-0" />

      <section className="relative bg-background/90 backdrop-blur-3xl rounded-[1.8rem] p-6 md:p-8 h-full flex flex-col justify-between border border-foreground/5 shadow-2xl">
        <aside className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
          <span className="text-8xl font-black">{data.year.slice(-2)}</span>
        </aside>

        <div>
          <header className="flex justify-between items-start mb-6">
            <span className="px-3 py-1 rounded-full bg-ui-primary/10 text-ui-primary text-[10px] font-black uppercase tracking-widest">
              Project
            </span>
          </header>

          <h3 className="text-3xl font-black tracking-tighter mb-4 group-hover:text-ui-primary transition-colors">
            {data.title}
          </h3>
          <p className="text-sm text-foreground/60 leading-relaxed font-medium line-clamp-3">
            {data.description}
          </p>
        </div>

        <footer className="mt-8 flex justify-between items-end">
          <ul className="flex flex-wrap gap-2 max-w-[70%]">
            {data.tags.map((tag) => (
              <li key={tag} className="text-[9px] font-black uppercase tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity">
                #{tag}
              </li>
            ))}
          </ul>

          <div className="flex gap-1.5 translate-y-1">
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-2xl bg-foreground/5 text-foreground/40 hover:bg-ui-primary hover:text-background transition-all duration-500 flex items-center justify-center"
              >
                <Github size={16} strokeWidth={3} />
              </a>
            )}
            <a
              href={data.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-2xl bg-foreground/5 text-foreground/40 hover:bg-ui-primary hover:text-background transition-all duration-500 flex items-center justify-center"
            >
              <ArrowUpRight size={16} strokeWidth={3} />
            </a>
          </div>
        </footer>
      </section>
    </article>
  );
}
