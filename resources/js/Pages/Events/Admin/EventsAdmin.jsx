import Modal from '@/Components/Modal';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import { Card, Typography } from '@material-tailwind/react';
import { IconChevronDown, IconChevronUp, IconX } from '@tabler/icons-react';
import React, { useState } from 'react'

export default function EventsAdmin({ auth, events }) {

    const TABLE_HEAD = ["SN", "Event Title", "Start Date", "End Date", "Address", "Status", "Action"];
    const TABLE_ROWS = events;

    const [deleteModal, setDeleteModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState('')

    const openDeleteModal = (id) => {
        setSelectedItem(id)
        setDeleteModal(true)
    }
    const closeDeleteModal = () => {
        setDeleteModal(false)
    }

    const handleDeleteFunc = () => {
        if (selectedItem) {
            router.delete(route('admin.events.delete', selectedItem), {
                onSuccess: () => {
                    closeDeleteModal()
                }
            })
        }
    }
    const sortData = (key, order) => {
        router.visit(route('admin.events.index', { sort: key, order: order }));
    }
    return (
        <Authenticated user={auth?.user}>
            <Head title='Events' />
            <div className="content py-4 font-poppins">
                <div className="content-header px-6 flex justify-between items-center">
                    <div className="left">
                        <h1 className='font-semibold text-gray-800 text-3xl'>Events</h1>
                        <div className="pt-2">
                            <ul className='flex gap-1 text-gray-600 text-sm'>
                                <li><Link href={route('dashboard')}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route('admin.events.index')}>Events</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        <Link href={route('admin.events.add')} className='bg-[#f5cd06] shadow-lg text-[#0f0f0f] px-5 py-3 rounded-md font-semibold text-lg font-poppins'>Add New</Link>
                    </div>
                </div>
                <div className="page-content pt-8">
                    <Card className="h-full w-full overflow-scroll rounded-none font-dmsans">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 relative">
                                            <Typography className="font-semibold text-lg leading-none opacity-70 font-poppins">{head}</Typography>
                                            {head === 'Start Date' || head === 'End Date' ? (
                                                <React.Fragment>
                                                    <span className='absolute top-2 right-0 hover:bg-blue-gray-100 rounded-sm cursor-pointer'><IconChevronUp size={18} strokeWidth={1.5} onClick={() => { sortData(head.toLowerCase().replace(' ', '_'), 'asc') }} /></span>
                                                    <span className='absolute bottom-2 right-0 hover:bg-blue-gray-100 rounded-sm cursor-pointer'><IconChevronDown size={18} strokeWidth={1.5} onClick={() => { sortData(head.toLowerCase().replace(' ', '_'), 'desc') }} /></span>
                                                </React.Fragment>
                                            ) : null}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {TABLE_ROWS.map(({ id, title, status, start_date, end_date, address }, index) => {
                                    const isLast = index === TABLE_ROWS.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                    return (
                                        <tr key={id}>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{index + 1}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{title}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{start_date}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{end_date}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{address}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins capitalize">{status}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex gap-3">
                                                    <Link className='px-0 text-sm font-medium font-poppins' href={route('admin.events.view', id)}>View</Link>
                                                    <Link className='px-0 text-sm font-medium font-poppins' href={route('admin.events.edit', id)}>Edit</Link>
                                                    <button className='text-red-500 px-0 text-sm font-medium font-poppins' onClick={() => { openDeleteModal(id) }}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </Card>
                </div>
            </div>
            {/* Delete Modal */}

            <Modal show={deleteModal} onClose={closeDeleteModal} maxWidth={'xl'}>
                <div className="delete-modal px-6 py-8 relative font-poppins">
                    <h1 className='font-bold text-3xl text-center'>Are you sure ?</h1>
                    <div className="absolute -top-8 -right-8 text-white cursor-pointer">
                        <IconX strokeWidth={1.5} size={38} onClick={closeDeleteModal} />
                    </div>
                    <div className="flex justify-center gap-2 pt-6">
                        <button className='bg-red-500 text-white px-4 py-3 font-semibold rounded' onClick={closeDeleteModal}>Cancel</button>
                        <button className='bg-blue-500 text-white px-4 py-3 font-semibold rounded' onClick={handleDeleteFunc}>Confirm</button>
                    </div>
                </div>
            </Modal>
        </Authenticated>
    )
}