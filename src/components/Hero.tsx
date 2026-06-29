import { useEffect, useRef, useState } from 'react';
import { PROFILE, CAREER_START } from '../config/site';
import { fullYears } from '../lib/experience';
import { anime } from '../lib/anime';
import { useReducedMotion } from '../lib/hooks';
import { cn } from '../lib/cn';
import { GoldButton } from './ui/GoldButton';
import { SocialLinks } from './ui/SocialLinks';
import { ArrowRight, MailIcon, MapPinIcon, ChevronDown, SparklesIcon } from './ui/icons';

const ROLES = ['Forward Deployed Engineer', 'Product Delivery Specialist', 'AI Engineer'];

function RotatingTitle({ words, reduced }: { words: string[]; reduced: boolean }) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced) {
      const id = setInterval(() => setI((p) => (p + 1) % words.length), 3200);
      return () => clearInterval(id);
    }
    const id = setInterval(() => {
      anime({
        targets: ref.current,
        opacity: [1, 0],
        translateY: [0, -14],
        duration: 320,
        easing: 'easeInQuad',
        complete: () => {
          setI((p) => (p + 1) % words.length);
          anime({ targets: ref.current, opacity: [0, 1], translateY: [14, 0], duration: 460, easing: 'easeOutQuad' });
        },
      });
    }, 2800);
    return () => clearInterval(id);
  }, [reduced, words.length]);

  return (
    <span ref={ref} className="gold-text-animated inline-block">
      {words[i]}
    </span>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const years = fullYears(CAREER_START);

  useEffect(() => {
    if (reduced || !root.current) return;
    const targets = root.current.querySelectorAll('.hero-line');
    anime({
      targets,
      opacity: [0, 1],
      translateY: [30, 0],
      filter: ['blur(8px)', 'blur(0px)'],
      duration: 1100,
      delay: anime.stagger(120, { start: 200 }),
      easing: 'easeOutExpo',
    });
  }, [reduced]);

  const hidden = reduced ? '' : 'opacity-0';

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center justify-center px-6 pt-28 pb-20">
      <div ref={root} className="container-px flex flex-col items-center text-center">
        <div className={cn('hero-line', hidden)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/[0.08] px-4 py-1.5 font-mono text-xs text-gold-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-gold-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
            </span>
            {PROFILE.availability}
          </span>
        </div>

        <p className={cn('hero-line mt-8 font-mono text-sm tracking-widest2 text-cream-muted uppercase', hidden)}>
          Senior Software Engineer <span className="text-gold-400">→</span> AI
        </p>

        <h1 className={cn('hero-line mt-3 font-display text-5xl font-bold leading-[0.95] tracking-tight text-balance sm:text-7xl md:text-8xl', hidden)}>
          <span className="gold-text-animated drop-shadow-[0_2px_30px_rgba(202,138,4,0.25)]">Padmanabhan</span>
          <span className="mt-2 block text-2xl font-medium text-cream/90 sm:text-3xl md:text-4xl">
            Elango Manivannan
          </span>
        </h1>

        <p className={cn('hero-line mt-6 font-display text-xl text-cream sm:text-2xl', hidden)}>
          I&apos;m a <RotatingTitle words={ROLES} reduced={reduced} />
        </p>

        <p className={cn('hero-line mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream-muted text-pretty', hidden)}>
          {years}+ years of extraordinary product delivery and customer engagement across four continents — now
          channelling that craft into <span className="text-gold-200">production AI</span>: RAG, agentic workflows
          and Model Context Protocol.
        </p>

        <div className={cn('hero-line mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-cream-muted', hidden)}>
          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon className="h-4 w-4 text-gold-400" />
            {PROFILE.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <SparklesIcon className="h-4 w-4 text-gold-400" />
            {PROFILE.relocation}
          </span>
        </div>

        <div className={cn('hero-line mt-9 flex flex-col items-center gap-3 sm:flex-row', hidden)}>
          <GoldButton href="#projects" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
            Explore my AI work
          </GoldButton>
          <GoldButton href="#contact" variant="ghost" size="lg" iconLeft={<MailIcon className="h-4 w-4" />}>
            Get in touch
          </GoldButton>
        </div>

        <div className={cn('hero-line mt-10', hidden)}>
          <SocialLinks className="justify-center" />
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-muted transition-colors hover:text-gold-200"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest2">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
