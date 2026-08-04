import { Loader2Icon } from "lucide-react";

import { cn } from "@/utils/utils";

function Loader({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px]">
      <div className="relative">
        <Loader2Icon
          role="status"
          aria-label="Loading"
          className={cn(
            "animate-spin text-primary size-8 stroke-[2.5]",
            className,
          )}
          {...props}
        />
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 size-8" />
      </div>
    </div>
  );
}

export { Loader };