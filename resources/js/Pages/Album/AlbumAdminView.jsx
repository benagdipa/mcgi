import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Link } from '@inertiajs/react'
import { Card } from '@material-tailwind/react';
import { IconX } from '@tabler/icons-react';
import React from 'react'

export default function AlbumAdminView({ auth, album }) {
    console.log(album);
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
                        <button className='bg-[#f5cd06] shadow-lg text-[#0f0f0f] px-5 py-3 rounded-md font-semibold text-lg font-poppins'>Add New</button>
                    </div>
                </div>
                <div className="page-content pt-8">
                    <Card className="h-full w-full overflow-scroll rounded-none font-poppins">
                        <div className="grid grid-cols-6 gap-4 py-16 px-8">
                            {album?.attachments.length > 0 && album?.attachments.map((item, index) => {
                                return (
                                    <div className="group border rounded relative cursor-pointer" key={index}>
                                        <div className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white p-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
                                            <IconX
                                                size={16}
                                                onClick={() => { }}
                                            />
                                        </div>
                                        <img src={item?.path} className="w-full h-48 object-contain" />
                                    </div>
                                )
                            })}
                        </div>
                    </Card>
                </div>
            </div>
        </Authenticated>
    )
}
