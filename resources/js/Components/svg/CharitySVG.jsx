import React from 'react';

const CharitySVG = ({ className = "w-full h-full" }) => {
    return (
        <svg 
            viewBox="0 0 800 600" 
            className={className}
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="800" height="600" fill="#f8fafc"/>
            <path d="M400 150C250 150 150 250 150 400C150 550 250 600 400 600C550 600 650 550 650 400C650 250 550 150 400 150Z" fill="#e2e8f0"/>
            <path d="M300 200C200 200 150 300 150 400C150 500 200 550 300 550C400 550 450 500 450 400C450 300 400 200 300 200Z" fill="#cbd5e1"/>
            <path d="M500 200C400 200 350 300 350 400C350 500 400 550 500 550C600 550 650 500 650 400C650 300 600 200 500 200Z" fill="#cbd5e1"/>
            <path d="M400 250L450 350H350L400 250Z" fill="#475569"/>
            <circle cx="300" cy="400" r="50" fill="#475569"/>
            <circle cx="500" cy="400" r="50" fill="#475569"/>
            <path d="M350 450C350 422.386 372.386 400 400 400C427.614 400 450 422.386 450 450V500H350V450Z" fill="#475569"/>
            <animateTransform
                attributeName="transform"
                type="rotate"
                dur="8s"
                values="0 400 400; 360 400 400"
                repeatCount="indefinite"
                additive="sum"
                calcMode="spline"
                keySplines="0.4 0 0.2 1"
            />
        </svg>
    );
};

export default CharitySVG; 