import { type ReactNode, useRef } from 'react';
import { cn } from '../../lib/cn';
import { useReducedMotion } from '../../lib/hooks';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** subtle pointer-driven 3D tilt */
  tilt?: boolean;
  /** strong glass surface */
  strong?: boolean;
  interactive?: boolean;
}

export function GlassCard({ children, className, tilt = false, strong = false, interactive = false }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!tilt || reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateZ(0)`;
  }
  function onLeave() {
    const el = ref.current;
    if (el) el.style.transform = '';
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        strong ? 'glass-strong' : 'glass',
        'rounded-2xl transition-transform duration-200 ease-out',
        interactive && 'card-lift cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  );
}
