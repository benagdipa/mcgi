import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { isUserAllowed } from '@/Utils/Utils';
import { Head, Link, router, usePage,useForm } from '@inertiajs/react'
import { Card, Typography } from '@material-tailwind/react';
import { RiCloseLargeFill } from "react-icons/ri";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

import React, { useState } from 'react'

export default function EventsAdmin({ auth, events, options }) {
    const { role, permissions } = usePage().props.auth
    const TABLE_HEAD = ["SN", "Event Title", "Start Date", "End Date", "Address", "Status", "Action"];
    const TABLE_ROWS = events;

    const [deleteModal, setDeleteModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState('')

    const [settingModal, setSettingModal] = useState(false)

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

    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        attend_duration: options?.value ? options?.value : '',
    });

    const submitForm = (e) => {
        e.preventDefault();
        post(route('admin.events.settings'), {
            onSuccess: () => {
                reset();
                setSettingModal(false)
            }
        });
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
                    <div className="right flex gap-3">
                        <Link href={route('admin.events.add')} className='bg-[#f5cd06] shadow-lg text-[#0f0f0f] px-5 py-3 rounded-md font-semibold text-lg font-poppins'>Add New</Link>
                        <button
                            className='bg-blue-500 shadow-lg px-5 py-[11px] rounded-md font-semibold text-lg font-poppins text-white'
                            onClick={() => setSettingModal(true)}
                        >
                            Settings
                        </button>
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
                                                    <span className='absolute top-2 right-0 hover:bg-blue-gray-100 rounded-sm cursor-pointer'><AiOutlineUp size={18} strokeWidth={1.5} onClick={() => { sortData(head.toLowerCase().replace(' ', '_'), 'asc') }} /></span>
                                                    <span className='absolute bottom-2 right-0 hover:bg-blue-gray-100 rounded-sm cursor-pointer'><AiOutlineDown size={18} strokeWidth={1.5} onClick={() => { sortData(head.toLowerCase().replace(' ', '_'), 'desc') }} /></span>
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
                                                    {isUserAllowed(permissions, ["delete_events"], role) && (
                                                        <button className='text-red-500 px-0 text-sm font-medium font-poppins' onClick={() => { openDeleteModal(id) }}>Delete</button>
                                                    )}
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
                        <RiCloseLargeFill strokeWidth={1.5} size={38} onClick={closeDeleteModal} />
                    </div>
                    <div className="flex justify-center gap-2 pt-6">
                        <button className='bg-red-500 text-white px-4 py-3 font-semibold rounded' onClick={closeDeleteModal}>Cancel</button>
                        <button className='bg-blue-500 text-white px-4 py-3 font-semibold rounded' onClick={handleDeleteFunc}>Confirm</button>
                    </div>
                </div>
            </Modal>
            {/*  */}
            <Modal show={settingModal} onClose={closeDeleteModal} maxWidth={'xl'}>
                <div className="delete-modal px-6 py-8 relative font-poppins">
                    <div className="modal-header relative">
                        <h1 className='font-bold text-2xl font-poppins'>Events Settings</h1>
                        <div className="absolute -top-14 -right-14 text-white cursor-pointer">
                            <RiCloseLargeFill strokeWidth={1.5} size={38} onClick={() => { setSettingModal(false) }} />
                        </div>
                    </div>
                    <div className="modal-content pt-6">
                        <form onSubmit={submitForm}>
                            <div className="form-item mb-4">
                                <InputLabel value={'Enter Attend button Appering Duration (in Minutes)'} className='mb-1 font-poppins font-semibold' />
                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    className="w-full rounded-md font-poppins"
                                    placeholder="Enter duration..."
                                    onChange={(e) => setData('attend_duration', e.target.value)}
                                    value={data.attend_duration}
                                />
                                <InputError message={errors.attend_duration} className="mt-2" />
                            </div>
                            <div className="font-item mb-4 text-right">
                                <button className='bg-blue-500 text-white px-6 py-3 font-poppins rounded-sm font-bold' disabled={processing}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </Authenticated>
    )
}