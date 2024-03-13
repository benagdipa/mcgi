import React from 'react'
import { Link, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export default function HomePage({ auth }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <GuestLayout>
            <Head title="Home" />
            <div className='homepage-content'>
                <div className="hero-slider">
                    <Slider {...settings}>
                        <div className='slider-item lg:h-full'>
                            <img src="/images/slider/slider_1.png" className='w-full object-contain h-full' />
                        </div>
                        <div className='slider-item lg:h-full'>
                            <img src="/images/slider/slider_2.jpg" className='w-full object-contain h-full' />
                        </div>
                        <div className='slider-item lg:h-full'>
                            <img src="/images/slider/slider_3.jpg" className='w-full object-contain h-full' />
                        </div>
                        <div className='slider-item lg:h-full'>
                            <img src="/images/slider/slider_4.png" className='w-full object-contain h-full' />
                        </div>
                        <div className='slider-item lg:h-full'>
                            <img src="/images/slider/slider_5.png" className='w-full object-contain h-full' />
                        </div>
                    </Slider>
                </div>
                <div className="welcome-section mt-16">
                    <div className="w-full">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="content">
                                <div className="title-wrapper text-center"><h1 className="title text-4xl font-semibold mb-3">Welcome to MCGI Australia</h1></div>
                                <div className="content pt-3">
                                    <p className='mb-3 text-[#404040] font-normal'>
                                        Welcome to Members Church of God International (MCGI) in Australia, a place where faith is nurtured, and spirituality flourishes. Our congregation is united by a shared belief in the teachings of Jesus Christ and a commitment to spreading His message of faith, hope and love. We embrace all who seek spiritual growth, offering a sanctuary of worship and a community of support.
                                    </p>
                                    <blockquote className='border-l-4 pl-3 border-primary my-6'>
                                        <p className='italic text-[#86592d] py-3'>
                                            "Thus says the LORD: 'Stand in the ways and see, And ask for the old paths, where the good way is, And walk in it; Then you will find rest for your souls.'
                                            <span className='block pt-2 font-bold text-text-primary'> - Jeremiah 6:16 KJV</span>
                                        </p>
                                    </blockquote>
                                    <p className='mb-3 text-[#404040] font-normal'>
                                        With a network of chapters across Australia, MCGI is a beacon of hope and spiritual guidance, providing a welcoming community for all seeking truth and spiritual growth. Our chapters offer a range of activities and services, including community outreach, Bible studies, and family support programs, all designed to foster a deeper understanding of faith and to nurture the spiritual well-being of our members and the broader community.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="beliefs-seciton mt-20">
                    <div className="w-full">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="title-wrapper">
                                <h1 className='title text-4xl font-semibold mb-3'>Our Beliefs and Mission</h1>
                            </div>
                            <div className="content">
                                <div className="flex items-center justify-between gap-6">
                                    <div className="w-1/2">
                                        <div className="left-section">
                                            <blockquote className='border-l-4 pl-3 border-primary my-3'>
                                                <p className='italic text-[#86592d] py-3'>
                                                    "For we are His workmanship, created in Christ Jesus for good works, which God prepared beforehand that we should walk in them."
                                                    <span className='block pt-2 font-bold text-text-primary'>- Ephesians 2:10</span>
                                                </p>
                                            </blockquote>
                                            <p className='mb-3 text-[#404040] font-normal'>
                                                At MCGI Australia, our mission is deeply rooted in the teachings of the Bible, guiding our journey in faith and community service. We strive to live by Christ's teachings, fostering love, humility, and compassion within our diverse congregation. Our dedication to spreading the gospel and serving the community is unwavering, as we seek to embody the spirit of Christ in all our actions.
                                            </p>
                                            <p className='mb-3 text-[#404040] font-normal'>
                                                Our congregation is built on a foundation of spiritual enlightenment and moral integrity. We focus on understanding and embodying God's Word, fostering an environment where faith, wisdom, and communal support thrive. We are committed to creating a welcoming and nurturing environment, where every individual can find solace, guidance, and a sense of belonging.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-1/2">
                                        <div className="right-section">
                                            <img src="/images/events.jpg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="charity-seciton mt-16">
                    <div className="w-full">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="title-wrapper text-center">
                                <h1 className='title text-4xl font-semibold mb-3'>Charity and Community Service</h1>
                            </div>
                            <div className="content pt-12">
                                <div className="flex items-center justify-between gap-6">
                                    <div className="w-1/2">
                                        <div className="left-section">
                                            <img src="/images/charity.png" className='w-full' />
                                        </div>
                                    </div>
                                    <div className="w-1/2">
                                        <div className="right-section">
                                            <blockquote className='border-l-4 pl-3 border-primary my-6'>
                                                <p className='italic text-[#86592d] py-3'>
                                                    "Give, and it will be given to you: good measure, pressed down, shaken together, and running over will be put into your bosom. For with the same measure that you use, it will be measured back to you."
                                                    <span className='block pt-2 font-bold text-text-primary'>- Luke 6:38</span>
                                                </p>
                                            </blockquote>
                                            <p className='mb-3 text-[#404040] font-normal'>
                                                At the heart of our church's ethos is a profound commitment to charity and service. MCGI Australia actively engages in outreach programs, community service, and humanitarian efforts, driven by a compassionate desire to help those in need and make a positive impact.
                                            </p>
                                            <p className='mb-3 text-[#404040] font-normal'>
                                                Our commitment to charity and community service is a cornerstone of our faith. Through acts of kindness and generosity, we express our devotion and fulfill our mission to spread love and compassion, creating a better world for all.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="address-map mt-16">
                    <div className="google-map-code">
                        <iframe
                            src="https://maps.google.com/maps?width=100%25&amp;height=650&amp;hl=en&amp;q=5/230%20Blackshaws%20Rd,%20Altona%20North%20VIC%203025,%20Australia+(Members%20Church%20of%20God%20International)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                            width="100%"
                            height="550"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}
