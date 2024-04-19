import Guest from '@/Layouts/GuestLayout'
import { Head, Link } from '@inertiajs/react'
import { IconMapPin } from '@tabler/icons-react'
import React from 'react'

export default function EventsPage({ auth, events }) {

    const daysList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    function formatDateRange(start_date_str, end_date_str) {
        const startDateObj = new Date(start_date_str);
        const endDateObj = new Date(end_date_str);
        const startDateFormat = startDateObj.toLocaleString('default', { month: 'long', day: 'numeric' });
        const endDateFormat = endDateObj.toLocaleString('default', { month: 'long', day: 'numeric' });
        const startTimeFormat = startDateObj.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: true });
        const endTimeFormat = endDateObj.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: true });
        if (startDateObj.toDateString() === endDateObj.toDateString()) {
            return `${startDateFormat} @ ${startTimeFormat} - ${endTimeFormat}`;
        } else {
            return `${startDateFormat} @ ${startTimeFormat} - ${endDateFormat} @ ${endTimeFormat}`;
        }
    }


    return (
        <Guest user={auth?.user}>
            <Head>
                <title>Members Church of God International Calendar of Events</title>
                <meta name="title" content="Members Church of God International Calendar of Events"/>
                <meta name="keywords" content="Events"/>
                <meta name="descriptions" content="Keep updated with the schedule of Church Services and forthcoming Events of the Members Church of God International (MCGI). Add important dates to your Google calendar for reminders."/>
            </Head>
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
                                    {events.length > 0 && events?.map((item, index) => {
                                        const date = new Date(item?.start_date)
                                        const dayOfWeek = date.getDay();

                                        return (
                                            <React.Fragment key={item?.id}>
                                                <div className="event-wrapper mb-8">
                                                    <div className="flex gap-4">
                                                        <div className="date basis-1/12">
                                                            <div className="text-center font-dmsans">
                                                                <p className='text-lg text-black'>{daysList[dayOfWeek]} <span className='block text-4xl font-bold'>{date.getDate()}</span></p>
                                                            </div>
                                                        </div>
                                                        <div className="event-content basis-11/12">
                                                            <div className="flex">
                                                                <div className="w-full">
                                                                    <span className='font-dmsans'>{formatDateRange(item?.start_date, item?.end_date)}</span>
                                                                    <h1 className='font-marcellus font-semibold text-4xl uppercase mt-2 leading-snug'>{item?.title}</h1>
                                                                    <div className='mt-4 text-gray-500 text-base'>
                                                                        <div className="font-dmsans mb-3 flex items-center gap-1"><span><IconMapPin strokeWidth={2} size={16} /></span>{item?.address}</div>
                                                                        <div dangerouslySetInnerHTML={{ __html: item?.content }} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    )
}
