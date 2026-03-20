import { EdgeProps, getBezierPath } from "@xyflow/react";

export function PulsatingEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      {/* The Moving Dots Track */}
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke="var(--ui-primary)"
        strokeWidth={6}
        strokeLinecap="round"
        className="moving-dots"
        style={style}
        markerEnd={markerEnd}
      />

      <style jsx>{`
        .moving-dots {
          stroke-dasharray: 0 40;
          animation: march 4s linear infinite;
          filter: drop-shadow(0 0 10px var(--ui-primary)) drop-shadow(0 0 2px #fff);
        }

        @media (max-width: 768px) {
          .moving-dots {
            filter: none;
          }
        }

        @keyframes march {
          from {
            stroke-dashoffset: 80;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </>
  );
}





