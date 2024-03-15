import React from 'react'
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react'

export default function ContactPage({ auth }) {
    return (
        <GuestLayout>
            <Head title='Contact Us' />
            <div className="contact-page">
                <div className="page-header pt-80 pb-28 ">
                    <div className="w-full">
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
                <div className="contact-info-section py-32">
                    <div className="w-full">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="flex gap-6 items-center justify-center">
                                <div className="w-1/2">
                                    <div className="title-wrapper">
                                        <h1 className='text=[#0f0f0f] text-6xl font-bold mb-6'>Contact Information</h1>
                                        <p className='text-[#666B68] text-lg font-dmsans'>If you are ready to join our community,<br /> you can leave your contacts.</p>
                                    </div>
                                    <div className="information pt-6">
                                        <div className="flex gap-8">
                                            <div className="item w-1/2">
                                                <div className="title font-bold text-xl mb-3">Address:</div>
                                                <p className='text-[#666B68] font-dmsans text-lg'>Unit 5, 230 Blackshaws Rd, Altona North 3025 Victoria</p>
                                            </div>
                                            <div className="item w-1/2">
                                                <div className="title font-bold text-xl mb-3">Connect With:</div>
                                                <p className='text-[#666B68] mb-3 font-dmsans text-lg'>info@mcgi.org.au</p>
                                                <p className='text-[#666B68] font-dmsans text-lg'>+61450780530</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d787.8046067061722!2d144.86154379894032!3d-37.83177203958394!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65ddec930a85d%3A0x5dd6bada26c7ef75!2sMembers%20Church%20of%20God%20International!5e0!3m2!1sen!2sau!4v1710479783328!5m2!1sen!2sau"
                                        width="600"
                                        height="450"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className='rounded-3xl  overflow-hidden'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="question-section pt-16 pb-32">
                    <div className="w-full">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="flex gap-12 items-center justify-center">
                                <div className="w-1/2">
                                    <img src="/images/contacts.jpg" className='w-full rounded-3xl' />
                                </div>
                                <div className="w-1/2">
                                    <div className="title-wrapper">
                                        <h1 className='text=[#0f0f0f] text-6xl font-bold mb-6'>Ask a Question</h1>
                                        <p className='text-[#666B68] text-lg font-dmsans'>If you have any questions, you can contact us.<br /> Please, fill out the form below.</p>
                                    </div>
                                    <div className="form-wrapper py-8 text-black">
                                        <div className="form-row flex gap-4 mb-6">
                                            <div className="form-item w-full">
                                                <input type="text" placeholder='Name...' className='w-full rounded-md border-gray-300' />
                                            </div>
                                            <div className="form-item w-full">
                                                <input type="email" name="email" placeholder="Email Address..." className='w-full rounded-md border-gray-300' />
                                            </div>
                                        </div>
                                        <div className="form-row mb-6">
                                            <input type="text" name="subject" placeholder="Subject..." className='w-full rounded-md border-gray-300' />
                                        </div>
                                        <div className="form-row mb-6">
                                            <textarea cols="30" rows="10" placeholder='Message...' className='w-full rounded-md border-gray-300' ></textarea>
                                        </div>
                                        <div className="form-row">
                                            <div className="inline-flex">
                                                <button className='bg-[#0077CC] text-white px-6 py-4 font-bold text-lg rounded-full font-dmsans'>Send Message</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}
