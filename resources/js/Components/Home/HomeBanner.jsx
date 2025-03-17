import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { usePage } from "@inertiajs/react";
import { FaPlay, FaBookOpen, FaHandHoldingHeart, FaChurch, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

// Bible verses for banners
const bibleVerses = [
    {
        verse: "Thus saith the LORD, Stand ye in the ways, and see, and ask for the old paths, where is the good way, and walk therein, and ye shall find rest for your souls.",
        reference: "Jeremiah 6:16",
        theme: "path",
        color: "blue"
    },
    {
        verse: "For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them.",
        reference: "Ephesians 2:10",
        theme: "creation",
        color: "purple"
    },
    {
        verse: "But if I tarry long, that thou mayest know how thou oughtest to behave thyself in the house of God, which is the church of the living God, the pillar and ground of the truth.",
        reference: "1 Timothy 3:15",
        theme: "church",
        color: "teal"
    }
];

const BibleVerseBanner = ({ verse, reference, theme, index, userStatus }) => {
    // Generate a stable unique ID for patterns
    const uniqueId = `${theme}-${index}`;
    
    // Array of gradient backgrounds with improved color combinations
    const gradients = {
        path: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(30, 64, 175, 0.9))',
        creation: 'linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(76, 29, 149, 0.9))',
        church: 'linear-gradient(135deg, rgba(20, 184, 166, 0.9), rgba(15, 118, 110, 0.9))'
    };
    
    // Enhanced patterns with more sophisticated designs
    const patterns = {
        path: (
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="pattern-animation">
                <defs>
                    <pattern id={`pattern-${uniqueId}`} patternUnits="userSpaceOnUse" width="200" height="200">
                        {/* Animated path representing the "old paths" */}
                        <path className="animate-draw" d="M20,100 Q50,50 100,100 T180,100" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2" fill="none"/>
                        <path className="animate-draw-delayed" d="M20,120 Q50,70 100,120 T180,120" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" fill="none"/>
                        
                        {/* Animated footsteps along the path */}
                        <g className="animate-fade-in">
                            <circle cx="40" cy="100" r="4" fill="rgba(255, 255, 255, 0.2)">
                                <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/>
                            </circle>
                            <circle cx="100" cy="100" r="4" fill="rgba(255, 255, 255, 0.2)">
                                <animate attributeName="opacity" values="0;1;0" dur="3s" begin="1s" repeatCount="indefinite"/>
                            </circle>
                            <circle cx="160" cy="100" r="4" fill="rgba(255, 255, 255, 0.2)">
                                <animate attributeName="opacity" values="0;1;0" dur="3s" begin="2s" repeatCount="indefinite"/>
                            </circle>
                        </g>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#pattern-${uniqueId})`} />
            </svg>
        ),
        creation: (
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="pattern-animation">
                <defs>
                    <pattern id={`pattern-${uniqueId}`} patternUnits="userSpaceOnUse" width="200" height="200">
                        {/* Central light burst representing creation */}
                        <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2" className="animate-pulse-slow">
                            <animate attributeName="r" values="30;50;30" dur="4s" repeatCount="indefinite"/>
                        </circle>
                        
                        {/* Radiating beams */}
                        <g className="animate-spin-slow">
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                                <line 
                                    key={i}
                                    x1="100" 
                                    y1="100" 
                                    x2={100 + 80 * Math.cos(angle * Math.PI / 180)} 
                                    y2={100 + 80 * Math.sin(angle * Math.PI / 180)} 
                                    stroke="rgba(255, 255, 255, 0.1)" 
                                    strokeWidth="1"
                                >
                                    <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite"/>
                                </line>
                            ))}
                        </g>
                        
                        {/* Small stars representing workmanship */}
                        <g className="animate-twinkle">
                            {[...Array(12)].map((_, i) => {
                                const x = 40 + (i % 4) * 40;
                                const y = 40 + Math.floor(i / 4) * 40;
                                return (
                                    <path 
                                        key={i}
                                        d="M0,-4 L1,-1 L4,0 L1,1 L0,4 L-1,1 L-4,0 L-1,-1 Z" 
                                        transform={`translate(${x}, ${y})`}
                                        fill="rgba(255, 255, 255, 0.2)"
                                    >
                                        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite"/>
                                    </path>
                                );
                            })}
                        </g>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#pattern-${uniqueId})`} />
            </svg>
        ),
        church: (
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="pattern-animation">
                <defs>
                    <pattern id={`pattern-${uniqueId}`} patternUnits="userSpaceOnUse" width="200" height="200">
                        {/* Church building outline */}
                        <path 
                            className="animate-draw" 
                            d="M70,120 L70,80 L100,60 L130,80 L130,120 Z" 
                            stroke="rgba(255, 255, 255, 0.15)" 
                            strokeWidth="2" 
                            fill="none"
                        />
                        <path 
                            className="animate-draw-delayed" 
                            d="M85,120 L85,90 L100,75 L115,90 L115,120" 
                            stroke="rgba(255, 255, 255, 0.1)" 
                            strokeWidth="1" 
                            fill="none"
                        />
                        
                        {/* Pillars of truth */}
                        <g className="animate-rise">
                            <rect x="60" y="100" width="4" height="40" fill="rgba(255, 255, 255, 0.15)">
                                <animate attributeName="height" values="0;40" dur="2s" fill="freeze"/>
                            </rect>
                            <rect x="136" y="100" width="4" height="40" fill="rgba(255, 255, 255, 0.15)">
                                <animate attributeName="height" values="0;40" dur="2s" fill="freeze"/>
                            </rect>
                        </g>
                        
                        {/* Light rays representing living truth */}
                        <g className="animate-pulse-slow">
                            {[...Array(8)].map((_, i) => {
                                const angle = (i * 45) * Math.PI / 180;
                                return (
                                    <line 
                                        key={i}
                                        x1="100" 
                                        y1="90" 
                                        x2={100 + 30 * Math.cos(angle)} 
                                        y2={90 + 30 * Math.sin(angle)} 
                                        stroke="rgba(255, 255, 255, 0.1)" 
                                        strokeWidth="1"
                                    >
                                        <animate 
                                            attributeName="opacity" 
                                            values="0.1;0.3;0.1" 
                                            dur="3s" 
                                            begin={`${i * 0.2}s`} 
                                            repeatCount="indefinite"
                                        />
                                    </line>
                                );
                            })}
                        </g>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#pattern-${uniqueId})`} />
            </svg>
        )
    };
    
    // Icons for the different themes
    const icons = {
        path: <FaBookOpen size={60} className="text-white/70" />,
        creation: <FaHandHoldingHeart size={60} className="text-white/70" />,
        church: <FaChurch size={60} className="text-white/70" />
    };

    return (
        <div className="relative h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center overflow-hidden">
            {/* Background with gradient and SVG pattern */}
            <div 
                className="absolute inset-0 z-0" 
                style={{ background: gradients[theme] || gradients.path }}
            ></div>
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-50 z-10">
                {patterns[theme] || patterns.path}
            </div>
            
            {/* Icon */}
            <div className="absolute bottom-0 right-0 opacity-30 transform translate-x-1/4 translate-y-1/4 z-10">
                {icons[theme] || icons.path}
            </div>
            
            {/* Quote Icons */}
            <div className="absolute left-0 top-0 opacity-20 transform -translate-x-1/4 -translate-y-1/4 z-10">
                <FaQuoteLeft size={60} className="text-white/30" />
            </div>
            <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4 z-10">
                <FaQuoteRight size={60} className="text-white/30" />
            </div>
            
            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 relative z-20 py-10 sm:py-16">
                <div className="max-w-3xl">
                    <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 sm:mb-6 text-shadow">
                        <span className="text-white">Members Church</span> of God International
                    </h1>
                    <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg border-l-4 border-white mb-6 sm:mb-8">
                        <p className="text-white text-lg sm:text-xl md:text-2xl italic mb-2 text-shadow">
                            "{verse}"
                        </p>
                        <p className="text-white font-semibold text-base sm:text-lg text-shadow">
                            {reference}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="https://www.youtube.com/c/MCGIChannel"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto bg-white hover:bg-white/90 text-primary/90 px-5 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center group"
                            aria-label="Watch MCGI Channel on YouTube"
                        >
                            Watch Live
                            <span className="ml-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all">
                                <FaPlay className="h-3 w-3" aria-hidden="true" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function HomeBanner() {
    const { auth } = usePage().props;
    const [userStatus, setUserStatus] = useState(null);

    useEffect(() => {
        if (auth?.user) {
            if (auth?.user?.role?.name === 'guest' || auth?.user?.role?.name === 'Guest') {
                setUserStatus('guest');
            } else {
                setUserStatus('member');
            }
        } else {
            setUserStatus('visitor');
        }
    }, [auth]);
    
    // Add CSS for animations
    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
            @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            
            .animate-fade-in {
                animation: fadeIn 1.5s ease forwards;
            }
            
            @keyframes draw {
                0% { stroke-dashoffset: 1000; }
                100% { stroke-dashoffset: 0; }
            }
            
            .animate-draw {
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: draw 3s ease forwards;
            }
            
            .animate-draw-delayed {
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: draw 3s ease 0.5s forwards;
            }
            
            @keyframes spinSlow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .animate-spin-slow {
                animation: spinSlow 30s linear infinite;
                transform-origin: center;
            }
            
            @keyframes pulseSlow {
                0% { transform: scale(1); opacity: 0.7; }
                50% { transform: scale(1.05); opacity: 1; }
                100% { transform: scale(1); opacity: 0.7; }
            }
            
            .animate-pulse-slow {
                animation: pulseSlow 4s ease-in-out infinite;
            }
            
            .text-shadow {
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            }
        `;
        document.head.appendChild(styleSheet);
        
        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []);

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        pauseOnHover: true,
        arrows: false,
        swipeToSlide: true,
        accessibility: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true,
                    autoplaySpeed: 5000,
                }
            }
        ]
    };

    return (
        <section className="hero-section">
            <div className="slider-container">
                <Slider {...settings}>
                    {bibleVerses.map((verse, index) => (
                        <div key={index} className="slider-item h-full relative" data-focus-guard="true">
                            <div className="w-full h-full">
                                <BibleVerseBanner
                                    verse={verse.verse}
                                    reference={verse.reference}
                                    theme={verse.theme}
                                    index={index}
                                    userStatus={userStatus}
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
} 