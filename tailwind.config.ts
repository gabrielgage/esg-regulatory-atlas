import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#071827",
        ink: "#0f172a",
        mint: "#7dd3c7",
        teal: "#0f766e",
        violet: "#6d5dfc",
        amberSoft: "#f8c471"
      }
    }
  },
  plugins: []
};
export default config;
