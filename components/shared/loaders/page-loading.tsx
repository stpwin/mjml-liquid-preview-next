import * as React from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "../../ui/spinner"
import { VariantProps } from "class-variance-authority"

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  fullPage?: boolean
  spinnerSize?: VariantProps<typeof Spinner>["size"]
}

const PageLoading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, fullPage = true, spinnerSize = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center",
          fullPage && "fixed inset-0 bg-background/60 backdrop-blur-sm",
          className
        )}
        {...props}
      >
        <Spinner size={spinnerSize} className="bg-black dark:bg-white" />
      </div>
    )
  }
)

PageLoading.displayName = "PageLoading"

export { PageLoading } 