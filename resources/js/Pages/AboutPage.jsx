import React from 'react'
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

export default function AboutPage({ auth }) {
    return (
        <GuestLayout>
            <Head title="About" />
            <div className="about-page">
                <div className="page-header pt-80 pb-28 ">
                    <div className="max-w-screen-xl mx-auto">
                        <h1 className='font-bold text-7xl text-white'>About Us</h1>
                        <div className="breadcrumbs pt-5">
                            <div className="flex gap-4 font-semibold uppercase font-dmsans text-white">
                                <div className="item"><Link href={route('home')} className="breadcrumb-link">HOME</Link></div>
                                <div className="divider"> | </div>
                                <div className="item"><Link href={route('about')} className="breadcrumb-link text-gray-200">About Us</Link></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="page-content py-32">
                    <div className="welcome-section">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="flex gap-12 items-center justify-center">
                                <div className="w-1/2">
                                    <img src="/images/about-welcome.jpg" className='rounded-[30px]' />
                                </div>
                                <div className="w-1/2">
                                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-3 text-[#0f0f0f]">Welcome to <span className='text-[#f5cd06]'>MCGI Australia</span></h1>
                                    <div className="flex gap-6 py-12">
                                        <div className="w-full">
                                            <div className="content text-lg font-dmsans mb-3 text-[#666B68] font-normal lg:text-lg leading-relaxed">
                                                <p className='mb-3'>
                                                    Welcome to Members Church of God International (MCGI) in Australia. Our journey began in the Philippines, under the leadership of Bro Eli Soriano and Bro Daniel Razon, where the unadulterated teachings of the Lord Jesus Christ were first embraced and propagated. This strong foundation laid in the Philippines has been instrumental in our global expansion, reaching various countries and cultures, including Australia.
                                                </p>
                                                <p className='mb-3'>
                                                    In Australia, MCGI is committed to continuing this legacy by spreading the Gospel and fostering a community grounded in biblical truths. We aim to spiritually empower individuals and contribute positively to the moral and spiritual fabric of Australian society. Our mission here is deeply aligned with MCGI's global vision of sharing hope and love found in the Gospel, nurturing a community where truth and godly compassion thrive.
                                                </p>
                                                <p className='mb-3'>
                                                    Our activities in Australia range from regular worship services and Bible expositions to community outreach and charitable works. We are dedicated to nurturing our members spiritually while also focusing on social responsibilities, like aiding those in need within the Australian community. Our vibrant youth ministry and family counseling services play a crucial role in guiding individuals and families in their spiritual journey, aligning with Christian principles and values.
                                                </p>
                                                <p className='mb-3'>
                                                    MCGI Australia is a melting pot of believers from diverse backgrounds, united in faith and love for God. We embody the teachings and love of Christ, supporting and uplifting each other in our spiritual journey. We warmly welcome everyone to join us in our gatherings and experience the joy and peace that comes from understanding the Bible and living a life dedicated to God.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="beliefs-section">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="flex gap-12 items-center justify-center">
                                <div className="w-1/2">
                                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-3 text-[#0f0f0f]">Our Beliefs and  <span className='text-[#f5cd06]'>Mission</span></h1>
                                    <div className="py-8 items-center justify-center">
                                        <div className="w-full">
                                            <div className="content text-lg font-dmsans mb-3 text-[#666B68] font-normal lg:text-lg leading-relaxed">
                                                <p className='mb-4 italic text-[#86592d]'>
                                                    "For we are His workmanship, created in Christ Jesus for good works, which God prepared beforehand that we should walk in them."
                                                    <span className='block text-[#0f0f0f] font-semibold'>- Ephesians 2:10</span>
                                                </p>
                                                <p className='mb-3'>At MCGI Australia, our mission is deeply rooted in the teachings of the Bible, guiding our journey in faith and community service. We strive to live by Christ's teachings, fostering love, humility, and compassion within our diverse congregation. Our dedication to spreading the gospel and serving the community is unwavering, as we seek to embody the spirit of Christ in all our actions.</p>

                                                <p className='mb-3'>Our congregation is built on a foundation of spiritual enlightenment and moral integrity. We focus on understanding and embodying God's Word, fostering an environment where faith, wisdom, and communal support thrive. We are committed to creating a welcoming and nurturing environment, where every individual can find solace, guidance, and a sense of belonging.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <img src='/images/events.jpg' className='rounded-[30px]' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="beliefs-section">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="flex gap-12 items-center justify-center">
                                <div className="w-1/2">
                                    <img src='/images/charity.png' className='rounded-[30px] w-full' />
                                </div>
                                <div className="w-1/2">
                                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-3 text-[#0f0f0f]">Charity and <span className='text-[#f5cd06]'>Community Service</span></h1>
                                    <div className="py-8 items-center justify-center">
                                        <div className="w-full">
                                            <div className="content text-lg font-dmsans mb-3 text-[#666B68] font-normal lg:text-lg leading-relaxed">
                                                <p className='mb-4 italic text-[#86592d]'>
                                                    "Give, and it will be given to you: good measure, pressed down, shaken together, and running over will be put into your bosom. For with the same measure that you use, it will be measured back to you."
                                                    <span className='block text-[#0f0f0f] font-semibold'>- Luke 6:38</span>
                                                </p>
                                                <p className='mb-3'>At the heart of our church's ethos is a profound commitment to charity and service. MCGI Australia actively engages in outreach programs, community service, and humanitarian efforts, driven by a compassionate desire to help those in need and make a positive impact.</p>
                                                <p className='mb-3'>Our commitment to charity and community service is a cornerstone of our faith. Through acts of kindness and generosity, we express our devotion and fulfill our mission to spread love and compassion, creating a better world for all.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="discover-section pt-32">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="title-wrapper relative">
                                <h1 className='text-[#0f0f0f] text-6xl font-bold font-marcellus'>DISCOVER THE CHURCH</h1>
                                <p className='font-tangerine text-8xl text-[#787777] opacity-35 absolute top-4'>information and guidelines</p>
                            </div>
                            <div className="content py-32">
                                <div className="grid grid-cols-3 gap-12">
                                    <div className="discover-item">
                                        <div className="item-image">
                                            <img src="/images/about/about-1.jpg" alt="" className='rounded-lg' />
                                        </div>
                                        <div className="content py-2">
                                            <div className="title py-2">
                                                <h2 className='font-dmsans font-bold text-2xl'>Church History</h2>
                                            </div>
                                            <p className='font-dmsans mb-3'>Trace back the humble roots of MCGI. From a small-town group of Christians to a religious organization recognized all over the world.</p>
                                            <div className="link">
                                                <Link href='#' className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="discover-item">
                                        <div className="item-image">
                                            <img src="/images/about/about-3.jpg" alt="" className='rounded-lg' />
                                        </div>
                                        <div className="content">
                                            <div className="content py-2">
                                                <div className="title py-2">
                                                    <h2 className='font-dmsans font-bold text-2xl'>Our Belief</h2>
                                                </div>
                                                <p className='font-dmsans mb-3'>What does MCGI believe in? Guided by the Holy Scriptures, the Church believes in the Almighty God, His begotten Son the Lord Jesus Christ, and the Holy Spirit, albeit it adopts a nontrinitarianism orientation. Learn more about the beliefs and doctrines of the Church through this section.</p>
                                                <div className="link">
                                                    <Link href='#' className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="discover-item">
                                        <div className="item-image">
                                            <img src="/images/about/about-2.jpg" alt="" className='rounded-lg' />
                                        </div>
                                        <div className="content py-2">
                                            <div className="title py-2">
                                                <h2 className='font-dmsans font-bold text-2xl'>Church Ministries</h2>
                                            </div>
                                            <p className='font-dmsans mb-3'>Have glimpse of what is happening inside the Church. MCGI has different ministries which pertain to the endeavors member undertake to make the words of God be heard and felt by all through various means. Among these are the Propagation Ministry, the Music Ministry, and the Youth Ministry.</p>
                                            <div className="link">
                                                <Link href='#' className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="discover-item">
                                        <div className="item-image">
                                            <img src="/images/about/about-5.jpg" alt="" className='rounded-lg' />
                                        </div>
                                        <div className="content py-2">
                                            <div className="title py-2">
                                                <h2 className='font-dmsans font-bold text-2xl'>Public Services</h2>
                                            </div>
                                            <p className='font-dmsans mb-3'>Central to the works of Members Church of God International (MCGI) are charitable projects that seek to more effectively and efficiently provide free social services for people needing help.</p>
                                            <div className="link">
                                                <Link href='#' className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="discover-item">
                                        <div className="item-image">
                                            <img src="/images/about/about-4.jpg" alt="" className='rounded-lg' />
                                        </div>
                                        <div className="content py-2">
                                            <div className="title py-2">
                                                <h2 className='font-dmsans font-bold text-2xl'>Propagation and Evangelization Efforts</h2>
                                            </div>
                                            <p className='font-dmsans mb-3'>With the mission to bring salvation closer to mankind, MCGI Servants Bro. Eli Soriano and Bro. Daniel Razon, explored various avenues to make the propagation of the Lord Jesus Christ’s Gospel more accessible.</p>
                                            <div className="link">
                                                <Link href='#' className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="discover-item">
                                        <div className="item-image">
                                            <img src="/images/about/about-6.jpg" alt="" className='rounded-lg' />
                                        </div>
                                        <div className="content py-2">
                                            <div className="title py-2">
                                                <h2 className='font-dmsans font-bold text-2xl'>Religious Services</h2>
                                            </div>
                                            <p className='font-dmsans mb-3'>Members Church of God International (MCGI) holds regular and special Church services and events not only to strengthen members’ spirituality and faith, but also to create opportunities to see brethren face to face and care for each other’s well-being (Heb 10:24).</p>
                                            <div className="link">
                                                <Link href='#' className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}
