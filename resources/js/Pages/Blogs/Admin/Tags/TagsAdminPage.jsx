import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Modal from '@/Components/Modal'
import TextInput from '@/Components/TextInput'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import { Card, Typography } from '@material-tailwind/react'
import { IconX } from '@tabler/icons-react'
import React, { useState } from 'react'

export default function TagsAdminPage({ auth, tags }) {
    const TABLE_HEAD = ["SN", "Title", "Slug", "Status", "Action"];
    const TABLE_ROWS = tags ? tags : [];
    const [addEditModal, setAddEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState('')
    const [modalTitle, setModalTitle] = useState('');
    const [formType, setFormType] = useState('');

    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        title: '',
        slug: '',
        status: '',
    });

    const addSubmit = (e) => {
        e.preventDefault();
        if (formType === '_add') {
            post(route('admin.blogs.tags.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setAddEditModal(false)
                }
            })
        } else if (formType === '_edit') {
            post(route('admin.blogs.tags.update', selectedItem), {
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
            const selectedCat = tags.filter(obj => obj.id === id)
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
            <Head title='Tags' />
            <div className="">
                <div className="p-6 flex justify-between">
                    <h1 className='font-bold font-xl'>Tags</h1>
                    <button onClick={() => { openAddEditModal('add') }}>Add New</button>
                </div>
                <Card className="h-full w-full overflow-scroll rounded-none">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" >
                                        <Typography variant="small" color="blue-gray" className="leading-none opacity-70 font-dmsans text-lg font-bold">{head}</Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TABLE_ROWS.length > 0 && TABLE_ROWS.map(({ id, title, slug, status }, index) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">{index + 1}</Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">{title}</Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">{slug}</Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">{status}</Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex gap-2">
                                                <Typography as="button" variant="small" color="blue-gray" className="font-medium" onClick={() => { openAddEditModal('edit', id) }}>Edit</Typography>
                                                <button className='text-red-500 text-sm font-medium' onClick={() => { openDeleteModal(id) }}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
            </div>
            <Modal show={addEditModal} onClose={closeAddEditModal} maxWidth={'2xl'}>
                <div className="add-modal px-6 py-4">
                    <div className="modal-header relative">
                        <h1 className='font-bold text-2xl'>{modalTitle} Tag</h1>
                        <div className="absolute -top-14 -right-14 text-white cursor-pointer">
                            <IconX strokeWidth={1.5} size={38} onClick={closeAddEditModal} />
                        </div>
                    </div>
                    <div className="modal-content pt-6">
                        <form onSubmit={addSubmit}>
                            <div className="form-item mb-4">
                                <InputLabel value="Tag Title" className='mb-1 font-dmsans' />
                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    className="w-full rounded-sm font-dmsans placeholder:font-dmsans"
                                    placeholder="Tag Title..."
                                    onChange={(e) => setData('title', e.target.value)}
                                    value={data.title}
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>
                            <div className="form-item mb-4">
                                <InputLabel value="Tag Slug" className='mb-1 font-dmsans' />
                                <TextInput
                                    id="slug"
                                    type="text"
                                    name="slug"
                                    className="w-full rounded-sm font-dmsans placeholder:font-dmsans"
                                    placeholder="Tag Slug..."
                                    onChange={(e) => setData('slug', e.target.value)}
                                    value={data.slug}
                                />
                                <InputError message={errors.slug} className="mt-2" />
                            </div>
                            <div className="form-item mb-4">
                                <InputLabel value="Tags Status" className='mb-1 font-dmsans' />
                                <select
                                    name="status"
                                    id="status"
                                    className='border-gray-300 rounded-sm w-full font-dmsans placeholder:font-dmsans focus:border-yellow-500 focus:ring-0'
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
                                <button className='bg-blue-500 text-white px-6 py-2 font-dmsans rounded-sm font-bold' disabled={processing}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>

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
