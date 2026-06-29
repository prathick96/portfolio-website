import { type ElementType, type ReactNode } from 'react';
import { useReveal } from '../../lib/hooks';
import { cn } from '../../lib/cn';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

/** Fade + rise into view on scroll. Honors reduced-motion via global CSS. */
export function Reveal({ children, as: Tag = 'div', delay = 0, y = 26, className, once = true }: RevealProps) {
  const { ref, visible } = useReveal({ once });
  return (
    <Tag
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
        opacity: visible ? 1 : 0,
      }}
      className={cn('transition-all duration-700 ease-out will-change-transform', className)}
    >
      {children}
    </Tag>
  );
}
