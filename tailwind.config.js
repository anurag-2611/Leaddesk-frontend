/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: '#4f46e5',
          emerald: '#059669',
        },
      },
    },
  },
  plugins: [],
};
