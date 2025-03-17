import React from 'react';

// Memoize the Skeleton component to prevent unnecessary re-renders
const Skeleton = React.memo(({ type = "text", count = 1, className = "" }) => {
    // Generate skeleton based on type
    const renderSkeleton = () => {
        switch (type) {
            case "banner":
                return (
                    <div className="w-full animate-pulse">
                        <div className="bg-gray-200 h-[500px] rounded-md"></div>
                    </div>
                );
            
            case "section":
                return (
                    <div className="w-full animate-pulse">
                        <div className="h-6 w-24 bg-gray-200 rounded mb-4"></div>
                        <div className="h-10 w-64 bg-gray-200 rounded mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="h-64 bg-gray-200 rounded"></div>
                            <div>
                                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                                <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                                <div className="h-10 w-32 bg-gray-200 rounded mt-8"></div>
                            </div>
                        </div>
                    </div>
                );
            
            case "cards":
                return (
                    <div className="w-full animate-pulse">
                        <div className="flex justify-between mb-8">
                            <div>
                                <div className="h-6 w-24 bg-gray-200 rounded mb-2"></div>
                                <div className="h-10 w-48 bg-gray-200 rounded"></div>
                            </div>
                            <div className="h-6 w-20 bg-gray-200 rounded"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="rounded-lg overflow-hidden bg-white shadow">
                                    <div className="h-48 bg-gray-200"></div>
                                    <div className="p-4">
                                        <div className="h-4 bg-gray-200 rounded mb-3"></div>
                                        <div className="h-6 bg-gray-200 rounded mb-3"></div>
                                        <div className="h-4 bg-gray-200 rounded mb-3"></div>
                                        <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                                        <div className="h-5 bg-gray-200 rounded w-1/3 mt-6"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            
            case "text":
            default:
                return (
                    <div className="animate-pulse">
                        {[...Array(count)].map((_, i) => (
                            <div key={i} className={`h-4 bg-gray-200 rounded mb-2 ${i === count - 1 ? "w-3/4" : "w-full"}`}></div>
                        ))}
                    </div>
                );
        }
    };

    return (
        <div 
            className={`skeleton ${className}`} 
            role="status" 
            aria-busy="true" 
            aria-label="Loading content"
        >
            {renderSkeleton()}
            <span className="sr-only">Loading...</span>
        </div>
    );
});

Skeleton.displayName = 'Skeleton';

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