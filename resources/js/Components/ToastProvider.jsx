import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from './Toast';

// Create context
const ToastContext = createContext(null);

// Toast provider component
export const ToastProvider = ({ children, defaultPosition = 'bottom-right' }) => {
    const [toasts, setToasts] = useState([]);

    // Add a new toast
    const addToast = useCallback((message, options = {}) => {
        const id = Math.random().toString(36).substring(2, 9);
        const toast = {
            id,
            message,
            type: options.type || 'info',
            duration: options.duration || 5000,
            position: options.position || defaultPosition,
        };

        setToasts((prevToasts) => [...prevToasts, toast]);
        return id;
    }, [defaultPosition]);

    // Remove a toast by id
    const removeToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    // Convenience methods for different toast types
    const success = useCallback((message, options = {}) => {
        return addToast(message, { ...options, type: 'success' });
    }, [addToast]);

    const error = useCallback((message, options = {}) => {
        return addToast(message, { ...options, type: 'error' });
    }, [addToast]);

    const warning = useCallback((message, options = {}) => {
        return addToast(message, { ...options, type: 'warning' });
    }, [addToast]);

    const info = useCallback((message, options = {}) => {
        return addToast(message, { ...options, type: 'info' });
    }, [addToast]);

    const primary = useCallback((message, options = {}) => {
        return addToast(message, { ...options, type: 'primary' });
    }, [addToast]);

    // Group toasts by position
    const toastsByPosition = toasts.reduce((acc, toast) => {
        const { position } = toast;
        if (!acc[position]) {
            acc[position] = [];
        }
        acc[position].push(toast);
        return acc;
    }, {});

    return (
        <ToastContext.Provider
            value={{
                addToast,
                removeToast,
                success,
                error,
                warning,
                info,
                primary
            }}
        >
            {children}
            
            {/* Render toasts grouped by position */}
            {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
                <div key={position} className="toast-container">
                    {positionToasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            message={toast.message}
                            type={toast.type}
                            duration={toast.duration}
                            position={position}
                            onClose={() => removeToast(toast.id)}
                        />
                    ))}
                </div>
            ))}
        </ToastContext.Provider>
    );
};

// Custom hook to use the toast context
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export default ToastProvider; 