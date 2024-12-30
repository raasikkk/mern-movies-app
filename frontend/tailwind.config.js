/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "359px", // Custom extra small breakpoint
      sm: "640px",
      md: "768px",
      lg: "976px",
      customlg: "1228px",
      xl: "1440px",
    },
    extend: {},
  },
  plugins: [],
};
