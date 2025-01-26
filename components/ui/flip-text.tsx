import { cn } from "@/lib/utils";

interface FlipTextProps {
  preTransitionText: React.ReactNode;
  postTransitionText: React.ReactNode;
  srOnlyText: string;
  className?: string;
}

export const FlipText = ({
  preTransitionText,
  postTransitionText,
  srOnlyText,
  className
}: FlipTextProps) => {
  const renderFlipText = () => {
    return (
      <div aria-hidden="true" className="block overflow-hidden group relative">
        <span className="py-1 inline-block transition-all duration-300 ease-in-out group-hover:-translate-y-full">
          {preTransitionText}
        </span>
        <span className="py-1 inline-block absolute left-0 top-0 transition-all duration-300 ease-in-out translate-y-full group-hover:translate-y-0">
          {postTransitionText}
        </span>
      </div>
    );
  }

  const renderText = () => {
    return (
      <div>
        <span className="py-1 inline-block">
          {preTransitionText}
        </span>
      </div>
    )
  }

  return (
    <div className={
      cn(
        className
      )
    }>
      <span className="sr-only">{srOnlyText}</span>
      <div className="block md:hidden">{renderText()}</div>
      <div className="hidden md:block">{renderFlipText()}</div>
    </div>
  )
}
