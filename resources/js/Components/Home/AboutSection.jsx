import React from "react";
import { Link, usePage } from "@inertiajs/react";
import Badge from "@/Components/Badge";
import { FaArrowRight } from "react-icons/fa";

export default function AboutSection() {
    const { auth } = usePage().props;
    const userStatus = auth?.user?.role?.name === 'guest' || auth?.user?.role?.name === 'Guest' 
        ? 'guest' 
        : (auth?.user ? 'member' : 'visitor');

    return (
        <section className="welcome-section py-12 md:py-20">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="text-content">
                        <Badge 
                            color="primary" 
                            variant="soft" 
                            size="lg" 
                            className="mb-4"
                        >
                            Welcome
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-tertiary">
                            Welcome to <span className="text-primary">MCGI Australia</span>
                        </h1>
                        <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                            Join our community where faith is nurtured, and spirituality flourishes. 
                            Our congregation is united by a shared belief in the teachings of Jesus 
                            Christ and a commitment to spreading His message of faith, hope and love.
                        </p>
                        <div className="flex flex-wrap gap-3 sm:gap-4">
                            <Link
                                href={route("about")}
                                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-5 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center group"
                            >
                                About Us
                                <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                            
                            {userStatus === 'visitor' && (
                                <Link
                                    href={route("visitor.guide")}
                                    className="w-full sm:w-auto bg-white border border-primary text-primary px-5 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-primary/5 text-center"
                                >
                                    Visitor Guide
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="image-content mt-8 md:mt-0">
                        <div className="rounded-2xl overflow-hidden shadow-xl relative group">
                            <img 
                                src="/images/about-welcome.jpg" 
                                alt="MCGI Community" 
                                className="w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
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
            
            {/* Features Section */}
            <div className="features-section py-12 md:py-20 bg-gray-50 mt-12 md:mt-20">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10 md:mb-12">
                        <Badge 
                            color="primary" 
                            variant="soft" 
                            size="lg" 
                            className="mb-3"
                        >
                            Our Community
                        </Badge>
                        <h2 className="text-2xl sm:text-3xl font-bold text-tertiary">Experience Faith, Hope & Love</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center h-full">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13c-1.168-.775-2.754-1.253-4.5-1.253-1.746 0-3.332.478-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Biblical Teachings</h3>
                            <p className="text-gray-600">Discover profound insights through our Bible-based teachings that connect ancient wisdom to modern life.</p>
                        </div>
                        
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center h-full">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/10 text-secondary mb-4">
                                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Vibrant Fellowship</h3>
                            <p className="text-gray-600">Join a welcoming community where meaningful connections and supportive relationships flourish.</p>
                        </div>
                        
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center h-full">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Community Service</h3>
                            <p className="text-gray-600">Participate in outreach initiatives that extend compassion and practical support to those in need.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 