/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#001453",
          container: "#001453",
          fixed: "#dde1ff",
          "fixed-dim": "#b8c4ff",
        },
        secondary: {
          DEFAULT: "#515f74",
          container: "#d5e3fc",
          fixed: "#d5e3fc",
          "fixed-dim": "#b9c7df",
        },
        tertiary: {
          DEFAULT: "#000000",
          container: "#271901",
          fixed: "#fcdeb5",
          "fixed-dim": "#dec29a",
        },
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
        },
        surface: {
          DEFAULT: "#f7f9fb",
          bright: "#f7f9fb",
          dim: "#d8dadc",
          variant: "#e0e3e5",
          container: {
            lowest: "#ffffff",
            low: "#f2f4f6",
            DEFAULT: "#eceef0",
            high: "#e6e8ea",
            highest: "#e0e3e5",
          }
        },
        outline: {
          DEFAULT: "#76777d",
          variant: "#c6c6cd",
        },
        "on-surface": "#191c1e",
        "on-surface-variant": "#45464d",
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
}
