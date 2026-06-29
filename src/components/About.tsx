import { ABOUT, STATS, PROFILE, CAREER_START } from '../config/site';
import { fullYears } from '../lib/experience';
import { asset } from '../lib/assets';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';
import { GlassCard } from './ui/GlassCard';
import { Stat } from './ui/Stat';
import { Tag } from './ui/Tag';

export function About() {
  const years = fullYears(CAREER_START);

  return (
    <section id="about" className="section-pad relative">
      <div className="container-px">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={
            <>
              Field-proven delivery, <span className="gold-text">now pointed at AI.</span>
            </>
          }
          description="A senior engineer who has commissioned enterprise systems on customer floors across the world — translating that hard-won delivery instinct into building production AI."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* Portrait */}
          <Reveal className="lg:sticky lg:top-28">
            <GlassCard tilt strong className="relative overflow-hidden p-3">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={asset('assets/about.jpg')}
                  alt={`Portrait of ${PROFILE.name}`}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/10 to-transparent" />
                {/* gold corner accents */}
                <span className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-gold-400/70" />
                <span className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-gold-400/70" />
              </div>
              <div className="flex items-center justify-between px-2 pb-1 pt-3">
                <div>
                  <p className="font-display text-sm font-semibold text-cream">{PROFILE.nickname}</p>
                  <p className="font-mono text-[11px] text-cream-muted">Chennai · open to Canada</p>
                </div>
                <span className="rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 font-mono text-xs text-gold-200">
                  {years}+ yrs
                </span>
              </div>
            </GlassCard>
          </Reveal>

          {/* Bio + stats */}
          <div>
            <div className="space-y-5">
              {ABOUT.map((para, i) => (
                <Reveal key={i} delay={i * 80}>
                  <p className="text-base leading-relaxed text-cream-muted text-pretty sm:text-[17px]">{para}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120} className="mt-7 flex flex-wrap gap-2">
              <Tag accent>Forward Deployed</Tag>
              <Tag accent>Customer Engagement</Tag>
              <Tag accent>Production AI</Tag>
              <Tag>USA · Peru on-site</Tag>
              <Tag>English · Tamil · Spanish basics</Tag>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-9 sm:grid-cols-4">
              {STATS.map((s, i) => (
                <Stat key={s.label} item={s} delay={i * 120} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
