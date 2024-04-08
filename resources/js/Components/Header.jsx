import { Link, router } from '@inertiajs/react'
import React, { useState } from 'react'
import ApplicationLogo from './ApplicationLogo'
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube, IconChevronDown, IconMenu2, IconPhoneCall, IconUser } from '@tabler/icons-react';
import Dropdown from './Dropdown';

export default function Header({ user }) {
    const [toggle, setToggle] = useState(false);
    const currentRoute = route().current()
    const hideHeader = ['login', 'register','password.request']

    const prayerHref = route().current() === 'home' ? '#prayer' : route('home') + '/#prayer'
    const charityHref = route().current() === 'home' ? '#charity' : route('home') + '/#charity'
    return (
        <React.Fragment>
            {!hideHeader.includes(currentRoute) && (
                <header className='main-header shadow-sm sticky top-0 bg-white z-50'>
                    <div className="w-full max-w-screen-2xl mx-auto">
                        <div className="py-3 lg:py-6">
                            <div className="desktop-header justify-between items-center hidden xl:flex">
                                <div className="left-section">
                                    <div className="logo-wrapper">
                                        <ApplicationLogo />
                                    </div>
                                </div>
                                <div className="middle-section">
                                    <div className="menu-wrapper flex ">
                                        <ul className='flex gap-4'>
                                            <li className='font-semibold text-lg font-dmsans'>
                                                <Link href={route('home')}>Home</Link>
                                            </li>
                                            <li className='font-semibold text-lg font-dmsans'>
                                                <Link href={route('blogs.index')}>Articles</Link>
                                            </li>
                                            <li className='font-semibold text-lg font-dmsans'>
                                                <Link href={prayerHref}>Community Prayer</Link>
                                            </li>
                                            <li className='font-semibold text-lg font-dmsans'>
                                                <Link href={charityHref}>Charities</Link>
                                            </li>
                                            <li className='font-semibold text-lg font-dmsans'>
                                                <Link href={route('about')}>About Us</Link>
                                            </li>
                                            <li className='font-semibold text-lg font-dmsans'>
                                                <Link href={route('contact')}>Contact Us</Link>
                                            </li>
                                            <li className='font-semibold text-lg font-dmsans'>
                                                {user ? (
                                                    <Dropdown>
                                                        <Dropdown.Trigger>
                                                            <span className="flex items-center gap-1">
                                                                <IconUser size={22} strokeWidth={1.5} />
                                                                <button type="button" className="">{user?.first_name}</button>
                                                                <IconChevronDown size={22} strokeWidth={1.5} />
                                                            </span>
                                                        </Dropdown.Trigger>
                                                        <Dropdown.Content>
                                                            <Dropdown.Link href={route('dashboard')}>Dashboard</Dropdown.Link>
                                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                                Log Out
                                                            </Dropdown.Link>
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                ) : (
                                                    <Link href={route('login')}>
                                                        <span className='flex items-center justify-center'><IconUser size={22} strokeWidth={1.5} /> <span className='pl-2'>Sign In</span></span>
                                                    </Link>
                                                )}
                                            </li>
                                            <li className='font-semibold text-lg font-dmsans'>
                                                <a href="tel:+61450780530">
                                                    <span className='flex items-center'><IconPhoneCall size={22} strokeWidth={1.5} /> <span className='pl-2'>+61450780530</span></span>
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="menu-wrapper pl-6">
                                            <ul className='flex justify-end gap-2'>
                                                <li className='font-semibold text-lg font-dmsans'><a href="https://www.facebook.com/MCGI.org/" target='_blank'><span className='flex'><IconBrandFacebook size={26} strokeWidth={1.5} /></span></a></li>
                                                <li className='font-semibold text-lg font-dmsans'><a href="https://twitter.com/mcgidotorg" target='_blank'><span className='flex'><IconBrandTwitter size={26} strokeWidth={1.5} /></span></a></li>
                                                <li className='font-semibold text-lg font-dmsans'><a href="https://www.instagram.com/mcgidotorg/" target='_blank'><span className='flex'><IconBrandInstagram size={26} strokeWidth={1.5} /></span></a></li>
                                                <li className='font-semibold text-lg font-dmsans'><a href="https://www.youtube.com/mcgichannel" target='_blank'><span className='flex'><IconBrandYoutube size={26} strokeWidth={1.5} /></span></a></li>
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
                                        <IconMenu2 size={32} strokeWidth='1' />
                                    </button>
                                    <div className={`${!toggle ? "hidden" : 'flex'} mobile-menu-items absolute left-0 top-[75px] md:top-[87px] w-full`}>
                                        <ul className='bg-white w-full border-t z-[109]'>
                                            <li className='px-10 py-3 font-semibold text-base'><Link href={route('home')}>Home</Link></li>
                                            <li className='px-10 py-3 font-semibold text-base'><Link href={route('about')}>About Us</Link></li>
                                            <li className='px-10 py-3 font-semibold text-base'><Link href={prayerHref}>Community Prayer</Link></li>
                                            <li className='px-10 py-3 font-semibold text-base'><Link href={charityHref}>Charities</Link></li>
                                            <li className='px-10 py-3 font-semibold text-base'><Link href={route('contact')}>Contact Us</Link></li>
                                            <li className='px-10 py-3 font-semibold text-base'><Link href={route('login')}>Login</Link></li>
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
