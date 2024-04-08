import React from 'react'
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react'
export default function TermsandCondition({ auth }) {
    return (
        <GuestLayout user={auth?.user}>
            <Head title="Terms and Condition" />
            <div className="terms-condition-page">
                <div className="page-header pt-[70px] md:pt-80 pb-28 ">
                    <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                        <h1 className='font-bold lg:text-7xl text-6xl text-white'>Terms and Condition</h1>
                        <div className="breadcrumbs pt-5">
                            <div className="flex gap-4 font-semibold uppercase font-dmsans text-white">
                                <div className="item"><Link href={route('home')} className="breadcrumb-link">HOME</Link></div>
                                <div className="divider"> | </div>
                                <div className="item"><Link href={route('terms-and-condition')} className="breadcrumb-link text-gray-200">Terms and Condition</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-content py-20 md:py-32">
                    <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                        <p className='text-lg font-semibold pb-5'>
                        1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p className='text-lg font-semibold pb-5'>
                        2. A diam maecenas sed enim ut sem viverra aliquet. Sed nisi lacus sed viverra tellus.</p>
                        <p className='text-lg font-semibold pb-5'>
                        3. Cras pulvinar mattis nunc sed blandit. Sodales ut eu sem integer vitae justo eget.</p>
                        <p className='text-lg font-semibold pb-5'>
                        4. Maecenas accumsan lacus vel facilisis volutpat est velit egestas.</p>
                        <p className='text-lg font-semibold pb-5'>
                        5. Enim tortor at auctor urna nunc id cursus. Diam donec adipiscing tristique risus nec.</p>
                        <p className='text-lg font-semibold pb-5'>
                        6. Mauris augue neque gravida in fermentum et sollicitudin ac. </p>
                        <p className='text-lg font-semibold pb-5'>
                        7. Vivamus at augue eget arcu dictum varius duis. Elementum nisi quis eleifend quam adipiscing vitae proin.</p>
                        <p className='text-lg font-semibold pb-5'>
                        8. Id volutpat lacus laoreet non curabitur gravida arcu. Et tortor at risus viverra adipiscing at in tellus.</p>
                    </div>
                </div>
            </div>
            </GuestLayout>
)}
