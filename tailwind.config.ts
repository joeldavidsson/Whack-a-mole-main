import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#06B6D4',
        secondary: '#164E63',
        neutral1: '#000000',
        neutral2: '#212121',
        accent: '#FFFFFF',
        error: '#EF4444'
      }
    },
  },
  plugins: [],
};
export default config;
