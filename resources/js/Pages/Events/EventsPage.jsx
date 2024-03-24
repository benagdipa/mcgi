import Guest from '@/Layouts/GuestLayout'
import { Head, Link } from '@inertiajs/react'
import { IconMapPin } from '@tabler/icons-react'
import React from 'react'

export default function EventsPage({ auth }) {
    return (
        <Guest user={auth?.user}>
            <Head title='Events' />
            <div className="events-page">
                <div className="page-header pt-80 pb-28 ">
                    <div className="w-full">
                        <div className="max-w-screen-xl mx-auto">
                            <h1 className='font-bold text-7xl text-white'>Events</h1>
                            <div className="breadcrumbs pt-5">
                                <div className="flex gap-4 font-semibold uppercase font-dmsans text-white">
                                    <div className="item"><Link href={route('home')} className="breadcrumb-link">HOME</Link></div>
                                    <div className="divider"> | </div>
                                    <div className="item"><Link href={route('events.index')} className="breadcrumb-link text-gray-200">Events</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-16">
                    <div className="max-w-screen-xl mx-auto">
                        <div className="events-list-wrapper">
                            <div className="monthly-events">
                                <div className="flex items-center relative">
                                    <span className='w-32 font-bold text-xl font-dmsans'>April 2024</span>
                                    <span className='block border-t h w-full border-black'></span>
                                </div>
                                <div className="events my-12">
                                    <div className="event-wrapper">
                                        <div className="flex">
                                            <div className="date basis-1/12">
                                                <div className="text-center font-dmsans">
                                                    <p className='text-lg text-black'>Tue <span className='block text-4xl font-bold'>2</span></p>
                                                </div>
                                            </div>
                                            <div className="event-content basis-11/12">
                                                <div className="flex">
                                                    <div className="w-2/3 font-dmsans">
                                                        <span className='font-dmsans'>April 2 @ 8:00 am - 5:00 pm</span>
                                                        <h1 className='font-marcellus font-semibold text-4xl uppercase mt-2 leading-snug'>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
                                                        <div className='mt-4 text-gray-500 text-base'>
                                                            <div className="font-dmsans mb-3 flex items-center gap-1"><span><IconMapPin strokeWidth={2} size={16} /></span> Church 350 5th Ave, New York, NY, United States</div>
                                                            <p>All mothers are invited to our February MOM's Group meeting!</p>
                                                        </div>
                                                    </div>
                                                    <div className="image-wrapper w-1/3">
                                                        <img src="/images/events.jpg" alt="" className='w-full h-[300px] object-contain' />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-wrapper mt-4">
                                        <div className="flex">
                                            <div className="date basis-1/12">
                                                <div className="text-center font-dmsans">
                                                    <p className='text-lg text-black'>Tue <span className='block text-4xl font-bold'>2</span></p>
                                                </div>
                                            </div>
                                            <div className="event-content basis-11/12">
                                                <div className="flex">
                                                    <div className="w-2/3 font-dmsans">
                                                        <span className='font-dmsans'>April 2 @ 8:00 am - 5:00 pm</span>
                                                        <h1 className='font-marcellus font-semibold text-4xl uppercase mt-2 leading-snug'>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
                                                        <div className='mt-4 text-gray-500 text-base'>
                                                            <div className="font-dmsans mb-3 flex items-center gap-1"><span><IconMapPin strokeWidth={2} size={16} /></span> Church 350 5th Ave, New York, NY, United States</div>
                                                            <p>All mothers are invited to our February MOM's Group meeting!</p>
                                                        </div>
                                                    </div>
                                                    <div className="image-wrapper w-1/3">
                                                        <img src="/images/events.jpg" alt="" className='w-full h-[300px] object-contain' />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-wrapper mt-4">
                                        <div className="flex">
                                            <div className="date basis-1/12">
                                                <div className="text-center font-dmsans">
                                                    <p className='text-lg text-black'>Tue <span className='block text-4xl font-bold'>2</span></p>
                                                </div>
                                            </div>
                                            <div className="event-content basis-11/12">
                                                <div className="flex">
                                                    <div className="w-2/3 font-dmsans">
                                                        <span className='font-dmsans'>April 2 @ 8:00 am - 5:00 pm</span>
                                                        <h1 className='font-marcellus font-semibold text-4xl uppercase mt-2 leading-snug'>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
                                                        <div className='mt-4 text-gray-500 text-base'>
                                                            <div className="font-dmsans mb-3 flex items-center gap-1"><span><IconMapPin strokeWidth={2} size={16} /></span> Church 350 5th Ave, New York, NY, United States</div>
                                                            <p>All mothers are invited to our February MOM's Group meeting!</p>
                                                        </div>
                                                    </div>
                                                    <div className="image-wrapper w-1/3">
                                                        <img src="/images/events.jpg" alt="" className='w-full h-[300px] object-contain' />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-wrapper mt-4">
                                        <div className="flex">
                                            <div className="date basis-1/12">
                                                <div className="text-center font-dmsans">
                                                    <p className='text-lg text-black'>Tue <span className='block text-4xl font-bold'>2</span></p>
                                                </div>
                                            </div>
                                            <div className="event-content basis-11/12">
                                                <div className="flex">
                                                    <div className="w-2/3 font-dmsans">
                                                        <span className='font-dmsans'>April 2 @ 8:00 am - 5:00 pm</span>
                                                        <h1 className='font-marcellus font-semibold text-4xl uppercase mt-2 leading-snug'>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
                                                        <div className='mt-4 text-gray-500 text-base'>
                                                            <div className="font-dmsans mb-3 flex items-center gap-1"><span><IconMapPin strokeWidth={2} size={16} /></span> Church 350 5th Ave, New York, NY, United States</div>
                                                            <p>All mothers are invited to our February MOM's Group meeting!</p>
                                                        </div>
                                                    </div>
                                                    <div className="image-wrapper w-1/3">
                                                        <img src="/images/events.jpg" alt="" className='w-full h-[300px] object-contain' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="monthly-events">
                                <div className="flex items-center relative">
                                    <span className='w-32 font-bold text-xl font-dmsans'>May 2024</span>
                                    <span className='block border-t h w-full border-black'></span>
                                </div>
                                <div className="events my-12">
                                    <div className="event-wrapper">
                                        <div className="flex">
                                            <div className="date basis-1/12">
                                                <div className="text-center font-dmsans">
                                                    <p className='text-lg text-black'>Tue <span className='block text-4xl font-bold'>2</span></p>
                                                </div>
                                            </div>
                                            <div className="event-content basis-11/12">
                                                <div className="flex">
                                                    <div className="w-2/3 font-dmsans">
                                                        <span className='font-dmsans'>April 2 @ 8:00 am - 5:00 pm</span>
                                                        <h1 className='font-marcellus font-semibold text-4xl uppercase mt-2 leading-snug'>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
                                                        <div className='mt-4 text-gray-500 text-base'>
                                                            <div className="font-dmsans mb-3 flex items-center gap-1"><span><IconMapPin strokeWidth={2} size={16} /></span> Church 350 5th Ave, New York, NY, United States</div>
                                                            <p>All mothers are invited to our February MOM's Group meeting!</p>
                                                        </div>
                                                    </div>
                                                    <div className="image-wrapper w-1/3">
                                                        <img src="/images/events.jpg" alt="" className='w-full h-[300px] object-contain' />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-wrapper mt-4">
                                        <div className="flex">
                                            <div className="date basis-1/12">
                                                <div className="text-center font-dmsans">
                                                    <p className='text-lg text-black'>Tue <span className='block text-4xl font-bold'>2</span></p>
                                                </div>
                                            </div>
                                            <div className="event-content basis-11/12">
                                                <div className="flex">
                                                    <div className="w-2/3 font-dmsans">
                                                        <span className='font-dmsans'>April 2 @ 8:00 am - 5:00 pm</span>
                                                        <h1 className='font-marcellus font-semibold text-4xl uppercase mt-2 leading-snug'>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
                                                        <div className='mt-4 text-gray-500 text-base'>
                                                            <div className="font-dmsans mb-3 flex items-center gap-1"><span><IconMapPin strokeWidth={2} size={16} /></span> Church 350 5th Ave, New York, NY, United States</div>
                                                            <p>All mothers are invited to our February MOM's Group meeting!</p>
                                                        </div>
                                                    </div>
                                                    <div className="image-wrapper w-1/3">
                                                        <img src="/images/events.jpg" alt="" className='w-full h-[300px] object-contain' />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-wrapper mt-4">
                                        <div className="flex">
                                            <div className="date basis-1/12">
                                                <div className="text-center font-dmsans">
                                                    <p className='text-lg text-black'>Tue <span className='block text-4xl font-bold'>2</span></p>
                                                </div>
                                            </div>
                                            <div className="event-content basis-11/12">
                                                <div className="flex">
                                                    <div className="w-2/3 font-dmsans">
                                                        <span className='font-dmsans'>April 2 @ 8:00 am - 5:00 pm</span>
                                                        <h1 className='font-marcellus font-semibold text-4xl uppercase mt-2 leading-snug'>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
                                                        <div className='mt-4 text-gray-500 text-base'>
                                                            <div className="font-dmsans mb-3 flex items-center gap-1"><span><IconMapPin strokeWidth={2} size={16} /></span> Church 350 5th Ave, New York, NY, United States</div>
                                                            <p>All mothers are invited to our February MOM's Group meeting!</p>
                                                        </div>
                                                    </div>
                                                    <div className="image-wrapper w-1/3">
                                                        <img src="/images/events.jpg" alt="" className='w-full h-[300px] object-contain' />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-wrapper mt-4">
                                        <div className="flex">
                                            <div className="date basis-1/12">
                                                <div className="text-center font-dmsans">
                                                    <p className='text-lg text-black'>Tue <span className='block text-4xl font-bold'>2</span></p>
                                                </div>
                                            </div>
                                            <div className="event-content basis-11/12">
                                                <div className="flex">
                                                    <div className="w-2/3 font-dmsans">
                                                        <span className='font-dmsans'>April 2 @ 8:00 am - 5:00 pm</span>
                                                        <h1 className='font-marcellus font-semibold text-4xl uppercase mt-2 leading-snug'>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
                                                        <div className='mt-4 text-gray-500 text-base'>
                                                            <div className="font-dmsans mb-3 flex items-center gap-1"><span><IconMapPin strokeWidth={2} size={16} /></span> Church 350 5th Ave, New York, NY, United States</div>
                                                            <p>All mothers are invited to our February MOM's Group meeting!</p>
                                                        </div>
                                                    </div>
                                                    <div className="image-wrapper w-1/3">
                                                        <img src="/images/events.jpg" alt="" className='w-full h-[300px] object-contain' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    )
}
