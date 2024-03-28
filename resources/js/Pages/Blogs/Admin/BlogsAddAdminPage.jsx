import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function BlogsAddAdminPage({ auth }) {
    return (
        <Authenticated user={auth?.user}>
            <Head title='Add New Blogs'/>
            <div>BlogsAddAdminPage</div>
        </Authenticated>
    )
}
