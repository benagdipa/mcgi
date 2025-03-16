import React from 'react';

const DiscoverCardSVG = ({ className = "w-full h-full", theme = "default" }) => {
    const themes = {
        history: {
            primary: "#3b82f6",
            secondary: "#60a5fa",
            accent: "#93c5fd"
        },
        belief: {
            primary: "#8b5cf6",
            secondary: "#a78bfa",
            accent: "#c4b5fd"
        },
        ministries: {
            primary: "#10b981",
            secondary: "#34d399",
            accent: "#6ee7b7"
        },
        services: {
            primary: "#f59e0b",
            secondary: "#fbbf24",
            accent: "#fcd34d"
        },
        propagation: {
            primary: "#ef4444",
            secondary: "#f87171",
            accent: "#fca5a5"
        },
        religious: {
            primary: "#6366f1",
            secondary: "#818cf8",
            accent: "#a5b4fc"
        },
        default: {
            primary: "#475569",
            secondary: "#64748b",
            accent: "#94a3b8"
        }
    };

    const colors = themes[theme] || themes.default;

    return (
        <svg 
            viewBox="0 0 400 300" 
            className={className}
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="400" height="300" fill="#f8fafc"/>
            <path d="M50 50H350V250H50V50Z" fill={colors.accent}/>
            <path d="M75 75H325V225H75V75Z" fill={colors.secondary}/>
            <path d="M100 100H300V200H100V100Z" fill={colors.primary}/>
            <circle cx="200" cy="150" r="30" fill="#f8fafc"/>
            <path d="M185 135H215V165H185V135Z" fill={colors.primary}/>
            <path d="M170 150H230V180H170V150Z" fill={colors.primary}/>
            <animateTransform
                attributeName="transform"
                type="scale"
                dur="3s"
                values="1;1.05;1"
                repeatCount="indefinite"
                additive="sum"
                calcMode="spline"
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
        </svg>
    );
};

export default DiscoverCardSVG; 