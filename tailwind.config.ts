import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: "#7C1111",
        cream: "#F5EDD6",
        saffron: "#FF4D00",
        ink: "#1A1A1A",
      },
      fontFamily: {
        display: ["var(--font-gajraj)", "serif"],
        body: ["var(--font-space-grotesk)", "sans-serif"],
      },
      transitionTimingFunction: {
        entrance: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseCta: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        pulseCta: "pulseCta 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
