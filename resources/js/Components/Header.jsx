import { Link, usePage } from '@inertiajs/react'
import React, { useState, useEffect } from 'react'
import ApplicationLogo from './ApplicationLogo'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaChevronDown, FaSearch } from 'react-icons/fa';
import { AiOutlineDown, AiOutlineMenu, AiOutlineUser, AiOutlineClose } from 'react-icons/ai';
import Dropdown from './Dropdown';

export default function Header({ user }) {
    const { role } = usePage().props.auth;

    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const currentRoute = route().current()
    const hideHeader = ['login', 'register', 'password.request']

    // Add scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

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

    const eventHref = currentRoute === 'home' ? getRoute('events.index') : getRoute('home') + '/events'
    
    // Determine if user is a member or a non-member/guest
    const isMember = user && role && role.name !== 'guest' && role.name !== 'Guest';
    
    return (
        <React.Fragment>
            {!hideHeader.includes(currentRoute) && (
                <header className={`main-header ${scrolled ? 'shadow-md' : 'shadow-sm'} sticky top-0 bg-white z-50 transition-all duration-300`}>
                    <div className="w-full max-w-screen-2xl mx-auto">
                        {/* Welcome banner for non-authenticated users */}
                        {!user && (
                            <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-2 px-4 text-center">
                                <span className="text-sm font-medium">Welcome to MCGI Australia! <Link href={getRoute('register')} className="font-bold underline hover:text-secondary transition-colors ml-1">Join our community</Link> or <Link href={getRoute('login')} className="font-bold underline hover:text-secondary transition-colors">Sign in</Link></span>
                            </div>
                        )}
                        <div className={`py-3 px-3 lg:px-6 ${scrolled ? 'lg:py-3' : 'lg:py-6'} transition-all duration-300`}>
                            <div className="desktop-header justify-between items-center hidden xl:flex">
                                <div className="left-section">
                                    <div className="logo-wrapper">
                                        <ApplicationLogo className={`transition-all duration-300 ${scrolled ? 'w-[160px]' : 'w-[200px]'}`} />
                                    </div>
                                </div>
                                <div className="middle-section">
                                    <div className="menu-wrapper flex items-center">
                                        <ul className="hidden lg:flex items-center gap-8">
                                            <li className='font-semibold text-base font-montserrat group relative'>
                                                <Link 
                                                    href={hasRoute('home') ? getRoute('home') : '/'} 
                                                    className={`transition-colors hover:text-primary pb-2 ${currentRoute === 'home' ? 'text-primary' : ''}`}
                                                >
                                                    Home
                                                    <span className={`absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${currentRoute === 'home' ? 'w-full' : ''}`}></span>
                                                </Link>
                                            </li>
                                            <li className='font-semibold text-base font-montserrat group relative'>
                                                <Link 
                                                    href={hasRoute('about') ? getRoute('about') : '/about-us'} 
                                                    className={`transition-colors hover:text-primary pb-2 ${currentRoute === 'about' ? 'text-primary' : ''}`}
                                                >
                                                    About Us
                                                    <span className={`absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${currentRoute === 'about' ? 'w-full' : ''}`}></span>
                                                </Link>
                                            </li>
                                            <li className='font-semibold text-base font-montserrat group relative'>
                                                <Link 
                                                    href={eventHref} 
                                                    className={`transition-colors hover:text-primary pb-2 ${currentRoute === 'events' ? 'text-primary' : ''}`}
                                                >
                                                    Events
                                                    <span className={`absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${currentRoute === 'events' ? 'w-full' : ''}`}></span>
                                                </Link>
                                            </li>
                                            <li className='font-semibold text-base font-montserrat group relative'>
                                                <Link 
                                                    href="/blogs" 
                                                    className={`transition-colors hover:text-primary pb-2 ${currentRoute === 'blogs' ? 'text-primary' : ''}`}
                                                >
                                                    Articles
                                                    <span className={`absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${currentRoute === 'blogs' ? 'w-full' : ''}`}></span>
                                                </Link>
                                            </li>
                                            <li className='font-semibold text-base font-montserrat group relative'>
                                                <Link 
                                                    href={route('local.chapters')} 
                                                    className={`transition-colors hover:text-primary pb-2 ${currentRoute === 'local.chapters' ? 'text-primary' : ''}`}
                                                >
                                                    Local Chapters
                                                    <span className={`absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${currentRoute === 'local.chapters' ? 'w-full' : ''}`}></span>
                                                </Link>
                                            </li>
                                        </ul>
                                        
                                        <div className="flex items-center ml-7">
                                            <button className="text-tertiary hover:text-primary transition-colors mr-4">
                                                <FaSearch size={18} />
                                            </button>
                                            
                                            {/* Social Media Icons */}
                                            <div className="menu-wrapper">
                                                <ul className='flex justify-end gap-4'>
                                                    <li>
                                                        <a href="https://www.facebook.com/MCGI.org/" target='_blank' className="text-tertiary hover:text-[#1877F2] transition-colors">
                                                            <FaFacebook size={20} />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="https://twitter.com/mcgidotorg" target='_blank' className="text-tertiary hover:text-[#1DA1F2] transition-colors">
                                                            <FaTwitter size={20} />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="https://www.instagram.com/mcgidotorg/" target='_blank' className="text-tertiary hover:text-[#E4405F] transition-colors">
                                                            <FaInstagram size={20} />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="https://www.youtube.com/mcgichannel" target='_blank' className="text-tertiary hover:text-[#FF0000] transition-colors">
                                                            <FaYoutube size={20} />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            
                                            {/* User Profile/Login */}
                                            <div className="ml-6 border-l pl-6">
                                                {user ? (
                                                    <Dropdown>
                                                        <Dropdown.Trigger>
                                                            <span className="flex items-center gap-1 cursor-pointer">
                                                                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                                                    <AiOutlineUser size={18} />
                                                                </div>
                                                                <button type="button" className="text-tertiary hover:text-primary transition-colors">{user?.first_name}</button>
                                                                <FaChevronDown size={14} className="text-gray-500" />
                                                            </span>
                                                        </Dropdown.Trigger>
                                                        <Dropdown.Content>
                                                            {isMember && <Dropdown.Link href={getRoute('dashboard')}>Dashboard</Dropdown.Link>}
                                                            <Dropdown.Link href={getRoute('profile.edit')}>Profile</Dropdown.Link>
                                                            {!isMember && user && (
                                                                <Dropdown.Link href={eventHref}>My Events</Dropdown.Link>
                                                            )}
                                                            <Dropdown.Link href={getRoute('logout')} method="post" as="button">
                                                                Log Out
                                                            </Dropdown.Link>
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                ) : (
                                                    <Link href={getRoute('login')} className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all">
                                                        <AiOutlineUser size={18} />
                                                        <span className='pl-2 font-medium'>Sign In</span>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Mobile Header */}
                            <div className="mobile-header flex justify-between items-center xl:hidden">
                                <div className="logo-wrapper">
                                    <ApplicationLogo className="w-[150px]" />
                                </div>
                                <button onClick={() => setToggle(!toggle)} className="outline-none">
                                    {toggle ? (
                                        <AiOutlineClose size={24} className="text-primary" />
                                    ) : (
                                        <AiOutlineMenu size={24} className="text-primary" />
                                    )}
                                </button>
                            </div>
                            
                            {/* Mobile Menu */}
                            {toggle && (
                                <div className="mobile-menu xl:hidden mt-4 py-4 border-t animation-fade-in">
                                    <ul className="space-y-2">
                                        <li className="font-semibold text-base">
                                            <Link 
                                                href={hasRoute('home') ? getRoute('home') : '/'}
                                                className={`block px-2 py-2 rounded-md ${currentRoute === 'home' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                                                onClick={() => setToggle(false)}
                                            >
                                                Home
                                            </Link>
                                        </li>
                                        <li className="font-semibold text-base">
                                            <Link 
                                                href={hasRoute('about') ? getRoute('about') : '/about-us'}
                                                className={`block px-2 py-2 rounded-md ${currentRoute === 'about' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                                                onClick={() => setToggle(false)}
                                            >
                                                About Us
                                            </Link>
                                        </li>
                                        <li className="font-semibold text-base">
                                            <Link 
                                                href={eventHref}
                                                className={`block px-2 py-2 rounded-md ${currentRoute === 'events' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                                                onClick={() => setToggle(false)}
                                            >
                                                Events
                                            </Link>
                                        </li>
                                        <li className="font-semibold text-base">
                                            <Link 
                                                href="/blogs"
                                                className={`block px-2 py-2 rounded-md ${currentRoute === 'blogs' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                                                onClick={() => setToggle(false)}
                                            >
                                                Articles
                                            </Link>
                                        </li>
                                        <li className="font-semibold text-base">
                                            <Link 
                                                href={route('local.chapters')}
                                                className={`block px-2 py-2 rounded-md ${currentRoute === 'local.chapters' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                                                onClick={() => setToggle(false)}
                                            >
                                                Local Chapters
                                            </Link>
                                        </li>
                                        {!user && (
                                            <li className="mt-4 pt-4 border-t">
                                                <Link 
                                                    href={getRoute('login')}
                                                    className="flex items-center justify-center w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all"
                                                    onClick={() => setToggle(false)}
                                                >
                                                    <AiOutlineUser size={18} />
                                                    <span className="pl-2 font-medium">Sign In</span>
                                                </Link>
                                            </li>
                                        )}
                                        {user && (
                                            <>
                                                <li className="mt-4 pt-4 border-t">
                                                    <div className="px-2 py-2 text-gray-600">
                                                        Signed in as <span className="font-semibold text-primary">{user.first_name}</span>
                                                    </div>
                                                </li>
                                                {isMember && (
                                                    <li>
                                                        <Link 
                                                            href={getRoute('dashboard')}
                                                            className="block px-2 py-2 rounded-md hover:bg-gray-100"
                                                            onClick={() => setToggle(false)}
                                                        >
                                                            Dashboard
                                                        </Link>
                                                    </li>
                                                )}
                                                <li>
                                                    <Link 
                                                        href={getRoute('profile.edit')}
                                                        className="block px-2 py-2 rounded-md hover:bg-gray-100"
                                                        onClick={() => setToggle(false)}
                                                    >
                                                        Profile
                                                    </Link>
                                                </li>
                                                {!isMember && (
                                                    <li>
                                                        <Link 
                                                            href={eventHref}
                                                            className="block px-2 py-2 rounded-md hover:bg-gray-100"
                                                            onClick={() => setToggle(false)}
                                                        >
                                                            My Events
                                                        </Link>
                                                    </li>
                                                )}
                                                <li>
                                                    <Link 
                                                        href={getRoute('logout')}
                                                        method="post"
                                                        as="button"
                                                        className="w-full text-left px-2 py-2 rounded-md hover:bg-gray-100 text-red-600"
                                                    >
                                                        Log Out
                                                    </Link>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                    
                                    {/* Social Media Icons in Mobile Menu */}
                                    <div className="mt-6 pt-4 border-t">
                                        <div className="px-2 mb-2 text-gray-600 font-medium">Follow Us</div>
                                        <div className="flex gap-4 px-2">
                                            <a href="https://www.facebook.com/MCGI.org/" target='_blank' className="text-tertiary hover:text-[#1877F2] transition-colors">
                                                <FaFacebook size={20} />
                                            </a>
                                            <a href="https://twitter.com/mcgidotorg" target='_blank' className="text-tertiary hover:text-[#1DA1F2] transition-colors">
                                                <FaTwitter size={20} />
                                            </a>
                                            <a href="https://www.instagram.com/mcgidotorg/" target='_blank' className="text-tertiary hover:text-[#E4405F] transition-colors">
                                                <FaInstagram size={20} />
                                            </a>
                                            <a href="https://www.youtube.com/mcgichannel" target='_blank' className="text-tertiary hover:text-[#FF0000] transition-colors">
                                                <FaYoutube size={20} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>
            )}
        </React.Fragment>
    );
}
