import React from 'react';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';

export default function TransitionLayout({ children, pageKey }) {
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={pageKey}>
        {children}
      </PageTransition>
    </AnimatePresence>
  );
} 