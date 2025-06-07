import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4169E1', // Utlyze Blue
          50: '#E8EDFB',
          100: '#D1DBF7',
          200: '#A3B7EF',
          300: '#7593E7',
          400: '#476FDF',
          500: '#4169E1',
          600: '#3454B4',
          700: '#273F87',
          800: '#1A2A5A',
          900: '#0D152D',
        },
        accent: {
          DEFAULT: '#9B59B6',
          50: '#F2E9F5',
          100: '#E5D3EB',
          200: '#CBA7D7',
          300: '#B17BC3',
          400: '#9B59B6',
          500: '#8E44AD',
          600: '#7D3A98',
          700: '#5E2C72',
          800: '#3F1D4C',
          900: '#200F26',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-up': 'scaleUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config