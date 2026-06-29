import { EXPERIENCE } from '../config/site';
import { rangeLabel } from '../lib/experience';
import { cn } from '../lib/cn';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';
import { GlassCard } from './ui/GlassCard';
import { Tag } from './ui/Tag';

export function Experience() {
  return (
    <section id="experience" className="section-pad relative">
      <div className="container-px">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title={
            <>
              A track record of shipping <span className="gold-text">under pressure.</span>
            </>
          }
          description="Seven years from full-stack trainee to forward-deployed senior engineer — durations update themselves in real time."
        />

        <div className="relative mt-14">
          {/* gold spine */}
          <span className="absolute bottom-2 left-[11px] top-2 w-0.5 bg-gradient-to-b from-gold-500/0 via-gold-500/50 to-gold-500/0" />

          <div className="space-y-7">
            {EXPERIENCE.map((item, i) => (
              <Reveal key={`${item.company}-${item.roles}`} delay={Math.min(i, 3) * 60} className="relative pl-10">
                {/* node */}
                <span className="absolute left-[4px] top-2 grid h-4 w-4 place-items-center">
                  <span
                    className={cn(
                      'h-4 w-4 rounded-full border-2 bg-space-900',
                      item.current ? 'border-gold-300 shadow-gold-glow' : 'border-gold-500/60',
                    )}
                  />
                  {item.current && (
                    <span className="absolute h-4 w-4 animate-pulse-ring rounded-full bg-gold-400/60" />
                  )}
                </span>

                <GlassCard className="p-6 sm:p-7" interactive>
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-cream">{item.company}</h3>
                      <p className="text-gold-200">{item.roles}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
                      <span
                        className={cn(
                          'rounded-full px-3 py-1 font-mono text-[11px]',
                          item.current
                            ? 'border border-gold-500/40 bg-gold-500/10 text-gold-200'
                            : 'border border-white/10 bg-white/[0.03] text-cream-muted',
                        )}
                      >
                        {rangeLabel(item.start, item.end)}
                      </span>
                      <span className="font-mono text-[11px] text-cream-dim">{item.location}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-cream-muted">{item.summary}</p>

                  <ul className="mt-4 space-y-2.5">
                    {item.highlights.map((h, hi) => (
                      <li key={hi} className="flex gap-3 text-sm leading-relaxed text-cream-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400/80" />
                        <span className="text-pretty">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
