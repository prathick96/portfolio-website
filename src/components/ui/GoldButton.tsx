import { type AnchorHTMLAttributes, type ReactNode, useRef } from 'react';
import { cn } from '../../lib/cn';
import { useReducedMotion } from '../../lib/hooks';

type Variant = 'primary' | 'ghost';
type Size = 'md' | 'lg';

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  magnetic?: boolean;
}

type Props = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as?: 'a' };

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 cursor-pointer focus-visible:outline-none select-none';

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

const variants: Record<Variant, string> = {
  primary:
    'text-ink shadow-gold-glow bg-[linear-gradient(100deg,#f6ecca,#e2c25c_30%,#d4af37_55%,#ca8a04)] bg-[length:200%_auto] hover:bg-[position:right_center] hover:shadow-gold-glow-lg',
  ghost:
    'text-gold-200 gold-hairline bg-white/[0.03] backdrop-blur-md hover:border-gold-400/60 hover:bg-white/[0.06] hover:text-gold-100',
};

/** Gold CTA / ghost button with optional magnetic pull. Renders as an anchor. */
export function GoldButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  iconLeft,
  iconRight,
  magnetic = true,
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!magnetic || reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = '';
  }

  return (
    <a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </a>
  );
}
