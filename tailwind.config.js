/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.vue"],
    theme: {
        fontFamily: {
            "theme-heading": ["'Exo 2'", "sans-serif"],
            "theme-content": ["Alegreya Sans", "sans-serif"],
        },
        extend: {
            colors: {
                "theme-primary": "#81cc5c",
                "theme-secondary": "#b1fa57",
                "theme-grayish-blue": "#93a191",
                "theme-dark-blue": "rgb(37, 70, 38)",
                "theme-dark-blue-tp": "rgba(38, 70, 37, 0.9)",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
