/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F9F9F9',
        'accent-green': '#20D38E',
        'accent-orange': '#FF6B35',
        'accent-forest': '#0E3B2E',
        'studio-dark': '#111111',
        'studio-gray': '#555555',
        'studio-light-gray': '#EFEFEF',
      },
      fontFamily: {
        display: ['var(--font-clash)', 'Clash Display', 'sans-serif'],
        sans: ['var(--font-archivo)', 'Archivo', 'sans-serif'],
        body: ['var(--font-archivo)', 'Archivo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
