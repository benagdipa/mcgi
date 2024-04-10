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
        const postCategories = list.split(',')
        return postCategories?.map((cat) => {
            const postCategory = categories.filter(item => item.id === parseInt(cat))
            return (
                <span className='px-2 bg-gray-300 py-2 rounded font-dmsans' key={postCategory[0].id}>{postCategory[0].title}</span>
            )
        })
    }

    const ShowTags = ({ list }) => {
        const postTags = list.split(',')
        return postTags?.map((tag) => {
            const postTag = tags.filter(item => item.id === parseInt(tag))
            return (
                <span className='px-2 bg-gray-300 py-2 rounded font-dmsans' key={postTag[0].id}>{postTag[0].title}</span>
            )
        })
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
            <div className=''>
                <div className="p-6 pb-0 pt-4 flex justify-between font-poppins">
                    <h1 className='font-semibold text-gray-800 text-3xl'>Blogs</h1>
                    <Link href={route('admin.blogs.add')}>Add New</Link>
                </div>
                <div className="pt-2 p-6 font-poppins">
                        <ul className='flex gap-1 text-gray-600 text-sm'>
                            <li><Link href={route('dashboard')}>Dashboard</Link></li>
                            <li>/</li>
                            <li><Link href={route('admin.blogs.index')}>Blogs</Link></li>
                        </ul>
                    </div>
                <Card className="h-full w-full overflow-scroll rounded-none font-dmsans">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="leading-none opacity-70 font-dmsans text-lg font-bold" >{head}</Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TABLE_ROWS.map(({ id, title, categories, tags, status }, index) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                return (
                                    <tr key={id}>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">{index + 1}</Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">{title}</Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                <span className='space-x-2'><ShowCategories list={categories} /></span>
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                <span className='space-x-2'><ShowTags list={tags} /></span>
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">{status}</Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex gap-2">
                                                <Link href={route('admin.blogs.edit', id)}>Edit</Link>
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
