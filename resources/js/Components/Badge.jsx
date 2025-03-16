import React from 'react';

const Badge = ({
    children,
    color = 'primary',
    variant = 'solid',
    size = 'md',
    rounded = 'full',
    className = '',
    dot = false,
    icon = null,
    ...props
}) => {
    // Color variants
    const colorVariants = {
        primary: {
            solid: 'bg-primary-500 text-white',
            outline: 'bg-transparent text-primary-500 border border-primary-500',
            soft: 'bg-primary-100 text-primary-800 dark:bg-primary-800/30 dark:text-primary-200',
        },
        secondary: {
            solid: 'bg-secondary-500 text-white',
            outline: 'bg-transparent text-secondary-500 border border-secondary-500',
            soft: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800/30 dark:text-secondary-200',
        },
        success: {
            solid: 'bg-success-500 text-white',
            outline: 'bg-transparent text-success-500 border border-success-500',
            soft: 'bg-success-100 text-success-800 dark:bg-success-800/30 dark:text-success-200',
        },
        danger: {
            solid: 'bg-danger-500 text-white',
            outline: 'bg-transparent text-danger-500 border border-danger-500',
            soft: 'bg-danger-100 text-danger-800 dark:bg-danger-800/30 dark:text-danger-200',
        },
        warning: {
            solid: 'bg-warning-500 text-white',
            outline: 'bg-transparent text-warning-500 border border-warning-500',
            soft: 'bg-warning-100 text-warning-800 dark:bg-warning-800/30 dark:text-warning-200',
        },
        info: {
            solid: 'bg-info-500 text-white',
            outline: 'bg-transparent text-info-500 border border-info-500',
            soft: 'bg-info-100 text-info-800 dark:bg-info-800/30 dark:text-info-200',
        },
        gray: {
            solid: 'bg-gray-500 text-white',
            outline: 'bg-transparent text-gray-500 border border-gray-500',
            soft: 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-200',
        },
    };

    // Size variants
    const sizeVariants = {
        xs: 'text-xs px-1.5 py-0.5',
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-0.5',
        lg: 'text-sm px-3 py-1',
        xl: 'text-base px-3.5 py-1.5',
    };

    // Dot size variants
    const dotSizeVariants = {
        xs: 'w-1.5 h-1.5',
        sm: 'w-2 h-2',
        md: 'w-2.5 h-2.5',
        lg: 'w-3 h-3',
        xl: 'w-3.5 h-3.5',
    };

    // If it's a dot badge, render just the dot
    if (dot) {
        return (
            <span 
                className={`
                    inline-block ${dotSizeVariants[size]} rounded-full
                    ${colorVariants[color]?.solid || colorVariants.primary.solid}
                    ${className}
                `}
                {...props}
            />
        );
    }

    return (
        <span
            className={`
                inline-flex items-center justify-center
                ${sizeVariants[size]}
                ${colorVariants[color]?.[variant] || colorVariants.primary[variant]}
                rounded-${rounded}
                font-medium
                ${className}
            `}
            {...props}
        >
            {icon && <span className="mr-1">{icon}</span>}
            {children}
        </span>
    );
};

export default Badge; 