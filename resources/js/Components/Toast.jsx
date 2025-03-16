import React, { useState, useEffect, Fragment } from 'react';
import { Transition } from '@headlessui/react';

const Toast = ({ 
    message, 
    type = 'info', 
    duration = 5000, 
    position = 'bottom-right',
    onClose,
    show = true
}) => {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        setIsVisible(show);
    }, [show]);

    useEffect(() => {
        if (!isVisible) return;
        
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [isVisible, duration, onClose]);

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) onClose();
    };

    // Define position classes
    const positionClasses = {
        'top-left': 'top-4 left-4',
        'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
        'top-right': 'top-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
        'bottom-right': 'bottom-4 right-4',
    };

    // Define type-specific styles
    const typeStyles = {
        info: {
            bg: 'bg-info-100 dark:bg-info-800/30',
            border: 'border-info-500',
            text: 'text-info-800 dark:text-info-200',
            icon: (
                <svg className="w-5 h-5 text-info-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
            )
        },
        success: {
            bg: 'bg-success-100 dark:bg-success-800/30',
            border: 'border-success-500',
            text: 'text-success-800 dark:text-success-200',
            icon: (
                <svg className="w-5 h-5 text-success-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            )
        },
        warning: {
            bg: 'bg-warning-100 dark:bg-warning-800/30',
            border: 'border-warning-500',
            text: 'text-warning-800 dark:text-warning-200',
            icon: (
                <svg className="w-5 h-5 text-warning-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            )
        },
        error: {
            bg: 'bg-danger-100 dark:bg-danger-800/30',
            border: 'border-danger-500',
            text: 'text-danger-800 dark:text-danger-200',
            icon: (
                <svg className="w-5 h-5 text-danger-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            )
        },
        primary: {
            bg: 'bg-primary-100 dark:bg-primary-800/30',
            border: 'border-primary-500',
            text: 'text-primary-800 dark:text-primary-200',
            icon: (
                <svg className="w-5 h-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
            )
        }
    };

    const style = typeStyles[type] || typeStyles.info;

    return (
        <Transition
            as={Fragment}
            show={isVisible}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div 
                className={`fixed ${positionClasses[position]} z-50 max-w-sm w-full shadow-lg rounded-lg pointer-events-auto overflow-hidden`}
                role="alert"
                aria-live="assertive"
            >
                <div className={`${style.bg} border-l-4 ${style.border} p-4`}>
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            {style.icon}
                        </div>
                        <div className="ml-3 flex-1">
                            <p className={`text-sm font-medium ${style.text}`}>
                                {message}
                            </p>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex">
                            <button
                                type="button"
                                className={`inline-flex ${style.text} hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                                onClick={handleClose}
                                aria-label="Close"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
};

export default Toast; 