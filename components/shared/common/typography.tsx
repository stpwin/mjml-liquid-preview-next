import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export function H1({ className, children, ...props }: TypographyProps) {
  return (
    <h1 
      className={cn("scroll-m-20 font-sans text-3xl font-bold tracking-tight mt-6 mb-4", className)} 
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({ className, children, ...props }: TypographyProps) {
  return (
    <h2 
      className={cn("scroll-m-20 font-sans text-2xl font-semibold tracking-tight mt-8 mb-4", className)} 
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({ className, children, ...props }: TypographyProps) {
  return (
    <h3 
      className={cn("scroll-m-20 font-sans text-xl font-semibold tracking-tight mt-6 mb-3", className)} 
      {...props}
    >
      {children}
    </h3>
  );
}

export function H4({ className, children, ...props }: TypographyProps) {
  return (
    <h4 
      className={cn("scroll-m-20 font-sans text-lg font-semibold tracking-tight mt-4 mb-2", className)} 
      {...props}
    >
      {children}
    </h4>
  );
}

export function P({ className, children, ...props }: TypographyProps) {
  return (
    <p 
      className={cn("leading-7 text-md font-serif [&:not(:first-child)]:mt-4", className)} 
      {...props}
    >
      {children}
    </p>
  );
}

export function UL({ className, children, ...props }: TypographyProps) {
  return (
    <ul 
      className={cn("my-6 ml-6 font-serif list-disc [&>li]:mt-2", className)} 
      {...props}
    >
      {children}
    </ul>
  );
}

export function OL({ className, children, ...props }: TypographyProps) {
  return (
    <ol 
      className={cn("my-6 ml-6 font-serif list-decimal [&>li]:mt-2", className)} 
      {...props}
    >
      {children}
    </ol>
  );
}

export function Li({ className, children, ...props }: TypographyProps) {
  return (
    <li 
      className={cn("mt-2 font-serif", className)} 
      {...props}
    >
      {children}
    </li>
  );
}

export function Blockquote({ className, children, ...props }: TypographyProps) {
  return (
    <blockquote 
      className={cn("mt-6 border-l-2 pl-6 italic font-serif", className)} 
      {...props}
    >
      {children}
    </blockquote>
  );
}

export function InlineCode({ className, children, ...props }: TypographyProps) {
  return (
    <code 
      className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold font-mono", className)} 
      {...props}
    >
      {children}
    </code>
  );
}

interface HyperlinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
}

export function Hyperlink({ className, href, children, ...props }: HyperlinkProps) {
  const isExternal = href?.startsWith('http://') || href?.startsWith('https://');
  const textColor = "text-blue-500 hover:text-blue-600";
  const hoverClass = "relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current after:scale-x-0 after:origin-right group-hover:after:scale-x-100 after:transition-transform after:duration-300 group-hover:after:origin-left";
  
  return (
    <span className="group transition-colors duration-200">
      {isExternal ? (
        <a 
          href={href}
          className={cn(
            textColor,
            hoverClass,
            className
          )}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      ) : (
        <Link 
          href={href || '#'}
          className={cn(
            textColor,
            hoverClass,
            className
          )}
          {...props}
        >
          {children}
        </Link>
      )}
    </span>
  );
} 