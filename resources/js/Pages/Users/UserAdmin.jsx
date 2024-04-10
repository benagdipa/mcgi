import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import React, { useState } from 'react'
import { Card, Typography } from "@material-tailwind/react";
import Modal from '@/Components/Modal';
import { IconX } from '@tabler/icons-react';
import InputLabel from '@/Components/InputLabel';

export default function UserAdmin({ auth, users }) {
    const TABLE_HEAD = ["Full Name", 'Email', "Branch", "Phone", "Roles & Permissions", "Actions"];
    const [permissionModal, setPermissionModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState('')
    const allPermissions = ['create-users', 'edit-users', 'delete-users', 'create-blog-posts', 'edit-blog-posts', 'delete-blog-posts',]

    const openDeleteModal = (user_id) => {
        setSelectedUser(user_id)
        setDeleteModal(true)
    }
    const closeDeleteModal = () => {
        setDeleteModal(false)
    }

    const openPermissionModal = (user_id) => {
        setSelectedUser(user_id)
        setPermissionModal(true)
    }
    const closePermissionModal = () => {
        setPermissionModal(false)
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
                                <li><Link href={route('admin.user.index')}>Users</Link></li>
                            </ul>
                        </div>
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
                                            <td className={classes}><Typography className="font-medium font-poppins">{`${first_name} ${last_name}`}</Typography></td>
                                            <td className={classes}><Typography className="font-medium font-poppins">{email}</Typography></td>
                                            <td className={classes}><Typography className="font-medium font-poppins">{local}</Typography></td>
                                            <td className={classes}><Typography className="font-medium font-poppins">{phone}</Typography></td>
                                            <td className={`${classes} max-w-52`}>
                                                {roles.length && roles.map((item) => {
                                                    return (
                                                        <React.Fragment key={item.id}>
                                                            <Typography className="font-medium font-poppins capitalize">{item.name}</Typography>
                                                            <div className="flex gap-1 w-full flex-wrap pt-2">
                                                                {item.permissions.length && item.permissions.map((permission) => {
                                                                    return (
                                                                        <React.Fragment key={permission.id}>
                                                                            <p className='text-[12px] bg-gray-600 text-white rounded px-2'>{permission.name}</p>
                                                                        </React.Fragment>
                                                                    )
                                                                })}
                                                            </div>
                                                        </React.Fragment>
                                                    )
                                                })}
                                            </td>
                                            <td className={classes}>
                                                <div className="flex gap-2">
                                                    <button className='px-0 text-sm font-medium font-poppins' onClick={() => { openPermissionModal(id) }}>Permissions</button>
                                                    <button className="text-red-500 px-0 text-sm font-medium font-poppins" onClick={() => { openDeleteModal(id) }}>Delete</button>
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
            {/* Permission Modal */}
            <Modal show={permissionModal} onClose={closePermissionModal} maxWidth={'xl'}>
                <div className="permission-modal px-6 py-8 relative">
                    <h1 className='font-bold text-2xl font-poppins'>User Role & Permission</h1>
                    <div className="absolute -top-8 -right-8 text-white cursor-pointer">
                        <IconX strokeWidth={1.5} size={38} onClick={closePermissionModal} />
                    </div>
                    <div className="modal-content pt-6">
                        <form action="">
                            <div className='form-field font-poppins mb-4'>
                                <InputLabel value={'Role'} className='mb-1' />
                                <select className='w-full rounded border border-gray-400 text-gray-600 font-medium'>
                                    <option value="">Select</option>
                                    <option value="">Admin</option>
                                    <option value="">User</option>
                                </select>
                            </div>
                            <div className="form-field font-poppins mb-6">
                                <InputLabel value={'Permissions'} />
                                <div className="grid grid-cols-2 flex-wrap font-poppins pt-4">
                                    {allPermissions.length && allPermissions.map((permission, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <label className='pb-3 block font-poppins capitalize'>
                                                    <input
                                                        type="checkbox"
                                                        value={permission}
                                                        className='rounded w-5 h-5'
                                                    />
                                                    <span className='pl-2 font-medium'>{permission.replace(/-/g, ' ')}</span>
                                                </label>
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="form-field flex justify-end">
                                <button className='font-poppins bg-blue-500 text-white px-4 py-2 text-lg font-medium rounded-md'>Submit</button>
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
                        <button className='bg-blue-500 text-white px-4 py-3 font-semibold rounded' onClick={() => { }}>Confirm</button>
                    </div>
                </div>
            </Modal>
        </Authenticated >
    )
}
