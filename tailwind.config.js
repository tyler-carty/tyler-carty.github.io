/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      fontSize: {
        'xxs': '0.625rem',
      },
      height: {
        'screen-small': '100vh',
        'screen-large': 'calc(100vh - 2rem)',
      }
    },
  },
  plugins: [],
}