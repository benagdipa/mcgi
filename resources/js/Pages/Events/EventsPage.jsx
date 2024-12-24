import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import Guest from '@/Layouts/GuestLayout'
import { Head, Link, router, useForm } from '@inertiajs/react'
import { FaMapMarkerAlt } from "react-icons/fa";

import { AiOutlinePlus } from "react-icons/ai";
import { RiCloseLargeFill } from "react-icons/ri";
import React, { useState } from 'react'
import { format, getYear } from 'date-fns';
import { Radio, Typography } from '@material-tailwind/react';

export default function EventsPage({ auth, events, locale }) {

    const daysList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [attendanceModal, setAttendanceModal] = useState(false)
    const [message, setMessage] = useState('')
    const [selectedEventTitle, setSelectedEventTitle] = useState('')
    const randomId = function (length = 6) {
        return Math.random().toString(36).substring(2, length + 2);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        event_id: '',
        attendenceRows: [{
            id: randomId(),
            name: auth.user?.first_name ? auth.user?.first_name + ' ' + auth.user?.last_name : '',
            email: auth.user?.email ? auth.user?.email : '',
            phone: auth.user?.phone ? auth.user?.phone : '',
            locale: auth.user?.local ? auth.user?.local : '',
            type: ''
        }],
    });

    const addRow = () => {
        const newRow = { id: randomId(), name: '' };
        setData('attendenceRows', [...data.attendenceRows, newRow]);
    };

    const removeRow = (id) => {
        setData('attendenceRows', data.attendenceRows.filter(row => row.id !== id));
    };

    const openAttendanceModal = (event_id) => {
        if (auth?.user) {
            setData('event_id', event_id);
            setSelectedEventTitle(events.filter(event => event.id === event_id)[0].title)
            setAttendanceModal(true)
        } else {
            router.visit(route('login', { event_message: "only registered users are able to enter attendance" }));
        }
    }

    const closeAttendanceModal = () => {
        reset();
        setSelectedEventTitle('')
        setAttendanceModal(false)
        setMessage('')
    }

    const handleChange = (id, field, value) => {
        const updatedRows = data.attendenceRows.map(row => {
            if (row.id === id) {
                return { ...row, [field]: value };
            }
            return row;
        })
        setData('attendenceRows', updatedRows);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('event.attendence.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setMessage('Attendance Marked Successfully')
            },
        });
    }
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
                <meta name="title" content="Members Church of God International Calendar of Events" />
                <meta name="keywords" content="Events" />
                <meta name="descriptions" content="Keep updated with the schedule of Church Services and forthcoming Events of the Members Church of God International (MCGI). Add important dates to your Google calendar for reminders." />
            </Head>
            <div className="events-page">
                <div className="page-header pt-20 xl:pt-80 pb-28 ">
                    <div className="w-full">
                        <div className=" lg:max-w-screen-xl w-11/12 mx-auto">
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
                <div className="lg:w-full w-11/12 mx-auto mt-16">
                    <div className="max-w-screen-xl mx-auto">
                        <div className="events-list-wrapper">
                            <div className="monthly-events">
                                <div className="flex items-center relative">
                                    <span className='w-32 font-bold text-xl font-dmsans'>{`${format(new Date(), 'MMMM')} ${getYear(new Date())}`} </span>
                                    <span className='block border-t h w-full border-black'></span>
                                </div>
                                <div className="events my-12">
                                    {events.length > 0 && events?.map((item, index) => {
                                        const date = new Date(item?.start_date)
                                        const dayOfWeek = date.getDay();
                                        return (
                                            <React.Fragment key={item?.id}>
                                                <div className="event-wrapper cursor-pointer border-b pt-6 pb-6">
                                                    <div className="flex  gap-4">
                                                        <div className="date basis-1/12">
                                                            <div className="text-center font-dmsans">
                                                                <p className='text-lg text-black'>{daysList[dayOfWeek]} <span className='block text-4xl font-bold'>{date.getDate()}</span></p>
                                                            </div>
                                                        </div>
                                                        <div className="event-content basis-11/12">
                                                            <div className="flex flex-col md:flex-row flex-wrap">
                                                                <div className="md:w-9/12 w-full">
                                                                    <span className='font-dmsans'>{formatDateRange(item?.start_date, item?.end_date)}</span>
                                                                    <h1 className='font-marcellus font-semibold md:text-4xl text-2xl uppercase mt-2 leading-snug'>{item?.title}</h1>
                                                                    <div className='mt-4 text-gray-500 text-base'>
                                                                        <div className="font-dmsans mb-3 flex items-center gap-1"><span><FaMapMarkerAlt strokeWidth={2} size={16} /></span>{item?.address}</div>
                                                                        <div dangerouslySetInnerHTML={{ __html: item?.content }} />
                                                                    </div>
                                                                </div>
                                                                <div className="md:w-3/12 w-full">
                                                                    <div className="flex flex-col ali md:justify-end items-end ">
                                                                        {item?.featured_image ? <img src={item?.featured_image} alt={item?.title} className='w-full' /> : <img src='/images/logo.png' width={200} className="w-full" />}
                                                                        {item?.isImminent && (
                                                                            <div className='flex items-center justify-between gap-2'>
                                                                                <p className='mt-8 text-sm bg-yellow-500 px-4 py-3 font-semibold rounded-md' onClick={() => openAttendanceModal(item?.id)}>Register Now</p>
                                                                                <Link href={route('events.form')} className='mt-8 text-sm bg-blue-500 px-4 py-3 font-semibold rounded-md text-white'>Itinerary</Link>
                                                                            </div>
                                                                        )}
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

            {/* Attendance Modal  */}
            <Modal show={attendanceModal} onClose={closeAttendanceModal} maxWidth={'xxl'}>
                <div className="attendance-modal px-6 py-8 relative font-poppins">
                    <h1 className='font-bold text-3xl'>{selectedEventTitle} Attendance</h1>
                    <div className="absolute md:-top-8 md:-right-8 top-0 right-0 md:text-white cursor-pointer">
                        <RiCloseLargeFill strokeWidth={1.5} size={38} onClick={closeAttendanceModal} />
                    </div>
                    <div className="gap-2 pt-6">
                        <div className="mt-6">
                            <form onSubmit={handleSubmit}>
                                <div className="w-full">
                                    {data?.attendenceRows?.length > 0 && data?.attendenceRows?.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                {index > 0 && (
                                                    <div className='mb-4'>
                                                        <div className='flex -ml-3 gap-6'>
                                                            <Radio
                                                                name={`participant_type_${index}`}
                                                                color="amber"
                                                                label={<Typography className='font-semibold'>Member</Typography>}
                                                                className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                                                                onChange={(e) => handleChange(item.id, 'type', 'Member')}

                                                            />
                                                            <Radio
                                                                name={`participant_type_${index}`}
                                                                color="amber"
                                                                label={<Typography className='font-semibold'>Guest</Typography>}
                                                                className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                                                                onChange={(e) => handleChange(item.id, 'type', 'Guest')}
                                                            />
                                                            <Radio
                                                                name={`participant_type_${index}`}
                                                                color="amber"
                                                                label={<Typography className='font-semibold'>Kids/Teens</Typography>}
                                                                className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                                                                onChange={(e) => handleChange(item.id, 'type', 'Kids/Teens')}
                                                            />
                                                        </div>
                                                        <InputError message={errors[`attendenceRows.${index}.type`]} />
                                                    </div>
                                                )}

                                                <div className="md:flex grid grid-rows-4 grid-flow-col gap-4 mb-6 items-center">
                                                    <div className={`${index !== 0 ? 'md:w-full' : 'md:w-1/4'}`}>
                                                        <InputLabel value="Full Name" className='mb-1 text-sm md:text-base font-poppins font-semibold' />
                                                        <TextInput
                                                            type="text"
                                                            className="w-full"
                                                            placeholder="Name..."
                                                            value={item?.name}
                                                            onChange={(e) => handleChange(item.id, 'name', e.target.value)}

                                                        />
                                                        <InputError message={errors[`attendenceRows.${index}.name`]} className="absolute" />
                                                    </div>
                                                    {index === 0 && (
                                                        <>
                                                            <div className="md:w-1/4">
                                                                <InputLabel value="Email Address" className='mb-1 text-sm md:text-base font-poppins font-semibold' />
                                                                <TextInput
                                                                    type="email"
                                                                    className="w-full"
                                                                    placeholder="Email Address..."
                                                                    value={item?.email}
                                                                    onChange={(e) => handleChange(item.id, 'email', e.target.value)}
                                                                />
                                                                <InputError message={errors[`attendenceRows.${index}.email`]} className="absolute" />
                                                            </div>
                                                            <div className="md:w-1/4">
                                                                <InputLabel value="Phone" className='mb-1 text-sm md:text-base font-poppins font-semibold' />
                                                                <TextInput
                                                                    type="text"
                                                                    className="w-full"
                                                                    placeholder="Phone..."
                                                                    value={item?.phone}
                                                                    onChange={(e) => handleChange(item.id, 'phone', e.target.value)}
                                                                />
                                                                <InputError message={errors[`attendenceRows.${index}.phone`]} className="absolute" />
                                                            </div>
                                                            <div className="md:w-1/4">
                                                                <InputLabel value="Locale" className='mb-1 text-sm md:text-base font-poppins font-semibold' />
                                                                <select
                                                                    name="locale"
                                                                    className='w-full border-gray-300 focus:border-yellow-500 focus:ring-0 rounded-md shadow-sm'
                                                                    value={item?.locale}
                                                                    onChange={(e) => handleChange(item.id, 'locale', e.target.value)}
                                                                >
                                                                    <option value="">Select</option>
                                                                    {locale?.map((item, index) => { return (<option key={index} value={item.id}>{item.title}</option>) })}
                                                                </select>
                                                                <InputError message={errors[`attendenceRows.${index}.locale`]} className="absolute" />
                                                            </div>
                                                        </>
                                                    )}
                                                    <div className="btn-wrapper px-3 pt-5 cursor-pointer">
                                                        {index === data?.attendenceRows.length - 1 ? (
                                                            <AiOutlinePlus onClick={() => addRow()} />
                                                        ) : (
                                                            <RiCloseLargeFill onClick={() => removeRow(item.id)} />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <input type='hidden' name='event_id' value={data?.event_id} />
                                </div>
                                <div className="mt-6 text-right">
                                    <button
                                        className='bg-blue-500 text-white px-6 py-3 font-semibold rounded font-xl'
                                        disabled={message ? true : false}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                            {message && (
                                <div className='border rounded border-green-300 mt-6 px-6 py-2'>
                                    {message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </Guest >
    )
}
