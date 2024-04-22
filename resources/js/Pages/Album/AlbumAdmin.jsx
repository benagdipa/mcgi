import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal'
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Link, useForm } from '@inertiajs/react'
import { Card, Typography } from '@material-tailwind/react';
import { IconX } from '@tabler/icons-react';
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function AlbumAdmin({ auth, albums }) {

    const TABLE_HEAD = ["SN", "Album Name", "Count", ""];
    const [addEditModal, setAddEditModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [formType, setFormType] = useState('');
    const [selectedItem, setSelectedItem] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)

    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        name: '',
        attachments: []
    });

    const openAddEditModal = (type, id = 0) => {
        if (id !== 0) { setSelectedItem(id) }
        if (type === 'add') {
            setModalTitle('Add New')
            setFormType('_add')
        }
        else if (type === 'edit') {
            const selectedCat = albums.filter(obj => obj.id === id)
            setData({ ...selectedCat[0], 'attachments': [] });
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
            post(route('admin.album.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setAddEditModal(false)
                }
            })
        } else if (formType === '_edit') {
            post(route('admin.album.update', selectedItem), {
                onSuccess: () => {
                    reset();
                    setAddEditModal(false)
                }
            })
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setData('attachments', [
                ...data?.attachments,
                ...acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            ]);

        }
    })

    const handleRemoveImage = (file) => {
        const data_attachments = data?.attachments.filter((item, i) => item.preview !== file.preview)
        setData('attachments', data_attachments);
    }


    const thumbs = data?.attachments.map((file, index) => (
        <div key={index} className='border border-gray-300 rounded relative w-36 h-36 p-1'>
            <div className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white p-1 cursor-pointer"><IconX size={16} onClick={() => { handleRemoveImage(file) }} /></div>
            <img src={file.preview} className='w-full h-full object-cover rounded' />
        </div>
    ));

    const openDeleteModal = (id) => {
        setSelectedItem(id)
        setDeleteModal(true)
    }
    const closeDeleteModal = () => {
        setDeleteModal(false)
    }
    const handleDeleteFunc = () => {
        if (selectedItem) {
            destroy(route('admin.album.delete', selectedItem), {
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
                        <h1 className='font-semibold text-gray-800 text-3xl'>Albums</h1>
                        <div className="pt-2">
                            <ul className='flex gap-1 text-gray-600 text-sm'>
                                <li><Link href={route('dashboard')}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route('admin.album.index')}>Albums</Link></li>
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
                                {albums.map(({ id, name, attachment_count }, index) => {
                                    const isLast = index === albums.length - 1;
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
                                                <Typography className="font-medium font-poppins">{attachment_count}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex gap-2">
                                                    <button className='px-0 text-sm font-medium font-poppins' onClick={() => { openAddEditModal('edit', id) }}>Edit</button>
                                                    <Link href={route('admin.album.view', id)} className='px-0 text-sm font-medium font-poppins'>View</Link>
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
                    <h1 className='font-bold text-2xl font-poppins'>{modalTitle} Album</h1>
                    <div className="absolute -top-8 -right-8 text-white cursor-pointer">
                        <IconX strokeWidth={1.5} size={38} onClick={closeAddEditModal} />
                    </div>
                    <div className="modal-content pt-6">
                        <form onSubmit={addEditSubmit}>
                            <div className="form-item mb-6">
                                <InputLabel value="Album Name" className='mb-1 font-poppins font-semibold' />
                                <TextInput
                                    id="title"
                                    type="text"
                                    name="name"
                                    className="w-full rounded-md font-poppins"
                                    placeholder="Album Name..."
                                    onChange={(e) => setData('name', e.target.value)}
                                    value={data.name}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            {formType === '_add' && (
                                <div className="form-item mb-6">
                                    <div {...getRootProps()} className='flex items-center justify-center border-dotted border-2 py-7 rounded-md cursor-pointer'>
                                        <input {...getInputProps()} />
                                        {
                                            isDragActive ?
                                                <p>Drop the files here ...</p> :
                                                <p className='text-gray-500 text-sm font-poppins'>Drag 'n' drop some files here, or click to select files</p>
                                        }
                                    </div>
                                    <aside className='flex flex-wrap mt-6 gap-3'>
                                        {thumbs}
                                    </aside>
                                </div>
                            )}
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
                    <p className='text-center pt-8'>All the images associated with this album will be deleted.</p>
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
