import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        h1: ["20px", { lineHeight: "26px", fontWeight: "600" }],
        p1: ["16px", { lineHeight: "22.4px", fontWeight: "400" }],
        p2: ["16px", { lineHeight: "22.4px", fontWeight: "600" }],
        p3: ["14px", { lineHeight: "19.6px", fontWeight: "400" }],
        p4: ["14px", { lineHeight: "19.6px", fontWeight: "600" }],
        p5: ["13px", { lineHeight: "18.2px", fontWeight: "500" }],
        p6: ["13px", { lineHeight: "18.2px", fontWeight: "400" }],
        p7: ["10px", { lineHeight: "14px", fontWeight: "400" }],
      },
      colors: {
        dark: "#0E243C",
        medium: "#0D97A8",
        black: {
          100: "rgba(15, 22, 23, 1)",
          80: "rgba(15, 22, 23, 0.8)",
          40: "rgba(15, 22, 23, 0.4)",
          20: "rgba(15, 22, 23, 0.2)",
          5: "rgba(15, 22, 23, 0.05)",
        },
        white: "#FFFFFF",
        bg: "#FAFAFA",
        disable: "#EEEEEE",
        green: "#00CF72",
        orange: "#FFBB1D",
        red: "#FF112E",
        grey: "#F6F9F9",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
