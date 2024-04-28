import React, { useState } from 'react'
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import WOW from 'react-wow';

export default function ContactPage({ auth, locations }) {
    const { data, setData, post, reset, errors } = useForm({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [successMessage, setSuccessMessage] = useState(null);

    var settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    arrows: false,
                }
            }
        ]
    };

    const formSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage('')
        post(route("contact.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                setSuccessMessage('Message sent successfully!');
            },
        });

    };



    return (
        <GuestLayout user={auth?.user}>
            <Head>
                <title>Contact Us</title>
                <meta name="title" content="Contact Us"/>
                <meta name="keywords" content=""/>
                <meta name="description" content=""/>
            </Head>
            <div className="contact-page">
                <div className="page-header  pt-[70px] md:pt-80 pb-28 ">
                    <div className="w-full">
                        <WOW animation='slideLeftToRight'>
                            <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                                <h1 className='font-bold md:text-7xl text-5xl text-white'>Contact Us</h1>
                                <div className="breadcrumbs pt-5">
                                    <div className="flex gap-4 font-semibold uppercase font-dmsans text-white">
                                        <div className="item"><Link href={route('home')} className="breadcrumb-link">HOME</Link></div>
                                        <div className="divider"> | </div>
                                        <div className="item"><Link href={route('contact')} className="breadcrumb-link text-gray-200">Contact Us</Link></div>
                                    </div>
                                </div>
                            </div>
                        </WOW>
                    </div>
                </div>
                <div className="contact-info-section py-32">
                    <div className="w-full">
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                            <div className="flex gap-6  lg:flex-row flex-col items-center justify-center">
                                <WOW animation='slideLeftToRight'>
                                    <div className="lg:w-1/2 w-11/12 mx-auto">
                                        <div className="title-wrapper">
                                            <h1 className='text=[#0f0f0f] lg:text-6xl text-5xl font-bold mb-6'>Contact Information</h1>
                                            <p className='text-[#666B68] text-lg font-dmsans'>If you are ready to join our community,<br /> you can leave your contacts.</p>
                                        </div>
                                        <div className="information pt-6">
                                            <div className="flex gap-8">
                                                <div className="item lg:w-1/2 w-11/12 mx-auto">
                                                    <div className="title font-bold text-xl mb-3">Address:</div>
                                                    <p className='text-[#666B68] font-dmsans text-lg'>Unit 5, 230 Blackshaws Rd, Altona North 3025 Victoria</p>
                                                </div>
                                                <div className="item lg:w-1/2 w-11/12 mx-auto">
                                                    <div className="title font-bold text-xl mb-3">Connect With:</div>
                                                    <p className='text-[#666B68] mb-3 font-dmsans text-lg'>info@mcgi.org.au</p>
                                                    <p className='text-[#666B68] font-dmsans text-lg'>+61450780530</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </WOW>
                                <WOW animation='slideRightToLeft'>
                                    <div className="lg:w-1/2 w-11/12 mx-auto">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d787.8046067061722!2d144.86154379894032!3d-37.83177203958394!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65ddec930a85d%3A0x5dd6bada26c7ef75!2sMembers%20Church%20of%20God%20International!5e0!3m2!1sen!2sau!4v1710479783328!5m2!1sen!2sau"
                                            width="100%"
                                            height="400"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            className='rounded-3xl  overflow-hidden'
                                        />
                                    </div>
                                </WOW>
                            </div>
                        </div>
                    </div>
                </div>
                <WOW animation='fadeIn'>
                    {locations.length > 0 && (
                        <div className="location-section">
                            <div className="w-full">
                                <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                                    <div className="title-wrapper">
                                        <h1 className='text=[#0f0f0f] md:text-6xl text-5xl font-bold mb-12 text-center'>All Locations</h1>
                                    </div>
                                    <div className="location-slider-wrapper">
                                        <div className="location-slider grid grid-cols-3 gap-6">
                                            {
                                                locations.map((location, index) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <div className="slider-item">
                                                                <div className="image-wrapper drop-shadow-lg rounded-lg overflow-hidden">
                                                                    <div dangerouslySetInnerHTML={{ __html: location.map_code }} />
                                                                </div>
                                                                <div className="content pt-5">
                                                                    <h3 className='font-bold text-2xl mb-2'>{location.name} </h3>
                                                                    <p className='text-[#666B68] font-dmsans text-lg'>{location.address}</p>
                                                                </div>
                                                            </div>
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </WOW>
                <div className="question-section py-32">
                    <div className="w-full">
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                            <div className="flex gap-12 lg:flex-row flex-col items-center justify-center">
                                <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                                    <img src="/images/optimize_image/kuya-edited.webp" className='w-full rounded-2xl lg:h-auto h-[450px] object-cover' />
                                </div>
                                <WOW animation='slideLeftToRight'>
                                    <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                                        <img src="/images/kuya-edited.jpg" className='w-full rounded-2xl lg:h-auto h-[450px] object-cover' />
                                    </div>
                                </WOW>
                            <WOW animation='slideRightToLeft'>
                                <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                                    <div className="title-wrapper">
                                        <h1 className='text=[#0f0f0f] md:text-6xl text-4xl font-bold mb-6'>Ask a Question</h1>
                                        <p className='text-[#666B68] text-lg font-dmsans'>If you have any questions, you can contact us.<br /> Please, fill out the form below.</p>
                                    </div>
                                    <form onSubmit={formSubmit}>
                                        <div className="form-wrapper py-8 text-black">
                                            <div className="form-row flex gap-4 mb-6">
                                                <div className="form-item w-full">
                                                    <TextInput
                                                        type="text"
                                                        name="name"
                                                        placeholder="Name..."
                                                        value={data.name}
                                                        onChange={(e) => setData('name', e.target.value)}
                                                        className='w-full rounded-md border-gray-300'
                                                    />
                                                    <InputError message={errors.name} className="mt-2" />
                                                </div>
                                                <div className="form-item w-full">
                                                    <TextInput
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email Address..."
                                                        value={data.email}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        className='w-full rounded-md border-gray-300'
                                                    />
                                                    <InputError message={errors.email} className="mt-2" />
                                                </div>
                                            </div>
                                            <div className="form-row mb-6">
                                                <TextInput
                                                    type="text"
                                                    name="subject"
                                                    placeholder="Subject..."
                                                    value={data.subject}
                                                    onChange={(e) => setData('subject', e.target.value)}
                                                    className='w-full rounded-md border-gray-300'
                                                />
                                                <InputError message={errors.subject} className="mt-2" />
                                            </div>
                                            <div className="form-row mb-6">
                                                <textarea
                                                    name="message"
                                                    cols="30"
                                                    rows="10"
                                                    placeholder="Message..."
                                                    value={data.message}
                                                    onChange={(e) => setData('message', e.target.value)}
                                                    className='w-full rounded-md border-gray-300'
                                                />
                                                <InputError message={errors.message} className="mt-2" />
                                            </div>
                                            <div className="form-row">
                                                <div className="inline-flex">
                                                    <button className='bg-[#0077CC] text-white px-6 py-4 font-bold text-lg rounded-full font-dmsans'>Send Message</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    {successMessage && (
                                        <div className="success-message text-green-500 font-bold">
                                            {successMessage}
                                        </div>
                                    )}
                                </div>
                            </WOW>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}
