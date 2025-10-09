/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.jsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Here you define your custom color palette
        'primary-color': '#ac3ce1',
        'primary-light': '#f7ecfc',
        'primary-red': '#ec3636',
        'primary-orange': '#f69a0e',
        'black-body': '#0e0e0e',
        'secondary-shade': '#828282',
        'primary-bg': '#f8f8f9',
      },
      fontFamily: {
        'manrope-extralight': ['Manrope-ExtraLight'],
        'manrope-light': ['Manrope-Light'],
        'manrope-regular': ['Manrope-Regular'],
        'manrope-medium': ['Manrope-Medium'],
        'manrope-semibold': ['Manrope-SemiBold'],
        'manrope-bold': ['Manrope-Bold'],
        'manrope-': ['Manrope-ExtraBold'],
      },
    },
  },
  plugins: [],
};