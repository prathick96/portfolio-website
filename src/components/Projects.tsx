import { AI_PROJECTS, FEATURED_REPOS, ALL_REPOS_URL } from '../config/site';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';
import { GlassCard } from './ui/GlassCard';
import { GoldButton } from './ui/GoldButton';
import { Tag } from './ui/Tag';
import { ArrowUpRight, GithubIcon, TerminalIcon } from './ui/icons';

export function Projects() {
  return (
    <section id="projects" className="section-pad relative">
      <div className="container-px">
        <SectionHeading
          index="04"
          eyebrow="AI Work"
          title={
            <>
              Building AI, <span className="gold-text">with AI.</span>
            </>
          }
          description="Production-minded AI projects — agentic automation, retrieval, and tooling — shipped in Python and Node.js."
        />

        {/* Featured AI projects */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {AI_PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <GlassCard tilt interactive className="group flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-gold-500/70">/{String(i + 1).padStart(2, '0')}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/[0.07] px-2.5 py-1 font-mono text-[10px] text-gold-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                    ongoing
                  </span>
                </div>
                <span className="mt-6 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-gold-200 transition-colors group-hover:border-gold-400/50">
                  <TerminalIcon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-cream">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-cream-muted text-pretty">{p.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <Tag key={s} accent>
                      {s}
                    </Tag>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* Repositories */}
        <Reveal className="mt-16 flex items-center gap-3">
          <GithubIcon className="h-5 w-5 text-gold-300" />
          <h3 className="font-display text-lg font-semibold text-cream">Selected repositories</h3>
          <span className="h-px flex-1 bg-gradient-to-r from-gold-500/30 to-transparent" />
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {FEATURED_REPOS.map((r, i) => (
            <Reveal key={r.name} delay={i * 70}>
              <a href={r.url} target="_blank" rel="noreferrer noopener" className="block h-full">
                <GlassCard interactive className="flex h-full flex-col p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-gold-200">{r.name}</span>
                    <ArrowUpRight className="h-4 w-4 text-cream-muted transition-colors group-hover:text-gold-200" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-cream-muted">{r.description}</p>
                </GlassCard>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-8 flex justify-center">
          <GoldButton
            href={ALL_REPOS_URL}
            target="_blank"
            rel="noreferrer noopener"
            variant="ghost"
            iconLeft={<GithubIcon className="h-4 w-4" />}
            iconRight={<ArrowUpRight className="h-4 w-4" />}
          >
            View all repositories on GitHub
          </GoldButton>
        </Reveal>
      </div>
    </section>
  );
}
