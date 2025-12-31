/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C87374',
        secondary: '#6b4f4f',
        background: '#fdf6f6',
        accent: '#e2b1b1',
        gold: '#D4AF37',
      },
      fontFamily: {
        'serif-elegant': ['Playfair Display', 'serif'],
        'script': ['Great Vibes', 'cursive'],
        'arabic': ['Amiri', 'serif'],
        'display': ['Cormorant Garamond', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'spin-slower': 'spin 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-scale': 'fadeInScale 0.6s ease-out forwards',
        'ripple': 'ripple 1.5s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '20px',
      },
      boxShadow: {
        'elegant': '0 20px 60px rgba(200, 115, 116, 0.15), 0 10px 30px rgba(200, 115, 116, 0.1)',
        'elegant-lg': '0 30px 90px rgba(200, 115, 116, 0.2), 0 15px 45px rgba(200, 115, 116, 0.15)',
        'inner-elegant': 'inset 0 2px 4px 0 rgba(200, 115, 116, 0.05), inset 0 -2px 4px 0 rgba(200, 115, 116, 0.05)',
        'glow': '0 0 40px rgba(200, 115, 116, 0.4)',
        'glow-lg': '0 0 80px rgba(200, 115, 116, 0.6)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-elegant': 'linear-gradient(135deg, #C87374 0%, #a85555 50%, #6b4f4f 100%)',
        'gradient-soft': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}