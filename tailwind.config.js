/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bagel-tan': '#D4A574',
        'bagel-green': '#4A7C59',
        'cream': '#F5F1E8',
        'true-black': '#0A0A0A',
        'true-white': '#FEFEFE',
      },
      fontFamily: {
        'display': ['Bebas Neue', 'sans-serif'],
        'mono': ['Space Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(4rem, 12vw, 10rem)', { lineHeight: '0.9', fontWeight: '400' }],
        'display-lg': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '0.9', fontWeight: '400' }],
        'display-md': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '0.95', fontWeight: '400' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1', fontWeight: '400' }],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      boxShadow: {
        'brutal': '6px 6px 0 0 #0A0A0A',
        'brutal-lg': '10px 10px 0 0 #0A0A0A',
        'brutal-hover': '8px 8px 0 0 #0A0A0A',
      },
    },
  },
  plugins: [],
}
