import React from 'react';
import { motion } from 'framer-motion';

const ModernPlaceholder = ({ className = '', theme = 'default', animate = true }) => {
    const themes = {
        default: {
            primary: '#3B82F6',
            secondary: '#1E40AF',
            accent: '#60A5FA'
        },
        featured: {
            primary: '#8B5CF6',
            secondary: '#4C1D95',
            accent: '#A78BFA'
        },
        blog: {
            primary: '#14B8A6',
            secondary: '#0F766E',
            accent: '#2DD4BF'
        }
    };

    const colors = themes[theme] || themes.default;

    return (
        <div className={`w-full h-full min-h-[200px] ${className}`}>
            <motion.svg
                viewBox="0 0 400 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                initial={animate ? { opacity: 0, scale: 0.9 } : {}}
                animate={animate ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
            >
                {/* Background Pattern */}
                <motion.path
                    d="M0 0h400v300H0z"
                    fill={`url(#${theme}-gradient)`}
                    initial={animate ? { pathLength: 0 } : {}}
                    animate={animate ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
                
                {/* Animated Shapes */}
                <motion.circle
                    cx="80"
                    cy="150"
                    r="30"
                    fill={colors.accent}
                    initial={animate ? { scale: 0 } : {}}
                    animate={animate ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                />
                
                <motion.rect
                    x="140"
                    y="120"
                    width="200"
                    height="20"
                    rx="10"
                    fill={colors.accent}
                    initial={animate ? { scaleX: 0 } : {}}
                    animate={animate ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                />
                
                <motion.rect
                    x="140"
                    y="160"
                    width="160"
                    height="20"
                    rx="10"
                    fill={colors.accent}
                    opacity="0.7"
                    initial={animate ? { scaleX: 0 } : {}}
                    animate={animate ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                />
                
                {/* Decorative Elements */}
                <motion.path
                    d="M20 40h40m-20 -20v40"
                    stroke={colors.accent}
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={animate ? { pathLength: 0 } : {}}
                    animate={animate ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                />
                
                <motion.path
                    d="M340 240h40m-20 -20v40"
                    stroke={colors.accent}
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={animate ? { pathLength: 0 } : {}}
                    animate={animate ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, delay: 1 }}
                />
                
                {/* Gradient Definitions */}
                <defs>
                    <linearGradient
                        id={`${theme}-gradient`}
                        x1="0"
                        y1="0"
                        x2="400"
                        y2="300"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor={colors.primary} />
                        <stop offset="100%" stopColor={colors.secondary} />
                    </linearGradient>
                </defs>
            </motion.svg>
        </div>
    );
};

export default ModernPlaceholder; 