import React from 'react'
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function ContactPage({ auth }) {
    var settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };
    return (
        <GuestLayout user={auth?.user}>
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
                <div className="location-section">
                    <div className="w-full">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="title-wrapper">
                                <h1 className='text=[#0f0f0f] text-6xl font-bold mb-6 text-center'>All Locations</h1>
                            </div>
                            <div className="location-slider-wrapper">
                                <div className="location-slider">
                                    <Slider {...settings}>
                                        <div className="slider-item p-4">
                                            <div className="image-wrapper drop-shadow-lg rounded-lg overflow-hidden">
                                                <iframe
                                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d954.2813268182133!2d145.740044!3d-16.91911!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6978643eb4601af1%3A0x1a66fe2be8493f7c!2sMembers%20Church%20of%20God%20International!5e0!3m2!1sen!2sau!4v1710485078478!5m2!1sen!2sau"
                                                    width="100%"
                                                    height="350"
                                                    allowFullScreen=""
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    style={{ border: 0, pointerEvents: 'none' }}
                                                />
                                            </div>
                                            <div className="content pt-5">
                                                <h3 className='font-bold text-2xl mb-2'>MCGI - Manoora QLD </h3>
                                                <p className='text-[#666B68] font-dmsans text-lg'>37 Pease St, Manoora QLD 4870</p>
                                            </div>
                                        </div>


                                        <div className="slider-item p-4">
                                            <div className="image-wrapper drop-shadow-lg rounded-lg overflow-hidden">
                                                <iframe
                                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39760489.45571153!2d114.69544796219445!3d-26.83308941846558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32a257c9a04b5d%3A0x68e1f29d3975e491!2sMembers%20Church%20of%20God%20International!5e1!3m2!1sen!2sau!4v1710484357419!5m2!1sen!2sau"
                                                    width="100%"
                                                    height="350"
                                                    style={{ border: 0, pointerEvents: 'none' }}
                                                    allowfullscreen=""
                                                    loading="lazy"
                                                    referrerpolicy="no-referrer-when-downgrade" />
                                            </div>
                                            <div className="content pt-5">
                                                <h3 className='font-bold text-2xl mb-2'>MCGI - Kardinya WA </h3>
                                                <p className='text-[#666B68] font-dmsans text-lg'>30 Bowen St, Kardinya WA 6163</p>
                                            </div>
                                        </div>
                                        <div className="slider-item p-4">
                                            <div className="image-wrapper drop-shadow-lg rounded-lg overflow-hidden">
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39760489.45571153!2d114.69544796219445!3d-26.83308941846558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab0b685a6c0cb85%3A0xb182f26719f42eb8!2sMembers%20Church%20of%20God%20International!5e1!3m2!1sen!2sau!4v1710484664755!5m2!1sen!2sau"
                                                    width="100%"
                                                    height="350"
                                                    style={{ border: 0, pointerEvents: 'none' }}
                                                    allowfullscreen=""
                                                    loading="lazy"
                                                    referrerpolicy="no-referrer-when-downgrade" />
                                            </div>
                                            <div className="content pt-5">
                                                <h3 className='font-bold text-2xl mb-2'>MCGI - Pooraka SA</h3>
                                                <p className='text-[#666B68] font-dmsans text-lg'>17 Research Rd, Pooraka SA 5095</p>
                                            </div>
                                        </div>
                                        <div className="slider-item p-4">
                                            <div className="image-wrapper drop-shadow-lg rounded-lg overflow-hidden">
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39760489.45571153!2d114.69544796219445!3d-26.83308941846558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65ddec930a85d%3A0x5dd6bada26c7ef75!2sMembers%20Church%20of%20God%20International!5e1!3m2!1sen!2sau!4v1710484698309!5m2!1sen!2sau"
                                                    width="100%"
                                                    height="350"
                                                    style={{ border: 0, pointerEvents: 'none' }}
                                                    allowfullscreen=""
                                                    loading="lazy"
                                                    referrerpolicy="no-referrer-when-downgrade" />
                                            </div>
                                            <div className="content pt-5">
                                                <h3 className='font-bold text-2xl mb-2'>MCGI - Altona North VIC </h3>
                                                <p className='text-[#666B68] font-dmsans text-lg'>5/230 Blackshaws Rd, Altona North VIC 3025</p>
                                            </div>
                                        </div>
                                        <div className="slider-item p-4">
                                            <div className="image-wrapper drop-shadow-lg rounded-lg overflow-hidden">
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39760489.45571153!2d114.69544796219445!3d-26.83308941846558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b17acfb9a5bffff%3A0xc652c92361e7c8fc!2sMembers%20Church%20of%20God%20International!5e1!3m2!1sen!2sau!4v1710484729026!5m2!1sen!2sau"
                                                    width="100%"
                                                    height="350"
                                                    style={{ border: 0, pointerEvents: 'none' }}
                                                    allowfullscreen=""
                                                    loading="lazy"
                                                    referrerpolicy="no-referrer-when-downgrade" />
                                            </div>
                                            <div className="content pt-5">
                                                <h3 className='font-bold text-2xl mb-2'>MCGI - Spence ACT </h3>
                                                <p className='text-[#666B68] font-dmsans text-lg'>22 Bowling Pl, Spence ACT 2615</p>
                                            </div>
                                        </div>
                                        <div className="slider-item p-4">
                                            <div className="image-wrapper drop-shadow-lg rounded-lg overflow-hidden">
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39760489.45571153!2d114.69544796219445!3d-26.83308941846558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12855363455555%3A0x37acca018561e9bc!2sMembers%20Church%20of%20God%20International!5e1!3m2!1sen!2sau!4v1710484754010!5m2!1sen!2sau"
                                                    width="100%"
                                                    height="350"
                                                    style={{ border: 0, pointerEvents: 'none' }}
                                                    allowfullscreen=""
                                                    loading="lazy"
                                                    referrerpolicy="no-referrer-when-downgrade" />
                                            </div>
                                            <div className="content pt-5">
                                                <h3 className='font-bold text-2xl mb-2'>MCGI - St Marys NSW </h3>
                                                <p className='text-[#666B68] font-dmsans text-lg'>Unit 11 A, 516/524 Great Western Hwy, St Marys NSW 2760</p>
                                            </div>
                                        </div>
                                        <div className="slider-item p-4">
                                            <div className="image-wrapper drop-shadow-lg rounded-lg overflow-hidden">
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39760489.45571153!2d114.69544796219445!3d-26.83308941846558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b0cafe66243ffff%3A0x45f6a7e06c57abd8!2sMembers%20Church%20of%20God%20International%20(MCGI)%20Singleton!5e1!3m2!1sen!2sau!4v1710484783360!5m2!1sen!2sau"
                                                    width="100%"
                                                    height="350"
                                                    style={{ border: 0, pointerEvents: 'none' }}
                                                    allowfullscreen=""
                                                    loading="lazy"
                                                    referrerpolicy="no-referrer-when-downgrade" />
                                            </div>
                                            <div className="content pt-5">
                                                <h3 className='font-bold text-2xl mb-2'>MCGI - Singleton NSW </h3>
                                                <p className='text-[#666B68] font-dmsans text-lg'>Level 1/154/156 John St, Singleton NSW 2330</p>
                                            </div>
                                        </div>
                                        <div className="slider-item p-4">
                                            <div className="image-wrapper drop-shadow-lg rounded-lg overflow-hidden">
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39760489.45571153!2d114.69544796219445!3d-26.83308941846558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b914c0a68c80c4b%3A0x4ddedd3121f401f8!2sMembers%20Church%20of%20God%20International!5e1!3m2!1sen!2sau!4v1710484812161!5m2!1sen!2sau"
                                                    width="100%"
                                                    height="350"
                                                    style={{ border: 0, pointerEvents: 'none' }}
                                                    allowfullscreen=""
                                                    loading="lazy"
                                                    referrerpolicy="no-referrer-when-downgrade" />
                                            </div>
                                            <div className="content pt-5">
                                                <h3 className='font-bold text-2xl mb-2'>MCGI - Coopers Plains QLD </h3>
                                                <p className='text-[#666B68] font-dmsans text-lg'>2/8 Boyland Ave, Coopers Plains QLD 4108</p>
                                            </div>
                                        </div>
                                        <div className="slider-item p-4">
                                            <div className="image-wrapper drop-shadow-lg rounded-lg overflow-hidden">
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39760489.45571153!2d114.69544796219445!3d-26.83308941846558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6bc300c25c96aaab%3A0x9a192505fb1cb7fd!2sMembers%20Church%20of%20God%20International!5e1!3m2!1sen!2sau!4v1710484833111!5m2!1sen!2sau"
                                                    width="100%"
                                                    height="350"
                                                    style={{ border: 0, pointerEvents: 'none' }}
                                                    allowfullscreen=""
                                                    loading="lazy"
                                                    referrerpolicy="no-referrer-when-downgrade" />
                                            </div>
                                            <div className="content pt-5">
                                                <h3 className='font-bold text-2xl mb-2'>MCGI - Park Avenue QLD </h3>
                                                <p className='text-[#666B68] font-dmsans text-lg'>Shop 2/37 Main St, Park Avenue QLD 4701</p>
                                            </div>
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="question-section py-32">
                    <div className="w-full">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="flex gap-12 items-center justify-center">
                                <div className="w-1/2">
                                    <img src="/images/contacts.jpg" className='w-full rounded-2xl' />
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
