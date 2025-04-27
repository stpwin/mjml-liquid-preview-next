import { cn } from "@/lib/utils";
import Link from "next/link";

export interface HoverLinkProps {
  title: string;
  href: string;
  fontSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-4xl' | 'text-5xl' | 'text-6xl' | 'text-7xl' | 'text-8xl' | 'text-9xl';
  arrowDirection?: 'forward' | 'back';
  className?: string;
}

export default function HoverLink({ title, href, fontSize = 'text-base', arrowDirection = 'forward', className = '' }: HoverLinkProps) {
  const underlineClass = arrowDirection === 'back' 
    ? "relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current after:scale-x-0 after:origin-left group-hover:after:scale-x-100 after:transition-transform after:duration-300 group-hover:after:origin-right"
    : "relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current after:scale-x-0 after:origin-right group-hover:after:scale-x-100 after:transition-transform after:duration-300 group-hover:after:origin-left";

  const renderBackArrow = () => {
    return (
      <span className="inline-block transition-transform duration-700 ease-in-out group-hover:-translate-x-1 group-hover:duration-300">
        ←
      </span>
    )
  }

  const renderForwardArrow = () => {
    return (
      <span className="inline-block transition-transform duration-700 ease-in-out group-hover:translate-x-1 group-hover:duration-300">
        →
      </span>
    )
  }

  return (
    <Link 
      href={href}
      className={cn(
        "font-sans group flex items-center space-x-2 hover:text-primary transition-colors duration-200 text-right",
        fontSize,
        className
      )}
    >
      {arrowDirection === 'back' && renderBackArrow()}
      <span className={cn(underlineClass)}>{title}</span>
      {arrowDirection === 'forward' && renderForwardArrow()}
    </Link>
  )
}