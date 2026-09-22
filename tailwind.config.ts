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
        pokeRed: "#FF5350",
        pokeBlue: "#3B4CCA",
        pokeYellow: "#FFDE00",
        pokeGold: "#B3A125",
      },
    },
  },
  plugins: [],
};

export default config;
