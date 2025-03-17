import React, { useEffect, useState, memo } from 'react';
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaTimesCircle, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Memoize Toast component to prevent unnecessary re-renders
const Toast = memo(function Toast({ 
    message, 
    type = 'success', 
    duration = 5000, 
    position = 'bottom-right',
    onClose
}) {
    const [isVisible, setIsVisible] = useState(true);
    
    // Icons and colors for different toast types
    const toastTypes = {
        success: {
            icon: <FaCheckCircle className="h-5 w-5" />,
            bgColor: 'bg-green-50',
            borderColor: 'border-green-400',
            textColor: 'text-green-800',
            iconColor: 'text-green-500'
        },
        info: {
            icon: <FaInfoCircle className="h-5 w-5" />,
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-400',
            textColor: 'text-blue-800',
            iconColor: 'text-blue-500'
        },
        warning: {
            icon: <FaExclamationTriangle className="h-5 w-5" />,
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-400',
            textColor: 'text-yellow-800',
            iconColor: 'text-yellow-500'
        },
        error: {
            icon: <FaTimesCircle className="h-5 w-5" />,
            bgColor: 'bg-red-50',
            borderColor: 'border-red-400',
            textColor: 'text-red-800',
            iconColor: 'text-red-500'
        }
    };
    
    // Positions for toast
    const positions = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
        'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
    };
    
    // Automatically close toast after duration
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, duration);
            
            return () => clearTimeout(timer);
        }
    }, [duration]);
    
    // Call onClose when visibility changes to false
    useEffect(() => {
        if (!isVisible && onClose) {
            const timer = setTimeout(() => {
                onClose();
            }, 300); // Allow exit animation to complete
            
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);
    
    const handleClose = () => {
        setIsVisible(false);
    };
    
    const { icon, bgColor, borderColor, textColor, iconColor } = toastTypes[type] || toastTypes.info;
    const positionClasses = positions[position] || positions['bottom-right'];
    
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`fixed ${positionClasses} z-50 max-w-md`}
                    role="alert"
                    aria-live="assertive"
                >
                    <div 
                        className={`${bgColor} ${borderColor} ${textColor} border-l-4 p-4 rounded-md shadow-md flex items-start`}
                    >
                        <div className={`flex-shrink-0 ${iconColor}`}>
                            {icon}
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium">{message}</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className={`ml-4 flex-shrink-0 ${textColor} hover:${textColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                            aria-label="Close notification"
                        >
                            <FaTimes className="h-4 w-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

export default Toast; 