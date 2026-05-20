import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", lg: "2.5rem" },
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: "#FF82C7",
          50: "#FFF5FB",
          100: "#FDE7F4",
          200: "#F8DDF1",
          300: "#F3B7DD",
          400: "#FF82C7",
          500: "#E76FB5",
          600: "#D85FA7",
          700: "#B14582",
          800: "#7A2C58",
        },
        ink: { DEFAULT: "#111827", soft: "#1F2937", muted: "#5B6472" },
        canvas: { DEFAULT: "#FFFDFE", soft: "#FBF6FA", warm: "#FFF6FB" },
        line: { DEFAULT: "#F3D8EA", soft: "#FAEAF3", strong: "#E8C0DC" },
        positive: "#A7F3D0",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightish: "-0.012em",
        tighter2: "-0.028em",
      },
      boxShadow: {
        soft: "0 1px 0 rgba(17,24,39,0.04), 0 8px 24px -12px rgba(216,95,167,0.18)",
        ring: "0 0 0 1px #F3D8EA, 0 14px 40px -18px rgba(216,95,167,0.35)",
        plate: "0 1px 0 rgba(255,255,255,0.6) inset, 0 18px 60px -28px rgba(216,95,167,0.32)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 2.4s linear infinite",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        "accordion-down": "accordion-down 0.28s cubic-bezier(0.22,1,0.36,1)",
        "accordion-up": "accordion-up 0.22s cubic-bezier(0.22,1,0.36,1)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(255,253,254,0) 0%, #FFFDFE 100%), radial-gradient(circle at 1px 1px, rgba(216,95,167,0.10) 1px, transparent 0)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
