// tailwind.config.ts
// Note: Tailwind v4 primarily uses CSS @theme for configuration.
// This file is kept for tooling compatibility but most config lives in globals.css

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
