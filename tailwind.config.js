/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                score: ['Rubik', 'sans-serif'],
                time: ['Squada One', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
