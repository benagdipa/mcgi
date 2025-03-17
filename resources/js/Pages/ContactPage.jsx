import React, { useState } from 'react'
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react'
import Slider from "react-slick";
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import WOW from 'react-wow';
import Card from '@/Components/Card';
import Badge from '@/Components/Badge';
import Alert from '@/Components/Alert';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
                <meta name="keywords" content="contact, mcgi, australia, reach out, message"/>
                <meta name="description" content="Connect with Members Church of God International (MCGI) Australia. Whether you have questions, need spiritual guidance, or are interested in joining our community, our dedicated team is here to assist you. Reach out through our contact form, call us directly, or visit our location."/>
            </Head>
            <div className="contact-page">
                <div className="page-header pt-[70px] md:pt-60 pb-16 md:pb-28 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70 z-0">
                        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20"></div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:max-w-screen-xl w-11/12 mx-auto relative z-10"
                    >
                        <Badge 
                            color="warning" 
                            variant="solid" 
                            size="lg" 
                            className="mb-4 shadow-lg"
                        >
                            Get in Touch
                        </Badge>
                        <h1 className="font-bold text-4xl sm:text-5xl md:text-7xl text-white mb-4 md:mb-6 leading-tight">
                            Contact Us
                            <span className="block text-lg sm:text-xl md:text-2xl font-normal mt-3 md:mt-4 text-white/80">
                                We're here to help and answer any questions you might have
                            </span>
                        </h1>
                        <div className="breadcrumbs">
                            <div className="flex gap-4 font-medium text-white/80 items-center text-sm">
                                <Link 
                                    href={route('home')} 
                                    className="hover:text-white transition-colors"
                                >
                                    HOME
                                </Link>
                                <div className="divider text-white/60">/</div>
                                <span className="text-white">Contact Us</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <div className="contact-info-section py-12 sm:py-16 md:py-24 lg:py-32 bg-gray-50">
                    <div className="w-full">
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="h-full"
                                >
                                    <div className="lg:sticky lg:top-24">
                                        <Badge 
                                            color="primary" 
                                            variant="soft" 
                                            size="lg" 
                                            className="mb-4"
                                        >
                                            Get In Touch
                                        </Badge>
                                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">Contact Information</h2>
                                        <p className="text-base sm:text-lg text-gray-600 mb-8 md:mb-10">Ready to join our community or have questions? Reach out through any of these channels:</p>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden group">
                                                <div className="p-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="icon-box bg-primary/10 p-4 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                            <FaMapMarkerAlt className="text-primary group-hover:text-white text-2xl" />
                                                        </div>
                                                        <div className="content">
                                                            <h3 className="font-bold text-xl mb-2 text-gray-900">Visit Us</h3>
                                                            <p className="text-gray-600 text-lg">Unit 5, 230 Blackshaws Rd, Altona North 3025 Victoria</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                            
                                            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden group">
                                                <div className="p-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="icon-box bg-secondary/10 p-4 rounded-xl group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                                                            <FaEnvelope className="text-secondary group-hover:text-white text-2xl" />
                                                        </div>
                                                        <div className="content">
                                                            <h3 className="font-bold text-xl mb-2 text-gray-900">Email Us</h3>
                                                            <a href="mailto:info@mcgi.org.au" className="text-gray-600 text-lg hover:text-primary transition-colors">
                                                                info@mcgi.org.au
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                            
                                            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden group">
                                                <div className="p-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="icon-box bg-success/10 p-4 rounded-xl group-hover:bg-success group-hover:text-white transition-all duration-300">
                                                            <FaPhoneAlt className="text-success group-hover:text-white text-2xl" />
                                                        </div>
                                                        <div className="content">
                                                            <h3 className="font-bold text-xl mb-2 text-gray-900">Call Us</h3>
                                                            <a href="tel:+61450780530" className="text-gray-600 text-lg hover:text-primary transition-colors">
                                                                +61 450 780 530
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                            
                                            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden group">
                                                <div className="p-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="icon-box bg-warning/10 p-4 rounded-xl group-hover:bg-warning group-hover:text-white transition-all duration-300">
                                                            <FaClock className="text-warning group-hover:text-white text-2xl" />
                                                        </div>
                                                        <div className="content">
                                                            <h3 className="font-bold text-xl mb-2 text-gray-900">Office Hours</h3>
                                                            <div className="text-gray-600 text-lg">
                                                                <p>Mon - Fri: 9am - 5pm</p>
                                                                <p>Weekend: By appointment</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="h-full"
                                >
                                    <div className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl overflow-hidden">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d787.8046067061722!2d144.86154379894032!3d-37.83177203958394!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65ddec930a85d%3A0x5dd6bada26c7ef75!2sMembers%20Church%20of%20God%20International!5e0!3m2!1sen!2sau!4v1710479783328!5m2!1sen!2sau"
                                            className="w-full h-full border-0 hover:opacity-95 transition-opacity"
                                            allowFullScreen=""
                                            loading="lazy"
                                            title="MCGI Australia Location Map"
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="question-section py-12 sm:py-16 md:py-24 lg:py-32">
                    <div className="w-full">
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="h-full order-2 lg:order-1"
                                >
                                    <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-full rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl overflow-hidden">
                                        <img 
                                            src="/images/kuya-edited.jpg" 
                                            alt="MCGI Pastor" 
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="h-full order-1 lg:order-2"
                                >
                                    <div className="h-full">
                                        <Badge 
                                            color="warning" 
                                            variant="solid" 
                                            size="lg" 
                                            className="mb-4"
                                        >
                                            Send Message
                                        </Badge>
                                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">Ask a Question</h2>
                                        <p className="text-base sm:text-lg text-gray-600 mb-6 md:mb-8">Have questions about our church, teachings, or events? Fill out the form below and we'll get back to you soon.</p>
                                        
                                        <Card className="border-none shadow-lg md:shadow-xl bg-white overflow-hidden">
                                            <div className="p-6 sm:p-8">
                                                {successMessage && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="mb-6"
                                                    >
                                                        <Alert 
                                                            type="success"
                                                            message={successMessage}
                                                            dismissible={true}
                                                        />
                                                    </motion.div>
                                                )}
                                                
                                                <form onSubmit={formSubmit} className="space-y-4 md:space-y-6">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                                        <div className="form-group">
                                                            <InputLabel htmlFor="name" value="Full Name" className="mb-1.5 md:mb-2 text-gray-700" />
                                                            <TextInput
                                                                id="name"
                                                                type="text"
                                                                name="name"
                                                                placeholder="Your name"
                                                                value={data.name}
                                                                onChange={(e) => setData('name', e.target.value)}
                                                                className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring focus:ring-primary/20"
                                                                required
                                                            />
                                                            <InputError message={errors.name} className="mt-1" />
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                            <InputLabel htmlFor="email" value="Email Address" className="mb-1.5 md:mb-2 text-gray-700" />
                                                            <TextInput
                                                                id="email"
                                                                type="email"
                                                                name="email"
                                                                placeholder="Your email address"
                                                                value={data.email}
                                                                onChange={(e) => setData('email', e.target.value)}
                                                                className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring focus:ring-primary/20"
                                                                required
                                                            />
                                                            <InputError message={errors.email} className="mt-1" />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group">
                                                        <InputLabel htmlFor="subject" value="Subject" className="mb-1.5 md:mb-2 text-gray-700" />
                                                        <TextInput
                                                            id="subject"
                                                            type="text"
                                                            name="subject"
                                                            placeholder="What is this regarding?"
                                                            value={data.subject}
                                                            onChange={(e) => setData('subject', e.target.value)}
                                                            className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring focus:ring-primary/20"
                                                            required
                                                        />
                                                        <InputError message={errors.subject} className="mt-1" />
                                                    </div>
                                                    
                                                    <div className="form-group">
                                                        <InputLabel htmlFor="message" value="Your Message" className="mb-1.5 md:mb-2 text-gray-700" />
                                                        <textarea
                                                            id="message"
                                                            name="message"
                                                            rows="5"
                                                            placeholder="Your message"
                                                            value={data.message}
                                                            onChange={(e) => setData('message', e.target.value)}
                                                            className="w-full rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus:ring focus:ring-primary/20"
                                                            required
                                                        />
                                                        <InputError message={errors.message} className="mt-1" />
                                                    </div>
                                                    
                                                    <div className="form-group">
                                                        <PrimaryButton 
                                                            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base flex items-center justify-center gap-2 rounded-lg"
                                                            type="submit"
                                                        >
                                                            Send Message
                                                            <FaArrowRight />
                                                        </PrimaryButton>
                                                    </div>
                                                </form>
                                            </div>
                                        </Card>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}
