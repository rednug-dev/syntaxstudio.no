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
        'cta-blue': 'oklch(var(--cta-blue) / <alpha-value>)',
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)"],
      },
    },
  },
  plugins: [],
};
export default config;
