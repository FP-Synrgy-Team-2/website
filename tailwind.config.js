/* eslint-disable prettier/prettier */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
        
        'danger': '#CB3A31',
        'success': '#12D79C',
        'warning': '#FFB831',

        'muted-black': '#262626',

        'dark-grey': '#5D5D5D',
        'light-grey': '#F5F5F5',
        'grey': '#8E8E8E',
      },
      fontWeight: {
        'bold': 700,
        'semibold': 600,
        'medium': 500,
        'regular': 400,
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
      height: {
        '42': '10.5rem'
      },
      width: {
        '42': '10.5rem',
        '140': '35rem'
      }
    },
  },
  plugins: [],
};