import { Link, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState } from 'react';
import WOW from 'react-wow';
import Card from '@/Components/Card';
import Badge from '@/Components/Badge';
import { FaGlobe, FaServer, FaCodeBranch, FaTools, FaArrowRight } from 'react-icons/fa';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <GuestLayout user={auth?.user}>
            <Head title="Welcome to MCGI" />
            <div className="welcome-page">
                <div className="hero-section relative py-20 md:py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-0"></div>
                    <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern-bg.png')] bg-repeat z-0"></div>
                    
                    <WOW animation="fadeIn">
                        <div className="container mx-auto px-6 relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                                <div className="text-content">
                                    <Badge 
                                        color="warning" 
                                        variant="solid" 
                                        size="lg" 
                                        className="mb-4"
                                    >
                                        Welcome to MCGI
                                    </Badge>
                                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                                        Members Church of God International
                                    </h1>
                                    <p className="text-lg text-white/90 mb-8 max-w-xl">
                                        Join our growing community of believers who are committed to understanding and living by God's words, helping others, and spreading faith worldwide.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <Link
                                            href={route('about')}
                                            className="px-6 py-3 bg-white text-primary font-semibold rounded-md hover:bg-white/90 transition duration-300 shadow-md hover:shadow-lg"
                                        >
                                            Learn More
                                        </Link>
                                        {auth.user ? (
                                            <Link
                                                href={route('dashboard')}
                                                className="px-6 py-3 bg-secondary text-white font-semibold rounded-md hover:bg-secondary/90 transition duration-300 shadow-md hover:shadow-lg"
                                            >
                                                Dashboard
                                            </Link>
                                        ) : (
                                            <Link
                                                href={route('login')}
                                                className="px-6 py-3 bg-secondary text-white font-semibold rounded-md hover:bg-secondary/90 transition duration-300 shadow-md hover:shadow-lg"
                                            >
                                                Get Started
                                            </Link>
                                        )}
                                    </div>
                                </div>
                                <div className="image-content flex justify-center lg:justify-end">
                                    <img 
                                        src="/images/mcgi-globe.png" 
                                        alt="MCGI Worldwide" 
                                        className="max-w-full h-auto rounded-lg shadow-xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </WOW>
                </div>
                
                <div className="features-section py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <WOW animation="fadeIn">
                            <div className="text-center mb-16">
                                <Badge 
                                    color="primary" 
                                    variant="solid" 
                                    className="mb-4"
                                >
                                    Our Focus
                                </Badge>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                    What Makes MCGI Special
                                </h2>
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                    Our church is founded on biblical principles, emphasizing the importance of understanding God's words through careful study and reflection.
                                </p>
                            </div>
                        </WOW>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <WOW animation="fadeInUp" delay="0.1s">
                                <Card className="p-6 text-center h-full flex flex-col border-none hover:shadow-lg transition-shadow duration-300">
                                    <div className="icon-container mb-4 flex justify-center">
                                        <div className="bg-primary/10 p-4 rounded-full">
                                            <FaGlobe className="text-primary text-3xl" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">Global Community</h3>
                                    <p className="text-gray-600 mb-4 flex-grow">
                                        Join believers from around the world united by faith and commitment to biblical teachings.
                                    </p>
                                    <Link
                                        href={route('about')}
                                        className="flex items-center justify-center text-primary font-medium gap-2 mt-auto hover:text-primary/80 transition-colors"
                                    >
                                        Learn More <FaArrowRight className="text-sm" />
                                    </Link>
                                </Card>
                            </WOW>
                            
                            <WOW animation="fadeInUp" delay="0.2s">
                                <Card className="p-6 text-center h-full flex flex-col border-none hover:shadow-lg transition-shadow duration-300">
                                    <div className="icon-container mb-4 flex justify-center">
                                        <div className="bg-secondary/10 p-4 rounded-full">
                                            <FaServer className="text-secondary text-3xl" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">Biblical Teaching</h3>
                                    <p className="text-gray-600 mb-4 flex-grow">
                                        Discover in-depth exploration of scripture through comprehensive Bible studies and teachings.
                                    </p>
                                    <Link
                                        href={route('about')}
                                        className="flex items-center justify-center text-secondary font-medium gap-2 mt-auto hover:text-secondary/80 transition-colors"
                                    >
                                        Learn More <FaArrowRight className="text-sm" />
                                    </Link>
                                </Card>
                            </WOW>
                            
                            <WOW animation="fadeInUp" delay="0.3s">
                                <Card className="p-6 text-center h-full flex flex-col border-none hover:shadow-lg transition-shadow duration-300">
                                    <div className="icon-container mb-4 flex justify-center">
                                        <div className="bg-success/10 p-4 rounded-full">
                                            <FaCodeBranch className="text-success text-3xl" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">Community Service</h3>
                                    <p className="text-gray-600 mb-4 flex-grow">
                                        Participate in charity works and community service to help those in need around the world.
                                    </p>
                                    <Link
                                        href={route('about')}
                                        className="flex items-center justify-center text-success font-medium gap-2 mt-auto hover:text-success/80 transition-colors"
                                    >
                                        Learn More <FaArrowRight className="text-sm" />
                                    </Link>
                                </Card>
                            </WOW>
                            
                            <WOW animation="fadeInUp" delay="0.4s">
                                <Card className="p-6 text-center h-full flex flex-col border-none hover:shadow-lg transition-shadow duration-300">
                                    <div className="icon-container mb-4 flex justify-center">
                                        <div className="bg-warning/10 p-4 rounded-full">
                                            <FaTools className="text-warning text-3xl" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">Modern Resources</h3>
                                    <p className="text-gray-600 mb-4 flex-grow">
                                        Access our digital library, live broadcasts, and online community through modern technology.
                                    </p>
                                    <Link
                                        href={route('about')}
                                        className="flex items-center justify-center text-warning font-medium gap-2 mt-auto hover:text-warning/80 transition-colors"
                                    >
                                        Learn More <FaArrowRight className="text-sm" />
                                    </Link>
                                </Card>
                            </WOW>
                        </div>
                    </div>
                </div>
                
                <div className="join-section py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <WOW animation="fadeInLeft">
                                <div className="image-content">
                                    <img 
                                        src="/images/community.jpg" 
                                        alt="Join our community" 
                                        className="w-full h-auto rounded-lg shadow-xl"
                                    />
                                </div>
                            </WOW>
                            
                            <WOW animation="fadeInRight">
                                <div className="text-content">
                                    <Badge 
                                        color="success" 
                                        variant="solid" 
                                        className="mb-4"
                                    >
                                        Join Us
                                    </Badge>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                        Become Part of Our Community
                                    </h2>
                                    <p className="text-gray-600 mb-6">
                                        MCGI welcomes everyone seeking to understand God's words and looking for a supportive community of believers. Join us in prayer, fellowship, and service as we grow in faith together.
                                    </p>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-success/10 p-2 rounded-full">
                                                <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-700">Weekly prayer meetings and Bible studies</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <div className="bg-success/10 p-2 rounded-full">
                                                <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-700">Community outreach and charity programs</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <div className="bg-success/10 p-2 rounded-full">
                                                <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-700">Digital resources and online fellowship</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-8">
                                        {auth.user ? (
                                            <Link
                                                href={route('dashboard')}
                                                className="px-8 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition duration-300 shadow-md hover:shadow-lg"
                                            >
                                                Go to Dashboard
                                            </Link>
                                        ) : (
                                            <Link
                                                href={route('register')}
                                                className="px-8 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition duration-300 shadow-md hover:shadow-lg"
                                            >
                                                Join Today
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </WOW>
                        </div>
                    </div>
                </div>
                
                <div className="cta-section py-16 bg-gray-900 text-white">
                    <div className="container mx-auto px-6 text-center">
                        <WOW animation="fadeIn">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your spiritual journey?</h2>
                            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                Join thousands of members worldwide who have found community, purpose and spiritual growth through MCGI.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href={route('contact')}
                                    className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-100 transition duration-300"
                                >
                                    Contact Us
                                </Link>
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="px-8 py-3 bg-secondary text-white font-semibold rounded-md hover:bg-secondary/90 transition duration-300"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="px-8 py-3 bg-secondary text-white font-semibold rounded-md hover:bg-secondary/90 transition duration-300"
                                    >
                                        Sign In
                                    </Link>
                                )}
                            </div>
                            <div className="mt-8 text-sm text-gray-400">
                                MCGI © {new Date().getFullYear()} | Laravel v{laravelVersion} (PHP v{phpVersion})
                            </div>
                        </WOW>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
