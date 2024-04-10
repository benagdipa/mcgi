import Modal from '@/Components/Modal';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import { Card, Typography } from '@material-tailwind/react';
import { IconX } from '@tabler/icons-react';
import React, { useState } from 'react'

export default function EventsAdmin({ auth, events }) {

    const TABLE_HEAD = ["SN", "Event Title", "Start Date", "End Date", "Status", "Action"];
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
    return (
        <Authenticated user={auth?.user}>
            <Head title='Events' />
            <div className=''>
                <div className="p-6 pb-0 py-4 flex justify-between font-poppins">
                    <h1 className='font-semibold text-gray-800 text-3xl'>Events</h1>
                    <p className='bg-[#f5cd06] shadow-lg text-[#0f0f0f] px-5 py-2 rounded-xl font-bold text-lg font-dmsans'><Link href={route('admin.events.add')}>Add New</Link></p>
                </div>
                <div class="p-6 pt-2 font-poppins">
                    <ul class="flex gap-1 text-gray-600 text-sm">
                        <li><Link href={route('dashboard')}>Dashboard</Link></li>
                        <li>/</li>
                        <li><Link href={route('admin.events.index')}>Events</Link></li>
                    </ul>
                </div>
                <Card className="h-full w-full overflow-scroll rounded-none font-dmsans">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="leading-none opacity-70 font-dmsans text-lg font-bold" >{head}</Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TABLE_ROWS.map(({ id, title, status, start_date, end_date }, index) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                return (
                                    <tr key={id}>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-base">{index + 1}</Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-base">{title}</Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-base">{start_date}</Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-base">{end_date}</Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-base">{status}</Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex gap-2">
                                                <Link className='font-poppins' href={route('admin.events.edit', id)}>Edit</Link>
                                                <button className='text-red-500 font-poppins text-base font-medium' onClick={() => { openDeleteModal(id) }}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
            </div>
            {/* Delete Modal */}

            <Modal show={deleteModal} onClose={closeDeleteModal} maxWidth={'xl'}>
                <div className="delete-modal px-6 py-8 relative">
                    <h1 className='font-bold text-3xl text-center'>Are you sure ?</h1>
                    <div className="absolute -top-8 -right-8 text-white cursor-pointer">
                        <IconX strokeWidth={1.5} size={38} onClick={closeDeleteModal} />
                    </div>
                    <div className="flex justify-center gap-2 pt-6">
                        <button className='bg-red-500 text-white px-4 py-2 font-bold rounded' onClick={closeDeleteModal}>Cancel</button>
                        <button className='bg-blue-500 text-white px-4 py-2 font-bold rounded' onClick={handleDeleteFunc}>Confirm</button>
                    </div>
                </div>
            </Modal>
        </Authenticated>
    )
}
