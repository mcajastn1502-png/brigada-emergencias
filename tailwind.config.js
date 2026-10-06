/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        emergencia: '#e63946',
        rescatista: '#2a9d8f',
        incendios: '#e76f51',
        bgDark: '#0f1419',
        panel: '#1a2027',
        borderDark: '#2d3748',
      },
    },
  },
  plugins: [],
};