import React from 'react';

export default function InputLabel({ value, className = '', children, required = false, htmlFor, ...props }) {
    return (
        <label 
            htmlFor={htmlFor} 
            className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
            {...props}
        >
            {value || children}
            {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
        </label>
    );
}
