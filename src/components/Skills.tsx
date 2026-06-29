import { SKILLS } from '../config/site';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';
import { GlassCard } from './ui/GlassCard';
import { Tag } from './ui/Tag';
import { SparklesIcon } from './ui/icons';

export function Skills() {
  const featured = SKILLS.find((g) => g.accent);
  const rest = SKILLS.filter((g) => !g.accent);

  return (
    <section id="skills" className="section-pad relative">
      <div className="container-px">
        <SectionHeading
          index="03"
          eyebrow="Skills & Stack"
          title={
            <>
              A delivery toolkit, <span className="gold-text">led by AI.</span>
            </>
          }
          description="Deep roots in enterprise delivery and support, with a fast-growing core in applied AI and LLM engineering."
        />

        <div className="mt-14 grid gap-5">
          {/* Featured AI card */}
          {featured && (
            <Reveal>
              <GlassCard strong tilt className="relative overflow-hidden p-7 sm:p-9">
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-500/10 blur-3xl" />
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-gold-500/40 bg-gold-500/10 text-gold-200">
                    <SparklesIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-cream">{featured.title}</h3>
                    <p className="font-mono text-xs text-gold-300/80">// the focus of my next chapter</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {featured.skills.map((s) => (
                    <Tag key={s} accent className="px-3.5 py-1.5 text-xs">
                      {s}
                    </Tag>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          )}

          {/* Remaining groups */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((group, i) => (
              <Reveal key={group.title} delay={i * 70}>
                <GlassCard className="h-full p-6" interactive>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-base font-semibold text-cream">{group.title}</h3>
                    <span className="font-mono text-xs text-gold-500/60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.skills.map((s) => (
                      <Tag key={s}>{s}</Tag>
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
