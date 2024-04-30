import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { Card, Typography } from '@material-tailwind/react';
import React, { useState } from 'react'
import { DateTime } from 'luxon';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector } from '@tabler/icons-react';
import axios from 'axios';


export default function AttendanceAdmin({ auth, attendance, events, locales }) {

    const TABLE_HEAD = [
        { name: 'SN', sortable: false, asc: true, sortKey: 'id' },
        { name: "Locale", sortable: true, asc: true, sortKey: 'locale_name' },
        { name: 'Event', sortable: true, asc: true, sortKey: 'event_name' },
        { name: 'Date Of Event', sortable: true, asc: true, sortKey: 'event_date' },
        { name: 'Full Name', sortable: true, asc: true, sortKey: 'name' },
        { name: 'Entry Date and Time', sortable: false, asc: true, sortKey: 'created_at' },
    ];
    const [attendanceList, setAttendanceList] = useState([...attendance]);

    const sortData = (key, order) => {
        const sortedData = [...attendanceList].sort((a, b) => {
            let comparison = 0;
            if (typeof a[key] === 'string') {
                comparison = a[key].localeCompare(b[key]);
            } else {
                comparison = a[key] - b[key];
            }
            return order === 'asc' ? comparison : -comparison;
        });
        setAttendanceList(sortedData);
    };


    const [searchData, setSearchData] = useState({
        searchText: '',
        event_id: '',
        locale_id: '',
    })

    function formatDate(dateString) {
        const dateTime = DateTime.fromISO(dateString, { zone: 'utc' }).toLocal();
        return dateTime.toFormat('yyyy-MM-dd h:mm:ss');
    }

    const handleSearchFieldChange = (name, value) => {
        setSearchData({ ...searchData, [name]: value });
    }


    const onClickSearch = async () => {
        const res = await axios.post(route('api.search.attendee'), searchData)
        if (res?.data) {
            setAttendanceList(res.data)
        }
    }

    return (
        <Authenticated user={auth?.user}>
            <Head title="Attendance" />
            <div className="content py-4 font-poppins">
                <div className="content-header px-6 flex justify-between items-center">
                    <div className="left">
                        <h1 className='font-semibold text-gray-800 text-3xl'>Attendance</h1>
                        <div className="pt-2">
                            <ul className='flex gap-1 text-gray-600 text-sm'>
                                <li><Link href={route('dashboard')}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route('admin.events.index')}>Events</Link></li>
                                <li>/</li>
                                <li><Link href={'#'}>Attendance</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="page-content pt-8">
                    <Card className="h-full w-full overflow-scroll rounded-none font-poppins">
                        <div className="filter-row p-4 flex">
                            <div className="grid grid-cols-3 w-full">
                                <div className="">
                                    <input
                                        type="text"
                                        placeholder='Search by attendee...'
                                        className='border w-full focus:ring-0 focus:border-gray-500 rounded-l-md '
                                        value={searchData.searchText}
                                        onChange={(e) => handleSearchFieldChange('searchText', e.target.value)}
                                    />
                                </div>
                                <div className="">
                                    <select
                                        name=""
                                        className='w-full border border-l-0 focus:ring-0 focus:border-gray-500'
                                        value={searchData.event_id}
                                        onChange={(e) => handleSearchFieldChange('event_id', e.target.value)}
                                    >
                                        <option value="">Select Event</option>
                                        {events?.map((event) => (
                                            <option key={event.id} value={event.id}>{event.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <select
                                        name=""
                                        className="w-full border-l-0 focus:ring-0 focus:border-gray-500"
                                        value={searchData.locale_id}
                                        onChange={(e) => handleSearchFieldChange('locale_id', e.target.value)}
                                    >
                                        <option value="">Select Locale</option>
                                        {locales?.map((locale) => (
                                            <option key={locale.id} value={locale.id}>{locale.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button
                                className='bg-blue-500 text-white py-[9px] px-4 text-lg rounded-r-md border border-l-0 relative -top-[1px]'
                                onClick={onClickSearch}
                            >
                                <IconSearch />
                            </button>

                        </div>
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head.name}
                                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 cursor-pointer transition-colors"
                                        >
                                            <div className='flex justify-between'>
                                                <Typography className="font-semibold text-lg leading-none opacity-70 font-poppins flex items-center justify-between gap-2">
                                                    {head.name}
                                                </Typography>
                                                {head?.sortable && (
                                                    <div className="relative mt-1">
                                                        <span className='absolute -top-3 right-0 hover:bg-blue-gray-100 rounded-sm'><IconChevronUp size={18} strokeWidth={1.5} onClick={() => { sortData(head.sortKey, 'asc') }} /></span>
                                                        <span className='absolute -bottom-2 right-0 hover:bg-blue-gray-100 rounded-sm'><IconChevronDown size={18} strokeWidth={1.5} onClick={() => { sortData(head.sortKey, 'desc') }} /></span>
                                                    </div>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceList.map((item, index) => {
                                    const isLast = index === attendanceList.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                    return (
                                        <tr key={index} className="even:bg-blue-gray-50/50">
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{index + 1}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{item?.locale_name}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{item?.event_name}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{item?.event_date}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{item?.name}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{formatDate(item?.created_at)}</Typography>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {attendanceList?.length === 0 && <Typography className="font-medium font-poppins text-center py-6">No data found</Typography>}
                    </Card>
                </div>
            </div>
        </Authenticated>
    )
}
