import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D2A55D",
          50: "#F5EFDC",
          100: "#F0E5C6",
          200: "#E5D09A",
          300: "#DABB6E",
          400: "#D2A55D",
          500: "#C29743",
          600: "#A17D35",
          700: "#7A5F28",
          800: "#53411B",
          900: "#2C220E",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
