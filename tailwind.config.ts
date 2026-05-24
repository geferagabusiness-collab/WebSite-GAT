import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'axm-blue': '#0075F0',
        'axm-cyan': '#009FFC',
        'axm-electric': '#00F0FC',
        'axm-deep': '#0A0E1A',
        'axm-navy': '#131C35',
        'axm-dark': '#1F2C33',
        'axm-surface': '#1A2235',
        'axm-white': '#FDFDFD',
        'axm-gray': '#8A9BB0',
        'axm-muted': '#4A5568',
        'holo-blue': '#4FC3F7',
        'holo-gold': '#F5A623',
        'holo-glow': 'rgba(79, 195, 247, 0.15)',
        success: '#00E5A0',
        warning: '#F5A623',
        error: '#FF4D6D',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
        display: ['var(--font-display)', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['72px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-xl': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['40px', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md': ['32px', { lineHeight: '1.2' }],
        'body-xl': ['20px', { lineHeight: '1.6' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body-md': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],
        'mono-sm': ['13px', { lineHeight: '1.4' }],
      },
      maxWidth: {
        container: '1280px',
        content: '960px',
        narrow: '720px',
      },
      backgroundImage: {
        'gradient-axm':
          'linear-gradient(135deg, #0075F0 0%, #009FFC 50%, #00F0FC 100%)',
        'gradient-hero':
          'linear-gradient(180deg, #0A0E1A 0%, #131C35 50%, #0A0E1A 100%)',
        'gradient-card':
          'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        'gradient-holo':
          'linear-gradient(180deg, rgba(79,195,247,0.2) 0%, rgba(245,166,35,0.1) 50%, transparent 100%)',
        'gradient-glow-b':
          'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,117,240,0.3) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(0, 117, 240, 0.4)',
        'glow-cyan': '0 0 30px rgba(0, 240, 252, 0.3)',
        'glow-holo':
          '0 0 60px rgba(79, 195, 247, 0.2), 0 0 120px rgba(79, 195, 247, 0.1)',
        card: '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover':
          '0 8px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 117, 240, 0.15)',
        'btn-primary': '0 4px 20px rgba(0, 117, 240, 0.5)',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
      },
    },
  },
  plugins: [],
}

export default config
