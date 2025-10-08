/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.jsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'manrope-extralight': ['Manrope-ExtraLight'],
        'manrope-light': ['Manrope-Light'],
        'manrope-regular': ['Manrope-Regular'],
        'manrope-medium': ['Manrope-Medium'],
        'manrope-semibold': ['Manrope-SemiBold'],
        'manrope-bold': ['Manrope-Bold'],
        'manrope-extrabold': ['Manrope-ExtraBold'],
      },
    },
  },
  plugins: [],
};