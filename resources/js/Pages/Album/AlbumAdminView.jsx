import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Link, useForm } from '@inertiajs/react'
import { Card, Collapse } from '@material-tailwind/react';
import { IconX } from '@tabler/icons-react';
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function AlbumAdminView({ auth, album }) {

    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        album_id: album?.id,
        attachments: []
    });

    const [toggleOpen, setTogglenOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState('')

    const changeToggleState = () => setTogglenOpen((cur) => !cur);

    const openDeleteModal = (id) => {
        setSelectedItem(id)
        setDeleteModal(true)
    }

    const closeDeleteModal = () => {
        setDeleteModal(false)
    }

    const handleRemoveImage = (id) => {
        destroy(route('admin.album.image.delete', id), {
            onSuccess: () => {
                closeDeleteModal()
            }
        })
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
    const thumbs = data?.attachments.map((file, index) => (
        <div key={index} className='border border-gray-300 rounded relative w-36 h-36 p-1'>
            <div className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white p-1 cursor-pointer"><IconX size={16} onClick={() => { handleRemoveUploadImage(file) }} /></div>
            <img src={file.preview} className='w-full h-full object-cover rounded' />
        </div>
    ));
    const handleRemoveUploadImage = (file) => {
        const data_attachments = data?.attachments.filter((item, i) => item.preview !== file.preview)
        setData('attachments', data_attachments);
    }
    const formSubmit = (e) => {
        e.preventDefault();
        post(route('admin.album.image.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setTogglenOpen(false)
            }
        })
    }
    return (
        <Authenticated user={auth.user}>
            <div className="content pt-24 font-poppins">
                <div className="content-header px-6 flex justify-between items-center">
                    <div className="left">
                        <h1 className='font-semibold text-gray-800 text-3xl'>{album?.name}</h1>
                        <div className="pt-2">
                            <ul className='flex gap-1 text-gray-600 text-sm'>
                                <li><Link href={route('dashboard')}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route('admin.album.index')}>Albums</Link></li>
                                <li>/</li>
                                <li><Link href={route('admin.album.view', album?.id)}>{album?.name}</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        <button className='bg-[#f5cd06] shadow-lg text-[#0f0f0f] px-5 py-3 rounded-md font-semibold text-lg font-poppins' onClick={changeToggleState}>Add New</button>
                    </div>
                </div>
                <div className="page-content pt-8">
                    <Collapse open={toggleOpen}>
                        <Card className="px-6">
                            <form onSubmit={formSubmit}>
                                <div className="mb-6">
                                    <div {...getRootProps()} className='flex items-center justify-center border-dotted border-2 py-32 rounded-md cursor-pointer'>
                                        <input {...getInputProps()} />
                                        {
                                            isDragActive ?
                                                <p>Drop the files here ...</p> :
                                                <p className='text-gray-500 text-sm font-poppins'>Drag 'n' drop some files here, or click to select files</p>
                                        }
                                    </div>
                                    <InputError message={errors?.attachments} className="mt-2" />
                                    <aside className='flex flex-wrap mt-6 gap-3'>
                                        {thumbs}
                                    </aside>
                                </div>
                                <div className="font-item mb-4 text-right">
                                    <button className='bg-blue-500 text-white px-6 py-3 font-poppins rounded-sm font-bold' disabled={processing}>Upload</button>
                                </div>
                            </form>
                        </Card>
                    </Collapse>
                    <Card className="h-full w-full overflow-scroll rounded-none font-poppins shadow-none">
                        <div className="flex felx-wrap gap-3 py-16 px-8">
                            {album?.attachments.length > 0 && album?.attachments.map((item, index) => {
                                return (
                                    <div className="group border rounded relative cursor-pointer w-56 h-56 p-1" key={index}>
                                        <div className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white p-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
                                            <IconX size={16} onClick={() => { openDeleteModal(item?.id) }} />
                                        </div>
                                        <img src={item?.path} className="w-full h-full object-cover rounded" />
                                    </div>
                                )
                            })}
                        </div>
                    </Card>
                </div>
            </div>
            {/* Delete Modal */}
            <Modal show={deleteModal} onClose={closeDeleteModal} maxWidth={'xl'}>
                <div className="delete-modal px-6 py-8 relative">
                    <h1 className='font-bold text-3xl text-center font-poppins'>Are you sure ?</h1>
                    <div className="absolute -top-8 -right-8 text-white cursor-pointer">
                        <IconX strokeWidth={1.5} size={38} onClick={closeDeleteModal} />
                    </div>
                    <div className="flex justify-center gap-2 pt-6">
                        <button className='bg-red-500 text-white px-4 py-3 font-semibold rounded' onClick={closeDeleteModal}>Cancel</button>
                        <button className='bg-blue-500 text-white px-4 py-3 font-semibold rounded' onClick={() => { handleRemoveImage(selectedItem) }}>Confirm</button>
                    </div>
                </div>
            </Modal>
        </Authenticated>
    )
}
