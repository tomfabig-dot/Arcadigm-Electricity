/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "oklch(0.970 0.006 90)",
          2: "oklch(0.945 0.008 88)",
          card: "#ffffff",
          ink: "oklch(0.22 0.018 150)",
        },
        ink: {
          DEFAULT: "oklch(0.22 0.018 150)",
          muted: "oklch(0.46 0.014 145)",
          faint: "oklch(0.62 0.010 140)",
          hairline: "oklch(0.90 0.008 130)",
        },
        brand: {
          DEFAULT: "oklch(0.33 0.085 155)",
          hover: "oklch(0.27 0.090 155)",
          deep: "oklch(0.24 0.080 155)",
          soft: "oklch(0.94 0.020 150)",
          mint: "oklch(0.89 0.045 150)",
          fore: "oklch(0.98 0.010 100)",
        },
        signal: {
          warn: "oklch(0.62 0.13 65)",
          alert: "oklch(0.52 0.15 28)",
        },
        /* legacy aliases so portal screens keep compiling while we polish */
        bg: {
          DEFAULT: "oklch(0.970 0.006 90)",
          muted: "oklch(0.945 0.008 88)",
          card: "#ffffff",
        },
        line: "oklch(0.90 0.008 130)",
        danger: "oklch(0.52 0.15 28)",
        warn: "oklch(0.62 0.13 65)",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      /* editorial spacing scale — semantic tokens on a 4pt base */
      spacing: {
        '3xs': '4px',
        '2xs': '8px',
        'xs':  '12px',
        'sm-2': '16px',
        'md-2': '24px',
        'lg-2': '32px',
        'xl-2': '48px',
        '2xl-2': '64px',
        '3xl-2': '96px',
        '4xl-2': '128px',
      },
      fontSize: {
        'display-xl': ['clamp(2.25rem, 1.4rem + 1.9vw, 3.5rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-l': ['clamp(1.875rem, 1.3rem + 1.8vw, 2.875rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-m': ['clamp(1.5rem, 1.25rem + 1.1vw, 2.125rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'body-l': ['1.125rem', { lineHeight: '1.65' }],
        'ui': ['0.9375rem', { lineHeight: '1.45' }],
        'caption': ['0.8125rem', { lineHeight: '1.45' }],
        'micro': ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.08em' }],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      transitionDuration: {
        'fast': '160ms',
        'med': '260ms',
        'slow': '520ms',
      },
      boxShadow: {
        paper: '0 1px 0 0 oklch(0.86 0.010 130 / 0.8), 0 12px 24px -18px oklch(0.22 0.018 150 / 0.18)',
        card: '0 1px 2px 0 oklch(0.22 0.018 150 / 0.04), 0 10px 30px -18px oklch(0.22 0.018 150 / 0.12)',
        'card-hover': '0 1px 2px 0 oklch(0.22 0.018 150 / 0.05), 0 18px 40px -18px oklch(0.22 0.018 150 / 0.18)',
        hero: '0 1px 2px 0 oklch(0.22 0.018 150 / 0.08), 0 24px 48px -24px oklch(0.24 0.080 155 / 0.35)',
        ringed: '0 0 0 1px oklch(0.86 0.010 130), 0 8px 24px -14px oklch(0.22 0.018 150 / 0.16)',
      },
      keyframes: {
        'breath': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'ticker': {
          '0%, 18%':   { transform: 'translateY(0)' },
          '22%, 40%':  { transform: 'translateY(-1.1em)' },
          '44%, 62%':  { transform: 'translateY(-2.2em)' },
          '66%, 84%':  { transform: 'translateY(-3.3em)' },
          '88%, 100%': { transform: 'translateY(-4.4em)' },
        },
      },
      animation: {
        'breath': 'breath 2.8s ease-in-out infinite',
        'fade-up': 'fade-up 520ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'marquee': 'marquee 48s linear infinite',
        'ticker': 'ticker 14s cubic-bezier(0.25, 1, 0.5, 1) infinite',
      },
    },
  },
  plugins: [],
};
