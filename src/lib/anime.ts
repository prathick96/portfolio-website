import anime from 'animejs';

/** Animated count-up driven by anime.js. Returns the anime instance. */
export function animateCount(opts: {
  from?: number;
  to: number;
  duration?: number;
  round?: number;
  delay?: number;
  onUpdate: (value: number) => void;
}): anime.AnimeInstance {
  const { from = 0, to, duration = 1700, round = 1, delay = 0, onUpdate } = opts;
  const obj = { v: from };
  return anime({
    targets: obj,
    v: to,
    round,
    duration,
    delay,
    easing: 'easeOutExpo',
    update: () => onUpdate(obj.v),
  });
}

/** Staggered entrance for a set of elements (anime.js). */
export function revealStagger(
  targets: anime.AnimeParams['targets'],
  opts: { start?: delayValue; step?: number; translateY?: number; duration?: number } = {},
): anime.AnimeInstance {
  const { start = 0, step = 80, translateY = 26, duration = 900 } = opts;
  return anime({
    targets,
    translateY: [translateY, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration,
    delay: anime.stagger(step, { start }),
  });
}

type delayValue = number;

export { anime };
