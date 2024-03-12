import { Link } from '@inertiajs/react'
import React, { useState } from 'react'
import ApplicationLogo from './ApplicationLogo'
import { MenuIcon, UserIcon } from 'lucide-react'

export default function Header() {
    const [toggle, setToggle] = useState(false);

    return (
        <React.Fragment>
            <header className='main-header shadow-sm'>
                <div className="w-full">
                    <div className="px-4 py-3 lg:max-w-screen-xl lg:mx-auto">
                        <div className="flex justify-between items-center">
                            <div className="logo-wrapper">
                                <Link href="/">
                                    <ApplicationLogo />
                                </Link>
                            </div>
                            <div className="menu-wrapper hidden lg:block">
                                <ul className='flex'>
                                    <li className='px-4 font-semibold text-base'><Link href="#">Home</Link></li>
                                    <li className='px-4 font-semibold text-base'><Link href="#">About Us</Link></li>
                                    <li className='px-4 font-semibold text-base'><Link href="#">Community Prayer</Link></li>
                                    <li className='px-4 font-semibold text-base'><Link href="#">Charities</Link></li>
                                    <li className='px-4 font-semibold text-base'><Link href="#">Contact Us</Link></li>
                                    <li className='px-4 font-semibold text-base'><Link href="#"><span className='flex'><UserIcon size={24} strokeWidth={2} style={{ paddingRight: 4 }} /> Login</span></Link></li>
                                </ul>
                            </div>
                            <div className="mobile-menu lg:hidden">
                                <button onClick={() => setToggle(!toggle)}>
                                    <MenuIcon size={32} strokeWidth='1' />
                                </button>
                                <div className={`${!toggle ? "hidden" : 'flex'} mobile-menu-items`}>
                                    <ul className='absolute left-0 bg-white w-full top-[75px] md:top-[87px] border-t'>
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
        </React.Fragment>
    )
}
