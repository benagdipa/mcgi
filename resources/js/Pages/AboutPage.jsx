import React from 'react'
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from "framer-motion";
import Card from '@/Components/Card';
import Badge from '@/Components/Badge';
import Tooltip from '@/Components/Tooltip';
import { FaArrowRight, FaBookOpen, FaHandHoldingHeart, FaPeopleCarry, FaBullhorn, FaPrayingHands, FaChevronUp, FaChevronDown, FaBookReader } from 'react-icons/fa';
import ModernPlaceholder from '@/Components/svg/ModernPlaceholder';
import AboutWelcomeSVG from '@/Components/svg/AboutWelcomeSVG';
import MissionSVG from '@/Components/svg/MissionSVG';
import CharitySVG from '@/Components/svg/CharitySVG';
import DiscoverCardSVG from '@/Components/svg/DiscoverCardSVG';

export default function AboutPage({ auth }) {
    const [showFullWelcome, setShowFullWelcome] = React.useState(false);
    const [showFullMission, setShowFullMission] = React.useState(false);
    const [showFullCharity, setShowFullCharity] = React.useState(false);

    return (
        <GuestLayout user={auth?.user}>
            <Head>
                <title>About Us - MCGI</title>
                <meta name="title" content="About Us"/>
                <meta name="keywords" content="About Us"/>
                <meta name="description" content="Learn about Members Church of God International (MCGI) - our mission, values, and global community."/>
            </Head>
            <div className="about-page">
                <div className="page-header pt-[70px] md:pt-80 pb-28 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-0"></div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto relative z-10">
                            <Badge 
                                color="warning" 
                                variant="solid" 
                                size="lg" 
                                className="mb-4"
                            >
                                About Us
                            </Badge>
                            <h1 className='font-bold text-5xl md:text-7xl text-white mb-4'>About Us</h1>
                            <div className="breadcrumbs pt-4">
                                <div className="flex gap-4 font-semibold text-white items-center">
                                    <div className="item">
                                        <Link 
                                            href={route('home')} 
                                            className="breadcrumb-link hover:text-secondary transition-colors"
                                        >
                                            HOME
                                        </Link>
                                    </div>
                                    <div className="divider text-gray-200">/</div>
                                    <div className="item">
                                        <Link 
                                            href={route('about')} 
                                            className="breadcrumb-link text-gray-200"
                                        >
                                            About Us
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="page-content py-16 md:py-24 lg:py-32">
                    <div className="welcome-section mb-16 lg:mb-20">
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                            <div className="flex gap-8 lg:gap-12 lg:flex-row flex-col items-center justify-between">
                                <div className="lg:w-6/12 w-full">
                                    <div className="aspect-[4/3] lg:aspect-[16/10] rounded-[20px] lg:rounded-[30px] shadow-lg overflow-hidden">
                                        <img 
                                            src="/images/about-welcome.jpg" 
                                            alt="Welcome to MCGI Australia" 
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="lg:w-6/12 w-full"
                                >
                                    <Badge 
                                        color="primary" 
                                        variant="soft" 
                                        size="lg" 
                                        className="mb-4"
                                    >
                                        Welcome
                                    </Badge>
                                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 text-[#0f0f0f]">
                                        Welcome to <span className='text-primary'>MCGI Australia</span>
                                    </h1>
                                    <Card 
                                        className="border-none shadow-lg p-4 lg:p-6 flex flex-col h-full"
                                        hover={true}
                                    >
                                        <div className="content text-lg mb-3 text-[#666B68] font-normal lg:text-lg leading-relaxed flex-1">
                                            <p className='mb-4'>
                                                Welcome to Members Church of God International (MCGI) in Australia. Our journey began in the Philippines, under the leadership of Bro Eli Soriano and Bro Daniel Razon, where the unadulterated teachings of the Lord Jesus Christ were first embraced and propagated.
                                            </p>
                                            <div className={`overflow-hidden transition-all duration-300 ${showFullWelcome ? 'max-h-[1000px]' : 'max-h-0'}`}>
                                                <p className='mb-4'>
                                                    In Australia, MCGI is committed to continuing this legacy by spreading the Gospel and fostering a community grounded in biblical truths. We aim to spiritually empower individuals and contribute positively to the moral and spiritual fabric of Australian society.
                                                </p>
                                                <p className='mb-4'>
                                                    Our activities in Australia range from regular worship services and Bible expositions to community outreach and charitable works. We are dedicated to nurturing our members spiritually while also focusing on social responsibilities.
                                                </p>
                                                <p className='mb-0'>
                                                    MCGI Australia is a melting pot of believers from diverse backgrounds, united in faith and love for God. We embody the teachings and love of Christ, supporting and uplifting each other in our spiritual journey.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-auto">
                                            <button 
                                                onClick={() => setShowFullWelcome(!showFullWelcome)}
                                                className="text-primary hover:text-primary/80 font-semibold flex items-center gap-2"
                                            >
                                                {showFullWelcome ? (
                                                    <>Show Less <FaChevronUp className="text-sm" /></>
                                                ) : (
                                                    <>Read More <FaChevronDown className="text-sm" /></>
                                                )}
                                            </button>
                                        </div>
                                    </Card>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                    <div className="beliefs-section pb-16 lg:pb-24">
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                            <div className="flex gap-8 lg:gap-12 lg:flex-row flex-col-reverse items-center justify-between">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="lg:w-6/12 w-full"
                                >
                                    <Badge 
                                        color="warning" 
                                        variant="solid" 
                                        size="lg" 
                                        className="mb-4"
                                    >
                                        Our Mission
                                    </Badge>
                                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 text-[#0f0f0f]">
                                        Our Beliefs and <span className='text-secondary'>Mission</span>
                                    </h1>
                                    <Card 
                                        className="border-none shadow-lg p-4 lg:p-6 flex flex-col h-full"
                                        variant="default"
                                        hover={true}
                                    >
                                        <blockquote className="mb-6 p-4 border-l-4 border-secondary bg-secondary/10 rounded">
                                            <p className='mb-2 italic text-[#86592d] text-lg'>
                                                "For we are His workmanship, created in Christ Jesus for good works, which God prepared beforehand that we should walk in them."
                                            </p>
                                            <footer className='text-[#0f0f0f] font-semibold'>- Ephesians 2:10</footer>
                                        </blockquote>
                                        
                                        <div className="content text-lg mb-3 text-[#666B68] font-normal lg:text-lg leading-relaxed">
                                            <p className='mb-4'>At MCGI Australia, our mission is deeply rooted in the teachings of the Bible, guiding our journey in faith and community service.</p>
                                            <div className={`overflow-hidden transition-all duration-300 ${showFullMission ? 'max-h-[1000px]' : 'max-h-0'}`}>
                                                <p className='mb-4'>We strive to live by Christ's teachings, fostering love, humility, and compassion within our diverse congregation. Our dedication to spreading the gospel and serving the community is unwavering.</p>
                                                <p className='mb-0'>Our congregation is built on a foundation of spiritual enlightenment and moral integrity, focusing on understanding and embodying God's Word.</p>
                                            </div>
                                            <button 
                                                onClick={() => setShowFullMission(!showFullMission)}
                                                className="text-primary hover:text-primary/80 font-semibold mt-4 flex items-center gap-2"
                                            >
                                                {showFullMission ? (
                                                    <>Show Less <FaChevronUp className="text-sm" /></>
                                                ) : (
                                                    <>Read More <FaChevronDown className="text-sm" /></>
                                                )}
                                            </button>
                                        </div>
                                    </Card>
                                </motion.div>
                                <div className="lg:w-6/12 w-full">
                                    <div className="aspect-[4/3] lg:aspect-[16/10] rounded-[20px] lg:rounded-[30px] shadow-lg overflow-hidden">
                                        <img 
                                            src="/images/events.jpg" 
                                            alt="Our Beliefs and Mission" 
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="charity-section pb-16 lg:pb-24">
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                            <div className="flex gap-8 lg:gap-12 lg:flex-row flex-col items-center justify-between">
                                <div className="lg:w-6/12 w-full">
                                    <div className="aspect-[4/3] lg:aspect-[16/10] rounded-[20px] lg:rounded-[30px] shadow-lg overflow-hidden">
                                        <img 
                                            src="/images/charity.png" 
                                            alt="Charity and Community Service" 
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="lg:w-6/12 w-full"
                                >
                                    <Badge 
                                        color="success" 
                                        variant="soft" 
                                        size="lg" 
                                        className="mb-4"
                                    >
                                        Charity
                                    </Badge>
                                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 text-[#0f0f0f]">
                                        Charity and <span className='text-secondary'>Community Service</span>
                                    </h1>
                                    <Card 
                                        className="border-none shadow-lg p-4 lg:p-6"
                                        variant="default"
                                        hover={true}
                                    >
                                        <blockquote className="mb-6 p-4 border-l-4 border-success bg-success/10 rounded">
                                            <p className='mb-2 italic text-[#86592d] text-lg'>
                                                "Give, and it will be given to you: good measure, pressed down, shaken together, and running over will be put into your bosom."
                                            </p>
                                            <footer className='text-[#0f0f0f] font-semibold'>- Luke 6:38</footer>
                                        </blockquote>
                                        
                                        <div className="content text-lg mb-3 text-[#666B68] font-normal lg:text-lg leading-relaxed">
                                            <p className='mb-4'>At the heart of our church's ethos is a profound commitment to charity and service. MCGI Australia actively engages in outreach programs and humanitarian efforts.</p>
                                            <div className={`overflow-hidden transition-all duration-300 ${showFullCharity ? 'max-h-[1000px]' : 'max-h-0'}`}>
                                                <p className='mb-0'>Through acts of kindness and generosity, we express our devotion and fulfill our mission to spread love and compassion, creating a better world for all.</p>
                                            </div>
                                            <button 
                                                onClick={() => setShowFullCharity(!showFullCharity)}
                                                className="text-primary hover:text-primary/80 font-semibold mt-4 flex items-center gap-2"
                                            >
                                                {showFullCharity ? (
                                                    <>Show Less <FaChevronUp className="text-sm" /></>
                                                ) : (
                                                    <>Read More <FaChevronDown className="text-sm" /></>
                                                )}
                                            </button>
                                        </div>
                                    </Card>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="discover-section pt-12 lg:pt-32">
                            <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                                <div className="title-wrapper relative mb-20">
                                    <Badge 
                                        color="primary" 
                                        variant="soft" 
                                        size="lg" 
                                        className="mb-4"
                                    >
                                        Discover
                                    </Badge>
                                    <h1 className='text-[#0f0f0f] md:text-6xl text-4xl font-bold relative z-10'>
                                        DISCOVER THE CHURCH
                                    </h1>
                                    <p className='md:text-7xl text-2xl text-[#787777] opacity-35 absolute md:top-12 top-[8] z-0'>
                                        information and guidelines
                                    </p>
                                </div>
                                <div className="content py-8 lg:py-16">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                        <Card 
                                            className="discover-item overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-2"
                                            hover={true}
                                        >
                                            <div className="item-image overflow-hidden rounded-t-xl aspect-[16/9]">
                                                <img 
                                                    src="/images/about/about-1.jpg" 
                                                    alt="Church History" 
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                                />
                                            </div>
                                            <div className="content p-6">
                                                <div className="title py-2 flex items-center gap-3">
                                                    <FaBookOpen className="text-primary text-xl" />
                                                    <h2 className='font-bold text-2xl'>Church History</h2>
                                                </div>
                                                <p className='mb-6 text-gray-600'>Trace back the humble roots of MCGI. From a small-town group of Christians to a religious organization recognized all over the world.</p>
                                                <div className="link">
                                                    <Link 
                                                        href='#' 
                                                        className='inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors'
                                                    >
                                                        Read More
                                                        <FaArrowRight className="ml-2 text-sm" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>

                                        <Card 
                                            className="discover-item overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-2"
                                            hover={true}
                                        >
                                            <div className="item-image overflow-hidden rounded-t-xl aspect-[16/9]">
                                                <img 
                                                    src="/images/about/about-3.jpg" 
                                                    alt="Our Belief" 
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                                />
                                            </div>
                                            <div className="content p-6">
                                                <div className="title py-2 flex items-center gap-3">
                                                    <FaBookReader className="text-primary text-xl" />
                                                    <h2 className='font-bold text-2xl'>Our Belief</h2>
                                                </div>
                                                <p className='mb-6 text-gray-600'>What does MCGI believe in? Guided by the Holy Scriptures, the Church believes in the Almighty God, His begotten Son the Lord Jesus Christ, and the Holy Spirit, albeit it adopts a nontrinitarianism orientation.</p>
                                                <div className="link">
                                                    <Link 
                                                        href='#' 
                                                        className='inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors'
                                                    >
                                                        Read More
                                                        <FaArrowRight className="ml-2 text-sm" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>

                                        <Card 
                                            className="discover-item overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-2"
                                            hover={true}
                                        >
                                            <div className="item-image overflow-hidden rounded-t-xl aspect-[16/9]">
                                                <img 
                                                    src="/images/about/about-2.jpg" 
                                                    alt="Church Ministries" 
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                                />
                                            </div>
                                            <div className="content p-6">
                                                <div className="title py-2 flex items-center gap-3">
                                                    <FaPeopleCarry className="text-primary text-xl" />
                                                    <h2 className='font-bold text-2xl'>Church Ministries</h2>
                                                </div>
                                                <p className='mb-6 text-gray-600'>Have glimpse of what is happening inside the Church. MCGI has different ministries which pertain to the endeavors member undertake to make the words of God be heard and felt by all through various means.</p>
                                                <div className="link">
                                                    <Link 
                                                        href='#' 
                                                        className='inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors'
                                                    >
                                                        Read More
                                                        <FaArrowRight className="ml-2 text-sm" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>

                                        <Card 
                                            className="discover-item overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-2"
                                            hover={true}
                                        >
                                            <div className="item-image overflow-hidden rounded-t-xl aspect-[16/9]">
                                                <img 
                                                    src="/images/about/about-5.jpg" 
                                                    alt="Public Services" 
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                                />
                                            </div>
                                            <div className="content p-6">
                                                <div className="title py-2 flex items-center gap-3">
                                                    <FaHandHoldingHeart className="text-primary text-xl" />
                                                    <h2 className='font-bold text-2xl'>Public Services</h2>
                                                </div>
                                                <p className='mb-6 text-gray-600'>Central to the works of Members Church of God International (MCGI) are charitable projects that seek to more effectively and efficiently provide free social services for people needing help.</p>
                                                <div className="link">
                                                    <Link 
                                                        href='#' 
                                                        className='inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors'
                                                    >
                                                        Read More
                                                        <FaArrowRight className="ml-2 text-sm" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>

                                        <Card 
                                            className="discover-item overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-2"
                                            hover={true}
                                        >
                                            <div className="item-image overflow-hidden rounded-t-xl aspect-[16/9]">
                                                <img 
                                                    src="/images/about/about-4.jpg" 
                                                    alt="Propagation and Evangelization" 
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                                />
                                            </div>
                                            <div className="content p-6">
                                                <div className="title py-2 flex items-center gap-3">
                                                    <FaBullhorn className="text-primary text-xl" />
                                                    <h2 className='font-bold text-2xl'>Propagation and Evangelization</h2>
                                                </div>
                                                <p className='mb-6 text-gray-600'>With the mission to bring salvation closer to mankind, MCGI Servants Bro. Eli Soriano and Bro. Daniel Razon, explored various avenues to make the propagation of the Lord Jesus Christ's Gospel more accessible.</p>
                                                <div className="link">
                                                    <Link 
                                                        href='#' 
                                                        className='inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors'
                                                    >
                                                        Read More
                                                        <FaArrowRight className="ml-2 text-sm" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>

                                        <Card 
                                            className="discover-item overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-2"
                                            hover={true}
                                        >
                                            <div className="item-image overflow-hidden rounded-t-xl aspect-[16/9]">
                                                <img 
                                                    src="/images/about/about-6.jpg" 
                                                    alt="Religious Services" 
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                                />
                                            </div>
                                            <div className="content p-6">
                                                <div className="title py-2 flex items-center gap-3">
                                                    <FaPrayingHands className="text-primary text-xl" />
                                                    <h2 className='font-bold text-2xl'>Religious Services</h2>
                                                </div>
                                                <p className='mb-6 text-gray-600'>Members Church of God International (MCGI) holds regular and special Church services and events not only to strengthen members' spirituality and faith, but also to create opportunities to see brethren face to face.</p>
                                                <div className="link">
                                                    <Link 
                                                        href='#' 
                                                        className='inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors'
                                                    >
                                                        Read More
                                                        <FaArrowRight className="ml-2 text-sm" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-24">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Badge 
                                color="primary" 
                                variant="soft" 
                                size="lg" 
                                className="mb-4"
                            >
                                Our Mission
                            </Badge>
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">
                                Spreading God's Word Worldwide
                            </h2>
                            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                Our mission is to reach out to people from all walks of life, sharing the true message of salvation through biblical teachings and acts of charity. We believe in making a positive impact in the lives of others through faith, love, and good works.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href={route('contact')}
                                    className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Get in Touch
                                </Link>
                                <Link
                                    href={route('events.index')}
                                    className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Our Events
                                </Link>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="aspect-video rounded-2xl overflow-hidden">
                                <ModernPlaceholder theme="featured" className="w-full h-full" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24">
                <div className="max-w-screen-xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-r from-primary/90 to-primary/70 rounded-3xl p-8 md:p-12 text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Join Our Community
                        </h2>
                        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                            Be part of a global community dedicated to spreading God's word and helping others. Together, we can make a difference.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href={route('events.index')}
                                className="inline-flex items-center px-8 py-4 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Upcoming Events
                                <FaArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </GuestLayout>
    )
}
