import React from 'react';

export default function PrimaryButton({ type = 'submit', className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center justify-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-secondary uppercase tracking-widest hover:bg-primary-light focus:bg-primary-light active:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
            aria-disabled={disabled}
            role="button"
            tabIndex={disabled ? -1 : 0}
        >
            {children}
        </button>
    );
}
