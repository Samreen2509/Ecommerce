/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF',
          light: '#2563EB',
          dark: '#1E3A8A',
          hover: '#BEE3F8',
        },
      },
    },
  },
};
