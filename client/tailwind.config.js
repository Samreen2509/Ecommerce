/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        'custom-h-sidebar': 'calc(2000px - 500px)',
      },
    },
  },
  plugins: [],
};
