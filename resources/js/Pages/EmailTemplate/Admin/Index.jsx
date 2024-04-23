import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Link, useForm } from '@inertiajs/react'
import { Card, Typography } from '@material-tailwind/react';
import { IconX } from '@tabler/icons-react';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef, useState } from 'react'

export default function Index({ auth, templates }) {
    const TABLE_HEAD = ["SN", "Template Name", "Subject", "Actions"];
    const TABLE_ROWS = templates;
    const [addEditModal, setAddEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('');
    const [formType, setFormType] = useState('');
    const [selectedItem, setSelectedItem] = useState('')
    const editorRef = useRef(null);
    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        name: '',
        subject: '',
        content: ''
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
            post(route('admin.email.store'), {
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
                        <h1 className='font-semibold text-gray-800 text-3xl'>Email Templates</h1>
                        <div className="pt-2">
                            <ul className='flex gap-1 text-gray-600 text-sm'>
                                <li><Link href={route('dashboard')}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route('admin.email.index')}>Email Templates</Link></li>
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
                                {TABLE_ROWS.map(({ id, name, subject }, index) => {
                                    const isLast = index === TABLE_ROWS.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                    return (
                                        <tr key={id}>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{index + 1}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{name}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{subject}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex gap-2">
                                                    {/* <Link className='px-0 text-sm font-medium font-poppins' href={route('admin.blogs.edit', id)}>Edit</Link> */}
                                                    {/* <button className='text-red-500 px-0 text-sm font-medium font-poppins' onClick={() => { openDeleteModal(id) }}>Delete</button> */}
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
            <Modal show={addEditModal} onClose={closeAddEditModal} maxWidth={'xxl'}>
                <div className="delete-modal px-6 py-8 relative font-poppins">
                    <h1 className='font-bold text-2xl font-poppins'>{modalTitle} Email Template</h1>
                    <div className="absolute -top-8 -right-8 text-white cursor-pointer">
                        <IconX strokeWidth={1.5} size={38} onClick={closeAddEditModal} />
                    </div>
                    <div className="modal-content pt-6">
                        <form onSubmit={addEditSubmit}>
                            <div className="form-item mb-4">
                                <InputLabel value="Template Name" className='mb-1 font-poppins font-semibold' />
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
                                <InputLabel value="Email Subject" className='mb-1 font-poppins font-semibold' />
                                <TextInput
                                    id="subject"
                                    type="text"
                                    name="subject"
                                    className="w-full rounded-md font-poppins"
                                    placeholder="Subject..."
                                    onChange={(e) => setData('subject', e.target.value)}
                                    value={data.subject}
                                />
                                <InputError message={errors.subject} className="mt-2" />
                            </div>
                            <div className="form-item mb-4">
                                <InputLabel value="Email Body" className='mb-1 font-poppins font-semibold' />
                                <Editor
                                    apiKey="h9mpgdcvlxaa94b8rwqpagapahot2x6w7urfs0dtyswd2qtj"
                                    onInit={(evt, editor) => { editorRef.current = editor; }}
                                    onChange={() => setData("content", editorRef.current.getContent())}
                                    initialValue={data.content}
                                    init={{
                                        height: 450,
                                        menubar: false,
                                        plugins: [
                                            "advlist",
                                            "autolink",
                                            "lists",
                                            "link",
                                            "image",
                                            "charmap",
                                            "preview",
                                            "anchor",
                                            "searchreplace",
                                            "visualblocks",
                                            "fullscreen",
                                            "insertdatetime",
                                            "media",
                                            "table",
                                            "help",
                                            "wordcount",
                                        ],
                                        toolbar:
                                            "undo redo | casechange blocks | bold italic backcolor | image | " +
                                            "alignleft aligncenter alignright alignjustify | " +
                                            "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
                                        images_upload_url:
                                            "upload.php",
                                        automatic_uploads: false,
                                    }}
                                />
                                <InputError message={errors.content} className="mt-2" />
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
