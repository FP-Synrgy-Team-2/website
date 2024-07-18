/* eslint-disable prettier/prettier */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neutral-01': '#FFFFFF',
        'neutral-02': '#F5F5F5',
        'neutral-03': '#B3B3B3',
        'neutral-09': '#1C1C1E',

        'body-white': '#FAFAFA',
        'body-blue': '#F3F7FF',

        'primary-blue': '#0066AE',
        'primary-dark-blue': '#0A3967',
        'primary-light-blue': '#E4EDFF',

        danger: '#CB3A31',
        success: '#12D79C',
        warning: '#FFB831',

        'muted-black': '#262626',

        'dark-grey': '#5D5D5D',
        'light-grey': '#F5F5F5',
        grey: '#8E8E8E',
      },
      fontWeight: {
        bold: 700,
        semibold: 600,
        medium: 500,
        regular: 400,
      },
      fontSize: {
        '2xl-display': ['60px', { lineHeight: '96px', letterSpacing: '-0.025em' }],
        'xl-display': ['48px', { lineHeight: '72px', letterSpacing: '-0.025em' }],
        'lg-display': ['36px', { lineHeight: '60px', letterSpacing: '-0.025em' }],
        'md-display': ['30px', { lineHeight: '45px', letterSpacing: '-0.025em' }],
        'sm-display': ['24px', { lineHeight: '40px', letterSpacing: '0' }],
        'xs-display': ['20px', { lineHeight: '32px', letterSpacing: '0' }],
        'xl-body': ['20px', { lineHeight: '28px', letterSpacing: '0' }],
        'lg-body': ['18px', { lineHeight: '28px', letterSpacing: '0' }],
        'md-body': ['16px', { lineHeight: '24px', letterSpacing: '0' }],
        'sm-body': ['14px', { lineHeight: '20px', letterSpacing: '0' }],
        'xs-body': ['12px', { lineHeight: '16px', letterSpacing: '0' }],
      },
      gap: {
        '3.75': '0.9375rem',
        '4.5': '1.125rem',
        '11.25': '2.8125rem',
        '21.5': '5.375rem',
        '27.5': '6.875rem'
      },
      margin: {
        '15': '3.75rem'
      },
      width: {
        '12.5': '3.125rem',
        '25': '6.25rem',
        '42': '10.5rem',
        '55': '13.75rem',
        '85': '21.25rem',
        '140': '35rem',
        '155': '38.75rem',
        '161': '40.25rem',
        '182.5': '45.625rem',
        '265': '66.25rem',
        '81/160': '50.625%'
      },
      height: {
        '12.5': '3.125rem',
        '19.5': '4.875rem',   
        '27.5': '6.875rem',
        '42': '10.5rem',
        '50.75': '12.6875rem',
        '104': '26rem'
      },
      padding: {
        '4.25': '1.0625rem',
        '8.25': '2.0625rem',
        '8.75': '2.1875rem',
        '12.5': '3.125rem',
        '17': '4.25rem'
      }
    },

    // Ubah setting tailwind yang mobile-first approach ke desktop-first approach
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
};
