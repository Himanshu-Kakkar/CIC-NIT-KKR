// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,ts,jsx,tsx,html}",
//     "./index.html"
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./index.html"
  ],
  theme: {
    extend: {
      boxShadow: {
        gallery: '0 4px 24px rgba(0,0,0,0.25)',
        galleryHover: '0 16px 40px rgba(74,114,207,0.25)'
      },
      colors: {
        galleryBg: '#0d1530',
        galleryCard: '#1c2c45',
        accentBlue: '#4a72cf',
        accentGradientStart: '#4a72cf',
        accentGradientEnd: '#8a65d3',
      },
    },
  },
  plugins: [],
};
