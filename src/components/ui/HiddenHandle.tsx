import { cn } from "@/lib/utils";
import { Handle, HandleProps } from "@xyflow/react";

type HiddenHandleProps = HandleProps;

const HiddenHandle = ({ className, ...props }: HiddenHandleProps) => {
  return <Handle className={cn("opacity-0 w-0 h-0", className)} {...props} />;
};
export default HiddenHandle;
