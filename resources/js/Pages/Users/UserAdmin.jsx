import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'

export default function UserAdmin({ auth }) {
    return (
        <Authenticated user={auth?.user}>
            <Head title='Users' />
            <div className="content px-6 py-4 font-poppins">
                <div className="page-title">
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
        </Authenticated>
    )
}
