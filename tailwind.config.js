/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark "stargaze" base — warm-black adapted from the Liquid Glass system
        space: {
          950: '#050509',
          900: '#0a0a12',
          800: '#0f0f1a',
          700: '#15151f',
        },
        ink: {
          DEFAULT: '#0c0a09',
          soft: '#1c1917',
        },
        // Gold accent (engine CTA #CA8A04) expanded into a usable scale
        gold: {
          50: '#fbf6e9',
          100: '#f6ecca',
          200: '#ecd789',
          300: '#e2c25c',
          400: '#d4af37',
          500: '#ca8a04',
          600: '#a16207',
          700: '#7a4d0c',
          800: '#5a390f',
          900: '#3a2509',
        },
        cream: {
          DEFAULT: '#f5f3ee',
          muted: '#a8a29e',
          dim: '#78716c',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'gold-glow': '0 0 24px -2px rgba(202, 138, 4, 0.45)',
        'gold-glow-lg': '0 0 60px -10px rgba(212, 175, 55, 0.55)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'gold-sheen': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'gold-sheen': 'gold-sheen 6s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
