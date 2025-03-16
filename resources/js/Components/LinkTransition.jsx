import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function LinkTransition({ href, children, className = "", preserveScroll = false, preserveState = false, ...props }) {
  return (
    <Link 
      href={href}
      className={className}
      preserveScroll={preserveScroll}
      preserveState={preserveState}
      {...props}
    >
      <motion.span
        className="inline-block"
        whileHover={{ 
          scale: 1.02, 
          transition: { duration: 0.2 } 
        }}
        whileTap={{ 
          scale: 0.98, 
          transition: { duration: 0.1 } 
        }}
      >
        {children}
      </motion.span>
    </Link>
  );
} 