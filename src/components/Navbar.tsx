import { useEffect, useState } from 'react';
import { NAV_SECTIONS, PROFILE } from '../config/site';
import { useActiveSection } from '../lib/hooks';
import { cn } from '../lib/cn';
import { GoldButton } from './ui/GoldButton';
import { DownloadIcon, MenuIcon, CloseIcon } from './ui/icons';
import { asset } from '../lib/assets';

const ids = NAV_SECTIONS.map((s) => s.id);

export function Navbar() {
  const active = useActiveSection(ids as unknown as string[]);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          'flex w-full max-w-5xl items-center justify-between rounded-full px-3 py-2 pl-5 transition-all duration-300',
          scrolled ? 'glass-strong shadow-glass' : 'border border-transparent',
        )}
      >
        <a href="#home" className="group flex items-center gap-2.5" aria-label="Go to top">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-gold-500/40 bg-gold-500/10 font-display text-sm font-bold text-gold-200 transition-colors group-hover:border-gold-400/70">
            PM
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-wide text-cream sm:block">
            {PROFILE.shortName}
            <span className="text-gold-400">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={cn(
                  'relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200',
                  active === s.id ? 'text-gold-200' : 'text-cream-muted hover:text-cream',
                )}
              >
                {s.label}
                {active === s.id && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <GoldButton
            href={asset(PROFILE.resumeUrl)}
            target="_blank"
            rel="noreferrer noopener"
            variant="ghost"
            size="md"
            magnetic={false}
            className="hidden sm:inline-flex"
            iconLeft={<DownloadIcon className="h-4 w-4" />}
          >
            Resume
          </GoldButton>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-cream transition-colors hover:border-gold-400/50 hover:text-gold-200 md:hidden"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="fixed inset-0 top-0 z-30 md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-space-950/70 backdrop-blur-sm" />
          <div className="absolute inset-x-4 top-20 glass-strong rounded-3xl p-4" onClick={(e) => e.stopPropagation()}>
            <ul className="flex flex-col">
              {NAV_SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block rounded-xl px-4 py-3 text-base transition-colors',
                      active === s.id ? 'bg-gold-500/10 text-gold-200' : 'text-cream-muted hover:bg-white/5 hover:text-cream',
                    )}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <GoldButton
              href={asset(PROFILE.resumeUrl)}
              target="_blank"
              rel="noreferrer noopener"
              variant="primary"
              size="md"
              magnetic={false}
              className="mt-3 w-full"
              iconLeft={<DownloadIcon className="h-4 w-4" />}
            >
              Download Résumé
            </GoldButton>
          </div>
        </div>
      )}
    </header>
  );
}
