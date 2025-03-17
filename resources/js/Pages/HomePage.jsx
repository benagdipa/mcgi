import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Slider from "react-slick";
import Modal from "@/Components/Modal";
import Card from "@/Components/Card";
import Badge from "@/Components/Badge";
import Tooltip from "@/Components/Tooltip";
import { FaPlay, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaArrowRight, FaChurch, FaHandHoldingHeart, FaCross, FaPrayingHands, FaBookOpen, FaQuoteLeft, FaQuoteRight, FaRegLightbulb, FaUsers, FaHeart, FaDove } from "react-icons/fa";
import { DateTime } from "luxon";
import { ToastProvider, useToast } from "@/Components/ToastProvider";
import Skeleton from "@/Components/Skeleton";

// Lazy load heavy components
const HomeBanner = lazy(() => import("@/Components/Home/HomeBanner"));
const UpcomingEvents = lazy(() => import("@/Components/Home/UpcomingEvents"));
const FeaturedBlogs = lazy(() => import("@/Components/Home/FeaturedBlogs"));
const AboutSection = lazy(() => import("@/Components/Home/AboutSection"));

// Bible verses for banners
const bibleVerses = [
    {
        verse: "Thus saith the LORD, Stand ye in the ways, and see, and ask for the old paths, where is the good way, and walk therein, and ye shall find rest for your souls.",
        reference: "Jeremiah 6:16",
        theme: "path",
        color: "blue",
        images: [
            "/images/about-welcome.jpg",
            "/images/events.jpg",
            "/images/contacts.jpg",
        ]
    },
    {
        verse: "For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them.",
        reference: "Ephesians 2:10",
        theme: "creation",
        color: "purple",
        images: [
            "/images/pray-video.jpg",
            "/images/contacts.jpg",
            "/images/login.jpeg",
        ]
    },
    {
        verse: "But if I tarry long, that thou mayest know how thou oughtest to behave thyself in the house of God, which is the church of the living God, the pillar and ground of the truth.",
        reference: "1 Timothy 3:15",
        theme: "church",
        color: "teal",
        images: [
            "/images/kuya-edited.jpg",
            "/images/login.jpeg",
            "/images/charity.png",
        ]
    }
];

// SVG Banner component with Bible verses
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

    // Find the corresponding verse object to get images
    const verseObject = bibleVerses.find(v => v.reference === reference) || bibleVerses[0];
    const images = verseObject.images || [];
    
    // Determine if verse should be on left or right (alternating)
    const isVerseOnLeft = index % 2 === 0;

    return (
        <div className="w-full h-[500px] relative overflow-hidden bg-gray-900">
            {/* Main content container - flex row layout */}
            <div className="flex flex-col md:flex-row h-full w-full">
                {/* Verse Section */}
                <div className={`w-full md:w-1/2 h-full relative ${isVerseOnLeft ? 'order-1 md:order-1' : 'order-1 md:order-2'}`}>
                    {/* Gradient Background */}
                    <div 
                        className="absolute inset-0 z-0" 
                        style={{ background: gradients[theme] || gradients.path }}
                    ></div>
                    
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-30 z-10">
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
                    
                    {/* Verse Text Container */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20">
                        <div className="text-center text-white max-w-xl mx-auto px-6 sm:px-8 py-8">
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 font-light italic animate-fade-in-down leading-relaxed text-shadow">
                                "{verse}"
                            </p>
                            <p className="text-lg sm:text-xl font-semibold animate-fade-in-up text-shadow mb-6">
                                {reference}
                            </p>
                            
                            {/* Contact Us Button - Now placed under the verse */}
                            <Link 
                                href={route('contact')} 
                                className="bg-white hover:bg-white/90 text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg inline-block"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Gallery Section - Masonry Style */}
                <div className={`w-full md:w-1/2 h-full relative ${isVerseOnLeft ? 'order-2 md:order-2' : 'order-2 md:order-1'}`}>
                    <div className="h-full w-full relative">
                        {/* First row - two images */}
                        <div className="absolute left-0 top-0 w-full md:w-1/2 h-2/3 p-1">
                            <div className="relative h-full w-full overflow-hidden">
                                <div 
                                    className="absolute inset-0 bg-cover bg-center" 
                                    style={{ 
                                        backgroundImage: `url(${images[0]})`,
                                        animation: `slowZoom 25s infinite alternate ease-in-out`,
                                        filter: 'contrast(1.1) brightness(0.9)'
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/40"></div>
                            </div>
                        </div>
                        
                        <div className="absolute right-0 top-0 w-full md:w-1/2 h-1/3 p-1">
                            <div className="relative h-full w-full overflow-hidden">
                                <div 
                                    className="absolute inset-0 bg-cover bg-center" 
                                    style={{ 
                                        backgroundImage: `url(${images[1]})`,
                                        animation: `slowZoom 20s 5s infinite alternate ease-in-out`,
                                        filter: 'contrast(1.1) brightness(0.9)'
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/40"></div>
                            </div>
                        </div>
                        
                        {/* Bottom row */}
                        <div className="absolute right-0 bottom-0 w-full md:w-1/2 h-2/3 p-1">
                            <div className="relative h-full w-full overflow-hidden">
                                <div 
                                    className="absolute inset-0 bg-cover bg-center" 
                                    style={{ 
                                        backgroundImage: `url(${images[2]})`,
                                        animation: `slowZoom 22s 3s infinite alternate ease-in-out`,
                                        filter: 'contrast(1.1) brightness(0.9)'
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/40"></div>
                            </div>
                        </div>
                        
                        <div className="absolute left-0 bottom-0 w-full md:w-1/2 h-1/3 p-1">
                            <div className="relative h-full w-full overflow-hidden">
                                <div 
                                    className="absolute inset-0 bg-cover bg-center" 
                                    style={{ 
                                        backgroundImage: `url(${images[0]})`,
                                        animation: `slowZoom 24s 7s infinite alternate ease-in-out`,
                                        filter: 'contrast(1.1) brightness(0.9)'
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/40"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Replace WOW animations with CSS classes
const AnimatedDiv = ({ children, className = "", delay = 0 }) => (
    <div 
        className={`animate-fade-in ${className}`} 
        style={{ 
            animationDelay: `${delay}ms`,
            opacity: 0,
            animation: 'fadeIn 1s ease forwards'
        }}
    >
        {children}
    </div>
);

export default function HomePage({ auth, posts, events, banners }) {
    const [prayModalState, setPrayModalState] = useState(false);
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        fade: true,
        accessibility: true,
        pauseOnHover: true,
        pauseOnFocus: true,
        prevArrow: <button type="button" className="slick-prev">Previous</button>,
        nextArrow: <button type="button" className="slick-next">Next</button>,
        appendDots: dots => (
            <div className="custom-slick-dots">
                <ul>{dots}</ul>
            </div>
        ),
        customPaging: i => (
            <button className="custom-paging-button">
                {i + 1}
            </button>
        ),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
    };

    const togglePrayModal = () => {
        setPrayModalState(!prayModalState);
    };

    // Add necessary CSS for the slow zoom animation and text shadow
    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
            @keyframes slowZoom {
                0% { transform: scale(1); }
                100% { transform: scale(1.2); }
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

    return (
        <GuestLayout user={auth.user}>
            <Head title="Home">
                <meta name="title" content="Members Church of God International Australia" />
                <meta name="keywords" content="Members Church of God International MCGI Australia Christian Community Australia Spiritual Guidance Biblical Teachings Christian Fellowship Religious Services Australia Christian Charity Work Bible Study Sessions Faith-Based Community" />
                <meta name="description" content="Join the Members Church of God International in Australia for spiritual growth and community service. Explore our faith-based teachings, Bible study sessions, and opportunities for Christian fellowship and charity work. Discover a welcoming community dedicated to spreading love, hope, and the teachings of the Bible." />
            </Head>
            
            <ToastProvider>
                {/* Main content with lazy-loaded components */}
                <Suspense fallback={<Skeleton type="banner" />}>
                    <HomeBanner />
                </Suspense>
                
                <Suspense fallback={<Skeleton type="section" />}>
                    <AboutSection />
                </Suspense>

                <Suspense fallback={<Skeleton type="cards" />}>
                    <UpcomingEvents events={events} />
                </Suspense>
                
                <Suspense fallback={<Skeleton type="cards" />}>
                    <FeaturedBlogs posts={posts} />
                </Suspense>

                {/* Prayer Modal */}
                <Modal
                    show={prayModalState}
                    onClose={togglePrayModal}
                    maxWidth={"5xl"}
                    title="Community Prayer"
                    showCloseButton={true}
                >
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe
                            width="100%"
                            height="620"
                            src="https://www.youtube.com/embed/uOeK-LssfiM?si=4NQc4Gc7A0BwafuY"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="rounded-lg"
                        />
                    </div>
                </Modal>
            </ToastProvider>
        </GuestLayout>
    );
}
