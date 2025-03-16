const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
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
                heading: ['Montserrat', ...defaultTheme.fontFamily.sans],
                body: ['DM Sans', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    DEFAULT: 'var(--primary-color)',
                    light: '#f8d43a',
                    dark: '#d4b105'
                },
                secondary: {
                    DEFAULT: 'var(--secondary-color)',
                    light: '#2a2a2a',
                    dark: '#000000'
                },
                tertiary: {
                    DEFAULT: 'var(--tertiary-color)',
                    light: '#6b6b6b',
                    dark: '#252525'
                },
                'light-gray': '#f8f9fa',
                'medium-gray': '#e9ecef',
                'dark-gray': '#343a40',
                'text-dark': '#212529',
                'text-muted': '#6c757d',
                'text-light': '#f8f9fa',
                danger: '#dc3545',
                success: '#28a745',
                warning: '#ffc107',
                info: '#17a2b8',
                'primary-light': '#e6f3ff',
                'secondary-light': '#fff9e6',
            },
            spacing: {
                xs: '0.25rem',
                sm: '0.5rem',
                md: '1rem',
                lg: '1.5rem',
                xl: '2rem',
                '2xl': '3rem',
                '3xl': '4rem',
            },
            boxShadow: {
                sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)',
                md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            borderRadius: {
                'sm': '0.25rem',
                DEFAULT: '0.375rem',
                'md': '0.375rem',
                'lg': '0.5rem',
                'xl': '0.75rem',
                'full': '9999px',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'fade-in-right': 'fadeInRight 0.5s ease-in-out',
                'fade-in-left': 'fadeInLeft 0.5s ease-in-out',
                'fade-in-up': 'fadeInUp 0.5s ease-in-out',
                'fade-in-down': 'fadeInDown 0.5s ease-in-out',
                'pulse': 'pulse 2s ease-in-out infinite',
                'bounce': 'bounce 2s ease-in-out infinite',
                'spin': 'spin 1s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInRight: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                fadeInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulse: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                },
                bounce: {
                    '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                    '40%': { transform: 'translateY(-10px)' },
                    '60%': { transform: 'translateY(-5px)' },
                },
            },
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
