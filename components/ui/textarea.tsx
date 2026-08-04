import * as React from "react";

import { cn } from "@/utils/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-20 w-full rounded-lg border border-input/80 bg-card px-3 py-2 text-sm shadow-xs transition-all duration-150 outline-none selection:bg-primary/20 selection:text-primary placeholder:text-muted-foreground/60 disabled:cursor-not-allowed disabled:opacity-50",
        "focus:border-primary focus:ring-[3px] focus:ring-primary/10",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
