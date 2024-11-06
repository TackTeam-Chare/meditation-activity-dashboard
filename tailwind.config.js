/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1478D2",        // ฟ้ากลาง
        secondary: "#0D2745",      // กรมน้ำเงิน
        accent: "#FFFFFF",         // สีขาว
        accentYellow: "#FFD700",   // สีเหลืองทอง
        accentOrange: "#FF965A",   // สีส้ม
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        supremeBold: ["Supreme-Bold", "sans-serif"],
        supremeExtraBold: ["Supreme-Extrabold", "sans-serif"],
        supremeMedium: ["Supreme-Medium", "sans-serif"],
        supremeRegular: ["Supreme-Regular", "sans-serif"],
        anuphan: ["Anuphan-VariableFont", "sans-serif"],
      },
    },
  },
  plugins: [],
};
