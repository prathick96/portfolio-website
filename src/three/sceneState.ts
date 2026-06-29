/**
 * Mutable scene state shared between React (which writes scroll/pointer) and the
 * R3F render loop (which reads it inside useFrame). Kept outside React on purpose
 * so high-frequency scroll/pointer updates never trigger re-renders.
 */
export const sceneState = {
  scroll: 0, // 0..1 page progress
  pointerX: 0, // -1..1
  pointerY: 0, // -1..1
};

let bound = false;

/** Attach global pointer/scroll listeners once; returns a cleanup function. */
export function bindSceneInputs(): () => void {
  if (bound || typeof window === 'undefined') return () => {};
  bound = true;

  const onPointer = (e: PointerEvent) => {
    sceneState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    sceneState.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
  };
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    sceneState.scroll = max > 0 ? window.scrollY / max : 0;
  };

  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  return () => {
    bound = false;
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('scroll', onScroll);
  };
}
