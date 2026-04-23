/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',     // class-based dark mode toggle
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        navy: {
          50:  '#eef2fb',
          100: '#d4e0f4',
          200: '#a9c1e9',
          300: '#7ea2de',
          400: '#5383d3',
          500: '#2c5fbf',
          600: '#1e4a9a',
          700: '#163875',
          800: '#0f2757',
          900: '#0a1a3d',
          950: '#060f24',
        },
        gold: {
          50:  '#fdf9ed',
          100: '#f9efcc',
          200: '#f2da8e',
          300: '#ecc550',
          400: '#e4ac27',
          500: '#c9921a',
          600: '#a87114',
          700: '#865313',
          800: '#7a4615',
          900: '#673c16',
          950: '#3c2008',
        },
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.15)',
        'card-dark': '0 4px 20px rgba(0, 0, 0, 0.4)',
        'card-dark-hover': '0 12px 40px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'hero-light': 'linear-gradient(135deg, #0a1a3d 0%, #1e4a9a 50%, #0f2757 100%)',
        'hero-dark':  'linear-gradient(135deg, #060f24 0%, #0a1a3d 50%, #060f24 100%)',
        'gold-sheen': 'linear-gradient(135deg, #e4ac27, #c9921a)',
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-out',
        'slide-up':   'slideUp 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp:   { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulseSoft: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.7 } },
      },
    },
  },
  plugins: [],
}
