import React from 'react'
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react'

export default function ContactPage({ auth }) {
    return (
        <GuestLayout>
            <Head title='Contact Us' />
            <div className="contact-page">
                <div className="page-header pt-80 pb-28 ">
                    <div className="max-w-screen-xl mx-auto">
                        <h1 className='font-bold text-7xl text-white'>Contact Us</h1>
                        <div className="breadcrumbs pt-5">
                            <div className="flex gap-4 font-semibold uppercase font-dmsans text-white">
                                <div className="item"><Link href={route('home')} className="breadcrumb-link">HOME</Link></div>
                                <div className="divider"> | </div>
                                <div className="item"><Link href={route('contact')} className="breadcrumb-link text-gray-200">Contact Us</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}
