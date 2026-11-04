import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mismos valores que la portada (#0F1117 / #D4A847) para un dorado único en todo el sitio.
        background: "#0F1117",
        accent: "#D4A847",
        surface: "#1A1A1D",
      },
    },
  },
  plugins: [],
};
export default config;
