import React from "react";
import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { FaArrowRight, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser, FaBook, FaChurch, FaQuestion, FaPhone, FaRegHandshake } from "react-icons/fa";
import Card from "@/Components/Card";
import Badge from "@/Components/Badge";
import WOW from "react-wow";

export default function VisitorGuide({ auth, upcomingEvents, locations }) {
    // Helper function for formatting event dates
    function formatDateRange(start_date_str, end_date_str) {
        const startDateObj = new Date(start_date_str);
        const endDateObj = new Date(end_date_str);
        const startDateFormat = startDateObj.toLocaleString("default", {
            month: "long",
            day: "numeric",
        });
        const endDateFormat = endDateObj.toLocaleString("default", {
            month: "long",
            day: "numeric",
        });
        const startTimeFormat = startDateObj.toLocaleString("default", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        const endTimeFormat = endDateObj.toLocaleString("default", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        if (startDateObj.toDateString() === endDateObj.toDateString()) {
            return `${startDateFormat} @ ${startTimeFormat} - ${endTimeFormat}`;
        } else {
            return `${startDateFormat} @ ${startTimeFormat} - ${endDateFormat} @ ${endTimeFormat}`;
        }
    }

    return (
        <GuestLayout user={auth?.user}>
            <Head title="New Visitor Guide">
                <meta name="title" content="New Visitor Guide - MCGI Australia" />
                <meta name="description" content="Welcome to MCGI Australia. This guide will help new visitors understand what we offer and how to get involved in our community." />
            </Head>

            {/* Hero Section */}
            <div className="relative bg-primary text-white py-24 md:py-32">
                <div className="max-w-screen-xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <WOW animation="fadeIn">
                            <div>
                                <Badge color="warning" variant="solid" size="lg" className="mb-4">
                                    Welcome
                                </Badge>
                                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                                    New Visitor Guide
                                </h1>
                                <p className="text-xl mb-8 text-white/90">
                                    Welcome to Members Church of God International (MCGI) Australia. 
                                    This guide will help you navigate our community and learn about
                                    what we offer to visitors and members.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href={route("register")}
                                        className="bg-white text-primary px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg"
                                    >
                                        Join Our Community
                                    </Link>
                                    <Link
                                        href={route("contact")}
                                        className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-primary"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </WOW>
                        <WOW animation="fadeIn" delay="0.3s">
                            <div className="hidden lg:block">
                                <img 
                                    src="/images/welcome.jpg" 
                                    alt="Welcome to MCGI" 
                                    className="rounded-lg shadow-xl"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://placehold.co/600x400?text=Welcome+to+MCGI";
                                    }}
                                />
                            </div>
                        </WOW>
                    </div>
                </div>
            </div>

            {/* Access Options Section */}
            <div className="py-20 bg-white">
                <div className="max-w-screen-xl mx-auto px-6">
                    <WOW animation="fadeIn">
                        <div className="text-center mb-16">
                            <Badge color="primary" variant="soft" size="lg" className="mb-4">
                                How It Works
                            </Badge>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                                What You Can Access
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                As a visitor to our site, you have access to various public resources.
                                Members enjoy additional benefits and features.
                            </p>
                        </div>
                    </WOW>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <WOW animation="fadeInUp" delay="0.1s">
                            <Card className="border-none shadow-lg rounded-xl h-full" hover={true}>
                                <div className="p-6">
                                    <div className="bg-primary/10 text-primary p-3 rounded-full inline-block mb-4">
                                        <FaUser size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">Visitor Access</h3>
                                    <ul className="space-y-3 text-gray-600">
                                        <li className="flex items-start">
                                            <FaArrowRight size={16} className="mt-1 mr-2 text-primary" />
                                            <span>Browse public events and announcements</span>
                                        </li>
                                        <li className="flex items-start">
                                            <FaArrowRight size={16} className="mt-1 mr-2 text-primary" />
                                            <span>Read spiritual articles and blogs</span>
                                        </li>
                                        <li className="flex items-start">
                                            <FaArrowRight size={16} className="mt-1 mr-2 text-primary" />
                                            <span>View gallery photos of church activities</span>
                                        </li>
                                        <li className="flex items-start">
                                            <FaArrowRight size={16} className="mt-1 mr-2 text-primary" />
                                            <span>Contact church leadership</span>
                                        </li>
                                    </ul>
                                </div>
                            </Card>
                        </WOW>

                        <WOW animation="fadeInUp" delay="0.2s">
                            <Card className="border-none shadow-lg rounded-xl h-full" hover={true}>
                                <div className="p-6">
                                    <div className="bg-blue-500/10 text-blue-500 p-3 rounded-full inline-block mb-4">
                                        <FaRegHandshake size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">Non-Member Benefits</h3>
                                    <ul className="space-y-3 text-gray-600">
                                        <li className="flex items-start">
                                            <FaArrowRight size={16} className="mt-1 mr-2 text-blue-500" />
                                            <span>Create an account to track events</span>
                                        </li>
                                        <li className="flex items-start">
                                            <FaArrowRight size={16} className="mt-1 mr-2 text-blue-500" />
                                            <span>Register for community events</span>
                                        </li>
                                        <li className="flex items-start">
                                            <FaArrowRight size={16} className="mt-1 mr-2 text-blue-500" />
                                            <span>Receive email updates (optional)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <FaArrowRight size={16} className="mt-1 mr-2 text-blue-500" />
                                            <span>Submit prayer requests</span>
                                        </li>
                                    </ul>
                                    <div className="mt-6">
                                        <Link
                                            href={route("register")}
                                            className="inline-flex items-center font-semibold text-blue-500"
                                        >
                                            Register for an account <FaArrowRight className="ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        </WOW>

                        <WOW animation="fadeInUp" delay="0.3s">
                            <Card className="border-none shadow-lg rounded-xl h-full bg-gray-50" hover={true}>
                                <div className="p-6">
                                    <div className="bg-green-500/10 text-green-500 p-3 rounded-full inline-block mb-4">
                                        <FaChurch size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">Full Member Access</h3>
                                    <ul className="space-y-3 text-gray-600">
                                        <li className="flex items-start">
                                            <FaArrowRight size={16} className="mt-1 mr-2 text-green-500" />
                                            <span>All visitor and non-member benefits</span>
                                        </li>
                                        <li className="flex items-start">
                                            <FaArrowRight size={16} className="mt-1 mr-2 text-green-500" />
                                            <span>Access to member-only events</span>
                                        </li>
                                        <li className="flex items-start">
                                            <FaArrowRight size={16} className="mt-1 mr-2 text-green-500" />
                                            <span>Personalized dashboard</span>
                                        </li>
                                        <li className="flex items-start">
                                            <FaArrowRight size={16} className="mt-1 mr-2 text-green-500" />
                                            <span>Direct communication with church leadership</span>
                                        </li>
                                    </ul>
                                    <div className="mt-6">
                                        <p className="text-sm text-gray-500 mb-2">
                                            To become a full member, please register and contact us.
                                        </p>
                                        <Link
                                            href={route("contact")}
                                            className="inline-flex items-center font-semibold text-green-500"
                                        >
                                            Learn about membership <FaArrowRight className="ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        </WOW>
                    </div>
                </div>
            </div>

            {/* Quick Links Section */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-screen-xl mx-auto px-6">
                    <WOW animation="fadeIn">
                        <div className="text-center mb-16">
                            <Badge color="primary" variant="soft" size="lg" className="mb-4">
                                Navigate
                            </Badge>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                                Quick Links
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Find what you're looking for with these helpful shortcuts
                            </p>
                        </div>
                    </WOW>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <WOW animation="fadeInUp" delay="0.1s">
                            <Link href={route("about")}>
                                <Card className="text-center py-6 px-4 border-none shadow-md rounded-xl h-full hover:shadow-xl transition-all duration-300" hover={true}>
                                    <div className="bg-primary/10 text-primary p-4 rounded-full inline-block mb-4">
                                        <FaBook size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold">About Us</h3>
                                    <p className="text-gray-600 mt-2">Learn about our mission and beliefs</p>
                                </Card>
                            </Link>
                        </WOW>

                        <WOW animation="fadeInUp" delay="0.2s">
                            <Link href={route("events.index")}>
                                <Card className="text-center py-6 px-4 border-none shadow-md rounded-xl h-full hover:shadow-xl transition-all duration-300" hover={true}>
                                    <div className="bg-primary/10 text-primary p-4 rounded-full inline-block mb-4">
                                        <FaCalendarAlt size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold">Events</h3>
                                    <p className="text-gray-600 mt-2">Browse upcoming church events</p>
                                </Card>
                            </Link>
                        </WOW>

                        <WOW animation="fadeInUp" delay="0.3s">
                            <Link href="/blogs">
                                <Card className="text-center py-6 px-4 border-none shadow-md rounded-xl h-full hover:shadow-xl transition-all duration-300" hover={true}>
                                    <div className="bg-primary/10 text-primary p-4 rounded-full inline-block mb-4">
                                        <FaQuestion size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold">Articles</h3>
                                    <p className="text-gray-600 mt-2">Read our latest spiritual articles</p>
                                </Card>
                            </Link>
                        </WOW>

                        <WOW animation="fadeInUp" delay="0.4s">
                            <Link href={route("contact")}>
                                <Card className="text-center py-6 px-4 border-none shadow-md rounded-xl h-full hover:shadow-xl transition-all duration-300" hover={true}>
                                    <div className="bg-primary/10 text-primary p-4 rounded-full inline-block mb-4">
                                        <FaPhone size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold">Contact</h3>
                                    <p className="text-gray-600 mt-2">Get in touch with our team</p>
                                </Card>
                            </Link>
                        </WOW>
                    </div>
                </div>
            </div>

            {/* Upcoming Events Section */}
            {upcomingEvents && upcomingEvents.length > 0 && (
                <div className="py-20 bg-white">
                    <div className="max-w-screen-xl mx-auto px-6">
                        <WOW animation="fadeIn">
                            <div className="text-center mb-16">
                                <Badge color="primary" variant="soft" size="lg" className="mb-4">
                                    Upcoming
                                </Badge>
                                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                                    Join Us at These Events
                                </h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    You're invited to our upcoming church gatherings and activities
                                </p>
                            </div>
                        </WOW>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {upcomingEvents.map((event, index) => (
                                <WOW key={event.id} animation="fadeInUp" delay={`${0.1 * (index + 1)}s`}>
                                    <Card className="border-none shadow-lg rounded-xl overflow-hidden h-full" hover={true}>
                                        {event.featured_image && (
                                            <img 
                                                src={event.featured_image} 
                                                alt={event.title} 
                                                className="w-full h-48 object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://placehold.co/600x400?text=Event";
                                                }}
                                            />
                                        )}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                                            <div className="flex items-center mb-2">
                                                <FaCalendarAlt className="text-primary mr-2" />
                                                <span className="text-gray-600">
                                                    {formatDateRange(event.start_date, event.end_date)}
                                                </span>
                                            </div>
                                            {event.location && (
                                                <div className="flex items-center mb-4">
                                                    <FaMapMarkerAlt className="text-primary mr-2" />
                                                    <span className="text-gray-600">{event.location}</span>
                                                </div>
                                            )}
                                            <p className="text-gray-600 mb-6">
                                                {event.short_description?.substring(0, 100)}
                                                {event.short_description?.length > 100 ? '...' : ''}
                                            </p>
                                            <Link
                                                href={route("events.show", event.id)}
                                                className="inline-flex items-center font-semibold text-primary"
                                            >
                                                View Event Details <FaArrowRight className="ml-2" />
                                            </Link>
                                        </div>
                                    </Card>
                                </WOW>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link
                                href={route("events.index")}
                                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300"
                            >
                                View All Events
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Locations Section */}
            {locations && locations.length > 0 && (
                <div className="py-20 bg-gray-50">
                    <div className="max-w-screen-xl mx-auto px-6">
                        <WOW animation="fadeIn">
                            <div className="text-center mb-16">
                                <Badge color="primary" variant="soft" size="lg" className="mb-4">
                                    Locations
                                </Badge>
                                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                                    Visit Us In Person
                                </h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    Find the MCGI location nearest to you
                                </p>
                            </div>
                        </WOW>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {locations.map((location, index) => (
                                <WOW key={location.id} animation="fadeInUp" delay={`${0.1 * (index + 1)}s`}>
                                    <Card className="border-none shadow-lg rounded-xl overflow-hidden" hover={true}>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-3">{location.name}</h3>
                                            <div className="text-gray-600 mb-4">
                                                <p>{location.address}</p>
                                                {location.city && location.state && (
                                                    <p>{location.city}, {location.state} {location.postal_code}</p>
                                                )}
                                            </div>
                                            {location.phone && (
                                                <div className="mb-2">
                                                    <span className="font-semibold">Phone:</span> {location.phone}
                                                </div>
                                            )}
                                            {location.email && (
                                                <div className="mb-4">
                                                    <span className="font-semibold">Email:</span> {location.email}
                                                </div>
                                            )}
                                            {location.google_map_url && (
                                                <a
                                                    href={location.google_map_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center font-semibold text-primary"
                                                >
                                                    View on Map <FaArrowRight className="ml-2" />
                                                </a>
                                            )}
                                        </div>
                                    </Card>
                                </WOW>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Final CTA Section */}
            <div className="py-24 bg-primary text-white">
                <div className="max-w-screen-xl mx-auto px-6">
                    <WOW animation="fadeIn">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                                Ready to Join Our Community?
                            </h2>
                            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
                                We invite you to become part of our growing church family. 
                                Register to get started or contact us if you have any questions.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <Link
                                    href={route("register")}
                                    className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg"
                                >
                                    Join Our Community
                                </Link>
                                <Link
                                    href={route("contact")}
                                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-primary"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </WOW>
                </div>
            </div>
        </GuestLayout>
    );
} 