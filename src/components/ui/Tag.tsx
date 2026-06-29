import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export function Tag({
  children,
  accent = false,
  className,
}: {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] tracking-wide transition-colors duration-200',
        accent
          ? 'border-gold-500/40 bg-gold-500/10 text-gold-200'
          : 'border-white/10 bg-white/[0.03] text-cream-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
