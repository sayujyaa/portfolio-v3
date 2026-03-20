import { FlowCanvas } from "@/components/flow-canvas";

export default function Portfolio() {
  return (
    <main className="w-full h-screen bg-background text-foreground overflow-hidden selection:bg-ui-primary selection:text-background">
      <FlowCanvas />
    </main>
  );
}
