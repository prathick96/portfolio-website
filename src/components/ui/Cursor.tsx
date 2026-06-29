import { useEffect, useRef, useState } from 'react';
import { useMediaQuery, useReducedMotion } from '../../lib/hooks';

/** Trailing gold ring cursor (desktop only). Complements — does not replace — the native cursor. */
export function Cursor() {
  const finePointer = useMediaQuery('(pointer: fine)');
  const reduced = useReducedMotion();
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!finePointer) return;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest('a, button, input, textarea, [data-cursor]');
      setHovering(Boolean(el));
    };

    const loop = () => {
      const k = reduced ? 1 : 0.18;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [finePointer, reduced]);

  if (!finePointer) return null;

  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden rounded-full border border-gold-400/70 mix-blend-screen transition-[width,height,opacity,background-color] duration-200 md:block"
        style={{
          width: hovering ? 56 : 30,
          height: hovering ? 56 : 30,
          backgroundColor: hovering ? 'rgba(212,175,55,0.08)' : 'transparent',
        }}
      />
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-1.5 w-1.5 rounded-full bg-gold-300 md:block"
      />
    </>
  );
}
