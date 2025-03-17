import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaCog, FaUser } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import ApplicationLogo from './ApplicationLogo';
import { motion } from 'framer-motion';
import NavLink from '@/Components/NavLink';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ToastProvider from '@/Components/ToastProvider';

export default function Header({ user }) {
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { url, component } = usePage();
    
    // Desktop or mobile view
    const [isMobile, setIsMobile] = useState(false);

    // Handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        // Detect mobile view
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Run once on component mount
        handleResize();
        
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Handle mobile menu toggle
    const handleToggle = () => {
        setToggle(!toggle);
        // Prevent body scrolling when menu is open
        if (!toggle) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    return (
        <React.Fragment>
            {/* Top Bar - Only visible on desktop */}
            {!isMobile && (
                <div className="top-bar bg-primary text-white py-2">
                    <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-sm md:text-base">Welcome to MCGI Australia!</span>
                            </div>

                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-4">
                                    <a href="mailto:info@mcgi.org.au" className="text-white hover:text-gray-200 transition">
                                        <AiOutlineMail className="inline mr-1" /> info@mcgi.org.au
                                    </a>
                                    <a href="tel:+61450780530" className="text-white hover:text-gray-200 transition">
                                        <FaPhone className="inline mr-1" /> +61 450 780 530
                                    </a>
                                </div>
                                <div className="hidden md:flex items-center space-x-3">
                                    <a href="https://www.facebook.com/MCGI.org/" target="_blank" aria-label="Visit our Facebook page" className="text-white hover:text-gray-200 transition">
                                        <FaFacebook />
                                    </a>
                                    <a href="https://twitter.com/mcgidotorg" target="_blank" aria-label="Visit our Twitter page" className="text-white hover:text-gray-200 transition">
                                        <FaTwitter />
                                    </a>
                                    <a href="https://www.youtube.com/mcgichannel" target="_blank" aria-label="Visit our YouTube channel" className="text-white hover:text-gray-200 transition">
                                        <FaYoutube />
                                    </a>
                                    <a href="https://www.instagram.com/mcgidotorg/" target="_blank" aria-label="Visit our Instagram page" className="text-white hover:text-gray-200 transition">
                                        <FaInstagram />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Navigation */}
            <header className={`bg-white py-3 transition-all duration-300 relative z-50 ${scrolled ? 'shadow-md' : ''}`}>
                <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                    {/* Desktop Navigation - Only visible on desktop */}
                    {!isMobile ? (
                        <nav className="flex justify-between items-center">
                            {/* Main Logo */}
                            <div className="logo-container">
                                <ApplicationLogo />
                            </div>

                            {/* Desktop Navigation Links */}
                            <div className="hidden md:flex items-center space-x-6 font-medium">
                                <NavLink href={route('home')} active={route().current('home')}>
                                    Home
                                </NavLink>
                                <NavLink href={route('about')} active={route().current('about')}>
                                    About
                                </NavLink>
                                <NavLink href={route('local.chapters')} active={route().current('local.chapters')}>
                                    Local Chapters
                                </NavLink>
                                <NavLink href={route('contact')} active={route().current('contact')}>
                                    Contact Us
                                </NavLink>
                            </div>

                            {/* User Menu - Desktop */}
                            <div className="hidden md:flex items-center ml-6">
                                {user ? (
                                    <div className="ml-3 relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        <FaUserCircle className="mr-1" size={20} />
                                                        {user.first_name}
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                {user.role && user.role.name === 'super-admin' && (
                                                    <Dropdown.Link href={route('dashboard')} className="flex items-center">
                                                        <FaCog className="mr-2" size={16} />
                                                        Dashboard
                                                    </Dropdown.Link>
                                                )}
                                                
                                                {/* Add admin link for users with admin permissions */}
                                                {user.permissions && (
                                                    user.permissions.some(permission => 
                                                        permission.includes('_blog') || 
                                                        permission.includes('_events') || 
                                                        permission.includes('_users') ||
                                                        permission.includes('_albums') ||
                                                        permission.includes('_banners') ||
                                                        permission.includes('_locale') ||
                                                        permission.includes('_categories') ||
                                                        permission.includes('_tags') ||
                                                        permission.includes('_email') ||
                                                        permission.includes('_roles')
                                                    ) && (
                                                        <Dropdown.Link href={route('dashboard')} className="flex items-center">
                                                            <FaCog className="mr-2" size={16} />
                                                            Admin Dashboard
                                                        </Dropdown.Link>
                                                    )
                                                )}

                                                <Dropdown.Link href={route('profile.edit')} className="flex items-center">
                                                    <FaUser className="mr-2" size={16} />
                                                    Profile
                                                </Dropdown.Link>

                                                <Dropdown.Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                    className="flex items-center"
                                                >
                                                    <FaSignOutAlt className="mr-2" size={16} />
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary/90 transition ease-in-out duration-150"
                                    >
                                        Member Login
                                    </Link>
                                )}
                            </div>
                        </nav>
                    ) : (
                        // Mobile Navigation
                        <div className="mobile-header flex justify-between items-center">
                            {/* Mobile Logo */}
                            <div className="logo-wrapper">
                                <ApplicationLogo />
                            </div>

                            {/* Mobile Menu Button */}
                            <button 
                                onClick={handleToggle} 
                                className="md:hidden p-3 focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                                aria-expanded={toggle}
                                aria-controls="mobile-menu"
                                aria-label={toggle ? "Close menu" : "Open menu"}
                            >
                                {toggle ? (
                                    <FaTimes className="h-6 w-6 text-gray-800" />
                                ) : (
                                    <FaBars className="h-6 w-6 text-gray-800" />
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu - Only visible when toggled */}
                {isMobile && toggle && (
                    <div 
                        id="mobile-menu"
                        className={`${toggle ? 'block' : 'hidden'} md:hidden fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out ${
                            toggle ? 'translate-x-0' : 'translate-x-full'
                        }`}
                        aria-hidden={!toggle}
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between items-center p-5 border-b">
                                <ApplicationLogo className="h-10" />
                                <button
                                    onClick={handleToggle}
                                    className="p-3 focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                                    aria-label="Close menu"
                                >
                                    <FaTimes className="h-6 w-6 text-gray-800" />
                                </button>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto">
                                <nav className="px-4 pt-5 pb-6">
                                    {/* Mobile navigation links with larger touch targets */}
                                    <div className="space-y-2">
                                        <ResponsiveNavLink href={route('home')} active={route().current('home')} className="block px-4 py-4 text-base font-medium rounded-md">
                                            Home
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink href={route('about')} active={route().current('about')} className="block px-4 py-4 text-base font-medium rounded-md">
                                        About
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink href={route('local.chapters')} active={route().current('local.chapters')} className="block px-4 py-4 text-base font-medium rounded-md">
                                        Local Chapters
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink href={route('contact')} active={route().current('contact')} className="block px-4 py-4 text-base font-medium rounded-md">
                                        Contact Us
                                        </ResponsiveNavLink>
                                    </div>
                                </nav>
                            </div>
                            
                            {/* Add login/profile buttons at bottom of mobile menu */}
                            <div className="p-5 border-t">
                                {user ? (
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex items-center mb-3">
                                            <FaUserCircle className="h-8 w-8 text-gray-700 mr-2" />
                                            <span className="font-medium text-gray-900">{user.first_name} {user.last_name}</span>
                                        </div>
                                        <ResponsiveNavLink href={route('profile.edit')} className="border border-gray-300">
                                            <FaUser className="mr-2" size={16} />
                                            Profile
                                        </ResponsiveNavLink>
                                        {(user.role?.name === 'super-admin' || (user.permissions && user.permissions.some(p => 
                                            p.includes('_blog') || p.includes('_events') || p.includes('_users')
                                        ))) && (
                                            <ResponsiveNavLink href={route('dashboard')} className="border border-gray-300">
                                                    <FaCog className="mr-2" size={16} />
                                                    Dashboard
                                                </ResponsiveNavLink>
                                        )}
                                                    <ResponsiveNavLink 
                                            href={route('logout')}
                                                method="post"
                                                as="button"
                                            className="bg-red-50 text-red-600 border border-red-200"
                                            >
                                                <FaSignOutAlt className="mr-2" size={16} />
                                                Log Out
                                            </ResponsiveNavLink>
                                    </div>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="flex items-center justify-center w-full px-4 py-3 bg-primary text-white rounded-md font-medium transition duration-200 ease-in-out hover:bg-primary-dark"
                                    >
                                        <FaUserCircle className="mr-2" />
                                        Member Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </React.Fragment>
    );
}
