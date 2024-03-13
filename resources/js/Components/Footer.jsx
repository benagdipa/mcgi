import { Facebook, Instagram, MailIcon, MapPinIcon, PhoneCallIcon, Twitter, Youtube } from 'lucide-react'
import React from 'react'

export default function Footer() {
    return (
        <React.Fragment>
            <div className="footer bg-[#484848]">
                <div className="w-full">
                    <div className="max-w-screen-xl mx-auto py-16">
                        <div className="px-6 md:flex md:gap-0 md:px-3 lg:gap-6">
                            <div className="w-full mb-6 md:w-2/4  lg:w-1/3">
                                <div className="widget-title">
                                    <h2 className='text-white font-semibold text-xl'>Contact Us</h2>
                                </div>
                                <div className="widget-content mt-4">
                                    <ul>
                                        <li>
                                            <div className="flex text-white mb-5">
                                                <div className="icon"><MailIcon strokeWidth={1.5} /></div>
                                                <div className="content pl-2">
                                                    <a href="mailto:info@mcgi.org.au">info@mcgi.org.au</a>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex text-white mb-5">
                                                <div className="icon"><PhoneCallIcon strokeWidth={1.5} /></div>
                                                <div className="content pl-2">
                                                    <a href="tel:+61450780530">+61450780530</a>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex text-white mb-5">
                                                <div className="icon"><MapPinIcon strokeWidth={1.5} /></div>
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
                                <div className="widget-content mt-4">
                                    <ul className='text-white'>
                                        <li className='pb-2'><a href="#">About Us</a></li>
                                        <li className='pb-2'><a href="#"></a>Privacy Policy</li>
                                        <li className='pb-2'><a href="#"></a>Contact Us</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="w-full mb-6 md:w-1/3 lg:w-1/3">
                                <div className="widget-title">
                                    <h2 className='text-white font-semibold text-xl'>Connect with us</h2>
                                </div>
                                <div className="widget-content mt-4 text-white">
                                    <div className="icon-container flex gap-2">
                                        <div className="icon-wrapper w-10 h-10 rounded-full border flex items-center justify-center"><Facebook strokeWidth={1.5} size={22} /></div>
                                        <div className="icon-wrapper w-10 h-10 rounded-full border flex items-center justify-center"><Twitter strokeWidth={1.5} size={22} /></div>
                                        <div className="icon-wrapper w-10 h-10 rounded-full border flex items-center justify-center"><Youtube strokeWidth={1.5} size={22} /></div>
                                        <div className="icon-wrapper w-10 h-10 rounded-full border flex items-center justify-center"><Instagram strokeWidth={1.5} size={22} /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="full bg-[#3e3d3d]">
                    <div className="max-w-screen-xl mx-auto">
                        <div className='text-white text-center py-6'>&copy; 2024 MCGI Australia. All Rights Reserved.</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
