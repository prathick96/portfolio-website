import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <Reveal>
        <div className={cn('flex items-center gap-3', align === 'center' && 'justify-center')}>
          {index && <span className="font-mono text-xs text-gold-500/70">{index}</span>}
          <span className="eyebrow">{eyebrow}</span>
          <span className="h-px w-10 bg-gradient-to-r from-gold-500/60 to-transparent" />
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-cream text-balance sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={140}>
          <p className="mt-4 text-base leading-relaxed text-cream-muted text-pretty">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
