import React from 'react'
import { Head, Link } from '@inertiajs/react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Card, Typography } from '@material-tailwind/react';

export default function EventForms({ auth, event_forms }) {
    const TABLE_HEAD = [
        { name: 'SN' },
        { name: 'Email' },
        { name: 'Full Name' },
        { name: 'Actions' },
    ];
    const handleExport = async () => {
        try {
            const res = await axios.get(route('api.export.form'))
            const blob = new Blob([res.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'form.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            console.error('Error exporting to CSV:', error);
        }
    }
    return (
        <Authenticated user={auth?.user}>
            <Head title="Forms" />
            <div className="content py-4 font-poppins">
                <div className="content-header px-6 flex justify-between items-center">
                    <div className="left">
                        <h1 className='font-semibold text-gray-800 text-3xl'>Forms</h1>
                        <div className="pt-2">
                            <ul className='flex gap-1 text-gray-600 text-sm'>
                                <li><Link href={route('dashboard')}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route('admin.events.index')}>Events</Link></li>
                                <li>/</li>
                                <li><Link href={'#'}>Forms</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="right flex gap-4">
                        <button onClick={handleExport} className='bg-[#f5cd06] shadow-lg text-[#0f0f0f] px-5 py-3 rounded-md font-semibold text-sm font-poppins'>Export</button>
                    </div>
                </div>
                <div className="page-content pt-8">
                    <Card className="h-full w-full overflow-scroll rounded-none font-poppins">
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
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    event_forms?.map((form, index) => {
                                        const isLast = index === event_forms.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                        const step_1 = JSON.parse(form?.step_1);
                                        const step_2 = JSON.parse(form?.step_2);
                                        return (
                                            <tr key={form.id}>
                                                <td className="border-b border-blue-gray-50 p-4">
                                                    <Typography className="text-base font-medium leading-none text-blue-gray-600">{index + 1}</Typography>
                                                </td>
                                                <td className="border-b border-blue-gray-50 p-4">
                                                    <Typography className="text-base font-medium leading-none text-blue-gray-600">{step_1?.email}</Typography>
                                                </td>
                                                <td className="border-b border-blue-gray-50 p-4">
                                                    <Typography className="text-base font-medium leading-none text-blue-gray-600">{step_2?.full_name}</Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography className="font-medium font-poppins text-sm underline">
                                                        <Link href={route('admin.events.forms.view', form?.id)}>
                                                            View more
                                                        </Link>
                                                    </Typography>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </Card>
                </div>
            </div>
        </Authenticated>
    )
}
