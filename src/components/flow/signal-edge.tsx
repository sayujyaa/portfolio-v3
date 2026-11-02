import { BaseEdge, EdgeProps, getSmoothStepPath } from "@xyflow/react";

/**
 * Orthogonal dashed connector, like a wiring diagram, with a single
 * accent "signal" travelling along it.
 */
export function SignalEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        style={{
          stroke: "var(--muted)",
          strokeOpacity: 0.45,
          strokeWidth: 1.25,
          strokeDasharray: "5 6",
        }}
      />
      <circle r={3.5} fill="var(--ui-primary)" className="motion-reduce:hidden">
        <animateMotion dur="5s" repeatCount="indefinite" path={path} />
      </circle>
    </>
  );
}
