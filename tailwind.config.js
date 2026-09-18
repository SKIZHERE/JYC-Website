/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'jyc-bg-main': 'var(--bg-main)',
        'jyc-bg-card': 'var(--bg-card)',
        'jyc-bg-elevated': 'var(--bg-elevated)',
        'jyc-text-primary': 'var(--text-primary)',
        'jyc-text-muted': 'var(--text-muted)',
        'jyc-accent-red': 'var(--accent-red)',
        'jyc-accent-gold': 'var(--accent-gold)',
        'jyc-border-tech': 'var(--border-tech)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(0, 0, 0, 0.06)',
        lift: '0 12px 32px rgba(0, 0, 0, 0.12)',
        'gold-glow': '0 0 20px rgba(193, 154, 70, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'fade-in-up': 'fadeInUp 0.6s ease-out both',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}