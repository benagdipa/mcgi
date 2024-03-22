import React, { useState } from 'react'
import { Link, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Modal from '@/Components/Modal';
import { IconPlayerPlay } from '@tabler/icons-react';


export default function HomePage({ auth }) {

    const [prayModalState, setPrayModalState] = useState(false)
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const togglePrayModal = () => {
        setPrayModalState(!prayModalState)
    }

    return (
        <GuestLayout user={auth?.user}>
            <Head title="Home" />
            <div className='homepage-content'>
                <div className="hero-slider">
                    <Slider {...settings}>
                        <div className='slider-item lg:h-full'>
                            <img src="/images/slider/slider_4.png" className='w-full object-contain h-full' />
                        </div>
                        <div className='slider-item lg:h-full'>
                            <img src="/images/slider/slider_2.jpg" className='w-full object-contain h-full' />
                        </div>
                        <div className='slider-item lg:h-full'>
                            <img src="/images/slider/slider_3.jpg" className='w-full object-contain h-full' />
                        </div>
                        <div className='slider-item lg:h-full'>
                            <img src="/images/slider/slider_1.png" className='w-full object-contain h-full' />
                        </div>
                        <div className='slider-item lg:h-full'>
                            <img src="/images/slider/slider_5.png" className='w-full object-contain h-full' />
                        </div>
                    </Slider>
                </div>
                <div className="welcome-section py-36">
                    <div className="w-full px-6">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="content">
                                <div className="title-wrapper text-center">
                                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-3 text-[#0f0f0f]">Welcome to <span className='text-[#f5cd06]'>MCGI Australia</span></h1>
                                </div>
                                <div className="content pt-3 text-center w-full lg:w-4/5 mx-auto px-6 lg:px-0">
                                    <p className='mb-3 text-[#666B68] font-normal text-lg lg:text-xl leading-relaxed font-dmsans'>
                                        Welcome to Members Church of God International (MCGI) in Australia, a place where faith is nurtured, and spirituality flourishes. Our congregation is united by a shared belief in the teachings of Jesus Christ and a commitment to spreading His message of faith, hope and love. We embrace all who seek spiritual growth, offering a sanctuary of worship and a community of support.
                                    </p>
                                    <div className="more-link pt-6 inline-flex">
                                        <Link href={route('about')} className='bg-[#0077CC] text-white px-6 py-4 font-bold text-lg rounded-full font-dmsans'>More About Us</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="beliefs-section py-48 rounded-[80px]">
                    <div className="w-full">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="flex gap-8">
                                <div className="w-1/2 text-white">
                                    <div className="title-wrapper">
                                        <h1 className='font-marcellus text-6xl pb-12 font-bold'>Our Beliefs and <br />Mission</h1>
                                        <div className="content pl-16">
                                            <p className='text-xl font-dmsans'>
                                                At MCGI Australia, our mission is deeply rooted in the teachings of the Bible, guiding
                                                our journey in faith and community service. We strive to live by Christ's teachings,
                                                fostering love, humility, and compassion within our diverse congregation. Our dedication
                                                to spreading the gospel and serving the community is unwavering, as we seek to embody
                                                the spirit of Christ in all our actions.
                                            </p>
                                            <div className="more-link pt-10  inline-flex">
                                                <Link href={route('about')}
                                                    className='bg-[#f5cd06] shadow-lg text-[#0f0f0f] px-10 py-4 font-bold text-lg rounded-full font-dmsans'>
                                                    View More</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <img src="/images/events.jpg" className='rounded-[30px] w-full h-auto' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pray-section py-36" id='prayer'>
                    <div className="w-full">
                        <div className="max-w-screen-lg mx-auto">
                            <div className="title-wrapper pb-24">
                                <h1 className='text-center text-6xl font-marcellus font-bold'>PRAY WITH US</h1>
                            </div>
                            <div className="video-wrapper flex items-center justify-center">
                                <div
                                    className="play-icon w-24 h-24 bg-white flex items-center justify-center rounded-full drop-shadow-md shadow-white cursor-pointer">
                                    <IconPlayerPlay color='#666B68' size={42} onClick={togglePrayModal} />
                                </div>
                            </div>
                            <div className="content font-dmsans text-center text-xl text-[#666B68] mx-auto py-10">
                                <p className='mb-3'>The Community Prayer broadcast aims to connect everyone across the globe to pray
                                    together at certain hours of the day (Matthew 18:19-20). Before the short prayer, everyone is
                                    invited to sing hymns and songs of praise to God (James 5:13).</p>
                                <p className='mb-3'>The live prayer broadcast on this page is set in the Filipino language. Every day,
                                    participants can join the top-of-the-hour prayer that starts at 12 a.m. Philippine Time. The live
                                    prayer broadcast is also available in other languages.</p>
                            </div>
                            <div className="more-link pt-6  text-center flex items-center justify-center">
                                <a href='https://mcgi.org/community-prayer/' target='_blank'
                                    className='bg-[#f5cd06] text-[#0f0f0f] shadow-lg px-10 py-4 font-bold text-lg rounded-full font-dmsans'>View
                                    More</a>
                            </div>
                            <Modal show={prayModalState} onClose={togglePrayModal} maxWidth={'xxl'}>
                                <iframe width="100%" height="620" src="https://www.youtube.com/embed/uOeK-LssfiM?si=4NQc4Gc7A0BwafuY"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen />
                            </Modal>
                        </div>
                    </div>
                </div>

                <div className="charity-section pt-36 pb-52  lg:rounded-tl-[80px] lg:rounded-tr-[80px]" id="charity">
                    <div className="w-full">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="title-wrapper relative">
                                <h1 className='text-6xl font-bold text-white font-marcellus'>Charity and Community Service</h1>
                                <p className='font-tangerine text-5xl lg:text-9xl text-[#ECECEC] opacity-35 absolute top-5'>Give, and it
                                    will be given to you</p>
                            </div>
                            <div className="content pt-32">
                                <div className="bg-white rounded-[30px]">
                                    <div className="flex gap-6 items-center justify-center">
                                        <div className="w-1/2">
                                            <img src="/images/charity.png"
                                                className='w-full rounded-tl-[30px] rounded-bl-[30px] h-[600px] object-cover' />
                                        </div>
                                        <div className="w-1/2">
                                            <div className="text-xl font-dmsans text-[#666B68]">
                                                <p className='mb-3'>At the heart of our church's ethos is a profound commitment to
                                                    charity and service. MCGI Australia actively engages in outreach programs, community
                                                    service, and humanitarian efforts, driven by a compassionate desire to help those in
                                                    need and make a positive impact.</p>
                                                <p>Our commitment to charity and community service is a cornerstone of our faith.
                                                    Through acts of kindness and generosity, we express our devotion and fulfill our
                                                    mission to spread love and compassion, creating a better world for all.</p>
                                            </div>
                                            <div className="more-link pt-6 inline-flex">
                                                <a href='https://www.mcgi.org/charities/' target='_blank'
                                                    className='bg-[#f5cd06] text-[#0f0f0f] shadow-lg px-10 py-4 font-bold text-lg rounded-full font-dmsans'>View
                                                    More</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="event-section -mt-[75px]">
                    <div className="w-full bg-[#10102e] px-6 rounded-[50px] lg:rounded-[80px]">
                        <div className="max-w-screen-xl mx-auto py-20 lg:py-36">
                            <div className="title-wrapper text-white relative">
                                <h1 className='text-white text-3xl lg:text-6xl font-bold uppercase font-marcellus'>Upcomming Events</h1>
                                <p className='font-tangerine text-5xl lg:text-9xl text-[#ECECEC] opacity-35 absolute top-3'>join us in
                                    worship and fellowship</p>
                            </div>
                            <div className="events-wrapper pt-16 lg:pt-40 pb-10">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                                    <div className="event-column grid grid-cols-1 gap-6">
                                        <div className="event-item text-white">
                                            <div className="flex gap-6 items-center justify-start">
                                                <div className="event-date text-center">
                                                    <p className="text-2xl lg:text-3xl font-bold font-dmsans">Apr</p>
                                                    <p className='text-4xl lg:text-6xl font-normal pt-4 font-dmsans'>23</p>
                                                </div>
                                                <div className="pl-3 info">
                                                    <div className="event-time">
                                                        <p className='font-dmsans text-sm font-semibold'>8:00 AM - 5:00 PM</p>
                                                    </div>
                                                    <div className="event-title pt-2">
                                                        <p className='text-xl lg:text-4xl font-normal uppercase font-marcellus'>Lorem
                                                            ipsum dolor sit amet, consectetur</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="event-item text-white">
                                            <div className="flex gap-6 items-center justify-start">
                                                <div className="event-date text-center">
                                                    <p className="text-2xl lg:text-3xl font-bold font-dmsans">Apr</p>
                                                    <p className='text-4xl lg:text-6xl font-normal pt-4 font-dmsans'>23</p>
                                                </div>
                                                <div className="pl-3 info">
                                                    <div className="event-time">
                                                        <p className='font-dmsans text-sm font-semibold'>8:00 AM - 5:00 PM</p>
                                                    </div>
                                                    <div className="event-title pt-2">
                                                        <p className='text-xl lg:text-4xl font-normal uppercase font-marcellus'>Lorem
                                                            ipsum dolor sit amet, consectetur</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="event-item text-white">
                                            <div className="flex gap-6 items-center justify-start">
                                                <div className="event-date text-center">
                                                    <p className="text-2xl lg:text-3xl font-bold font-dmsans">Apr</p>
                                                    <p className='text-4xl lg:text-6xl font-normal pt-4 font-dmsans'>23</p>
                                                </div>
                                                <div className="pl-3 info">
                                                    <div className="event-time">
                                                        <p className='font-dmsans text-sm font-semibold'>8:00 AM - 5:00 PM</p>
                                                    </div>
                                                    <div className="event-title pt-2">
                                                        <p className='text-xl lg:text-4xl font-normal uppercase font-marcellus'>Lorem
                                                            ipsum dolor sit amet, consectetur</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-column grid grid-cols-1 gap-6">
                                        <div className="event-item text-white">
                                            <div className="flex gap-6 items-center justify-start">
                                                <div className="event-date text-center">
                                                    <p className="text-2xl lg:text-3xl font-bold font-dmsans">Apr</p>
                                                    <p className='text-4xl lg:text-6xl font-normal pt-4 font-dmsans'>23</p>
                                                </div>
                                                <div className="pl-3 info">
                                                    <div className="event-time">
                                                        <p className='font-dmsans text-sm font-semibold'>8:00 AM - 5:00 PM</p>
                                                    </div>
                                                    <div className="event-title pt-2">
                                                        <p className='text-xl lg:text-4xl font-normal uppercase font-marcellus'>Lorem
                                                            ipsum dolor sit amet, consectetur</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="event-item text-white">
                                            <div className="flex gap-6 items-center justify-start">
                                                <div className="event-date text-center">
                                                    <p className="text-2xl lg:text-3xl font-bold font-dmsans">Apr</p>
                                                    <p className='text-4xl lg:text-6xl font-normal pt-4 font-dmsans'>23</p>
                                                </div>
                                                <div className="pl-3 info">
                                                    <div className="event-time">
                                                        <p className='font-dmsans text-sm font-semibold'>8:00 AM - 5:00 PM</p>
                                                    </div>
                                                    <div className="event-title pt-2">
                                                        <p className='text-xl lg:text-4xl font-normal uppercase font-marcellus'>Lorem
                                                            ipsum dolor sit amet, consectetur</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="event-item text-white">
                                            <div className="flex gap-6 items-center justify-start">
                                                <div className="event-date text-center">
                                                    <p className="text-2xl lg:text-3xl font-bold font-dmsans">Apr</p>
                                                    <p className='text-4xl lg:text-6xl font-normal pt-4 font-dmsans'>23</p>
                                                </div>
                                                <div className="pl-3 info">
                                                    <div className="event-time">
                                                        <p className='font-dmsans text-sm font-semibold'>8:00 AM - 5:00 PM</p>
                                                    </div>
                                                    <div className="event-title pt-2">
                                                        <p className='text-xl lg:text-4xl font-normal uppercase font-marcellus'>Lorem
                                                            ipsum dolor sit amet, consectetur</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-wrapper">
                                <Link
                                    className="inline-block bg-[#f5cd06] text-[#0f0f0f] px-6 py-4 font-semibold text-lg rounded-full capitalize font-dmsans">
                                    View more events</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="blogs-section py-20 lg:py-40">
                    <div className="w-full px-6">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="title-wrapper relative">
                                <h1 className='text-4xl lg:text-6xl font-extrabold mb-3 text-[#0f0f0f] font-marcellus'>Stories & <span
                                    className='text-[#f5cd06]'>Articles</span></h1>
                                <p className='text-6xl lg:text-9xl font-tangerine text-[#000] absolute top-5 opacity-35'>find
                                    inspiration in God</p>
                            </div>
                            <div className="blog-items pt-16 lg:pt-32">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                    <div className="blog-item font-dmsans">
                                        <div className="image">
                                            <img src="/images/slider/slider_1.png" className='h-[250px] object-cover rounded-3xl' />
                                        </div>
                                        <div className="content pt-3">
                                            <div className="date text-[#9f9f9f] font-medium">January 19, 2024</div>
                                            <div className="title pt-1 pb-3">
                                                <h4 className='text-[#0f0f0f] font-bold text-2xl'>Fourth Sunday of Great Lent</h4>
                                            </div>
                                            <div className="content mb-3">
                                                <p className='text-[#666B68]'>The question of the origins of the Christian tradition
                                                    called Baptist has been, and to some extent still is, a much-debated issue.</p>
                                            </div>
                                            <div className="link">
                                                <Link href={route('blogs.show', 'random-post')} className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="blog-item font-dmsans">
                                        <div className="image">
                                            <img src="/images/slider/slider_1.png" className='h-[250px] object-cover rounded-3xl' />
                                        </div>
                                        <div className="content pt-3">
                                            <div className="date text-[#9f9f9f] font-medium">January 19, 2024</div>
                                            <div className="title pt-1 pb-3">
                                                <h4 className='text-[#0f0f0f] font-bold text-2xl'>Fourth Sunday of Great Lent</h4>
                                            </div>
                                            <div className="content mb-3">
                                                <p className='text-[#666B68]'>The question of the origins of the Christian tradition
                                                    called Baptist has been, and to some extent still is, a much-debated issue.</p>
                                            </div>
                                            <div className="link">
                                                <Link href={route('blogs.show', 'random-post')} className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="blog-item font-dmsans">
                                        <div className="image">
                                            <img src="/images/slider/slider_1.png" className='h-[250px] object-cover rounded-3xl' />
                                        </div>
                                        <div className="content pt-3">
                                            <div className="date text-[#9f9f9f] font-medium">January 19, 2024</div>
                                            <div className="title pt-1 pb-3">
                                                <h4 className='text-[#0f0f0f] font-bold text-2xl'>Fourth Sunday of Great Lent</h4>
                                            </div>
                                            <div className="content mb-3">
                                                <p className='text-[#666B68]'>The question of the origins of the Christian tradition
                                                    called Baptist has been, and to some extent still is, a much-debated issue.</p>
                                            </div>
                                            <div className="link">
                                                <Link href={route('blogs.show', 'random-post')} className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </GuestLayout >
    )
}
