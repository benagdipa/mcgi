import React, { useState, useRef, useEffect } from 'react';

const Tooltip = ({
    children,
    content,
    position = 'top',
    delay = 300,
    className = '',
    arrow = true,
    maxWidth = 'max-w-xs',
    theme = 'dark',
    interactive = false,
    disabled = false,
    ...props
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef(null);
    const targetRef = useRef(null);
    const timerRef = useRef(null);

    // Position classes
    const positionClasses = {
        top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
        'top-left': 'bottom-full left-0 mb-2',
        'top-right': 'bottom-full right-0 mb-2',
        'bottom-left': 'top-full left-0 mt-2',
        'bottom-right': 'top-full right-0 mt-2',
    };

    // Arrow position classes
    const arrowClasses = {
        top: 'bottom-[-6px] left-1/2 transform -translate-x-1/2 border-t-current border-l-transparent border-r-transparent border-b-transparent',
        bottom: 'top-[-6px] left-1/2 transform -translate-x-1/2 border-b-current border-l-transparent border-r-transparent border-t-transparent',
        left: 'right-[-6px] top-1/2 transform -translate-y-1/2 border-l-current border-t-transparent border-b-transparent border-r-transparent',
        right: 'left-[-6px] top-1/2 transform -translate-y-1/2 border-r-current border-t-transparent border-b-transparent border-l-transparent',
        'top-left': 'bottom-[-6px] left-2 border-t-current border-l-transparent border-r-transparent border-b-transparent',
        'top-right': 'bottom-[-6px] right-2 border-t-current border-l-transparent border-r-transparent border-b-transparent',
        'bottom-left': 'top-[-6px] left-2 border-b-current border-l-transparent border-r-transparent border-t-transparent',
        'bottom-right': 'top-[-6px] right-2 border-b-current border-l-transparent border-r-transparent border-t-transparent',
    };

    // Theme classes
    const themeClasses = {
        dark: 'bg-gray-900 text-white',
        light: 'bg-white text-gray-900 border border-gray-200',
        primary: 'bg-primary-500 text-white',
    };

    const handleMouseEnter = () => {
        if (disabled) return;
        
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setIsVisible(true);
        }, delay);
    };

    const handleMouseLeave = () => {
        if (disabled) return;
        
        clearTimeout(timerRef.current);
        if (!interactive) {
            setIsVisible(false);
        }
    };

    // Handle clicks outside the tooltip when interactive
    useEffect(() => {
        if (!interactive || !isVisible) return;

        const handleClickOutside = (event) => {
            if (
                tooltipRef.current && 
                !tooltipRef.current.contains(event.target) &&
                targetRef.current && 
                !targetRef.current.contains(event.target)
            ) {
                setIsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [interactive, isVisible]);

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
        };
    }, []);

    return (
        <div className="relative inline-block" {...props}>
            <div
                ref={targetRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="inline-block"
            >
                {children}
            </div>

            {isVisible && (
                <div
                    ref={tooltipRef}
                    role="tooltip"
                    onMouseEnter={interactive ? handleMouseEnter : undefined}
                    onMouseLeave={interactive ? handleMouseLeave : undefined}
                    className={`
                        absolute z-50 px-3 py-2 text-sm rounded-md shadow-lg
                        ${positionClasses[position]}
                        ${themeClasses[theme]}
                        ${maxWidth}
                        ${className}
                    `}
                >
                    {content}
                    
                    {arrow && (
                        <div 
                            className={`
                                absolute w-0 h-0 border-4
                                ${arrowClasses[position]}
                            `}
                            style={{ 
                                borderTopColor: theme === 'dark' ? '#111827' : theme === 'light' ? '#ffffff' : '#3B82F6',
                                borderBottomColor: theme === 'dark' ? '#111827' : theme === 'light' ? '#ffffff' : '#3B82F6',
                                borderLeftColor: theme === 'dark' ? '#111827' : theme === 'light' ? '#ffffff' : '#3B82F6',
                                borderRightColor: theme === 'dark' ? '#111827' : theme === 'light' ? '#ffffff' : '#3B82F6',
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Tooltip; 