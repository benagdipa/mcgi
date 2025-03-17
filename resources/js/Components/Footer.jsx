import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaArrowRight } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from '@inertiajs/react'
import { motion } from 'framer-motion';

export default function Footer() {
    const currentRoute = route().current()
    const hideFooter = ['login', 'register','password.request']
    const currentYear = new Date().getFullYear();
    
    // Add safe route checks
    const hasRoute = (name) => {
        try {
            return route().has(name);
        } catch (error) {
            console.error(`Route '${name}' not found:`, error);
            return false;
        }
    };

    const getRoute = (name) => {
        try {
            return route(name);
        } catch (error) {
            console.error(`Error getting route '${name}':`, error);
            return '/';
        }
    };
    
    return (
        <React.Fragment>
            {!hideFooter.includes(currentRoute) && (
                <footer className="bg-[#1a1a1a]">
                    <div className="w-full">
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto py-10 sm:py-12 md:py-16 lg:py-20">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-5 text-center sm:text-left"
                                >
                                    <div className="widget-title">
                                        <h2 className='text-white font-bold text-2xl mb-3'>Contact Us</h2>
                                    </div>
                                    <div className="widget-content">
                                        <ul className="space-y-3">
                                            <li>
                                                <a href="mailto:info@mcgi.org.au" 
                                                   className="flex items-center text-gray-300 hover:text-white transition-colors group mx-auto sm:mx-0 w-fit sm:w-auto"
                                                >
                                                    <div className="icon-box p-1.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                                                        <AiOutlineMail size={18} />
                                                    </div>
                                                    <div className="content pl-3">
                                                        info@mcgi.org.au
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="tel:+61450780530" 
                                                   className="flex items-center text-gray-300 hover:text-white transition-colors group mx-auto sm:mx-0 w-fit sm:w-auto"
                                                >
                                                    <div className="icon-box p-1.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                                                        <FaPhoneAlt size={16} />
                                                    </div>
                                                    <div className="content pl-3">
                                                        +61 450 780 530
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <div className="flex items-start text-gray-300 group mx-auto sm:mx-0 w-fit sm:w-auto">
                                                    <div className="icon-box p-1.5 mt-0.5 rounded-lg bg-white/5">
                                                        <FaMapMarkerAlt size={16} />
                                                    </div>
                                                    <div className="content pl-3 text-center sm:text-left">
                                                        Unit 5, 230 Blackshaws Rd,<br /> 
                                                        Altona North 3025 Victoria
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="space-y-5 text-center sm:text-left"
                                >
                                    <div className="widget-title">
                                        <h2 className='text-white font-bold text-2xl mb-3'>Quick Links</h2>
                                    </div>
                                    <div className="widget-content">
                                        <ul className='space-y-2 flex flex-col items-center sm:items-start'>
                                            <li>
                                                <Link 
                                                    href={hasRoute('about') ? route('about') : '/about-us'}
                                                    className="text-gray-300 hover:text-white transition-colors inline-flex items-center group"
                                                >
                                                    <FaArrowRight className="mr-2 text-sm opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                                    About Us
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    href={hasRoute('privacy-and-policy') ? route('privacy-and-policy') : '/privacy-policy'}
                                                    className="text-gray-300 hover:text-white transition-colors inline-flex items-center group"
                                                >
                                                    <FaArrowRight className="mr-2 text-sm opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                                    Privacy Policy
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    href={hasRoute('contact') ? route('contact') : '/contact-us'}
                                                    className="text-gray-300 hover:text-white transition-colors inline-flex items-center group"
                                                >
                                                    <FaArrowRight className="mr-2 text-sm opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                                    Contact Us
                                                </Link>
                                            </li>
                                        </ul>
                                    </div> 
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="space-y-5 text-center sm:text-left"
                                >
                                    <div className="widget-title">
                                        <h2 className='text-white font-bold text-2xl mb-3'>Connect with us</h2>
                                    </div>
                                    <div className="widget-content">
                                        <div className="flex gap-3 justify-center sm:justify-start">
                                            <a 
                                                href="https://www.facebook.com/MCGI.org/" 
                                                target='_blank'
                                                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#1877F2] flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300"
                                                aria-label="Follow us on Facebook"
                                            >
                                                <FaFacebook size={20} />
                                            </a>
                                            <a 
                                                href="https://twitter.com/mcgidotorg" 
                                                target='_blank'
                                                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#1DA1F2] flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300"
                                                aria-label="Follow us on Twitter"
                                            >
                                                <FaTwitter size={20} />
                                            </a>
                                            <a 
                                                href="https://www.youtube.com/mcgichannel" 
                                                target='_blank'
                                                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#FF0000] flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300"
                                                aria-label="Subscribe to our YouTube channel"
                                            >
                                                <FaYoutube size={20} />
                                            </a>
                                            <a 
                                                href="https://www.instagram.com/mcgidotorg/" 
                                                target='_blank'
                                                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#E4405F] flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300"
                                                aria-label="Follow us on Instagram"
                                            >
                                                <FaInstagram size={20} />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10">
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-4 text-center sm:text-left">
                                <div className="text-gray-400 text-sm">
                                    &copy; {currentYear} MCGI Australia. All Rights Reserved.
                                </div>
                                <div className="text-gray-400 text-sm text-center sm:text-right">
                                    Designed & Developed by <a href="#" className="text-white hover:text-primary transition-colors">MCGI Dev Team</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            )}
        </React.Fragment>
    )
}
