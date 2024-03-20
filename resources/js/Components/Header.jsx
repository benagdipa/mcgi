import { Link, router } from '@inertiajs/react'
import React, { useState } from 'react'
import ApplicationLogo from './ApplicationLogo'
import { IconBrandFacebook, IconBrandInstagram, IconBrandYoutube, IconMenu2, IconPhoneCall, IconUser } from '@tabler/icons-react';

export default function Header() {
    const [toggle, setToggle] = useState(false);
    const currentRoute = route().current()
    const hideHeader = ['login', 'register']
    return (
        <React.Fragment>
            {!hideHeader.includes(currentRoute) && (
                <header className='main-header shadow-sm'>
                    <div className="w-full">
                        <div className="px-6 py-3 lg:py-6 lg:px-16 ">
                            <div className="desktop-header justify-between items-center hidden xl:flex">
                                <div className="left-section w-2/5">
                                    <div className="menu-wrapper">
                                        <ul className='flex'>
                                            <li className='px-4 font-semibold text-lg font-dmsans'><Link href={route('home')}>Home</Link></li>
                                            <li className='px-4 font-semibold text-lg font-dmsans'><Link href={route('about')}>About Us</Link></li>
                                            <li className='px-4 font-semibold text-lg font-dmsans'><Link href="#">Community Prayer</Link></li>
                                            <li className='px-4 font-semibold text-lg font-dmsans'><Link href="#">Charities</Link></li>
                                            <li className='px-4 font-semibold text-lg font-dmsans'><Link href={route('contact')}>Contact Us</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="middle-section w-1/5">
                                    <div className="logo-wrapper">
                                        <Link href="/">
                                            <ApplicationLogo />
                                        </Link>
                                    </div>
                                </div>
                                <div className="right-section w-2/5">
                                    <div className="menu-wrapper">
                                        <ul className='flex justify-end'>
                                            <li className='px-4 font-semibold text-lg font-dmsans'><Link href={route('login')}><span className='flex items-center justify-center'><IconUser size={28} strokeWidth={2} style={{ paddingRight: 4 }} /> Login</span></Link></li>
                                            <li className='px-4 font-semibold text-lg font-dmsans'><Link href="#"><span className='flex'><IconPhoneCall size={28} strokeWidth={2} style={{ paddingRight: 4 }} /> +61450780530</span></Link></li>
                                            <li className='px-3 font-semibold text-lg font-dmsans'><Link href="#"><span className='flex'><IconBrandFacebook size={28} strokeWidth={2} style={{ paddingRight: 4 }} /></span></Link></li>
                                            <li className='px-3 font-semibold text-lg font-dmsans'><Link href="#"><span className='flex'><IconBrandInstagram size={28} strokeWidth={2} style={{ paddingRight: 4 }} /></span></Link></li>
                                            <li className='px-3 font-semibold text-lg font-dmsans'><Link href="#"><span className='flex'><IconBrandYoutube size={28} strokeWidth={2} style={{ paddingRight: 4 }} /></span></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="mobile-header xl:hidden">
                                <div className="header-row flex justify-between items-center">
                                    <div className="logo-wrapper">
                                        <Link href="/">
                                            <ApplicationLogo />
                                        </Link>
                                    </div>
                                    <button onClick={() => setToggle(!toggle)}>
                                        <IconMenu2 size={32} strokeWidth='1' />
                                    </button>
                                    <div className={`${!toggle ? "hidden" : 'flex'} mobile-menu-items absolute left-0 top-[75px] md:top-[87px] w-full`}>
                                        <ul className='bg-white w-full border-t z-[109]'>
                                            <li className='px-10 py-3 font-semibold text-base'><Link href="#">Home</Link></li>
                                            <li className='px-10 py-3 font-semibold text-base'><Link href="#">About Us</Link></li>
                                            <li className='px-10 py-3 font-semibold text-base'><Link href="#">Community Prayer</Link></li>
                                            <li className='px-10 py-3 font-semibold text-base'><Link href="#">Charities</Link></li>
                                            <li className='px-10 py-3 font-semibold text-base'><Link href="#">Contact Us</Link></li>
                                            <li className='px-10 py-3 font-semibold text-base'><Link href="#">Login</Link></li>
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
