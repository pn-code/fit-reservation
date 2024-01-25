/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["var(--font-roboto)"],
            },
            colors: {
                primary: "#0F170E",
                secondary: "#465569",
                accent: "#F59E0B",
            },
        },
    },
    plugins: [],
};
