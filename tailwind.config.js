/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Medical severity colors
        critical: '#dc2626',
        urgent: '#f97316',
        standard: '#3b82f6',
        safe: '#22c55e',
        // Primary brand color
        primary: '#dc2626',
      },
    },
  },
  plugins: [],
};
