import { type FormEvent, useState } from 'react';
import { PROFILE, WEB3FORMS_ACCESS_KEY } from '../config/site';
import { asset } from '../lib/assets';
import { cn } from '../lib/cn';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';
import { GlassCard } from './ui/GlassCard';
import { GoldButton } from './ui/GoldButton';
import { SocialLinks } from './ui/SocialLinks';
import { MailIcon, MapPinIcon, DownloadIcon, SendIcon, CheckIcon, TerminalIcon } from './ui/icons';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const fieldClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-cream placeholder:text-cream-dim transition-colors duration-200 focus:border-gold-400/60 focus:bg-white/[0.05] focus:outline-none';

const labelClass = 'mb-1.5 block font-mono text-xs uppercase tracking-wide text-cream-muted';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get('botcheck')) return; // honeypot tripped

    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = String(data.get('subject') || '').trim() || `New portfolio message from ${name}`;

    if (!name || !email || !message) {
      setStatus('error');
      setError('Please fill in your name, email and message.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus('error');
      setError('Please enter a valid email address.');
      return;
    }

    // No key configured yet -> open the visitor's email client instead.
    if (!WEB3FORMS_ACCESS_KEY) {
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
      return;
    }

    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name,
          email,
          subject,
          message,
          from_name: 'Portfolio · prathick96',
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setError(json.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setError('Network error — please email me directly at ' + PROFILE.email + '.');
    }
  }

  return (
    <section id="contact" className="section-pad relative">
      <div className="container-px">
        <SectionHeading
          index="05"
          eyebrow="Contact"
          align="center"
          title={
            <>
              Let&apos;s build something <span className="gold-text">extraordinary.</span>
            </>
          }
          description="Open to AI, Forward Deployed and Software Engineer roles — and to interesting collaborations. Drop a message and it lands straight in my inbox."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left — direct contact */}
          <Reveal>
            <GlassCard strong className="flex h-full flex-col gap-6 p-7">
              <div>
                <h3 className="font-display text-lg font-semibold text-cream">Reach me directly</h3>
                <p className="mt-1 text-sm text-cream-muted">I usually reply within a day.</p>
              </div>

              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:border-gold-400/40 hover:bg-white/[0.05]"
                  >
                    <MailIcon className="h-5 w-5 text-gold-300" />
                    <span className="text-sm text-cream">{PROFILE.email}</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                    <MapPinIcon className="h-5 w-5 text-gold-300" />
                    <span className="text-sm text-cream">
                      {PROFILE.location} · {PROFILE.relocation}
                    </span>
                  </div>
                </li>
              </ul>

              <div>
                <p className={labelClass}>Find me online</p>
                <SocialLinks />
              </div>

              <div className="rounded-xl border border-gold-500/20 bg-gold-500/[0.05] p-4">
                <p className="flex items-center gap-2 font-mono text-xs text-gold-200">
                  <TerminalIcon className="h-4 w-4" /> work authorization
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-cream-muted">
                  Canada Spousal Open Work Permit (in process) — an open permit. No employer sponsorship or LMIA
                  required.
                </p>
              </div>

              <GoldButton
                href={asset(PROFILE.resumeUrl)}
                target="_blank"
                rel="noreferrer noopener"
                variant="ghost"
                magnetic={false}
                className="mt-auto w-full"
                iconLeft={<DownloadIcon className="h-4 w-4" />}
              >
                Download Résumé (PDF)
              </GoldButton>
            </GlassCard>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={100}>
            <GlassCard strong className="p-7">
              {status === 'success' ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-gold-400/50 bg-gold-500/10 text-gold-200 shadow-gold-glow">
                    <CheckIcon className="h-8 w-8" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-cream">Message sent</h3>
                  <p className="mt-2 max-w-sm text-sm text-cream-muted">
                    Thanks for reaching out — I&apos;ll get back to you at the email you provided very soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm text-cream-muted transition-colors hover:border-gold-400/50 hover:text-gold-200"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
                  {/* honeypot */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute left-[-9999px]"
                    aria-hidden="true"
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Name
                      </label>
                      <input id="name" name="name" type="text" required placeholder="Your name" className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className={labelClass}>
                      Subject <span className="text-cream-dim">(optional)</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Role, project or collaboration"
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell me a little about what you have in mind…"
                      className={cn(fieldClass, 'resize-none')}
                    />
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-200">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={cn(
                      'group relative mt-1 inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-medium text-ink transition-all duration-300',
                      'bg-[linear-gradient(100deg,#f6ecca,#e2c25c_30%,#d4af37_55%,#ca8a04)] bg-[length:200%_auto] shadow-gold-glow hover:bg-[position:right_center] hover:shadow-gold-glow-lg',
                      'disabled:cursor-not-allowed disabled:opacity-60',
                    )}
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/40 border-t-ink" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <SendIcon className="h-4 w-4" />
                        Send message
                      </>
                    )}
                  </button>

                  {import.meta.env.DEV && !WEB3FORMS_ACCESS_KEY && (
                    <p className="text-center font-mono text-[11px] text-cream-dim">
                      dev note: add VITE_WEB3FORMS_KEY to deliver via Web3Forms (currently falls back to mailto).
                    </p>
                  )}
                </form>
              )}
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
