import { SOCIALS } from '../../config/site';
import { SOCIAL_ICONS } from './icons';
import { cn } from '../../lib/cn';

export function SocialLinks({ className, size = 18 }: { className?: string; size?: number }) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-3', className)}>
      {SOCIALS.map((s) => {
        const Icon = SOCIAL_ICONS[s.id];
        return (
          <li key={s.id}>
            <a
              href={s.url}
              target={s.id === 'email' ? undefined : '_blank'}
              rel="noreferrer noopener"
              aria-label={`${s.label} — ${s.handle}`}
              title={`${s.label} · ${s.handle}`}
              className="group relative grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-cream-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/50 hover:text-gold-200 hover:shadow-gold-glow"
            >
              {Icon && <Icon style={{ width: size, height: size }} />}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
