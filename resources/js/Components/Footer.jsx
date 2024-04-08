import React from 'react'
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube, IconMail, IconMapPin, IconPhoneCall } from '@tabler/icons-react'
import { Link } from '@inertiajs/react'

export default function Footer() {
    const currentRoute = route().current()
    const hideFooter = ['login', 'register']
    return (
        <React.Fragment>
            {!hideFooter.includes(currentRoute) && (
                <div className="footer bg-[#484848]">
                    <div className="w-full">
                        <div className="max-w-screen-xl mx-auto py-16">
                            <div className="px-6 md:flex md:gap-0 md:px-3 lg:gap-6">
                                <div className="w-full mb-6 md:w-2/4  lg:w-1/3">
                                    <div className="widget-title">
                                        <h2 className='text-white font-semibold text-xl'>Contact Us</h2>
                                    </div>
                                    <div className="widget-content mt-4 font-dmsans">
                                        <ul>
                                            <li>
                                                <div className="flex text-white mb-5">
                                                    <div className="icon"><IconMail strokeWidth={1.5} /></div>
                                                    <div className="content pl-2">
                                                        <a href="mailto:info@mcgi.org.au">info@mcgi.org.au</a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex text-white mb-5">
                                                    <div className="icon"><IconPhoneCall strokeWidth={1.5} /></div>
                                                    <div className="content pl-2">
                                                        <a href="tel:+61450780530">+61450780530</a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex text-white mb-5">
                                                    <div className="icon"><IconMapPin strokeWidth={1.5} /></div>
                                                    <div className="content pl-2">Unit 5, 230 Blackshaws Rd,<br /> Altona North 3025 Victoria</div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="w-full mb-6 md:w-1/3 lg:w-1/3">
                                    <div className="widget-title">
                                        <h2 className='text-white font-semibold text-xl'>Our Websites</h2>
                                    </div>
                                    <div className="widget-content mt-4 font-dmsans">
                                        <ul className='text-white'>
                                            <li className='pb-2'><Link href={route('about')}>About Us</Link></li>
                                            <li className='pb-2'><Link href={route('privacy-and-policy')}>Privacy Policy</Link></li>
                                            <li className='pb-2'><Link href={route('contact')}>Contact Us</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="w-full mb-6 md:w-1/3 lg:w-1/3">
                                    <div className="widget-title">
                                        <h2 className='text-white font-semibold text-xl'>Connect with us</h2>
                                    </div>
                                    <div className="widget-content mt-4 text-white">
                                        <div className="icon-container flex gap-2">
                                            <div className="icon-wrapper w-10 h-10 rounded-full border flex items-center justify-center"><a href="https://www.facebook.com/MCGI.org/" target='_blank'><IconBrandFacebook strokeWidth={1.5} size={22} /></a></div>
                                            <div className="icon-wrapper w-10 h-10 rounded-full border flex items-center justify-center"><a href="https://twitter.com/mcgidotorg" target='_blank'><IconBrandTwitter strokeWidth={1.5} size={22} /></a></div>
                                            <div className="icon-wrapper w-10 h-10 rounded-full border flex items-center justify-center"><a href="https://www.youtube.com/mcgichannel" target='_blank'><IconBrandYoutube strokeWidth={1.5} size={22} /></a></div>
                                            <div className="icon-wrapper w-10 h-10 rounded-full border flex items-center justify-center"><a href="https://www.instagram.com/mcgidotorg/" target='_blank'><IconBrandInstagram strokeWidth={1.5} size={22} /></a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="full bg-[#3e3d3d]">
                        <div className="max-w-screen-xl mx-auto font-dmsans">
                            <div className='text-white text-center py-6'>&copy; 2024 MCGI Australia. All Rights Reserved.</div>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}
