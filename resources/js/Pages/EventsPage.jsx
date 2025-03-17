import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from "framer-motion";
import Card from '@/Components/Card';
import Badge from '@/Components/Badge';
import { 
    FaCalendarAlt, 
    FaClock, 
    FaMapMarkerAlt, 
    FaBook, 
    FaPray, 
    FaChurch, 
    FaHandHoldingHeart, 
    FaPrayingHands,
    FaArrowRight
} from 'react-icons/fa';

export default function EventsPage({ auth, events = null, userData = null, isAuthenticated = false }) {
    // Regular events data - use this as fallback if no events are passed from controller
    const regularEvents = [
        {
            id: 1,
            title: "Bible Studies",
            description: "Join us for in-depth exploration of biblical teachings guided by the word of God. Our Bible studies offer a supportive environment to deepen your understanding of scripture.",
            schedule: "Mondays to Fridays",
            time: "7:00 PM",
            timezone: "Melbourne Time",
            location: "MCGI Melbourne Chapter / Online",
            icon: <FaBook className="h-6 w-6" />,
            color: "blue",
            link: "/events/bible-studies"
        },
        {
            id: 2,
            title: "Mass Indoctrination",
            description: "Our indoctrination sessions are designed for those interested in learning more about the fundamental doctrines and teachings of the Members Church of God International.",
            schedule: "Mondays to Fridays",
            time: "7:00 PM",
            timezone: "Melbourne Time",
            location: "MCGI Melbourne Chapter / Online",
            icon: <FaChurch className="h-6 w-6" />,
            color: "purple",
            link: "/events/mass-indoctrination"
        },
        {
            id: 3,
            title: "Worship Service",
            description: "Our weekly worship service is a time for communal praise, prayer, and receiving spiritual guidance through biblical teachings and messages of faith.",
            schedule: "Every Saturday",
            time: "8:00 AM",
            timezone: "Melbourne Time",
            location: "MCGI Melbourne Chapter / Online",
            icon: <FaPrayingHands className="h-6 w-6" />,
            color: "gold",
            link: "/events/worship-service"
        },
        {
            id: 4,
            title: "Prayer Meeting",
            description: "Our community prayer meetings are dedicated times for members to come together in collective prayer, offering thanks and seeking guidance from God.",
            schedule: "Every Wednesday",
            time: "7:00 PM",
            timezone: "Melbourne Time",
            location: "MCGI Melbourne Chapter / Online",
            icon: <FaPray className="h-6 w-6" />,
            color: "green",
            link: "/events/prayer-meeting"
        },
        {
            id: 5,
            title: "Thanksgiving",
            description: "Our Thanksgiving service is a special time dedicated to expressing gratitude for God's blessings and mercies in our lives, featuring songs of praise and testimonies of faith.",
            schedule: "Every Saturday",
            time: "8:00 PM",
            timezone: "Melbourne Time",
            location: "MCGI Melbourne Chapter / Online",
            icon: <FaHandHoldingHeart className="h-6 w-6" />,
            color: "red",
            link: "/events/thanksgiving"
        }
    ];

    // Use events from the controller if provided, otherwise use hardcoded events
    const displayEvents = events && events.length > 0 ? events : regularEvents;

    // SVG Background patterns for each event
    const renderSvgBackground = (color) => {
        switch(color) {
            case 'blue':
                return (
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 z-0 opacity-20">
                        <defs>
                            <pattern id="bible-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
                                <path d="M0 50 Q25 0 50 50 T100 50" stroke="currentColor" fill="none" strokeWidth="2" />
                                <path d="M0 75 Q25 25 50 75 T100 75" stroke="currentColor" fill="none" strokeWidth="2" />
                                <circle cx="12" cy="12" r="3" fill="currentColor" />
                                <circle cx="62" cy="12" r="3" fill="currentColor" />
                                <circle cx="12" cy="62" r="3" fill="currentColor" />
                                <circle cx="62" cy="62" r="3" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#bible-pattern)" />
                    </svg>
                );
            case 'purple':
                return (
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 z-0 opacity-20">
                        <defs>
                            <pattern id="indoc-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
                                <path d="M25,0 L25,100" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M50,0 L50,100" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M75,0 L75,100" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M0,25 L100,25" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M0,50 L100,50" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M0,75 L100,75" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="25" cy="25" r="4" fill="currentColor" />
                                <circle cx="75" cy="25" r="4" fill="currentColor" />
                                <circle cx="25" cy="75" r="4" fill="currentColor" />
                                <circle cx="75" cy="75" r="4" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#indoc-pattern)" />
                    </svg>
                );
            case 'gold':
                return (
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 z-0 opacity-20">
                        <defs>
                            <pattern id="worship-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
                                <path d="M50,10 L90,50 L50,90 L10,50 Z" stroke="currentColor" fill="none" strokeWidth="2" />
                                <path d="M25,25 L75,75" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M75,25 L25,75" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#worship-pattern)" />
                    </svg>
                );
            case 'green':
                return (
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 z-0 opacity-20">
                        <defs>
                            <pattern id="prayer-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
                                <path d="M20,50 C20,30 50,30 50,50 C50,70 80,70 80,50" stroke="currentColor" fill="none" strokeWidth="2" />
                                <path d="M20,30 C20,10 50,10 50,30 C50,50 80,50 80,30" stroke="currentColor" fill="none" strokeWidth="2" />
                                <path d="M20,70 C20,50 50,50 50,70 C50,90 80,90 80,70" stroke="currentColor" fill="none" strokeWidth="2" />
                                <circle cx="20" cy="50" r="3" fill="currentColor" />
                                <circle cx="80" cy="50" r="3" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#prayer-pattern)" />
                    </svg>
                );
            case 'red':
                return (
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 z-0 opacity-20">
                        <defs>
                            <pattern id="thanksgiving-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
                                <path d="M30,10 C40,30 60,30 70,10" stroke="currentColor" fill="none" strokeWidth="2" />
                                <path d="M30,90 C40,70 60,70 70,90" stroke="currentColor" fill="none" strokeWidth="2" />
                                <path d="M10,30 C30,40 30,60 10,70" stroke="currentColor" fill="none" strokeWidth="2" />
                                <path d="M90,30 C70,40 70,60 90,70" stroke="currentColor" fill="none" strokeWidth="2" />
                                <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M40,50 L60,50" stroke="currentColor" strokeWidth="2" />
                                <path d="M50,40 L50,60" stroke="currentColor" strokeWidth="2" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#thanksgiving-pattern)" />
                    </svg>
                );
            default:
                return null;
        }
    };

    // Color classes for each event type
    const colorClasses = {
        blue: 'text-blue-500 bg-blue-50 border-blue-200',
        purple: 'text-purple-500 bg-purple-50 border-purple-200',
        gold: 'text-yellow-600 bg-yellow-50 border-yellow-200',
        green: 'text-green-500 bg-green-50 border-green-200',
        red: 'text-red-500 bg-red-50 border-red-200'
    };

    return (
        <GuestLayout user={auth?.user}>
            <Head>
                <title>Church Events - MCGI</title>
                <meta name="title" content="Church Events - Members Church of God International"/>
                <meta name="keywords" content="MCGI Events, Bible Studies, Worship Service, Prayer Meeting, Thanksgiving"/>
                <meta name="description" content="Join our regular church events at Members Church of God International (MCGI) - Bible Studies, Worship Services, Prayer Meetings and more."/>
            </Head>
            
            <div className="events-page">
                {/* Header Section */}
                <div className="page-header pt-[70px] md:pt-80 pb-28 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-0"></div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto relative z-10">
                            <Badge 
                                color="warning" 
                                variant="solid" 
                                size="lg" 
                                className="mb-4"
                            >
                                Our Events
                            </Badge>
                            <h1 className='font-bold text-5xl md:text-7xl text-white mb-4'>Church Events</h1>
                            <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-6">
                                Join us for our regular church gatherings and special events designed to strengthen your faith and build community.
                            </p>
                            <div className="breadcrumbs pt-4">
                                <div className="flex gap-4 font-semibold text-white items-center">
                                    <div className="item">
                                        <Link 
                                            href={route('home')} 
                                            className="breadcrumb-link hover:text-secondary transition-colors"
                                        >
                                            HOME
                                        </Link>
                                    </div>
                                    <div className="divider text-gray-200">/</div>
                                    <div className="item">
                                        <Link 
                                            href={route('events.index')} 
                                            className="breadcrumb-link text-gray-200"
                                        >
                                            Church Events
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Regular Events Section */}
                <div className="regular-events py-16 md:py-24">
                    <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-12"
                        >
                            <Badge 
                                color="primary" 
                                variant="soft" 
                                size="lg" 
                                className="mb-4"
                            >
                                Weekly Schedule
                            </Badge>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                                Regular Church Events
                            </h2>
                            <p className="text-gray-600 max-w-3xl text-lg">
                                Our church has regular gatherings throughout the week to nurture your spiritual growth and provide opportunities for fellowship. Join us at any of these events.
                            </p>
                        </motion.div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {displayEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card
                                        className={`relative overflow-hidden border-l-4 hover:-translate-y-1 transition-all duration-300 h-full ${colorClasses[event.color].split(' ')[2]}`}
                                        hover={true}
                                    >
                                        <div className={`p-6 relative z-10 h-full flex flex-col`}>
                                            <div className={`absolute inset-0 ${colorClasses[event.color].split(' ')[1]}`}>
                                                {renderSvgBackground(event.color)}
                                            </div>
                                            
                                            <div className="flex items-center mb-4">
                                                <div className={`p-3 rounded-full ${colorClasses[event.color].split(' ')[0]} ${colorClasses[event.color].split(' ')[1]} mr-4`}>
                                                    {event.icon}
                                                </div>
                                                <h3 className="text-2xl font-bold text-gray-800">{event.title}</h3>
                                            </div>
                                            
                                            <p className="text-gray-600 mb-6 flex-grow">
                                                {event.description}
                                            </p>
                                            
                                            <div className="event-details space-y-3 mb-4">
                                                <div className="flex items-start">
                                                    <FaCalendarAlt className={`mt-1 mr-3 ${colorClasses[event.color].split(' ')[0]}`} />
                                                    <span className="text-gray-700">{event.schedule}</span>
                                                </div>
                                                <div className="flex items-start">
                                                    <FaClock className={`mt-1 mr-3 ${colorClasses[event.color].split(' ')[0]}`} />
                                                    <span className="text-gray-700">{event.time} ({event.timezone})</span>
                                                </div>
                                                <div className="flex items-start">
                                                    <FaMapMarkerAlt className={`mt-1 mr-3 ${colorClasses[event.color].split(' ')[0]}`} />
                                                    <span className="text-gray-700">{event.location}</span>
                                                </div>
                                            </div>
                                            
                                            <Link 
                                                href={event.link}
                                                className={`inline-block px-4 py-2 rounded-md text-white bg-gray-800 hover:bg-gray-700 transition-colors mt-auto self-start`}
                                            >
                                                Learn More
                                            </Link>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* CTA Section */}
                <div className="py-24">
                    <div className="max-w-screen-xl mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-gradient-to-r from-primary/90 to-primary/70 rounded-3xl p-8 md:p-12 text-center"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Join Us For Worship
                            </h2>
                            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                                We invite you to experience the love and fellowship of our church community. Come as you are and be part of our spiritual family.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center px-8 py-4 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    Get Directions
                                    <FaMapMarkerAlt className="ml-2 h-4 w-4" aria-hidden="true" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
} 