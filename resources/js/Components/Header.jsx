import { Link, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import ApplicationLogo from './ApplicationLogo'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube,FaChevronDown } from 'react-icons/fa';
import { AiOutlineDown, AiOutlineMenu,AiOutlineUser } from 'react-icons/ai';
import Dropdown from './Dropdown';

export default function Header({ user }) {
    const { role } = usePage().props.auth;

    const [toggle, setToggle] = useState(false);
    const currentRoute = route().current()
    const hideHeader = ['login', 'register', 'password.request']

    const eventHref = route().current() === 'home' ? 'events' : route('home') + '/events'
    return (
        <React.Fragment>
            {!hideHeader.includes(currentRoute) && (
                <header className='main-header shadow-sm sticky top-0 bg-white z-50'>
                    <div className="w-full max-w-screen-2xl mx-auto">
                        <div className="py-3 px-3 lg:px-0 lg:py-6">
                            <div className="desktop-header justify-between items-center hidden xl:flex">
                                <div className="left-section">
                                    <div className="logo-wrapper">
                                        <ApplicationLogo />
                                    </div>
                                </div>
                                <div className="middle-section">
                                    <div className="menu-wrapper flex ">
                                        <ul className='flex gap-7'>
                                            <li className='font-semibold text-base font-montserrat'>
                                                <Link href={route('home')}>Home</Link>
                                            </li>
                                            <li className='font-semibold text-base font-montserrat'>
                                                <Link href={route('about')}>About Us</Link>
                                            </li>
                                            <li className='font-semibold text-base font-montserrat'>
                                                <Link href={route('gallery')}>Gallery</Link>
                                            </li>
                                            <li className='font-semibold text-base font-montserrat'>
                                                <Link href={eventHref}>Events</Link>
                                            </li>
                                            <li className='font-semibold text-base font-montserrat'>
                                            <Link href="/blogs">Articles</Link>
                                            </li>

                                            <li className='font-semibold text-base font-montserrat'>
                                                {user ? (
                                                    <Dropdown>
                                                        <Dropdown.Trigger>
                                                            <span className="flex items-center gap-1">
                                                                <AiOutlineUser size={22} strokeWidth={1.5} />
                                                                <button type="button" className="">{user?.first_name}</button>
                                                                <FaChevronDown size={22} strokeWidth={1.5} />
                                                            </span>
                                                        </Dropdown.Trigger>
                                                        <Dropdown.Content>
                                                            {role?.name !== 'guest' && <Dropdown.Link href={route('dashboard')}>Dashboard</Dropdown.Link>}
                                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                                Log Out
                                                            </Dropdown.Link>
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                ) : (
                                                    <Link href={route('login')}>
                                                        <span className='flex items-center justify-center'><AiOutlineUser size={22} strokeWidth={1.5} /> <span className='pl-2'>Sign In</span></span>
                                                    </Link>
                                                )}
                                            </li>
                                        </ul>
                                        <div className="menu-wrapper pl-6">
                                            <ul className='flex justify-end gap-2'>
                                                <li className='font-semibold text-base font-montserrat'><a href="https://www.facebook.com/MCGI.org/" target='_blank'><span className='flex'><FaFacebook size={26} strokeWidth={1.5} /></span></a></li>
                                                <li className='font-semibold text-base font-montserrat'><a href="https://twitter.com/mcgidotorg" target='_blank'><span className='flex'><FaTwitter size={26} strokeWidth={1.5} /></span></a></li>
                                                <li className='font-semibold text-base font-montserrat'><a href="https://www.instagram.com/mcgidotorg/" target='_blank'><span className='flex'><FaInstagram size={26} strokeWidth={1.5} /></span></a></li>
                                                <li className='font-semibold text-base font-montserrat'><a href="https://www.youtube.com/mcgichannel" target='_blank'><span className='flex'><FaYoutube size={26} strokeWidth={1.5} /></span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mobile-header xl:hidden">
                                <div className="header-row flex justify-between items-center">
                                    <div className="logo-wrapper">
                                        <ApplicationLogo />
                                    </div>
                                    <button onClick={() => setToggle(!toggle)}>
                                        <AiOutlineMenu size={32} strokeWidth='1' />
                                    </button>
                                    <div className={`${!toggle ? "hidden" : 'flex'} mobile-menu-items absolute left-0 top-[75px] md:top-[87px] w-full`}>
                                        <ul className='bg-white w-full border-t z-[109] font-montserrat'>
                                            <li className='px-10 py-3 font-semibold text-base'><Link href={route('home')}>Home</Link></li>
                                            <li className='px-10 py-3 font-semibold text-base'><Link href={route('about')}>About Us</Link></li>
                                            <li className='px-10 py-3 font-semibold text-base'><Link href={route('gallery')}>Gallery</Link></li>
                                            <li className='px-10 py-3 font-semibold text-base'><Link href={eventHref}>Events</Link></li>
                                            <li className='px-10 py-3 font-semibold text-base'><Link href="/blogs">Articles</Link></li>
                                            <li className='px-10 py-3 font-semibold text-base font-montserrat'>
                                                {user ? (
                                                    <Dropdown>
                                                        <Dropdown.Trigger>
                                                            <span className="flex items-center gap-1">
                                                                <button type="button" className="">{user?.first_name}</button>
                                                                <AiOutlineDown size={22} strokeWidth={1.5} />
                                                            </span>
                                                        </Dropdown.Trigger>
                                                        <Dropdown.Content align='left'>
                                                            {role?.name !== 'guest' || role?.name !== 'Guest' && <Dropdown.Link href={route('dashboard')}>Dashboard</Dropdown.Link>}
                                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                                Log Out
                                                            </Dropdown.Link>
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                ) : (
                                                    <Link href={route('login')}>
                                                        <span>Sign In</span>
                                                    </Link>
                                                )}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            )}
        </React.Fragment>
    )
}
