import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0E0E10",
        accent: "#B8862E",
        surface: "#1A1A1D",
      },
    },
  },
  plugins: [],
};
export default config;
