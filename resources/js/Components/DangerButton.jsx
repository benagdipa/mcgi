import React from 'react';

export default function DangerButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center justify-center px-4 py-2 bg-danger border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-danger/90 focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2 transition ease-in-out duration-150 ${
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
