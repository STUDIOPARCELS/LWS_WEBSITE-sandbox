import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Reused from the Observatory presentation token set.
        paper: "#ffffff",
        ink: "#111111",
        muted: "#6e6e73",
        soft: "#a6a6a6",
        line: "#d9d9d9",
        faint: "#cfcfcf",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Inter",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: ["Newsreader", "Georgia", "Times New Roman", "serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        container: "1240px",
      },
      letterSpacing: {
        label: "0.2em",
        wide: "0.22em",
      },
      backgroundImage: {
        metallic:
          "linear-gradient(90deg, #cfcfcf, #7d7d7d 45%, #9a9a9a 55%, #d9d9d9)",
      },
    },
  },
  plugins: [],
};

export default config;
