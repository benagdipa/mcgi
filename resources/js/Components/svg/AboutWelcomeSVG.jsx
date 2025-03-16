import React from 'react';

const AboutWelcomeSVG = ({ className = "w-full h-full" }) => {
    return (
        <svg 
            viewBox="0 0 800 600" 
            className={className}
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="800" height="600" fill="#f8fafc"/>
            <path d="M400 100C250 100 150 200 150 350C150 500 250 550 400 550C550 550 650 500 650 350C650 200 550 100 400 100Z" fill="#e2e8f0"/>
            <path d="M400 150C280 150 200 230 200 350C200 470 280 500 400 500C520 500 600 470 600 350C600 230 520 150 400 150Z" fill="#cbd5e1"/>
            <path d="M385 250H415V450H385V250Z" fill="#475569"/>
            <path d="M300 300H500V330H300V300Z" fill="#475569"/>
            <circle cx="400" cy="200" r="40" fill="#475569"/>
            <path d="M250 400C250 372.386 272.386 350 300 350H500C527.614 350 550 372.386 550 400V450H250V400Z" fill="#475569"/>
            <path d="M320 380H480V410H320V380Z" fill="#f8fafc"/>
            <circle cx="400" cy="200" r="25" fill="#f8fafc"/>
            <animateTransform
                attributeName="transform"
                type="scale"
                dur="4s"
                values="1;1.05;1"
                repeatCount="indefinite"
                additive="sum"
                calcMode="spline"
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
        </svg>
    );
};

export default AboutWelcomeSVG; 