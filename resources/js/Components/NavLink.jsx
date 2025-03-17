import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function NavLink({ href, active = false, children, className = '', ...props }) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center px-4 py-2 border-b-2 text-base font-medium leading-5 transition duration-150 ease-in-out focus:outline-none focus:border-primary focus:ring focus:ring-primary/30 ${
                active
                    ? 'border-primary text-primary font-semibold'
                    : 'border-transparent text-gray-900 hover:text-primary hover:border-gray-300'
            } ${className}`}
            {...props}
        >
            <motion.span
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {children}
            </motion.span>
        </Link>
    );
}
