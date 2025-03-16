import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavigationEvents() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Add loading state event listeners
    const startHandler = () => setLoading(true);
    const finishHandler = () => {
      // Delay the loading state removal slightly for smoother transitions
      setTimeout(() => setLoading(false), 150);
    };

    // Progress event listeners
    router.on('start', startHandler);
    router.on('finish', finishHandler);

    // Scroll to top on navigation
    router.on('navigate', () => {
      window.scrollTo(0, 0);
    });

    return () => {
      // Clean up event listeners
      router.off('start', startHandler);
      router.off('finish', finishHandler);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-primary to-secondary"
        >
          <motion.div
            className="h-full bg-white opacity-30"
            animate={{
              width: ['0%', '40%', '60%', '80%', '100%'],
            }}
            transition={{
              duration: 1.2,
              ease: 'easeInOut',
              times: [0, 0.3, 0.5, 0.8, 1],
              repeat: Infinity,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
} 