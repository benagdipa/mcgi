import React from 'react';

const Skeleton = ({ 
    className = '', 
    variant = 'rectangular', 
    width, 
    height, 
    animation = 'pulse',
    rounded = 'md',
    count = 1
}) => {
    const baseClasses = `
        bg-gray-200 dark:bg-gray-700
        ${animation === 'pulse' ? 'animate-pulse' : animation === 'wave' ? 'animate-shimmer' : ''}
        ${variant === 'circular' ? 'rounded-full' : `rounded-${rounded}`}
    `;

    const style = {
        width: width,
        height: height,
    };

    const renderSkeleton = () => {
        return (
            <div 
                className={`${baseClasses} ${className}`}
                style={style}
                aria-hidden="true"
                role="status"
                aria-label="Loading..."
            />
        );
    };

    if (count === 1) {
        return renderSkeleton();
    }

    return (
        <div className="space-y-2">
            {[...Array(count)].map((_, index) => (
                <div key={index} className={`${baseClasses} ${className}`} style={style} aria-hidden="true" />
            ))}
        </div>
    );
};

// Predefined skeleton components
export const TextSkeleton = ({ lines = 1, className = '', ...props }) => {
    return (
        <div className="space-y-2">
            {[...Array(lines)].map((_, index) => (
                <Skeleton
                    key={index}
                    className={`h-4 ${index === lines - 1 && lines > 1 ? 'w-4/6' : 'w-full'} ${className}`}
                    {...props}
                />
            ))}
        </div>
    );
};

export const AvatarSkeleton = ({ size = 'md', className = '', ...props }) => {
    const sizeClasses = {
        xs: 'w-6 h-6',
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24',
    };

    return (
        <Skeleton
            variant="circular"
            className={`${sizeClasses[size]} ${className}`}
            {...props}
        />
    );
};

export const CardSkeleton = ({ className = '', ...props }) => {
    return (
        <div className={`space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg ${className}`}>
            <div className="flex items-center space-x-3">
                <AvatarSkeleton size="sm" />
                <TextSkeleton className="w-24" />
            </div>
            <TextSkeleton lines={3} />
            <Skeleton className="h-48 w-full" />
        </div>
    );
};

export const ButtonSkeleton = ({ width = 'w-24', className = '', ...props }) => {
    return (
        <Skeleton
            className={`h-10 ${width} ${className}`}
            rounded="md"
            {...props}
        />
    );
};

export const TableRowSkeleton = ({ columns = 4, className = '', ...props }) => {
    return (
        <div className={`flex space-x-4 ${className}`}>
            {[...Array(columns)].map((_, index) => (
                <Skeleton
                    key={index}
                    className={`h-8 ${index === 0 ? 'w-12' : 'flex-1'}`}
                    {...props}
                />
            ))}
        </div>
    );
};

export default Skeleton; 