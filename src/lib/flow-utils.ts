import { Edge, Node } from "@xyflow/react";
import {
  INITIAL_NODES,
  INITIAL_EDGES,
  NODE_TYPES as TYPE,
} from "@/constants/flow";

export interface FlowData {
  nodes: Node[];
  edges: Edge[];
}

export function getFlowData(isMobile: boolean): FlowData {
  if (!isMobile) {
    return { nodes: INITIAL_NODES, edges: INITIAL_EDGES };
  }

  // Same logic as was previously in useEffect
  const nds = [...INITIAL_NODES];
  const projectNodes = nds.filter((n) => n.type === TYPE.PROJECT_CARD);
  const otherNodes = nds.filter((n) => n.type !== TYPE.PROJECT_CARD);

  const cardWidth = 320;
  const cardGap = 80;
  const containerPaddingX = 60;
  const containerHeight = 600;
  const numProjects = projectNodes.length;
  const totalWidthNeeded =
    containerPaddingX * 2 +
    numProjects * cardWidth +
    (numProjects - 1) * cardGap;

  let preY = 0;
  const preTypes: string[] = [TYPE.INTRO, TYPE.CV, TYPE.EXPERIENCE];

  // Position nodes before projects in a subtle zig-zag (mobile only)
  const preTypeOffsets: Record<string, number> = {
    [TYPE.INTRO]: -40,
    [TYPE.CV]: 60,
    [TYPE.EXPERIENCE]: -80,
  };
  const updatedOtherNodesPre = otherNodes.map((n) => {
    if (preTypes.includes(n.type as string)) {
      const newNode = {
        ...n,
        position: { x: preTypeOffsets[n.type as string] ?? 0, y: preY },
      };
      let h = 550; // Decreased further
      if (n.type === TYPE.INTRO) h = 820;
      if (n.type === TYPE.CV) h = 280;
      if (n.type === TYPE.EXPERIENCE) h = 900; // Corrected height to match component better
      preY += h;
      return newNode;
    }
    return n;
  });

  const containerY = preY - 40; // Add a bit more gap after journey before projects
  const containerNode: Node = {
    id: "projects-container",
    type: TYPE.MOBILE_PROJECTS,
    position: { x: -80, y: containerY },
    data: {},
    style: { width: totalWidthNeeded, height: containerHeight },
  };

  // Keep projects fully horizontal in mobile container
  const updatedProjects = projectNodes.map((n, i) => ({
    ...n,
    parentId: "projects-container",
    position: {
      x: containerPaddingX + i * (cardWidth + cardGap),
      y: 40,
    },
    extent: "parent" as const,
  }));

  let postY = containerY + containerHeight + 90; // Tighter spacing after projects
  // Position nodes after projects
  const finalNodes = updatedOtherNodesPre.map((n) => {
    if (!preTypes.includes(n.type as string)) {
      if (n.type === TYPE.CONTACT) postY += 80; // Push contact a bit down on mobile
      const xOffset = n.type === TYPE.SKILLS ? 70 : -60;
      const isSkillsNode = n.type === TYPE.SKILLS;
      const newNode = {
        ...n,
        type: isSkillsNode ? TYPE.MOBILE_SKILLS : n.type,
        position: { x: xOffset, y: postY },
      };
      let h = 800; // Restored to 800
      if (n.type === TYPE.SKILLS) h = 700; // Significantly reduce skills-to-contact spacing
      if (n.type === TYPE.CONTACT) h = 400; // Restored to 400
      postY += h;
      return newNode;
    }
    return n;
  });

  const nodes = [...finalNodes, containerNode, ...updatedProjects];

  const edges = INITIAL_EDGES.map((e) => {
    // Experience to first project
    if (e.id === "e-project-0") {
      return { ...e, sourceHandle: "bottom", targetHandle: "top" };
    }
    // Chain between projects
    if (e.id.startsWith("e-project-")) {
      return { ...e, sourceHandle: "right", targetHandle: "left" };
    }
    // Last project to skills
    if (e.id === "e-last-project-skills") {
      return { ...e, sourceHandle: "bottom", targetHandle: "top" };
    }
    return e;
  });

  return { nodes, edges };
}
