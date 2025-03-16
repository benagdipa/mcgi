import React from 'react';

export default function PrimaryButton({ type = 'submit', className = '', processing, disabled, children, onClick }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`inline-flex items-center justify-center px-6 py-3 bg-primary text-secondary font-semibold text-base rounded-md shadow-sm transition duration-300 ease-in-out ${
                processing || disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-primary/90 hover:transform hover:-translate-y-0.5 hover:shadow-md active:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2'
            } ${className}`}
            disabled={processing || disabled}
            aria-disabled={processing || disabled}
        >
            {processing ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : null}
            {children}
        </button>
    );
}
