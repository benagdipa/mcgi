import React, { useState } from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { Card, Typography } from "@material-tailwind/react";
import Modal from '@/Components/Modal';
import { IconX } from '@tabler/icons-react';
import { router } from '@inertiajs/react'


export default function BlogsAdminPage({ auth, posts, categories, tags }) {
    const TABLE_HEAD = ["SN", "Post Title", "Categories", "Tags", "Status", "Action"];
    const TABLE_ROWS = posts;
    const [deleteModal, setDeleteModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState('')

    const ShowCategories = ({ list }) => {
        if (list) {
            const postCategories = list.split(',')
            return postCategories?.map((cat) => {
                const postCategory = categories.filter(item => item.id === parseInt(cat))
                return (
                    <span className='bg-gray-600 text-white rounded px-2 text-[14px]' key={postCategory[0].id}>{postCategory[0].title}</span>
                )
            })
        }
    }

    const ShowTags = ({ list }) => {
        if (list) {
            const postTags = list.split(',')
            return postTags?.map((tag) => {
                const postTag = tags.filter(item => item.id === parseInt(tag))
                return (
                    <span className='bg-gray-600 text-white rounded px-2 text-[14px]' key={postTag[0].id}>{postTag[0].title}</span>
                )
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
            router.delete(route('admin.blogs.delete', selectedItem), {
                onSuccess: () => {
                    closeDeleteModal()
                }
            })
        }
    }

    return (
        <Authenticated user={auth?.user}>
            <Head title='Blogs' />
            <div className='content py-4 font-poppins'>
                <div className="content-header px-6 flex justify-between items-center">
                    <div className="left">
                        <h1 className='font-semibold text-gray-800 text-3xl'>Blogs</h1>
                        <div className="pt-2">
                            <ul className='flex gap-1 text-gray-600 text-sm'>
                                <li><Link href={route('dashboard')}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route('admin.blogs.index')}>Blogs</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        <Link href={route('admin.blogs.add')} className='bg-[#f5cd06] shadow-lg text-[#0f0f0f] px-5 py-3 rounded-md font-semibold text-lg font-poppins'>Add New</Link>
                    </div>
                </div>
                <div className="page-content pt-8">
                    <Card className="h-full md:w-full w-11/12 mx-auto overflow-scroll rounded-none font-poppins">
                    <Card className="h-full w-full overflow-scroll rounded-none font-poppins">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            <Typography className="font-semibold text-lg leading-none opacity-70 font-poppins" >{head}</Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {TABLE_ROWS.map(({ id, title, categories, tags, status, author }, index) => {
                                    const isLast = index === TABLE_ROWS.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                    console.log(author);
                                    return (
                                        <tr key={id}>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{index + 1}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">{title}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">
                                                    <span className='space-x-2'><ShowCategories list={categories} /></span>
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins">
                                                    <span className='space-x-2'><ShowTags list={tags} /></span>
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography className="font-medium font-poppins capitalize">{status}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex gap-2">
                                                    <Link className='px-0 text-sm font-medium font-poppins' href={route('admin.blogs.edit', id)}>Edit</Link>
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
            {/* Delete Modal */}

            <Modal show={deleteModal} onClose={closeDeleteModal} maxWidth={'xl'}>
                <div className="delete-modal px-6 py-8 relative font-poppins">
                    <h1 className='font-bold text-3xl text-center font-poppins'>Are you sure ?</h1>
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
