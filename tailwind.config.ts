import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: "#ffffff",
          soft: "#f7f5f4",
          raised: "#ffffff",
        },
        // ✅ CHANGED: Updated brand colors per MoM
        red: {
          DEFAULT: "#E3262A",
          light: "#ff4d5e",
          dark: "#B81F23",
        },
        brown: {
          DEFAULT: "#4A261C",
          light: "#6B3A2C",
          dark: "#2E170F",
        },
        ink: {
          DEFAULT: "#15171c",
          muted: "#5b6472",
        },
        line: "rgba(17, 17, 17, 0.09)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        // ✅ CHANGED: Updated gradient with new brand colors
        "red-gradient": "linear-gradient(135deg, #E3262A 0%, #ff4d5e 100%)",
        "brown-gradient": "linear-gradient(135deg, #4A261C 0%, #6B3A2C 100%)",
        "radial-glow":
          "radial-gradient(circle at 50% 20%, rgba(227,38,42,0.08) 0%, rgba(255,255,255,0) 62%)",
      },
      boxShadow: {
        // ✅ CHANGED: Updated shadows with new red color
        red: "0 0 0 1px rgba(227,38,42,0.14), 0 8px 30px -12px rgba(227,38,42,0.28)",
        "red-lg": "0 0 0 1px rgba(227,38,42,0.2), 0 20px 45px -15px rgba(227,38,42,0.32)",
        card: "0 1px 2px rgba(15,15,15,0.04), 0 1px 3px rgba(15,15,15,0.06)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "spin-reverse-slow": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "spin-reverse-slow": "spin-reverse-slow 26s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;