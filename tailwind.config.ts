import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#071827",
        navy2: "#0b2236",
        ink: "#0f172a",
        mint: "#7dd3c7",
        teal: "#0f766e",
        violet: "#6d5dfc",
        amberSoft: "#f8c471",
        paper: "#f6f8fb"
      }
    }
  },
  plugins: []
};
export default config;
