import React from 'react'
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react'
export default function PrivacyandPolicy({ auth }) {
    return (
        <GuestLayout user={auth?.user}>
            <Head title="Privacy and Policy" />
            <div className="privacy-policy-page">
                <div className="page-header pt-[70px] md:pt-80 pb-28 ">
                    <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                        <h1 className='font-bold text-7xl text-white'>Privacy and Policy</h1>
                        <div className="breadcrumbs pt-5">
                            <div className="flex gap-4 font-semibold uppercase font-dmsans text-white">
                                <div className="item"><Link href={route('home')} className="breadcrumb-link">HOME</Link></div>
                                <div className="divider"> | </div>
                                <div className="item"><Link href={route('privacy-and-policy')} className="breadcrumb-link text-gray-200">Privacy and Policy</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-content py-20 md:py-32">
                    <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                        <p className='text-lg font-semibold pb-5'>
                        1. Introduction Members Church of God International (MCGI) Australia respects your privacy. This policy outlines our data handling practices.</p>
                        <p className='text-lg font-semibold pb-5'>
                        2. Collection of Personal Information We collect information like names, contact details, for church activities and communications.</p>
                        <p className='text-lg font-semibold pb-5'>
                        3. Use of Personal Information This information is used for organizing events and providing updates.</p>
                        <p className='text-lg font-semibold pb-5'>
                        4. Data Storage and Security We take measures to protect your information against unauthorized access.</p>
                        <p className='text-lg font-semibold pb-5'>
                        5. Disclosure of Personal Information Your information is not sold or rented. It may be disclosed if legally required.</p>
                        <p className='text-lg font-semibold pb-5'>
                        6. Access and Correction You can access and correct your information by contacting us.</p>
                        <p className='text-lg font-semibold pb-5'>
                        7. Changes to the Policy This policy may be updated, and changes will be indicated by the effective date.</p>
                        <p className='text-lg font-semibold pb-5'>
                        8. Contact Us For any privacy-related inquiries or requests regarding your personal information, please reach out to us at info@mcgi.org.au. We are committed to addressing your concerns promptly and efficiently.</p>
                    </div>
                </div>
            </div>
            </GuestLayout>
)}
