import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Link, useForm } from '@inertiajs/react'
import { Card, Typography } from '@material-tailwind/react';
import { IconX } from '@tabler/icons-react';
import React, { useState } from 'react'

export default function AdminIndex({ auth, locations }) {
    const TABLE_HEAD = ["SN", "Location Name", "Address", "Actions"];
    const [addEditModal, setAddEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('');
    const [formType, setFormType] = useState('');
    const [selectedItem, setSelectedItem] = useState('')
    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        name: '',
        address: '',
        map_code: ''
    });

    const openAddEditModal = (type, id = 0) => {
        if (id !== 0) { setSelectedItem(id) }
        if (type === 'add') {
            setModalTitle('Add New')
            setFormType('_add')
        } else if (type === 'edit') {
            const selected = locations.filter(obj => obj.id === id)
            setData({ ...selected[0] });
            setModalTitle('Edit')
            setFormType('_edit')
        }
        setAddEditModal(true)
    }
    const closeAddEditModal = () => {
        setAddEditModal(false)
        reset();
    }

    const addEditSubmit = (e) => {
        e.preventDefault();
        if (formType === '_add') {
            post(route('admin.location.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setAddEditModal(false)
                }
            })
        } else if (formType === '_edit') {
            post(route('admin.location.update', selectedItem), {
                onSuccess: () => {
                    reset();
                    setAddEditModal(false)
                }
            })
        }
    }
    const openDeleteModal = (id) => {
        setSelectedItem(id)
        setDeleteModal(true)
    }
    const closeDeleteModal = () => {
        setDeleteModal(false)
    }
    const handleDeleteFunc = () => {
        if (selectedItem) {
            destroy(route('admin.location.delete', selectedItem), {
                onSuccess: () => {
                    closeDeleteModal()
                }
            })
        }
    }
    return (
        <Authenticated user={auth?.user}>
            <div className="content py-4 font-poppins">
                <div className="content-header px-6 flex justify-between items-center">
                    <div className="left">
                        <h1 className='font-semibold text-gray-800 text-3xl'>Church Locations</h1>
                        <div className="pt-2">
                            <ul className='flex gap-1 text-gray-600 text-sm'>
                                <li><Link href={route('dashboard')}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route('admin.location.index')}>Church Locations</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        <button className='bg-[#f5cd06] shadow-lg text-[#0f0f0f] px-5 py-3 rounded-md font-semibold text-lg font-poppins' onClick={() => { openAddEditModal('add') }}>Add New</button>
                    </div>
                </div>
                <div className="page-content pt-8">
                    <Card className="h-full w-full overflow-scroll rounded-none font-poppins">
                        <table className="w-full min-w-max table-auto text-left font-poppins">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            <Typography className="font-semibold text-lg leading-none opacity-70 font-poppins">{head}</Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {locations.map(({ id, name, address }, index) => {
                                    const isLast = index === locations.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                    return (
                                        <tr key={index}>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{index + 1}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{name}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{address}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex gap-2">
                                                    <button className='px-0 text-sm font-medium font-poppins' onClick={() => { openAddEditModal('edit', id) }}>Edit</button>
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
            {/* Add/Edit Modal */}
            <Modal show={addEditModal} onClose={closeAddEditModal} maxWidth={'2xl'}>
                <div className="delete-modal px-6 py-8 relative font-poppins">
                    <h1 className='font-bold text-2xl font-poppins'>{modalTitle} Church Location</h1>
                    <div className="absolute -top-8 -right-8 text-white cursor-pointer">
                        <IconX strokeWidth={1.5} size={38} onClick={closeAddEditModal} />
                    </div>
                    <div className="modal-content pt-6">
                        <form onSubmit={addEditSubmit}>
                            <div className="form-item mb-4">
                                <InputLabel value="Name" className='mb-1 font-poppins font-semibold' />
                                <TextInput
                                    id="title"
                                    type="text"
                                    name="name"
                                    className="w-full rounded-md font-poppins"
                                    placeholder="Name..."
                                    onChange={(e) => setData('name', e.target.value)}
                                    value={data.name}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="form-item mb-4">
                                <InputLabel value="Address" className='mb-1 font-poppins font-semibold' />
                                <TextInput
                                    id="address"
                                    type="text"
                                    name="address"
                                    className="w-full rounded-md font-poppins"
                                    placeholder="Address..."
                                    onChange={(e) => setData('address', e.target.value)}
                                    value={data.address}
                                />
                                <InputError message={errors.address} className="mt-2" />
                            </div>
                            <div className="form-item mb-4">
                                <InputLabel value="Map" className='mb-1 font-poppins font-semibold' />
                                <textarea
                                    id="map_code"
                                    rows={8}
                                    name="map_code"
                                    className="border-gray-300 focus:border-yellow-500 focus:ring-0 shadow-sm w-full rounded-md font-poppins"
                                    placeholder="Map..."
                                    onChange={(e) => setData('map_code', e.target.value)}
                                    value={data.map_code}
                                />
                                <InputError message={errors.map_code} className="mt-2" />
                            </div>
                            <input type='hidden' name='type' value={formType} />
                            <div className="font-item mb-4 text-right">
                                <button className='bg-blue-500 text-white px-6 py-3 font-poppins rounded-sm font-bold' disabled={processing}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>

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
