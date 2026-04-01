/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      animation: {
        'bounce-sm': 'bounce-sm 0.4s ease',
        'pop': 'pop 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        'flame': 'flame 1s ease infinite',
      },
      keyframes: {
        'bounce-sm': {
          '0%,100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        flame: {
          '0%,100%': { transform: 'scaleY(1) rotate(-2deg)' },
          '50%': { transform: 'scaleY(1.1) rotate(2deg)' },
        },
      },
    },
  },
  plugins: [],
}