/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        highlight: 'var(--highlight)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        display: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
