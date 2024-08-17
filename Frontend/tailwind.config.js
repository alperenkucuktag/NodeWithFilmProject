/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "zoom-slide": "zoom-slide 15s ease-in-out infinite", // Yaklaş ve uzaklaş efekti
      },
      keyframes: {
        "zoom-slide": {
          "0%, 100%": { transform: "scale(1)", opacity: 0.5 }, // Başlangıç ve bitiş noktalarında orijinal boyut
          "50%": { transform: "scale(1.2)", opacity: 1 }, // Orta noktada daha büyük boyut
        },
      },
      backgroundImage: {
        inception: 'url("/inception.jpg")',
        interstellar: 'url("/interstellar.jpg")',
        lotr: 'url("/lotr.jpg")',
        joker: 'url("/joker.jpg")',
        matrix: 'url("/matrix.jpg")',
      },
    },
  },
  plugins: [],
};
