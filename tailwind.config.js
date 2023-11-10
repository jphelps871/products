/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dark-purple": "#AD1FEA",
        "dark-grey": "#3A4374",
        "dark-blue": "#4661E6",
        "light-blue": "#62BCFA",
        slate: "#373F68",
        "light-slate": "#647196",
        cream: "#F2F4FF",
        "light-cream": "#F7F8FD",
        orange: "#F49F85",
        hover: "#CFD7FF",
        "hover-feedback": "#C75AF6",
        "danger-red": "#D73737",
        "form-text": "#8C92B3",
      },
      gridTemplateColumns: {
        "feedback-card": "1fr 9fr 1fr",
      },
    },
  },
  plugins: [],
};
