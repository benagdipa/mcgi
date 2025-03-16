import React from 'react';

export default function Card({ 
    children, 
    className = '', 
    variant = 'default', 
    hover = false, 
    shadowed = true,
    ...props 
}) {
    const variantClasses = {
        default: 'bg-white',
        primary: 'bg-primary-light border-l-4 border-primary',
        secondary: 'bg-secondary-light border-l-4 border-secondary',
        success: 'bg-green-50 border-l-4 border-success',
        danger: 'bg-red-50 border-l-4 border-danger',
        info: 'bg-blue-50 border-l-4 border-info',
        warning: 'bg-yellow-50 border-l-4 border-warning',
    };

    const hoverClasses = hover ? 'transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg' : '';
    const shadowClasses = shadowed ? 'shadow-md' : '';

    return (
        <div 
            className={`
                rounded-lg overflow-hidden ${variantClasses[variant]} ${hoverClasses} ${shadowClasses} ${className}
            `}
            {...props}
        >
            {children}
        </div>
    );
}

// Optional Card subcomponents for better organization
Card.Header = function CardHeader({ children, className = '', ...props }) {
    return (
        <div className={`mb-4 pb-4 border-b ${className}`} {...props}>
            {children}
        </div>
    );
};

Card.Title = function CardTitle({ children, className = '', ...props }) {
    return (
        <h3 className={`text-xl font-bold text-gray-800 ${className}`} {...props}>
            {children}
        </h3>
    );
};

Card.Subtitle = function CardSubtitle({ children, className = '', ...props }) {
    return (
        <p className={`text-sm text-gray-600 mt-1 ${className}`} {...props}>
            {children}
        </p>
    );
};

Card.Body = function CardBody({ children, className = '', ...props }) {
    return (
        <div className={`${className}`} {...props}>
            {children}
        </div>
    );
};

Card.Footer = function CardFooter({ children, className = '', ...props }) {
    return (
        <div className={`mt-4 pt-4 border-t ${className}`} {...props}>
            {children}
        </div>
    );
}; 