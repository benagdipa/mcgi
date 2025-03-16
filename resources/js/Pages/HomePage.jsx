import React, { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "@/Components/Modal";
import Card from "@/Components/Card";
import Badge from "@/Components/Badge";
import Tooltip from "@/Components/Tooltip";
import { FaPlay, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaArrowRight, FaChurch, FaHandHoldingHeart, FaCross, FaPrayingHands, FaBookOpen, FaQuoteLeft, FaQuoteRight, FaRegLightbulb, FaUsers, FaHeart, FaDove } from "react-icons/fa";
import { DateTime } from "luxon";
import { ToastProvider, useToast } from "@/Components/ToastProvider";

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
    
    var settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        pauseOnHover: true,
        fade: true,
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false,
                    dots: true
                }
            },
            {
                breakpoint: 640,
                settings: {
                    arrows: false,
                    dots: true,
                    autoplaySpeed: 5000
                }
            }
        ],
        appendDots: (dots) => (
            <div className="custom-dots">
                <ul className="flex justify-center gap-2"> {dots} </ul>
            </div>
        ),
        customPaging: () => (
            <div className="dot w-2 h-2 sm:w-3 sm:h-3 bg-white/50 rounded-full hover:bg-white/70 transition-all"></div>
        ),
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
        <ToastProvider>
            <HomePageContent 
                auth={auth} 
                posts={posts} 
                events={events} 
                banners={banners} 
                prayModalState={prayModalState} 
                togglePrayModal={togglePrayModal}
                settings={settings}
            />
        </ToastProvider>
    );
}

function HomePageContent({ 
    auth, 
    posts, 
    events, 
    banners, 
    prayModalState, 
    togglePrayModal, 
    settings 
}) {
    const toast = useToast();
    const [userStatus, setUserStatus] = useState(null);

    // Determine user status: member, guest (logged-in guest), or visitor (not logged in)
    useEffect(() => {
        if (auth?.user) {
            if (auth?.role?.name === 'guest' || auth?.role?.name === 'Guest') {
                setUserStatus('guest');
            } else {
                setUserStatus('member');
            }
        } else {
            setUserStatus('visitor');
        }
    }, [auth]);

    const showEventNotification = (eventTitle) => {
        toast.info(`Event reminder: ${eventTitle}`, {
            duration: 5000,
            position: 'bottom-right'
        });
    };

    // Format date for events display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true 
        });
    };

    return (
        <GuestLayout user={auth?.user}>
            <Head title="Home">
                <meta name="title" content="Members Church of God International Australia" />
                <meta name="keywords" content="Members Church of God International MCGI Australia Christian Community Australia Spiritual Guidance Biblical Teachings Christian Fellowship Religious Services Australia Christian Charity Work Bible Study Sessions Faith-Based Community" />
                <meta name="description" content="Join the Members Church of God International in Australia for spiritual growth and community service. Explore our faith-based teachings, Bible study sessions, and opportunities for Christian fellowship and charity work. Discover a welcoming community dedicated to spreading love, hope, and the teachings of the Bible." />
            </Head>
            
            <div className="homepage-content">
                {/* Hero Section with Bible Verse Banners */}
                <section className="hero-section">
                    <div className="slider-container">
                        <Slider {...settings}>
                            {bibleVerses.map((verse, index) => (
                                <div key={index} className="slider-item h-full relative">
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

                {/* Welcome Section - Simplified */}
                <section className="welcome-section py-20">
                    <div className="max-w-screen-xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="text-content">
                                <Badge 
                                    color="primary" 
                                    variant="soft" 
                                    size="lg" 
                                    className="mb-4"
                                >
                                    Welcome
                                </Badge>
                                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-tertiary">
                                    Welcome to <span className="text-primary">MCGI Australia</span>
                                </h1>
                                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                    Join our community where faith is nurtured, and spirituality flourishes. 
                                    Our congregation is united by a shared belief in the teachings of Jesus 
                                    Christ and a commitment to spreading His message of faith, hope and love.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href={route("about")}
                                        className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center group"
                                    >
                                        About Us
                                        <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>
                                    
                                    {userStatus === 'visitor' && (
                                        <Link
                                            href={route("visitor.guide")}
                                            className="bg-white border border-primary text-primary px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-primary/5"
                                        >
                                            Visitor Guide
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <div className="image-content">
                                <div className="rounded-2xl overflow-hidden shadow-xl relative group">
                                    <img 
                                        src="/images/about-welcome.jpg" 
                                        alt="MCGI Community" 
                                        className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/about/community.jpg';
                                            // If both images fail, use a church icon as fallback
                                            e.target.onerror = () => {
                                                e.target.onerror = null;
                                                e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="%230077cc" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>';
                                            };
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                        <div className="p-6 text-white">
                                            <p className="text-lg font-semibold">Join us in worship and fellowship</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Next Service Card */}
                <section className="service-info py-10 bg-gray-50">
                    <div className="max-w-screen-xl mx-auto px-6">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="grid md:grid-cols-3">
                                <div className="bg-primary/10 p-8 flex flex-col justify-center">
                                    <h2 className="text-2xl font-bold text-primary mb-2">Next Service</h2>
                                    <p className="text-xl font-semibold mb-1">Sunday Worship</p>
                                    <p className="text-gray-600">10:00 AM - 12:00 PM</p>
                                    <div className="mt-6">
                                        <Link
                                            href={route('events.index')}
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        >
                                            View All Events <FaArrowRight className="ml-2" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col justify-center border-l border-r border-gray-100">
                                    <h2 className="text-2xl font-bold text-tertiary mb-2">Join Our Prayer</h2>
                                    <p className="text-gray-600 mb-4">Connect with our community in prayer at scheduled times throughout the week.</p>
                                    <button
                                        onClick={togglePrayModal}
                                        className="inline-flex items-center text-primary font-semibold"
                                    >
                                        Prayer Schedule
                                        <FaArrowRight className="ml-2" size={14} />
                                    </button>
                                </div>
                                <div className="bg-primary/5 p-8 flex flex-col justify-center">
                                    <h2 className="text-2xl font-bold text-tertiary mb-2">Location</h2>
                                    <p className="text-gray-600 mb-1">123 Faith Street</p>
                                    <p className="text-gray-600 mb-4">Sydney, NSW 2000</p>
                                    <a 
                                        href="https://maps.google.com" 
                                        target="_blank" 
                                        className="inline-flex items-center text-primary font-semibold"
                                    >
                                        Get Directions
                                        <FaArrowRight className="ml-2" size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Events Section */}
                {events && events.length > 0 && (
                    <section className="events-section py-20">
                        <div className="max-w-screen-xl mx-auto px-6">
                            <div className="flex justify-between items-end mb-10">
                                <div>
                                    <Badge 
                                        color="secondary" 
                                        variant="soft" 
                                        size="lg" 
                                        className="mb-3"
                                    >
                                        Events
                                    </Badge>
                                    <h2 className="text-3xl font-bold text-tertiary">Upcoming Events</h2>
                                </div>
                                <Link
                                    href={route('events.index')}
                                    className="text-primary font-semibold flex items-center hover:underline"
                                >
                                    View All
                                    <FaArrowRight className="ml-2" size={14} />
                                </Link>
                            </div>
                            
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {events.slice(0, 3).map((event, index) => (
                                    <Card 
                                        key={index}
                                        className="overflow-hidden border-none shadow-lg rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full"
                                        hover={true}
                                    >
                                        <div className="bg-gradient-to-r from-primary to-primary/80 p-4 text-white">
                                            <p className="text-lg font-semibold">{new Date(event.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                                            <p className="text-sm opacity-90">{new Date(event.start_date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col">
                                            <h3 className="text-xl font-bold mb-3 text-tertiary">{event.title}</h3>
                                            <p className="text-gray-600 mb-4 flex-1">
                                                {event.description ? 
                                                    (event.description.length > 120 ? 
                                                        `${event.description.substring(0, 120)}...` : 
                                                        event.description) : 
                                                    'Join us for this special event!'}
                                            </p>
                                            
                                            {event.location && (
                                                <div className="flex items-center text-gray-500 mb-4">
                                                    <FaMapMarkerAlt className="mr-2 text-primary" />
                                                    <span>{event.location}</span>
                                                </div>
                                            )}
                                            
                                            <Link
                                                href={route("events.show", event.id)}
                                                className="inline-flex items-center text-primary font-semibold mt-auto"
                                                onClick={() => showEventNotification(event.title)}
                                            >
                                                Event Details
                                                <FaArrowRight className="ml-2" size={14} />
                                            </Link>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Three Columns - Key Features */}
                <section className="features-section py-20 bg-gray-50">
                    <div className="max-w-screen-xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <Badge 
                                color="primary" 
                                variant="soft" 
                                size="lg" 
                                className="mb-3"
                            >
                                Our Community
                            </Badge>
                            <h2 className="text-3xl font-bold text-tertiary">Experience Faith, Hope & Love</h2>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                                    <FaBookOpen size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Biblical Teachings</h3>
                                <p className="text-gray-600">Discover profound insights through our Bible-based teachings that connect ancient wisdom to modern life.</p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-4">
                                    <FaUsers size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Vibrant Fellowship</h3>
                                <p className="text-gray-600">Join a welcoming community where meaningful connections and supportive relationships flourish.</p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                                    <FaHandHoldingHeart size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Community Service</h3>
                                <p className="text-gray-600">Participate in outreach initiatives that extend compassion and practical support to those in need.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Latest Articles Section - Simplified */}
                {posts && posts.length > 0 && (
                    <section className="blogs-section py-20">
                        <div className="max-w-screen-xl mx-auto px-6">
                            <div className="flex justify-between items-end mb-10">
                                <div>
                                    <Badge 
                                        color="primary" 
                                        variant="soft" 
                                        size="lg" 
                                        className="mb-3"
                                    >
                                        Blog
                                    </Badge>
                                    <h2 className="text-3xl font-bold text-tertiary">Latest Articles</h2>
                                </div>
                                <Link
                                    href="/blogs"
                                    className="text-primary font-semibold flex items-center hover:underline"
                                >
                                    View All
                                    <FaArrowRight className="ml-2" size={14} />
                                </Link>
                            </div>
                            
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.slice(0, 3).map((post) => {
                                    const date = DateTime.fromISO(post?.created_at, { zone: "utc" });
                                    return (
                                        <Card 
                                            key={post?.id}
                                            className="overflow-hidden border-none shadow-lg rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full flex flex-col"
                                            hover={true}
                                        >
                                            <Link
                                                href={route("blogs.show", post.slug)}
                                                className="block overflow-hidden h-48"
                                            >
                                                <img
                                                    src={post?.featured_image || "/images/blog-placeholder.jpg"}
                                                    alt={post?.title}
                                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 24 24" fill="none" stroke="%230077cc" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polygon points="10 9 9 9 8 9"></polygon></svg>';
                                                    }}
                                                />
                                            </Link>
                                            
                                            <div className="p-5 flex-grow flex flex-col">
                                                <div className="flex items-center text-gray-500 text-sm mb-3">
                                                    <FaCalendarAlt className="mr-1 text-primary" />
                                                    {date.toFormat('LLL dd, yyyy')}
                                                </div>

                                                {post.category && (
                                                    <Badge 
                                                        color="secondary" 
                                                        variant="light"
                                                        className="mb-2 self-start"
                                                    >
                                                        {post.category.name}
                                                    </Badge>
                                                )}
                                                
                                                <Link
                                                    href={route("blogs.show", post.slug)}
                                                    className="block mb-3"
                                                >
                                                    <h3 className="text-lg font-bold text-tertiary hover:text-primary transition-colors">
                                                        {post?.title}
                                                    </h3>
                                                </Link>
                                                
                                                <p className="text-gray-600 mb-4 flex-grow text-sm">
                                                    {post.excerpt || post.content?.replace(/<[^>]+>/g, '').substring(0, 100) + '...'}
                                                </p>
                                                
                                                <Link
                                                    href={route("blogs.show", post.slug)}
                                                    className="inline-flex items-center text-primary font-semibold mt-auto"
                                                >
                                                    Read More
                                                    <FaArrowRight className="ml-2" size={14} />
                                                </Link>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* Join Us CTA */}
                <section className="cta-section py-20 bg-gradient-to-r from-primary via-primary to-primary/90 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="ctaPattern" patternUnits="userSpaceOnUse" width="100" height="100" patternTransform="rotate(10)">
                                    <line x1="0" y1="0" x2="100" y2="0" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                                    <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
                                    <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                                    <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#ctaPattern)" />
                        </svg>
                    </div>
                    <div className="max-w-screen-xl mx-auto px-6 relative z-10">
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Community Today</h2>
                            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
                                Be part of a welcoming community where faith is nurtured and spiritual growth is encouraged through worship, fellowship, and service.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                {userStatus === 'visitor' && (
                                    <Link 
                                        href={route('register')} 
                                        className="bg-white hover:bg-white/90 text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        Join Our Community
                                    </Link>
                                )}
                                
                                <Link 
                                    href={route('contact')} 
                                    className="bg-transparent hover:bg-white/10 text-white border border-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

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
            </div>
        </GuestLayout>
    );
}
