/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx,html}", 
    "./pages/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#FF6B00", 
        secondary: "#FFF8F3",
      },
      fontFamily: {
        fraunces: ['Fraunces', 'serif'],
        urbanist: ['Urbanist', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
        gilroy: ['Gilroy', 'serif'],
      },
  },
  plugins: [],
}
}
