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
      gap: {
        '3.75': '0.9375rem',
        '4.5': '1.125rem',
        '11.25': '2.8125rem'
      },
      margin: {
        '15': '3.75rem'
      },
      width: {
        '12.5': '3.125rem',
        '28': '6.25rem',
        '55': '13.75rem',
        '85': '21.25rem',
        '155': '38.75rem',
        '161': '40.25rem',
        '81/160': '50.625%'
      },
      height: {
        '12.5': '3.125rem',
        '50.75': '12.6875rem',
        '27.5': '6.875rem'
      },
      padding: {
        '4.25': '1.0625rem',
        '8.75': '2.1875rem'
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

