import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");



export default withMT({
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Epilogue', ...defaultTheme.fontFamily.sans],
                tangerine: ['Tangerine', 'cursive'],
                marcellus: ['Marcellus', 'sans-serif'],
                dmsans: ['"DM Sans"', 'sans-serif'],
            },
        },
    },

    plugins: [forms],
});
