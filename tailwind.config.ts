import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#FF5500",
          hover: "#FF6B1A",
          light: "#FFA066",
          dark: "#D44400",
          subtle: "rgba(255, 85, 0, 0.12)",
          border: "rgba(255, 85, 0, 0.25)",
        },
        dark: {
          bg: "#08090A",
          surface: "#101215",
          card: "#16181D",
          border: "#23272F",
          muted: "#1D2128",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "-apple-system", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-dark": "radial-gradient(circle at 50% 0%, rgba(255, 85, 0, 0.08) 0%, transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
