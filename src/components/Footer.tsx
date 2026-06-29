import { NAV_SECTIONS, PROFILE } from '../config/site';
import { SocialLinks } from './ui/SocialLinks';
import { ChevronDown } from './ui/icons';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 px-6 py-14">
      <div className="container-px">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <a href="#home" className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-gold-500/40 bg-gold-500/10 font-display text-sm font-bold text-gold-200">
                PM
              </span>
              <span className="font-display text-base font-semibold text-cream">
                {PROFILE.name}
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-cream-muted">{PROFILE.tagline}</p>
            <div className="mt-5">
              <SocialLinks />
            </div>
          </div>

          <nav className="flex flex-col gap-2.5" aria-label="Footer">
            <p className="font-mono text-xs uppercase tracking-wide text-cream-dim">Navigate</p>
            {NAV_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm text-cream-muted transition-colors hover:text-gold-200"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
          <p className="text-center font-mono text-xs text-cream-dim sm:text-left">
            © {year} {PROFILE.name}. Crafted with React, Three.js &amp; anime.js.
          </p>
          <a
            href="#home"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-cream-muted transition-colors hover:border-gold-400/50 hover:text-gold-200"
          >
            Back to top
            <ChevronDown className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
