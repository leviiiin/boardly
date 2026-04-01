import { Loader2Icon } from "lucide-react"

import { cn } from "@/utils/utils"

function Loader({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("animate-spin text-green-600 size-16 absolute top-[50%] left-[50%] translate-[-50%]", className)}
      {...props}
    />
  )
}

export { Loader }
