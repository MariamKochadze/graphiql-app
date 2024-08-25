/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'regal-blue': '#001529',
      'secondary-blue': '#1a66ff',
      'regal-gray': '#464d6a',
      'light-blue': '#00aaff',
      'body-bg': '#fcfcff',
      'regal-white': '#ffffff',
    },
    borderColor: {
      'neutral-200': '#f4f7ff',
      'light-blue': '#00aaff',
      'color-gray': '#eaecf0',
    },
    boxShadow: {
      'shadow-m': '0px 4px 40px 0px #8066ff0f',
    },
  },
  plugins: [],
};
