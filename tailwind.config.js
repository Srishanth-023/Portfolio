/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          200: "#D5DAE1"
        },
        black: {
          DEFAULT: "#000",
          500: "#1D2235"
        },
        blue: {
          500: "#2b77e7"
        }
      },
      fontFamily: {
        worksans: ["Work Sans", "sans-serif"],
        poppins: ['Poppins', "sans-serif"]
      },
      boxShadow: {
        card: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)'
      },
      animation: {
        'load-indeterminate': 'load-indeterminate 1.5s infinite ease-in-out',
      },
      keyframes: {
        'load-indeterminate': {
          '0%': { transform: 'translateX(-100%) scaleX(0.2)' },
          '50%': { transform: 'translateX(0) scaleX(1)' },
          '100%': { transform: 'translateX(100%) scaleX(0.2)' },
        }
      }
    },
  },
  plugins: [],
}

