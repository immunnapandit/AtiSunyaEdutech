import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F172A",
          50: "#F1F5F9",
          100: "#E2E8F0",
          400: "#475569",
          600: "#1E293B",
          800: "#0B1220",
          900: "#080D18",
        },
        brand: {
          DEFAULT: "#0466C8",
          50: "#EEF6FF",
          100: "#DCEEFF",
          400: "#1F73D8",
          600: "#0354A6",
          700: "#02417D",
        },
        royal: {
          DEFAULT: "#0466C8",
          50: "#EEF6FF",
          100: "#DCEEFF",
          400: "#1F73D8",
          600: "#0354A6",
          700: "#02417D",
        },
        cyan: {
          DEFAULT: "#0466C8",
          100: "#DCEEFF",
          400: "#1F73D8",
          600: "#0354A6",
        },
        mist: {
          50: "#F7FAFD",
          100: "#EEF3FA",
          200: "#E4ECF7",
        },
        signal: {
          DEFAULT: "#0466C8",
          100: "#DCEEFF",
          600: "#0354A6",
        },
        charcoal: "#14181F",
        slateink: "#1C2333",
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-md": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, rgba(255,255,255,0.9))",
        "hero-radial":
          "radial-gradient(120% 120% at 50% -10%, rgba(37,99,235,0.16) 0%, rgba(6,182,212,0.06) 45%, rgba(255,255,255,0) 70%)",
        "navy-gradient": "linear-gradient(160deg, #0B1220 0%, #0F172A 45%, #123055 100%)",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15,23,42,0.06)",
        lifted: "0 20px 40px -12px rgba(15, 23, 42, 0.18)",
        glow: "0 0 0 1px rgba(37,99,235,0.08), 0 8px 30px rgba(37,99,235,0.16)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      maxWidth: {
        content: "1280px",
      },
      spacing: {
        18: "4.5rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
