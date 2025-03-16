import React from 'react';

const MissionSVG = ({ className = "w-full h-full" }) => {
    return (
        <svg 
            viewBox="0 0 800 600" 
            className={className}
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="800" height="600" fill="#f8fafc"/>
            <path d="M200 150H600V450H200V150Z" fill="#e2e8f0"/>
            <path d="M250 200H550V400H250V200Z" fill="#cbd5e1"/>
            <path d="M300 250H500V350H300V250Z" fill="#475569"/>
            <path d="M350 275H450V325H350V275Z" fill="#f8fafc"/>
            <circle cx="400" cy="300" r="15" fill="#475569"/>
            <path d="M385 285L415 315M385 315L415 285" stroke="#f8fafc" strokeWidth="4"/>
            <path d="M150 450H650V500H150V450Z" fill="#475569"/>
            <circle cx="250" cy="475" r="10" fill="#f8fafc"/>
            <circle cx="550" cy="475" r="10" fill="#f8fafc"/>
            <animateTransform
                attributeName="transform"
                type="translate"
                dur="4s"
                values="0,0; 0,-10; 0,0"
                repeatCount="indefinite"
                additive="sum"
                calcMode="spline"
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
        </svg>
    );
};

export default MissionSVG; 