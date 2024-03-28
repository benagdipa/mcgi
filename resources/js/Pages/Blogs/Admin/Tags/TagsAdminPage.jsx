import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function TagsAdminPage({ auth }) {
    return (
        <Authenticated user={auth?.user}>
            <Head title='Tags'/>
            <div>TagsAdminPage</div>
        </Authenticated>
    )
}
