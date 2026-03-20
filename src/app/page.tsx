import { FlowCanvas } from "@/components/flow-canvas";
import { headers } from "next/headers";
import { getFlowData } from "@/lib/flow-utils";

export default async function Portfolio() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);
  
  const { nodes, edges } = getFlowData(isMobile);

  return (
    <main className="w-full h-screen bg-background text-foreground overflow-hidden selection:bg-ui-primary selection:text-background">
      <FlowCanvas initialNodes={nodes} initialEdges={edges} />
    </main>
  );
}
