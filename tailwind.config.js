/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pr-blue': '#0066AE',
        'pr-light-blue': '#E4EDFF',
        'neutral-02': '#F5F5F5',
        'neutral-03': '#B3B3B3',
        'neutral-09': '#1C1C1E',
        'sc-red': '#CB3A31',
        'sc-green': '#12D79C',
        'sc-yellow': '#FFB831',
        'ac-dark-grey': '#5D5D5D'
      },
      width: {
        '12.5': '3.125rem',
        '28': '6.25rem'
      },
      height: {
        '12.5': '3.125rem',
        '27.5': '6.875rem'
      },
      padding: {
        '4.25': '1.0625rem'
      }
    },
    screens: {
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [],
}

