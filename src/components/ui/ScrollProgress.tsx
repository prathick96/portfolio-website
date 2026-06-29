import { useScrollProgress } from '../../lib/hooks';

/** Slim gold progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent" aria-hidden="true">
      <div
        className="h-full origin-left bg-[linear-gradient(90deg,#7a4d0c,#ca8a04,#e2c25c,#f6ecca)] shadow-gold-glow"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
