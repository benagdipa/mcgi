import React, { useState } from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, Link, usePage } from '@inertiajs/react'
import { Card, Typography } from "@material-tailwind/react";
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { IconX } from '@tabler/icons-react';
import InputError from '@/Components/InputError';

export default function CategoryAdminPage({ auth, categories }) {
    const { role, permissions } = usePage().props.auth
    const TABLE_HEAD = ["SN", "Category Title", "Slug", "Description", "Status", "Action"];
    const TABLE_ROWS = categories;
    const [addEditModal, setAddEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState('')
    const [modalTitle, setModalTitle] = useState('');
    const [formType, setFormType] = useState('');
    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        title: '',
        slug: '',
        description: '',
        status: '',
    });
    const addSubmit = (e) => {
        e.preventDefault();
        if (formType === '_add') {
            post(route('admin.blogs.categories.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setAddEditModal(false)
                }
            })
        } else if (formType === '_edit') {
            post(route('admin.blogs.categories.update', selectedItem), {
                onSuccess: () => {
                    reset();
                    setAddEditModal(false)
                }
            })
        }

    }
    const openAddEditModal = (type, id = 0) => {
        if (id !== 0) { setSelectedItem(id) }
        if (type === 'add') {
            setModalTitle('Add New')
            setFormType('_add')
        } else if (type === 'edit') {
            const selectedCat = categories.filter(obj => obj.id === id)
            setData({ ...selectedCat[0] });
            setModalTitle('Edit')
            setFormType('_edit')
        }
        setAddEditModal(true)
    }
    const closeAddEditModal = (type) => {
        setAddEditModal(false)
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
            destroy(route('admin.blogs.categories.delete', selectedItem), {
                onSuccess: () => {
                    closeDeleteModal()
                }
            })
        }
    }

    return (
        <Authenticated user={auth?.user}>
            <Head title='Categories' />
            <div className="content py-4 font-poppins">
                <div className="content-header md:px-6 px-4 flex justify-between items-center">
                    <div className="left">
                        <h1 className='font-semibold text-gray-800 text-3xl'>Categories</h1>
                        <div className="pt-2">
                            <ul className='flex gap-1 text-gray-600 text-sm'>
                                <li><Link href={route('dashboard')}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route('admin.blogs.index')}>Blogs</Link></li>
                                <li>/</li>
                                <li>Categories</li>
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        <button className='bg-[#f5cd06] shadow-lg text-[#0f0f0f] md:px-5 md:py-3 py-2 px-3 rounded-md font-semibold text-lg font-poppins' onClick={() => { openAddEditModal('add') }}>Add New</button>
                    </div>
                </div>
                <div className="page-content pt-8">
                    <Card className="h-full md:w-full w-11/12 mx-auto overflow-scroll rounded-none">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" >
                                            <Typography className="font-semibold text-lg leading-none opacity-70 font-poppins">{head}</Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {TABLE_ROWS.map(({ id, title, slug, description, status }, index) => {
                                    const isLast = index === TABLE_ROWS.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                    return (
                                        <tr key={index}>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{index + 1}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{title}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{slug}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{description}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins capitalize">{status}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex gap-2">
                                                    <button className='px-0 text-sm font-medium font-poppins' onClick={() => { openAddEditModal('edit', id) }}>Edit</button>
                                                    {isUserAllowed(permissions, ["delete_categories"], role) && (
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
            <Modal show={addEditModal} onClose={closeAddEditModal} maxWidth={'2xl'}>
                <div className="add-modal px-6 py-4">
                    <div className="modal-header relative">
                        <h1 className='font-bold text-2xl font-poppins'>{modalTitle} Category</h1>
                        <div className="absolute -top-14 -right-14 text-white cursor-pointer">
                            <IconX strokeWidth={1.5} size={38} onClick={closeAddEditModal} />
                        </div>
                    </div>
                    <div className="modal-content pt-6">
                        <form onSubmit={addSubmit}>
                            <div className="form-item mb-4">
                                <InputLabel value="Title" className='mb-1 font-poppins font-semibold' />
                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    className="w-full rounded-md font-poppins"
                                    placeholder="Category Title..."
                                    onChange={(e) => setData('title', e.target.value)}
                                    value={data.title}
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>
                            <div className="form-item mb-4">
                                <InputLabel value="Slug" className='mb-1 font-poppins font-semibold' />
                                <TextInput
                                    id="slug"
                                    type="text"
                                    name="slug"
                                    className="w-full rounded-md font-poppins"
                                    placeholder="Category Slug..."
                                    onChange={(e) => setData('slug', e.target.value)}
                                    value={data.slug}
                                />
                                <InputError message={errors.slug} className="mt-2" />
                            </div>
                            <div className="form-item mb-4">
                                <InputLabel value="Description" className='mb-1 font-poppins font-semibold' />
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="10"
                                    className='w-full border-gray-300 rounded-md font-poppins focus:border-yellow-500 focus:ring-0'
                                    placeholder='Description...'
                                    onChange={(e) => setData('description', e.target.value)}
                                    value={data.description}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>
                            <div className="form-item mb-4">
                                <InputLabel value="Status" className='mb-1 font-poppins font-semibold' />
                                <select
                                    name="status"
                                    id="status"
                                    className='w-full border-gray-300 rounded-md font-poppins focus:border-yellow-500 focus:ring-0'
                                    onChange={(e) => setData('status', e.target.value)}
                                    value={data.status}
                                >
                                    <option value="">Select</option>
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
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
        </Authenticated >
    )
}
