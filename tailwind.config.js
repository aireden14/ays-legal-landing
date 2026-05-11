/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"SF Pro Display"',
          '"SF Pro Text"',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        glass: {
          white: 'rgba(255,255,255,0.14)',
          border: 'rgba(255,255,255,0.22)',
        },
      },
      backdropBlur: {
        '3xl': '32px',
        '4xl': '40px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 20px 60px 0 rgba(31, 38, 135, 0.18)',
        glow: '0 10px 40px -10px rgba(99, 102, 241, 0.55)',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(20px,-30px,0) scale(1.05)' },
        },
        floatSlow: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(-30px,20px,0) scale(1.08)' },
        },
      },
      animation: {
        float: 'float 14s ease-in-out infinite',
        'float-slow': 'floatSlow 22s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
