import { useEffect, useState } from 'react';
import { type StatItem, CAREER_START } from '../../config/site';
import { fullYears } from '../../lib/experience';
import { animateCount } from '../../lib/anime';
import { useReducedMotion, useReveal } from '../../lib/hooks';
import { cn } from '../../lib/cn';

export function Stat({ item, delay = 0, className }: { item: StatItem; delay?: number; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const reduced = useReducedMotion();
  const target = item.live ? fullYears(CAREER_START) : item.value;
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!visible) return;
    if (reduced) {
      setVal(target);
      return;
    }
    const inst = animateCount({ to: target, delay, onUpdate: (v) => setVal(Math.round(v)) });
    return () => inst.pause();
  }, [visible, target, delay, reduced]);

  return (
    <div ref={ref} className={cn('text-center sm:text-left', className)}>
      <div className="font-display text-4xl font-semibold leading-none gold-text sm:text-5xl">
        {item.prefix}
        {val}
        {item.suffix}
      </div>
      <div className="mt-2 text-sm leading-snug text-cream-muted">{item.label}</div>
    </div>
  );
}
