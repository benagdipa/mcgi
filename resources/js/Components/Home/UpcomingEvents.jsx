import React from "react";
import { Link } from "@inertiajs/react";
import Badge from "@/Components/Badge";
import Card from "@/Components/Card";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { useToast } from "@/Components/ToastProvider";

export default function UpcomingEvents({ events }) {
    const toast = useToast();

    if (!events || events.length === 0) {
        return null;
    }

    const showEventNotification = (eventTitle) => {
        toast.info(`Event reminder: ${eventTitle}`, {
            duration: 5000,
            position: 'bottom-right'
        });
    };

    return (
        <section className="events-section py-12 md:py-20" aria-labelledby="upcoming-events-heading">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 sm:mb-10">
                    <div>
                        <Badge 
                            color="secondary" 
                            variant="soft" 
                            size="lg" 
                            className="mb-3"
                        >
                            Events
                        </Badge>
                        <h2 id="upcoming-events-heading" className="text-2xl sm:text-3xl font-bold text-tertiary">Upcoming Events</h2>
                    </div>
                    <Link
                        href={route('events.index')}
                        className="text-primary font-semibold flex items-center hover:underline mt-4 sm:mt-0"
                        aria-label="View all events"
                    >
                        View All
                        <FaArrowRight className="ml-2" size={14} aria-hidden="true" />
                    </Link>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                            <div className="p-4 sm:p-5 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold mb-2 sm:mb-3 text-tertiary">{event.title}</h3>
                                <p className="text-gray-600 mb-3 sm:mb-4 flex-1">
                                    {event.description ? 
                                        (event.description.length > 120 ? 
                                            `${event.description.substring(0, 120)}...` : 
                                            event.description) : 
                                        'Join us for this special event!'}
                                </p>
                                
                                {event.location && (
                                    <div className="flex items-center text-gray-500 mb-3 sm:mb-4">
                                        <FaMapMarkerAlt className="mr-2 text-primary" aria-hidden="true" />
                                        <span>{event.location}</span>
                                    </div>
                                )}
                                
                                <Link
                                    href={route("events.show", event.id)}
                                    className="inline-flex items-center text-primary font-semibold mt-auto w-full sm:w-auto justify-center sm:justify-start"
                                    onClick={() => showEventNotification(event.title)}
                                    aria-label={`View details for ${event.title}`}
                                >
                                    Event Details
                                    <FaArrowRight className="ml-2" size={14} aria-hidden="true" />
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
} 