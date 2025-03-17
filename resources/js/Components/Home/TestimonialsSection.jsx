import React from "react";
import { Link } from "@inertiajs/react";
import { FaArrowRight, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export default function TestimonialsSection({ testimonials }) {
    // If no testimonials provided, use sample data
    const testimonialsData = testimonials || [
        {
            id: 1,
            name: "John Doe",
            role: "Church Member",
            content: "Being part of this community has transformed my spiritual journey. The teachings are profound and the fellowship is truly uplifting.",
            avatar: "/images/testimonials/person1.jpg"
        },
        {
            id: 2,
            name: "Mary Smith",
            role: "Volunteer",
            content: "I'm grateful for the opportunity to serve alongside such dedicated individuals. Our community outreach programs have been a blessing to many.",
            avatar: "/images/testimonials/person2.jpg"
        },
        {
            id: 3,
            name: "James Wilson",
            role: "New Member",
            content: "From the moment I first attended, I felt welcomed. The biblical teachings are clear and applicable to everyday life.",
            avatar: "/images/testimonials/person3.jpg"
        }
    ];

    return (
        <section className="cta-section py-20 bg-gradient-to-r from-primary via-primary to-primary/90 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
            
            {/* Testimonials Section */}
            <div className="max-w-screen-xl mx-auto px-6 relative z-10 mb-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Community Says</h2>
                    <p className="text-white/90 text-lg max-w-2xl mx-auto">
                        Hear from members of our community about their experiences with MCGI.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonialsData.map((testimonial) => (
                        <div 
                            key={testimonial.id} 
                            className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border-l-4 border-white flex flex-col"
                        >
                            <div className="mb-4 text-primary text-2xl">
                                <FaQuoteLeft aria-hidden="true" />
                            </div>
                            <p className="text-white mb-6 flex-grow">
                                {testimonial.content}
                            </p>
                            <div className="flex items-center mt-auto">
                                <div className="h-12 w-12 rounded-full bg-white/20 overflow-hidden mr-4">
                                    <img 
                                        src={testimonial.avatar || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'}
                                        alt={testimonial.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">{testimonial.name}</p>
                                    <p className="text-white/70 text-sm">{testimonial.role}</p>
                                </div>
                                <div className="ml-auto text-primary text-2xl">
                                    <FaQuoteRight aria-hidden="true" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* CTA Section */}
            <div className="max-w-screen-xl mx-auto px-6 relative z-10">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Community Today</h2>
                    <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
                        Be part of a welcoming community where faith is nurtured and spiritual growth is encouraged through worship, fellowship, and service.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link 
                            href={route('register')} 
                            className="bg-white hover:bg-white/90 text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                            aria-label="Join our community"
                        >
                            Join Our Community
                        </Link>
                        
                        <Link 
                            href={route('contact')} 
                            className="bg-transparent hover:bg-white/10 text-white border border-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                            aria-label="Contact us for more information"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
} 