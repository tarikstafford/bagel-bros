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
        'display': ['var(--font-archivo-black)', 'sans-serif'],
        'body': ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['5rem', { lineHeight: '1', fontWeight: '900' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1', fontWeight: '900' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', fontWeight: '900' }],
      },
    },
  },
  plugins: [],
}
