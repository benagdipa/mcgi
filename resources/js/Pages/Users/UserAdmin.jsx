import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import { Card, Typography } from "@material-tailwind/react";
import Modal from '@/Components/Modal';
import { IconX } from '@tabler/icons-react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { isUserAllowed } from '@/Utils/Utils';

export default function UserAdmin({ auth, users, locale, roles }) {
    const { role, permissions } = usePage().props.auth

    const TABLE_HEAD = ["SN", "First Name", "Last Name", 'Email', "Phone", "Locale", "Actions"];
    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        local: '',
        role: ''
    });

    const [addEditModal, setAddEditModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('');
    const [formType, setFormType] = useState('');
    const [selectedItem, setSelectedItem] = useState('')

    const [deleteModal, setDeleteModal] = useState(false)


    const getLocale = (id) => {
        if (id) {
            const selectedLocale = locale.filter(obj => obj.id === parseInt(id))
            if (selectedLocale.length) {
                return selectedLocale[0].title
            }
        }
    }

    const openAddEditModal = (type, id = 0) => {
        if (id !== 0) { setSelectedItem(id) }
        if (type === 'add') {
            setModalTitle('Add New')
            setFormType('_add')
        } else if (type === 'edit') {
            const selected = users.filter(obj => obj.id === id)

            setData({ ...selected[0], 'role': selected[0].roles[0] ? selected[0].roles[0].name : 'guest' });
            setModalTitle('Edit')
            setFormType('_edit')
        }
        setAddEditModal(true)
    }

    const closeAddEditModal = () => {
        setAddEditModal(false)
    }
    const addEditSubmit = (e) => {
        e.preventDefault();
        if (formType === '_add') {
            post(route('admin.users.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setAddEditModal(false)
                }
            });
        } else if (formType === '_edit') {
            post(route('admin.users.update', selectedItem), {
                onSuccess: () => {
                    reset();
                    setAddEditModal(false)
                }
            })
        }
    }

    const openDeleteModal = (user_id) => {
        setSelectedItem(user_id)
        setDeleteModal(true)
    }
    const closeDeleteModal = () => {
        setDeleteModal(false)
    }
    const handleDeleteFunc = () => {
        if (selectedItem) {
            router.delete(route('admin.users.delete', selectedItem), {
                onSuccess: () => {
                    closeDeleteModal()
                }
            })
        }
    }

    return (
        <Authenticated user={auth?.user}>
            <Head title='Users' />
            <div className="content py-4 font-poppins">
                <div className="content-header px-6 flex justify-between items-center">
                    <div className="left">
                        <h1 className='font-semibold text-gray-800 text-3xl'>Users</h1>
                        <div className="pt-2">
                            <ul className='flex gap-1 text-gray-600 text-sm'>
                                <li><Link href={route('dashboard')}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route('admin.users.index')}>Users</Link></li>
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
                                {users.map(({ id, first_name, last_name, email, local, phone, roles }, index) => {
                                    const isLast = index === users.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                    return (
                                        <tr key={id}>
                                            <td className={classes}><Typography className="font-medium font-poppins">{`${index + 1}`}</Typography></td>
                                            <td className={classes}><Typography className="font-medium font-poppins">{`${first_name}`}</Typography></td>
                                            <td className={classes}><Typography className="font-medium font-poppins">{`${last_name}`}</Typography></td>
                                            <td className={classes}><Typography className="font-medium font-poppins">{email}</Typography></td>
                                            <td className={classes}><Typography className="font-medium font-poppins">{phone}</Typography></td>
                                            <td className={classes}><Typography className="font-medium font-poppins">{getLocale(local)}</Typography></td>
                                            <td className={classes}>
                                                <div className="flex gap-2">
                                                    <button className='px-0 text-sm font-medium font-poppins' onClick={() => { openAddEditModal('edit', id) }}>Edit</button>
                                                    {isUserAllowed(permissions, ["delete_users"], role) && (
                                                        <button className="text-red-500 px-0 text-sm font-medium font-poppins" onClick={() => { openDeleteModal(id) }}>Delete</button>
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



            {/* Add/Edit Modal */}
            <Modal show={addEditModal} onClose={closeAddEditModal} maxWidth={'2xl'}>
                <div className="delete-modal px-6 py-8 relative font-poppins">
                    <h1 className='font-bold text-2xl font-poppins'>{modalTitle} User</h1>
                    <div className="absolute -top-8 -right-8 text-white cursor-pointer">
                        <IconX strokeWidth={1.5} size={38} onClick={closeAddEditModal} />
                    </div>
                    <div className="modal-content pt-6">
                        <form onSubmit={addEditSubmit}>
                            <div className="form-item mb-4">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel value="First Name" className='mb-1 font-poppins font-semibold' />
                                        <TextInput
                                            id="first_name"
                                            type="text"
                                            name="first_name"
                                            className="w-full rounded-md font-poppins"
                                            placeholder="First Name..."
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            value={data.first_name}
                                        />
                                        <InputError message={errors.first_name} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel value="Last Name" className='mb-1 font-poppins font-semibold' />
                                        <TextInput
                                            id="last_name"
                                            type="text"
                                            name="last_name"
                                            className="w-full rounded-md font-poppins"
                                            placeholder="Last Name..."
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            value={data.last_name}
                                        />
                                        <InputError message={errors.last_name} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-item mb-4">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel value="Email Address" className='mb-1 font-poppins font-semibold' />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            className="w-full rounded-md font-poppins"
                                            placeholder="Email Address..."
                                            onChange={(e) => setData('email', e.target.value)}
                                            value={data.email}
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel value="Phone Number" className='mb-1 font-poppins font-semibold' />
                                        <TextInput
                                            id="phone"
                                            type="text"
                                            name="phone"
                                            className="w-full rounded-md font-poppins"
                                            placeholder="Last Name..."
                                            onChange={(e) => setData('phone', e.target.value)}
                                            value={data.phone}
                                        />
                                        <InputError message={errors.phone} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-item mb-4">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel value="Password" className='mb-1 font-poppins font-semibold' />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            className="w-full rounded-md font-poppins"
                                            placeholder="Password..."
                                            onChange={(e) => setData('password', e.target.value)}
                                            value={data.password ? data.password : ''}
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel value="Confirm Password" className='mb-1 font-poppins font-semibold' />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            className="w-full rounded-md font-poppins"
                                            placeholder="Confirm Password..."
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            value={data.password_confirmation ? data.password_confirmation : ''}
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-2" />
                                    </div>
                                </div>

                            </div>
                            <div className='form-field mb-4'>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel value={'Locale'} className='mb-1 font-poppins font-semibold' />
                                        <select
                                            className='w-full border-gray-300 rounded-md font-poppins focus:border-yellow-500 focus:ring-0'
                                            value={data.local}
                                            onChange={(e) => setData('local', e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            {locale.length && locale.map((item, index) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.title}</option>
                                                )
                                            })}
                                        </select>
                                        <InputError message={errors.local} className='mt-2' />
                                    </div>
                                    <div>
                                        <InputLabel value={'Role'} className='mb-1 font-poppins font-semibold' />
                                        <select
                                            className='w-full border-gray-300 rounded-md font-poppins focus:border-yellow-500 focus:ring-0'
                                            value={data.role}
                                            onChange={(e) => setData('role', e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            {roles.length && roles.map((item, index) => {
                                                return (
                                                    <option value={item.name} key={item.id}>{item.name}</option>
                                                )
                                            })}
                                        </select>
                                        <InputError message={errors.role} className='mt-2' />
                                    </div>
                                </div>
                            </div>
                            <input type='hidden' name='type' value={formType} readOnly />
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
        </Authenticated >
    )
}
