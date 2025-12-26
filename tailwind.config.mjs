/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // We can rely on default slate/gray for now, or define specific ones if needed.
        // Leaving empty to use standard Tailwind palette which is excellent.
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
