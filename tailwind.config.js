/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366f1", // Indigo 500
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#ec4899", // Pink 500
          foreground: "#ffffff",
        },
        background: "var(--background)",
        surface: "var(--surface)",
        text: {
          DEFAULT: "var(--text)",
          muted: "var(--text-muted)",
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}