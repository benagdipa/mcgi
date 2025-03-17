import React from 'react';
import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ method = 'get', as = 'a', href, active = false, children, className = '', ...props }) {
    return (
        <Link
            method={method}
            as={as}
            href={href}
            className={`
                w-full flex items-center px-4 py-3 text-base transition-colors duration-200 
                rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                ${active 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                } ${className}
            `}
            {...props}
        >
            {children}
        </Link>
    );
}
